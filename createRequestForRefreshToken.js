const axios = require('axios');

module.exports = function createRequestForRefreshToken(url,grantType,refreshToken,scope,clientID,clientSecret,callback) {
console.log(" url " + url + " grantType " + grantType +" refreshToken " + refreshToken +" scope " + scope +" clientID " + clientID + " clientSecret " + clientSecret)

//send an http post with Authorization header 
  axios.post(url,
    {
        "client_id": clientID,
        "scope": scope,
        "refresh_token": refreshToken,
        "grant_type": grantType,
        "client_secret": clientSecret

    },
    {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    })
    .then(function (response) {
        console.log("get token success after refresh: "+response.data);
        console.dir( response.data)

        return callback(response.data);
    })
    .catch(function (error) {
        console.log("get token error: "+error);
    }
    );
}