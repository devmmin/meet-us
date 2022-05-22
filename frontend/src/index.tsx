import React from 'react';
import ReactDOM from 'react-dom';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import App from './App';
import reportWebVitals from './reportWebVitals';

const theme = extendTheme({
  styles: {
    global: ({ colorMode }: { colorMode: string }) => ({
      body: {
        margin: 0,
      },
      '.App': {
        display: 'flex',
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
      <App />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root') as HTMLElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
