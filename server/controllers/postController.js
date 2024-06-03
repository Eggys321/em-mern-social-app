const POST = require("../model/postModel");
const USER =require("../model/userModel");
const fs = require("fs");
const cloudinary = require("cloudinary").v2;

// create post ftn

const createPost = async (req, res) => {
  const { text } = req.body;
  const image = req.files ? req.files.imagePath : null;
  req.body.user = req.user.userId;
// const {userId} = req.user

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
        // console.log("url for img:", imagePath);
        // remove the uploaded file from the server
        fs.unlinkSync(image.tempFilePath);
      } else {
        // console.log("cloudinary upload failed");
        res
          .status(500)
          .json({ success: false, message: "Failed to upload image" });
          return
      }
    }
    
    const post = new POST({text,imagePath, user: req.user.userId
    });
    //   req.body.user = userId
    await post.save();
    // Update timeline
    // const timelineUpdate = await getTimeline(req.user.userId, post._id);
    res.status(201).json({success:true,message:"post created successfully",post})
  } catch (error) {
    res.status(500).json(error.message)
  }
};
// Timeline
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
        res.status(200).json({success:true,message:"timeline post",posts})
    } catch (error) {
        res.status(500).json(error.message)
    }
}

// like and unlike post
const likePost = async(req,res)=>{
    const {userId} = req.user;
    try {
        const post = await POST.findById(req.params.postId);
        if (!post) {
          return res.status(404).json({ error: 'Post not found.' });
        }
        
        // ================ 1 ======================================
        // if (post.likes.includes(userId)) {
        //   post.likes.pull(userId);
        // } else {
        //   post.likes.push(userId);
        // }

        // await post.save();
        // res.status(200).json({ message: 'Post liked/unliked successfully.', post });
        // =============== 2 ======================================
        // let message;
        // if (post.likes.includes(userId)) {
        //   post.likes.pull(userId);
        //   message = 'Post unliked successfully.';
        // } else {
        //   post.likes.push(userId);
        //   message = 'Post liked successfully.';
        // }
    
    
        // await post.save();
        // res.status(200).json({ message, post });
        // ============== 3 =========================================
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
    // try {
    //     const post = await POST.findByIdAndUpdate(
    //         req.params.id,
    //         {
    //           $addToSet: { likes: req.user.userId },
    //         },
    //         { new: true }
    //       );
    //       const posts = await POST.find()
    //         .sort({ createdAt: -1 })
    //         .populate("user", "userName");
    //       res.status(200).json({
    //         success: true,
    //         message: "post liked",
    //         post,
    //         // posts,
    //       });
    // } catch (error) {
    //     res.status(500).json(error);
    //     console.log(error.message);
    // }
}

// comments
const commentPost = async(req,res)=>{
  const {userId} = req.user
  try {
    const post = await POST.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({success:false, message: 'Post not found.' });
    }

    const comment = {user:userId, text: req.body.text };
    post.comments.push(comment);

    await post.save();
    res.status(201).json({success:true, message: 'Comment added successfully.', post });
  } catch (err) {
    res.status(500).json( err.message);
  }
}

// edit post
// === 12 ==========
const editPost = async (req, res) => {
  const { postId } = req.params;
  const { text } = req.body;
  const image = req.files ? req.files.image : null;

  try {
    const post = await POST.findById(postId);
    if (!post) {
      return res.status(404).json({ error: 'Post not found.' });
    }

    // Check if the user is the owner of the post
    if (post.user.toString() !== req.user.userId) {
      return res.status(403).json({ error: 'You do not have permission to edit this post.' });
    }

    // Update text if provided
    if (text !== undefined) {
      post.text = text;
    }

    // Update image if provided
    if (image) {
      // If there's already an image, destroy it from Cloudinary
      if (post.imagePath) {
        const publicId = post.imagePath.split('/').pop().split('.')[0]; // Extract publicId from the URL
        await cloudinary.uploader.destroy(`EM_posts/${publicId}`);
      }

      // Upload new image to Cloudinary
      const result = await cloudinary.uploader.upload(image.tempFilePath, {
        folder: "EM_posts",
      });

      if (result && result.secure_url) {
        post.imagePath = result.secure_url;
        // Remove the uploaded file from the server
        fs.unlinkSync(image.tempFilePath);
      } else {
        return res.status(500).json({ success: false, message: "Failed to upload image" });
      }
    }

    // Save the updated post
    await post.save();
    res.status(200).json({ success: true, message: "Post updated successfully.", post });
  } catch (error) {
    console.error('Error editing post:', error);
    res.status(500).json({ error: 'Failed to edit post.' });
  }
};
// === 11 ==========
// const editPost = async (req, res) => {
//   const { postId } = req.params;
//   const { text } = req.body;
//   const image = req.files ? req.files.image : null;

