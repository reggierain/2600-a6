const setupCollections = (database) => {
    let showCollection = database
        .createCollection("shows", {
            validator: {
                $jsonSchema: {
                    // TODO: validation schema for show documents
                    bsonType: "object",
                    required: [
                        "title",
                        "numberOfSeasons",
                        "firstEpisodeYear",
                        "topActors",
                    ],
                    properties: {
                        title: {
                            bsonType: "string",
                            minLength: 2,
                            maxLength: 30,
                            description:
                                "The title length should be between 2 and 30 characters.",
                        },
                        numberOfSeasons: {
                            bsonType: "int",
                            minimum: 1,
                            description:
                                "The number of seasons should have a minimum value of 1.",
                        },
                        firstEpisodeYear: {
                            bsonType: "int",
                            minimum: 1900,
                            maximum: 2100,
                            description:
                                "The first episode year should be in between 1900 and 2100.",
                        },
                        topActors: {
                            bsonType: "array",
                            minItems: 1,
                            items: {
                                bsonType: "object",
                                required: ["actor_id"],
                                properties: {
                                    actor_id: {
                                        bsonType: "objectId",
                                        description:
                                            "The actor_id must be a valid objectId from actors collection.",
                                    },
                                },
                            },
                        },
                    },
                },
            },
        })
        .catch((errorObject) => {
            console.dir(errorObject, { depth: null });
        });

    let actorCollection = database
        .createCollection("actors", {
            validator: {
                $jsonSchema: {
                    // TODO: validation schema for actor documents
                    bsonType: "object",
                    required: ["name"],
                    properties: {
                        name: {
                            bsonType: "string",
                            minLength: 1,
                            maxLength: 30,
                            description:
                                "The name should have a length between 1 and 30 characters.",
                        },
                    },
                },
            },
        })
        .catch((errorObject) => {
            console.dir(errorObject, { depth: null });
        });

    return Promise.all([showCollection, actorCollection]);
};

export default setupCollections;
