const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const GameSchema = new Schema({
  name: { type: String, required: true },
  platforms: [{ type: Schema.Types.ObjectId, ref: "Platform", required: true }],
  description: { type: String, required: true },
  rating: { type: Schema.Types.ObjectId, ref: "Rating", required: true },
  genre: [{ type: Schema.Types.ObjectId, ref: "Genre" }],
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
});

// Virtual for book's URL
GameSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/catalog/game/${this._id}`;
});

// Export model
module.exports = mongoose.model("Game", GameSchema);
