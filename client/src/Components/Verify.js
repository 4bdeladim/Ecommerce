import { Center, Heading } from '@chakra-ui/react';
import {
  Button,
  FormControl,
  Flex,
  Input,
  Stack,
  useColorModeValue,
  HStack,
} from '@chakra-ui/react';
import { PinInput, PinInputField } from '@chakra-ui/react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { verify } from '../redux/auth';

export default function VerifyEmail() {
    const dispatch = useDispatch()
    const {email} = useParams();
    const [code, setCode] = useState("")
    return (
        <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack
            spacing={4}
            w={'full'}
            maxW={'sm'}
            bg={useColorModeValue('white', 'gray.700')}
            rounded={'xl'}
            boxShadow={'lg'}
            p={6}
            my={10}>
            <Center>
            <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
                Verify your Email
            </Heading>
            </Center>
            <Center
            fontSize={{ base: 'sm', sm: 'md' }}
            color={useColorModeValue('gray.800', 'gray.400')}>
            We have sent code to your email
            </Center>
            <Center
            fontSize={{ base: 'sm', sm: 'md' }}
            fontWeight="bold"
            color={useColorModeValue('gray.800', 'gray.400')}>
            {email}
            </Center>
            <FormControl>
            <Center>
                <HStack>
                <PinInput onComplete={(e) => setCode(e)}>
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                </PinInput>
                </HStack>
            </Center>
            </FormControl>
            <Stack spacing={6}>
            <Button
                bg={'blue.400'}
                onClick={() => dispatch(verify({email, code}))}
                color={'white'}
                _hover={{
                bg: 'blue.500',
                }}>
                Verify
            </Button>
            </Stack>
        </Stack>
        </Flex>
    );
}