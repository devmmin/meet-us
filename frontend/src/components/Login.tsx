import {
  Button,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  Heading,
  Input,
  useToast,
} from '@chakra-ui/react';
import React, { useState } from 'react';

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [loginInfo, setLoginInfo] = useState({ id: '', password: '' });
  const toast = useToast();
  const loginHandler = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (loginInfo.id === 'error') {
        toast({
          description: 'ID 또는 비밀번호가 맞지 않습니다. 다시 입력해주세요.',
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      }
    }, 500);
  };
  const changeHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) => {
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
              changeHandler(e, 'id');
            }}
            disabled={isLoading}
          />
          <FormErrorMessage>아이디 값이 존재하지 않습니다.</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!loginInfo.password}>
          <Input
            placeholder="Password"
            mt="20px"
            value={loginInfo.password}
            onChange={(e) => {
              changeHandler(e, 'password');
            }}
            disabled={isLoading}
          />
          <FormErrorMessage>비밀번호 값이 존재하지 않습니다.</FormErrorMessage>
        </FormControl>
        <Button
          width="100%"
          bg="blue.600"
          colorScheme="blue"
          isLoading={isLoading}
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
