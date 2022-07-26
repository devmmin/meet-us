import {
  Box,
  Divider,
  Heading,
  Icon,
  Stack,
  Text,
  useColorModeValue,
  Flex,
  Avatar,
  Breadcrumb,
  BreadcrumbItem,
} from "@chakra-ui/react";
import { MdHome, MdOutlineSettings } from "react-icons/md";
import { FaBullhorn, FaBlog, FaUsersCog } from "react-icons/fa";
import { SiChakraui } from "react-icons/si";
import { NavLink } from "react-router-dom";
import { useLayoutEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
// import { gql, useQuery } from "@apollo/client";
import { getNavLinks } from "../util";
import { userInfoState, navLinksState } from "../recoil";

const Sidebar = () => {
  const [navLinks, setNavLinks] = useRecoilState(navLinksState);
  const userInfo = useRecoilValue(userInfoState);

  const getNavLinkList = () => {
    const { data } = getNavLinks();
    setNavLinks(data);
  };

  // TODO
  // const GET_USER = gql`
  //   query ExampleQuery($userId: String!, $postId: String!) {
  //     getUserById(id: $userId) {
  //       userId
  //       userName
  //       role
  //       createAt
  //     }
  //     getPostById(id: $postId) {
  //       postId
  //       title
  //       content
  //       status
  //       authorId
  //       author {
  //         id
  //         userName
  //       }
  //       updatedAt
  //       createdAt
  //     }
  //   }
  // `;
  // const { loading, error, data } = useQuery(GET_USER, {
  //   variables: { userId: "test001@test.com", postId: "1" },
  // });

  // console.log("loading", loading);
  // console.log("error", error);
  // console.log("data", data);

  useLayoutEffect(() => {
    getNavLinkList();
  }, []);
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
      <Box>
        <Divider />
        <Flex p="18px 14px">
          <Avatar mr="10px" />
          <Stack>
            <Text fontSize="14px">{userInfo.nickName}</Text>
            <Text fontSize="14px">{userInfo.id}</Text>
          </Stack>
        </Flex>
      </Box>
    </Flex>
  );
};

export default Sidebar;
