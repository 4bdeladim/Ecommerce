import { Box, Flex, Text, Tooltip } from '@chakra-ui/react'
import React from 'react'

const ChartBar = ({t, h, p, hover}) => {
    const height =  h / p 
    return (
        <Flex justifyContent="center" flexDirection="column"  h="100%" alignItems="center">
            <Flex h="100%" alignItems="flex-end">
                <Tooltip label={`${hover}: ${h}`}>
                    <Box m=".5rem" borderRadius="1px" h={`calc(100% * ${height})`} minW="1.3rem" bgGradient='linear(to-t, pink.100, red.300)' cursor="pointer" >
                    </Box>
                </Tooltip>
                
            </Flex>
            <Text>{t}</Text>
        </Flex>
    )
}

export default ChartBar