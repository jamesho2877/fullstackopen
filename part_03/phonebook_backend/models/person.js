const mongoose = require("mongoose");

const { MONGODB_URI } = process.env;

console.log("connecting to", MONGODB_URI);

mongoose
  .connect(MONGODB_URI)
  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
  },
  number: {
    type: String,
    minLength: 8,
    validate: {
      validator: (v) => /^\d{2,3}-\d{6,}$/.test(v),
      message: (props) => `${props.value} does not have a valid format. It needs to be in the format similar to 09-1234556 or 040-22334455`
    },
    required: [true, "User phone number required"]
  },
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Person", personSchema);
