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
client.on('ready', () => {
    console.log(`Logueado en el bot  ${client.user.tag}!`)
    client.user.setActivity('pepillo GOD', { type: ActivityType.Playing });

});

client.on('interactionCreate', async interaction => {

    // algun dia llenare esto


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
        case 'play':
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
                cancion = await ytdl(url, {
                    filter: 'audioonly'
                })
                info = await ytdl.getInfo(url)
                message.channel.send(`reproduciendo ${info.videoDetails.title}`)
                const player = createAudioPlayer();
                connection.subscribe(player);
                let resource = createAudioResource(cancion);
                player.play(resource)
                player.on(AudioPlayerStatus.Playing, () => {
                    console.log("reproduciendo la cancion")
                });
                player.on(AudioPlayerStatus.Idle, () => {
                    console.log("termino la cancion")
                    message.channel.send(`termino la cancion, pone otra`)
                    connection.disconnect();
                });
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