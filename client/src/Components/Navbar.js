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
} from '@chakra-ui/react';
import {Link} from "react-router-dom"
import {CiShoppingCart} from "react-icons/ci"
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from '@chakra-ui/icons';
import { useLocation } from 'react-router-dom';
import Cart from './Cart';
import { useState } from 'react';



export default function Navbar() {
  const [ isCartOpen, setIsCartOpen ] = useState(false)
  const { isOpen, onToggle } = useDisclosure();
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
            color={useColorModeValue('gray.800', 'white')}>
            Logo
          </Text>

          <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>

        <Flex 
          gap="1rem"
          
          justify={'flex-end'}
          direction={'row'}
          spacing={6}>

          
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
          <CiShoppingCart 
            fontSize="2.2rem"
            style={{marginTop:".2rem", padding:".5rem"}}
            cursor="pointer"
            onClick={() => setIsCartOpen(!isCartOpen)}
          />
          <Cart  opened={isCartOpen} />
          
          
        </Flex >
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}

const DesktopNav = () => {
  const linkColor = useColorModeValue('gray.600', 'gray.200');
  const linkHoverColor = useColorModeValue('gray.800', 'white');
  const popoverContentBgColor = useColorModeValue('white', 'gray.800');

  return (
    <Stack direction={'row'} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={'hover'} placement={'bottom-start'}>
            <PopoverTrigger>
              <Link
                p={2}
                to={navItem.to ?? '/'}
                fontSize={'sm'}
                fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: 'none',
                  color: linkHoverColor,
                }}>
                {navItem.label}
              </Link>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={'xl'}
                bg={popoverContentBgColor}
                p={4}
                rounded={'xl'}
                minW={'sm'}>
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, to, subLabel }) => {
  return (
    <Link
      to={to}
      role={'group'}
      display={'block'}
      p={2}
      rounded={'md'}
      _hover={{ bg: useColorModeValue('pink.50', 'gray.900') }}>
      <Stack direction={'row'} align={'center'}>
        <Box>
          <Text
            transition={'all .3s ease'}
            _groupHover={{ color: 'pink.400' }}
            fontWeight={500}>
            {label}
          </Text>
          <Text fontSize={'sm'}>{subLabel}</Text>
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
  );
};

const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue('white', 'gray.800')}
      p={4}
      display={{ md: 'none' }}>
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, to }) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Flex flexDirection="column" gap="1rem" spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={Link}
        to={to ?? '/'}
        justify={'space-between'}
        align={'center'}
        _hover={{
          textDecoration: 'none',
        }}>
        <Text
          fontWeight={600}
          color={useColorModeValue('gray.600', 'gray.200')}>
          {label}
        </Text>
        {children && (
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
          borderColor={useColorModeValue('gray.200', 'gray.700')}
          align={'start'}>
          {children &&
            children.map((child) => (
              <Link key={child.label} py={2} to={child.to}>
                {child.label}
              </Link>
            ))}

          
          
        </Stack>
      </Collapse>
      <Button
            w="100px"
            as={'a'}
            fontSize={'sm'}
            fontWeight={600}
            variant={'link'}
            color={'white'}
            bg={'pink.400'}
            p=".7rem 1rem"
            textDecoration="none"
            to={'/'}
            _hover={{
              bg: 'pink.300',
            }}
            >
            Sign In
        </Button>

      
    </Flex>
  );
};



const NAV_ITEMS = [
  {
    label: 'Products',
    to: "/products/all",
    children: [
      {
        label: 'Men',
        to: '/products/men',
      },
      {
        label: 'Women',
        to: '/products/women',
      },
      {
        label: "Kids",
        to: "/products/kids"
      },
      {
        label: "Jewelery",
        to: "/products/jewelery"
      }
    ],
  },
  
];