require('dotenv').config()
const { Client, GatewayIntentBits, REST } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const token = process.env.TOKEN
client.on('ready', () => {
    console.log(`Logueado en el bot csm  ${client.user.tag}!`)
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
        console.log("comando lusho ql")
        for (i = 0; i < 10;) {
            try {

                setTimeout(() => {
                    client.users.fetch('387294595479896065', false).then((user) => {
                        user.send('weta qlo');
                    });
                }, 2000);


            } catch (error) {
                console.error("error en el comando")
            }
            i++
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

client.login(token)