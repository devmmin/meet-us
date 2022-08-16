import { Flex } from "@chakra-ui/react";
import { Navigate, Route, Routes } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
import Blog from "./pages/Blog";
import Notice from "./pages/Notice";
import Main from "./pages/Main";
import UserManagement from "./pages/UserManagement";
import Setting from "./pages/Setting";
import PostUpdate from "./pages/Blog/PostUpdate";
import NoticeUpdate from "./pages/Notice/NoticeUpdate";
import Auth from "./components/Auth";
import ConfirmModal from "./components/Modal/ConfirmModal";
import Login from "./pages/Login";

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
