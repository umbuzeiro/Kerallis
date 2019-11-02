const sqlite3 = require('sqlite3').verbose();
let canais = new sqlite3.Database('./db/canais.db');
const embed = require("../extra/embed.js");

module.exports.executar = async(client, message, args) => {
    
    let permissao = "MANAGE_CHANNELS";
    if (!message.member.hasPermission(permissao)) return message.channel.send(embed.erro("SEM PERMISSÃO", "Você necessita da permissão " + permissao + " para poder executar esse comando."));

    await canais.run("CREATE TABLE IF NOT EXISTS starboard(servidor text, canal text, ativar text, UNIQUE(servidor))", function (erro) {
        if(erro) message.channel.send(embed.erro("ERRO NO SQLITE", "Um erro ocorreu enquanto registrava dados no SQLite: " + erro.message))
        canais.run("INSERT OR IGNORE INTO starboard(servidor) VALUES (?)", message.guild.id)
    });

    await canais.get("SELECT canal canal, ativar ativar FROM starboard WHERE servidor =?", [message.guild.id], function (erro, resultado) {
        if(erro) message.channel.send(embed.erro("ERRO NO SQLITE", "Um erro ocorreu enquanto solicitava dados do SQLite: " + erro.message))
 if(args[0] === "canal"){
    let canal = message.mentions.channels.first();
    if(!canal) return message.channel.send(embed.erro("CANAL INEXISTENTE", "Você deve mencionar algum canal no segundo argumento.\nEx.: kstarboard canal #starboard"))
    canais.run("UPDATE starboard SET canal=? WHERE servidor=?", [canal.id, message.guild.id], function (erro) {
            if (erro) return message.channel.send(embed.erro("Um erro ocorreu no registro no banco de dados, tente fazer a requisição novamente.", erro.message))
            message.channel.send(embed.sucesso("CONCLUÍDO!", "DADOS ATUALIZADOS."))
        return;
        });
 }
 else if(args[0] === "desativar"){
     canais.run("UPDATE starboard SET ativar=? WHERE servidor=?", ["N", message.guild.id], function (erro) {
            if (erro) return message.channel.send(embed.erro("Um erro ocorreu no registro no banco de dados, tente fazer a requisição novamente.", erro.message))
            message.channel.send(embed.sucesso("CONCLUÍDO!", "DADOS ATUALIZADOS."))
        return;
        });
 }
 else if(args[0] === "ativar"){
     canais.run("UPDATE starboard SET ativar=? WHERE servidor=?", ["Y", message.guild.id], function (erro) {
            if (erro) return message.channel.send(embed.erro("Um erro ocorreu no registro no banco de dados, tente fazer a requisição novamente.", erro.message))
            message.channel.send(embed.sucesso("CONCLUÍDO!", "DADOS ATUALIZADOS."))
        return;
        });
 }
 else{
    return message.channel.send(embed.erro("SEM ARGUMENTOS", "Uso correto: kstarboard canal/ativar/desativar."))
 }
})

};
module.exports.configuração = {
    nome: "starboard",
    aliases: [],
    categoria: "Administração",
    ajuda: "Comando de configuração do starboard!",
    dono: "N"
};