const { body, validationResult } = require("express-validator");
const Post = require("../models/post");
const User = require("../models/user");
const Comment = require("../models/comment");
const jwt = require("jsonwebtoken");

exports.all = async function (req, res, next) {
  try {
    const decode = jwt.verify(req.body.token, process.env.SECRET_KEY);
    let posts = await Post.find({}).populate("poster", "username");
    console.log(posts);
    return res.status(200).json(posts);
  } catch (e) {
    return res.status(200).json({ message: "No posts" });
  }
};

exports.create = [
  body("title").escape(),
  body("content").escape(),
  async function (req, res, next) {
    try {
      const decode = jwt.verify(req.body.token, process.env.SECRET_KEY);
      await Post.create({
        title: req.body.title,
        content: req.body.content,
        poster: await User.findById(decode.user._id),
        comments: [],
        timeStamp: new Date(),
        likeCount: 0,
        likes: [],
      });
      return res.status(200).json({ message: "Create operation successful" });
    } catch (e) {
      return res.status(200).json({ message: "Create operation failed" });
    }
  },
];

exports.delete = async function (req, res, next) {
  try {
    await Post.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "Delete operation successful" });
  } catch (e) {
    return res.status(200).json({ message: "Create operation failed" });
  }
};

exports.update_get = async function (req, res, next) {
  try {
    jwt.verify(req.body.token, process.env.SECRET_KEY);
    const post = await Post.findById(req.params.id);
    return res.status(200).json({ title: post.title, content: post.content });
  } catch (e) {
    return res.status(200).json({ message: "Retrieval failed" });
  }
};

exports.update = [
  body("title").escape(),
  body("content").escape(),
  async function (req, res, next) {
    try {
      const oldPost = await Post.findById(req.params.id);
      const newPost = new Post({
        title: req.body.title,
        content: req.body.content,
        poster: oldPost.poster,
        comments: oldPost.comments,
        timeStamp: oldPost.timeStamp,
        likeCount: oldPost.likeCount,
        likes: oldPost.likes,
        _id: req.params.id,
      });
      await Post.findByIdAndUpdate(req.params.id, newPost, {});
      return res.status(200).json({ message: "Update successful" });
    } catch (e) {
      return res.status(200).json({ message: "Update failed" });
    }
  },
];

exports.readOne = async function (req, res, next) {
  try {
    jwt.verify(req.body.token, process.env.SECRET_KEY);
    const post = await Post.findById(req.params.id)
      .populate("comments")
      .populate({
        path: "comments",
        populate: {
          path: "poster",
          model: "User",
        },
      })
      .populate("likes");
    return res.status(200).json(post);
  } catch (e) {
    return res.status(200).json({ message: "Retrieval failed" });
  }
};

exports.addComment = [
  body("comment").escape(),
  async function (req, res, next) {
    try {
      const decode = jwt.verify(req.body.token, process.env.SECRET_KEY);
      const [user, post] = await Promise.all([
        User.findOne({ username: decode.user.username }).populate("comments"),
        Post.findById(req.params.id).populate("comments"),
      ]);
      const comment = await Comment.create({
        content: req.body.comment,
        poster: user,
        post,
        timeStamp: new Date(),
        likeCount: 0,
        likes: [],
      });

      post.comments.push(comment);
      user.comments.push(comment);
      post.save();
      user.save();
      comment.save();
      return res.status(200).json({ message: "Create operation successful" });
    } catch (e) {
      return res.status(200).json({ message: "Create operation failed" });
    }
  },
];
