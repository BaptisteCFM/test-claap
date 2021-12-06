import { Button } from '@chakra-ui/button'
import { Box, Flex } from '@chakra-ui/layout'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
} from "@chakra-ui/react"
import { useDisclosure } from '@chakra-ui/hooks'
import MultiSelectComponent from '../../components/MultiSelectComponent/MultiSelectComponent'
import { createContext, useState } from 'react'
import { useToast } from '@chakra-ui/toast'
import { Helmet } from "react-helmet";
import ArtosPreview from '../../assets/artos_preview.png'
interface ListContextInterface {
    list: Array<any>,
    setList: React.Dispatch<React.SetStateAction<any[]>>,
}

export const InviteListContext = createContext<ListContextInterface | null>(null);

const TestPage = () => {
    const [list, setList] = useState<Array<any>>([]);
    const [isInviteDisabled, setIsInviteDisabled] = useState<boolean>(true);
    const value = { list, setList };
    const [invitationList, setInvitationList] = useState<Array<any>>([]);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();

    const sendInvitation = () => {
        setInvitationList(list);
        toast({
            title: "Success:",
            description: 'All invitations have been sent',
            status: "success",
            duration: 4000,
            isClosable: true,
        })
        setIsInviteDisabled(true);
        onClose();
    }


    return (
        <InviteListContext.Provider value={value}>
            <Helmet>
                <meta property="og:title" content="ARTOS: NFT OS built on Tezos" />
                <meta property="og:type" content="video.movie" />
                <meta property="og:url" content="https://www.imdb.com/title/tt0117500/" />
                <meta property="og:image" content={ArtosPreview} />
                <meta name="description" content={'JADORE C"EST PAS DES LOL'} />

                <meta name="twitter:title" content="ARTOS: NFT OS built on Tezos " />
                <meta name="twitter:image" content={ArtosPreview} />
                <meta name="twitter:description" content={'JADORE C"EST PAS DES LOL'} />

                <meta name="twitter:card" content="summary_large_image" />
            </Helmet>
            <Flex direction={'column'} position={'absolute'}>
                {
                    invitationList && invitationList.map((sug, key) => {
                        return (
                            <div key={key}>
                                {sug.data.email}
                            </div>)
                    })
                }
            </Flex>
            <Flex alignItems={'center'} justifyContent={'center'} height={'100vh'}>
                <Button _hover={{ background: '#EE748F' }} onClick={onOpen} backgroundColor={'#47475E'} color={'#E7ECF0'}>lol</Button>
            </Flex>
            <Modal isOpen={isOpen} onClose={onClose} isCentered size={'xl'}>
                <ModalOverlay />
                <ModalContent maxW={'528px'} backgroundColor={'#272D45'} color={'#DBE1E6'} borderRadius={'10px'} p={'64px'} >
                    <ModalHeader p={0} mb={'2rem'} textAlign={'center'} fontSize={'24px'} fontWeight={'normal'}>Invite members</ModalHeader>
                    <ModalBody p={0} margin={0}>
                        <Box fontSize={'15px'} mb={2}>Email invite</Box>
                        <Box color={'#8C9DB5'} fontSize={'15px'} mb={4}>Send members an email invitation to join this workspace</Box>
                        <Flex alignItems={'center'}>
                            <MultiSelectComponent setIsInviteDisabled={setIsInviteDisabled} />
                            <Button _hover={{ background: '#2C54EA', opacity: '0.8' }} onClick={sendInvitation} disabled={isInviteDisabled} backgroundColor={'#2C54EA'} borderRadius={'10px'} p={'9px 20px'} fontSize={'13px'} fontWeight={'bold'} w={'78px'}>Invite</Button>
                        </Flex>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </InviteListContext.Provider>
    )
}

export default TestPage