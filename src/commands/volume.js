const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('volume')
        .setDescription('Adjust the volume')
        .addIntegerOption(option => 
            option.setName('level')
                .setDescription('Volume level (0 - 100)')
                .setRequired(true)),
    async execute(interaction) {
        const level = interaction.options.getInteger('level');

        // The volume level must be between 0 and 100
        if (level < 0 || level > 100) {
            await interaction.reply(`Volume level must be between 0 and 100`);
            return;
        }

        // Convert the volume level from a scale of 0 - 100 to a scale of 0 - 1
        const volume = level / 100.0;

        const volumeTransformer = require('../utility/volume-transformer');
        volumeTransformer.setVolume(volume);

        await interaction.reply(`Volume set to ${level}%`);
    },
};