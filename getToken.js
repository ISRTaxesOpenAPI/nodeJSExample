const axios = require('axios');

//This module is used to get the token from url
module.exports = function  getToken(url,grantType,authCode,tokenRedirectUri,scope,clientID,clientSecret,callback) {
    //Get the authCode
    console.log(url +"/ url"+grantType +"/grantType "+authCode +"/authCode "+tokenRedirectUri +"/tokenRedirectUri "+scope +"/ scope")
    if (authCode == null) {
        console.log('No authCode found');
    }
    else {
        //Send an http post request to get Token 
        axios.post(url,
            {
                "grant_type": grantType,
                "code": authCode,
                "redirect_uri": tokenRedirectUri,
                "scope": scope
            },
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Basic ' + Buffer.from(clientID + ':' + clientSecret).toString('base64')
                }
            })
            .then(function (response) {
                console.log("get token success: "+response);
                return callback(response.data);
            })
            .catch(function (error) {
                console.log("get token error: "+error);
            }
            );
    }
}
