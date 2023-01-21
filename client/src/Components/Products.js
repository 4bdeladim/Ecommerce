import { AddIcon, ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons'
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogOverlay, Button, Flex, FormControl, FormLabel, Input, RangeSlider, RangeSliderFilledTrack, RangeSliderThumb, RangeSliderTrack, Select, Stack, Text, useDisclosure, useMediaQuery } from '@chakra-ui/react'
import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { AddCategory } from '../redux/actions/admin'
import { GetCategories, GetProducts } from '../redux/actions/products'
import AddProductDialog from './AddProductDialog'
import Product from './Product'

const Products = () => {
  const {category} = useParams()
  const {pages, categories, products} = useSelector(state => state.products)
  const [categorySelected, setcategorySelected] = useState(category)
  const {role} = useSelector(state => state.auth)
  const [categoryName, setCategoryName] = useState("")
  const [sort, setsort] = useState("A-Z")
  const [selected, setSelected] = useState(1)
  const [priceRange, setPriceRange] = useState([0, 2000])
  const [issmallerthan870] = useMediaQuery("(max-width:870px)")
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(GetProducts({page: selected, sort, category:categorySelected, min: priceRange[0], max: priceRange[1]})) 
    dispatch(GetCategories())
    return () => {}
  }, [selected, categorySelected, sort, priceRange])
  const next = () => {
    setSelected(selected + 1)
  }
  const back = () => {
    setSelected(selected - 1)
  }

  const onPageSelect = (e) => {
    setSelected(e)
  }
  
  const confirm = () => {
    onClose()
    dispatch(AddCategory(categoryName))
  }
  
  return (
    <Flex w="100%"  px={issmallerthan870 ? "1rem" : "4rem"} flexDirection="column" alignItems="center" columnGap="2rem">
      
      {
        role === "admin" || role === "owner" ? (
          <>
            <Button
                my="1rem"
                onClick={onOpen}
                colorScheme='red'
                aria-label='Call Segun'
                size='lg'
                leftIcon={<AddIcon />}
              >Add new Category</Button>
            <AlertDialog
                
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogBody py="1rem">
                    <FormControl my="1rem">
                        <FormLabel>Name:</FormLabel>
                        <Input onChange={(e) => setCategoryName(e.target.value)} type='text' />
                    </FormControl>
                    </AlertDialogBody>
                    <AlertDialogFooter>
                    <Button ref={cancelRef} onClick={onClose}>
                        Cancel
                    </Button>
                    <Button onClick={() => confirm()} colorScheme='red' ml={3}>
                        Add
                    </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
        ) : null
      }
      {
        role === "admin" || role === "owner" ? <AddProductDialog data={{page: selected, sort, category:categorySelected, min: priceRange[0], max: priceRange[1]}} /> : null
      }
      <Flex flexWrap="wrap" gap="1rem" w="100%" my="2rem" justifyContent="space-around" alignItems="center">
        <Flex  flexDirection="column" justifyContent="flex-start">
          <Text>Category:</Text>
          <Select defaultValue={categorySelected} onChange={(e) => setcategorySelected(e.target.value)}>
            <option value="all">All</option>
            {
              categories.map(cat => <option key={cat._id} value={cat.name}>{cat.name.charAt(0).toUpperCase() + cat.name.slice(1)}</option> )
            }
          </Select>
        </Flex>
        <Flex  flexDirection="column" justifyContent="flex-start">
          <Text>Sort:</Text>
          <Select m="0" onChange={(e) => setsort(e.target.value)}>
            <option value="A-Z">A-Z</option>
            <option value="Z-A">Z-A</option>
            <option value="H-L">Price: H-L</option>
            <option value="L-H">Price: L-H</option>
            <option value="hr">Heighest rating</option>
          </Select>
        </Flex>
        <Flex  flexDirection="column" justifyContent="flex-start" w="300px">
          <Text>
            Price:
          </Text>
          <RangeSlider
            aria-label={['min', 'max']}
            colorScheme='red'
            min={0}
            max={2000}
            defaultValue={[0, 2000]}
            onChangeEnd={(e) => setPriceRange(e)}
          >
            <RangeSliderTrack>
              <RangeSliderFilledTrack />
            </RangeSliderTrack>
            <RangeSliderThumb index={0} />
            <RangeSliderThumb index={1} />
          </RangeSlider>
          <Flex justifyContent="space-between">
            <Text>{priceRange[0]}</Text>
            <Text>{priceRange[1]}</Text>
          </Flex>
        </Flex>
        
      </Flex>
      <Flex w="100%" gap="1rem" flexWrap="wrap" justifyContent="center">
        { 
                products.map((el) => (
                    <Product key={el._id} data={{page: selected, sort, category:categorySelected, min: priceRange[0], max: priceRange[1]}} product={el}  />
                ))
        }
        
      </Flex>
      <Flex gap="1rem" my="2rem">
            {selected !== 1 ? (
              <Button colorScheme="blackAlpha"  onClick={() => back()} >
                <ArrowBackIcon  />
              </Button>
            ) : ""}
          {
            pages.slice(selected - 1, selected+5).map((el, index) => (
              <Button onClick={() => onPageSelect(el)} colorScheme={selected === el ? "red" : "blackAlpha"} key={index}>
                {el}
              </Button>
            ))
          }
          {
            pages.length > 5 && selected < pages.length ? (
              <Button onClick={() => next()} colorScheme="blackAlpha">
                <ArrowForwardIcon  />
              </Button>
            ) : ""
          }
      </Flex>
    </Flex>
  )
}

export default Products