import { useSetRecoilState, useRecoilState, useResetRecoilState } from "recoil";
import { useQuery } from "@apollo/client";
import { Flex, Spinner, Text } from "@chakra-ui/react";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import {
  checkedListState,
  isAuthState,
  pageInfoState,
  userInfoState,
} from "../recoil";
import { GET_USER } from "../gql";
import { UserResponse, UserVariable } from "../types/server";
import { logout } from "../util";
import Main from "../pages/Main";

const Auth = ({ component = <Main /> }: { component?: JSX.Element }) => {
  const [isLoading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useRecoilState(isAuthState);
  const setUserInfo = useSetRecoilState(userInfoState);
  const resetPageInfo = useResetRecoilState(pageInfoState);
  const resetChckedList = useResetRecoilState(checkedListState);

  // TODO: 로그인 완료 시 userId API response로 주거나, userId값이 로그인한 아이디 값이게 변경 필요
  useQuery<UserResponse, UserVariable>(GET_USER, {
    variables: {
      userId: "ddf79a8f-812f-405f-b054-b87187a185a1",
    },
    onCompleted: (response) => {
      const { userName } = response.getUserById;
      setUserInfo((prev) => ({
        ...prev,
        id: "test001@test.com",
        nickName: userName,
      }));
      resetPageInfo();
      resetChckedList();
      setIsAuth(true);
      setLoading(false);
    },
    onError: () => {
      setLoading(false);
      logout();
    },
  });

  return isLoading ? (
    <Flex justifyContent="center" alignItems="center" flex="1">
      <Spinner />
      <Text ml="10px">Loading...</Text>
    </Flex>
  ) : isAuth ? (
    component
  ) : (
    <Navigate to="/admin/login" />
  );
};

Auth.defaultProps = {
  component: <Main />,
};

export default Auth;
