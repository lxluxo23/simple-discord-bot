
require('dotenv').config()
// var prefix = '!pi'
const { Client, GatewayIntentBits, ActivityType, EmbedBuilder, AttachmentBuilder } = require('discord.js');
const { playCancion } = require('./funciones')
const { preguntar, imagen } = require('./gpt');
const { joinVoiceChannel } = require('@discordjs/voice');

const prefix = '!pi';
// import { Client, GatewayIntentBits, ActivityType } from 'discord.js';
// import { joinVoiceChannel } from '@discordjs/voice';
// import playCancion from './funciones.js';
// import preguntar from './gpt.js'
// import dotenv from 'dotenv';
// dotenv.config();
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

const token = process.env.TOKEN
console.log(token);

global.cola = []

client.on('ready', () => {
    console.log(`Logueado en el bot  ${client.user.tag}!`)
    client.user.setActivity('pepillo GOD', { type: ActivityType.Playing });
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;
    const { commandName, options } = interaction;

    if (commandName === 'gpt') {
        const pregunta = options.getString('pregunta');
        await interaction.deferReply();
        const GPTMsg = await interaction.editReply('Pensando...');
        let respuesta = await preguntar(pregunta)
        GPTMsg.edit(` Pregunta: \n ${pregunta} \n\n Respuesta: ${respuesta}`)
        // interaction.reply(` Pregunta: \n ${pregunta} \n\n Respuesta: ${respuesta}`);
    }

    if (commandName === 'imagen') {
        const prompt = options.getString('promt');
        await interaction.deferReply();
        const imagenMsg = await interaction.editReply('Generando imagen...');
        imagen(prompt).then(respuesta => {
            const imagenURL = respuesta.data[0].url;
            imagenMsg.edit(`Aquí está tu imagen: ${imagenURL}`);
            //interaction.editReply(`Aquí está tu imagen: ${imagenURL}`);
        }).catch(error => {
            console.error(error);
            interaction.editReply('Ha ocurrido un error al generar la imagen');
        });
    }


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
                let url = args[2]
                console.log(url)
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
