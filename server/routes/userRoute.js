const express = require("express");
const { getBioProfile, followUser, unfollowUser, getSingleUser, getAllUsers, searchUsers, updateUserProfile} = require("../controllers/userController");
const router = express.Router();
const authMiddleware = require("../middleware/auth")
router.get("/search",searchUsers)
router.get('/', authMiddleware, getBioProfile);
router.post("/follow/:followersId",authMiddleware,followUser)

router.post("/unfollow/:followersId",authMiddleware,unfollowUser);
router.get("/userprofile/:userId", getSingleUser);

router.get("/all",getAllUsers);

router.patch('/update-profile', authMiddleware, updateUserProfile);




module.exports = router