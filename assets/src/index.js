const { Client } = require('discord.js');
const { Player } = require('discord-player');
const { prefix, token } = require('../../config.json');

const client = new Client({
    restTimeOffset: 0,
    shards: 'auto',
    intents: 641,
});

const player = new Player(client, {
    leaveOnEnd: true,
    leaveOnStop: true,
    leaveOnEmpty: true,
    leaveOnEmptyColldown: 5000,
    autoSelfDraf: true,
    initialVolume: 50,
    bufferingTimeout: 3000,
});

module.exports = { player, client };
require('./events')(client);

client.on('ready', () => {
    console.log('Bot is already activated');
    client.user.setActivity('Your Song', {type: 'LISTENING'});
})

client.on('messageCreate', (msg) => {
    if(!msg.guild || msg.author.bot) return;
    if(!msg.content.startsWith(prefix)) return;

    const args = msg.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    require('./commands')(client, msg, args, command)
});

client.login(token);