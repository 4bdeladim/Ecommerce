
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
    Image,
    MenuItem,
    Text
} from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { EditUserInfo, GetUser, UpdateProduct } from '../redux/actions/admin'


export default function EditUser({data, id}) {
    const dispatch = useDispatch()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { user } = useSelector(state => state.admin)
    const [info, setInfo] = useState({})
    useEffect(() => {
      setInfo(user)
    }, [user])
    
    const cancelRef = useRef()
    
    const confirm = () => {
        onClose()
        dispatch(EditUserInfo({...info,id}))
    }
    
    const open = () => {
        dispatch(GetUser(id))
        onOpen()
    }
    return (
        <>
        <MenuItem onClick={open}>Edit Info</MenuItem>
        <AlertDialog
            
            isOpen={isOpen}
            leastDestructiveRef={cancelRef}
            onClose={onClose}
        >
            <AlertDialogOverlay>
            <AlertDialogContent>
                
                <AlertDialogBody>
                    <FormControl>
                        <FormLabel my=".5rem">
                            Username:
                        </FormLabel>
                        <Input defaultValue={user.username} my=".5rem" onChange={(e) => setInfo({...info, username:e.target.value})} />
                        <FormLabel my=".5rem">
                            Email:
                        </FormLabel>
                        <Input defaultValue={user.email} my=".5rem" onChange={(e) => setInfo({...info, email:e.target.value})} />
                        <FormLabel my=".5rem">
                            Shipping and Billing adress:
                        </FormLabel>
                        <Input defaultValue={user.SBadress} my=".5rem" onChange={(e) => setInfo({...info, SBadress:e.target.value})} />
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