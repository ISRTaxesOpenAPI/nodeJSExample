const axios = require('axios');

module.exports = function createRequestWithToken(url,token) {


//send an http post with Authorization header 
  axios.post(url,
  {
    
        "Invoice_ID": "987654321",
        "Vat_Number": 777777715,
        "Invoice_Reference_Number": 975975975,
        "Customer_VAT_Number": 18,
        "Payment_Amount": 10000,
        "VAT_Amount": 1700,
        "Invoice_Sign": 1,
        "Invoice_Type": 1,
        "Invoice_Date": "02/18/2023",
        "Charge_Reversal": 0
      
      //postdata
  },
  {
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
      }
  })
  .then(function (response) {
    console.dir("api data request succses: "+ response.data)

    return response;
  })
  .catch(function (error) {
      debugger
      console.log("api data request error: "+error);

      if(error.response.status ==403){
          console.log("403")
    }
      if(error.response.status ==401){
          //post with refresh token to get new token 
            console.log("401")
      }
  });
}