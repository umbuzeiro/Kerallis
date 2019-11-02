const sqlite3 = require('sqlite3').verbose();
let canais = new sqlite3.Database('./db/canais.db');
const embed = require("../extra/embed.js");
module.exports = async (client, messageReaction, user) => {


	let permissao = "MANAGE_CHANNELS";
	let executor = messageReaction.message.guild.member(user);
    if (!executor.hasPermission(permissao)) return;
	//if(messageReaction.message.author.bot) return;

	await canais.run("CREATE TABLE IF NOT EXISTS starboard(servidor text, canal text, ativar text, UNIQUE(servidor))", function (erro) {
		if (erro) console.log(erro.message)
		canais.run("INSERT OR IGNORE INTO starboard(servidor) VALUES (?)", messageReaction.message.guild.id)
	});

    await canais.get("SELECT canal canal, ativar ativar FROM starboard WHERE servidor =?", [messageReaction.message.guild.id], function (erro, resultado) {
        if (erro) return console.log("Erro ao pegar informações no banco de dados CANAIS > STARBOARD: " + erro.message)

if(messageReaction.emoji.name === "⭐"){

        let canal = messageReaction.message.channel;
    if(resultado.ativar ==! "Y") return;
    if(!resultado.canal) return canal.send(embed.alerta("CANAL NÃO DEFINIDO", "O canal de starboard não foi definido, use o comando kstarboard canal #canal"))
	let starCanal = client.channels.get(resultado.canal);
	if(messageReaction.message.channel.id === starCanal.id) return;
	if(!starCanal) return canal.send(embed.erro("CANAL COM ERRO", "O canal pode ter sido deletado ou eu não tenho permissão para enviar mensagens nele.\nUse o comando kstarboard canal #canal"))

	
	
	
    starCanal.send(embed.starboard(messageReaction.message, user)).then(async a=>{
    	a.react("⭐")
    })
    return;
}


            })


}