import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
  } from '@chakra-ui/react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {Link } from "react-router-dom"
import { sign_in } from '../redux/auth';
export default function Signin() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()
    return (
      <Flex
        minH={'calc(100vh - 70px)'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading textAlign="center" fontSize={'4xl'}>Sign in to your account</Heading>
    
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input onChange={(e) => setEmail(e.target.value)} type="email" />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input onChange={(e) => setPassword(e.target.value)} type="password" />
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'space-between'}>
                  <Text to="/forgot" as={Link} color={'red.400'}>Forgot password?</Text>
                </Stack>
                <Button
                  bg={'red.400'}
                  color={'white'}
                  onClick={() => dispatch(sign_in({email, password}))}
                  _hover={{
                    bg: 'pink.300',
                  }}>
                  Sign in
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    );
  }