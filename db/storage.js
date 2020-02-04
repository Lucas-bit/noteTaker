const fs = require("fs")
const util = require("util")

const readFileAsync = util.promisify(fs.readFile)

const writeFileAsync = util.promisify(fs.writeFile) 


class Storage {
    constructor(){
        this.lastID = 0
    } 
    readFile(){
        return readFileAsync("db/db.json", "utf8")
    }

    writeFile(note){
        return  writeFileAsync("db/db.json", JSON.stringify(note))
    }
    getNotes() { 
        return this.readFile().then(notes => {
            try {
                return [].concat(JSON.parse(notes))
            } catch (error) {
                return [];
            }
        })
    }

    AddNotes(note) {
        console.log(note)
        const {title, text} = note //expands what is inside note into indiidula elements
        const newNote = {
           title, text, id: ++this.lastID
        }
        
        return this.getNotes()
        .then(notes => [...notes, newNote] ) //appends the new note to the end of the notes and creates a new object
        .then(updatedNotes => this.writeFile(updatedNotes))
        .then(() => newNote) //returns the new note object

    }
    
    removeNote(id){
        return this.getNotes() 
        .then(notes => notes.filter(note => note.id !== parseInt(id)))
        .then(filteredNotes => this.writeFile(filteredNotes))

    }
}

module.exports = new Storage() //creating a new instant of class oppose from returning the class to be able to create the internal method system