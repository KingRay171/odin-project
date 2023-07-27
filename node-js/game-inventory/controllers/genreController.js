const Genre = require("../models/genre");
const Platform = require("../models/platform");
const Game = require("../models/game");
const Rating = require("../models/rating");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.all = asyncHandler(async (req, res, next) => {
  const genres = await Genre.find().exec();
  res.render("genre_list", { genre_list: genres });
});

exports.create_get = (req, res, next) => {
  res.render("genre_form", { title: "Create Genre" });
};

exports.create_post = [
  // Validate and sanitize fields.
  body("name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Name must be specified."),

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    const genre = new Genre({
      name: req.body.name,
    });

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/errors messages.
      res.render("genre_form", {
        title: "Create Genre",
        genre: genre,
        errors: errors.array(),
      });
      return;
    } else {
      // Data from form is valid.

      // Save author.
      await genre.save();
      // Redirect to new author record.
      res.redirect(genre.url);
    }
  }),
];

exports.detail = asyncHandler(async (req, res, next) => {
  const [genre, gamesInGenre] = await Promise.all([
    Genre.findById(req.params.id).exec(),
    Game.find({ genre: req.params.id }, "name description").exec(),
  ]);
  if (genre === null) {
    // No results.
    const err = new Error("Genre not found");
    err.status = 404;
    return next(err);
  }

  res.render("genre_detail", {
    title: "Genre Detail",
    genre: genre,
    genre_games: gamesInGenre,
  });
});

exports.update_get = asyncHandler(async (req, res, next) => {
  const genre = await Genre.findById(req.params.id).exec();
  res.render("genre_form", { title: "Update Genre", genre: genre });
});

exports.update_post = [
  // Validate and sanitize the name field.
  body("name", "Genre name must contain at least 3 characters")
    .trim()
    .isLength({ min: 3 })
    .escape(),

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a genre object with escaped and trimmed data.
    const genre = new Genre({ name: req.body.name, _id: req.params.id });

    if (!errors.isEmpty()) {
      // There are errors. Render the form again with sanitized values/error messages.
      res.render("genre_form", {
        title: "Update Genre",
        genre: genre,
        errors: errors.array(),
      });
      return;
    } else {
      // Data from form is valid.
      // Check if Genre with same name already exists.
      const genreExists = await Genre.findOne({ name: req.body.name }).exec();
      if (genreExists) {
        // Genre exists, redirect to its detail page.
        res.redirect(genreExists.url);
      } else {
        const thegenre = await Genre.findByIdAndUpdate(
          req.params.id,
          genre,
          {}
        );
        // New genre saved. Redirect to genre detail page.
        res.redirect(thegenre.url);
      }
    }
  }),
];

exports.delete_get = asyncHandler(async (req, res, next) => {
  // Get details of author and all their books (in parallel)
  const genre = await Genre.findById(req.params.id).exec();

  if (genre === null) {
    // No results.
    res.redirect("/catalog/genres");
  }

  res.render("genre_delete", {
    title: "Delete Genre",
    genre,
  });
});

// Handle BookInstance delete on POST.
exports.delete_post = asyncHandler(async (req, res, next) => {
  await Genre.findByIdAndRemove(req.body.instid);
  res.redirect("/catalog/genres");
});
