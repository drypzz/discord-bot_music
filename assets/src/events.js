const { MessageEmbed } = require('discord.js');
const { player } = require('.');

module.exports = async () => {
    player.on('trackStart', async(queue, track) => {
        const embed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle('@elseMusic - Tocando')
        .setURL('https://github.com/drypzz/')
        .setThumbnail('https://i.imgur.com/np8YEZT.png')
        .setAuthor({ name: 'elseMusic', iconURL: 'https://i.imgur.com/np8YEZT.png'})
        .addFields(
            {name: '🎧 Tocando agora: ', value: `\`${track.title}\``},
            {name: '\u200B', value: '\u200B'},
            {name: '|| Pausar: ', value: `\`!p\` ou \`!pause\``, inline: true},
            {name: '▷ Tocar: ', value: `\`!r\` ou \`!resume\``, inline: true},
            {name: 'X Parar: ', value: `\`!st\` ou \`!stop\``, inline: true},
            {name: '→ Pular: ', value: `\`!s\` ou \`!skip\``, inline: true},
        )
        .setFooter({ text: `Copyright ©️ `+ new Date().getFullYear(), iconURL: 'https://i.imgur.com/np8YEZT.png' });
        queue.metadata.channel.send({ embeds: [embed]});
    });
    player.on('trackAdd', async(queue, track) => {
        const embed2 = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle('@elseMusic - Playlist')
        .setURL('https://github.com/drypzz/')
        .setThumbnail('https://i.imgur.com/np8YEZT.png')
        .setAuthor({ name: 'elseMusic', iconURL: 'https://i.imgur.com/np8YEZT.png'})
        .addFields(
            {name: '🎶 Musica adicionada a playlist: ', value: `\`${track.title}\``},
            {name: '\u200B', value: '\u200B'},
            {name: '|| Pausar: ', value: `\`!p\` ou \`!pause\``, inline: true},
            {name: '▷ Tocar: ', value: `\`!r\` ou \`!resume\``, inline: true},
            {name: 'X Parar: ', value: `\`!s\`t ou \`!stop\``, inline: true},
            {name: '→ Pular: ', value: `\`!s\` ou \`!skip\``, inline: true},
        )
        .setFooter({ text: `Copyright ©️ `+ new Date().getFullYear(), iconURL: 'https://i.imgur.com/np8YEZT.png' });
        queue.metadata.channel.send({ embeds: [embed2]});
    });
};