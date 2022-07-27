import {
  chakra,
  Flex,
  Heading,
  HStack,
  IconButton,
  Link,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { FaMoon, FaSun } from 'react-icons/fa';

export const Header = () => {
  const { toggleColorMode } = useColorMode();
  const text = useColorModeValue('dark', 'light');
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);

  return (
    <chakra.header width="full" paddingY="14" role="">
      <Flex w="full" h="full" align="center" justify="space-between">
        <Heading size="xl">Meet us</Heading>
        <HStack>
          <NextLink href="/noticeboard" passHref>
            <Link aria-label="anchor">
              <Heading size="md">공지사항</Heading>
            </Link>
          </NextLink>
          <NextLink href="/post" passHref>
            <Link aria-label="anchor">
              <Heading size="md">블로그</Heading>
            </Link>
          </NextLink>

          <IconButton
            size="md"
            fontSize="lg"
            aria-label={`Switch to ${text} mode`}
            variant="ghost"
            color="current"
            ml={{ base: '0', md: '3' }}
            onClick={toggleColorMode}
            icon={<SwitchIcon />}
          />
        </HStack>
      </Flex>
    </chakra.header>
  );
};
