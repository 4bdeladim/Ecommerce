import {Button, Flex, Spinner, useColorMode } from '@chakra-ui/react'
import Home from "./pages/home"
import Navbar from './Components/Navbar';
import { Route, Routes } from 'react-router-dom';
import Signin from './Components/Signin';
import NotFound from './pages/404';
import Signup from './Components/Signup';
import ForgotPasswordForm from './Components/Forgot';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import Products from './Components/Products';
import VerifyEmail from './Components/Verify';
import { useDispatch, useSelector } from 'react-redux';
import ChangePasswordForm from './Components/Changepassword';
import CheckLink from './Components/CheckLink';
import { Suspense, useEffect } from 'react';
import { CheckLogin } from './redux/actions/auth';
import axios from 'axios';
import SingleProduct from './pages/ProductPage';
import Account from './pages/account';
import Checkout from './pages/checkout';

function App() {
  const { colorMode, toggleColorMode } = useColorMode();
  const {loading, loggedIn} = useSelector(state => state.auth)
  const productsLoading = useSelector(state => state.products.loading)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(CheckLogin())
    return () => {}
  }, [])

  
  
  return (
    
    <Flex minHeight="100vh" alignItems="center" flexDirection="column" w="100vw" maxW="100%" >
      {
        loading ? (
          <Spinner size="xl" color="red.400" />
        ) : (
          <Flex flexDirection="column" w="100%">
            <Button zIndex="999" color="white" bg="red.400" width="50px" height="50px" borderRadius="50%" position="fixed" bottom="1rem" right="1rem" onClick={toggleColorMode} _hover={{
              bg: "red.200"
            }}>
              {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            </Button>
            <Navbar /> 
            <Routes>
              <Route path="/" element={<Home />} /> 
              {loggedIn ? <Route path="/checkout" element={<Checkout />} /> : null}
              {loggedIn ? null :<Route path="/signin" element={<Signin />} />}
              {loggedIn ? null :<Route path="/signup" element={<Signup />} />}
              {loggedIn ? <Route path="/account" element={<Account />} /> : null}
              {loggedIn ? null :<Route path="/forgot" element={<ForgotPasswordForm />} />}
              {loggedIn ? null :<Route path="/verify/:email" element={<VerifyEmail/>} />}
              {loggedIn ? null :<Route path="/recover/:email/:code" element={<CheckLink />} />}
              {loggedIn ? null :<Route path="/changepassword/:email/:code" element={<ChangePasswordForm />} />} 
              <Route path="/products/:category" element={<Products />} />
              <Route path="/singleproduct/:id" element={<SingleProduct />} />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Flex>
        )
      }
      
    </Flex >
  );
}

export default App;
