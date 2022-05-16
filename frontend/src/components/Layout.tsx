import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const Layout = () => (
  <>
    <Sidebar />
    <Outlet />
  </>
);

export default Layout;
