const express = require("express");
const path = require("path");

const storage = require("./db/storage")

const noteTitle = [];
const noteText = [];


//Sets uo Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); //turns data into json object


//==========================
// Routes
//==========================
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
  });

  app.get("/assets/js/index.js", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/assets/js/index.js"));
  });

  app.get("/assets/css/styles.css", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/assets/css/styles.css"));
  });

  app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
  });

  app.get("/api/notes", (req, res) => {
    storage.getNotes()
    .then(notes => res.json(notes))
    .catch(error => res.status(500).json(error)) 
  });





  app.get("/api/noteText", (req, res) => {
    res.json(noteText)
  });

  app.post("/api/notes",(req, res) => {
    storage.AddNotes(req.body)
    .then((note) => res.json(note))
    .catch(error => res.status(500).json(error)) 
  })

  app.delete("/api/notes/:id", (req, res) => {
    
    storage.removeNote(req.param.id)
    
    console.log(storage.removeNote(req.param.id))
    
    .then(() => res.json({
      ok: true //yes we deleted the note succesfully
    }))
    .catch(error => res.status(500).json(error)) 
      
  });

//=====================================================
  // Server listen
//=====================================================


app.listen(PORT, () => {
    console.log("App listening on PORT " + PORT);
  });

  