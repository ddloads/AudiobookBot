const {
  createAudioResource,
  AudioPlayerStatus,
  StreamType,
  createAudioPlayer,
  NoSubscriberBehavior,
} = require("@discordjs/voice");
const fs = require("fs");
const path = require("path");
const { SlashCommandBuilder } = require("@discordjs/builders");
const getAudioFiles = require("../utility/file-utils");
const player = require("../utility/audioplayer");
const { joinVoiceChannelAndSubscribe } = require("../utility/voicemanager");
const queue = require("../utility/queue-utility");
const connectionManager = require("../utility/connection-manager");
const volumeTransformer = require("../utility/volume-transformer");

const getFileExtension = (filename) => {
  const extensions = [".mp3", ".wav", ".m4b"];
  return extensions.find((ext) => filename.endsWith(ext));
};

const findAudioFile = async (filename) => {
  const audioFiles = await getAudioFiles();
  const extensions = ['.mp3', '.wav', '.m4b'];
  let audioFile;
  for (const ext of extensions) {
    const tempFilename = `${filename.toLowerCase()}${ext}`;
    audioFile = audioFiles.find(file => file.toLowerCase().endsWith(tempFilename));
    if (audioFile) break;
  }
  return audioFile; 


};

const handleQueue = async (interaction, channel) => {
  queue.upNext(interaction, player, channel);
  await interaction.reply("Started playing the queue.");
};

const handleFilePlay = async (interaction, audioFile, channel) => {
  if (!fs.existsSync(audioFile)) {
    await interaction.reply("The requested audio file was not found.");
    return;
  }

  queue.addToQueue(audioFile);
  //Create a volume transformer
  const transformer = volumeTransformer.createVolumeTransformer();
  //Read the audio file
  const audio = fs.createReadStream(audioFile);
  //Create and audio resource using the volume transformer
  const resource = createAudioResource(audio.pipe(transformer),{inputType: StreamType.OggOpus});
  //Play the audio resource
  player.play(resource);
  
  queue.upNext(interaction, player, channel);
  await interaction.reply(`Now playing ${path.basename(audioFile)}.`);
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName("play")
    .setDescription("Play an audio file")
    .addStringOption((option) =>
      option.setName("filename").setDescription("The name of the audio file to play").setRequired(true)
    ),

  async execute(interaction) {
    const filename = interaction.options.getString("filename");

    const channel = interaction.member?.voice?.channel;
    if (!channel) {
      await interaction.reply(
        "You need to be in a voice channel first. Please join a voice channel and try again."
      );
      return;
    }
    
    const connection = await joinVoiceChannelAndSubscribe(channel, player);
    connectionManager.setConnection(connection);

    if (filename === "queue") {
      return handleQueue(interaction, channel);
    }

    const audioFile = await findAudioFile(filename);

    if (!audioFile) {
      await interaction.reply("Could not find the specified audio file.");
      return;
    }

    return handleFilePlay(interaction, audioFile, channel);
  },
};