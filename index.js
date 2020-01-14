const Discord = require('discord.js');
const client = new Discord.Client();
const {google} = require('googleapis');
const sheets = google.sheets('v4');
const request = require('./auth/req.json');
const { token, prefix } = require('./auth/auth.json');

client.on('message', message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;
  const args = message.content.slice(prefix.length).split(' ');
  const command = args.shift().toLowerCase();

    if (command === 'balance') {
      if (!args.length) {
        return message.channel.send(`${message.author} - Treba zadat meno - !balance pepega`);
      }

        const name = args[0].charAt(0).toUpperCase() + args[0].slice(1);

        sheets.spreadsheets.values.get(request, function(err, response) {
          if (err) {
              console.error(err);
              return;
          }
          const rows = response.data.values;
          for (const item of rows) {
            if ( item[0] === name ) {
              const balance = item;
              const meno = balance[0];
              const pending = balance[2];
              const paid = balance[3];
                if (typeof(paid) == "undefined") {
                  return message.channel.send(`Meno: ${meno}\nPending: ${pending}`);
                } else if (typeof(pending) == "undefined" || pending == "") {
                  return message.channel.send(`Meno: ${meno}\nPaid: ${paid}`);
                } else {
                  return message.channel.send(`Meno: ${meno}\nPaid: ${paid}\nPending: ${pending}`);
                };
              }
            };
      });
    } else {
            return message.channel.send(`${message.author} - Ty si dobra pepega`);
    };
});

client.login(token);
