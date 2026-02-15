import { Button } from '@chakra-ui/react';
import { Plus } from 'lucide-react';
import usePostDialog from '../../hooks/post/usePostDialog';

const NewPostButton = () => {
    const { handleOpen } = usePostDialog();
    return (
        <Button
            onClick={() => handleOpen(true)}
            rounded="full"
        >
            <Plus />
            new post
        </Button>
    );
}

export default NewPostButton;
