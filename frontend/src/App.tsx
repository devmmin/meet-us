import { Box } from '@chakra-ui/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Layout from './layout/AdminLayout';
import Blog from './components/Blog';
import Notice from './components/Notice';
import Main from './components/Main';
import UserManagement from './components/UserManagement';
import Setting from './components/Setting';

const App = () => (
  <Box className="App">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main />} />
          <Route path="notice" element={<Notice />} />
          <Route path="blog" element={<Blog />} />
          <Route path="user-management" element={<UserManagement />} />
          <Route path="setting" element={<Setting />} />
        </Route>
        <Route path="login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  </Box>
);

export default App;
