import { useContext } from 'react';
import { Flex, Icon, IconButton, useBreakpointValue } from '@chakra-ui/react';
import { useSidebarDrawer } from '../../contexts/SidebarDrawerContext';
import { RiMenuLine } from 'react-icons/ri';
import Logo from './Logo';
import NotificationsNav from './NotificationsNav';
import Profile from './Profile';
import SearchBox from './SearchBox';
import { AuthContext } from '../../contexts/AuthContext';
 
export function Header() {
  const { user } = useContext(AuthContext)

  const { onOpen } = useSidebarDrawer();

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  }) 

  return (
    <Flex as="header" w="100%" maxWidth={1480} h="20" mx="auto" mt="4" px="6" align="center">
      { !isWideVersion && (
        <IconButton
          aria-label="Open navigation"
          icon={<Icon as={RiMenuLine} />}
          fontSize="24"
          variant="unstyled"
          onClick={onOpen}
          mr="2"
        >

        </IconButton>
      ) }
      <Logo />
      { isWideVersion && <SearchBox /> }
      <Flex align="center" ml="auto">
        <NotificationsNav />
        <Profile 
          showProfileData={isWideVersion} 
          avatar={user?.coverURL} 
          name={user?.name}
          email={user?.email}
        />
      </Flex>
    </Flex>
  )
}