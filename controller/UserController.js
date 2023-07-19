const bcrypt = require("bcrypt");
const UserModel = require("../model/user");
const jwt = require("jsonwebtoken");
const transporter = require('../config/emailConfig')

class UserController {
  // user registration
  static userRegistartion = async (req, res) => {
    const { name, email, password, password_confirmation, tc } = req.body;

    try {
      const existingUser = await UserModel.findOne({ email: email });
      if (existingUser) {
        return res
          .status(400)
          .send({ status: "failed", message: "Email already exists" });
      }
      if (!name || !email || !password || !password_confirmation || !tc) {
        return res
          .status(400)
          .send({ status: "failed", message: "All fields are required" });
      }
      if (password !== password_confirmation) {
        return res.status(400).send({
          status: "failed",
          message: "Password and Confirm Password don't match",
        });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = new UserModel({
        name: name,
        email: email,
        password: hashedPassword,
        tc: tc,
      });

      await newUser.save();

      // generate token
      const currentUser = await UserModel.findOne({ email: email });
      const token = jwt.sign(
        { UserID: currentUser._id },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "5d" }
      );
      res.status(201).send({
        status: "success",
        message: "Registration Successful",
        token: token,
      });
    } catch (err) {
      console.log(err);
      res.status(500).send({ status: "failed", message: "Unable to register" });
    }
  };

  // for user login
  static userLogin = async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res
          .status(400)
          .send({ status: "failed", message: "All fields are required" });
      }

      const user = await UserModel.findOne({ email: email });

      if (!user) {
        return res.status(400).send({
          status: "failed",
          message: "Email or Password is not valid",
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).send({
          status: "failed",
          message: "Email or Password is not valid",
        });
      }

      // generate token
      const token = jwt.sign({ userID: user._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "5d",
      });

      res
        .status(201)
        .send({ status: "success", message: "Login Successful", token: token });
    } catch (err) {
      console.log(err);
      res.status(500).send({ status: "failed", message: "Unable to Login" });
    }
  };

  // change password
  static changeUserPassword = async (req, res) => {
    try {
      const { password, password_confirmation } = req.body;
      if (!password || !password_confirmation) {
        res
          .status(400)
          .send({ status: "failed", message: "All fields are required" });
      }
      if (password !== password_confirmation) {
        return res.status(400).send({
          status: "failed",
          message: "New Password and Confirm New Password don't match",
        });
      }

      const salt = await bcrypt.genSalt(10);
      const newHashPassword = await bcrypt.hash(password, salt);
      await UserModel.findByIdAndUpdate(req.user._id, {
        $set: { password: newHashPassword },
      });
      res.send({ status: "success", message: "Password changed successfully" });
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .send({ status: "failed", message: "Unable to Change Password" });
    }
  };

  // logged user data
  static loggedUser = async (req, res) => {
    res.send({ user: req.user });
  };

  // send userpassword reset mail
  static sendUserPasswordResetMail = async (req, res) => {
    try {
      const { email } = req.body;
      if (email) {
        const user = await UserModel.findOne({ email: email });
        if (user) {
          const secret = user._id + process.env.JWT_SECRET_KEY;
          const token = jwt.sign({ userID: user._id }, secret, {
            expiresIn: "15m",
          });
          const link = `http://127.0.0.1:3000/api/user/reset/${user._id}/${token}`;
          console.log(link);

          // send mail functionality
          const mailOptions = await transporter.sendMail({
            from: process.env.EMAIL_USER, // sender address
            to: user.email, // list of receivers
            subject: "GeekShop - Password Reset Link", // Subject line
            html: `<a href=${link}> Click Here </a> to Reset Your Password`, // html body
          });

          console.log(mailOptions,"info")

          transporter.sendMail(mailOptions, (error, inform) => {
            if (error) {
              return console.log(error);
            }
            else {
              console.log('Email sent: ' + inform.response);
            }
            console.log('Message sent: %s', inform.messageId);
          });

          res.status(201).send({
            status: "success",
            message: "Password Reset Email Sent...Please Check Your Mail!",
            info: mailOptions 
          });
        } else {
          res.status(400).send({
            status: "failed",
            message: "Email doesn't exists",
          });
        }
      } else {
        res.send({ status: "failed", message: "Email Field is Required" });
      }
    } catch (err) {
      console.log(err);
      res.send({ status: "failed", message: "Something went wrong!" });
    }
  };

  // user password-reset

  static userPasswordReset = async (req, res) => {
    const { password, password_confirmation } = req.body;
    const { id, token } = req.params;
    const user = await UserModel.findById(id);
    if(user){
      const new_secret = user._id + process.env.JWT_SECRET_KEY;
      try {
        jwt.verify(token, new_secret);
        if (password && password_confirmation) {
          if (password !== password_confirmation) {
            res.send({
              status: "failed",
              message: "New Password and Confirm New Password doesn't match",
            });
          } else {
            const salt = await bcrypt.genSalt(10);
            const newHashPassword = await bcrypt.hash(password, salt);
            await UserModel.findByIdAndUpdate(user._id, {
              $set: { password: newHashPassword },
            });
            res.send({
              status: "success",
              message: "Password Reset Successfully",
            });
          }
        } else {
          res.send({ status: "failed", message: "All Fields are Required" });
        }
      } catch (error) {
        console.log(error);
        res.send({ status: "failed", message: "Invalid Token" });
      }
    }
    else{
      res.send({ status: "failed", message: "User Not Found" });
    }
  };
}

module.exports = UserController;
