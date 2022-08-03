import { useEffect } from "react";
import { useSetRecoilState, useRecoilState, useResetRecoilState } from "recoil";
import { useQuery } from "@apollo/client";
import { Flex, Spinner, Text } from "@chakra-ui/react";
import {
  checkedListState,
  isAuthState,
  pageInfoState,
  userInfoState,
} from "../recoil";
import { GET_USER } from "../gql";
import { UserResponse, UserVariable } from "../types/api";

/* eslint-disable no-undef */
const Auth = ({ component }: { component: JSX.Element }) => {
  const [isAuth, setIsAuth] = useRecoilState(isAuthState);
  const setUserInfo = useSetRecoilState(userInfoState);
  const resetPageInfo = useResetRecoilState(pageInfoState);
  const resetChckedList = useResetRecoilState(checkedListState);

  const { loading, data } = useQuery<UserResponse, UserVariable>(GET_USER, {
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
      resetPageInfo();
      resetChckedList();
      setIsAuth(true);
    }
  }, [setUserInfo, setIsAuth, loading, data, resetPageInfo, resetChckedList]);

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
