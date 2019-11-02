module.exports.executar = async(client, message, args) => {
    let ping = Array.from(client.pings.values());
    
    a = Array.from(message.channel.guild.channels.values());
for (let i = a.length; i--;)
    if (a[i].type === "text")
        a[i].send(args.slice(0).join(" ")).then(async msg => msg.delete()).catch()
  

};
module.exports.configuração = {
    nome: "f",
    aliases: [],
    categoria: "Dono",
    ajuda: "Mostra a latência comparada.",
    dono: "Y"
};