import {
  Box,
  Divider,
  Heading,
  Icon,
  Text,
  useColorModeValue,
  Flex,
  Breadcrumb,
  BreadcrumbItem,
} from "@chakra-ui/react";
import { MdHome, MdOutlineSettings } from "react-icons/md";
import { FaBullhorn, FaBlog, FaUsersCog } from "react-icons/fa";
import { SiChakraui } from "react-icons/si";
import { NavLink } from "react-router-dom";
import { useLayoutEffect } from "react";
import { useRecoilState } from "recoil";
import { getNavLinks } from "../util";
import { navLinksState } from "../recoil";
import UserInfo from "./Sidebar/UserInfo";

// TODO: API fetch
const { data } = getNavLinks();

const Sidebar = () => {
  const [navLinks, setNavLinks] = useRecoilState(navLinksState);
  useLayoutEffect(() => {
    setNavLinks(data);
  }, [setNavLinks]);
  return (
    <Flex
      as="aside"
      position="fixed"
      flexDirection="column"
      justifyContent="space-between"
      pl="10px"
      pr="10px"
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w="320px"
      minW="320px"
      h="full"
      zIndex="1"
      bg="white"
    >
      <Box>
        <Flex p="26px 16px" alignItems="center">
          <Icon as={SiChakraui} w="28px" h="28px" mr="12px" color="#7BCBD6" />
          <Heading fontSize="14px">Meet us</Heading>
        </Flex>
        <Divider />
      </Box>
      <Breadcrumb flex="1" p="30px 14px" separator={" "}>
        {navLinks.map((item) => (
          <BreadcrumbItem key={item.to} h="48px" display="block">
            <Flex alignItems="center" h="100%">
              <NavLink to={item.to}>
                {({ isActive }) => (
                  <Text
                    color={isActive ? "#7BCBD6" : "gray.700"}
                    fontSize="18px"
                    fontWeight="bold"
                    display="flex"
                    alignItems="center"
                    p="10px"
                  >
                    {item.icon === "home" && <Icon as={MdHome} mr="8px" />}
                    {item.icon === "noti" && <Icon as={FaBullhorn} mr="8px" />}
                    {item.icon === "blog" && <Icon as={FaBlog} mr="8px" />}
                    {item.icon === "user" && <Icon as={FaUsersCog} mr="8px" />}
                    {item.icon === "setting" && (
                      <Icon as={MdOutlineSettings} mr="8px" />
                    )}
                    {item.name}
                  </Text>
                )}
              </NavLink>
            </Flex>
          </BreadcrumbItem>
        ))}
      </Breadcrumb>
      <UserInfo />
    </Flex>
  );
};

export default Sidebar;
