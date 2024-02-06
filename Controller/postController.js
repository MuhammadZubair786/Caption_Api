const postModel = require("../Model/postModel");
const userModel = require("../Model/userModel");
const cloudinary = require("cloudinary").v2;
const mongoose = require("mongoose");

exports.createUserpost = async (req, res) => {
  try {
    // const validationResult = validateCategory(req.body);
    var { title, post_type } = req.body;

    if (post_type == undefined) {
      return res.json({
        message: "Enter must Post Type",
      });
    } else if (post_type == "title") {
      if (title == undefined || title == null ) {
        return res.json({
          message: "Enter Post Title ",
        });
      }
      const user = await userModel.findById(req.userId); // Assuming you have userId in your request
      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      const newPost = new postModel({
        user_id: user._id,
        title: req.body.title,
        post_type:"title"
      });

      // Save the new post
      await newPost.save();

      user.posts.push(newPost._id);
      await user.save();

      return res.status(200).json({
        message: "Post added to the user",
        data: newPost,
      });
    } else if (post_type == "image") {
      if (req.file == undefined) {
        return res.status(401).json({
          message: "Select Post Pic",
        });
      } else {
        const folderName = "post";
        const qualityLevel = "auto:low";

        const bufferStream = cloudinary.uploader.upload_stream(
          {
            folder: folderName,
            resource_type: "auto",
            quality: qualityLevel,
          },
          async (error, result) => {
            if (error) {
              return res.status(500).json({
                error: "Failed to upload image to Cloudinary",
              });
            }

            const user = await userModel.findById(req.userId); // Assuming you have userId in your request
            if (!user) {
              return res.status(404).json({
                message: "User not found",
              });
            }

            const newPost = new postModel({
              user_id: user._id,
              post_type:"image",
              imageUrl: result.secure_url, // Use the Cloudinary URL or modify as needed
              // Add more fields as needed
            });

            // Save the new post
            await newPost.save();

            user.posts.push(newPost._id);
            await user.save();

            return res.status(200).json({
              message: "Post added to the user",
              data: newPost,
            });

            // Add the Cloudinary URL to your category data
          },
        );
        bufferStream.end(req.file.buffer);
      }
    }
  } catch (e) {
    console.log(e);
    return res.status(409).json({
      error: e,
    });
  }
};

exports.getMyPost = async (req, res) => {
  try {
    var getAllMyPost = await postModel.find({ user_id: req.userId });
    if (getAllMyPost != null) {
      return res.status(200).json({
        message: "get My Posts",
        data: getAllMyPost,
      });
    } else {
      return res.status(200).json({
        message: "No Any Post",
        data: getAllMyPost,
      });
    }
  } catch (e) {
    return res.status(200).json({
      message: "Error",
      data: e,
    });
  }
};

exports.getAllUser = async (req, res) => {
  try {
    var getAllMyUser = await userModel.find({});
    if (getAllMyUser != null) {
      return res.status(200).json({
        message: "get All users",
        data: getAllMyUser,
      });
    } else {
      return res.status(200).json({
        message: "No Any Users",
      });
    }
  } catch (e) {
    return res.status(409).json({
      error: e,
    });
  }
};
