
const fs = require('fs');
const readline = require('readline');
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
		return message.channel.send(`Treba uviest cislo sheetu a meno !balance 1 pepega, ${message.author}!`);
  }

var sheets = google.sheets('v4');
authorize(function(authClient) {
  var request = {
    spreadsheetId: '1k3JDS85f8IHA8XqFLJYw2-8EWsNkXWOn0q1GDuMLIn4',
    range: 'B8:E', 

    valueRenderOption: 'FORMATTED_VALUE', 
    dateTimeRenderOption: 'SERIAL_NUMBER',  
    auth: authClient,
  };

  sheets.spreadsheets.values.get(request, function(err, response) {
    if (err) {
      console.error(err);
      return;
    }
    const rows = response.data.values;
    if (rows.length) {
      for (const item of rows) {
      if (item[0] === args[0]) {
        if (typeof item[3] === "undefined") {
          message.channel.send(`Meno: ${item[0]}\nBalance: ${item[2]}`);
        } else if (typeof item[2] === "undefined" || item[2] === '') {
          message.channel.send(`Meno: ${item[0]}\nPaid: ${item[3]}`);
        } else
        message.channel.send(`Meno: ${item[0]}\nBalance: ${item[2]} :gold:\nPaid: ${item[3]}`);
        }
      } message.channel.send(`Meno neexistuje`)
    } else {
      message.channel.send(`Something woooong`)
    }
  });
});

function authorize(callback) {
  var authClient = '';

  if (authClient == null) {
    console.log('authentication failed');
    return;
  }
  callback(authClient);
}

} else {
        return message.channel.send('Something wooong');
};
});

client.login(token);
