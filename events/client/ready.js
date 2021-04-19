module.exports = (Discord, client) =>{
    console.log('LazyBot Is Online!');
    client.user.setActivity('Being Lazy Beta | .help | v2.0.7', {type: 'PLAYING'}).catch(console.error);
}