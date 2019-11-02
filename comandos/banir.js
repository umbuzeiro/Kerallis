const sqlite3 = require('sqlite3').verbose();
let canais = new sqlite3.Database('./db/canais.db');
const embed = require("../extra/embed.js");
const Discord = require("discord.js");
module.exports.executar = async(client, message, args) => {

	let permissao = "BAN_MEMBERS";
    if (!message.member.hasPermission(permissao)) return message.reply("Você necessita da permissão " + permissao + " para poder executar essa ação.");
    if (!args[0]) return message.reply("Uso correto: kbanir @usuario motivo")
    //canal
	canais.run("INSERT OR IGNORE INTO banir(servidor) VALUES (?)", message.guild.id)

    if (args[0] === "canal") {
    	canais.run("CREATE TABLE IF NOT EXISTS banir(servidor text, canal text, UNIQUE(servidor))");
        let canal = message.mentions.channels.first();
        if (!canal) return message.reply("Argumentos faltando! Uso correto: kbanir canal #canal")

        message.channel.send("OK")
        
        await canais.get("SELECT servidor servidor, canal canal FROM banir WHERE servidor =?", [message.guild.id], function (erro, resultado) {
                if(erro) console.log(erro);
                canais.run("UPDATE banir SET canal=? WHERE servidor=?", [canal.id, message.guild.id], function (erro) {
            if (erro) return message.channel.send(embed.erro("Um erro ocorreu no registro no banco de dados, tente fazer a requisição novamente.", erro.message))
            message.channel.send(embed.sucesso("CONCLUÍDO!", "DADOS ATUALIZADOS."))
        });
            })

        return;
    }

    //Busca usuário do argumento 0
    var usuario = message.guild.members.get(args[0]) || client.users.find(usuario => usuario.username.toLowerCase() == args[0].toLowerCase()) || message.mentions.members.first();
    if (!usuario) return message.reply(embed.erro("Ops", "Hmmm, minha busca por " + args[0] + " não encontrou nada, me desculpe."))

	//Tratamento do motivo
	var motivo = args.slice(1).join(" ");
    if (!motivo) var motivo = "Não especificado.";

	if(!usuario.kickable) return message.reply("Inferno diabo caralho puta que pariu meu deus não posso banir esse nego jumento o cargo desse fdp é maior q o meu.");

    //Testando se o canal de ban está definido
    let canalID = '';
    await canais.get("SELECT canal canal FROM banir WHERE servidor =?", [message.guild.id], function (erro, resultado) {
        if (erro) return message.channel.send(embed.erro("Um erro ocorreu no registro no banco de dados, tente fazer a requisição novamente.", erro.message));
        if(!resultado.canal) return canalID = 0;

            })

	//var kick_id = "584762751952355347";

	const banir_embed = new Discord.RichEmbed()
            .setTitle(usuario.user.tag + " | Banido")
            .setColor("#ff0000")
            .setDescription("O usuário foi punido, fazer o que né, quebrou as regras levou punição!")
            .setThumbnail(usuario.user.avatarURL)
            .addField("Tag do usuário", usuario.user.tag, true)
            .addField("ID do usuário", usuario.id, true)
            .addField("Quem puniu", message.author.tag, true)
            .addField("Motivo", motivo, true)
			.setTimestamp()
        .setFooter("ID do usuário: " + usuario.id)


    await usuario.ban(7, motivo).catch(async e => message.channel.send(e)).then(async a => {
    	if(canalID === 0) message.channel.send(embed.alerta("CANAL NÃO DEFINIDO", "O canal de log de banimento ainda não foi definido nessa guild, por favor use o comando kbanir canal #canal."))
        else client.channels.get(canalID).send(banir_embed).catch();
        await message.channel.send(":tada: **|** <@" + message.author.id + "> Usuário punido com sucesso!")
    })
    return;

};
module.exports.configuração = {
    nome: "banir",
    aliases: ["ban", "punir"],
    categoria: "Administração",
    ajuda: "Bane um usuário do servidor.",
    dono: "N"
};