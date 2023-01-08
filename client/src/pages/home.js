import { Container, Flex, useMediaQuery } from '@chakra-ui/react'
import React from 'react'
import Features from '../Components/Features'
import Footer from '../Components/Footer'
import Hero from '../Components/Hero'
import Top from '../Components/Top'
const Home = () => {
  const [isSmallerthan767] = useMediaQuery("(max-width:767px)")
  return (
    <Container w="100vw" maxW="100%" p="0">
        <Flex px="1rem" flexDirection="column" w="100%">
            <Hero />
            <Features />
            <Top />
        </Flex>
        <Footer />
    </Container>
    
  )
}

export default Home