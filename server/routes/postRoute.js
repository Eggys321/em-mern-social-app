const express = require("express");
const { createPost, getTimeline, likePost, commentPost, editPost, deletePost, getComments, getPostsByUser } = require("../controllers/postController");
const router = express.Router();
const authMiddleware = require("../middleware/auth");


// create route
router.post('/create-post',authMiddleware,createPost);
// timeline route
router.get('/timeline',authMiddleware,getTimeline);
// like a post
router.post('/like-post/:postId',authMiddleware,likePost);
// create comment on post
router.post('/comment-post/:postId',authMiddleware,commentPost);
// edit post
router.patch('/edit-post/:postId',authMiddleware,editPost);
// delete post
router.delete("/delete-post/:postId",authMiddleware,deletePost);
// getting comments for a post
router.get("/comments/:postId",getComments);
// getting all posts by user
router.get("/user-posts",authMiddleware,getPostsByUser)
module.exports = router;