import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { Bookmark, Heart } from "lucide-react";

const PostCard = () => {
    return (
        <Box
            p="2"
            rounded="md"
            border="1px solid"
            borderColor="border"
        >
            <Flex
                w="full"
                flexDir="column"
                gap="1"
            >
                <Text fontSize="lg">post title</Text>
                <Text color="fg.muted">this is a post description and it really is</Text>
                <Flex>
                    <Button
                        variant="ghost"
                        size="small-icon"
                    >
                        <Heart />
                    </Button>
                    <Button
                        variant="ghost"
                        size="small-icon"
                    >
                        <Bookmark/>
                    </Button>
                </Flex>
            </Flex>
        </Box>
    );
}

export default PostCard;