//   try {
//     const post = await POST.findById(postId);
//     if (!post) {
//       return res.status(404).json({ error: 'Post not found.' });
//     }

//     // Check if the user is the owner of the post
//     if (post.user.toString() !== req.user.userId) {
//       return res.status(403).json({ error: 'You do not have permission to edit this post.' });
//     }

//     // Update text if provided
//     if (text !== undefined) {
//       post.text = text;
//     }

//     // Update image if provided
//     if (image) {
//       // Upload new image to Cloudinary
//       const result = await cloudinary.uploader.upload(image.tempFilePath, {
//         folder: "EM_posts",
//       });

//       if (result && result.secure_url) {
//         post.imagePath = result.secure_url;
//         // Remove the uploaded file from the server
//         fs.unlinkSync(image.tempFilePath);
//       } else {
//         return res.status(500).json({ success: false, message: "Failed to upload image" });
//       }
//     }

//     // Save the updated post
//     await post.save();
//     res.status(200).json({ success: true, message: "Post updated successfully.", post });
//   } catch (error) {
//     console.error('Error editing post:', error);
//     res.status(500).json({ error: 'Failed to edit post.' });
//   }
// };
// === 10 ==========
// const editPost = async (req, res) => {
//   const { postId } = req.params;
//   const { text } = req.body;
//   const image = req.files ? req.files.image : null; // Make sure this is correctly getting the image file

//   try {
//     const post = await POST.findById(postId);
//     if (!post) {
//       return res.status(404).json({ error: 'Post not found.' });
//     }

//     // Check if the user is the owner of the post
//     if (post.user.toString() !== req.user.userId) {
//       return res.status(403).json({ error: 'You do not have permission to edit this post.' });
//     }

//     // Update text if provided
//     if (text !== undefined) {
//       post.text = text;
//     }

//     // Update image if provided
//     if (image) {
//       // If there's already an image, remove it from Cloudinary
//       // if (post.imagePath) {
//       //   const publicId = post.imagePath.split('/').pop().split('.')[0]; // Extract publicId from the URL
//       //   await cloudinary.uploader.destroy(`EM_posts/${publicId}`);
//       // }

//       // Upload new image to Cloudinary
//       const result = await cloudinary.uploader.upload(image.tempFilePath, {
//         folder: "EM_posts",
//       });

//       if (result && result.secure_url) {
//         post.imagePath = result.secure_url;
//         // Remove the uploaded file from the server
//         fs.unlinkSync(image.tempFilePath);
//       } else {
//         return res.status(500).json({ success: false, message: "Failed to upload image" });
//       }
//     }

//     // Save the updated post
//     await post.save();
//     res.status(200).json({ success: true, message: "Post updated successfully.", post });
//   } catch (error) {
//     console.error('Error editing post:', error);
//     res.status(500).json({ error: 'Failed to edit post.' });
//   }
// };
// === 9 ===========
// const editPost = async (req, res) => {
//   const { postId } = req.params;
//   const { text } = req.body;
//   const image = req.files ? req.files.image : null;
//   const userId = req.user.userId;

//   try {
//     const post = await POST.findById(postId);
//     if (!post) {
//       return res.status(404).json({ error: 'Post not found.' });
//     }

//     if (post.user.toString() !== userId) {
//       return res.status(403).json({ error: 'You do not have permission to edit this post.' });
//     }

//     // Update text if provided
//     if (text !== undefined) {
//       post.text = text;
//     }

//     // Update image if provided
//     if (image) {
//       // If there's already an image, remove it from Cloudinary
//       if (post.imagePath) {
//         const publicId = post.imagePath.split('/').pop().split('.')[0]; // Extract publicId from the URL
//         await cloudinary.uploader.destroy(`EM_posts/${publicId}`);
//       }

