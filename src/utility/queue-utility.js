const { joinVoiceChannelAndSubscribe } = require('./voicemanager');
const {createAudioResource, AudioPlayerStatus, StreamType } = require('@discordjs/voice');
const fs = require('fs');
const state = require('./state');
const connectionManager = require("./connection-manager");

let queue = [];
let currentIndex = -1; // Start at -1 because no tracks have been played yet

const upNext = async (interaction, player, channel) => {
  currentIndex++;
  if (currentIndex >= queue.length) {
    console.log('Reached end of queue.');
    currentIndex = queue.length - 1; // Keep index at last element
    connectionManager.getConnection().destroy();
    console.log('Disconnected from voice channel as there are no more tracks to play.');
    return;
  }

  const audioFile = queue[currentIndex];
  
  //Update the currentAudioFile in state
  state.currentAudioFile = audioFile;
  
  const connection = await joinVoiceChannelAndSubscribe(channel, player);
  
  if (!fs.existsSync(audioFile)) {
    await interaction.reply('The requested audio file was not found.');
    return;
  }

  const resource = createAudioResource(fs.createReadStream(audioFile), {
    inputType: StreamType.Arbitrary,
    bufferingMillis: 500,
  });

  player.play(resource);
  console.log('Started playing audio.');

  player.once(AudioPlayerStatus.Idle, () => {
    console.log('Audio Player status is idle, checking queue.');
    upNext(interaction, player, channel);
  });
};

const prevTrack = async (interaction, player, channel) => {
  currentIndex--;
  if (currentIndex < 0) {
    console.log('Reached start of queue.');
    currentIndex = 0; // Keep index at first element
    return;
  }

  const audioFile = queue[currentIndex];

  //Update the currentAudioFile in state
  state.currentAudioFile = audioFile;
  
  const connection = await joinVoiceChannelAndSubscribe(channel, player);
  
  if (!fs.existsSync(audioFile)) {
    await interaction.reply('The requested audio file was not found.');
    return;
  }

  const resource = createAudioResource(fs.createReadStream(audioFile), {
    inputType: StreamType.Arbitrary,
    bufferingMillis: 500,
  });

  player.play(resource);
  console.log('Started playing previous audio.');
};

const addToQueue = (file) => {
  queue.push(file);
};

const removeFromQueue = (filename) => {
  const index = queue.findIndex(file => file.includes(filename));
  if (index > -1) {
    if (index <= currentIndex) currentIndex--;
    queue.splice(index, 1);
  }
};

const getQueue = () => {
  return queue;
};

module.exports = {
  upNext,
  prevTrack,
  addToQueue,
  removeFromQueue,
  getQueue,
};
