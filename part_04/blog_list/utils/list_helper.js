const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((acc, blog) => acc+blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  return blogs.reduce((acc, blog) => {
    const maxLikes = acc?.likes || 0;
    if (blog.likes > maxLikes) acc = blog;
    return acc;
  }, undefined);
};

const mostBlogs = (blogs) => {
  const blogMap = blogs.reduce((acc, blog) => {
    const pastBlog = acc[blog.author] || 0;
    acc[blog.author] = pastBlog + 1;
    return acc;
  }, {});

  const mostBlog = Object.entries(blogMap).sort(([authorA, blogsA], [authorB, blogsB]) => blogsB - blogsA)[0];

  if (!mostBlog) return;
  return {
    author: mostBlog[0],
    blogs: mostBlog[1],
  };
};

const mostLikes = (blogs) => {
  const blogMap = blogs.reduce((acc, blog) => {
    const pastLikes = acc[blog.author] || 0;
    acc[blog.author] = pastLikes + blog.likes;
    return acc;
  }, {});

  const mostLikedBlog = Object.entries(blogMap).sort(([authorA, likesA], [authorB, likesB]) => likesB - likesA)[0];

  if (!mostLikedBlog) return;
  return {
    author: mostLikedBlog[0],
    likes: mostLikedBlog[1],
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
