const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');
const YouTube = require('simple-youtube-api')
var { getData, getPreview } = require("spotify-url-info");
const { MessageEmbed, Message } = require('discord.js');
const youtube = new YouTube(process.env.GOOGLE_API_KEY);

const queue = new Map();

module.exports = {
    name: 'play',
    aliases: ['skip', 'stop', 'pause', 'unpause', 'queue'],
    permissions: [],
    cooldown: 0,
    description: 'Joins and plays a audio from youtube and spotify',
    catergory: 'music',
    async execute(message, args, cmd, client, Discord) 
    {
        const voice_channel = message.member.voice.channel;
        if (!voice_channel) return message.channel.send('You need to be in a channel to execute this command!').then((msg) => {msg.delete({timeout: 10000})});
        const permissions = voice_channel.permissionsFor(message.client.user);
        if (!permissions.has('CONNECT')) return message.channel.send('You dont have the correct permissions').then((msg) => {msg.delete({timeout: 10000})});
        if (!permissions.has('SPEAK')) return message.channel.send('You dont have the correct permissions').then((msg) => {msg.delete({timeout: 10000})});

        const server_queue = queue.get(message.guild.id);

        if (cmd === 'play') {

            if (!args.length) return message.channel.send('You need to send the second argument!').then((msg) => {msg.delete({timeout: 10000})});
            let song = {};

            //Valdiate Video URL. Then, if video found then create a song.
            if (ytdl.validateURL(args[0])) {
                const song_info = await ytdl.getInfo(args[0]);

                song = { title: song_info.videoDetails.title, url: song_info.videoDetails.video_url }

            } else if(args[0].includes('spotify')) {
                const spotifyTrackInfo = await getPreview(args[0]);

                const videoFinder = async (query) => {
                    const videoResult = await ytSearch(query);
                    return videoResult.videos.length > 1 ? videoResult.videos[0] : null;
                };

                const video = await videoFinder(`${spotifyTrackInfo.title} ${spotifyTrackInfo.artist}`);

                if(video) {
                    song = { title: video.title, url: video.url };
                } else {
                    return message.reply('Error finding song.');
                }
            } else {
                //If the video is not a URL then use keywords to find that video.
                const videoFinder = async (query) => {
                    const videoResult = await ytSearch(query);
                    return (videoResult.videos.length > 1) ? videoResult.videos[0] : null;
                }

                const video = await videoFinder(args.join(' '));

                //If video found, then, create a song.
                if (video) {

                    song = { title: video.title, url: video.url }

                }
                else {
                    return message.channel.send('Error finding video.').then((msg) => {msg.delete({timeout: 10000})});
                }
            }

            //If queue doesn't have a guild.id key (aka server_queue) let create a queue constructor.
            if (!server_queue) {

                const queue_constructor =
                {
                    voice_channel: voice_channel,
                    text_channel: message.channel,
                    connection: null,
                    songs: []
                }

                queue.set(message.guild.id, queue_constructor);
                queue_constructor.songs.push(song);

                try {

                    const connection = await voice_channel.join();
                    queue_constructor.connection = connection;
                    video_player(message.guild, queue_constructor.songs[0]);

                }
                catch (err) {

                    queue.delete(message.guild.id);
                    message.channel.send('There was an error connecting!').then((msg) => {msg.delete({timeout: 10000})});
                    throw err;
                }

            }
            else {

                server_queue.songs.push(song);
                return message.channel.send(`👍 **${song.title}** added to queue!`);
            }
        }

        else if(cmd === 'skip') skip_song(message, server_queue);
        else if(cmd === 'stop') stop_song(message, server_queue);
        else if(cmd === 'pause') pause_song(message, server_queue);
        else if(cmd === 'unpause') unpause_song(message, server_queue);
        else if(cmd === 'queue') queue_list(message, server_queue);
    }
}

const video_player = async (guild, song) => {
    const song_queue = queue.get(guild.id);

    if (!song) {
        song_queue.voice_channel.leave();
        queue.delete(guild.id);
        return;
    }

    const stream = ytdl(song.url, { filter: 'audioonly' });
    song_queue.connection.play(stream, { seek: 0, volume: 0.5 })
        .on('finish', () => {
            song_queue.songs.shift()
            video_player(guild, song_queue.songs[0]);
        });
    await song_queue.text_channel.send(`🎶 Now playing **${song.title}**`)
}


const skip_song = (message, server_queue) => {
    if (!message.member.voice.channel) return message.channel.send('You need to be in a channel to execute this command!').then((msg) => {msg.delete({timeout: 10000})});
    if(!server_queue){
        return message.channel.send(`There are no songs in queue 😔`).then((msg) => {msg.delete({timeout: 10000})});
    } 
    server_queue.connection.dispatcher.end();
}

const stop_song = (message, server_queue) => {
    if (!message.member.voice.channel) return message.channel.send('You need to be in a channel to execute this command!').then((msg) => {msg.delete({timeout: 10000})});
    server_queue.songs = [];
    server_queue.connection.dispatcher.end();
}

const pause_song = (message, server_queue) => {
    if(server_queue.connection.dispatcher.paused) return message.channel.send("Song is already paused!").then((msg) => {msg.delete({timeout: 10000})});
    server_queue.connection.dispatcher.pause();
    message.channel.send("Paused the song!");
}

const unpause_song = (message, server_queue) => {
    if(!server_queue.connection.dispatcher.paused) return message.channel.send("Song isn't paused!").then((msg) => {msg.delete({timeout: 10000})});
    server_queue.connection.dispatcher.resume();
    message.channel.send("Unpaused the song!");
}

const queue_list = async (message, server_queue) => {
    let currentPage = 0;
    if(!server_queue) return message.channel.send("There is no songs in the queue");
    const embeds = generateQueueEmbed(server_queue.songs);
    const queueEmbed = await message.channel.send(`Current Page: ${currentPage+1}/${embeds.length}`, embeds[currentPage]);
    await queueEmbed.react('⬅️');
    await queueEmbed.react('➡️');

    const filter = (reaction, user) => ['⬅️','➡️'].includes(reaction.emoji.name) && (message.author.id === user.id);
    const Collector = queueEmbed.createReactionCollector(filter);

    Collector.on('collect', (reaction, user) => {
        if(reaction.emoji.name === '➡️') {
            if(currentPage < embeds.length-1) {
                currentPage++;
                queueEmbed.edit(`Current Page: ${currentPage+1}/${embeds.length}`, embeds[currentPage]);
            }
        } else if(reaction.emoji.name === '⬅️') {
            if(currentPage !== 0) {
                --currentPage;
                queueEmbed.edit(`Current Page: ${currentPage+1}/${embeds.length}`, embeds[currentPage]);
            }
        }

        reaction.users.remove(user.id);
    });
}

function generateQueueEmbed(queue) {
    const embeds = [];
    let k = 10;
    for(let i = 0; i < queue.length; i += 10) {
        const current = queue.slice(i, k);
        let j = i;
        k += 10;
        const info = current.map(track => `${++j}) [${track.title}](${track.url})`).join(`\n`);
        const embed = new MessageEmbed()
        .setDescription(`**[Current Song: ${queue[0].title}](${queue[0].url})**\n${info}`);
        embeds.push(embed);
    }
    return embeds;
}