var express = require("express"); // requre the express framework
var app = express();
var fs = require("fs"); //require file system object

// Endpoint to Get a list of users
app.get("/getUsers", function (req, res) {
  fs.readFile(__dirname + "/" + "users.json", "utf8", function (err, data) {
    console.log(data);
    res.end(data); // you can also use res.send()
  });
});

// Create a server to listen at port 8080
var server = app.listen(8080, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("REST API demo app listening at http://%s:%s", host, port);
});

//Step 1: Create a new user variable
var Employee = {
  Employee6: {
    id: 6,
    Company: "Instagram",
    Name: "Rod Riven",
    Position: "Assistant Manager",
    Location: "Buhangin Davao City",
  },
};

//The addUser endpoint
app.put("/addUser", function (req, res) {
  //Step 2: read existing users
  fs.readFile(__dirname + "/" + "users.json", "utf8", function (err, data) {
    data = JSON.parse(data);
    //Step 3: append user variable to list
    data["Employee6"] = Employee["Employee6"];
    console.log(data);
    res.end(JSON.stringify(data));
  });
});

//Endpoint to get a single user by id
app.get("/:id", function (req, res) {
  // First retrieve existing user list
  fs.readFile(__dirname + "/" + "users.json", "utf8", function (err, data) {
    var users = JSON.parse(data);
    var user = users["Employee" + req.params.id];
    console.log(user);
    res.end(JSON.stringify(user));
  });
});

var id = 3;
app.delete("/deleteUser", function (req, res) {
  // First retrieve existing users
  fs.readFile(__dirname + "/" + "users.json", "utf8", function (err, data) {
    data = JSON.parse(data);
    delete data["Employee" + id];

    console.log(data);
    res.end(JSON.stringify(data));
  });
});
