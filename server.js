const express = require("express");
const path = require("path");

const noteTitle = [];
const noteText = [];


//Sets uo Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); //turns data into json object

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
  });

  app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
  });

  



//=====================================================
  // Server listen
//=====================================================


app.listen(PORT, () => {
    console.log("App listening on PORT " + PORT);
  });

  