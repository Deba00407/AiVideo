import mongoose from "mongoose";

const connectionString = process.env.MONGODB_URI!

if (!connectionString) {
    throw new Error("Could not load mongo uri from env")
}

// check if a connection already exits
let cacheConnection = global.mongooseConn

if (!cacheConnection) {
    cacheConnection = global.mongooseConn = { conn: null, promise: null }
}

export async function connectToDB() {
    if (cacheConnection?.conn) {
        return cacheConnection.conn
    }

    if (!cacheConnection?.promise) {
        mongoose
            .connect(connectionString)
            .then(() => mongoose.connection)
    }

    try {
        cacheConnection.conn = await cacheConnection.promise
    } catch (error) {
        cacheConnection.promise = null
        throw new Error("Could not load mongo uri from env")
    }

    return cacheConnection?.conn
}