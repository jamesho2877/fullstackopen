import axios from "axios";
const baseUrl = "/api/blogs";

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

const createItem = async (newObject) => {
  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const updateItem = async (id, newObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObject, config);
  return response.data;
};

const deleteItem = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response.data;
};

export default {
  setToken: setToken,
  getAll: getAllItems,
  create: createItem,
  update: updateItem,
  delete: deleteItem,
};
