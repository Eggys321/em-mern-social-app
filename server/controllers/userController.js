const POST = require("../model/postModel");
const USER = require("../model/userModel");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

const getBioProfile = async (req, res) => {
  const { userId } = req.user;
  try {
    let user = await USER.findById({ _id: userId })
      .select("-password")
      .populate("followers", "_id userName profilePhoto")
      .populate("following", "_id userName profilePhoto");
    if (!user) {
      res.status(404).json({ success: "false", message: "user not found" });
      return;
    }
    res.status(200).json({
      success: "true",
      user,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

const followUser = async (req, res) => {
  try {
    const { followersId } = req.params;
    const { userId } = req.user;

    const user = await USER.findById(userId);
    const follower = await USER.findById(followersId);
    if (!user || !follower) {
      res
        .status(404)
        .json({ success: false, message: "user or follower not found" });
      return;
    }

    if (userId === followersId) {
      res
        .status(400)
        .json({ success: false, message: "You cannot follow yourself" });
      return;
    }
    if (!user.following.includes(followersId)) {
      user.following.push(followersId);
      follower.followers.push(userId);
      await user.save();
      await follower.save();

      res
        .status(201)
        .json({ success: true, message: "user followed successfully", user });
    } else {
      res
        .status(400)
        .json({
          success: false,
          message: "You are already following this user",
        });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const unfollowUser = async (req, res) => {
  try {
    const { followersId } = req.params;
    const { userId } = req.user;
    const user = await USER.findById(userId);
    const follower = await USER.findById(followersId);
    if (!user || !follower) {
      res
        .status(404)
        .json({ success: false, message: "user or follower not found" });
      return;
    }

    if (user.following.includes(followersId)) {
      user.following = user.following.filter(
        (id) => id.toString() !== followersId
      );
      follower.followers = follower.followers.filter(
        (id) => id.toString() !== userId
      );
      await user.save();
      await follower.save();
      res
        .status(200)
        .json({ success: true, message: "user unfollowed successfully", user });
    } else {
      res
        .status(400)
        .json({ success: false, message: "you are not following this user" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getSingleUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await USER.findById(userId).select("-password").populate("followers", "_id userName")
    .populate("following", "_id userName");;
    if (!user) {
      res.status(404).json({ success: false, message: "user not found" });
      return;
    }
    const posts = await POST.find({user:userId}).sort({createdAt:-1});

    res.status(200).json({ success: true, message: "user profile", user,posts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await USER.find().select("-password");
    if (users && users.length === 0) {
      res.status(400).json({ success: false, message: "No users yet" });
      return;
    }
    res.status(200).json({ success: true, message: "all users", users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const searchUsers = async (req, res) => {
  try {
    const { searchTerm } = req.query;
    console.log(searchTerm);
    let queryObject = {};

    if (searchTerm) {
      const regex = { $regex: searchTerm, $options: "i" };
      queryObject = { userName: regex };
    }
    console.log(queryObject);
    const users = await USER.find(queryObject);
    if (!users) {
      res.status(404).json({ success: false, message: "user not found" });
      return;
    }
    res.status(200).json({ success: true, users });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
const updateUserProfile = async (req, res) => {
  const { userId } = req.user;
  const { bio, age, gender, location, occupation, x, linkedIn } = req.body;
  let profilePicture;

  try {
    if (req.files && req.files.profilePhoto) {

      const profilePhotoFile = req.files.profilePhoto;

      if (!profilePhotoFile.mimetype || !profilePhotoFile.mimetype.startsWith("image/")) {
        return res.status(400).json({ success: false, message: "Uploaded file must be an image" });
      }

      const result = await cloudinary.uploader.upload(profilePhotoFile.tempFilePath, {
        folder: 'EM_profilePhoto',
      });

      if (result && result.secure_url) {
        profilePicture = result.secure_url;
        console.log("Profile picture URL:", profilePicture);

        fs.unlinkSync(profilePhotoFile.tempFilePath);
      } else {
        console.error('Cloudinary upload failed');
        return res.status(500).json({ success: false, message: 'Failed to upload image' });
      }
    }

    const updatedUserData = {
      bio,
      age,
      gender,
      location,
      occupation,
      x,
      linkedIn,
    };

    if (profilePicture) {
      updatedUserData.profilePhoto = profilePicture;
    }

    const updatedUser = await USER.findByIdAndUpdate(
      userId,
      { $set: updatedUserData },
      { new: true, runValidators: true, context: 'query' }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};
module.exports = {
  getBioProfile,
  followUser,
  unfollowUser,
  getSingleUser,
  getAllUsers,
  searchUsers,
  updateUserProfile
};
