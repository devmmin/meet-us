import { Box } from '@chakra-ui/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import AdminLayout from './layouts/AdminLayout';
import Blog from './pages/Blog';
import Notice from './pages/Notice';
import Main from './pages/Main';
import UserManagement from './pages/UserManagement';
import Setting from './pages/Setting';
import PostUpdate from './pages/Blog/BlogUpdate';
import NoticeUpdate from './pages/Notice/NoticeUpdate';

const App = () => (
  <Box className="App">
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="main" element={<Main />} />
          <Route path="notice" element={<Notice />} />
          <Route path="notice/update" element={<NoticeUpdate />} />
          <Route path="blog" element={<Blog />} />
          <Route path="blog/update" element={<PostUpdate />} />
          <Route path="user-management" element={<UserManagement />} />
          <Route path="setting" element={<Setting />} />
        </Route>
        <Route path="/admin/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  </Box>
);

export default App;
