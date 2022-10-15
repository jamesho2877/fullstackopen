const mongoose = require("mongoose");
const supertest = require("supertest");
const helper = require("./test_helper");
const app = require("../app");
const api = supertest(app);

const Blog = require("../models/blog");
const User = require("../models/user");
const initialData = helper.initialData;

function series(promises) {
  if (!Array.isArray(promises)) {
    return Promise.reject(new Error('promises must be an array of promises'));
  }
  return promises.reduce((p1, p2) => p1.then(p2), Promise.resolve());
}

beforeEach(async () => {
  await Blog.deleteMany({});
  await User.deleteMany({});

  const userPromises = initialData.map(helper.saveUserToDb);
  await Promise.all(userPromises);

  const users = await helper.usersInDb();

  // save blogs
  const blogPromises = initialData.reduce((acc, { username, blogs }) => {
    const user = users.find((u) => u.username === username);
    return acc.concat(blogs.map((blog) => helper.saveBlogToDb(blog, user)));
  }, []);
  const blogs = await Promise.all(blogPromises);

  // group blogs by user
  const blogsByUser = blogs.reduce((acc, blog) => {
    const userId = blog.user.id.toString();
    const curList = acc[userId] || [];
    acc[userId] = curList.concat(blog);
    return acc;
  }, {});

  // assign blogs -> user
  const actionPromises = users.map(user => {
    const blogs = blogsByUser[user._id.toString()] || [];
    return User.updateOne({ _id: user._id }, {
      $push: {
        blogs: {
          $each: blogs,
        }
      }
    });
  });
  await Promise.all(actionPromises);
}, 10000);

describe("check blogs", () => {
  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("all blogs are returned", async () => {
    const noOfBlogsAtStart = initialData.reduce((acc, user) => acc + user.blogs.length, 0);
    const response = await api.get("/api/blogs");
    expect(response.body).toHaveLength(noOfBlogsAtStart);
  });

  test("some blogs are within the returned blogs", async () => {
    const response = await api.get("/api/blogs");
    const contents = response.body.map((blog) => blog.title);
    expect(contents).toContain("Blog 1");
    expect(contents).toContain("Blog 4");
    expect(contents).toContain("Blog 8");
  });

  test("all blogs should have id property", async () => {
    const response = await api.get("/api/blogs");
    const blogs = response.body.filter((blog) => blog.id);
    expect(blogs).toHaveLength(response.body.length);
  });
});

describe("user account registration", () => {
  let newUser;

  beforeEach(async () => {
    newUser = {
      username: "myusername",
      name: "John Smith",
      password: "mypassword",
    };
  });

  test("registration is returned as json", async () => {
    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);
  });

  test("valid registration with all provided details about user", async () => {
    const usersAtStart = await helper.usersInDb();

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).toContain(newUser.username);
  });

  test("invalid registration with missing username", async () => {
    delete newUser.username;

    await api
      .post("/api/users")
      .send(newUser)
      .expect(400);
  });

  test("invalid user account with a short username", async () => {
    newUser.username = "my";

    await api
      .post("/api/users")
      .send(newUser)
      .expect(400);
  });

  test("invalid user account with a missing password", async () => {
    delete newUser.password;

    await api
      .post("/api/users")
      .send(newUser)
      .expect(400);
  });

  test("invalid user account with a short password", async () => {
    newUser.password = "my";

    await api
      .post("/api/users")
      .send(newUser)
      .expect(400);
  });
});

