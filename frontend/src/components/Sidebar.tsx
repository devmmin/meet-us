import {
  Box,
  Divider,
  Heading,
  Icon,
  List,
  ListItem,
  Stack,
  Text,
  useColorModeValue,
  Flex,
  Avatar,
} from '@chakra-ui/react';
import { MdHome, MdOutlineSettings } from 'react-icons/md';
import { FaBullhorn, FaBlog, FaUsersCog } from 'react-icons/fa';
import { SiChakraui } from 'react-icons/si';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const userInfo = { nickName: 'Christian Kim', email: 'wwww3426@naver.com' };
  const linkList = [
    { name: '메인', to: '/', icon: 'home' },
    { name: '공지사항', to: '/notice', icon: 'noti' },
    { name: '블로그', to: '/blog', icon: 'blog' },
    { name: '유저 관리', to: '/user-management', icon: 'user' },
    { name: '설정', to: '/setting', icon: 'setting' },
  ];
  return (
    <Flex
      flexDirection="column"
      justifyContent="space-between"
      pl="10px"
      pr="10px"
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w="320px"
      minW="320px"
      h="full"
    >
      <Box>
        <Flex p="14px" alignItems="center">
          <Icon as={SiChakraui} w="28px" h="28px" mr="12px" color="#7BCBD6" />
          <Heading color="gray.700" fontSize="14px">
            Meet us
          </Heading>
        </Flex>
        <Divider />
      </Box>
      <Box flex="1">
        <List p="30px 14px">
          {linkList.map((item) => (
            <ListItem key={item.to} h="48px">
              <Flex alignItems="center" h="100%">
                <NavLink to={item.to}>
                  {({ isActive }) => (
                    <Text
                      color={isActive ? '#7BCBD6' : 'gray.700'}
                      fontSize="18px"
                      fontWeight="bold"
                      display="flex"
                      alignItems="center"
                    >
                      {item.icon === 'home' && <Icon as={MdHome} mr="8px" />}
                      {item.icon === 'noti' && (
                        <Icon as={FaBullhorn} mr="8px" />
                      )}
                      {item.icon === 'blog' && <Icon as={FaBlog} mr="8px" />}
                      {item.icon === 'user' && (
                        <Icon as={FaUsersCog} mr="8px" />
                      )}
                      {item.icon === 'setting' && (
                        <Icon as={MdOutlineSettings} mr="8px" />
                      )}
                      {item.name}
                    </Text>
                  )}
                </NavLink>
              </Flex>
            </ListItem>
          ))}
        </List>
      </Box>
      <Box>
        <Divider />
        <Flex p="18px 14px">
          <Avatar mr="10px" />
          <Stack>
            <Text color="gray.700" fontSize="14px">
              {userInfo.nickName}
            </Text>
            <Text color="gray.700" fontSize="14px">
              {userInfo.email}
            </Text>
          </Stack>
        </Flex>
      </Box>
    </Flex>
  );
};

export default Sidebar;
