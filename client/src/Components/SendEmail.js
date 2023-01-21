
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogContent,
    AlertDialogOverlay,
    useDisclosure,
    Button,
    FormControl,
    FormLabel,
    Input,
    MenuItem,
} from '@chakra-ui/react'
import {useRef, useState } from 'react'
import { useDispatch} from 'react-redux'
import {SendEmail as SendEmailAction} from '../redux/actions/admin'


export default function SendEmail({id}) {
    const dispatch = useDispatch()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [messageTitle, setMessageTitle] = useState("")
    const [message, setMessage] = useState("")
    const cancelRef = useRef()
    
    const confirm = () => {
        onClose()
        dispatch(SendEmailAction({id, messageTitle, message}))
    }
    
    return (
        <>
        <MenuItem onClick={onOpen}>Send Email</MenuItem>
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
                            Message Title:
                        </FormLabel>
                        <Input required my=".5rem" onChange={(e) => setMessageTitle(e.target.value)} />
                        <FormLabel my=".5rem">
                            Message:
                        </FormLabel>
                        <Input required  my=".5rem" onChange={(e) => setMessage(e.target.value)} />
                    </FormControl>
                </AlertDialogBody>
                <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                    Cancel
                </Button>
                <Button onClick={() => confirm()} colorScheme='red' ml={3}>
                    Send
                </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
        </>
    )
}