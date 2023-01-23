import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  useMediaQuery,
  AvatarBadge,
  Avatar,
} from '@chakra-ui/react';
import {Link} from "react-router-dom"
import {FaOpencart} from "react-icons/fa"
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from '@chakra-ui/icons';
import { useLocation } from 'react-router-dom';
import Cart from './Cart';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {GetCategories} from "../redux/actions/products"


export default function Navbar() {
  
  
  const linkColor = useColorModeValue('gray.600', 'gray.200');
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(GetCategories())
    return () =>{}
  }, [])
  const linkHoverColor = useColorModeValue('gray.800', 'white');
  const popoverContentBgColor = useColorModeValue('white', 'gray.800');
  const {categories} = useSelector(state => state.products) 
  const [ isCartOpen, setIsCartOpen ] = useState(false)
  const { isOpen, onToggle } = useDisclosure();
  const {loggedIn} = useSelector(state => state.auth)
  const location = useLocation()
  const [isSmallerthan767] = useMediaQuery("(max-width: 767px)")
  return (
    <Box>
      <Flex
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        minH={'70px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align={'center'}>
        <Flex
          flex={{ base: 1, md: 'auto' }}
          ml={{ base: -2 }}
          display={{ base: 'flex', md: 'none' }}>
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: 'space-between', md: 'start' }}>
          <Text
            as={Link}
            textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
            fontFamily={'heading'}
            to="/"
            fontWeight="900"
            color="red.400"
            >
            USHOP
          </Text>

          <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
          <Stack direction={'row'} spacing={4}>
            <Box>
              {
                location.pathname.split("/")[1] === "products" ? "" : (
                  <Popover trigger={'hover'} placement={'bottom-start'}>
                <PopoverTrigger>
                  
                  <Link
                    p={2}
                    to={"/products/all" ?? '/'}
                    fontSize={'sm'}
                    fontWeight={500}
                    color={linkColor}
                    _hover={{
                      textDecoration: 'none',
                      color: linkHoverColor,
                    }}>
                    
                    Products
                  </Link>
                </PopoverTrigger>

              
                  <PopoverContent
                    border={0}
                    boxShadow={'xl'}
                    bg={popoverContentBgColor}
                    p={4}
                    rounded={'xl'}
                    minW={'sm'}>
                    <Stack>
                      {categories.map((child) => (
                        <Link
                        key={child._id}
                          to={`/products/${child.name}`}
                          role={'group'}
                          display={'block'}
                          p={2}
                          rounded={'md'}
                          _hover={{ bg: "pink.300" }}>
                          <Stack direction={'row'} align={'center'}>
                            <Box>
                              <Text
                                transition={'all .3s ease'}
                                _groupHover={{ color: 'pink.400' }}
                                fontWeight={500}>
                                {child.name.charAt(0).toUpperCase() + child.name.slice(1)}
                              </Text>
                            </Box>
                            <Flex
                              transition={'all .3s ease'}
                              transform={'translateX(-10px)'}
                              opacity={0}
                              _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
                              justify={'flex-end'}
                              align={'center'}
                              flex={1}>
                              <Icon color={'pink.400'} w={5} h={5} as={ChevronRightIcon} />
                            </Flex>
                          </Stack>
                        </Link>
                      ))}
                    </Stack>
                  </PopoverContent> 
              </Popover>
                )
              }
              
            </Box>

            </Stack>
          </Flex>
        </Flex>

        <Flex 
          gap="1rem"
          
          justify={'flex-end'}
          align="center"
          direction={'row'}
          spacing={6}>

          {loggedIn ? (
          <Avatar to="/account" as={Link} w="30px" h="30px" m="0" p="0">
              
          </Avatar>
          ) : null}
          {
            !loggedIn ? (
              <Button
                w="110px"
                py="10px"
                as={Link}
                display={isSmallerthan767 ? "none" : ""}
                fontSize={'sm'}
                fontWeight={600}
                textAlign="center"
                variant={'link'}
                color={'white'}
                bg={'red.400'}
                
                textDecoration="none"
                to={location.pathname === "/signin" ? "/signup" : "/signin"}
                _hover={{
                  bg: 'pink.300',
                }}
                >
                {location.pathname === "/signin" ? "Sign Up" : "Sign In"}
              </Button>
            ) : (null)
          }
          
          <FaOpencart 
            fontSize="2.5rem"
            style={{marginTop:".2rem", padding:".5rem"}}
            cursor="pointer"
            onClick={() => setIsCartOpen(!isCartOpen)}
          />
          <Cart  opened={isCartOpen} />
          
          
        </Flex >
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <Stack
          bg={useColorModeValue('white', 'gray.800')}
          p={4}
          display={{ md: 'none' }}>
            <Flex flexDirection="column" gap="1rem" spacing={4} onClick={categories && onToggle}>
              {
                location.pathname.split("/")[1] === "products" ? ""  : (
                  <Flex flexDirection="column" w="100%">
                    <Flex
                      py={2}
                      as={Link}
                      to={'/products/all'}
                      justify={'space-between'}
                      align={'center'}
                      _hover={{
                        textDecoration: 'none',
                      }}>
                      <Text
                        fontWeight={600}
                        color="gray.600">
                        Products
                      </Text>
                      {categories && (
                        <Icon
                          as={ChevronDownIcon}
                          transition={'all .25s ease-in-out'}
                          transform={isOpen ? 'rotate(180deg)' : ''}
                          w={6}
                          h={6}
                        />
                      )}
                      
                    </Flex>
                    <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
                      <Stack
                        mt={2}
                        pl={4}
                        borderLeft={1}
                        borderStyle={'solid'}
                        borderColor="gray.200"
                        align={'start'}>
                        {categories.map((cat) => (
                            <Link key={cat._id} py={2} to={"/products/"+cat.name}>
                              {cat.name.charAt(0).toUpperCase() + cat.name.slice(1)}
                            </Link>
                          ))}

                        
                        
                      </Stack>
                    </Collapse>
                  </Flex>
                )
              }
              
              {
                !loggedIn ? (
                  <Button
      
                    w="100px"
                    as={Link}
                    fontSize={'sm'}
                    fontWeight={600}
                    variant={'link'}
                    color={'white'}
                    bg={'pink.400'}
                    p=".7rem 1rem"
                    textDecoration="none"
                    to={location.pathname === "/signin" ? "/signup" : "/signin"}
                    _hover={{
                      bg: 'pink.300',
                    }}
                    >
                      {location.pathname === "/signin" ? "Sign Up" : "Sign In"}
              </Button>
                ) : (location.pathname.split("/")[1] === "products" ? <Link to="/">Home </Link> : "")
              }

              
            </Flex>
        </Stack>
      </Collapse>
    </Box>
  );
}







