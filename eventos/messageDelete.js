
const embed = require("../extra/embed.js")

module.exports = async (client, message) => {
    if (message.content.toLowerCase().startsWith("k")) return;
    if(message.guild.id !== "624351548411084820") return;
    if(message.author.bot) return;
    client.channels.get("624352560127672331").send(embed.msgapagada(client, message));
    
};