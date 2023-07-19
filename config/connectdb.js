const mongoose = require('mongoose');

const connectDB = async (DATABASE_URL)=> {
    try {
        const DB_OPTIONS = {
            dbName: "auth_user_data"
        }
        await mongoose.connect(DATABASE_URL, DB_OPTIONS);
        console.log("database connected successfully!");

    }catch(err){
        console.log(err)
    }
}

module.exports = connectDB;