const jwt = require('jsonwebtoken');
const UserModel = require('../model/user');

const checkAuthUser = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith("Bearer")) {
      return res
        .status(401)
        .send({ status: "failed", message: "Unauthorized User, No Token" });
    }

    const token = authorization.split(" ")[1];
    const { userID } = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await UserModel.findById(userID).select("-password");
    next();
  } catch (err) {
    console.log(err);
    res.status(400).send({ status: "failed", message: "Unauthorized User" });
  }
};

module.exports = checkAuthUser;
