const { Client, GatewayIntentBits, REST } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`)
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;
    const { commandName } = interaction;

    if (commandName === 'pipazo') {
        console.log("comando pipazo")
        interaction.reply('pelmazo ql');
        try {
            for (i = 0; i < 10;) {
                setTimeout(() => {
                    client.users.fetch('385682426829209620', false).then((user) => {
                        user.send('pelmazo ql');
                    });
                }, 2000);
                i++
            }


        } catch (error) {
            console.error("error en el comando ")
        }
    }



    if (commandName === 'lushoql') {
        for (i = 0; i < 10; i++) {
            try {

                await client.users.fetch('387294595479896065', false).then((user) => {
                    user.send('weta qlo');
                });
            } catch (error) {
                console.error("error en el comando")
            }
        }


        await interaction.reply('weta qlo');
    }
    if (commandName === 'johnql') {
        try {
            await client.users.fetch('447586866317885441', false).then((user) => {
                user.send('guaton ql');
            });
        } catch (error) {
            console.error("error en el comando")
        }

        await interaction.reply('guaton ql');
    }
});

client.login("Njk2Nzk1OTM4MzQ1MzIwNDc5.GfwBNA.UDlFpv1sRfUPshiFkORlRFhfN8ge9lygGk_PMA")