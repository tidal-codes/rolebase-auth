import { Box, Button } from '@chakra-ui/react';
import { useLogout } from '../../hooks/auth/queries';
import { useNavigate } from 'react-router';

const SessionControl = () => {
    const { logout, isPending } = useLogout();
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
        <Box>
            <Button
                rounded="full"
                loading={isPending}
                onClick={() => handleLogout()}
            >
                sign out
            </Button>
        </Box>
    );
}

export default SessionControl;
