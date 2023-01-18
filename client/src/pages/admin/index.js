import { Flex } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Sidebar from '../../Components/Sidebar'
import UsersTable from '../../Components/UsersTable'

const Admin = () => {
  const { selectedPage } = useSelector(state => state.admin)
  return (
    <Flex minH="calc(100vh - 80px)" alignItems="center" justifyContent="space-between">
      <Sidebar />
      <Flex w="full" justifyContent="center">
        {selectedPage === "Users" ? <UsersTable /> : ""}
      </Flex>
    </Flex>
  )
}

export default Admin