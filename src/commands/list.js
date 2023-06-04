const { SlashCommandBuilder } = require('@discordjs/builders');
const getAudioFiles = require('../utility/file-utils');
const path = require('path');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('list')
        .setDescription('List available audio files'),
    
    async execute(interaction) {
        //Deferring the reply
        await interaction.deferReply();

        // Your function to get audio files
        const audioFiles = await getAudioFiles();
        let response = 'Available audio files: \n';
        for (const file of audioFiles){
            //Get only the base name without extension
            const baseName = path.basename(file, path.extname(file));
            //Check if adding the next file will exceed the limit
            if ((response + baseName).length > 4000){
                interaction.followUp(response); // In response to slash commands, you use interaction.followUp() instead of message.channel.send()
                response = '';
            }
            response += baseName + '\n';
        }
        //Send the remaining files
        if (response.length > 0){
            interaction.followUp(response);
        }
    },
};