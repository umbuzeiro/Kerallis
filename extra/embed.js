const Discord = require("discord.js");

module.exports = {
    erro: function (titulo, desc) {
        const embed = new Discord.RichEmbed()
            .setTitle("❌ " + titulo)
            .setColor("#ff0000")
            .setTimestamp()
            if(desc) embed.setDescription("```\n" + desc + "\n```")
            
        return embed;
    },
    sucesso: function (titulo, desc) {
        const embed = new Discord.RichEmbed()
            .setTitle("✅ " + titulo)
            .setColor("#00ff00")
            .setTimestamp()
            if(desc) embed.setDescription("```\n" + desc + "\n```")
        return embed;
    },
    alerta: function (titulo, desc) {
        const embed = new Discord.RichEmbed()
            .setTitle("⚠ " + titulo)
            .setColor("#ffff00")
            .setTimestamp()
            if(desc) embed.setDescription("```\n" + desc + "\n```")
        return embed;
    },
    comando: function (titulo, desc) {
        const embed = new Discord.RichEmbed()
            .setTitle("📝 " + titulo)
            .setColor("#ffffff")
            .setTimestamp()
            if(desc) embed.setDescription("```\n" + desc + "\n```")
        return embed;
    },
    blacklist: function (tag, avatar, motivo, autor) {
        const embed = new Discord.RichEmbed()
            .setAuthor(tag + " BLACKLIST", avatar)
            .setColor("#ff0000")
            .addField("Motivo", "```\n" + motivo + "\n```", true)
        return embed;
    },
    msgapagada: function (client, message) {
        const embed = new Discord.RichEmbed()
        .setColor("#ff0000")
        .addField("Conteúdo", "```\n" + message.content + "\n```", true)
        .setTimestamp()
        .setFooter(message.guild.name, message.guild.iconURL);
        if(message.author.avatarURL) embed.setAuthor(message.author.tag + " ❌ MENSAGEM APAGADA", message.author.avatarURL)
            
            
        return embed;
    },
    starboard: function (message, user) {
        const embed = new Discord.RichEmbed()
        .setColor("#ffff00")
        .setFooter("Adicionado por " + user.tag, user.avatarURL)
        .setTimestamp()
        if(message.content) embed.addField("Mensagem", message.content, true)
        if(message.author.avatarURL) embed.setAuthor(message.author.tag + " ⭐ STARBOARD", message.author.avatarURL)
            let att = Array.from(message.attachments.values())
       att.map(c => {
        let jeba = c.proxyURL.split(".").slice(-1)
        let jebaUrl = c.proxyURL;

        if(jeba.toString() === "png" ||jeba.toString() === "jpg") embed.setImage(jebaUrl.toString())

    });

       if(att[0]) embed.addField("Arquivos anexados", att.map(c => c.proxyURL).join(", "), true)
        return embed;
    },
    tocar: function (info, user) {
        let segundosTotal = info.length_seconds;
        let horas = Math.floor(segundosTotal / 3600);
        segundosTotal %= 3600;
        let minutos = Math.floor(segundosTotal / 60);
        if(minutos < 10) minutos = "0" + minutos;
        let segundos = segundosTotal % 60;
        if(segundos < 10) segundos = "0" + segundos;
        let duração = segundos;
        if(minutos > 0) duração = minutos + ":" + duração;
        if(horas > 0) duração = horas + ":" + duração;
        const embed = new Discord.RichEmbed()
        .setTitle(info.title)
        .setThumbnail(info.player_response.videoDetails.thumbnail.thumbnails[0].url)
        .setColor("#ffff00")
        .setFooter("Adicionado por " + user.tag, user.avatarURL)
        .setTimestamp()
        .addField("Descrição", "```" + info.player_response.videoDetails.shortDescription.slice(0, 20) + "..." + "```", true)
        .setAuthor(info.author.name, info.author.avatar, info.video_url)
        .addField("Duração", "```" + duração + "```", true)


        return embed;
    },
    fim: function () {
        
        const embed = new Discord.RichEmbed()
        .setTitle(":stop_button:  As músicas da lista acabaram.")
        .setColor("#ff0000")
        .setTimestamp()
       


        return embed;
    },
    entrar: function (member) {
        
        const embed = new Discord.RichEmbed()
        .setAuthor(member.user.tag, member.user.avatarURL)
        .setThumbnail(member.user.avatarURL)
        .setTitle("Bem-vindo(a)")
        .setDescription("Esperamos que você se dirvita em nosso servidor.\nÉ importante o respeito aos demais membros.")
        .setFooter(member.guild.name, member.guild.iconURL)
        .setTimestamp()
       


        return embed;
    },
    ajuda: function (client, args, prefix) {
        function removeDups(names) {
  let unique = {};
  names.forEach(function(i) {
    if(!unique[i]) {
      unique[i] = true;
    }
  });
  return Object.keys(unique);
}


        const embed = new Discord.RichEmbed()
        .setColor("#ffffff")
        .setTimestamp()

         const embed2 = new Discord.RichEmbed()
        .setTitle("🔧 COMANDOS")
        .setColor("#ffffff")
        .setTimestamp()

        let comando = client.comandos.filter(f => f.configuração.nome === args[0])
        let nome = comando.map(c => c.configuração.nome)
        if(nome[0]){
        let nomef = nome[0];
        let aliases = comando.map(c => c.configuração.aliases).toString()

        if(nomef) embed.setTitle("🔧 " + nomef.toUpperCase())
        if(comando.map(c => c.configuração.ajuda)[0]) embed.setDescription(comando.map(c => "Prefixo do bot: " + prefix + "\n" + c.configuração.ajuda))
        if(aliases.length > 0) embed.addField(":repeat: Aliases", comando.map(c => "```\n" + aliases + "\n```"), true)
        if(comando.map(c => c.configuração.categoria)[0]) embed.addField(":pencil: Categoria", comando.map(c => "```\n" + c.configuração.categoria + "\n```"), true)
        if(comando.map(c => c.configuração.dono)[0]) embed.addField(":zap: Dono", comando.map(c => "```\n" + c.configuração.dono + "\n```"), true)

        return embed;
}else{
    let categoriasNomes = [];
    let categorias = client.comandos.filter(f => f.configuração.categoria).map(m => {
    categoriasNomes.push(m.configuração.categoria);
    })
    let categoria = removeDups(categoriasNomes)

    for (var i = categoria.length - 1; i >= 0; i--) {
        embed2.addField(":white_small_square: " + categoria[i], "```\n" + client.comandos.filter(f => f.configuração.categoria === categoria[i]).map(m => prefix + m.configuração.nome).join(", ", true) + "\n```", true)
        
    }

    return embed2;  
    }
}
};