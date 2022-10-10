const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const middleware = require("../utils/middleware");


blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});


blogsRouter.use(middleware.auth);


blogsRouter.post("/", async (request, response) => {
  const user = await User.findById(request.userId);
  const blog = new Blog({ ...request.body, user: user._id });
  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  response.status(201).json(savedBlog);
});

blogsRouter.delete("/:id", async (request, response) => {
  const blogId = request.params.id;

  const blog = await Blog.findOne({ _id: blogId, user: { _id: request.userId } });
  if (!blog) {
    return response.status(400).json({
      error: `blog ${blogId} is not existed`,
    });
  }

  if (blog.user._id.toString() !== request.userId) {
    return response.status(403).json({
      error: "permisson denied",
    });
  }

  // delete blog
  const deletedBlog = await Blog.findByIdAndDelete(blogId);

  // update blog's reference on user
  const user = await User.findById(request.userId);
  user.blogs.pull(deletedBlog._id);
  await user.save();

  response.status(204).end();
});

blogsRouter.put("/:id", async (request, response) => {
  const blogId = request.params.id;
  const { likes } = request.body || {};

  const blog = await Blog.findOne({ _id: blogId, user: { _id: request.userId } });
  if (!blog) {
    return response.status(400).json({
      error: `blog ${blogId} is not existed`,
    });
  }

  const updatedPerson = await Blog.findByIdAndUpdate(
    blogId,
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