//       // Upload new image to Cloudinary
//       const result = await cloudinary.uploader.upload(image.tempFilePath, {
//         folder: "EM_posts",
//       });

//       if (result && result.secure_url) {
//         post.imagePath = result.secure_url;
//         // Remove the uploaded file from the server
//         fs.unlinkSync(image.tempFilePath);
//       } else {
//         return res.status(500).json({ success: false, message: "Failed to upload image" });
//       }
//     }

//     await post.save();
//     return res.status(200).json({ success: true, message: "Post updated successfully.", post });
//   } catch (error) {
//     console.error('Error editing post:', error);
//     return res.status(500).json({ error: 'Failed to edit post.' });
//   }
// };
// === 8 ===========
// const editPost = async (req, res) => {
//   const { postId } = req.params;
//   const { text } = req.body;
//   const image = req.files ? req.files.image : null;
//   const userId = req.user.userId;

//   try {
//     // Find the post by ID
//     const post = await POST.findById(postId);
//     if (!post) {
//       return res.status(404).json({ error: 'Post not found.' });
//     }

//     // Check if the user is the owner of the post
//     if (post.user.toString() !== userId) {
//       return res.status(403).json({ error: 'You do not have permission to edit this post.' });
//     }

//     // Update text if provided
//     if (text !== undefined) {
//       post.text = text;
//     }

//     // Update image if provided
//     if (image) {
//       try {
//         // If there's already an image, remove it from Cloudinary
//         if (post.imagePath) {
//           const publicId = post.imagePath.split('/').slice(-2).join('/').split('.')[0]; // Extract publicId from the URL
//           console.log('Existing image publicId:', publicId);

//           const resultDestroy = await cloudinary.uploader.destroy(publicId);
//           console.log('Result of destroying existing image:', resultDestroy);
//         }

//         // Upload new image to Cloudinary
//         const resultUpload = await cloudinary.uploader.upload(image.tempFilePath, {
//           folder: "EM_posts",
//         });

//         console.log('Result of uploading new image:', resultUpload);

//         if (resultUpload && resultUpload.secure_url) {
//           post.imagePath = resultUpload.secure_url;
//           // Remove the uploaded file from the server
//           fs.unlinkSync(image.tempFilePath);
//         } else {
//           return res.status(500).json({ success: false, message: "Failed to upload image" });
//         }
//       } catch (uploadError) {
//         console.error('Error during image upload:', uploadError);
//         return res.status(500).json({ success: false, message: "Failed to process image upload" });
//       }
//     }

//     // Save the updated post
//     await post.save();
//     res.status(200).json({ success: true, message: "Post updated successfully.", post });
//   } catch (error) {
//     console.error('Error editing post:', error);
//     res.status(500).json({ error: 'Failed to edit post.' });
//   }
// };
// === 7 ===========
// const editPost = async (req, res) => {
//   const { postId } = req.params;
//   const { text } = req.body;
//   const image = req.files ? req.files.image : null;
//   const userId = req.user.userId;

//   try {
//     // Find the post by ID
//     const post = await POST.findById(postId);
//     if (!post) {
//       return res.status(404).json({ error: 'Post not found.' });
//     }

//     // Check if the user is the owner of the post
//     if (post.user.toString() !== userId) {
//       return res.status(403).json({ error: 'You do not have permission to edit this post.' });
//     }

//     // Update text if provided
//     if (text !== undefined) {
//       post.text = text;
//     }

//     // Update image if provided
//     if (image) {
//       try {
//         // If there's already an image, remove it from Cloudinary
//         if (post.imagePath) {
//           // Extract publicId from the URL (e.g., "EM_posts/abc123")
//           const publicId = post.imagePath.split('/').slice(-2).join('/').split('.')[0];
//           console.log('Existing image publicId:', publicId);

//           const resultDestroy = await cloudinary.uploader.destroy(publicId);
//           console.log('Result of destroying existing image:', resultDestroy);

//           if (resultDestroy.result !== 'ok') {
//             console.error('Error destroying existing image:', resultDestroy);
//             return res.status(500).json({ success: false, message: "Failed to delete existing image" });
//           }
//         }

//         // Upload new image to Cloudinary
//         const resultUpload = await cloudinary.uploader.upload(image.tempFilePath, {
//           folder: "EM_posts",
//         });

//         console.log('Result of uploading new image:', resultUpload);

