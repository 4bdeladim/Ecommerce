import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux'
import { store } from './redux/store'
const root = ReactDOM.createRoot(document.getElementById('root'));

const theme = extendTheme({
    styles: {
      global: {
        body: {
          transitionProperty: "all",
          transitionDuration: "normal",
         
        }
      }
    },
    config: {
      disableTransitionOnChange: false
    }
});
root.render(
  <Provider store={store}>
    <ChakraProvider theme={theme}>
         <Router >
            <App />
        </Router>   
    </ChakraProvider>
  </Provider>
    
   
    
);
