const Discord = require('discord.js');
const client = new Discord.Client();
const { token, prefix } = require('./auth/auth.json');
const sheet = require('./read.js');

client.on('message', message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;
  const args = message.content.slice(prefix.length).split(' ');
  const command = args.shift().toLowerCase();

    if (command === 'balance') {
      if (!args.length) {
        return message.channel.send(`${message.author} - Treba zadat meno - !balance pepega`);
      }

      const name = args[0].charAt(0).toUpperCase() + args[0].slice(1);
      const balance = sheet.balance(name);

      const meno = balance[0];
      const pending = balance[2];
      const paid = balance[3];

    } else {
            return message.channel.send(`${message.author} - Ty si dobra pepega`);
    };
});

client.login(token);
