import { Box, Button, chakra } from '@chakra-ui/react';
import { Bookmark, ThumbsUp } from 'lucide-react';
import { useBookmark, useLike } from '../../../hooks/post/queries';
import { usePostStore } from '../../../stores/posts';

interface ActionsProps {
    postId: string
}

const ThumbsUpIcon = chakra(ThumbsUp);

const Actions = ({ postId }: ActionsProps) => {
    const liked = usePostStore(state => state.postsById[postId]?.liked ?? false);
    const saved = usePostStore(state => state.postsById[postId]?.saved ?? false);
    const { like } = useLike();
    const { save } = useBookmark();
    return (
        <Box>
            <Button
                variant="ghost"
                size="medium-icon"
                onClick={() => like({ liked: !liked, postId })}
            >
                {liked ? (
                    <ThumbsUpIcon fill='fg.info/60' />
                ) : (
                    <ThumbsUp />
                )}
            </Button>
            <Button
                variant="ghost"
                size="medium-icon"
                onClick={() => save({ saved: !saved, postId })}
            >
                {saved ? (
                    <Bookmark fill="black" />
                ) : (
                    <Bookmark />
                )}
            </Button>
        </Box>
    );
}

export default Actions;
