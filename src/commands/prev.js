const { SlashCommandBuilder } = require('@discordjs/builders');
const player = require('../utility/audioplayer');
const { joinVoiceChannelAndSubscribe } = require('../utility/voicemanager');
const queue = require('../utility/queue-utility');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('prev')
    .setDescription('Go back to the previous track.'),

  async execute(interaction) {
    const channel = interaction.member?.voice?.channel;
    if (!channel) {
      await interaction.reply('You need to be in a voice channel first. Please join a voice channel and try again.');
      return;
    }

    queue.prevTrack(interaction, player, channel);
    await interaction.reply('Going back to the previous track.');
  },
};
