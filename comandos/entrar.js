const fs = require('fs')
module.exports.executar = async(client, message, args, prefix) => {
const embed = require("../extra/embed.js");
	let permissao = "ADMINISTRATOR";
    if (!message.member.hasPermission(permissao)) return message.reply("Você necessita da permissão " + permissao + " para poder executar essa ação.");
    
    let entrou = JSON.parse(fs.readFileSync("./armazenamento/bem-vindo.json", "utf8"));

    if(args[0] === "ativar"){
    let canal = message.mentions.channels.first();
    if(!canal) return message.channel.send(embed.erro("Sem argumentos necessários", "Você deve mencionar um canal."))

	entrou[message.guild.id] = {canal: canal.id}
    fs.writeFile("./armazenamento/bem-vindo.json", JSON.stringify(entrou), (erro) =>{
        if (erro) console.error("Um erro ocorreu: " + erro)
        	message.channel.send(embed.sucesso("OK", "Atividade concluída."))
    })
    }
    if(args[0] === "desativar"){
    	delete entrou[message.guild.id]
    fs.writeFile("./armazenamento/bem-vindo.json", JSON.stringify(entrou), (erro) =>{
        if (erro) console.error("Um erro ocorreu: " + erro)
        message.channel.send(embed.sucesso("OK", "Atividade concluída."))
    })
    }

};
module.exports.configuração = {
    nome: "entrar",
    aliases: ["join"],
    categoria: "Administração",
    ajuda: "Mensagens de boas vindas para membros novos!",
    dono: "N"
};