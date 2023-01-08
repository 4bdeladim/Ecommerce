import { Button, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import Product from './Product'

const Top = () => {
    
    const item = {
        category: "jewelery",
        title: "White Gold Plated Princess",
        descreption: "lassic Created Wedding Engagement Solitaire Diamond Promise Ring for Her. Gifts to spoil your love more for Engagement, Wedding, Anniversary, Valentine's Day...",
        imageURL: "/assets/ring.jpg",
        price: "9.99"
    }
    const items = new Array(10).fill(item)
  return (
    <Flex  w="100%"  flexDirection="column">   
        <Text textAlign="center" fontSize="3rem" fontWeight="600">Top products</Text>
        <Flex my="2rem"  justifyContent="center" w="100%" flexDirection="row" gap="2rem" flexWrap="wrap">
            {
                items.map((el) => (
                    <Product data={el} />
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