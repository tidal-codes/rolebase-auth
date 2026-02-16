import { Button, Spinner } from '@chakra-ui/react';
import { Delete, Edit, EllipsisVertical, Pencil, Trash } from 'lucide-react';
import { usePostStore } from '../../../stores/posts';
import Menu from '../../ui/menu';
import { useState } from 'react';
import MenuItem from '../../ui/menuItem';

interface ActionsMenuProps {
    postId: string
}

const ActionsMenu = ({ postId }: ActionsMenuProps) => {
    const postsById = usePostStore(state => state.postsById);
    const { pending } = postsById[postId];
    const [open, setOpen] = useState(false);
    return (
        <>

            {
                pending ? (
                    <Button variant="ghost" size="small-icon">
                        <Spinner />
                    </Button>

                ) : (
                    <Menu
                        trigger={
                            <Button variant="ghost" size="small-icon">
                                <EllipsisVertical />
                            </Button>
                        }
                        open={open}
                        setOpen={setOpen}
                    >
                        <MenuItem
                            value='edit-post'
                            onClick={() => console.log(postId)}
                        >
                            <Pencil />
                            Edit Post
                        </MenuItem>
                        <MenuItem
                            value='delete-post'
                            onClick={() => console.log(postId)}
                        >
                            <Trash />
                            Delete Post
                        </MenuItem>
                    </Menu>

                )
            }
        </>

    );
}

export default ActionsMenu;
