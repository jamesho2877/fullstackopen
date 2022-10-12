const { NODE_ENV } = process.env;

const info = (...params) => {
  if (NODE_ENV === "test") return;
  console.log(...params);
};

const error = (...params) => {
  if (NODE_ENV === "test") return;
  console.error(...params);
};

module.exports = {
  info,
  error,
};
