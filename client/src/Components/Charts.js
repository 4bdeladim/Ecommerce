import { EditIcon } from '@chakra-ui/icons'
import { Card, CardBody, CardHeader, Flex, Stat, StatArrow, StatHelpText, StatLabel, StatNumber } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import ChartBar from './ChartBar'
import { GetUsersStats,GetProductSales, GetTopProduct, GetTopUser, GetOrderesStats} from "../redux/actions/admin"

const Chart = () => {
    const dispatch = useDispatch()
    const [id, setId] = useState("63cc08edb41433deb70e5ed0")
    const { users ,orderes, topProduct, topUser, productSales} = useSelector(state => state.admin.stats)
    useEffect(() => {
        dispatch(GetUsersStats())
        dispatch(GetOrderesStats())
        dispatch(GetTopProduct())
        dispatch(GetTopUser())
        dispatch(GetProductSales(id))
    }, [])
    
    let testArr = new Array(12).fill({})
    testArr = testArr.map((e, index) => {
        return {month: index + 1, users: Math.floor(Math.random() * 101)}
    })
    const max = testArr.sort((a, b) => b.users - a.users)[0].users
    const pMax = Math.pow(10, Math.ceil(Math.log10(max)))
    return (
        <Flex flexWrap="wrap" gap="2rem">
            <Card w="320px" h="400px">
                <CardHeader>
                    <Stat>
                        <StatLabel>Daily Users</StatLabel>
                        <StatNumber>{String(users.dialyUsers)}</StatNumber>
                        <StatHelpText>
                        <StatArrow type='increase' />
                            5.36%
                        </StatHelpText>
                    </Stat>
                </CardHeader>
                <CardBody 
                    css={{

                        '::-webkit-scrollbar': {
                            height: ".8rem",
                        },
                        '::-webkit-scrollbar-thumb': {
                            background: "#F56565",
                            borderRadius: "10px",
                        },
                        '::-webkit-scrollbar-thumb:hover': {
                            background:"#F687B3",
                        }
                        
                    }}
                as={Flex} flexDirection="row" alignItems="flex-end"  overflowX="scroll" h="calc(400px - 126px)" px="1rem" >
                    
                        {
                            users.finalList.map((e, index)=> <ChartBar hover="users" key={index} p={pMax} t={e.month} h={e.users}  /> )
                        }   
                    
                </CardBody>
            </Card>
            <Card w="320px" h="400px">
                <CardHeader>
                    <Stat>
                        <StatLabel>Daily Orders</StatLabel>
                        <StatNumber>{orderes.dialyorders}</StatNumber>
                        <StatHelpText>
                        <StatArrow type='increase' />
                            4.36%
                        </StatHelpText>
                    </Stat>
                </CardHeader>
                <CardBody 
                    w="100%"
                    css={{

                        '::-webkit-scrollbar': {
                            height: ".8rem",
                        },
                        '::-webkit-scrollbar-thumb': {
                            background: "#F56565",
                            borderRadius: "10px",
                        },
                        '::-webkit-scrollbar-thumb:hover': {
                            background:"#F687B3",
                        }
                        
                    }}
                    as={Flex} flexDirection="row" alignItems="flex-end"  overflowX="scroll" h="calc(400px - 126px)" px="1rem" >
                    
                        {
                            orderes.finalList.map((e, index)=> <ChartBar hover="orders" key={index} p={pMax} t={e.month} h={e.orders}  /> )
                        }   
                    
                </CardBody>
            </Card>
            <Flex flexDirection="column" gap="1rem">
                <Card h="100px" w="320px" p="1rem">
                    <Stat>
                        <StatLabel>Top Product</StatLabel>
                        <StatNumber fontSize="1rem" color="red.400" as={Link} to={`/singleproduct/${topProduct}`}>{topProduct}</StatNumber>
                    </Stat>
                </Card>
                <Card h="100px" w="320px" p="1rem">
                    <Stat>
                        <StatLabel>Top User</StatLabel>
                        <StatNumber fontSize="1rem" color="red.400">{topUser.topUser}</StatNumber>
                        <StatHelpText>Spent: {Math.round(topUser.price)}$ </StatHelpText>
                    </Stat>
                </Card>
                
            </Flex>
            <Card h="400px" w="320px" p=".5rem">
                <CardHeader>
                    <Stat>
                        <StatLabel>Product Sales</StatLabel>
                        <StatNumber id={id} fontSize="1rem"  color="red.400">{productSales.productName}
                        <EditIcon mx="1rem" />
                        </StatNumber>
                        <StatHelpText>
                            <StatArrow type='increase' />   
                            5.36%
                        </StatHelpText>
                    </Stat>
                </CardHeader>
                <CardBody 
                    w="100%"
                    css={{
                        '::-webkit-scrollbar': {
                            height: ".8rem",
                        },
                        '::-webkit-scrollbar-thumb': {
                            background: "#F56565",
                            borderRadius: "10px",
                        },
                        '::-webkit-scrollbar-thumb:hover': {
                            background:"#F687B3",
                        }
                        
                    }}
                    as={Flex} flexDirection="row" alignItems="flex-end"  overflowX="scroll" h="calc(400px - 126px)" px="1rem" >
                    
                        {
                            productSales.finalList.map((e, index)=> <ChartBar hover="orders" key={index} p={pMax} t={e.month} h={e.orders}  /> )
                        }   
                    
                </CardBody>
            </Card>
        </Flex>
    )
}

export default Chart