var express = require("express");
var router = express.Router();

const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date(),
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date(),
  },
];
/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Mini Messageboard", messages: messages });
});

router.get("/new", (req, res, next) => {
  res.render("form");
});

router.post("/new", function (req, res, next) {
  const message = {
    text: req.body.title,
    user: req.body.username,
    added: new Date(),
  };
  messages.unshift(message);
  res.redirect("/");
});

module.exports = router;