//         if (resultUpload && resultUpload.secure_url) {
//           post.imagePath = resultUpload.secure_url;
//           // Remove the uploaded file from the server
//           fs.unlinkSync(image.tempFilePath);
//         } else {
//           console.error('Failed to upload new image:', resultUpload);
//           return res.status(500).json({ success: false, message: "Failed to upload new image" });
//         }
//       } catch (uploadError) {
//         console.error('Error during image upload:', uploadError);
//         return res.status(500).json({ success: false, message: "Failed to process image upload" });
//       }
//     }

//     // Save the updated post
//     await post.save();
//     res.status(200).json({ success: true, message: "Post updated successfully.", post });
//   } catch (error) {
//     console.error('Error editing post:', error);
//     res.status(500).json({ error: 'Failed to edit post.' });
//   }
// };
// === 6 ===========
// const editPost = async (req, res) => {
//   const { postId } = req.params;
//   const { text } = req.body;
//   const image = req.files ? req.files.image : null;
//   const userId = req.user.userId;

//   try {
//     // Find the post by ID
//     const post = await POST.findById(postId);
//     if (!post) {
//       return res.status(404).json({ error: 'Post not found.' });
//     }

//     // Check if the user is the owner of the post
//     if (post.user.toString() !== userId) {
//       return res.status(403).json({ error: 'You do not have permission to edit this post.' });
//     }

//     // Update text if provided
//     if (text !== undefined) {
//       post.text = text;
//     }

//     // Update image if provided
//     if (image) {
//       try {
//         // If there's already an image, remove it from Cloudinary
//         if (post.imagePath) {
//           const publicId = post.imagePath.split('/').slice(-2).join('/').split('.')[0]; // Extract publicId from the URL
//           console.log('Existing image publicId:', publicId);

//           const resultDestroy = await cloudinary.uploader.destroy(publicId);
//           console.log('Result of destroying existing image:', resultDestroy);
//         }

//         // Upload new image to Cloudinary
//         const resultUpload = await cloudinary.uploader.upload(image.tempFilePath, {
//           folder: "EM_posts",
//         });

//         console.log('Result of uploading new image:', resultUpload);

//         if (resultUpload && resultUpload.secure_url) {
//           post.imagePath = resultUpload.secure_url;
//           // Remove the uploaded file from the server
//           fs.unlinkSync(image.tempFilePath);
//         } else {
//           return res.status(500).json({ success: false, message: "Failed to upload image" });
//         }
//       } catch (uploadError) {
//         console.error('Error during image upload:', uploadError);
//         return res.status(500).json({ success: false, message: "Failed to process image upload" });
//       }
//     }

//     // Save the updated post
//     await post.save();
//     res.status(200).json({ success: true, message: "Post updated successfully.", post });
//   } catch (error) {
//     console.error('Error editing post:', error);
//     res.status(500).json({ error: 'Failed to edit post.' });
//   }
// };
// === 5 ===========

// const editPost = async (req, res) => {
//   const { postId } = req.params;
//   const { text } = req.body;
//   const image = req.files ? req.files.image : null;
//   const userId = req.user.userId;

//   try {
//     // Find the post by ID
//     const post = await POST.findById(postId);
//     if (!post) {
//       return res.status(404).json({ error: 'Post not found.' });
//     }

//     // Check if the user is the owner of the post
//     if (post.user.toString() !== userId) {
//       return res.status(403).json({ error: 'You do not have permission to edit this post.' });
//     }

//     // Update text if provided
//     if (text !== undefined) {
//       post.text = text;
//     }

//     // Update image if provided
//     if (image) {
//       // If there's already an image, remove it from Cloudinary
//       if (post.imagePath) {
//         const publicId = post.imagePath.split('/').slice(-2).join('/').split('.')[0]; // Extract publicId from the URL
//         console.log('Existing image publicId:', publicId);

//         const resultDestroy = await cloudinary.uploader.destroy(publicId);
//         console.log('Result of destroying existing image:', resultDestroy);
//       }

//       // Upload new image to Cloudinary
//       const resultUpload = await cloudinary.uploader.upload(image.tempFilePath, {
//         folder: "EM_posts",
//       });

//       console.log('Result of uploading new image:', resultUpload);

