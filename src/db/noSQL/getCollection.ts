import { Db, Collection } from 'mongodb';

export async function GetCollection(db: Db, collection: string): Promise<Collection> {
    db.createCollection(collection)

    console.log("---")

    return db.collection(collection)
} 