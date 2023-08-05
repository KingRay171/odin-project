var express = require("express");
var router = express.Router();
var postController = require("../controllers/postController");
var authController = require("../controllers/authController");
var commentController = require("../controllers/commentController");

/* GET home page. */
router.post("/login", authController.login);
router.post("/signup", authController.signUp);

router.post("/posts", postController.all);
router.post("/posts/new", postController.create);
router.post("/posts/:id", postController.readOne);
router.delete("/posts/:id", postController.delete);
router.post("/posts/:id/edit", postController.update_get);
router.put("/posts/:id/edit", postController.update);
router.post("/posts/:id/comment", postController.addComment);
router.post("/comments", commentController.allUser);
module.exports = router;