//       if (resultUpload && resultUpload.secure_url) {
//         post.imagePath = resultUpload.secure_url;
//         // Remove the uploaded file from the server
//         fs.unlinkSync(image.tempFilePath);
//       } else {
//         return res.status(500).json({ success: false, message: "Failed to upload image" });
//       }
//     }

//     // Save the updated post
//     await post.save();
//     res.status(200).json({ success: true, message: "Post updated successfully.", post });
//   } catch (error) {
//     console.error('Error editing post:', error);
//     res.status(500).json({ error: 'Failed to edit post.' });
//   }
// };

// === 4 ===========
// const editPost = async (req, res) => {
//   const { postId } = req.params;
//   const { text } = req.body;
//   const image = req.files ? req.files.image : null;
//   const userId = req.user.userId;

//   try {
//     const post = await POST.findById(postId);
//     if (!post) {
//       return res.status(404).json({ error: 'Post not found.' });
//     }

//     if (post.user.toString() !== userId) {
//       return res.status(403).json({ error: 'You do not have permission to edit this post.' });
//     }

//     // Update text if provided
//     if (text !== undefined) {
//       post.text = text;
//     }

//     // Update image if provided
//     if (image) {
//       // If there's already an image, remove it from Cloudinary
//       if (post.imagePath) {
//         const publicId = post.imagePath.split('/').pop().split('.')[0]; // Extract publicId from the URL
//         console.log('Existing image publicId:', publicId);

//         const resultDestroy = await cloudinary.uploader.destroy(publicId);
//         console.log('Result of destroying existing image:', resultDestroy);
//       }

//       // Upload new image to Cloudinary
//       const resultUpload = await cloudinary.uploader.upload(image.tempFilePath, {
//         folder: "EM_posts",
//       });

//       console.log('Result of uploading new image:', resultUpload);

//       if (resultUpload && resultUpload.secure_url) {
//         post.imagePath = resultUpload.secure_url;
//         // Remove the uploaded file from the server
//         fs.unlinkSync(image.tempFilePath);
//       } else {
//         return res.status(500).json({ success: false, message: "Failed to upload image" });
//       }
//     }

//     await post.save();
//     res.status(200).json({ success: true, message: "Post updated successfully.", post });
//   } catch (error) {
//     console.error('Error editing post:', error);
//     res.status(500).json({ error: 'Failed to edit post.' });
//   }
// };
// === 3 ===========
// const editPost = async (req, res) => {
//   const { postId } = req.params;
//   const { text } = req.body;
//   const image = req.files ? req.files.image : null;
//   const userId = req.user.userId;

//   try {
//     const post = await POST.findById(postId);
//     if (!post) {
//       return res.status(404).json({ error: 'Post not found.' });
//     }

//     if (post.user.toString() !== userId) {
//       return res.status(403).json({ error: 'You do not have permission to edit this post.' });
//     }

//     // Update text if provided
//     if (text !== undefined) {
//       post.text = text;
//     }

//     // Update image if provided
//     if (image) {
//       // If there's already an image, remove it from Cloudinary
//       if (post.imagePath) {
//         const publicId = post.imagePath.split('/').pop().split('.')[0]; // Extract publicId from the URL
//         await cloudinary.uploader.destroy(`EM_posts/${publicId}`);
        
//       }

//       // Upload new image to Cloudinary
//       const result = await cloudinary.uploader.upload(image.tempFilePath, {
//         folder: "EM_posts",
//       });

//       if (result && result.secure_url) {
//         post.imagePath = result.secure_url;
//         // Remove the uploaded file from the server
//         fs.unlinkSync(image.tempFilePath);
//       } else {
//         return res.status(500).json({ success: false, message: "Failed to upload image" });
//       }
//     }

//     await post.save();
//     res.status(200).json({ success: true, message: "Post updated successfully.", post });
//   } catch (error) {
//     console.error('Error editing post:', error);
//     res.status(500).json({ error: 'Failed to edit post.' });
//   }
// };
// === 2============
// const editPost = async (req, res) => {
//   const { postId } = req.params;
//   const { text } = req.body;
//   const image = req.files ? req.files.image : null;
//   const userId = req.user.userId;

//   try {
//     const post = await POST.findById(postId);
//     if (!post) {
//       return res.status(404).json({ error: 'Post not found.' });
//     }

