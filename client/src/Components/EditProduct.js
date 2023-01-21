import { AddIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons'
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    useDisclosure,
    Button,
    FormControl,
    FormLabel,
    Input,
    IconButton,
    Textarea,
    Select,
    Stack,
    Image
} from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AddNewProduct, UpdateProduct } from '../redux/actions/admin'
import { GetProduct } from '../redux/actions/admin'


export default function EditProduct({data, id}) {
    const dispatch = useDispatch()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { product } = useSelector(state => state.admin)
    const [file, setfile] = useState(null)
    const [info, setInfo] = useState({})
    const [selected, setSelected] = useState('')
    useEffect(() => {
      setfile(product.img)
      setInfo(product)
      setSelected(product.category)
    }, [product])
    
    const {categories} = useSelector(state => state.products)
    const cancelRef = useRef()
    const uploadImageRef = useRef()
    
    const confirm = () => {
        onClose()
        dispatch(UpdateProduct({...info,_id:id, image:file, category: selected, filters:data}))
        
    }
    const getBase64 = (file) => {
        const reader = new FileReader()
        reader.onloadend = () => {
          setfile(reader.result)
        }
        reader.readAsDataURL(file)
    }
    const open = () => {
        dispatch(GetProduct(id))
        onOpen()
    }
    return (
        <>
        <Stack onClick={open} cursor="pointer" _hover={{bg: "pink.300"}} position="absolute" borderBottomRadius="50%" borderTopRadius="50%" top="1rem" left="1rem" bg="red.400" padding=".5rem .5rem">
            <EditIcon color="white" />
        </Stack>
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
                    <Input defaultValue={product.name} onChange={(e) => setInfo({...info, name:e.target.value})} type='text' />
                </FormControl>
                <FormControl my="1rem">
                    <FormLabel>Description:</FormLabel>
                    <Textarea defaultValue={product.description}  onChange={(e) => setInfo({...info, description:e.target.value})}></Textarea>
                </FormControl>
                <FormControl my="1rem">
                    <FormLabel>Price:</FormLabel>
                    <Input defaultValue={product.price}  onChange={(e) => setInfo({...info, price:e.target.value})} type='number' />
                </FormControl>
                <FormControl my="1rem">
                    <FormLabel>Category:</FormLabel>
                    <Select value={selected} selected={product.category} onChange={(e) => setSelected(e.target.value)}>
                        {
                            categories.map(cat => <option key={cat._id} value={cat.name}>{cat.name.charAt(0).toUpperCase() + cat.name.slice(1)}</option> )
                        }
                    </Select>
                </FormControl>
                <FormControl my="1rem">
                    <FormLabel>Amount in inventory:</FormLabel>
                    <Input defaultValue={product.amountInInventory}  onChange={(e) => setInfo({...info, amountInInventory:e.target.value})} type='number' />
                </FormControl>
                <FormControl my="1rem">
                    <FormLabel>Image:</FormLabel>
                    {
                        file ? (<><Image src={file} /><Button my="1rem" onClick={() => setfile(null)} colorScheme="purple">Remove</Button></> ) : (
                            <Button onClick={() => uploadImageRef.current.click()} leftIcon={<AddIcon />} colorScheme="red" cursor="pointer">
                                Upload or drag image
                                <Input onChange={(e) => getBase64(e.target.files[0])} ref={uploadImageRef} type="file" accept='image/*' display="none" />
                            </Button>
                        )
                    }
                </FormControl>


                </AlertDialogBody>
                <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                    Cancel
                </Button>
                <Button onClick={() => confirm()} colorScheme='red' ml={3}>
                    Update
                </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
        </>
    )
}