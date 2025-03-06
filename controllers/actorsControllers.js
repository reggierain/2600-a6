import { database } from "../database.js";

const postActors = (req, res) => {
    const actorName = req.body.actorName.trim();
    if (!actorName) {
        return res
            .status(400)
            .send(
                'Error: Actor name field is empty. Please enter a valid name.<br><a href="/">Back</a>'
            );
    }

    let actorNameDocument = {
        name: actorName,
    };

    database
        .collection("actors")
        .insertOne(actorNameDocument)
        .then(() =>
            res.send(`<h1>Success: Actor Inserted</h1><br><a href="/">Back</a>`)
        )
        .catch((e) => {
            console.dir(e, { depth: null });
            res.status(500).send("Error!");
        });
};

export default postActors;
