import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    useColorModeValue,
  } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { changePassword, checkRecoveryLink } from '../redux/actions/auth';
  
export default function ChangePasswordForm() {
    
    
    const {email, code} = useParams()
    const [password, setPassword] = useState("")
    const check = false
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(checkRecoveryLink({email, code}))
    }, [])
    return (
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack
          spacing={4}
          w={'full'}
          maxW={'md'}
          bg={useColorModeValue('white', 'gray.700')}
          rounded={'xl'}
          boxShadow={'lg'}
          p={6}
          my={12}>
          <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
            Enter new password
          </Heading>
          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <Input onChange={(e) => setPassword(e.target.value)} type="password" />
          </FormControl>
          <Stack spacing={6}>
            <Button
              bg={'red.400'}
              onClick={(e) => dispatch(changePassword({code, email, password})) }
              color={'white'}
              _hover={{
                bg: 'pink.300',
              }}>
              Submit
            </Button>
          </Stack>
        </Stack>
      </Flex>
    );
  }