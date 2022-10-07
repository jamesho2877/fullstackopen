const mongoose = require("mongoose");
const supertest = require("supertest");
const helper = require("./test_helper");
const app = require("../app");
const api = supertest(app);

const Blog = require("../models/blog");

beforeEach(async () => {
  await Blog.deleteMany({});

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog);
    await blogObject.save();
  }
});

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("all blogs are returned", async () => {
  const response = await api.get("/api/blogs");
  expect(response.body).toHaveLength(helper.initialBlogs.length);
});

test("all blogs should have id property", async () => {
  const response = await api.get("/api/blogs");
  const blogs = response.body.filter((blog) => blog.id);
  expect(blogs).toHaveLength(response.body.length);
});

test("a valid blog can be added", async () => {
  const newBlog = {
    title: "Steve Jobs",
    author: "Walter Isaacson",
    url: "https://en.wikipedia.org/wiki/Steve_Jobs_(book)",
    likes: 13,
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const allBlogs = await helper.blogsInDb();
  expect(allBlogs).toHaveLength(helper.initialBlogs.length + 1);

  const contents = allBlogs.map((blog) => blog.author);
  expect(contents).toContain("Walter Isaacson");
});

test("blog's likes property is 0 if not given", async () => {
  const newBlog = {
    title: "Steve Jobs",
    author: "Walter Isaacson",
    url: "https://en.wikipedia.org/wiki/Steve_Jobs_(book)",
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blog = await helper.blogsInDb("title", "Steve Jobs");
  expect(blog.likes).toBeDefined();
  expect(blog.likes).toEqual(0);
});

afterAll(() => {
  mongoose.connection.close();
});
