import express from "express";
let app = express();

import { connection, database } from "./database.js";
import setupCollections from "./collections.js";
import mongodb from "mongodb";
import router from "./routes/index.js";

let server;
connection
    // Uncomment the line below when ready to test setupCollections. It's not necessary before then.
    .then(() => setupCollections(database))
    .then(() => {
        console.log("Success: connected to database!");
        server = app.listen(3000, () => console.log("Server ready"));
    });

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", router);

// Get home page with forms
app.get("/", (req, res) => {
    // Get all actors from database
    database
        .collection("actors")
        .find()
        .toArray()
        .then((actors) => {
            // render the home page template with list of actors
            res.locals.actors = actors;
            res.render("index");
        })
        .catch((e) => {
            console.error(e);
            res.status(500).send("An error has occurred");
        });
});

// TODO: Routing logic
// app.post('/api/v1/actors', (req, res)=>{
//     const actorName = req.body.actorName.trim();
//     if (!actorName) {
//         return res.status(400).send('Error: Actor name field is empty. Please enter a valid name.<br><a href="/">Back</a>');
//     }

//     let actorNameDocument = {
//         name: actorName
//     }

//     database.collection("actors").insertOne(actorNameDocument)
//     .then(()=>res.send(`<h1>Success: Actor Inserted</h1><br><a href="/">Back</a>`))
//     .catch(e=>{
//         console.dir(e, {depth: null});
//         res.status(500).send("Error!");
//     });
// });

// app.post('/api/v1/shows', (req, res)=>{
//     let showTitle = req.body.title.trim();
//     let showSeasons = Number(req.body.seasons);
//     let showYearStart = Number(req.body.year);
//     let actors = req.body.checkActor;
//     if (typeof actors === "string") {
//         actors = [actors];
//     }

//     if (!showTitle || !showSeasons || !showYearStart || actors.length === 0) {
//         return res.status(400).send('Error: All fields must be filled.<br><a href="/">Back</a>');
//     }

//     let showDocument = {
//         title: showTitle,
//         numberOfSeasons: showSeasons,
//         firstEpisodeYear: showYearStart,
//         topActors: []
//     }

//     actors.forEach(actorID=>{
//         showDocument.topActors.push(
//             {
//                 actor_id: mongodb.ObjectId.createFromHexString(actorID)
//             }
//         );
//     });

//     database.collection("shows").insertOne(showDocument)
//         .then(() => res.send(`<h1>Success: Show Inserted</h1><br><a href="/">Back</a>`))
//         .catch(e => {
//             console.dir(e, { depth: null });
//             res.status(500).send("Error!");
//         }
//     );

// });

// app.get('/api/v1/shows', (req, res)=>{
//     database.collection("shows")
//     .aggregate([
//         {
//             $match: {}
//         },
//         {
//             $lookup: {
//                 from: "actors",
//                 localField: "topActors.actor_id",
//                 foreignField: "_id",
//                 as: "topActors"
//             }
//         },
//         {
//             $project: {
//                 "topActors._id": 0,
//             }
//         }
//     ])
//     .toArray()
//     .then(shows=>res.json(shows))
//     .catch(e => {
//         console.dir(e, { depth: null });
//         res.status(500).send("Error");
//     });
// });
