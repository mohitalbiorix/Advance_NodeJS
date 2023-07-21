const User = require("../model/user");
const { Sequelize, Op, QueryTypes } = require("sequelize");
const sequlize = require("../db/sequlizedb");
const Post = require("../model/post");
const Tag = require("../model/tag");
const Image = require("../model/image");
const Video = require("../model/video");
const Comment = require("../model/comment");
const Tag_Taggable = require("../model/tag_taggable");
const Employee = require("../model/employee");

// add user
const addUser = async (req, res) => {
  // build method only creates an object that represents data that can be mapped to a database but not save data into db.
  /* 
    const user = await User.build({username:'mohit', email: 'mohitkapadiya1234@gmail.com'});
    await user.save(); 
  */

  // shortcut way to create method, which combine build and save method

  try {
    const { username, email, gender } = req.body;

    const user = await User.create({
      username: username,
      email: email,
      gender: gender,
    });

    console.log(user.dataValues); // we can get values inside dataValues object

    // here we can update data also
    // user.name = "dummy1";
    // user.reload(); // use for take old values untile data not save in database even if modify data.

    // delete user
    // user.destroy();

    res.status(201).send({
      status: true,
      message: "user added successfully!",
    });
  } catch (err) {
    console.log(err);
    res.status(403).send({
      status: false,
      message: err,
    });
  }
};

// update user
const updateUser = async (req, res) => {
  try {
    const { username, email, gender } = req.body;
    const userId = req.params.id;

    await User.update(
      { username: username, email: email, gender: gender },
      {
        where: {
          id: userId,
        },
      }
    );

    res.status(201).send({
      status: true,
      message: "user updated successfully!",
    });
  } catch (err) {
    console.log(err);
    res.status(403).send({
      status: true,
      message: err,
    });
  }
};

// delete user
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    await User.destroy({
      where: {
        id: userId,
      },
    });
    res.status(201).send({
      status: true,
      message: "user deleted successfully!",
    });
  } catch (err) {
    res.status(403).send({
      status: true,
      message: err,
    });
  }
};

// truncate user table
const trancate = async (req, res) => {
  try {
    await User.destroy({
      truncate: true,
    });
    res.status(201).send({
      status: true,
      message: "table empty successfully!",
    });
  } catch (err) {
    res.status(403).send({
      status: true,
      message: err,
    });
  }
};

// bulk-insert data
const bulkInsert = async (req, res) => {
  try {
    const users = req.body;
    await User.bulkCreate(users);
    let data = await User.findAll({});
    console.log(data);
    res.status(201).send({
      status: true,
      message: "inserted all users data successfully!",
    });
  } catch (err) {
    res.status(403).send({
      status: true,
      message: err,
    });
  }
};

//get all users
const getUsers = async (req, res) => {
  try {
    // pass scopes
    let data = await User.scope(["checkGender", "checkuserName"]).findAll({});
    // let data = await User.findAll({});
    res.status(201).send(data);
  } catch (err) {
    res.status(403).send({
      status: true,
      message: err,
    });
  }
};

// query
const queries = async (req, res) => {
  // fields
  //  await User.create(
  //    {
  //      username: "mohit",
  //      email: "mohit@gmail.com",
  //    },
  //    {
  //      fields: ["username","email"],
  //    }
  //  );

  // attributes
  // const users = await User.findAll({
  //   attributes: [
  //     'email',
  //     'username',
  //     [Sequelize.fn('COUNT', Sequelize.col('email')), 'EmailCount'],
  //   ],
  // });

  // condition
  const users = await User.findAll({
    where: {
      // id:'1',
      // id:{
      //   [Op.eq] :1
      // },
      id: {
        [Op.gt]: 2,
      },
      username: {
        [Op.like]: "mohit%",
      },
    },
  });

  res.send({
    data: users,
  });
};

// finder
const finders = async (req, res) => {
  /* findAll */
  // let data = await User.findAll({});

  /* findByPk */
  // let data = await User.findByPk(5);

  /* findAndCountAll */
  // let data = await User.findAndCountAll({
  //   where:{
  //     email:"mohit@gmail.com"
  //   }
  // });

  /*   findOrCreate */
  // let [data,created] = await User.findOrCreate({
  //   where:{
  //     username:'dummy'
  //   },
  //   defaults:{
  //     email: 'dummy@gmail.com'
  //   }
  // })

  // let response = {
  //   date: data,
  //   created: created
  // }

  /*   findOne */
  let data = await User.findOne({
    where: {
      username: "dummy",
    },
  });

  res.status(201).send({
    data: data,
  });
};

// setter and getter
const setter = async (req, res) => {
  try {
    const { username, email } = req.body;
    await User.create({ username: username, email: email });
    res.send({
      data: "user set successfully",
    });
  } catch (err) {
    res.status(403).send({
      status: true,
      message: err,
    });
  }
};

const getter = async (req, res) => {
  try {
    const users = await User.findAll({});
    res.send({
      data: users,
    });
  } catch (err) {
    res.status(403).send({
      status: true,
      message: err,
    });
  }
};

