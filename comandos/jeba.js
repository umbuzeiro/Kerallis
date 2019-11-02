const Discord = require("discord.js");
module.exports.executar = async(client, message, args) => {
    
    function embed(titulo, desc){
    const embed = new Discord.RichEmbed()
            .setTitle(titulo)
            .setDescription(desc)
            .setColor("#ffffff")
            .setTimestamp()
    return embed;
        }
    message.channel.send(embed(args[0], args[1]))

};
module.exports.configuração = {
    nome: "jeba",
    aliases: [],
    ajuda: "jeba.",
    dono: "Y"
};