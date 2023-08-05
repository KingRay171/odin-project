const { body, validationResult } = require("express-validator");
const Post = require("../models/post");
const User = require("../models/user");
const Comment = require("../models/comment");
const jwt = require("jsonwebtoken");

exports.allUser = async function (req, res, next) {
  try {
    const decode = jwt.verify(req.body.token, process.env.SECRET_KEY);
    const poster = await User.findOne({ username: decode.user.username });
    let comments = await Comment.find({ poster }).populate("poster", "post");
    return res.status(200).json(comments);
  } catch (e) {
    return res.status(200).json({ message: "No comments" });
  }
};
