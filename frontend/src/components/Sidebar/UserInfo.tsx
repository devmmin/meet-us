import { Avatar, Box, Divider, Flex, Stack, Text } from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import { userInfoState } from "../../recoil";

const UserInfo = () => {
  const userInfo = useRecoilValue(userInfoState);

  return (
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
  );
};

export default UserInfo;
