//nowplaying.js
const { SlashCommandBuilder } = require('@discordjs/builders');
const player = require('../utility/audioplayer');
const path = require('path');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('nowplaying')
    .setDescription('Show the currently playing audio file'),

  async execute(interaction) {
    // Get the currently playing audio file
    const currentAudioFile = player.getCurrentAudioFile();

    if (currentAudioFile) {
      await interaction.reply(`Currently playing: ${path.basename(currentAudioFile)}`);
    } else {
      await interaction.reply('No audio file is currently playing.');
    }
  },
};
