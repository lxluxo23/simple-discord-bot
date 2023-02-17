require('dotenv').config()
var prefix = '!pi'
const { Client, GatewayIntentBits, REST, ActivityType } = require('discord.js');
const playCancion = require('./funciones')
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
            message.channel.send('progando algo')
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
