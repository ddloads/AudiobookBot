//audioplayer.js
const { createAudioPlayer, NoSubscriberBehavior } = require('@discordjs/voice');
const state = require('./state');

const player = createAudioPlayer({
  bufferingTimeout: 10000, // Increase the buffering timeout to allow more buffering time
  bufferHint: 10000, // Increase the buffer hint to allocate more space for buffering
  behaviors: {
    noSubscriber: NoSubscriberBehavior.Pause,
  },
});
player.getCurrentAudioFile = () => state.currentAudioFile;
state.player = player;

module.exports = player;