const express = require("express");
const https = require("https");
const bodyParser = require('body-parser');
const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/body.html");
});
app.post("/", function (req, res) {
  const axios = require("axios");
  const searchTerm = req.body.cityName;
  const options = {
    method: 'POST',
    url: 'https://linkedin-jobs-search.p.rapidapi.com/',
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Key': '300ef18574mshb6def0e1ea5e602p1ed56fjsn999a916363f0',
      'X-RapidAPI-Host': 'linkedin-jobs-search.p.rapidapi.com'
    },
    // data: '{"search_terms":"Frontend Developer","location":"30301","page":"1"}'
    data: '{"search_terms":"' + searchTerm + '","location":"30301","page":"1"}'
  };

  axios.request(options).then(function (response) {

    for (let i = 0; i < response.data.length; i++) {
      const joburl = response.data[i].job_url;
      const company = response.data[i].company_name;
      const jobTitle = response.data[i].job_title;

      res.write("<h1> Job Title: " + jobTitle + "</h1>");
      res.write("<h1> Company Name: " + company + "</h1>");
      res.write("<a href='" + joburl + "'>" + "View Job" + "</a><br><br><hr>");
    }

    res.send();

  }).catch(function (error) {
    console.error(error);
  });

});



app.listen(3000, function () {
  console.log("Your server is started");
});