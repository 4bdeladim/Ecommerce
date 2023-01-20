import React, { useEffect } from 'react'
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    MenuButton,
    MenuList,
    MenuItem,
    Menu,
    Button,
  } from '@chakra-ui/react'
import { ChevronDownIcon, EditIcon } from '@chakra-ui/icons'
import { useDispatch, useSelector } from 'react-redux'
import { DeleteUser, GetUsers } from '../redux/actions/admin'

const UsersTable = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(GetUsers())
    }, [])
    const { users } = useSelector(state => state.admin)
    const delete_user = (id) => {
        dispatch(DeleteUser(id))
    }
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
                                <Td>
                                    <Menu>
                                        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                                           Actions
                                        </MenuButton>
                                        <MenuList>
                                            <MenuItem>Make Admin</MenuItem>
                                            <MenuItem onClick={() => delete_user(e._id)}>Delete User</MenuItem>
                                            <MenuItem>Edit Info</MenuItem>
                                            <MenuItem>Send Email</MenuItem>
                                            <MenuItem>Ban</MenuItem>
                                        </MenuList>
                                    </Menu>
                                
                                </Td>
                            </Tr>
                        ))
                    }
                    
                
                </Tbody>
            </Table>
        </TableContainer>
    )
}

export default UsersTable