import axios from "axios";
const baseUrl = "/api/users";

const config = {
  headers: {
    Authorization: null,
  },
};

const setToken = (newToken) => {
  config.headers["Authorization"] = `Bearer ${newToken}`;
};

const getAllItems = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

export default {
  setToken: setToken,
  getAll: getAllItems,
};
