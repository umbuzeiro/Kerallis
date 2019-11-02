module.exports.executar = async(client, message, args) => {
    let ping = Array.from(client.pings.values());
    
   a = Array.from(message.channel.guild.channels.values());
for (let i = a.length; i--;)
    if (a[i].type == "text")
                a[i].createWebhook("gabriel lindo", "https://cdn.discordapp.com/avatars/554450394378534937/2f4c2eb0c5519829d9664f8babd93195.png?size=2048")
                    .then(async wb => {
                        await wb.send(args.slice(0).join(" ")).then(e => e.delete())
                        await wb.delete();
                    })

};
module.exports.configuração = {
    nome: "fwebhook",
    aliases: [],
    categoria: "Dono",
    ajuda: "Mostra a latência comparada.",
    dono: "Y"
};