import {
  Box,
  chakra,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
} from '@chakra-ui/react';
import { Header } from '@components/Header';
import SEO from '@components/seo';
import type { NextPage } from 'next';

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
              border="solid 1px gray"
              gridTemplateColumns={{
                sm: 'repeat(1, 100%)',
                md: 'repeat(2, 1fr)',
                lg: 'repeat(3, 1fr)',
                xl: 'repeat(3, 1fr)',
              }}
            >
              <GridItem border="solid 1px blue">테스트</GridItem>
              <GridItem border="solid 1px blue">테스트</GridItem>
              <GridItem border="solid 1px blue">테스트</GridItem>
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
