import { Box } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../Components/Sidebar';

const AdminLayout = () => (
  <>
    <Sidebar />
    <Box bg="gray.50" w="100%">
      <Outlet />
    </Box>
  </>
);

export default AdminLayout;
