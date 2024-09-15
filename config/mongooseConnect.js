const mongoose = require('mongoose')

const connectDatabase = async () => {
    const databaseUrl = process.env.DATABASE_URL
    // const MONGODB_CONNECTION_STRING = process.env.MONGODB_CONNECTION_STRING
    // mongoose.connect(MONGODB_CONNECTION_STRING)
    mongoose.connect(databaseUrl)
        .then((event) => console.log('MongoDB Connected', event.connection.host))
        .catch(err => console.log('MongoDB Connection Error:', err));
}

module.exports = { connectDatabase }     