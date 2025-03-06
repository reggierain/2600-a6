import { database } from "../database.js";
import mongodb from "mongodb";

const postShows = (req, res) => {
    let showTitle = req.body.title.trim();
    let showSeasons = Number(req.body.seasons);
    let showYearStart = Number(req.body.year);
    let actors = req.body.checkActor;
    if (typeof actors === "string") {
        actors = [actors];
    }

    if (!showTitle || !showSeasons || !showYearStart || actors.length === 0) {
        return res
            .status(400)
            .send('Error: All fields must be filled.<br><a href="/">Back</a>');
    }

    let showDocument = {
        title: showTitle,
        numberOfSeasons: showSeasons,
        firstEpisodeYear: showYearStart,
        topActors: [],
    };

    actors.forEach((actorID) => {
        showDocument.topActors.push({
            actor_id: mongodb.ObjectId.createFromHexString(actorID),
        });
    });

    database
        .collection("shows")
        .insertOne(showDocument)
        .then(() =>
            res.send(`<h1>Success: Show Inserted</h1><br><a href="/">Back</a>`)
        )
        .catch((e) => {
            console.dir(e, { depth: null });
            res.status(500).send("Error!");
        });
};

const getShows = (req, res) => {
    database
        .collection("shows")
        .aggregate([
            {
                $match: {},
            },
            {
                $lookup: {
                    from: "actors",
                    localField: "topActors.actor_id",
                    foreignField: "_id",
                    as: "topActors",
                },
            },
            {
                $project: {
                    "topActors._id": 0,
                },
            },
        ])
        .toArray()
        .then((shows) => res.json(shows))
        .catch((e) => {
            console.dir(e, { depth: null });
            res.status(500).send("Error");
        });
};

export { postShows, getShows };
