const USER = require("../model/userModel");

// get a user by id
const getUserById = async (req, res) => {
  const { userId } = req.user;
  try {
    let user = await USER.findById({ _id: userId }).select("-password").populate('followers', '_id userName profilePhoto')
    .populate('following', '_id userName profilePhoto');;
    if (!user) {
      res.status(404).json({ success: "false", message: "user not found" });
      return;
    }
    res.status(200).json({
      success: "true",
      user
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
};

module.exports = {
  getUserById,
};
