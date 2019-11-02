module.exports.executar = async(client, message, args) => {
    let ping = Array.from(client.pings.values());
    
    if(args[0] === "anterior"){
        ping.map(c => message.channel.send("anterior: " + c)).join(", ")
        return;
    }
    const msg = await message.channel.send("LATÊNCIA...");
    message.channel.send("mensagem: " + (msg.createdTimestamp - message.createdTimestamp) + "\nwebsocket: " + client.ping)
    msg.delete();

};
module.exports.configuração = {
    nome: "ping",
    aliases: ["jeb", "latencia"],
    categoria: "Geral",
    dono: "N"
};