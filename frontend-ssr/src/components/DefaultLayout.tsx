import { Container } from '@chakra-ui/react';
import { FC, ReactNode } from 'react';
import SEO from './seo';

export const DefaultLayout: FC<{
  children?: ReactNode;
  title?: string;
  description?: string;
}> = ({ children, title, description }) => (
  <>
    <SEO title={title} description={description} />
    <Container maxW="6xl">{children}</Container>
  </>
);
