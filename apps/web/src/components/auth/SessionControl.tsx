import { Box, Button, Flex } from '@chakra-ui/react';
import { useLogout, useRemainingSession } from '../../hooks/auth/queries';
import { useNavigate } from 'react-router';
import Avatar from '../ui/avatar';
import SessionTimer from './SessionTimer';
import Menu from '../ui/menu';
import MenuItem from '../ui/menuItem';
import { LogOut } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

const SessionControl = () => {
    const { logout, isPending } = useLogout();
    const [openMenu, setOpenMenu] = useState(false);
    const { data, isLoading } = useRemainingSession();
    const client = useQueryClient();
    const navigate = useNavigate();

    async function handleLogout() {
        try {
            await logout();
            navigate("/auth")
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        client.invalidateQueries({ queryKey: ["remaining-session"] })
    }, [openMenu])

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
                        {
                            isLoading ? (
                                "isLoading"
                            ) : (
                                <SessionTimer seconds={data!.data.data.secondsRemaining} />
                            )
                        }
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
