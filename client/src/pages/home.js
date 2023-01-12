import { Container, Flex, useMediaQuery } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import Features from '../Components/Features'
import Footer from '../Components/Footer'
import Hero from '../Components/Hero'
import Top from '../Components/Top'
import {useDispatch, useSelector} from "react-redux"
import { GetPopularProducts } from '../redux/actions/products'
const Home = () => {
  const { popular } = useSelector(state => state.products)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(GetPopularProducts())
    return () => {}
  }, [])
  
  return (
    <Container w="100vw" maxW="100%" p="0">
        <Flex px="1rem" flexDirection="column" w="100%">
            <Hero />
            <Features />
            <Top products={popular} />
        </Flex>
        <Footer />
    </Container>  
    
  )
}

export default Home