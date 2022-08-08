import {
  Box,
  chakra,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  Text,
} from '@chakra-ui/react';
import { Header } from '@components/Header';
import SEO from '@components/seo';
import type { NextPage } from 'next';

const BlogCard = () => (
  <Box
    maxWidth={'2xl'}
    borderRadius="20px"
    background="whiteAlpha.200"
    overflow="hidden"
  >
    <Image src={'/images/empty.png'} background="gray.100" padding="6" />
    <Box padding="6">
      <Heading size="md">
        프론트엔드에서 AR 구현하기 시리즈 - 이것만 하면 다된다.
      </Heading>
      <Text>
        프론트엔드에서 AR 구현하기 시리즈 - 이것만 하면 다된다. 역시 거짓말이다.
        이것만 하면 다될 것처럼 한건 낚시엿다. 사실 AR 다루기 비법은 아주 쉽지
        않다. 그냥 어렵다. 하고 싶으면 유니티엔진을 다루어라... 우문 현답이네.
      </Text>
    </Box>
  </Box>
);

const HomePage: NextPage = () => (
  <>
    <SEO
      title={'Meet Us - 프론트엔드 개발자'}
      description={'Meet Us와 함께하는 프론트앤드'}
    />
    <Container maxW="6xl">
      <Header />
      <Box as={'main'}>
        <chakra.article>
          <chakra.section>
            <Flex justify="space-between">
              <Heading size="md">공지사항</Heading>
              <Heading size="md">더보기...</Heading>
            </Flex>
            <Grid
              height="3xs"
              borderRadius="xl"
              border="solid 1px gray"
              gridTemplateColumns={{
                sm: 'repeat(1, 100%)',
                md: 'repeat(2, 40% 60%)',
                lg: 'repeat(2, 40% 60%)',
                xl: 'repeat(2, 40% 60%)',
              }}
            >
              <GridItem border="solid 1px blue">테스트</GridItem>
              <GridItem border="solid 1px blue">테스트</GridItem>
            </Grid>
          </chakra.section>
          <chakra.section>
            <Flex justify="space-between">
              <Heading size="md">인기 블로그</Heading>
              <Heading size="md">더보기...</Heading>
            </Flex>
            <Grid
              height="3xs"
              borderRadius="xl"
              gridGap="6"
              gridTemplateColumns={{
                sm: 'repeat(1, 100%)',
                md: 'repeat(2, 1fr)',
                lg: 'repeat(3, 1fr)',
                xl: 'repeat(3, 1fr)',
              }}
            >
              <GridItem>
                <BlogCard></BlogCard>
              </GridItem>
              <GridItem>
                <BlogCard></BlogCard>
              </GridItem>
              <GridItem>
                <BlogCard></BlogCard>
              </GridItem>
              <GridItem border="solid 1px blue">테스트</GridItem>
              <GridItem border="solid 1px blue">테스트</GridItem>
              <GridItem border="solid 1px blue">테스트</GridItem>
              <GridItem border="solid 1px blue">테스트</GridItem>
              <GridItem border="solid 1px blue">테스트</GridItem>
              <GridItem border="solid 1px blue">테스트</GridItem>
              <GridItem border="solid 1px blue">테스트</GridItem>
              <GridItem border="solid 1px blue">테스트</GridItem>
              <GridItem border="solid 1px blue">테스트</GridItem>
            </Grid>
          </chakra.section>
        </chakra.article>
      </Box>
    </Container>
  </>
);

export default HomePage;
