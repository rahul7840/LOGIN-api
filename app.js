const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const request = require('request');
const https=require('https');
const { stringify } = require('querystring');
const { response } = require('express');

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }))

app.get("/", function (req, res) {
    // res.send("server is onnnn");
    res.sendFile(__dirname + "/sighup.html");
})


app.post("/", function (req, res) 
{
    const firstname = req.body.fname;
    const lastname = req.body.lname;
    const email = req.body.email;

    const data = {
        members: [{
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstname,
                LNAME: lastname
            }
        }
    ]
    };
    const jsonData=JSON.stringify(data);

    const url="https://us17.api.mailchimp.com/3.0/lists/9b4e9c7dc0"
    const option={
        method:"POST",
        auth:"rahul:b2e500ec9769eeb7fa1fb33b1dcbe472-us17"
        }
        
   const request=  https.request(url,option,function(response){
        response.on("data", function(data){
        console.log(JSON.parse(data));
        
    })
})



app.listen(3000, function () {
    console.log("server is running on port 3000!!!!");
    })
 

})





// key
// b2e500ec9769eeb7fa1fb33b1dcbe472-us17

// Audience ID.
// 9b4e9c7dc0