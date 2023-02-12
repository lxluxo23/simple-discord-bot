require('dotenv').config()
const ytdl = require('ytdl-core');
const fs = require("fs");
var prefix = '!pi'
const { Client, GatewayIntentBits, REST, ActivityType } = require('discord.js');
const { AudioPlayerStatus } = require('@discordjs/voice');
const client = new Client({
    intents: [
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildBans,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates
    ]
});
const {
    joinVoiceChannel,
    createAudioPlayer,
    createAudioResource
} = require('@discordjs/voice');
const token = process.env.TOKEN

let cola = []

client.on('ready', () => {
    console.log(`Logueado en el bot  ${client.user.tag}!`)
    client.user.setActivity('pepillo GOD', { type: ActivityType.Playing });
});

client.on('interactionCreate', async interaction => {
    // algun día llenaré esto
});

client.on('messageCreate', async (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) {
        return
    }
    let args = message.content.substring(prefix.length).split(" ");
    console.log(args)
    switch (args[1]) {
        case 'algo':
            message.channel.send('que pasa larva')
            break;
        case 'p':
            if (!message.member.voice?.channel) {
                return message.channel.send('Conectate a un canal de voz')
            }
            const connection = joinVoiceChannel({
                channelId: message.member.voice.channelId,
                guildId: message.guildId,
                adapterCreator: message.guild.voiceAdapterCreator
            })
            try {
                url = args[2]
                cola.push(url)
                if (cola.length === 1) {
                    playCancion(cola[0], connection, message.channel)
                } else {
                    message.channel.send(`Agregada a la cola: ${url}`)
                }
            } catch (error) {
                console.error(error)
                return
            }
            break
        default:
            break;
    }
});

client.login(token)

async function playCancion(url, connection, channel) {
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
