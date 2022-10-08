const jwt = require("jsonwebtoken");
const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

const { SECRET } = process.env;


const getTokenFrom = (request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    return authorization.substring(7);
  }
  return null;
};

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
  });
  response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  const token = getTokenFrom(request);
  const decodedToken = jwt.verify(token, SECRET);
  console.log("decodedToken", decodedToken);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token is missing or invalid" });
  }

  const user = await User.findById(decodedToken.id);
  const blog = new Blog({ ...request.body, user: user._id });
  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  response.status(201).json(savedBlog);
});

blogsRouter.delete("/:id", async (request, response) => {
  const id = request.params.id;

  const deletedBlog = await Blog.findByIdAndDelete(id);
  response.status(204).end();
});

blogsRouter.put("/:id", async (request, response) => {
  const id = request.params.id;
  const { likes } = request.body || {};

  const updatedPerson = await Blog.findByIdAndUpdate(
    id,
    { likes },
    {
      returnDocument: "after",
      new: true,
      runValidators: true,
      context: "query",
    }
  );
  
  response.json(updatedPerson);
});

module.exports = blogsRouter;
