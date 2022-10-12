const mongoose = require("mongoose");
const autopopulate = require("mongoose-autopopulate");

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    autopopulate: true,
  },
  author: {
    type: String,
    required: false,
    autopopulate: true,
  },
  url: {
    type: String,
    required: true,
    autopopulate: true,
  },
  likes: {
    type: Number,
    required: false,
    default: 0,
    autopopulate: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    autopopulate: true,
  },
});

blogSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

blogSchema.plugin(autopopulate);

module.exports = mongoose.model("Blog", blogSchema);
