const sqlite3 = require('sqlite3').verbose();
const embed = require("../extra/embed.js");
module.exports.executar = async(client, message, args) => {
    
    var usuario = message.mentions.users.first();
    if(!usuario) return message.reply("uso correto: *blacklist adicionar/remover @usuario motivo*.");
    var motivo = args.slice(2).join(" ");
    if (!motivo) var motivo = "-";
    motivo = motivo + "\nAdicionado por: " + message.author.tag + "."

let usuarios = new sqlite3.Database('./db/usuarios.db');
    if (args[0] === "adicionar") {
        await usuarios.get("SELECT blacklist blacklist FROM usuarios WHERE id =?", [usuario.id], function (erro, resultado) {
                if(erro) console.log(erro);
                if(!resultado) return message.channel.send(embed.erro("X"))
                if(resultado.blacklist === "Y") return message.channel.send(embed.erro("INVÁLIDO","O valor já existe no banco de dados."))
                usuarios.run("UPDATE usuarios SET blacklist=?, motivo=?, autor=? WHERE id=?", ["Y", motivo, message.author.id, usuario.id], function (erro) {
            if (erro) return message.channel.send(embed.erro("Um erro ocorreu no registro no banco de dados, tente fazer a requisição novamente.", erro.message))
            message.channel.send(embed.sucesso("CONCLUÍDO!", "DADOS ATUALIZADOS."))
        });
            })
        
    return await usuarios.close();
    
    }
    if(args[0] === "remover"){
        await usuarios.get("SELECT blacklist blacklist FROM usuarios WHERE id =?", [usuario.id], function (erro, resultado) {
                if(erro) console.log(erro);
                if(!resultado) return message.channel.send(embed.erro("X"))
                if(resultado.blacklist === "N") return message.channel.send(embed.erro("INVÁLIDO","O valor já existe no banco de dados."))
                usuarios.run("UPDATE usuarios SET blacklist=?, motivo=?, autor=? WHERE id=?", ["N", "Removido por: " + message.author.tag, message.author.id, usuario.id], function (erro) {
            if (erro) return message.channel.send(embed.erro("Um erro ocorreu no registro no banco de dados, tente fazer a requisição novamente.", erro.message))
            message.channel.send(embed.sucesso("CONCLUÍDO!", "DADOS ATUALIZADOS."))
        });
            })
        

        return await usuarios.close();
    }

};
module.exports.configuração = {
    nome: "blacklist",
    aliases: [],
    categoria: "Dono",
    ajuda: "Faz com que o client não execute solicitações enviadas por usuários que estão na lista.",
    dono: "Y"
};