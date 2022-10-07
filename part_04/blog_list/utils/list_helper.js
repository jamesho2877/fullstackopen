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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
