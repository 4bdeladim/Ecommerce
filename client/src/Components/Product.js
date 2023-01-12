import { ViewIcon } from '@chakra-ui/icons';
import { Card,Button,ButtonGroup,Divider, Stack, Image, Heading, Text,  CardBody, CardFooter } from '@chakra-ui/react'
import { useState } from 'react';
import {Link} from "react-router-dom"

  
function Product({product}) {
    const [hovered, sethovered] = useState(false)
    return (
      <Card position="relative" boxShadow="xs" maxW='sm' >
        {hovered ? (
          <Stack as={Link} to={`/singleproduct/${product._id}`} cursor="pointer" _hover={{bg: "pink.300"}} position="absolute" borderBottomRadius="50%" borderTopRadius="50%" top="1rem" right="1rem" bg="red.400" padding=".5rem .5rem">
            <ViewIcon  color="white" />
          </Stack>
        ) : ""}

        
        <CardBody maxH="620px" d="flex">
          <Image
            src={product.img}
            alt={product.name}
            borderRadius='lg'
            w="300px"
            h="400px"
            m="0 auto"
            fit="contain"
          />
          <Stack mt='6' spacing='3'>
            <Heading size='md' height="50px" overflow="hidden">{product.name}</Heading>
            <Text color="grey" h="50px" overflow="hidden">
              {product.description}
            </Text>
            <Text color='red.400' fontSize='2xl'>
              {product.price} $
            </Text>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
          <ButtonGroup spacing='2'>
            <Button variant='solid' colorScheme='red'>
              Add to cart
            </Button>
            
          </ButtonGroup>
        </CardFooter>
      </Card>
    );
  }
  
export default Product;