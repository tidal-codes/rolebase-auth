import { Button, Spinner } from '@chakra-ui/react';
import { EllipsisVertical, Pencil, Trash } from 'lucide-react';
import { usePostStore } from '../../../stores/posts';
import Menu from '../../ui/menu';
import { useState } from 'react';
import MenuItem from '../../ui/menuItem';
import { useDeletePost } from '../../../hooks/post/queries';
import usePostDialog from '../../../hooks/post/usePostDialog';

interface ActionsMenuProps {
    postId: string
}

const ActionsMenu = ({ postId }: ActionsMenuProps) => {
    const pending = usePostStore(state => state.postsById[postId].pending);
    const { handleOpen } = usePostDialog();
    const { deletePost } = useDeletePost(postId);
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
                            onClick={() => handleOpen(true, postId)}
                        >
                            <Pencil />
                            Edit Post
                        </MenuItem>
                        <MenuItem
                            value='delete-post'
                            onClick={() => deletePost()}
                            color="fg.error"
                            _hover={{
                                bgColor: "bg.error"
                            }}
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
