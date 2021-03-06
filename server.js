const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const path = require('path');
const fs = require('fs');
const uuid = require('./helpers/uuid');

// route for index HTML
app.get('/', (req, res) => {
    
    res.sendFile(path.join(__dirname + '/public/index.html'));
  });
  // HTML Routes
  app.get('/notes', (req, res) => {
    
    res.sendFile(path.join(__dirname + '/public/notes.html'));
  });
// parse incoming string
app.use(express.urlencoded({extended: true}));
//parse incoming JSON 
app.use(express.json());
app.use(express.static('public'));



// API GET request  
app.get('/api/notes',(req,res) =>{
    // read db.json
    
    note = fs.readFileSync("./db/db.json", "utf8");
    note = JSON.parse(note);  
        
        
        // return saved notes 
        res.json(note);


});

// API POST request
app.post('/api/notes',(req,res)=>{
    // recieve new note and save on req body
    const note = req.body;
    const noteId = uuid();
    note.id = noteId;
    // noteArry =[];

    // read exciting note
 fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      // Convert string into JSON object
         const parsedNote = JSON.parse(data);
        

         parsedNote.push(note);

      // add to db.json
    fs.writeFileSync(
    path.join(__dirname,'./db/db.json'),
    JSON.stringify(parsedNote,null,2)
    );
   //return new note to clinet 
    }
  });
  console.log(req.body);
  res.json(req.body);
  return note;
});




// sever 
app.listen(PORT,()=>{
    console.log(`API server now on port ${PORT}!`);
})