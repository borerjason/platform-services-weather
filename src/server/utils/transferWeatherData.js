const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');
const sheets = google.sheets('v4');
const TOKEN_PATH = 'credentials.json';
const OAuth2Client = google.auth.OAuth2;

const SCOPES = 'https://www.googleapis.com/auth/spreadsheets';
const { buildData }  = require('./buildWeatherData');
const spreadsheetId = process.env.SPREADSHEET_ID;
const URL = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/A1:append`


buildData((upload) => {
  authorize(upload, function (authClient) {
    const request = {
      spreadsheetId,
      range: 'Sheet1!A:B',
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS', 
      resource: {
        range: 'Sheet1!A:B',
        majorDimension:'Rows',
        values: upload,
      },
      auth: authClient,
    };
    
    sheets.spreadsheets.values.append(request, function (err, response) {
      if (err) {
        console.error(err);
        return;
      }
      console.log(`Updated ${response.data.updates.updatedRows} rows`);
    });
  });
})


function authorize(data, callback) {

  fs.readFile('client_secret.json', (err, content) => {
    if (err) return console.log('Error loading client secret file:', err);
    
    const credentials = JSON.parse(content)
    const { client_secret, client_id, redirect_uris } = credentials.installed;
    const OauthClient = new OAuth2Client(client_id, client_secret, redirect_uris[0]);
    
    fs.readFile(TOKEN_PATH, (err, token) => {
      if (err) return getNewToken(OauthClient, callback);
      OauthClient.setCredentials(JSON.parse(token));
      
      if (OauthClient == null) {
        console.log('authentication failed');
        return;
      }
      callback(OauthClient);
    });
  });
}

function getNewToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return callback(err);
      oAuth2Client.setCredentials(token);

      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}
