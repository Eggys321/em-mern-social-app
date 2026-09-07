const POST = require("../model/postModel");
const USER =require("../model/userModel");
const fs = require("fs");
const cloudinary = require("cloudinary").v2;

const createPost = async (req, res) => {
  const { text } = req.body;
  const image = req.files ? req.files.imagePath : null;
  req.body.user = req.user.userId;

  if (!text && !image) {
    res
      .status(400)
      .json({
        success: false,
        message: "You must provide either text or an image",
      });
    return;
  }

  try {
    let imagePath = null;
    if (image) {
      const result = await cloudinary.uploader.upload(image.tempFilePath, {
        folder: "EM_posts",
      });
      console.log("cloudinary upload successful", result);
      if (result && result.secure_url) {
        imagePath = result.secure_url;
        fs.unlinkSync(image.tempFilePath);
      } else {
        res
          .status(500)
          .json({ success: false, message: "Failed to upload image" });
          return
      }
    }

    const post = new POST({text,imagePath, user: req.user.userId
    });
    await post.save();
    res.status(201).json({success:true,message:"post created successfully",post})
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
};
const getTimeline = async (req,res)=>{
    const {userId} =  req.user
    try {
        const user  = await USER.findById(userId).populate("following");
        const followingIds = user.following.map((fIdx)=> fIdx._id);
        followingIds.push(userId);

        const posts = await POST.find({user:{$in:followingIds}}).populate({
          path: "user",
          select: "userName profilePhoto follower following"
      }).populate("comments.user","userName").sort({createdAt:-1});

    const postsWithCommentsCount = posts.map(post => ({
      ...post.toObject(),
      commentsCount: post.comments.length
    }));

        res.status(200).json({success:true,message:"timeline post",posts:postsWithCommentsCount})
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

const likePost = async(req,res)=>{
    const {userId} = req.user;
    try {
        const post = await POST.findById(req.params.postId);
        if (!post) {
          return res.status(404).json({ success: false, message: 'Post not found.' });
        }

        if (post.likes.includes(userId)) {
          post.likes.pull(userId);
          await post.save();
          return res.status(200).json({success:true, message: 'Post unliked successfully.', post });
        } else {
          post.likes.push(userId);
          await post.save();
          return res.status(200).json({success:true, message: 'Post liked successfully.', post });
        }
      } catch (err) {
        res.status(500).json({success:false, message: 'Failed to like/unlike post.' });
      }
}

const commentPost = async(req,res)=>{
  const {userId} = req.user;
  const {text} = req.body;
  try {
    const post = await POST.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({success:false, message: 'Post not found.' });
    }
    if(!text){
      return res.status(400).json({success:false, message: 'comment box can not be empty' });

    }

    const comment = {user:userId, text: req.body.text };
    post.comments.push(comment);

    await post.save();
    res.status(201).json({success:true, message: 'Comment added successfully.', post });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

const editPost = async (req, res) => {
  const { postId } = req.params;
  const { text } = req.body;
  const image = req.files ? req.files.image : null;

  try {
    const post = await POST.findById(postId);
    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found.' });
    }

    if (post.user.toString() !== req.user.userId) {
      return res.status(403).json({ success: false, message: 'You do not have permission to edit this post.' });
    }

    if (text !== undefined) {
      post.text = text;
    }

    if (image) {
      if (post.imagePath) {
        const publicId = post.imagePath.split('/').pop().split('.')[0];
        await cloudinary.uploader.destroy(`EM_posts/${publicId}`);
      }

      const result = await cloudinary.uploader.upload(image.tempFilePath, {
        folder: "EM_posts",
      });

      if (result && result.secure_url) {
        post.imagePath = result.secure_url;
        fs.unlinkSync(image.tempFilePath);
      } else {
        return res.status(500).json({ success: false, message: "Failed to upload image" });
      }
    }

    await post.save();
    res.status(200).json({ success: true, message: "Post updated successfully.", post });
  } catch (error) {
    console.error('Error editing post:', error);
    res.status(500).json({ success: false, message: 'Failed to edit post.' });
  }
};

const deletePost = async(req,res)=>{

  try {
    const { postId } = req.params;
    const userId = req.user.userId;

    const post = await POST.findOne({ _id: postId, user: userId });
    if (!post) {
        return res.status(404).json({ success: false, message: 'Post not found or you are not authorized to delete this post' });
    }

    await POST.findByIdAndDelete(postId);

    await POST.updateMany(
        { "comments.post": postId },
        { $pull: { comments: { post: postId } } }
    );

    await POST.updateMany(
        { "likes.post": postId },
        { $pull: { likes: { post: postId } } }
    );

    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
}

const getComments = async(req,res)=>{
  try {
    const post = await POST.findById(req.params.postId).populate('comments.user', 'userName profilePhoto').sort({createdAt:-1});
    if (!post) {
      return res.status(404).json({ success:false,message: 'Post not found.' });
    }

    res.status(200).json({success:true,comments:post.comments});
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch comments.' });
  }
}

const getPostsByUser = async(req,res)=>{
  const {userId} = req.user

  try {
    const post = await POST.find({user:userId}).populate({path:"user",select:"-password"}).sort({createdAt:-1});
    res.status(200).json({success:true,message:"users post",post})
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

module.exports = {
    createPost,
    getTimeline,
    likePost,
    commentPost,
    editPost,
    deletePost,
    getComments,
    getPostsByUser

}
