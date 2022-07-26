import {
  Button,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  Heading,
  Input,
  useToast,
} from "@chakra-ui/react";
import { ChangeEvent, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userInfoState } from "../recoil";
import { postLogin } from "../util";

const Login = () => {
  const [loginInfo, setLoginInfo] = useRecoilState(userInfoState);

  const toast = useToast();
  const navigate = useNavigate();

  const [params] = useSearchParams();

  useEffect(() => {
    if (params.get("loginRequire")) {
      toast({
        description: "재로그인이 필요합니다.",
      });
    }
  }, [params, toast]);

  const loginHandler = async () => {
    const response = await postLogin(loginInfo);
    if (response && response.code) {
      toast({
        description: response.error.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } else {
      navigate("/admin/main");
    }
  };

  const changeHandler = (event: ChangeEvent<HTMLInputElement>, key: string) => {
    setLoginInfo((prev) => ({ ...prev, [key]: event.target.value }));
  };
  return (
    <Container maxW="320px" h="100%">
      <Flex flexDirection="column" justifyContent="center" h="100%">
        <Heading>Meet Us</Heading>
        <FormControl isInvalid={!loginInfo.id}>
          <Input
            placeholder="ID"
            mt="20px"
            value={loginInfo.id}
            onChange={(e) => {
              changeHandler(e, "id");
            }}
          />
          <FormErrorMessage>아이디 값이 존재하지 않습니다.</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!loginInfo.password}>
          <Input
            placeholder="Password"
            mt="20px"
            value={loginInfo.password}
            onChange={(e) => {
              changeHandler(e, "password");
            }}
          />
          <FormErrorMessage>비밀번호 값이 존재하지 않습니다.</FormErrorMessage>
        </FormControl>
        <Button
          width="100%"
          bg="blue.600"
          colorScheme="blue"
          onClick={loginHandler}
          mt="20px"
          disabled={!loginInfo.id || !loginInfo.password}
        >
          Login
        </Button>
      </Flex>
    </Container>
  );
};

export default Login;
