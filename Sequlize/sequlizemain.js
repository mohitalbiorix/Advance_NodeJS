const express = require("express");
const app = express();
const sequlize = require("./db/sequlizedb");

const port = process.env.PORT || 8000;
const User = require("./model/user");
const Post = require("./model/post");
const Tag = require("./model/tag");
const Post_Tag = require("./model/post_tag");
const Image = require("./model/image");
const Video = require("./model/video");
const Comment = require("./model/comment");
const userRoute = require("./routes/user.route");
const Tag_Taggable = require("./model/tag_taggable");
const Employee = require("./model/employee");

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

// image table created and sync
Image.sync({ force: false })
  .then(() => {
    console.log("sync image table successfully!");
  })
  .catch((err) => {
    console.log(err);
  });

// video table created and sync
Video.sync({ force: false })
  .then(() => {
    console.log("sync video table successfully!");
  })
  .catch((err) => {
    console.log(err);
  });

// comment table created and sync
Comment.sync({ force: false })
  .then(() => {
    console.log("sync comment table successfully!");
  })
  .catch((err) => {
    console.log(err);
  });

// tag_taggable table created and sync

Tag_Taggable.sync({ force: false })
  .then(() => {
    console.log("sync comment table successfully!");
  })
  .catch((err) => {
    console.log(err);
  });

// employee table created and sync

Employee.sync({ force: false })
  .then(() => {
    console.log("sync employee table successfully!");
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

Comment.addScope("checkCommentableType", {
  where: {
    commentableType: "video",
  },
});

// one to one relationship
User.hasOne(Post, { foreignKey: "user_id", as: "PostDetails" });
// Post.belongsTo(User, { foreignKey: "user_id", as: "UserDetails" });

// one to many relationship
// User.hasMany(Post, { foreignKey: "user_id", as: "PostDetails" });

// many to many relationship

// Post To Tag
/* Post.belongsToMany(Tag, {through:'post_tags', as:'TagDetails'}); */

// Tag to Post
// Tag.belongsToMany(Post, { through: "post_tags", as: "PostDetails" });

// Polymorphic one to many

// image to comment
// Image.hasMany(Comment, {
//   foreignKey: 'commentableId',
//   constraints: false,
//   scope:{
//     commentableType:'image'
//   }
// });

// video to comment
// Video.hasMany(Comment, {
//   foreignKey: 'commentableId',
//   constraints: false,
//   scope:{
//     commentableType:'video'
//   }
// });

// comment to image/video
// Comment.belongsTo(Image, {foreignKey:'commentableId', constraints:false});
// Comment.belongsTo(Video, {foreignKey:'commentableId', constraints:false});

// polymorphic many to many

// img to tag

// Image.belongsToMany(Tag, {
//   through:{
//     model: Tag_Taggable,
//     unique:false,
//     scope:{
//       taggableType: 'image'
//     },
//   },
//   foreignKey:'taggableId',
//   constraints: false
// });

// video to tag

// Video.belongsToMany(Tag, {
//   through:{
//     model: Tag_Taggable,
//     unique:false,
//     scope:{
//       taggableType: 'video'
//     },
//   },
//   foreignKey:'taggableId',
//   constraints: false
// });

// tag to img
// Tag.belongsToMany(Image, {
//   through:{
//     model: Tag_Taggable,
//     unique:false
//   },
//   foreignKey:'tagId',
//   constraints: false
// });

// tag to video
// Tag.belongsToMany(Video, {
//   through:{
//     model: Tag_Taggable,
//     unique:false
//   },
//   foreignKey:'tagId',
//   constraints: false
// });

// user route
app.use("/api/user", userRoute);

app.listen(port, () => {
  console.log(`express server is running on ${port} port`);
});
