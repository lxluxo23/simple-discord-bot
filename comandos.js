const { REST, Routes } = require('discord.js');

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

const rest = new REST({ version: '10' }).setToken("Njk2Nzk1OTM4MzQ1MzIwNDc5.GfwBNA.UDlFpv1sRfUPshiFkORlRFhfN8ge9lygGk_PMA");

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(Routes.applicationCommands("696795938345320479"), { body: commands });

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();