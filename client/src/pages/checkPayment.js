import { Flex, Spinner } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { NewOrder } from '../redux/actions/products'

const CheckPayment = () => {
    const dispatch = useDispatch()
    useEffect(() => {
      dispatch(NewOrder())
    }, [])
    
  return (
    <Flex h="100%" w='100%'>
        <Spinner color="red.400" size="xl" />
    </Flex>
  )
}

export default CheckPayment