// src/main.tsx
import theme from './theme.ts'
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import App from './App';
import Retirement from './Retirement.tsx';

const IS_RETIRED = true;

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <ColorModeScript initialColorMode={theme.config.initialColorMode}/>
    <ChakraProvider theme={theme}>
      {IS_RETIRED ? <Retirement/> : <App/>}
    </ChakraProvider>
  </React.StrictMode>
);
