import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogForm from "./BlogForm";

test("<BlogForm /> updates parent state and calls onSubmit", async () => {
  const handleAddBlog = jest.fn();
  const user = userEvent.setup();
  const blog = {
    title: "Blog of the day",
    author: "Jennifer Loren",
    likes: 25,
    url: "/blog-123",
  };

  const { container } = render(<BlogForm onAddBlog={handleAddBlog} />);

  const inputTitleEl = container.querySelector(".title");
  const inputAuthorEl = container.querySelector(".author");
  const inputURLEl = container.querySelector(".url");
  const submitButtonEl = screen.getByText("Create");

  await user.type(inputTitleEl, blog.title);
  await user.type(inputAuthorEl, blog.author);
  await user.type(inputURLEl, blog.url);
  await user.click(submitButtonEl);

  expect(handleAddBlog.mock.calls).toHaveLength(1);
  expect(handleAddBlog.mock.calls[0][0].title).toBe(blog.title);
  expect(handleAddBlog.mock.calls[0][0].author).toBe(blog.author);
  expect(handleAddBlog.mock.calls[0][0].url).toBe(blog.url);
});
