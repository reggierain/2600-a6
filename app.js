import express from 'express';
let app = express(); 

import { connection, database } from './database.js';
import setupCollections from './collections.js';

let server;
connection
// Uncomment the line below when ready to test setupCollections. It's not necessary before then.
//.then(()=>setupCollections(database)) 
.then(()=>{
  console.log("Success: connected to database!");
  server = app.listen(3000, ()=>console.log('Server ready'));
});

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

// Get home page with forms 
app.get("/", (req,res)=>{
    // Get all actors from database
    database.collection("actors").find().toArray()
    .then(actors=>{
        // render the home page template with list of actors 
        res.locals.actors = actors;
        res.render('index');
    })
    .catch(e=>{
        console.error(e);
        res.status(500).send("An error has occurred");
    });
});

// TODO: Routing logic

