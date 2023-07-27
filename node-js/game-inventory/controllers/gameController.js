const Genre = require("../models/genre");
const Platform = require("../models/platform");
const Game = require("../models/game");
const Rating = require("../models/rating");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.index = asyncHandler(async (req, res, next) => {
  const [numGames, numGenres, numPlatforms] = await Promise.all([
    Game.countDocuments({}).exec(),
    Genre.countDocuments({}).exec(),
    Platform.countDocuments({}).exec(),
  ]);

  res.render("index", {
    title: "Game Inventory Home",
    game_count: numGames,
    genre_count: numGenres,
    platform_count: numPlatforms,
  });
});

exports.all = asyncHandler(async (req, res, next) => {
  const games = await Game.find().populate("genre").populate("rating").exec();
  res.render("game_list", { game_list: games });
});

exports.create_get = asyncHandler(async (req, res, next) => {
  // Get all authors and genres, which we can use for adding to our book.
  const [genres, platforms, ratings] = await Promise.all([
    Genre.find().exec(),
    Platform.find().exec(),
    Rating.find().exec(),
  ]);

  res.render("game_form", {
    title: "Create Game",
    genres: genres,
    platforms: platforms,
    ratings: ratings,
  });
});

// Handle book create on POST.
exports.create_post = [
  // Convert the genre to an array.
  (req, res, next) => {
    if (!(req.body.genre instanceof Array)) {
      if (typeof req.body.genre === "undefined") req.body.genre = [];
      else req.body.genre = new Array(req.body.genre);
    }
    next();
  },

  (req, res, next) => {
    if (!(req.body.platform instanceof Array)) {
      if (typeof req.body.platform === "undefined") req.body.platform = [];
      else req.body.platform = new Array(req.body.platform);
    }
    next();
  },

  // Validate and sanitize fields.
  body("name", "Name must not be empty.").trim().isLength({ min: 1 }).escape(),
  body("rating", "Rating must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("description", "Description must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("genre.*", "Genre must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("platform.*").escape(),
  body("price").escape(),
  body("stock").escape(),
  // Process request after validation and sanitization.

  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a Book object with escaped and trimmed data.
    const game = new Game({
      name: req.body.name,
      rating: req.body.rating,
      description: req.body.description,
      genre: req.body.genre,
      platform: req.body.platform,
      price: req.body.price,
      stock: req.body.stock,
    });

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/error messages.

      // Get all authors and genres for form.

      const [allPlatforms, allGenres, allRatings] = await Promise.all([
        Platform.find().exec(),
        Genre.find().exec(),
        Rating.find().exec(),
      ]);

      // Mark our selected genres as checked.
      for (const genre of allGenres) {
        if (game.genre.indexOf(genre._id) > -1) {
          genre.checked = "true";
        }
      }

      for (const platform of allPlatforms) {
        if (game.platforms.indexOf(platform._id) > -1) {
          platform.checked = "true";
        }
      }
      res.render("game_form", {
        title: "Create Game",
        platforms: allPlatforms,
        genres: allGenres,
        ratings: allRatings,
        game: game,
        errors: errors.array(),
      });
    } else {
      // Data from form is valid. Save book.
      await game.save();
      res.redirect(game.url);
    }
  }),
];

exports.detail = asyncHandler(async (req, res, next) => {
  const game = await Game.findById(req.params.id)
    .populate("platforms")
    .populate("rating")
    .populate("genre")
    .exec();
  if (game === null) {
    // No results.
    const err = new Error("Game not found");
    err.status = 404;
    return next(err);
  }

  res.render("game_detail", {
    title: "Game Detail",
    game: game,
  });
});

exports.update_get = asyncHandler(async (req, res, next) => {
  const [game, ratings, genres, platforms] = await Promise.all([
    Game.findById(req.params.id)
      .populate("platforms")
      .populate("rating")
      .populate("genre")
      .exec(),
    Rating.find().exec(),
    Genre.find().exec(),
    Platform.find().exec(),
  ]);

  for (const platform of platforms) {
    for (const game_p of game.platforms) {
      if (platform._id.toString() === game_p._id.toString()) {
        platform.checked = "true";
      }
    }
  }

  for (const genre of genres) {
    for (const game_g of game.genre) {
      if (genre._id.toString() === game_g._id.toString()) {
        genre.checked = "true";
      }
    }
  }

  res.render("game_form", {
    title: "Update Game",
    game: game,
    platforms,
    genres,
    ratings,
  });
});

exports.update_post = [
  // Validate and sanitize the name field.
  body("name", "Name must not be empty.").trim().isLength({ min: 1 }).escape(),
  body("rating", "Rating must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("description", "Description must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("genre.*", "Genre must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("platform.*").escape(),
  body("price").escape(),
  body("stock").escape(),

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a genre object with escaped and trimmed data.
    const game = new Game({
      name: req.body.name,
      rating: req.body.rating,
      description: req.body.description,
      genre: req.body.genre,
      platform: req.body.platform,
      price: req.body.price,
      stock: req.body.stock,
      _id: req.params.id,
    });

    if (!errors.isEmpty()) {
      // There are errors. Render the form again with sanitized values/error messages.
      res.render("game_form", {
        title: "Update Game",
        game: game,
        errors: errors.array(),
      });
      return;
    } else {
      const thegame = await Game.findByIdAndUpdate(req.params.id, game, {});
      // New genre saved. Redirect to genre detail page.
      res.redirect(thegame.url);
    }
  }),
];

exports.delete_get = asyncHandler(async (req, res, next) => {
  // Get details of author and all their books (in parallel)
  const game = await Game.findById(req.params.id).exec();

  if (game === null) {
    // No results.
    res.redirect("/catalog/games");
  }

  res.render("game_delete", {
    title: "Delete Game",
    game,
  });
});

// Handle BookInstance delete on POST.
exports.delete_post = asyncHandler(async (req, res, next) => {
  await Game.findByIdAndRemove(req.body.instid);
  res.redirect("/catalog/games");
});
