import CartCard from '../Components/CartCard'
import { Button, Flex,useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NewOrder } from '../redux/actions/products'

const Checkout = () => {
    const {cart} = useSelector(state => state.products)
    const dispatch = useDispatch()
    const checkOut = () => {
        dispatch(NewOrder())
    }
  return (
    <Flex minH="calc(100vh - 80px)" justifyContent="center" flexDirection="column">
        <Flex margin="0 auto"  flexDirection="column" w="90%">
            {
                cart.map(e => <CartCard key={e.productId} data={e}  />)
            }
        </Flex>
        <Flex  margin="0 auto" justifyContent="flex-end"  w="90%">
            <Button
                w="200px"
                px={8}
                bg={useColorModeValue('red.400', 'pink.300')}
                color={'white'}
                borderRadius="2px"
                onClick={() => checkOut()}
                _hover={{
                transform: 'translateY(-2px)',
                boxShadow: 'lg',
                }}>
                Checkout
            </Button>
        </Flex>
        
        
    </Flex>
  )
}

export default Checkout