describe("actions require authentication", () => {
  describe("user actions on his own blog posts", () => {
    let user;
    let newBlog;
    let accessToken;

    beforeEach(async () => {
      const firstUser = initialData[0];
  
      const loginRs = await api
        .post("/api/login")
        .send({
          username: firstUser.username,
          password: firstUser.password,
        });
      
      const userInfo = { ...loginRs.body };
      user = await helper.usersInDb({ username: userInfo.username });
      accessToken = userInfo.token;
  
      newBlog = {
        author: "Adam",
        title: "Blog 9",
        url: "/adam/blog_9",
        likes: 12,
      };
    });
  
    describe("addition of a new blog", () => {
      test("a valid blog can be added", async () => {
        const blogsAtStart = await helper.blogsInDb();

        await api
          .post("/api/blogs")
          .set("Authorization", `Bearer ${accessToken}`)
          .send(newBlog)
          .expect(201)
          .expect("Content-Type", /application\/json/);
      
        const blogsAtEnd = await helper.blogsInDb();
        expect(blogsAtEnd).toHaveLength(blogsAtStart.length + 1);
      
        const contents = blogsAtEnd.map((blog) => blog.title);
        expect(contents).toContain(newBlog.title);
      });
      
      test("blog's likes property is 0 if not given", async () => {
        delete newBlog.likes;
      
        await api
          .post("/api/blogs")
          .set("Authorization", `Bearer ${accessToken}`)
          .send(newBlog)
          .expect(201)
          .expect("Content-Type", /application\/json/);
      
        const blog = await helper.blogsInDb({ title: newBlog.title });
        expect(blog.likes).toBeDefined();
        expect(blog.likes).toEqual(0);
      });
      
      test("error code of 400 is returned if title is missing", async () => {
        delete newBlog.title;
  
        await api
          .post("/api/blogs")
          .set("Authorization", `Bearer ${accessToken}`)
          .send(newBlog)
          .expect(400)
          .expect("Content-Type", /application\/json/);
      });
      
      test("error code of 400 is returned if url is missing", async () => {
        delete newBlog.url;
      
        await api
          .post("/api/blogs")
          .set("Authorization", `Bearer ${accessToken}`)
          .send(newBlog)
          .expect(400)
          .expect("Content-Type", /application\/json/);
      });
      
      test("error code of 400 is returned if both title and url are missing", async () => {
        delete newBlog.title;
        delete newBlog.url;
      
        await api
          .post("/api/blogs")
          .set("Authorization", `Bearer ${accessToken}`)
          .send(newBlog)
          .expect(400)
          .expect("Content-Type", /application\/json/);
      });
    });

    describe("amendment of a blog post", () => {
      test("likes is changed after an update", async () => {
        const userAtStart = user;
        const blogsAtStart = userAtStart.blogs;
        const blogToUpdate = blogsAtStart[0];
    
        const newLikes = 5;
        await api
          .put(`/api/blogs/${blogToUpdate._id.toString()}`)
          .set("Authorization", `Bearer ${accessToken}`)
          .send({ likes: newLikes })
          .expect("Content-Type", /application\/json/)
          .expect(200);
    
        const updatedBlog = await helper.blogsInDb({
          _id: blogToUpdate.id,
          user: { _id: userAtStart.id }
        });
        expect(updatedBlog.likes).toEqual(newLikes);
        expect(updatedBlog.likes).not.toEqual(blogToUpdate.likes);
      });
    });
    
    describe("deletion of a blog post", () => {
      test("succeeds with status code 204 if blog post id is valid", async () => {
        const userAtStart = user;
        const blogsAtStart = userAtStart.blogs;
        const blogToDelete = blogsAtStart[0];
  
        await api
          .delete(`/api/blogs/${blogToDelete._id.toString()}`)
          .set("Authorization", `Bearer ${accessToken}`)
          .expect(204);
    
        const userAtEnd = await helper.usersInDb({ _id: user.id });
        const blogsAtEnd = userAtEnd.blogs;
        expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1);
    
        const titles = blogsAtEnd.map((r) => r.title);
        expect(titles).not.toContain(blogToDelete.title);
      });
    });
  });

  describe("user actions on other people's blog posts", () => {
    let firstUser, lastUser;
    let newBlog;
    let firstUserAccessToken;

    beforeEach(async () => {
      const firstUserInfo = initialData[0];
      const lastUserInfo = initialData[initialData.length - 1];

      firstUser = await helper.usersInDb({ username: firstUserInfo.username });
      lastUser = await helper.usersInDb({ username: lastUserInfo.username });
  
      const loginRs = await api
        .post("/api/login")
        .send({
          username: firstUserInfo.username,
          password: firstUserInfo.password,
        });
      
      firstUserAccessToken = loginRs.body.token;
  
      newBlog = {
        author: "Adam",
        title: "Blog 9",
        url: "/adam/blog_9",
        likes: 12,
      };
    });

    describe("amendment on another user's blog post", () => {
      test("blog post does not belong to user, likes cannot be updated, error code of 400 is returned", async () => {
        const newLikes = 5;
        await api
          .put(`/api/blogs/${lastUser.blogs[0]._id.toString()}`)
          .set("Authorization", `Bearer ${firstUserAccessToken}`)
          .send({ likes: newLikes })
          .expect("Content-Type", /application\/json/)
          .expect(400);
      });
    });
    
    describe("deletion on another user's blog post", () => {
      test("blog post does not belong to user, error code of 400 is returned", async () => {
        await api
          .delete(`/api/blogs/${lastUser.blogs[0]._id.toString()}`)
          .set("Authorization", `Bearer ${firstUserAccessToken}`)
          .expect("Content-Type", /application\/json/)
          .expect(400);
      });
    });
  });
});

afterAll(() => {
  mongoose.connection.close();
});
