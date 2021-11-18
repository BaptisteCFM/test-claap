import { Input } from '@chakra-ui/input'
import { Box, Flex } from '@chakra-ui/layout'
import './MultiSelectComponent.css'

import { CloseIcon, EmailIcon } from '@chakra-ui/icons'
import { useContext, useRef, useState } from 'react'
import { searchUser } from '../../lib/api'
import { useToast } from '@chakra-ui/toast'
import { InviteListContext } from '../../pages/IndexPage/IndexPage'

type MultiSelectProps = {
    setIsInviteDisabled: (val: boolean) => void
};

const MultiSelectComponent: React.FC<MultiSelectProps> = (props) => {
    const [inviteList, setInviteList] = useState<Array<any>>([]);
    const [suggestion, setSuggestion] = useState<Array<any>>([]);
    const [currentTyping, setCurrentTyping] = useState<string>('');
    const [indexProposition, setIndexProposition] = useState<number>(0);
    const [isValide, setIsValide] = useState<boolean>(false);
    const listContext = useContext(InviteListContext)
    const divRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const toast = useToast()

    const onChangeSearch = async (search: string) => {
        setCurrentTyping(search);
        try {
            const rep = await searchUser(search)
            setSuggestion(rep);
            if ((/^\w+([\.-]?\w+)+@\w+([\.:]?\w+)+(\.[a-zA-Z0-9]{2,3})+$/.test(search))) { // eslint-disable-line
                if (rep.length) {
                    setSuggestion(rep);
                } else {
                    setSuggestion([{ email: search }]);
                }
                setIsValide(true);
                props.setIsInviteDisabled(false)
            }

        } catch (error) {
            console.log('error', error)
            toast({
                title: "Error:",
                description: 'An error has occurred',
                status: "error",
                duration: 3000,
                isClosable: true,
            })
        }
    }

    const addToInviteList = (index: number) => {
        let list = inviteList;
        if (suggestion[index].firstName) {
            list.push({ data: suggestion[index], isEmail: false })
        } else {
            list.push({ data: suggestion[index], isEmail: true })
        }
        setSuggestion(list);
        listContext?.setList(list);
        setCurrentTyping('');
        setSuggestion([]);
        setIndexProposition(0);
        props.setIsInviteDisabled(false);
        if (inputRef && inputRef.current) {
            inputRef.current?.focus();
        }
    }

    const handleKeyDown = (event: any) => {
        if (isValide || suggestion.length) {
            switch (event.key) {
                case 'Enter':
                    addToInviteList(indexProposition);
                    setIsValide(false);
                    break;
                case 'ArrowUp':
                    if (indexProposition >= suggestion.length - 1) {
                        setIndexProposition(indexProposition - 1)
                    }
                    break;
                case 'ArrowDown':
                    if (indexProposition < suggestion.length - 1) {
                        setIndexProposition(indexProposition + 1)
                    }
                    break
                default:
                    break;
            }
        }
    }

    const onRemoveFromList = (index: number) => {
        let filtered = inviteList.filter((invite) => {
            return invite.data.email !== inviteList[index].data.email;
        });
        if (!filtered.length) {
            props.setIsInviteDisabled(true)
        }
        setInviteList(filtered);
    }

    return (
        <Flex direction='column' position={'relative'}>
            <Flex className='multiSelectStyle' ref={divRef}>
                {
                    inviteList && <> {
                        inviteList.map((invite, key) => {
                            return (
                                <div key={key}> {
                                    invite.isEmail ?
                                        <Flex className='chips' alignItems='center' justifyContent='center'>
                                            <EmailIcon mr={2} alignItems='center' />
                                            <Box className='chips__title chips__slice'>{invite.data.email.length > 25 ? invite.data.email.substring(0, 24) + "..." : invite.data.email}</Box>
                                            <CloseIcon className='chips__close' ml={2} fontSize={'11px'} cursor={'pointer'} onClick={() => onRemoveFromList(key)} />
                                        </Flex> :
                                        <Flex className='chips' alignItems='center' justifyContent='center'>
                                            <Flex alignItems={'center'} justifyContent={'center'} mr={2} className='chips-logo'>{invite.data.firstName[0]}</Flex>
                                            <Box className='chips__title'>{invite.data.firstName}</Box>
                                            <CloseIcon className='chips__close' ml={2} fontSize={'11px'} cursor={'pointer'} onClick={() => onRemoveFromList(key)} />
                                        </Flex>
                                }
                                </div>
                            )
                        })
                    }
                    </>
                }
                <Input onKeyDown={handleKeyDown}
                    ref={inputRef}
                    placeholder={`Search names or emails`}
                    _placeholder={{ color: '#FFFFFF', opacity: 0.3, fontSize: '13px' }}
                    value={currentTyping}
                    style={isValide ? { opacity: 1 } : { opacity: 0.3 }}
                    w={'auto'}
                    minW={'25px'}
                    maxW={'100%'}
                    border={'none'}
                    h={'26px'}
                    p={0}
                    m={0}
                    onChange={(e) => { onChangeSearch(e.target.value) }}
                />
            </Flex>
            <Flex direction='column' top={`${divRef.current?.offsetHeight}px`} className='suggestion-list'>
                {
                    suggestion && <>{
                        suggestion.map((sug, key) => {
                            return (
                                <div key={key}>
                                    {sug.firstName ?
                                        <Flex className={key === indexProposition ? 'suggestion-list__item-selecte' : 'suggestion-list__item'} key={key} onClick={() => { addToInviteList(key) }}>
                                            <Flex alignItems={'center'} justifyContent={'center'} mr={2} className='chips-logo'>{sug.firstName[0]}</Flex>
                                            <Box className='suggestion-list__title'>{sug.firstName}</Box>
                                        </Flex> : <Flex className={key  === indexProposition ? 'suggestion-list__item-selecte' : 'suggestion-list__item'} key={key} onClick={() => { addToInviteList(key) }}>
                                            <EmailIcon mr={2} />
                                            <Box className='suggestion-list__title'> {sug.email}</Box>
                                        </Flex>
                                    }
                                </div>)
                        })
                    }
                    </>
                }
            </Flex>
        </Flex>
    )
}

export default MultiSelectComponent