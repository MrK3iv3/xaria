bot.login(process.env.TOKEN); 
const Discord = require("discord.js");
const bot = new Discord.Client();
var prefix = ("_")
var bienvenue = ("général")
//var Staff = (" ")

bot.on('ready', function() {
    bot.user.setGame(`_help| ${bot.guilds.size} familles avec ${bot.users.size} membres`)
    console.log(`Connecté`);
});
bot.on("guildMemberAdd", member =>{
    member.guild.channels.find("name", bienvenue).send(`Bienvenue à ${member} sur le serveur`)
});
bot.on("guildMemberRemove", member =>{
    member.guild.channels.find("name", bienvenue).send(`Aurevoir à ${member} tu part du serveur`)
});
bot.on("guildMemberAdd", member =>{
    var role = member.guild.roles.find("name", );
    member.addRole(role);
});
//command bot
bot.on('message', message =>{
//help command
    if(message.content === prefix + "help"){
        message.channel
        var embed = new Discord.RichEmbed()
            .setTitle("_help/(Aide)")
            .setDescription("liste des commands")
            .addField("_help", "pour vous aidez", true)
            .addField("_info", "pour des infos sur vous\net le serveur", true)
            .addField("_kick", "pour kick", true)
            .addField("_ban", "pour ban", true)
            .addField("Le serveur de Xaria", "(https://discord.gg/chuKm)", true)
            .addField("_kick et _ban son pour le Staff", "Pour le bon fonctionnement du \nBot créer un grade Staff", true)
            .setColor("0x0080FF")
            .setFooter("Merci de m'avoir demandé les commants. ;)")
        message.channel.sendEmbed(embed);
    };
    if(message.content === prefix + "info"){
        var embed = new Discord.RichEmbed()
            .setTitle("_info/(Info)")
            .setDescription("information pour vous")
            .addField("Nom de la Famille ", message.guild.name)
            .addField("Créer le ", message.guild.createdAt)
            .addField(`Tu es devenue membre de la famille ${member} le `, message.member.joinedAt)
            .addField("Le serveur de Xaria", "(https://discord.gg/chuKm)", true)
            .setColor("0x0080FF")
            .setFooter("Merci de m'avoir demandé les infos. ;)")
        message.channel.sendEmbed(embed);
    }
//kick command
    let command = message.content.split(" ")[0];
    const args = message.content.slice(prefix.length).split(/ +/);
    command = args.shift().toLowerCase();
    if(command === "kick"){
        let modRole = message.guild.roles.find("name", "Staff")
        if(!message.member.roles.has(modRole.id)){
            return MessageEmbed.reply("Désolé mais tu n'est pas admin.").catch(console.error);
        };
        if(message.mentions.users.size === 0){
            return message.reply("Tu a oublié de mentionner une personne merci de le faire.").catch(console.error);
        };
        let kickMembre = message.guild.member(message.mentions.users.first());
        if(!kickMembre){
            return message.reply("Désolé mais l'utilisateur n'ai pas sur se serveur.");
        };
        if(!message.guild.member(bot.user).hasPermission("KICK_MEMBERS")){
            return message.reply("Je n'ai pas l'autorisation de le Kick.").catch(console.error)
        };
        kickMembre.kick().then(member => {
            message.reply("Le membre à bien êtait kick.").catch(console.error);
        });
    };
//ban command
    if(command === "ban"){
        let modRole = message.guild.roles.find("name", "Staff")
        if(!message.member.roles.has(modRole.id)){
            return MessageEmbed.reply("Désolé mais tu n'est pas admin.").catch(console.error);
        };
        const member = message.mentions.members.first();
        if (!member) return message.reply("Tu a oublié de mentionner une personne merci de le faire.");
        member.ban().then(member => {
           message.reply(`Le membre à bien êtait ban`).catch(console.error);
        });
    }
}); 
