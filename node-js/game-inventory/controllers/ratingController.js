const Genre = require("../models/genre");
const Platform = require("../models/platform");
const Game = require("../models/game");
const Rating = require("../models/rating");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.all = asyncHandler(async (req, res, next) => {
  const ratings = await Rating.find().exec();
  res.render("rating_list", { rating_list: ratings });
});

exports.create_get = (req, res, next) => {
  res.render("rating_form", { title: "Create Rating" });
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

    const rating = new Rating({
      name: req.body.name,
    });

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/errors messages.
      res.render("rating_form", {
        title: "Create Rating",
        rating: rating,
        errors: errors.array(),
      });
      return;
    } else {
      // Data from form is valid.

      // Save author.
      await rating.save();
      // Redirect to new author record.
      res.redirect(rating.url);
    }
  }),
];

exports.detail = asyncHandler(async (req, res, next) => {
  const [rating, gamesInRating] = await Promise.all([
    Rating.findById(req.params.id).exec(),
    Game.find({ rating: req.params.id }, "name description").exec(),
  ]);
  if (rating === null) {
    // No results.
    const err = new Error("Genre not found");
    err.status = 404;
    return next(err);
  }

  res.render("rating_detail", {
    title: "Rating Detail",
    rating: rating,
    rating_games: gamesInRating,
  });
});

exports.update_get = asyncHandler(async (req, res, next) => {
  const rating = await Rating.findById(req.params.id).exec();
  res.render("rating_form", { title: "Update Rating", rating: rating });
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
    const rating = new Rating({ name: req.body.name, _id: req.params.id });

    if (!errors.isEmpty()) {
      // There are errors. Render the form again with sanitized values/error messages.
      res.render("rating_form", {
        title: "Update Rating",
        rating: rating,
        errors: errors.array(),
      });
      return;
    } else {
      // Data from form is valid.
      // Check if Genre with same name already exists.
      const ratingExists = await Rating.findOne({ name: req.body.name }).exec();
      if (ratingExists) {
        // Genre exists, redirect to its detail page.
        res.redirect(ratingExists.url);
      } else {
        const therating = await Rating.findByIdAndUpdate(
          req.params.id,
          rating,
          {}
        );
        // New genre saved. Redirect to genre detail page.
        res.redirect(therating.url);
      }
    }
  }),
];

exports.delete_get = asyncHandler(async (req, res, next) => {
  // Get details of author and all their books (in parallel)
  const rating = await Rating.findById(req.params.id).exec();

  if (rating === null) {
    // No results.
    res.redirect("/catalog/ratings");
  }

  res.render("rating_delete", {
    title: "Delete Rating",
    rating,
  });
});

// Handle BookInstance delete on POST.
exports.delete_post = asyncHandler(async (req, res, next) => {
  await Rating.findByIdAndRemove(req.body.instid);
  res.redirect("/catalog/ratings");
});
