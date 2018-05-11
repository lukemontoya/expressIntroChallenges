const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
const fs = require("fs");


app.get('/hello', function(req, res) {
  res.send("Hello!");
});


app.post("/create/:name/:age", (req, res) => {
  let newUser = {
    name: req.params.name,
    age: req.params.age
  }

  let strCurrentArr = fs.readFileSync("./storage.json", "utf8");

  let currentArr = JSON.parse(strCurrentArr);

  currentArr.push(newUser);

  fs.appendFileSync('./storage.json', JSON.stringify(currentArr));

  res.send("for the win");
});

app.get("/", function(req, res){
  let data = fs.readFileSync("./storage.json", "utf8");
  res.send(data)
})

app.get("/:name", function(req, res){
  let strUsersArr = fs.readFileSync("./storage.json", "utf8");
  let usersArr = JSON.parse(strUsersArr);
  for(let i =0; i<usersArr.length; i++){
    if(usersArr[i].name == req.params.name){
    res.json(usersArr[i]);
    return;
    }
  }
  res.sendStatus(400);
})

app.use(function(req, res) {
  res.sendStatus(404);
});

app.listen(port, function() {
  console.log('Listening on port', port);
});
