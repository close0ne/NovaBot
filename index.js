const {google} = require('googleapis');
const Discord = require('discord.js');
const client = new Discord.Client();
const { token, prefix } = require('./auth.json');

client.on('message', message => {

  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(' ');
  const command = args.shift().toLowerCase();

  if (command === 'balance') {
    if (!args.length) {
      return message.channel.send(`${message.author} - Treba zadat meno - !balance pepega`);
    }

      const Upper = args[0].charAt(0).toUpperCase() + args[0].slice(1);

      const sheets = google.sheets('v4');
        const request = {
          spreadsheetId: '1k3JDS85f8IHA8XqFLJYw2-8EWsNkXWOn0q1GDuMLIn4',
          range: 'B8:E', 
          valueRenderOption: 'FORMATTED_VALUE', 
          dateTimeRenderOption: 'SERIAL_NUMBER',  
          auth: '',
        };

        sheets.spreadsheets.values.get(request, function(err, response) {
          if (err) {
            console.error(err);
            return;
          }
          const rows = response.data.values;
          if (rows.length) {
            for (const item of rows) {
              if (item[0] === Upper) {
                  if (typeof item[3] === "undefined") {
                    message.channel.send(`Meno: ${item[0]}\nBalance: ${item[2]}`);
                    break;
                  } else if (typeof item[2] === "undefined" || item[2] === '') {
                    message.channel.send(`Meno: ${item[0]}\nPaid: ${item[3]}`);
                    break;
                  } else {
                    message.channel.send(`Meno: ${item[0]}\nBalance: ${item[2]}\nPaid: ${item[3]}`);
                    break;
                  }
                } 
              } 

            } else {
              console.log('No data found.');
              }
        });

  } else {
          return message.channel.send(`${message.author} - Ty si dobra pepega`);
  };
});

client.login(token);
