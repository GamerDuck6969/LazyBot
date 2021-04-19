module.exports = (Discord, client) =>{
    console.log('LazyBot Is Online!');
    client.user.setActivity('Being Lazy Beta | .help | v2.0.8', {type: 'PLAYING'}).catch(console.error);
}