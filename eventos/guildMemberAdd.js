const fs = require('fs')
const embed = require("../extra/embed.js");
let prefix = 'k';


module.exports = async (client, member) => {
    
    /*Comando: entrou*/
    let entrou = JSON.parse(fs.readFileSync("./armazenamento/bem-vindo.json", "utf8"));
    if(!entrou[member.guild.id]) return;
    else{
        let canal = client.channels.get(entrou[member.guild.id].canal);
        if(!canal) return;
        canal.send(embed.entrar(member));
        canal.send(member.toString()).then(a => a.delete())
    }
    
};