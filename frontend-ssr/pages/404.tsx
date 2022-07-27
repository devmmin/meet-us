import { Box, Center, Heading } from '@chakra-ui/react';
import { DefaultLayout } from '@components/DefaultLayout';
import NotFoundIcon from '../public/not-found.svg';

function NotFoundPage() {
  return (
    <DefaultLayout title="Page not found" description="Page not found 404">
      <Center h={{ base: '6xl' }} color="white">
        <Box>
          <Heading fontSize="3xl" paddingBottom="20">
            페이지를 찾을수 없습니다
          </Heading>
          <NotFoundIcon />
        </Box>
      </Center>
    </DefaultLayout>
  );
}

export default NotFoundPage;
