var request = require('request');

request.post({
  headers: {'content-type' : 'application/x-www-form-urlencoded'},
  url:     'http://94.189.203.244/',
  body:    "UNLOCK2=on"
}, function(error,response,body){
    if (!error && response.statusCode == 200) {
        console.log(body);
    } else {
        console.log("there was a problem opening the door");
    }
});
