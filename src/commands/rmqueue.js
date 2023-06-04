const { SlashCommandBuilder } = require('@discordjs/builders');
const queueUtility = require('../utility/queue-utility');
const path = require('path');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rmqueue')
        .setDescription('Removes an audio file from the queue.')
        .addStringOption(option =>
            option.setName('filename')
                .setDescription('The name of the audio file to remove from the queue')
                .setRequired(true)),

    async execute(interaction) {
        const filename = interaction.options.getString('filename');

        // Get all queued files
        const queuedFiles = queueUtility.getQueue();

        // Find the requested audio file in the queue
        let audioFileIndex;
        const extensions = ['.mp3', '.wav', '.m4b'];
        for (const ext of extensions) {
            const tempFilename = `${filename}${ext}`;
            audioFileIndex = queuedFiles.findIndex(file => path.basename(file) === tempFilename);
            if (audioFileIndex !== -1) break; // If we found a file, no need to keep looking
        }

        if (audioFileIndex === -1) {
            await interaction.reply('Could not find the specified audio file in the queue.');
            return;
        }

        // Remove the audio file from the queue
        const removed = queueUtility.removeFromQueue(audioFileIndex);
        await interaction.reply(`Removed ${path.basename(removed)} from the queue.`);
    },
};