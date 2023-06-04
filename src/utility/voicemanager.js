const { joinVoiceChannel } = require('@discordjs/voice');

async function joinVoiceChannelAndSubscribe(channel, player) {
  const connection = joinVoiceChannel({
    channelId: channel.id,
    guildId: channel.guild.id,
    adapterCreator: channel.guild.voiceAdapterCreator,
  });
  console.log('Joined voice channel.');

  connection.subscribe(player);
  console.log('Subscribed player to connection.');

  return connection;
}

module.exports = { joinVoiceChannelAndSubscribe };