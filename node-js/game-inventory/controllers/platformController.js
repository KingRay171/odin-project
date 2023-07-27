const Genre = require("../models/genre");
const Platform = require("../models/platform");
const Game = require("../models/game");
const Rating = require("../models/rating");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.all = asyncHandler(async (req, res, next) => {
  const platforms = await Platform.find().exec();
  res.render("platform_list", { platform_list: platforms });
});

exports.create_get = (req, res, next) => {
  res.render("platform_form", { title: "Create Platform" });
};

exports.create_post = [
  // Validate and sanitize fields.
  body("name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Name must be specified."),
  body("description")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("There must be a description."),
  body("price", "Invalid price")
    .toFloat()
    .isNumeric()
    .withMessage("Price must be a number"),
  body("stock")
    .toInt()
    .isInt({ min: 0, max: 9999 })
    .withMessage("Stock must be between 0 and 9999"),

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create Author object with escaped and trimmed data
    const platform = new Platform({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      stock: req.body.stock,
    });

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/errors messages.
      res.render("platform_form", {
        title: "Create Platform",
        platform: platform,
        errors: errors.array(),
      });
      return;
    } else {
      // Data from form is valid.

      // Save author.
      await platform.save();
      // Redirect to new author record.
      res.redirect(platform.url);
    }
  }),
];

exports.detail = asyncHandler(async (req, res, next) => {
  const [platform, gamesInPlatform] = await Promise.all([
    Platform.findById(req.params.id).exec(),
    Game.find({ platform: req.params.id }, "name description").exec(),
  ]);
  if (platform === null) {
    // No results.
    const err = new Error("Genre not found");
    err.status = 404;
    return next(err);
  }

  res.render("platform_detail", {
    title: "Platform Detail",
    platform: platform,
    platform_games: gamesInPlatform,
  });
});

exports.update_get = asyncHandler(async (req, res, next) => {
  const platform = await Platform.findById(req.params.id).exec();
  res.render("platform_form", { title: "Update Platform", platform: platform });
});

exports.update_post = [
  // Validate and sanitize the name field.
  body("name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Name must be specified."),
  body("description")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("There must be a description."),
  body("price", "Invalid price")
    .toFloat()
    .isNumeric()
    .withMessage("Price must be a number"),
  body("stock")
    .toInt()
    .isInt({ min: 0, max: 9999 })
    .withMessage("Stock must be between 0 and 9999"),

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a genre object with escaped and trimmed data.
    const platform = new Platform({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      stock: req.body.stock,
      _id: req.params.id,
    });

    if (!errors.isEmpty()) {
      // There are errors. Render the form again with sanitized values/error messages.
      res.render("platform_form", {
        title: "Update Platform",
        platform: platform,
        errors: errors.array(),
      });
      return;
    } else {
      const theplatform = await Platform.findByIdAndUpdate(
        req.params.id,
        platform,
        {}
      );
      // New genre saved. Redirect to genre detail page.
      res.redirect(theplatform.url);
    }
  }),
];

exports.delete_get = asyncHandler(async (req, res, next) => {
  // Get details of author and all their books (in parallel)
  const platform = await Platform.findById(req.params.id).exec();

  if (platform === null) {
    // No results.
    res.redirect("/catalog/platforms");
  }

  res.render("platform_delete", {
    title: "Delete Platform",
    platform,
  });
});

// Handle BookInstance delete on POST.
exports.delete_post = asyncHandler(async (req, res, next) => {
  await Platform.findByIdAndRemove(req.body.instid);
  res.redirect("/catalog/platforms");
});
