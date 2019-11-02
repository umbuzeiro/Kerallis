module.exports.executar = async(client, message, args) => {

if(message.guild.id !== "458026655181438987") return;

message.guild.createChannel(message.author.username + "-ticket", {type: 'text', parent: '632357025820704778', topic: "Ticket aberto por " + message.author}).then(canal =>{

canal.overwritePermissions(message.author, {
 SEND_MESSAGES: true
})
canal.send("Ticket aberto por " + message.author).then(jeba =>{
	jeba.react('🔒')
	jeba.react('🔓')
	jeba.react('⛔')
})

})


};
module.exports.configuração = {
    nome: "ticket",
    aliases: [],
    categoria: "Dono",
    ajuda: "DOno",
    dono: "Y"
};