//     if (post.user.toString() !== userId) {
//       return res.status(403).json({ error: 'You do not have permission to edit this post.' });
//     }

//     // Update text if provided
//     if (text !== undefined) {
//       post.text = text;
//     }

//     // Update image if provided
//     if (image) {
//       // If there's already an image, optionally remove it from Cloudinary (optional, if needed)
//       const existingImagePath = post.imagePath;
//       if (existingImagePath) {
//         const publicId = existingImagePath.split('/').pop().split('.')[0]; // Assuming the URL format
//         await cloudinary.uploader.destroy(`EM_posts/${publicId}`);
//       }

//       const result = await cloudinary.uploader.upload(image.tempFilePath, {
//         folder: "EM_posts",
//       });

//       if (result && result.secure_url) {
//         post.imagePath = result.secure_url;
//         // Remove the uploaded file from the server
//         fs.unlinkSync(image.tempFilePath);
//       } else {
//         return res.status(500).json({ success: false, message: "Failed to upload image" });
//       }
//     }

//     await post.save();
//     res.status(200).json({ success: true, message: "Post updated successfully.", post });
//   } catch (error) {
//     console.error('Error editing post:', error);
//     res.status(500).json({ error: 'Failed to edit post.' });
//   }
// };
// ==== 1 =============
// const editPost = async(req,res)=>{
//   try {
//     const post = await POST.findById(req.params.postId);
//     if (!post || post.user.toString() !== req.user._id.toString()) {
//       return res.status(404).json({ error: 'Post not found or unauthorized.' });
//     }

//     const { text } = req.body;
//     const image = req.files ? req.files.image : null;

//     if (text) {
//       post.text = postText;
//     }

//     if (image) {
//       const oldImagePath = post.imagePath;
//       console.log("New image received for upload.");

//       const result = await cloudinary.uploader.upload(image.tempFilePath, {
//         folder: 'EM_posts',
//       });

//       console.log("Cloudinary upload result:", result);

//       if (result && result.secure_url) {
//         post.imagePath = result.secure_url;
//         console.log("New image URL:", post.imagePath);

//         fs.unlinkSync(image.tempFilePath);

//         // Optionally, you can delete the old image from Cloudinary here if needed
//         cloudinary.uploader.destroy(oldImagePath);
//       } else {
//         console.error('Cloudinary upload failed');
//         return res.status(500).json({ success: false, message: 'Failed to upload image' });
//       }
//     }

//     post.updatedAt = Date.now();
//     await post.save();
//     res.status(200).json({ message: 'Post updated successfully.', post });
//   } catch (err) {
//     console.error('Error updating post:', err);
//     res.status(500).json(err.message);
//   }
// }

// delete post
// === 4 =======
const deletePost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const userId = req.user.userId;

    // Find the post by ID
    const post = await POST.findById(postId);

    // Check if the post was found
    if (!post) {
      return res.status(404).json({ error: 'Post not found.' });
    }

    // Check if the user is the owner of the post
    if (post.user.toString() !== userId) {
      return res.status(403).json({success:false, message: 'You do not have permission to delete this post.' });
    }

    // Delete the post
    await POST.deleteOne({ _id: postId });

    res.status(200).json({ success: true, message: 'Post deleted successfully.' });
  } catch (error) {
    // console.error('Error deleting post:', error);
    res.status(500).json(error.message);
  }
};
// === 3 =======
// const deletePost = async (req, res) => {
//   try {
//     const postId = req.params.postId;
//     const userId = req.user.userId;

//     // Find the post by ID
//     const post = await POST.findById(postId);

//     // Check if the post was found
//     if (!post) {
//       return res.status(404).json({ error: 'Post not found.' });
//     }

//     // Check if the user is the owner of the post
//     if (post.user.toString() !== userId) {
//       return res.status(403).json({ error: 'You do not have permission to delete this post.' });
//     }

//     // Delete the post
//     await post.remove();

//     res.status(200).json({ success: true, message: 'Post deleted successfully.' });
//   } catch (error) {
//     console.error('Error deleting post:', error);
//     res.status(500).json({ error: 'Failed to delete post.' });
//   }
// };
// === 2 =======
// const deletePost = async (req, res) => {
//   try {
//     const postId = req.params.postId;
//     const userId = req.user;

