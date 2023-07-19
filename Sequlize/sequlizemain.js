const express = require("express");
const app = express();
const sequlize = require("./db/sequlizedb");

const port = process.env.PORT || 8000;
const User = require("./model/user");
const userRoute = require('./routes/user.route');

app.get("/", (req, res) => {
  res.send("Home Page");
});

// JSON
app.use(express.json())

// sequlize connectdb
sequlize
  .authenticate()
  .then(() => {
    console.log("Databse Connected");
  })
  .catch((err) => {
    console.log(err);
  });

// User table created and synchronized
User.sync({ force: false, match: /-des$/ }) // drop table on match condition
  .then(() => {
    console.log("sync successfully!");
  })
  .catch((err) => {
    console.log(err);
  });

// user route

app.use('/api/user',userRoute)

app.listen(port, () => {
  console.log(`express server is running on ${port} port`);
});
