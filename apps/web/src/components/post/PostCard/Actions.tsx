import { Box, Button } from '@chakra-ui/react';
import { Bookmark, ThumbsUp } from 'lucide-react';

const Actions = () => {
    return (
        <Box>
            <Button
                variant="ghost"
                size="medium-icon"
            >
                <ThumbsUp />
            </Button>
            <Button
                variant="ghost"
                size="medium-icon"
            >
                <Bookmark />
            </Button>
        </Box>
    );
}

export default Actions;
