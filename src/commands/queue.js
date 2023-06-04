const { SlashCommandBuilder } = require('@discordjs/builders');
const queueUtility = require('../utility/queue-utility');
const path = require('path');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('queue')
        .setDescription('Lists the current queued audio files.'),

    async execute(interaction) {
        const queuedFiles = queueUtility.getQueue();

        if (queuedFiles.length === 0) {
            await interaction.reply('No audio files are currently queued.');
            return;
        }

        // Create a string with the list of queued files
        let queueList = '';
        queuedFiles.forEach((file, i) => {
            queueList += `${i + 1}: ${path.basename(file)}\n`;
        });

        await interaction.reply(queueList);
    },
};