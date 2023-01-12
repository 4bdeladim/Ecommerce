import { Button, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import Product from './Product'

const Top = ({products}) => {
    const productsdata = products[0] || []
  return (
    <Flex w="100%"  flexDirection="column">   
        <Text textAlign="center" fontSize="3rem" fontWeight="600">Top products</Text>
        <Flex my="2rem"  justifyContent="center" w="100%" flexDirection="row" gap="2rem" flexWrap="wrap">
            {
                productsdata.map((el) => (
                    <Product key={el._id} product={el} />
                ))
            }
        </Flex>
        <Button as={Link} to="/products/all" m="auto" my="1rem" colorScheme="red" width="180px">
            Show all products
        </Button>
    </Flex>
  )
}

export default Top