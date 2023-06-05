//require('dotenv').config({ path: '../.env' });
require ('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const fs = require('fs');
const {Client, Collection, IntentsBitField,} = require('discord.js');
const config = require('./config.json');
const getAudioFiles = require('./utility/file-utils');
const path = require('path');

const client = new Client({ 
    intents:[
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
        IntentsBitField.Flags.GuildVoiceStates,
    ],
});

client.commands = new Collection();

const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
}

 client.once('ready',(c) => {
    console.log(`\u2705 ${c.user.username} is online.`);
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
});


client.login(process.env.DISCORD_TOKEN);