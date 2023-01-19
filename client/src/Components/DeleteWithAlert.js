import { DeleteIcon } from '@chakra-ui/icons'
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    useDisclosure,
    Button
} from '@chakra-ui/react'
import { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { DeleteProduct } from '../redux/actions/admin'


export default function AlertDialogCheck({id, data}) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const dispatch = useDispatch()
    const cancelRef = useRef()
    const confirm = () => {
        onClose()
        dispatch(DeleteProduct({id, data}))
    }

    return (
        <>
        <DeleteIcon onClick={onOpen} color="white" />
        <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={cancelRef}
            onClose={onClose}
        >
            <AlertDialogOverlay>
            <AlertDialogContent>
                <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                Delete Customer
                </AlertDialogHeader>

                <AlertDialogBody>
                Are you sure? You can't undo this action afterwards.
                </AlertDialogBody>

                <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                    Cancel
                </Button>
                <Button colorScheme='red' onClick={confirm} ml={3}>
                    Delete
                </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
        </>
    )
}