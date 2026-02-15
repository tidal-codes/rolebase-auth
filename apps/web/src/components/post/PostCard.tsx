import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { Bookmark, ThumbsUp } from "lucide-react";
import Avatar from "../ui/avatar";

const PostCard = () => {
    return (
        <Box
            p="1"
            rounded="md"
            border="1px solid"
            borderColor="border"
            bgColor="gray.300/50"
            backdropFilter="blur(xl) saturate(180%)"
            backdropBlur="xl"
            _before={{
                content: '""',
                position: 'absolute',
                inset: 0,
                bg: 'inherit',
                rounded: 'inherit',
                zIndex: -1,
                opacity: 0.85,
            }}
            position="relative"
        >
            <Flex
                w="full"
                rounded="sm"
                p="2"
                flexDir="column"
                gap="1"
                backgroundColor="white"
            >
                <Text fontSize="lg">post title</Text>
                <Text color="fg.muted">this is a post description and it really is</Text>
                <Flex
                    mt="3"
                    justifyContent="space-between"
                    alignItems="center"
                >
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
                    <Box>
                        <Avatar name="taha darvishi" size="sm" />
                    </Box>
                </Flex>
            </Flex>
        </Box>
    );
}

export default PostCard;
