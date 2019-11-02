module.exports.executar = async(client, message, args) => {
const embed = require("../extra/embed.js")


const ytdl = require('ytdl-core')

if(message.guild.id !== "624351548411084820") return;
if(!message.member.voiceChannel) return message.channel.send("Por favor se conecte a algum canal de voz.");
//if(message.guild.me.voiceChannel) return message.channel.send("Eu já me encontro conectado a um canal.");
if(!args[0]) return message.channel.send("Por favor insira uma url válida.");
let checarURL = await ytdl.validateURL(args[0])
if(!checarURL) return message.channel.send("Por favor insira uma url válida.");
let user = message.member
if(message.member.voiceChannel) canal = await message.member.voiceChannel.join();

lista.push(args[0])
pegarUrl()

async function pegarUrl() {
let info = await ytdl.getInfo(args[0]).catch(async e => message.channel.send(embed.erro("IMPOSSÍVEL ANALISAR", e)))
if(tocando === true) message.channel.send(embed.tocar(info, message.author))

else tocar()
}

async function tocar() {
	if(lista.length <1 ) {

		message.channel.send(embed.fim());
		return message.member.voiceChannel.leave();
	}
	let desparo = await canal.playStream﻿(ytdl(lista[0], {filter: 'audioonly', quality: 'highest'}));
	let info = await ytdl.getInfo(lista[0]);

	await message.channel.send(embed.tocar(info, message.author))
	tocando = true;
	desparo.setVolume(1);

	desparo.on("end", async e => {
    lista.splice(lista[0], 1)[0]
    tocando = false;
    await pegarUrl();
  })
}


};
module.exports.configuração = {
    nome: "tocar",
    aliases: [],
    categoria: "Músicas",
    ajuda: "nao sei.",
    dono: "N"
};