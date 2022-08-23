const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const http = require("http");



const app = express();
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static("public"));



app.get("/", (req, res) => {
    res.sendFile(__dirname + "/singup.html");
})

app.post("/", (req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    // console.log(firstName, lastName, email);

    const data = {
        members : [
            {
                email_address : email,
                status: "subscribed",
                merge_fields: {
                    FNAME : firstName,
                    LNAME: lastName,
                }
            }
        ]
    };

    const jsondata = JSON.stringify(data);

    // const url = 
})


app.listen(3000, () => {
    console.log("Server is running at Port 3000!");
})

//API Key - 23228b49fda15cf33a6a67ac00a03203-us8
//list id - 64771946e4
