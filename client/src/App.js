import {Button, Flex, useColorMode } from '@chakra-ui/react'
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

function App() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Flex flexDirection="column" w="100vw" maxW="100%" >
      <Button color="white" bg="red.400" width="50px" height="50px" borderRadius="50%" position="fixed" bottom="1rem" right="1rem" onClick={toggleColorMode} _hover={{
        bg: "red.200"
      }}>
        {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
      </Button>
      <Navbar /> 
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot" element={<ForgotPasswordForm />} />
        <Route path="/products/:category" element={<Products />} />
        <Route path="/verify/:email" element={<VerifyEmail/>} />
        <Route path="*" element={<NotFound />} />
        
      </Routes>
      
    </Flex >
  );
}

export default App;
