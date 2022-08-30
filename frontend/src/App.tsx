import { Flex } from "@chakra-ui/react";
import { Navigate, Route, Routes } from "react-router-dom";

import Auth from "./components/Auth";
import ConfirmModal from "./components/Modal/ConfirmModal";
import AdminLayout from "./layouts/AdminLayout";
import Blog from "./pages/Admin/Blog";
import PostUpdate from "./pages/Admin/Blog/PostUpdate";
import Login from "./pages/Admin/Login";
import Main from "./pages/Admin/Main";
import Notice from "./pages/Admin/Notice";
import NoticeUpdate from "./pages/Admin/Notice/NoticeUpdate";
import Setting from "./pages/Admin/Setting";
import UserManagement from "./pages/Admin/UserManagement";

const App = () => (
  <Flex className="App">
    <ConfirmModal />
    <Routes>
      <Route path="/admin" element={<Auth component={<AdminLayout />} />}>
        <Route index element={<Auth />} />
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
      <Route path="/admin/login" element={<Login />} />
      <Route path="*" element={<Navigate to="/admin/blog" />} />
    </Routes>
  </Flex>
);

export default App;