// rawQuery
const rawQuery = async (req, res) => {
  try {
    // const users = await sequlize.query("Select * from users", {
    //   type: QueryTypes.SELECT,
    //   mapToModel: true,
    //   raw: true
    // });

    const users = await sequlize.query(
      "Select * from users where gender = $gender",
      {
        type: QueryTypes.SELECT,
        // replacements:{ gender:'male'} //gender =:gender
        //  replacements: ['female'] //gender = ?
        // replacements: {gender: ['male','female']}   // gender IN(:gender)
        // replacements: {searchEmail: '%gmail.com'}  // email LIKE :searchEmail
        bind: { gender: "male" }, // gender = $gender
      }
    );

    res.status(200).send({
      data: users,
    });
  } catch (err) {
    res.status(403).send({
      status: true,
      message: err,
    });
  }
};

// One to one
const oneToone = async (req, res) => {
  try {
    let data = await User.findAll({
      include: {
        model: Post,
        as: "PostDetails",
        attributes: ["id", "name", "title"],
      },
      attributes: ["id", "username", "email"],
      where: { id: 4 },
    });
    res.status(200).json(data);
  } catch (err) {
    res.status(403).send({
      status: true,
      message: err,
    });
  }
};

// belongsTo
const belongsTo = async (req, res) => {
  try {
    let data = await Post.findAll({
      include: {
        model: User,
        as: "UserDetails",
      },
      where: { user_id: 4 },
    });
    res.status(200).json(data);
  } catch (err) {
    res.status(403).send({
      status: true,
      message: err,
    });
  }
};

// oneTomany
const oneTomany = async (req, res) => {
  try {
    let data = await User.findAll({
      include: {
        model: Post,
        as: "PostDetails",
        attributes: ["id", "name", "title", "user_id"],
      },
      attributes: ["id", "username", "email"],
      where: { id: 4 },
    });
    res.status(200).json(data);
  } catch (err) {
    res.status(403).send({
      status: true,
      message: err,
    });
  }
};

//manyTomany
const manyTomany = async (req, res) => {
  try {
    let data = await Tag.findAll({
      include: {
        model: Post,
        as: "PostDetails",
      },
    });
    res.status(200).json(data);
  } catch (err) {
    res.status(403).send({
      status: true,
      message: err,
    });
  }
};

// polymorphic one-to-many
const oneTomanyPolymorphic = async (req, res) => {
  try {
    // image to comment
    // let data = await Image.findAll({
    //   include: {
    //     model: Comment
    //   },
    // });

    // video to comment
    // let data = await Video.findAll({
    //   include: {
    //     model: Comment
    //   },
    // });

    // comment to image/video
    let data = await Comment.findAll({
      where: {
        commentableType: "video",
      },
      include: {
        model: Video,
      },
    });

    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(403).send({
      status: true,
      message: err,
    });
  }
};

// polymorphic many-to-many
const manyTomanyPolymorphic = async (req, res) => {
  try {
    //img to tag
    // let data = await Image.findAll({
    //   include: {
    //     model: Tag
    //   },
    // });

    // video to tag
    // let data = await Video.findAll({
    //   include: {
    //     model: Tag
    //   },
    // });

    // tag to img
    // let data = await Tag.findAll({
    //   include:[Image,Video]
    // });

    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(403).send({
      status: true,
      message: err,
    });
  }
};

// loading
const loading = async (req, res) => {
  try {
    // egar loading
    let data = await User.findAll({
      include: {
        model: Post,
        as: "PostDetails",
        attributes: ["id", "name", "title", "user_id"],
      },
      attributes: ["id", "username", "email"],
      where: { id: 4 },
    });

    // lazy loading but get+modelname not working
    // let posts = data.getPost();
    res.status(200).json(data);
  } catch (err) {
    res.status(403).send({
      status: true,
      message: err,
    });
  }
};

// paranoid
const paranoid = async (req, res) => {
  try {
    // when we get soft delete records then add paranoid:false
    // let data = await Employee.findAll({
    //   paranoid:false
    // });

    // delete record
    // let data = await Employee.destroy({
    //   where:{
    //     id:2
    //   }
    // });

    // when restor record

    let data = await Employee.restore({
      where: {
        id: 2,
      },
    });

    res.status(200).json(data);
  } catch (err) {
    res.status(403).send({
      status: true,
      message: err,
    });
  }
};

const transaction = async (req, res) => {
  const t = await sequlize.transaction();
  const { username, email, gender } = req.body;
  try {
    // for create user
    // await User.create({username:username, email:email, gender:gender},{
    //   transaction: t
    // });

    // for getting users list
    let users = await User.findAll(
      {},
      {
        transaction: t,
        lock: true,
      }
    );
    t.commit();
    res.status(200).json(users);
  } catch (err) {
    t.rollback();
    // res.status(403).send({
    //   status: true,
    //   message: err,
    // });
    res.status(200).json("ok");
  }
};

module.exports = {
  addUser,
  updateUser,
  deleteUser,
  trancate,
  bulkInsert,
  getUsers,
  queries,
  finders,
  setter,
  getter,
  rawQuery,
  oneToone,
  belongsTo,
  oneTomany,
  manyTomany,
  oneTomanyPolymorphic,
  manyTomanyPolymorphic,
  loading,
  paranoid,
  transaction,
};
