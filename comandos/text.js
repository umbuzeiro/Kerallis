const { createCanvas, loadImage } = require('canvas')
const Discord = require("discord.js");

module.exports.executar = async(client, message, args) => {

const canvas = createCanvas(200, 200)
const ctx = canvas.getContext('2d')
 
const kk = await loadImage('https://cdn.discordapp.com/attachments/624352545674100755/632464664294457344/unknown.png')
ctx.drawImage(kk, 50, 0, 70, 70)
// Write "Awesome!"
ctx.font = '30px Impact'
ctx.rotate(0.1)
ctx.fillText(args.join(" "), 50, 100)
 
// Draw line under text
var text = ctx.measureText('Awesome!')
ctx.strokeStyle = 'rgba(0,0,0,0.5)'
ctx.beginPath()
ctx.lineTo(50, 102)
ctx.stroke()

const final = new Discord.Attachment(canvas.toBuffer(), 'JEBA.png');
message.channel.send(final)


};
module.exports.configuração = {
    nome: "text",
    aliases: [],
    categoria: "Dono",
    ajuda: "text.",
    dono: "Y"
};