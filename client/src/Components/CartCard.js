import { ChevronDownIcon, ChevronUpIcon, DeleteIcon } from '@chakra-ui/icons'
import { Flex, Image, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DeleteFromCart, UpdateCart} from '../redux/actions/products'
import { DeleteFromCartNotLoggedIn, UpdateFromCartNotLoggedIn } from '../redux/products'

const CartCard = ({data}) => {
    const [quantity, setquantity] = useState(1)
    useEffect(() => {
        setquantity(data.quantity)
    }, [])
    const dispatch = useDispatch()
    const {loggedIn} = useSelector(state => state.auth)
    
    const more = () => {
        if(!loggedIn){
            dispatch(UpdateFromCartNotLoggedIn({productImg: data.productImg,productId: data.productId, quantity: data.quantity + 1}))
            return;
        }
        dispatch(UpdateCart({productImg: data.productImg,productId: data.productId, quantity: data.quantity + 1}))
    }
    const less = () => {
        if(!loggedIn){
            dispatch(UpdateFromCartNotLoggedIn({productImg: data.productImg,productId: data.productId, quantity: data.quantity - 1}))
            return;
        }
        dispatch(UpdateCart({productImg: data.productImg, productId: data.productId, quantity: data.quantity - 1}))
    }
    const deleteItem = () => {
        if(!loggedIn){
            dispatch(DeleteFromCartNotLoggedIn({productId: data.productId}))
            return;
        }
        dispatch(DeleteFromCart({productId: data.productId}))
    }
    return (
        <Flex my="1rem" alignItems="center" w="100%" border="1px solid" borderColor="#e3e3e3" borderRadius="10px" display="flex" justifyContent="space-between" p=".5rem" >
            <Image w="50px" src={data.productImg} />
            <Flex gap="20px" alignItems="center" cursor="pointer">
                {data.quantity > 1 ? <ChevronDownIcon onClick={() => less()} /> : ""}
                <Text>{data.quantity}</Text>
                <ChevronUpIcon onClick={() => more()} />
            </Flex>
            <DeleteIcon onClick={() => deleteItem()} cursor="pointer" p="0" m="0" fontSize="20px" color="red.400" />
        </Flex>
    )
}

export default CartCard