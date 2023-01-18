import { Avatar, Flex, Button, Table, TableContainer, Tag, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react'
import React, {useEffect} from 'react'
import {NotAllowedIcon} from "@chakra-ui/icons"
import { useDispatch, useSelector } from 'react-redux'
import { GetOrders } from '../redux/actions/products'
import {Link} from 'react-router-dom'

const Account = () => {
    const {username, role} = useSelector(state => state.auth)
    const {orders} = useSelector(state => state.products)
    const dispatch = useDispatch()
    useEffect(() => {
      dispatch(GetOrders())
    }, [])
    
    return (
        <Flex mt="3rem" w="100%" alignItems="center" flexDirection="column">
            <Avatar w="200px"
                    h="200px">
            </Avatar>
            {role === "admin" || role === "owner" ? <Button my="1rem" as={Link} to="/admin" colorScheme="red">Admin panel</Button> : null}
            <Text my="1rem">{username}</Text>
            <Text fontWeight="600" mt="2rem" mb="1rem">Orders:</Text>
            <TableContainer rounded="lg" border="1px solid #f0f0f0"  >
            <Table  variant='simple'>
                <Thead>
                    <Tr>
                        <Th>Order number</Th>
                        <Th>Date</Th>
                        <Th isNumeric>Product Price</Th>
                        <Th isNumeric>Total Price</Th>
                        <Th>Status</Th>
                        <Th>Cancel</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {
                        orders.map(order => (
                            <Tr key={order._id}>
                                <Td>{order._id}</Td>
                                <Td>{new Date(order.date).toLocaleDateString("en-US")}</Td>
                                <Td isNumeric>{order.productPrice}</Td>
                                <Td isNumeric>{order.totalPrice}</Td>
                                <Td>
                                    <Tag variant='solid' bg="red.400">
                                        {order.status}
                                    </Tag>
                                </Td>
                                <Td>
                                    <Button  _hover={{bg: "pink.300"}} w="30px" h="30px" bg="red.400">
                                        <NotAllowedIcon color="white"/>
                                    </Button>
                                    
                                </Td>
                                
                            </Tr>
                        ))
                    }
            
                </Tbody>

            </Table>
            </TableContainer>

        </Flex>
    )
}

export default Account