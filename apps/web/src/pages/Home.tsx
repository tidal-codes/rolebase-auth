import useAuth from '../hooks/auth/useAuth';
import { useLogout } from '../hooks/auth/queries';
import { Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router';

const Home = () => {
    const { user } = useAuth();
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
        <div>
            you logged in as {user?.email}
            <Button loading={isPending} loadingText="loging out" onClick={() => handleLogout()}>logout</Button>
        </div>
    );
}

export default Home;
