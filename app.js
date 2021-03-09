const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function (req,res){
res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req,res){

    const query = req.body.cityName;
    const apiKey = "e50e08c1c0359a869ecb300cfa97740b";
    const units = "imperial";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+ apiKey +"&units="+ units;

    https.get(url, function(response){
        console.log(response);

        response.on("data", function(data){
            const weatherData = JSON.parse(data)
            const temp = weatherData.main.temp
            const weatherDescription = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon
            const imageURL = "http://openweathermap.org/img/wn/"+ icon +"@2x.png"
            res.write("<p>The weather is currently " + weatherDescription + "</p>");
            res.write("<h1>The temperature in "+ query +" is "+ temp + " degrees Fahrenheit.</h1>");
            res.write("<img src =" + imageURL+ ">");
            res.send()
        })
    })

})

app.listen(3000, function(){
    console.log("server is running on port 3000");

});
