const jwt = require("jsonwebtoken");
const passport = require("passport");
const { body, validationResult } = require("express-validator");
const hash = require("bcryptjs").hash;
const User = require("../models/user");
const MongoClient = require("mongodb").MongoClient;

exports.login = async (req, res, next) => {
  passport.authenticate("login", async (err, user, info) => {
    try {
      if (err || !user) {
        const error = new Error("An error occurred.");

        return next(error);
      }

      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);

        const body = { _id: user._id, username: user.username };
        const token = jwt.sign({ user: body }, process.env.SECRET_KEY, {
          expiresIn: "1d",
        });

        return res.json({ token });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
};

exports.signUp = [
  body("username", "Username should be at least six characters!")
    .trim()
    .isLength({ min: 6 })
    .escape(),
  body("password", "Password should be at least six characters!")
    .trim()
    .isLength({ min: 6 })
    .escape(),
  async (req, res, next) => {
    const { username, password, secret } = req.body;
    console.log(req.body);
    //Validate
    if (!username || !password) {
      res.status(422).json({ message: "Invalid Data" });
      return;
    }
    //Connect with database
    const client = await MongoClient.connect(process.env.DB_URL);
    const db = client.db();
    //Check existing
    const checkExisting = await db.collection("users").findOne({ username });
    //Send error response if duplicate user is found
    if (checkExisting) {
      res.status(422).json({ message: "User already exists" });
      client.close();
      return;
    }
    //Hash password
    const status = await db.collection("users").insertOne({
      username,
      password: await hash(password, 12),
      admin: false,
      posts: [],
      comments: [],
    });
    //Send success response
    res.status(201).json({
      message: "User created",
      username,
      token: jwt.sign(
        { user: { _id: status.insertedId, username } },
        process.env.SECRET_KEY,
        {
          expiresIn: "1d",
        }
      ),
    });
    //Close DB connection
    client.close();
  },
];
