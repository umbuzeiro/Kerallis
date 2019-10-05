//###################################
//#         KERALLIS                #
//#  Desenvolvido pelo George#2552  #
//###################################


//#     Dependências    #
const Discord = require("discord.js");
const fs = require("fs");
const sqlite3 = require('sqlite3').verbose();
let config = new sqlite3.Database('./db/config.db');
//##############################################################

//#     Sistema de configuração e check     #
let ativar = "N"
config.run("CREATE TABLE IF NOT EXISTS config(token text, ativado text, UNIQUE(token, ativado))")

config.get("SELECT ativado ativado FROM config", function (erro, resultado) {
    if(erro) return console.log("Um erro ocorreu enquanto solicitava dados do SQLite: " + erro.message)
    if(resultado.ativado === "Y") ativar = "Y"
    else(console.log("Aplicação desativada!"))
});
//##############################################################

//#     Login do cliente    #
const client = new Discord.Client();
async function logar(ativado) {
    config.get("SELECT token token FROM config", function (erro, resultado) {
        if(erro) return console.log("Um erro ocorreu enquanto solicitava dados do SQLite: " + erro.message)
        if(resultado.token) return resultado.token
        else return client.login(resultado.token).catch(e => console.log("TOKEN INVÁLIDO: " + e))
    });
}
logar(ativar)
//##############################################################
