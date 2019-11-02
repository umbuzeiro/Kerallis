module.exports.executar = async(client, message, args) => {
    
    message.channel.send("https://discordapp.com/channels/" + message.guild.id + "/" + args[0]).then(async a =>{
        a.delete(10000)
    })
  
};
module.exports.configuração = {
    nome: "url",
    aliases: [],
    categoria: "Dono",
    ajuda: "Mostra a latência comparada.",
    dono: "Y"
};