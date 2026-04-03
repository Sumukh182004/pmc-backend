const { default: mongoose } = require('mongoose');

require("dotenv").config();
var uri = process.env.URI

let cached = global._mongooseCache;
if (!cached) {
    cached = global._mongooseCache = { conn: null, promise: null };
}

async function connectDB() {
    if (cached.conn) return cached.conn;
    if (!cached.promise) {
        cached.promise = mongoose.connect(uri).then((m) => {
            console.log("database connection is established");
            return m;
        });
    }
    cached.conn = await cached.promise;
    return cached.conn;
}

connectDB().catch((err) => console.log("DB connection error:", err));

module.exports = connectDB;