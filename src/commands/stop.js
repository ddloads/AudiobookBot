// stop.js
const { getVoiceConnection } = require('@discordjs/voice');
const { SlashCommandBuilder } = require('@discordjs/builders');
const state = require('../utility/state');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stop')
        .setDescription('Stop audio playback'),

    async execute(interaction) {
        // Get the voice connection for the guild
        const connection = getVoiceConnection(interaction.guild.id);

        if (!connection) {
            return await interaction.reply('I am not connected to a voice channel');
        }
        
        //stop player
        if (state.player){
            state.player.stop(true);
            state.player = null;
        }

         // Stop playing audio
          if (connection.state.status !== 'destroyed') {
            connection.destroy();
        }

        await interaction.reply('Audio stopped and I left the channel');
    },
};
