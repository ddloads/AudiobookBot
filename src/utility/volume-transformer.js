const prism = require('prism-media');
const config = require('../config.json');

// Get the initial volume from the config
let volume = config.initialVolume;

// Create a function that generates a volume transformer
const createVolumeTransformer = () => {
  const volumeTransformer = new prism.VolumeTransformer({ type: 's16le'});
  volumeTransformer.setVolume(volume);
  return volumeTransformer;
};

// Create a function that sets the volume level
const setVolume = (newVolume) => {
  volume = newVolume;
};

module.exports = {
  createVolumeTransformer,
  setVolume
};