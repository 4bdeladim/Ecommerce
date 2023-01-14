import CartCard from '../Components/CartCard'
import { Button, Flex,useColorModeValue } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Checkout as CheckoutAction } from '../redux/actions/products'
import { useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
const Checkout = () => {
    const {status} = useParams()
    useEffect(() => {
      if(status === "ErrorPayment") Swal.fire({title:"Payment failed", icon:"error"})
    }, [])
    
    const {cart} = useSelector(state => state.products)
    const dispatch = useDispatch()
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
                onClick={() => dispatch(CheckoutAction())}
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