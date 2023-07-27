const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const RatingSchema = new Schema({
  name: { type: String, required: true, minLength: 3, maxLength: 100 },
});

RatingSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/catalog/rating/${this._id}`;
});

module.exports = mongoose.model("Rating", RatingSchema);
