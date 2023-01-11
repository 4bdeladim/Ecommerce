import { Card,Button,ButtonGroup,Divider, Stack, Image, Heading, Text,  CardBody, CardFooter } from '@chakra-ui/react'
  

  
function Product({product}) {
    return (
      <Card boxShadow="xs" maxW='sm'>
        <CardBody maxH="620px" d="flex">
          <Image
            src={product.img}
            alt={product.name}
            borderRadius='lg'
            w="300px"
            h="400px"
            m="0 auto"
          />
          <Stack mt='6' spacing='3'>
            <Heading size='md' height="50px" overflow="hidden">{product.name}</Heading>
            <Text color="grey" h="50px" overflow="hidden">
              {product.description}
            </Text>
            <Text color='red.400' fontSize='2xl'>
              {product.price} $
            </Text>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
          <ButtonGroup spacing='2'>
            <Button variant='solid' colorScheme='red'>
              Add to cart
            </Button>
            
          </ButtonGroup>
        </CardFooter>
      </Card>
    );
  }
  
export default Product;