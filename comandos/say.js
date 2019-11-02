module.exports.executar = async(client, message, args) => {
    
    var say = args.slice(1).join(" ");
  var usuario = message.mentions.users.first();
if(!usuario) return message.reply("Você deve mencionar algum usuário.")

var avatarURL = usuario.avatarURL;
if(!avatarURL) return message.reply("o avatar deste usuário não é válido.")

  if(message.content.includes("@here")) return message.reply("kkkkkkk nein vein")
  if(message.content.includes("@everyone")) return message.reply("kkkkkkk nein vein")
    await message.channel.createWebhook(usuario.username, avatarURL).then(async webhook => {
      await webhook.send(say)
      await webhook.delete("Concluído comando de say de " + message.author.tag + ": " + say)
    })

};
module.exports.configuração = {
    nome: "say",
    aliases: [],
    categoria: "Diversão",
    ajuda: "Mensagem enviada por webhook.",
    dono: "N"
};