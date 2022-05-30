import React from 'react';
import ReactDOM from 'react-dom';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { RecoilRoot } from 'recoil';
import App from './App';
import reportWebVitals from './reportWebVitals';

const client = new ApolloClient({
  uri: 'https://48p1r2roz4.sse.codesandbox.io',
  cache: new InMemoryCache(),
});

const theme = extendTheme({
  styles: {
    global: ({ colorMode }: { colorMode: string }) => ({
      body: {
        margin: 0,
      },
      'html, body, #root, .App': {
        height: '100%',
      },
      'html, body': {
        color: colorMode === 'dark' ? 'white' : 'gray.700',
      },
    }),
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ApolloProvider client={client}>
        <RecoilRoot>
          <App />
        </RecoilRoot>
      </ApolloProvider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root') as HTMLElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
