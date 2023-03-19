//express server
const express = require('express');
const axios = require('axios');
const getToken = require('./getToken');
const createRequestWithToken = require('./createRequestWithToken');
const createRequestForRefreshToken = require('./createRequestForRefreshToken');
const app = express();
const port = 3000;

let authCode = null;

function refresh(){

  console.log("ref")
}
let refreshToken  //from db
let scope;
let Token;

//setting up static files
app.use(express.static('public'));

app.get('/AuthCode', (req, res) => {
    if (req.query.code == null) {
        res.send('No AuthCode received');
    }
    else {
        console.log(req.query.code);
        authCode = req.query.code;
          //url
        const url = 'https://openapi.taxes.gov.il/shaam/sandbox/longtimetoken/oauth2/token';
        //grantType
        const grantType = 'authorization_code';
        //redirectUri
        const tokenRedirectUri = 'http://localhost:3000/AuthCode';
        //scope
        scope = 'scope';

        //clientID
        const clientID = 'use your client id ';
        //clientSecret
        const clientSecret = 'use ypur client secret';

          getoken =  getToken(url,grantType,authCode,tokenRedirectUri,scope,clientID,clientSecret,function (token) {
          console.log("token is: "+ token.access_token);
          console.log("refresh token is: "+ token.refresh_token);
          Token = token.access_token
          refreshToken = token.refresh_token;
debugger
res.sendFile('public/index.html' , { root : __dirname});
});

      

    }
});


app.get('/createApiRequest', (req, res) => {
  console.log("createApiRequest ");
createRequestWithToken('https://openapi.taxes.gov.il/shaam/sandbox/longtimeacces',Token);

console.log(res);
debugger
return(res)
   // res.send('<h1>Token received</h1><br> <a href="http://localhost:3000">Back to home</a>');
});


app.get('/Token', (req, res) => {
  console.log("Token received");
    res.send('<h1>Token received</h1><br> <a href="http://localhost:3000">Back to home</a>');
});




app.get('/refreshToken', (req, res) => {
  console.log("REFESH Token");

  const url = 'https://openapi.taxes.gov.il/shaam/sandbox/longtimetoken/oauth2/token';
  //grantType
  const grantType = 'refresh_token';

  const clientID = 'a862b70b12346c66a1646e929e6ab7b0';
  //clientSecret
  const clientSecret = '12b139f2af5e16dfb76d86c463459ae5';
  
  createRequestForRefreshToken(url,grantType,refreshToken,scope,clientID,clientSecret,function (newRefresh) {
    console.log("new refresh token = " + newRefresh)
    res.send('');
  });
});




//listening to port
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
