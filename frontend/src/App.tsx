import { Box } from '@chakra-ui/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Components/Login';
import Layout from './Layout/AdminLayout';
import Blog from './Components/Blog';
import Notice from './Components/Notice';
import Main from './Components/Main';
import UserManagement from './Components/UserManagement';
import Setting from './Components/Setting';

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
