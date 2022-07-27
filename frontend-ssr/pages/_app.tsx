import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '@styles/theme';
import Head from 'next/head';
import { DefaultSeo } from 'next-seo';
import { getSeo } from '@utils/seo';

import '@fontsource/raleway/400.css';
import '@fontsource/open-sans/700.css';

/**
 * server side <Main/>
 * @param param0
 * @returns
 */
function MyApp({ Component, pageProps }: AppProps) {
  const seo = getSeo();
  return (
    <>
      <Head>
        <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <DefaultSeo {...seo} />
      <ChakraProvider resetCSS={true} theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  );
}

export default MyApp;
