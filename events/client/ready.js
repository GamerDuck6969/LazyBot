module.exports = (Discord, client) =>{
    console.log('LazyBot Is Online!');
    client.user.setActivity('Being Lazy Beta | .help', {type: 'PLAYING'}).catch(console.error);
}