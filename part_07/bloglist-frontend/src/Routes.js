import { Routes as BrowserRoutes, Route } from "react-router-dom";
import Blogs from "./components/Blogs";
import User from "./components/User";
import Users from "./components/Users";

const Routes = () => {
  return (
    <BrowserRoutes>
      <Route path="/users/:id" element={<User />} />
      <Route path="/users" element={<Users />} />
      <Route path="/blogs" element={<Blogs />} />
      <Route path="/" element={<Blogs />} />
    </BrowserRoutes>
  );
};

export default Routes;
