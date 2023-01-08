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
import {useState} from "react"
import { useDispatch } from 'react-redux';
 import {Link} from "react-router-dom" 
import { sign_up } from '../redux/auth';
export default function Signup() {
    const [email, setemail] = useState("")
    const [username, setusername] = useState("")
    const [password, setpassword] = useState("")
    const dispatch = useDispatch();
    const Signup = () => {
      dispatch(sign_up({email, username, password}))
    }
    return (
      <Flex
        minH={"calc(100vh - 70px)"}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading textAlign="center" fontSize={'4xl'}>Create new account</Heading>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>
            <FormControl id="email">
                <FormLabel>Username</FormLabel>
                <Input onChange={(e) => setusername(e.target.value)} type="username" />
              </FormControl>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input onChange={(e) => setemail(e.target.value)} type="email" />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input onChange={(e) => setpassword(e.target.value)} type="password" />
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'space-between'}>
                  <Text to="/signin" as={Link} color={'red.400'}>Already have an account?</Text >
                </Stack>
                <Button
                  bg={'red.400'}
                  color={'white'}
                  onClick={() => Signup()}
                  _hover={{
                    bg: 'pink.300',
                  }}>
                  Sign up
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    );
  }