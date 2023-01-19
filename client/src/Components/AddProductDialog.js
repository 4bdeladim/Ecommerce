import { AddIcon, DeleteIcon } from '@chakra-ui/icons'
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
import { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AddNewProduct, DeleteProduct } from '../redux/actions/admin'


export default function AddProductDialog({data}) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [file, setfile] = useState(null)
    const [info, setInfo] = useState({category:"men"})
    const dispatch = useDispatch()
    const {categories} = useSelector(state => state.products)
    const cancelRef = useRef()
    const uploadImageRef = useRef()
    const confirm = () => {
        onClose()
        dispatch(AddNewProduct({...info, image:file, data}))
    }
    const getBase64 = (file) => {
        const reader = new FileReader()
        reader.onloadend = () => {
          setfile(reader.result)
        }
        reader.readAsDataURL(file)
    }

    return (
        <>
        <Button
            my="1rem"
            onClick={onOpen}
            colorScheme='red'
            aria-label='Call Segun'
            size='lg'
            leftIcon={<AddIcon />}
        >Add new Product</Button>
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
                    <Input onChange={(e) => setInfo({...info, name:e.target.value})} type='text' />
                </FormControl>
                <FormControl my="1rem">
                    <FormLabel>Description:</FormLabel>
                    <Textarea  onChange={(e) => setInfo({...info, description:e.target.value})}></Textarea>
                </FormControl>
                <FormControl my="1rem">
                    <FormLabel>Price:</FormLabel>
                    <Input  onChange={(e) => setInfo({...info, price:e.target.value})} type='number' />
                </FormControl>
                <FormControl my="1rem">
                    <FormLabel>Category:</FormLabel>
                    <Select  onChange={(e) => setInfo({...info, category:e.target.value})}>
                        {
                            categories.map(cat => <option key={cat._id} value={cat.name}>{cat.name.charAt(0).toUpperCase() + cat.name.slice(1)}</option> )
                        }
                    </Select>
                </FormControl>
                <FormControl my="1rem">
                    <FormLabel>Amount in inventory:</FormLabel>
                    <Input  onChange={(e) => setInfo({...info, amountInInventory:e.target.value})} type='number' />
                </FormControl>
                <FormControl my="1rem">
                    <FormLabel>Image:</FormLabel>
                    {
                        file ? (<Image src={file} /> ) : (
                            <Button onClick={() => uploadImageRef.current.click()} leftIcon={<AddIcon />} colorScheme="red" cursor="pointer">
                                Upload or drag image
                                <Input onChange={(e) => getBase64(e.target.files[0])} ref={uploadImageRef} type="file" display="none" />
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
                    Add
                </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
        </>
    )
}