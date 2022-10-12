import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

describe("<Blog />", () => {
  let blog;

  beforeEach(() => {
    blog = {
      title: "Blog of the day",
      author: "Jennifer Loren",
      likes: 25,
      url: "/blog-123",
    };
  });

  describe("Content appearance", () => {
    test("Renders content", async () => {
      const emptyHandlerFunc = () => {};

      render(
        <Blog
          blog={blog}
          isDeletable={false}
          onIncreaseLike={emptyHandlerFunc}
          onDeleteBlog={emptyHandlerFunc}
        />
      );
    
      const visibleEl = screen.getByText(`${blog.title} - ${blog.author}`);
      expect(visibleEl).toBeInTheDocument();
      expect(visibleEl).toBeVisible();
    
      const hiddenEl = screen.getByText((text) => text.includes(blog.url));
      expect(hiddenEl).toBeInTheDocument();
      expect(hiddenEl).not.toBeVisible();
    });

    test("Likes and URL are hidden by default", async () => {
      const emptyHandlerFunc = () => {};

      render(
        <Blog
          blog={blog}
          isDeletable={false}
          onIncreaseLike={emptyHandlerFunc}
          onDeleteBlog={emptyHandlerFunc}
        />
      );
    
      const hiddenURLEl = screen.getByText(new RegExp(`^URL: ${blog.url}`, "i"));
      const hiddenLikesEl = screen.getByText(new RegExp(`^Likes: ${blog.likes}`, "i"));

      expect(hiddenURLEl).toBeInTheDocument();
      expect(hiddenLikesEl).toBeInTheDocument();

      expect(hiddenURLEl).not.toBeVisible();
      expect(hiddenLikesEl).not.toBeVisible();
    });
  });

  describe("Content interaction", () => {
    let handleIncreaseLike, handleDeleteBlog, user;

    beforeEach(() => {
      user = userEvent.setup();
      handleIncreaseLike = jest.fn();
      handleDeleteBlog = jest.fn();
    });

    test("Likes and URL are shown when View button is clicked", async () => {
      render(
        <Blog
          blog={blog}
          isDeletable={false}
          onIncreaseLike={handleIncreaseLike}
          onDeleteBlog={handleDeleteBlog}
        />
      );
    
      const viewButtonEl = screen.getByText("view", { selector: "button" });
      const urlEl = screen.getByText(new RegExp(`^URL: ${blog.url}`, "i"));
      const likesEl = screen.getByText(new RegExp(`^Likes: ${blog.likes}`, "i"));

      expect(urlEl).toBeInTheDocument();
      expect(likesEl).toBeInTheDocument();

      expect(urlEl).not.toBeVisible();
      expect(likesEl).not.toBeVisible();

      await user.click(viewButtonEl);
      
      expect(urlEl).toBeVisible();
      expect(likesEl).toBeVisible();
    });

    test("Like button can be clicked", async () => {
      render(
        <Blog
          blog={blog}
          isDeletable={false}
          onIncreaseLike={handleIncreaseLike}
          onDeleteBlog={handleDeleteBlog}
        />
      );
      
      const btnLikeEl = screen.getByText("Like");
      await user.click(btnLikeEl);
      expect(handleIncreaseLike.mock.calls).toHaveLength(1);
    });

    test("Delete button is not available if blog post is not deletable, as it is not created by the user", async () => {
      render(
        <Blog
          blog={blog}
          isDeletable={false}
          onIncreaseLike={handleIncreaseLike}
          onDeleteBlog={handleDeleteBlog}
        />
      );
      
      expect(() => screen.getByText("Delete")).toThrow("Unable to find an element");
    });

    describe("Delete button is available and can be clicked if blog post is deletable, as it is created by the user", () => {
      let btnDeleteEl;

      beforeEach(() => {
        render(
          <Blog
            blog={blog}
            isDeletable={true}
            onIncreaseLike={handleIncreaseLike}
            onDeleteBlog={handleDeleteBlog}
          />
        );

        btnDeleteEl = screen.getByText("Delete");
      });

      test("Cancel deletion", async () => {
        window.confirm = jest.fn(() => false);
        await user.click(btnDeleteEl);
        expect(handleIncreaseLike.mock.calls).toHaveLength(0);
        expect(window.confirm).toHaveBeenCalled();
        expect(handleDeleteBlog.mock.calls).toHaveLength(0);
        window.confirm.mockClear();
      });

      test("Confirm deletion", async () => {
        window.confirm = jest.fn(() => true);
        await user.click(btnDeleteEl);
        expect(handleIncreaseLike.mock.calls).toHaveLength(0);
        expect(window.confirm).toHaveBeenCalled();
        expect(handleDeleteBlog.mock.calls).toHaveLength(1);
        window.confirm.mockClear();
      });
    });
  });
});
