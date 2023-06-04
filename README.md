# Audiobook Bot for Discord

This Discord bot is designed to play audio files in a voice channel. It supports .mp3, .wav, and .m4b file formats. It can play a single audio file or a queue of files, making it perfect for listening to audiobooks, music, or any other audio content together with your Discord community.

## Features
- Play single audio file or a queue of files
- Supports .mp3, .wav, .m4b file formats
- Basic controls including play, pause, skip, and stop

## Setup Instructions

Follow these steps to set up your own instance of the Audiobook Bot:

1. **Clone this repository**

   Use git to clone this repository to your local machine:
   
   `git clone https://github.com/YourUsername/AudiobookBot.git`

2. **Install dependencies**

Navigate to the project folder and install the necessary npm packages:

`npm install`


3. **Set up a Discord bot**

You'll need to create a new bot on the Discord developer portal and get your bot token. If you're unfamiliar with this process, Discord provides a great guide on [creating a bot](https://discordpy.readthedocs.io/en/stable/discord.html).

4. **Configure your bot**

Create a `.env` file in the root of the project and add your bot token, guild id, and client id like so:

`DISCORD_BOT_TOKEN=YourBotTokenHere`
`GUILD_ID=YourGuildId`
`CLIENT_ID=YourClientId`


5. **Start the bot**

Run the bot using node:

`node src/bot.js`


Your bot should now be running! Invite it to your server using the link provided by Discord when you created your bot.

## Usage

Once the bot is in your server, you can use the following commands:

- `/play <filename>`: Plays the specified audio file in the current voice channel. If a file with the specified name doesn't exist, the bot will respond with an error message.

- `/play queue`: Plays the current queue of audio files in the current voice channel.

## Contributing

If you'd like to contribute, please fork the repository and make changes as you'd like. Pull requests are warmly welcome.

## Issues

If you encounter any issues, please open an issue on this repository. We'll do our best to work on them.

## Licensing

This project is licensed under the MIT License.
