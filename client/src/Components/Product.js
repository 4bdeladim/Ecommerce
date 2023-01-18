import { DeleteIcon, EditIcon, ViewIcon } from '@chakra-ui/icons';
import { Card,Button,ButtonGroup,Divider, Stack, Image, Heading, Text,  CardBody, CardFooter, useDisclosure } from '@chakra-ui/react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link} from "react-router-dom"
import { AddToCart } from '../redux/actions/products';
import { AddToCartNotLoggedIn } from '../redux/products';
import AlertDialogCheck from './DeleteWithAlert';

  
function Product({product}) {
    const [hovered, sethovered] = useState(false)
    const dispatch = useDispatch()
    const {loggedIn, role} = useSelector(state => state.auth)
    const addToCart = () => {
      if(!loggedIn){
        dispatch(AddToCartNotLoggedIn({productId: product._id, productImg: product.img, quantity: 1}))
        return;
      }
      dispatch(AddToCart({productId: product._id, productImg: product.img, quantity: 1}))
    }
    return (
      <Card cursor="pointer" onMouseLeave={() => sethovered(false)} onMouseEnter={() => sethovered(true)} position="relative" boxShadow="xs" maxW='sm' >
        {hovered ? (
          <Stack as={Link} to={`/singleproduct/${product._id}`} cursor="pointer" _hover={{bg: "pink.300"}} position="absolute" borderBottomRadius="50%" borderTopRadius="50%" top="1rem" right="1rem" bg="red.400" padding=".5rem .5rem">
            <ViewIcon color="white" />
          </Stack>
        ) : ""}
        {
          role === "owner" || role === "admin" ? (
            <Stack cursor="pointer" _hover={{bg: "pink.300"}} position="absolute" borderBottomRadius="50%" borderTopRadius="50%" top="1rem" left="1rem" bg="red.400" padding=".5rem .5rem">
              <EditIcon color="white" />
            </Stack>
          ) : null
        }
        {
          role === "owner" || role === "admin" ? (
            <Stack cursor="pointer" _hover={{bg: "pink.300"}} position="absolute" borderBottomRadius="50%" borderTopRadius="50%" top="1rem" left="4rem" bg="red.400" padding=".5rem .5rem">
              <AlertDialogCheck id={product._id} />
            </Stack>
          ) : null
        }

        
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
            <Button onClick={() => addToCart()}  variant='solid' colorScheme='red'>
              Add to cart
            </Button>
            
          </ButtonGroup>
        </CardFooter>
      </Card>
    );
  }
  


export default Product;