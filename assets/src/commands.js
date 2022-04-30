const { MessageEmbed } = require('discord.js');
const { player } = require('.');

module.exports = async (client, msg, args, command) => {
    if(command === 'tocar'){
        const channel = msg.member.voice.channel;
        if(!channel)
            return msg.channel.send('Você precisa entrar no canal de voz!');

        const search_music = args.join(' ');
        if(!search_music)
            return msg.channel.send('Digite o nome ou link da musica!!!');

        const queue = player.createQueue(msg.guild.id, {
            metadata:{
                channel: msg.channel,
            },
        });

        try {
            if(!queue.connection) await queue.connect(channel);
        } catch (error){
            queue.destroy();
            return await msg.reply({
                content: 'Não foi possivel entrar no server!!',
                ephemeral: true,
            });
        };

        const song = await player.search(search_music, {
            requestedBy: msg.author,
        }).then((x) => x.tracks[0])
        client.user.setActivity(song.title, {type: 'LISTENING'});
        if(!song) return msg.reply(`Erro ao encontrar a musica: ${search_music}!!!`);
        queue.play(song);

        const embed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle('@elseMusic - Search')
        .setURL('https://github.com/drypzz/')
        .setAuthor({ name: 'elseMusic', iconURL: 'https://i.imgur.com/np8YEZT.png'})
        .addFields(
            {name: '🔎 Buscando musica... ', value: `\`${song.title}\``},
        )
        .setFooter({ text: `Copyright ©️ `+ new Date().getFullYear(), iconURL: 'https://i.imgur.com/np8YEZT.png' });
        msg.channel.send({ embeds: [embed]});

    }else if(command === 'skip' || command === 's'){
        const queue = player.getQueue(msg.guild.id);
        queue.skip();

        const embedSend = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle('@elseMusic - Skip')
        .setURL('https://github.com/drypzz/')
        .setAuthor({ name: 'elseMusic', iconURL: 'https://i.imgur.com/np8YEZT.png'})
        .setDescription('⏭️ Proxima musica...')
        .setFooter({ text: `Copyright ©️ `+ new Date().getFullYear(), iconURL: 'https://i.imgur.com/np8YEZT.png' });
        msg.channel.send({ embeds: [embedSend]});

    }else if(command === 'stop' || command === 'st'){
        const queue = player.getQueue(msg.guild.id);
        queue.stop();

        const embedSend = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle('@elseMusic - Stop')
        .setURL('https://github.com/drypzz/')
        .setAuthor({ name: 'elseMusic', iconURL: 'https://i.imgur.com/np8YEZT.png'})
        .setDescription('🛑 Pediu para parar, parouuu...')
        .setFooter({ text: `Copyright ©️ `+ new Date().getFullYear(), iconURL: 'https://i.imgur.com/np8YEZT.png' });
        msg.channel.send({ embeds: [embedSend]});

    }else if(command === 'pause' || command === 'p'){
        const queue = player.getQueue(msg.guild.id);
        queue.setPaused(true);

        const embedSend = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle('@elseMusic - Pause')
        .setURL('https://github.com/drypzz/')
        .setAuthor({ name: 'elseMusic', iconURL: 'https://i.imgur.com/np8YEZT.png'})
        .setDescription('⏸️ Musica pausada...')
        .setFooter({ text: `Copyright ©️ `+ new Date().getFullYear(), iconURL: 'https://i.imgur.com/np8YEZT.png' });
        msg.channel.send({ embeds: [embedSend]});

    }else if(command === 'resume' || command === 'r'){
        const queue = player.getQueue(msg.guild.id);
        queue.setPaused(false);

        const embedSend = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle('@elseMusic - Resume')
        .setURL('https://github.com/drypzz/')
        .setAuthor({ name: 'elseMusic', iconURL: 'https://i.imgur.com/np8YEZT.png'})
        .setDescription('🎶 Continuando a tocar...')
        .setFooter({ text: `Copyright ©️ `+ new Date().getFullYear(), iconURL: 'https://i.imgur.com/np8YEZT.png' });
        msg.channel.send({ embeds: [embedSend]});
    };
};