const mongoose = require("mongoose");
const autopopulate = require("mongoose-autopopulate");

const commentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    autopopulate: true,
  },
  blog: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Blog",
    autopopulate: false,
  },
});

commentSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.blog;
  },
});

commentSchema.plugin(autopopulate);

module.exports = mongoose.model("Comment", commentSchema);
