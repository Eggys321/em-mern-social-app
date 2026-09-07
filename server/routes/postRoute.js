const express = require("express");
const { createPost, getTimeline, likePost, commentPost, editPost, deletePost, getComments, getPostsByUser } = require("../controllers/postController");
const router = express.Router();
const authMiddleware = require("../middleware/auth");


router.post('/create-post',authMiddleware,createPost);
router.get('/timeline',authMiddleware,getTimeline);
router.post('/like-post/:postId',authMiddleware,likePost);
router.post('/comment-post/:postId',authMiddleware,commentPost);
router.patch('/edit-post/:postId',authMiddleware,editPost);
router.delete("/delete-post/:postId",authMiddleware,deletePost);
router.get("/comments/:postId",getComments);
router.get("/user-posts",authMiddleware,getPostsByUser)
module.exports = router;