require("dotenv").config({ path: "./.env.local" });

const {
  PORT,
  NODE_ENV,
  MONGODB_URI,
  TEST_MONGODB_URI,
} = process.env;

module.exports = {
  MONGODB_URI: NODE_ENV === "test" ? TEST_MONGODB_URI : MONGODB_URI,
  NODE_ENV,
  PORT,
};
