import React, { useEffect } from 'react'
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
  } from '@chakra-ui/react'
import { EditIcon } from '@chakra-ui/icons'
import { useDispatch, useSelector } from 'react-redux'
import { GetUsers } from '../redux/actions/admin'

const UsersTable = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(GetUsers())
    }, [])
    const { users } = useSelector(state => state.admin)
    return (
        <TableContainer rounded="lg" border="1px solid #f0f0f0" mr="2rem">
            <Table >
                <Thead>
                <Tr>
                    <Th>User ID</Th>
                    <Th>Username</Th>
                    <Th>Email</Th>
                    <Th isNumeric>Orders</Th>
                    <Th>Date Joined</Th>
                    <Th>BS Adresse</Th>
                    <Th>Edit</Th>
                </Tr>
                </Thead>
                <Tbody>
                    {
                        users.map(e => (
                            <Tr key={e._id}>
                                <Td>{e._id}</Td>
                                <Td>{e.username}</Td>
                                <Td>{e.email}</Td>
                                <Td>{e.orders.length}</Td>
                                <Td>{e.date}</Td>
                                <Td>{e.SBadress}</Td>
                                <Td><EditIcon /></Td>
                            </Tr>
                        ))
                    }
                    
                
                </Tbody>
            </Table>
        </TableContainer>
    )
}

export default UsersTable