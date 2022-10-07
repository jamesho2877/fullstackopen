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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
};
