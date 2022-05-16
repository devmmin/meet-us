import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  List,
  ListIcon,
  ListItem,
  Stack,
  Text,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const userInfo = { nickName: 'Christian Kim', email: 'wwww3426@naver.com' };
  const linkList = [
    { name: '메인', to: '/', icon: '' },
    { name: '공지사항', to: '/notice', icon: '' },
    { name: '블로그', to: '/blog', icon: '' },
    { name: '유저 관리', to: '/user-management', icon: '' },
    { name: '설정', to: '/setting', icon: '' },
  ];
  return (
    <Drawer placement="left" isOpen onClose={() => { }}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader borderBottomWidth="1px">Meet us</DrawerHeader>
        <DrawerBody>
          <List spacing="10px">
            {linkList.map((item) => (
              <ListItem key={item.to}>
                <ListIcon />
                <Link to={item.to}>{item.name}</Link>
              </ListItem>
            ))}
          </List>
        </DrawerBody>
        <DrawerFooter>
          <Stack>
            <Text>{userInfo.nickName}</Text>
            <Text>{userInfo.email}</Text>
          </Stack>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default Sidebar;
