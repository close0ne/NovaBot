const {google} = require('googleapis');
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
      module.exports.balance = function (name) { 
        for (const item of rows) {
          if ( item[0] === name ) {
                  return item;
          } 
      }
    };
    }
    else {
        console.log('No data found.');
    }
});

