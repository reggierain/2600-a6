const setupCollections = database => {

    let showCollection = database.createCollection('Shows',{ validator: {
        $jsonSchema: {
            // TODO: validation schema for show documents
        }
    }});
    let actorCollection = database.createCollection('Actors',{ validator: {
        $jsonSchema: {
            // TODO: validation schema for actor documents
        }
    }});

    return Promise.all([showCollection, actorCollection]);
}

export default setupCollections;