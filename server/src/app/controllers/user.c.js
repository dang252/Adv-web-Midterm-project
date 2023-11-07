import userModel from "../models/user.m.js";

const userController = {
  // [GET] /{id}
  getProfile: async (req, res) => {
    try {
      // get user from database
      console.log(req.params.id);
      const user = await userModel.findById(req.params.id);

      if (user === null) {
        return res.status(404).json("404 Not Found!");
      }

      return res.status(200).json({
        name: user.name,
        phone: user.phone,
        email: user.email,
      });
    } catch (error) {
      console.log(error);

      res.status(500).json("500 Internal Server Error!");
    }
  },

  // [POST] /{id}
  updateProfile: async (req, res) => {
    try {
      // get user from database
      const user = await userModel.findById(req.params.id);

      if (user === null) {
        return res.status(404).json("404 Not Found!");
      }

      const newUser = await userModel.findByIdAndUpdate(
        req.params.id,
        {
          name: req.body.name,
          phone: req.body.phone,
          email: req.body.email,
        },
        { new: true }
      );

      return res.status(200).json({
        name: user.name,
        phone: user.phone,
        email: user.email,
      });
    } catch (error) {
      console.log(error);

      res.status(500).json("500 Internal Server Error!");
    }
  },
};

export default userController;
