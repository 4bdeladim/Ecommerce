
import { ChevronDownIcon, ChevronUpIcon, DeleteIcon } from '@chakra-ui/icons';
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Button,
    Input,
    useDisclosure,
    Box,
    Flex,
    Image,
    Card,
    Text
} from '@chakra-ui/react'
import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { GetCart } from '../redux/actions/products';
import CartCard from './CartCard';
export default function Cart({opened}) {
  const dispatch = useDispatch();
    useEffect(() => {
        if(opened) onOpen();
    }, [opened])

    useEffect(() => {
      dispatch(GetCart())
    }, [])
    const {cart} = useSelector(state => state.products)
    const {localCart} = useSelector(state => state.products)
    const {loggedIn} = useSelector(state => state.auth)
    const { isOpen, onOpen, onClose } = useDisclosure()
  
    return (
      <>
        
        <Drawer
          isOpen={isOpen}
          placement='right'
          onClose={onClose}
        >
          <DrawerOverlay />
          <DrawerContent w="100%" >
            <DrawerCloseButton mt=".5rem" />
            <DrawerHeader>Your cart</DrawerHeader>
  
            <DrawerBody w="100%" >
              {
                loggedIn ? cart?.map(e => <CartCard key={e.productId} data={e} />) : localCart.map(e => <CartCard key={e.productId} data={e} />)
                
              }
            </DrawerBody>
  
            <DrawerFooter>
              <Button variant='outline' mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button as={Link} to="/checkout" colorScheme='red'>Checkout</Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </>
    )
}