const { SlashCommandBuilder } = require('@discordjs/builders');
const queueUtility = require('../utility/queue-utility');
const getAudioFiles = require('../utility/file-utils');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('addqueue')
        .setDescription('Adds an audio file to the queue.')
        .addStringOption(option =>
            option.setName('filename')
                .setDescription('The name of the audio file to add to the queue')
                .setRequired(true)),

    async execute(interaction) {
        const filename = interaction.options.getString('filename');

        // Get all audio files
        const audioFiles = await getAudioFiles();

        // Find the requested audio file
        let audioFile;
        const extensions = ['.mp3', '.wav', '.m4b'];
        for (const ext of extensions) {
            const tempFilename = `${filename}${ext}`;
            audioFile = audioFiles.find(file => file.endsWith(tempFilename));
            if (audioFile) break; // If we found a file, no need to keep looking
        }

        if (!audioFile) {
            await interaction.reply('Could not find the specified audio file.');
            return;
        }

        // Add the audio file to the queue
        queueUtility.addToQueue(audioFile);
        await interaction.reply(`Added ${filename} to the queue.`);
    },
};