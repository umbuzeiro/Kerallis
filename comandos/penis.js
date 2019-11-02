const Discord = require("discord.js");
module.exports.executar = async(client, message, args) => {

    function NumeroAleatorio(menor, maior) {
            return Math.round(Math.random() * (maior - menor) + menor);
        }

function QuantidadeCaracteres(numero, digitos) {
            return Array(Math.max(digitos - String(numero).length + 1, 0)).join(0) + numero;
        }
let Member = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]))
if(!args[0]){

  var usuario = message.author.username;
}
else{ 
    if (!Member){
    return message.reply("mencione um usuário válido.")
}
else{
    var usuario = Member;
}

}


var repeat = function (str, count) {
                var array = [];
                for (var i = 0; i < count;)
                    array[i++] = str;
                return array.join('');
            }


                var cm = QuantidadeCaracteres((NumeroAleatorio(1, 21)), 1);
                var peniscorpo = repeat("=", cm);
   

       
                const embed10 = new Discord.RichEmbed()
                    .setFooter("Solicitado por " + message.author.username, message.author.avatarURL)
                    .setColor(0x00ff00)
                    .setTimestamp()
                    .setTitle("Tamanho do pênis!")
                    .addField("Depois de cálculos engenhosamente elaborados...", "Posso afirmar que o tamanho do pênis de " + usuario + " é de " + cm + " centímetros." + "\n\n8" + peniscorpo + "D")

                message.channel.send(embed10);


};
module.exports.configuração = {
    nome: "penis",
    aliases: [],
    ajuda: "Mostra o tamanho do pau.",
    categoria: "Diversão",
    dono: "N"
};