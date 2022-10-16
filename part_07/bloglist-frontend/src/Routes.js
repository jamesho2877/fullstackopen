import { Routes as BrowserRoutes, Route } from "react-router-dom";
import BlogPage from "./components/BlogPage";
import Blogs from "./components/Blogs";
import UserPage from "./components/UserPage";
import Users from "./components/Users";

const Routes = () => {
  return (
    <BrowserRoutes>
      <Route path="/users/:id" element={<UserPage />} />
      <Route path="/users" element={<Users />} />
      <Route path="/blogs/:id" element={<BlogPage />} />
      <Route path="/blogs" element={<Blogs />} />
      <Route path="/" element={<Blogs />} />
    </BrowserRoutes>
  );
};

export default Routes;
