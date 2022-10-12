const listHelper = require("../utils/list_helper");

test("dummy returns 1", () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

describe("total likes", () => {
  test("of empty list is zero", () => {
    const blogs = [];

    const result = listHelper.totalLikes(blogs);
    expect(result).toBe(0);
  });

  test("when list has only one blog equals the likes of that", () => {
    const blogs = [
      {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0,
      },
    ];

    const result = listHelper.totalLikes(blogs);
    expect(result).toBe(12);
  });

  test("of a bigger list is calculated right", () => {
    const blogs = [
      {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0,
      },
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0,
      },
      {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0,
      },
      {
        _id: "5a422b891b54a676234d17fa",
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
        __v: 0,
      },
      {
        _id: "5a422ba71b54a676234d17fb",
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
        __v: 0,
      },
      {
        _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
        __v: 0,
      },
    ];

    const result = listHelper.totalLikes(blogs);
    expect(result).toBe(36);
  });
});

describe("favorite blog", () => {
  test("in a list of none, is undefined", () => {
    const blogs = [];

    const result = listHelper.favoriteBlog(blogs);
    expect(result).toEqual(undefined);
  });

  test("in a list of solely one blog, is exactly itself", () => {
    const blogs = [
      {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        likes: 12,
      },
    ];

    const result = listHelper.favoriteBlog(blogs);
    expect(result).toEqual(blogs[0]);
  });

  test("in a list of two, where likes are the same, should be the first one", () => {
    const blogs = [
      {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        likes: 5,
      },
      {
        title: "First class tests",
        author: "Robert C. Martin",
        likes: 5,
      }
    ];

    const result = listHelper.favoriteBlog(blogs);
    expect(result).toEqual(blogs[0]);
  });

  test("in a list of many, should be the one with most likes", () => {
    const blogs = [
      {
        title: "React patterns",
        author: "Michael Chan",
        likes: 7,
      },
      {
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        likes: 5,
      },
      {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        likes: 12,
      },
      {
        title: "First class tests",
        author: "Robert C. Martin",
        likes: 10,
      },
      {
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        likes: 0,
      },
      {
        title: "Type wars",
        author: "Robert C. Martin",
        likes: 2,
      },
    ];

    const result = listHelper.favoriteBlog(blogs);
    expect(result).toEqual(blogs[2]);
  });
});

describe("most blogs", () => {
  test("in a list of none, is undefined", () => {
    const blogs = [];

    const result = listHelper.mostBlogs(blogs);
    expect(result).toEqual(undefined);
  });

  test("in a list of solely one blog, is exactly that author", () => {
    const blogs = [
      {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        likes: 12,
      },
    ];

    const result = listHelper.mostBlogs(blogs);
    expect(result).toEqual({
      author: "Edsger W. Dijkstra",
      blogs: 1,
    });
  });

  test("in a list of two, where likes are the same, should be the first author", () => {
    const blogs = [
      {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        likes: 5,
      },
      {
        title: "First class tests",
        author: "Robert C. Martin",
        likes: 5,
      }
    ];

    const result = listHelper.mostBlogs(blogs);
    expect(result).toEqual({
      author: "Edsger W. Dijkstra",
      blogs: 1,
    });
  });

  test("in a list of many, should be the author with his sum of blogs", () => {
    const blogs = [
      {
        title: "React patterns",
        author: "Michael Chan",
        likes: 7,
      },
      {
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        likes: 5,
      },
      {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        likes: 12,
      },
      {
        title: "First class tests",
        author: "Robert C. Martin",
        likes: 10,
      },
      {
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        likes: 0,
      },
      {
        title: "Type wars",
        author: "Robert C. Martin",
        likes: 2,
      },
    ];

    const result = listHelper.mostBlogs(blogs);
    expect(result).toEqual({
      author: "Robert C. Martin",
      blogs: 3,
    });
  });
});

describe("most likes", () => {
  test("in a list of none, is undefined", () => {
    const blogs = [];

    const result = listHelper.mostLikes(blogs);
    expect(result).toEqual(undefined);
  });

  test("in a list of solely one blog, is exactly that author", () => {
    const blogs = [
      {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        likes: 12,
      },
    ];

    const result = listHelper.mostLikes(blogs);
    expect(result).toEqual({
      author: "Edsger W. Dijkstra",
      likes: 12,
    });
  });

  test("in a list of two, where likes are the same, should be the first author", () => {
    const blogs = [
      {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        likes: 5,
      },
      {
        title: "First class tests",
        author: "Robert C. Martin",
        likes: 5,
      }
    ];

    const result = listHelper.mostLikes(blogs);
    expect(result).toEqual({
      author: "Edsger W. Dijkstra",
      likes: 5,
    });
  });

  test("in a list of many, should be the author with his sum of likes", () => {
    const blogs = [
      {
        title: "React patterns",
        author: "Michael Chan",
        likes: 7,
      },
      {
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        likes: 5,
      },
      {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        likes: 12,
      },
      {
        title: "First class tests",
        author: "Robert C. Martin",
        likes: 10,
      },
      {
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        likes: 0,
      },
      {
        title: "Type wars",
        author: "Robert C. Martin",
        likes: 2,
      },
    ];

    const result = listHelper.mostLikes(blogs);
    expect(result).toEqual({
      author: "Edsger W. Dijkstra",
      likes: 17,
    });
  });
});
