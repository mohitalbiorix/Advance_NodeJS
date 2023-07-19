const User = require("../model/user");
const { Sequelize, Op } = require("sequelize");

// add user
const addUser = async (req, res) => {
  // build method only creates an object that represents data that can be mapped to a database but not save data into db.
  /* 
    const user = await User.build({username:'mohit', email: 'mohitkapadiya1234@gmail.com'});
    await user.save(); 
  */

  // shortcut way to create method, which combine build and save method

  const { username, email } = req.body;

  const user = await User.create({ username: username, email: email });

  console.log(user.dataValues); // we can get values inside dataValues object
  // here we can update data also
  user.name = "dummy1";
  user.reload(); // use for take old values untile data not save in database even if modify data.

  // delete user
  // user.destroy();

  res.status(201).send({
    status: true,
    message: "user added successfully!",
  });
};

// update user
const updateUser = async (req, res) => {
  const { username, email } = req.body;
  const userId = req.params.id;

  await User.update(
    { username: username, email: email },
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
};

// delete user
const deleteUser = async (req, res) => {
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
};

// truncate user table
const trancate = async (req, res) => {
  await User.destroy({
    truncate: true,
  });
  res.status(201).send({
    status: true,
    message: "table empty successfully!",
  });
};

// bulk-insert data
const bulkInsert = async (req, res) => {
  const users = req.body;
  await User.bulkCreate(users);
  let data = await User.findAll({});
  console.log(data);
  res.status(201).send({
    status: true,
    message: "inserted all users data successfully!",
  });
};

//get all users
const getUsers = async (req, res) => {
  let data = await User.findAll({});
  res.status(201).send(data);
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

module.exports = {
  addUser,
  updateUser,
  deleteUser,
  trancate,
  bulkInsert,
  getUsers,
  queries,
  finders,
};
