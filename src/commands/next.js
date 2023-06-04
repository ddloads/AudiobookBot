const { SlashCommandBuilder } = require('@discordjs/builders');
const player = require('../utility/audioplayer');
const { joinVoiceChannelAndSubscribe } = require('../utility/voicemanager');
const queue = require('../utility/queue-utility');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('next')
    .setDescription('Skip to the next track.'),

  async execute(interaction) {
    const channel = interaction.member?.voice?.channel;
    if (!channel) {
      await interaction.reply('You need to be in a voice channel first. Please join a voice channel and try again.');
      return;
    }

    queue.upNext(interaction, player, channel);
    await interaction.reply('Skipping to the next track.');
  },
};
