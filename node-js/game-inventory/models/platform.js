const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PlatformSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
});

PlatformSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/catalog/platform/${this._id}`;
});

module.exports = mongoose.model("Platform", PlatformSchema);
