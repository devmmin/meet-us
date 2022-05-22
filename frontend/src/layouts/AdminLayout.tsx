import { Box } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const AdminLayout = () => (
  <>
    <Sidebar />
    <Box w="100%" pl="320px" as="main">
      <Outlet />
    </Box>
  </>
);

export default AdminLayout;
