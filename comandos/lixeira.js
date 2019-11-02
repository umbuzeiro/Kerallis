const Discord = require("discord.js");
const jimp = require("jimp");
module.exports.executar = async(client, message, args) => {


var usuario = message.mentions.users.first();
if(!usuario) return message.reply("Você deve mencionar algum usuário.")

var avatarURL = usuario.avatarURL;
if(!avatarURL) return message.reply("o avatar deste usuário não é válido.")

var lixeira = await jimp.read("./memes/lixeira.png")

jimp.read(avatarURL).then(async avatar =>{
	await avatar.resize(40, 40)
	await lixeira.composite(avatar, 265, 52).write("./memes/lixeira-final.png")
	await message.reply("", {files: ["./memes/lixeira-final.png"]})
})

};
module.exports.configuração = {
    nome: "lixeira",
    aliases: ["luciano"],
    categoria: "Diversão",
    ajuda: "Lixeira.",
    dono: "N"
};