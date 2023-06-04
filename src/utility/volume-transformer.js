const prism = require('prism-media');
const config = require('../config.json');

// Get the initial volume from the config
const initialVolume = config.initialVolume;

// Create a volume transformer
const volumeTransformer = new prism.VolumeTransformer({ type: 's16le'});

// Set initial volume from the config
volumeTransformer.setVolume(initialVolume);

module.exports = volumeTransformer;