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

describe("when there is initially some blogs saved", () => {
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

  test("a specific blog is within the returned blogs", async () => {
    const response = await api.get("/api/blogs");
    const contents = response.body.map((blog) => blog.title);
    expect(contents).toContain("Canonical string reduction");
  });

  test("all blogs should have id property", async () => {
    const response = await api.get("/api/blogs");
    const blogs = response.body.filter((blog) => blog.id);
    expect(blogs).toHaveLength(response.body.length);
  });
});

describe("addition of a new blog", () => {
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
  
  test("error code of 400 is returned if title is missing", async () => {
    const newBlog = {
      author: "Walter Isaacson",
      url: "https://en.wikipedia.org/wiki/Steve_Jobs_(book)",
    };
  
    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(400);
  });
  
  test("error code of 400 is returned if url is missing", async () => {
    const newBlog = {
      title: "Steve Jobs",
      author: "Walter Isaacson",
    };
  
    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(400);
  });
  
  test("error code of 400 is returned if both title and url are missing", async () => {
    const newBlog = {
      author: "Walter Isaacson",
      likes: 13,
    };
  
    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(400);
  });
});

describe("deletion of a blog", () => {
  test("succeeds with status code 204 if id is valid", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1);

    const titles = blogsAtEnd.map((r) => r.title);
    expect(titles).not.toContain(blogToDelete.title);
  });
});

describe("amendment of a blog", () => {
  test("likes is changed after updated", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToUpdate = blogsAtStart[0];

    const newLikes = 5;
    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send({ likes: newLikes })
      .expect(200);

    const updatedBlog = await helper.blogsInDb("id", blogToUpdate.id);
    expect(updatedBlog.likes).toEqual(newLikes);
    expect(updatedBlog.likes).not.toEqual(blogToUpdate.likes);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
