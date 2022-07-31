import { useEffect } from "react";
import { useSetRecoilState, useRecoilState } from "recoil";
import { gql, useQuery } from "@apollo/client";
import { Flex, Spinner, Text } from "@chakra-ui/react";
import { isAuthState, userInfoState } from "../recoil";

interface UserResponse {
  getUserById: {
    userName: string;
  };
}

interface UserVariable {
  userId: string;
}

const GET_USER = gql`
  query GET_USER($userId: String!) {
    getUserById(id: $userId) {
      userId
      userName
      role
      createAt
    }
  }
`;

/* eslint-disable no-undef */
const Auth = ({ component }: { component: JSX.Element }) => {
  const [isAuth, setIsAuth] = useRecoilState(isAuthState);
  const setUserInfo = useSetRecoilState(userInfoState);

  const { loading, data = { getUserById: { userName: "" } } } = useQuery<
    UserResponse,
    UserVariable
  >(GET_USER, {
    variables: {
      userId: "ddf79a8f-812f-405f-b054-b87187a185a1",
    },
  });

  useEffect(() => {
    if (!loading && data) {
      // TODO: data.getUserBydId.userEmail 필드 요청하기
      setUserInfo((prev) => ({
        ...prev,
        id: "test001@test.com",
        nickName: data.getUserById.userName,
        password: "",
      }));
      setIsAuth(true);
    }
  }, [setUserInfo, setIsAuth, loading, data]);

  return !isAuth ? (
    <Flex justifyContent="center" alignItems="center" flex="1">
      <Spinner />
      <Text ml="10px">Loading...</Text>
    </Flex>
  ) : (
    component
  );
};

export default Auth;
