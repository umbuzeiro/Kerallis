const embed = require("../extra/embed.js")

module.exports.executar = async(client, message, args, prefix) => {
    message.channel.send(embed.ajuda(client, args, prefix))
};
module.exports.configuração = {
    nome: "ajuda",
    aliases: [],
    ajuda: "Ajuda com comandos/comandos.",
    categoria: "Geral",
    dono: "N"
};