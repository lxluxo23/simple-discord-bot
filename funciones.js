
const ytdl = require('ytdl-core');
const fs = require("fs");
const { AudioPlayerStatus } = require('@discordjs/voice');
const {
    createAudioPlayer,
    createAudioResource
} = require('@discordjs/voice');
async function playCancion(url, connection, channel) {


    if (url) {
        try {
            cancion = await ytdl(url, {
                filter: 'audioonly'
            })
            info = await ytdl.getInfo(url)
            console.log(`reproduciendo ${info.videoDetails.title}`)
            channel.send(`reproduciendo ${info.videoDetails.title}`)
            const writeStream = fs.createWriteStream('cancion.mp3')
            cancion.pipe(writeStream)
            await new Promise((resolve, reject) => {
                writeStream.on('close', resolve)
                writeStream.on('error', reject)
            })
            let resource = createAudioResource("./cancion.mp3")
            const player = createAudioPlayer();
            connection.subscribe(player);
            player.play(resource)
            player.on(AudioPlayerStatus.Playing, () => {
                console.log("reproduciendo la cancion")
            });
            player.on(AudioPlayerStatus.Idle, () => {
                console.log("termino la cancion")
                // message.channel.send(`termino la cancion, pone otra`)
                fs.rm("./cancion.mp3", () => {
                    console.log("cancion removida")
                })
                cola.shift();
                if (cola.length > 0) {
                    playCancion(cola[0], connection, channel);
                } else {
                    channel.send('La cola de canciones ha terminado.');
                }
            });
        }
        catch (error) {
            console.error(error)
        }
    }
    else {
        return
    }

}
module.exports = playCancion