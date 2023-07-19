const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const userRoute = require('./routes/user-routes');

dotenv.config();
const app = express();
const port = process.env.PORT;

// cors policy
app.use(cors());

// json
app.use(express.json())

// database connectivity
const connectDB = require('./config/connectdb');
const DATABASE_URL = process.env.DATABASE_URL;
connectDB(DATABASE_URL);

// user router

app.use('/api/users',userRoute)

app.listen(port, ()=>{
    console.log(`Server listening at ${port} port`)
})