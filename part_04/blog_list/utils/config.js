require("dotenv").config({ path: "./.env.local" });

const { MONGODB_URI, PORT } = process.env;

module.exports = {
  MONGODB_URI,
  PORT,
};
