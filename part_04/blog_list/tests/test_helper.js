const bcrypt = require("bcrypt");

const Blog = require("../models/blog");
const User = require("../models/user");

const initialData = [
  {
    name: "Adam",
    username: "adam_username",
    password: "adam_password",
    blogs: [
      {
        author: "Adam",
        title: "Blog 1",
        url: "/adam/blog_1",
        likes: 7,
      },
    ]
  },
  {
    name: "Sarah",
    username: "sarah_username",
    password: "sarah_password",
    blogs: [
      {
        author: "Sarah",
        title: "Blog 2",
        url: "/sarah/blog_2",
        likes: 3,
      },
      {
        author: "Sarah",
        title: "Blog 3",
        url: "/sarah/blog_3",
        likes: 9,
      },
      {
        author: "Sarah",
        title: "Blog 4",
        url: "/sarah/blog_4",
        likes: 35,
      },
      {
        author: "Sarah",
        title: "Blog 5",
        url: "/sarah/blog_5",
        likes: 5,
      },
    ]
  },
  {
    name: "Peter",
    username: "peter_username",
    password: "peter_password",
    blogs: [],
  },
  {
    name: "Helen",
    username: "helen_username",
    password: "helen_password",
    blogs: [
      {
        author: "Helen",
        title: "Blog 6",
        url: "/helen/blog_6",
        likes: 20,
      },
      {
        author: "Helen",
        title: "Blog 7",
        url: "/helen/blog_7",
        likes: 4,
      },
      {
        author: "Helen",
        title: "Blog 8",
        url: "/helen/blog_8",
        likes: 0,
      },
    ]
  },
];

const nonExistingId = async () => {
  const blog = new Blog({ name: "willremovethissoon", number: "012-345678" });
  await blog.save();
  await blog.remove();

  return blog._id.toString();
};

const blogsInDb = async (conditions) => {
  if (conditions) {
    return Blog.findOne(conditions);
  }

  return Blog.find({});
};

const usersInDb = async (conditions) => {
  if (conditions) {
    return User.findOne(conditions);
  }

  return User.find({});
};

const saveUserToDb = async (userInfo, salt = 10) => {
  const passwordHash = await bcrypt.hash(userInfo.password, salt);
  const user = new User({
    name: userInfo.name,
    username: userInfo.username,
    passwordHash: passwordHash,
  });
  return user.save();
};

const saveBlogToDb = async (blogInfo, user) => {
  const newBlog = new Blog({
    author: blogInfo.author,
    title: blogInfo.title,
    url: blogInfo.url,
    likes: blogInfo.likes,
    user: user._id,
  });
  return newBlog.save();
};

module.exports = {
  initialData,
  nonExistingId,
  blogsInDb,
  usersInDb,
  saveUserToDb,
  saveBlogToDb,
};
