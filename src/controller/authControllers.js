const User = require("../model/modelUser");
const bcrypt = require("bcrypt");

const authController = {
  //register
  registerUser: async (req, res) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(req.body.password, salt);

      // create user
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashed,
        admin: req.body.admin,
      });

      const user = await newUser.save();
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  // login
  loginUser: async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      user === undefined && res.status(404).json("Wrong user!");
      !validPassword && res.status(404).json("Wrong password");
      if (user && validPassword) {
        res.status(200).json("Login successfully");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = authController;
