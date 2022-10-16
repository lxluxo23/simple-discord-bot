const { REST, Routes } = require('discord.js');
require('dotenv').config()
const token = process.env.TOKEN

console.log(token)
const commands = [
    {
        name: 'pipazo',
        description: 'le dice al pipazo pelmazo ql',
    },
    {
        name: 'lushoql',
        description: 'le dice al lusho weta qlo',
    },
    {
        name: 'johnql',
        description: 'le dice al john guaton ql ',
    }
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