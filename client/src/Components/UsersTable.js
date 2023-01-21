import React, { useEffect, useState } from 'react'
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
import { ChevronDownIcon } from '@chakra-ui/icons'
import { useDispatch, useSelector } from 'react-redux'
import { Ban, DeleteUser, GetUsers, UnBan } from '../redux/actions/admin'
import EditUser from './EditUserInfo'
import SendEmail from './SendEmail'

const UsersTable = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(GetUsers())
    }, [])
    const { users } = useSelector(state => state.admin)
    const { role } = useSelector(state => state.auth)
    const delete_user = (id) => {
        dispatch(DeleteUser(id))
    }
    return (
        <TableContainer rounded="lg" border="1px solid #f0f0f0" mr="2rem">
            <Table >
                <Thead>
                <Tr>
                    
                    <Th>Username</Th>
                    <Th>Role</Th>
                    <Th>Email</Th>
                    <Th isNumeric>Orders</Th>
                    <Th>Date Joined</Th>
                    <Th>BS Adresse</Th>
                    <Th>Banned</Th>
                    <Th>Edit</Th>
                    
                </Tr>
                </Thead>
                <Tbody>
                    {
                        users.map(e => (
                            <Tr key={e._id}>
                                
                                <Td>{e.username}</Td>
                                <Td>{e.role}</Td>
                                <Td>{e.email}</Td>
                                <Td>{e.orders.length}</Td>
                                <Td>{e.date}</Td>
                                <Td>{e.SBadress}</Td>
                                <Td>{String(e.banned)}</Td>
                                <Td>
                                    <Menu>
                                        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                                           Actions
                                        </MenuButton>
                                        <MenuList>
                                            {
                                                e.role === "admin" && role === "owner" ? <MenuItem>Make user</MenuItem> : null
                                            }
                                            {
                                                e.role === "user" && role === "owner" ? <MenuItem>Make Admin</MenuItem> : null
                                            }
                                            
                                            <MenuItem onClick={() => delete_user(e._id)}>Delete User</MenuItem>
                                            <EditUser id={e._id} />
                                            <SendEmail id={e._id} />
                                            {e.banned ? <MenuItem onClick={() => dispatch(UnBan(e._id))}>Unban</MenuItem> : <MenuItem onClick={() => dispatch(Ban(e._id))}>Ban</MenuItem>}
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