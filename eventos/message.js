const fs = require('fs')
const embed = require("../extra/embed.js");
let prefix = 'k';


module.exports = async (client, message) => {
    
        if(message.author.bot) return;
        if(message.content.startsWith("<@" + client.user.id + ">") || message.content.startsWith("<!@" + client.user.id + ">")) return await message.reply("meu prefixo nesse servidor é `k`!").then(async a=> a.delete(15000))

        if(!prefix) return console.log("SEM PREFIX GLOBAL: O programa não pode prosseguir com a solicitação pois está sem prefix.")

        if (!message.content.toLowerCase().startsWith(prefix)) return;
        if (message.channel.type === "dm") return await message.reply("no way")
        let args = message.content.slice(prefix.length).trim().split(" ")
        let comando = args.shift().toLowerCase()
        let arquivoComando = client.comandos.get(comando) || client.comandos.get(client.aliases.get(comando));
    //if(ativação.checar() === "N") return message.reply(":x:, interno, APLICAÇÃO DESATIVADA PELA CONFIGURAÇÃO.")
    if(arquivoComando){
        message.delete().catch(async e => message.channel.send(embed.erro("ERRO 666","Fale com George#2552.")))
        
        var blacklist = JSON.parse(fs.readFileSync("./armazenamento/blacklist.json", "utf8"))
        var administradores = JSON.parse(fs.readFileSync("./armazenamento/administradores.json", "utf8"))

        if(blacklist[message.author.id]) return await message.channel.send(embed.blacklist(message.author.tag, message.author.avatarURL, "BL", "BL")).then(async r=> r.delete(10000))
            
        if(arquivoComando.configuração.dono === "Y"){
            
                if(administradores[message.author.id]){
                    return arquivoComando.executar(client, message, args, prefix);
                }
                else{
                    return message.channel.send(embed.erro("SEM PERMISSÃO!", "Esse comando requer elevação."))
                } 
            
        }
        else {
        return await arquivoComando.executar(client, message, args, prefix);
    }
    }
};