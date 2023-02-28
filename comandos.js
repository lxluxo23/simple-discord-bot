const { REST, Routes } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
require('dotenv').config()
const token = process.env.TOKEN

console.log(token)

const pipazoCommand = new SlashCommandBuilder()
    .setName('pipazo')
    .setDescription('Le dice al pipazo pelmazo.');

const lushoqlCommand = new SlashCommandBuilder()
    .setName('lushoql')
    .setDescription('Le dice al lusho weta.');

const johnqlCommand = new SlashCommandBuilder()
    .setName('johnql')
    .setDescription('Le dice al john guaton.');
const gptCommand = new SlashCommandBuilder()
    .setName('gpt')
    .setDescription('pregunta. a gpt')
    .addStringOption(option =>
        option.setName('pregunta')
            .setDescription('La pregunta que quieres hacer.')
            .setRequired(true));

const imageCommand = new SlashCommandBuilder()
    .setName('imagen')
    .setDescription('Crea una imagen con gpt')
    .addStringOption(option =>
        option.setName('promt')
            .setDescription('describe tu imagen')
            .setRequired(true));

const commands = [
    pipazoCommand.toJSON(),
    lushoqlCommand.toJSON(),
    johnqlCommand.toJSON(),
    gptCommand.toJSON(),
    imageCommand.toJSON()
];
const rest = new REST({ version: '10' }).setToken(token);

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(Routes.applicationCommands("696795938345320479"), { body: commands });

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();