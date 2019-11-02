//###################################
//#         KERALLIS                #
//#  Desenvolvido pelo George#2552  #
//###################################

//#     Dependências    #
const Discord = require("discord.js");
const fs = require("fs");
global.lista = [];
global.tocando = false;
//##############################################################

//#     Login do cliente    #
const client = new Discord.Client();
client.login("NTk3MDkzMDM4MjE2NDQ1OTcz.Xby27g.oRtOs2TQ-0A5Re85Md0Pyiy06qs")

//##############################################################

//#     Sistema de eventos em arquivos separados (event handler)    #
const eventos = fs.readdirSync("./eventos/")

eventos.forEach(async arquivo =>{
    if(arquivo.split(".").slice(-1)[0] !== "js") return;
    console.log("ARQUIVO DE EVENTO " + arquivo + " IMPORTADO!")
    const eventoNome = arquivo.split(".")[0];
    const evento = await require("./eventos/" + arquivo);
    client.on(eventoNome, evento.bind(null, client));
});
//##############################################################

//#     Sistema de comandos em arquivos separados (command handler)    #
const comandos = fs.readdirSync("./comandos/")

client.comandos = new Discord.Collection();
client.aliases = new Discord.Collection();

comandos.forEach(async arquivo =>{
    try{
        const puxar = require("./comandos/" + arquivo)
        if(arquivo.split(".").slice(-1)[0] !== "js") return;
        console.log("ARQUIVO DE COMANDO " + arquivo + " IMPORTADO!")
        client.comandos.set(puxar.configuração.nome, puxar)
        puxar.configuração.aliases.forEach(function (alias){
            client.aliases.set(alias, puxar.configuração.nome)
        })
    }
    catch (e) {
        console.log("erro: " + e)
    }
});
//##############################################################