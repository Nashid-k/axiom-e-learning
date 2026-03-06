import { MongoClient, MongoClientOptions } from 'mongodb';

const uri = process.env.MONGODB_URI;
const options: MongoClientOptions = {
    serverSelectionTimeoutMS: 10000,
    socketTimeoutMS: 45000,
    maxPoolSize: 1, 
    minPoolSize: 0,
    connectTimeoutMS: 20000,
};


let client: MongoClient;
let clientPromise: Promise<MongoClient>;

declare global {
    var _mongoClientPromise: Promise<MongoClient> | undefined;
}

const isBuildPhase = process.env.NEXT_PHASE === 'phase-production-build';

if (!uri) {
    if (process.env.NODE_ENV === 'production') {
        throw new Error('Please add your Mongo URI to .env.local');
    } else {
        clientPromise = Promise.reject(new Error('MONGODB_URI not configured'));
    }
} else if (isBuildPhase) {
    clientPromise = new Promise(() => { });
} else {
    if (process.env.NODE_ENV === 'development') {
        if (!global._mongoClientPromise) {
            client = new MongoClient(uri, options);
            global._mongoClientPromise = client.connect();
        }
        clientPromise = global._mongoClientPromise;
    } else {
        client = new MongoClient(uri, options);
        clientPromise = client.connect();
    }
}

export default clientPromise;
