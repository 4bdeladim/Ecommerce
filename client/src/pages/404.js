import { Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <Flex flexDirection="column" height="calc(100vh - 60px)" justifyContent="center" alignItems="center" w="100vw" maxW="100%">
        <Text textAlign="center" w="100%" color="red.400" fontWeight="bold" fontSize="200px">404</Text>
        <Text fontSize="3rem" fontWeight="600" color="red.200">PAGE NOT FOUND</Text>
        <Text my="1rem" as={Link} to="/" color="purple.500" fontSize="1rem" fontWeight="500" >Back to home</Text>
    </Flex>
  )
}

export default NotFound