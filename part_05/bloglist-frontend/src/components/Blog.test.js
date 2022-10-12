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
    test("renders content", async () => {
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
  });

  describe("Content interaction", () => {
    test("Like button can be clicked", async () => {
      const handleIncreaseLike = jest.fn();
      const handleDeleteBlog = jest.fn();
      const user = userEvent.setup();
    
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
      const handleIncreaseLike = jest.fn();
      const handleDeleteBlog = jest.fn();
    
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
      let handleIncreaseLike, handleDeleteBlog, user, btnDeleteEl;

      beforeEach(() => {
        handleIncreaseLike = jest.fn();
        handleDeleteBlog = jest.fn();
        user = userEvent.setup();

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
