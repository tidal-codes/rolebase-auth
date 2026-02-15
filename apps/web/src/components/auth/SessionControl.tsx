import { Box, Button, Flex } from '@chakra-ui/react';
import { useLogout } from '../../hooks/auth/queries';
import { useNavigate } from 'react-router';
import Avatar from '../ui/avatar';
import SessionTimer from './SessionTimer';
import Menu from '../ui/menu';
import MenuItem from '../ui/menuItem';
import { LogOut } from 'lucide-react';
import { useState } from 'react';

const SessionControl = () => {
    const { logout, isPending } = useLogout();
    const [openMenu, setOpenMenu] = useState(false);
    const navigate = useNavigate();

    async function handleLogout() {
        try {
            await logout();
            navigate("/auth")
        } catch (e) {
            console.log(e)
        }
    }
    return (
        <Menu
            open={openMenu}
            setOpen={setOpenMenu}
            trigger={
                <Button
                    variant="outline"
                    backgroundColor="white"
                    rounded="full"
                    minW="105px"
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
                    >
                        <SessionTimer seconds={2400} />
                    </Box>
                </Button>
            }>
            <MenuItem
                value='sign-out'
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
