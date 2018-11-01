const express = require("express");
var http = require("http");
const request = require("request");
var bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
const port = 4201;

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  next();
});

app.get("/", (req, res) => res.send("Hello World!"));

app.get("/getMailsList", function(req, res, next) {
  return request(
    "http://pdc-development.esacinc.com:8080/workspace/projects/paged/all;jsessionid=A4F940C159E5ECDC29B89E90AF5B7D73?asc=false&filterQuery=&items=25&labId=0&page=1&sortingField=modified&userId=undefined",
    function(error, response, body) {
      console.log("error:", error); // Print the error if one occurred
      console.log("statusCode:", response && response.statusCode); // Print the response status code if a response was received
      var parsed = JSON.parse(body);
      console.log(parsed);
      return res.send(body);
    }
  );
});

app.post("/getData", function(req, res, next) {
  switch (req.body.type) {
    case "get":
      return request.get({ url: req.body.url, qs: req.body.params }, function(
        error,
        response,
        body
      ) {
        var parsed = JSON.parse(body);
        console.log(parsed);
        return res.send(body);
      });
    case "post":
      return request(
        { url: req.body.url, method: "post", body: req.body.data, json: true },
        function(error, response, body) {
          console.log("error:", error); // Print the error if one occurred
          console.log("statusCode:", response && response.statusCode); // Print the response status code if a response was received
          var parsed = JSON.parse(body);
          console.log(parsed);
          return res.send(parsed);
        }
      );
  }
  return request(
    "http://pdc-development.esacinc.com:8080/workspace/projects/paged/all;jsessionid=A4F940C159E5ECDC29B89E90AF5B7D73?asc=false&filterQuery=&items=25&labId=0&page=1&sortingField=modified&userId=undefined",
    function(error, response, body) {
      console.log("error:", error); // Print the error if one occurred
      console.log("statusCode:", response && response.statusCode); // Print the response status code if a response was received
      var parsed = JSON.parse(body);
      console.log(parsed);
      return res.send(parsed);
    }
  );
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
