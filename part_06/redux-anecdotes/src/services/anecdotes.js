import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createNew = async (anecdoteContent) => {
  const anecdoteObj = {
    content: anecdoteContent || "",
    votes: 0,
  };
  const response = await axios.post(baseUrl, anecdoteObj);
  return response.data;
};

const update = async (newAnecdoteObj) => {
  const response = await axios.put(`${baseUrl}/${newAnecdoteObj.id}`, newAnecdoteObj);
  return response.data;
};

export default { getAll, createNew, update };
