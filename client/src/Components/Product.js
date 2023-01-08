import { Card,Button,ButtonGroup,Divider, Stack, Image, Heading, Text,  CardBody, CardFooter } from '@chakra-ui/react'
  

  
function Product(props) {
  const data = props.data
    return (
      <Card boxShadow="xs" maxW='sm'>
        <CardBody>
          <Image
            src={data.imageURL}
            alt={data.name}
            borderRadius='lg'
            maxW="300px"
          />
          <Stack mt='6' spacing='3'>
            <Heading size='md'>{data.name}</Heading>
            <Text color="grey">
              {data.descreption}
            </Text>
            <Text color='red.400' fontSize='2xl'>
              {data.price} $
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