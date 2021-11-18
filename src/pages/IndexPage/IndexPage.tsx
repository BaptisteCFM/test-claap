// import { useEffect, useState } from 'react'
import { Button } from '@chakra-ui/button'
import { Box, Flex } from '@chakra-ui/layout'
// import { searchUser } from '../../lib/api'
import './IndexPage.css'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    // ModalFooter,
    ModalBody,
    // ModalCloseButton,
} from "@chakra-ui/react"

import { useDisclosure } from '@chakra-ui/hooks'
// import Multiselect from 'multiselect-react-dropdown';
// import { Users } from '../../lib/api'
import MultiSelectComponent from '../../components/MultiSelectComponent/MultiSelectComponent'
import { useState } from 'react'


// const customMultiselect = {
//     // searchBox: {
//     //     border: 'none',
//     //     fontSize: '10px',
//     //     minHeight: '50px',
//     //     color: 'red',
//     // },
//     chips: {
//         background: 'red',
//     },
// };

const IndexPage = () => {
    // const [data, setData] = useState<Array<Coin>>([]);
    // const [search, setSearch] = useState<string>('');
    const [isInviteDisabled, setIsInviteDisabled] = useState<boolean>(true);
    // const [isSearching, setIsSearching] = useState<boolean>(false);

    const { isOpen, onOpen, onClose } = useDisclosure()



    return (
        <>
            <Flex alignItems={'center'} justifyContent={'center'} height={'100vh'}>
                <Button onClick={onOpen} backgroundColor={'#47475E'} color={'#E7ECF0'}>Invite teammates</Button>
            </Flex>

            <Modal isOpen={isOpen} onClose={onClose} isCentered size={'xl'}>
                <ModalOverlay />
                <ModalContent maxW={'528px'} backgroundColor={'#272D45'} color={'#DBE1E6'} borderRadius={'10px'} p={'64px'} >
                    <ModalHeader p={0} mb={'2rem'} textAlign={'center'} fontSize={'24px'} fontWeight={'normal'}>Invite members</ModalHeader>
                    {/* <ModalCloseButton /> */}
                    <ModalBody p={0} margin={0}>
                        <Box fontSize={'15px'} mb={2}>Email invite</Box>
                        <Box color={'#8C9DB5'} fontSize={'15px'} mb={4}>Send members an email invitation to join this workspace</Box>
                        <Flex alignItems={'center'}>
                            <MultiSelectComponent setIsInviteDisabled={setIsInviteDisabled} />
                            <Button disabled={isInviteDisabled} backgroundColor={'#2C54EA'} borderRadius={'10px'} p={'9px 20px'} fontSize={'13px'} fontWeight={'bold'} w={'78px'}>Invite</Button>
                        </Flex>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

export default IndexPage