import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { useLogout } from '../../hooks/auth/queries';
import Avatar from '../ui/avatar';
import Menu from '../ui/menu';
import MenuItem from '../ui/menuItem';
import { LogOut } from 'lucide-react';
import { useState } from 'react';
import useAuth from '../../hooks/auth/useAuth';

const SessionControl = () => {
    const { handleLogout } = useLogout();
    const [openMenu, setOpenMenu] = useState(false);
    const { user } = useAuth();

    return (
        <Menu
            open={openMenu}
            setOpen={setOpenMenu}
            trigger={
                <Button
                    variant="outline"
                    backgroundColor="white"
                    rounded="full"
                    minW={{
                        mdDown : "auto",
                        lg : "105px"
                    }}
                    justifyContent="flex-start"
                    px="1"
                    gap="0"
                >
                    <Box>
                        <Avatar name="taha darvishi" />
                    </Box>
                    <Box
                        flex="1"
                        mx="auto"
                        px="2"
                        hideBelow="md"
                    >
                        <Text>{user?.email}</Text>
                    </Box>
                </Button>
            }>
            <MenuItem
                value='sign-out'
                onClick={() => handleLogout()}
            >
                <Flex
                    gap="2"
                    color="fg.error"
                >
                    <LogOut />
                    sign out
                </Flex>
            </MenuItem>

        </Menu>

    );
}

export default SessionControl;
