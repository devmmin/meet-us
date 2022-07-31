import { Flex } from "@chakra-ui/react";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import AdminLayout from "./layouts/AdminLayout";
import Blog from "./pages/Blog";
import Notice from "./pages/Notice";
import Main from "./pages/Main";
import UserManagement from "./pages/UserManagement";
import Setting from "./pages/Setting";
import PostUpdate from "./pages/Blog/PostUpdate";
import NoticeUpdate from "./pages/Notice/NoticeUpdate";
import Auth from "./components/Auth";

/* eslint-disable no-undef */
const LoginCheck = ({ component }: { component: JSX.Element }) => {
  if (localStorage.getItem("access-token")) {
    return <Navigate to="/admin/main" replace />;
  }

  return component;
};

const App = () => (
  <Flex className="App">
    <Routes>
      <Route path="/admin" element={<Auth component={<AdminLayout />} />}>
        <Route path="main" element={<Main />} />
        <Route path="notice" element={<Notice />} />
        <Route path="notice/update">
          <Route index element={<NoticeUpdate />} />
          <Route path=":id" element={<NoticeUpdate />} />
        </Route>
        <Route path="blog" element={<Blog />} />
        <Route path="blog/update">
          <Route index element={<PostUpdate />} />
          <Route path=":id" element={<PostUpdate />} />
        </Route>
        <Route path="user-management" element={<UserManagement />} />
        <Route path="setting" element={<Setting />} />
      </Route>
      <Route
        path="/admin/login"
        element={<LoginCheck component={<Login />} />}
      />
      <Route
        path="*"
        element={
          localStorage.getItem("access-token") ? (
            <Navigate to="/admin/main" replace />
          ) : (
            <Navigate to="/admin/login" replace />
          )
        }
      />
    </Routes>
  </Flex>
);

export default App;
