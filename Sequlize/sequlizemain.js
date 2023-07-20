const express = require("express");
const app = express();
const sequlize = require("./db/sequlizedb");

const port = process.env.PORT || 8000;
const User = require("./model/user");
const Post = require("./model/post");
const Tag = require("./model/tag");
const Post_Tag = require("./model/post_tag");
const userRoute = require("./routes/user.route");

app.get("/", (req, res) => {
  res.send("Home Page");
});

// JSON
app.use(express.json());

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
    console.log("sync user table successfully!");
  })
  .catch((err) => {
    console.log(err);
  });

// post table create and synchronized
Post.sync({ force: false })
  .then(() => {
    console.log("sync post table successfully!");
  })
  .catch((err) => {
    console.log(err);
  });

// tag table created and sync
Tag.sync({ force: false })
  .then(() => {
    console.log("sync tag table successfully!");
  })
  .catch((err) => {
    console.log(err);
  });

// post_tag table created and sync
Post_Tag.sync({ force: false })
  .then(() => {
    console.log("sync post_tag table successfully!");
  })
  .catch((err) => {
    console.log(err);
  });

// scopes
User.addScope("checkGender", {
  where: {
    gender: "male",
  },
});

User.addScope("checkuserName", {
  where: {
    email: "mohit@gmail.com",
  },
});

// one to one relationship
/* User.hasOne(Post, { foreignKey: "user_id", as: "PostDetails" });
Post.belongsTo(User, { foreignKey: "user_id", as: "UserDetails" }); */

// one to many relationship
/* User.hasMany(Post, { foreignKey: "user_id", as: "PostDetails" }); */

// many to many relationship

// Post To Tag
/* Post.belongsToMany(Tag, {through:'post_tags', as:'TagDetails'}); */

// Tag to Post
Tag.belongsToMany(Post, { through: "post_tags", as: "PostDetails" });


// user route
app.use("/api/user", userRoute);

app.listen(port, () => {
  console.log(`express server is running on ${port} port`);
});
