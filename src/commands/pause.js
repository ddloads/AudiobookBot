const { SlashCommandBuilder } = require('@discordjs/builders');
const player = require('../utility/audioplayer');
const { AudioPlayerStatus } = require('@discordjs/voice');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pause')
        .setDescription('Toggles pause on the currently playing audio.'),
    async execute(interaction) {
       //Check if the player is paused
       if (player.state.status === AudioPlayerStatus.Paused) {
        //If paused, then unpause
        player.unpause();
        await interaction.reply('Resumed the audio.');
       }else if (player.state.status === AudioPlayerStatus.Playing) {
        //If playing, then pause
        player.pause();
        await interaction.reply('Paused the audio.');
       }else {
        //If the player is not in a state that can be paused/unpaused
        await interaction.reply('There is nothing currently playing.');
       }
        
    },
};