//     // Ensure that the post exists and the user owns it
//     const post = await POST.findOne({ _id: postId, user: userId });
//     // Check if the user is the owner of the post
//     if (post.user.toString() !== userId) {
//       return res.status(403).json({ error: 'You do not have permission to delete this post.' });
//     }
//     if (!post) {
//       return res.status(404).json({ error: 'Post not found or unauthorized.' });
//     }

//     if(post){
//       await  POST.findOne({ _id: postId, user: userId })
//       res.status(200).json({ success: true, message: 'Post deleted successfully.' });
//       return
//     }

//     // Remove the post
//     // await post.remove();

//   } catch (error) {
//     console.error('Error deleting post:', error);
//     res.status(500).json(error.message);
//   }
// };

// === 1 =======
// const deletePost = async(req,res)=>{
//   const {userId} = req.user
//   try {
//     const post = await POST.findById(req.params.postId);
//     if (!post || post.user.toString() !== userId) {
//       return res.status(404).json({ error: 'Post not found or unauthorized.' });
//     }

//     if (post.imagePath) {
//       const publicId = post.imagePath.split('/').pop().split('.')[0];
//       await cloudinary.uploader.destroy(publicId);
//     }

//     await post.remove();
//     res.status(200).json({ message: 'Post deleted successfully.' });
//   } catch (err) {
//     console.error('Error deleting post:', err);
//     res.status(500).json(err.message);
//   }
// }

// get comments for a post
const getComments = async(req,res)=>{
  try {
    const post = await POST.findById(req.params.postId).populate('comments.user', 'userName profilePhoto');
    if (!post) {
      return res.status(404).json({ success:false,message: 'Post not found.' });
    }

    res.status(200).json({success:true,comments:post.comments});
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch comments.' });
  }
}

// get all posts by a user
const getPostsByUser = async(req,res)=>{
  const {userId} = req.user

  try {
    const post = await POST.find({user:userId}).populate({path:"user",select:"-password"});
    res.status(200).json({success:true,message:"users post",post})
  } catch (error) {
    res.status(500).json(error.message)
  }
}
// Delete a comment
// const deleteComment = async (req, res) => {
//   try {
//     const postId = req.params.postId;
//     const commentId = req.params.commentId;
//     const userId = req.user.userId;

//     // Find the post by ID
//     const post = await POST.findById(postId);

//     // Check if the post exists
//     if (!post) {
//       return res.status(404).json({success:false, message: 'Post not found.' });
//     }

//     // Find the comment by ID
//     const comment = post.comments.find(comment => comment._id.toString() === commentId);

//     // Check if the comment exists
//     if (!comment) {
//       return res.status(404).json({success:false, message: 'Comment not found.' });
//     }

//     // Check if the user is the owner of the comment
//     if (comment.user.toString() !== userId) {
//       return res.status(403).json({success:false, message: 'You do not have permission to delete this comment.' });
//     }

//     // Delete the comment
//     post.comments = post.comments.filter(comment => comment._id.toString() !== commentId);
//     await post.save();

//     res.status(200).json({ success: true, message: 'Comment deleted successfully.' });
//   } catch (error) {
//     // console.error('Error deleting comment:', error);
//     res.status(500).json(error.message);
//   }
// };

// Edit a comment
// const editComment = async (req, res) => {
//   try {
//     const postId = req.params.postId;
//     const commentId = req.params.commentId;
//     const userId = req.user.userId;
//     const newText = req.body.text;

//     // Find the post by ID
//     const post = await POST.findById(postId);

//     // Check if the post exists
//     if (!post) {
//       return res.status(404).json({ success:false, message: 'Post not found.' });
//     }

//     // Find the comment by ID
//     const comment = post.comments.find(comment => comment._id.toString() === commentId);

//     // Check if the comment exists
//     if (!comment) {
//       return res.status(404).json({ success:false,message: 'Comment not found.' });
//     }

//     // Check if the user is the owner of the comment
//     if (comment.user.toString() !== userId) {
//       return res.status(403).json({ success:false,message: 'You do not have permission to edit this comment.' });
//     }

//     // Edit the comment
//     comment.text = newText;
//     await post.save();

//     res.status(200).json({ success: true, message: 'Comment edited successfully.' });
//   } catch (error) {
//     console.error('Error editing comment:', error);
//     res.status(500).json(error.message);
//   }
// };
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
