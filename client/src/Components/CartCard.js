import { ChevronDownIcon, ChevronUpIcon, DeleteIcon } from '@chakra-ui/icons'
import { Flex, Image, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DeleteFromCart, UpdateCart } from '../redux/actions/products'

const CartCard = ({data}) => {
    const [quantity, setquantity] = useState(data.quantity || 1)
    const dispatch = useDispatch()
    const {loggedIn} = useSelector(state => state.auth)
    
    const more = () => {
        if(!loggedIn){
            const cart = Array.isArray(JSON.parse(localStorage.getItem("cart"))) ? JSON.parse(localStorage.getItem("cart")) : []
            const newCart = cart.map(e => {
                if(e.productId === data.productId){
                    return {productId: data.productId, productImg: data.productImg, quantity: e.quantity + 1}
                }
                return e
            })
            localStorage.setItem("cart", JSON.stringify(newCart))
            return;
        }
        setquantity(quantity + 1)
        dispatch(UpdateCart({...data, quantity}))
    }
    const less = () => {
        if(!loggedIn){
            const cart = Array.isArray(JSON.parse(localStorage.getItem("cart"))) ? JSON.parse(localStorage.getItem("cart")) : []
            const newCart = cart.map(e => {
                if(e.productId === data.productId){
                    return {productId: data.productId, productImg: data.productImg, quantity: e.quantity - 1}
                }
                return e
            })
            localStorage.setItem("cart", JSON.stringify(newCart))
            return;
        }
        setquantity(quantity - 1)
        dispatch(UpdateCart({...data, quantity}))
    }
    const deleteItem = () => {
        if(!loggedIn){
            const cart = Array.isArray(JSON.parse(localStorage.getItem("cart"))) ? JSON.parse(localStorage.getItem("cart")) : []
            const newCart = cart.filter(e => e.productId !== data.productId)
            localStorage.setItem("cart", JSON.stringify(newCart))
            return;
        }
        dispatch(DeleteFromCart({...data, quantity}))
    }
    return (
        <Flex my="1rem" alignItems="center" w="100%" border="1px solid" borderColor="#e3e3e3" borderRadius="10px" display="flex" justifyContent="space-between" p=".5rem" >
            <Image w="50px" src={data.productImg} />
            <Flex gap="20px" alignItems="center" cursor="pointer">
                {quantity > 1 ? <ChevronDownIcon onClick={() => less()} /> : ""}
                <Text>{quantity}</Text>
                <ChevronUpIcon onClick={() => more()} />
            </Flex>
            <DeleteIcon onClick={() => deleteItem()} cursor="pointer" p="0" m="0" fontSize="20px" color="red.400" />
        </Flex>
    )
}

export default CartCard