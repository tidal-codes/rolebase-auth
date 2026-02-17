import { usePostStore } from "../../../stores/posts";
import Actions from "./Actions";
import Avatar from "../../ui/avatar";
import { Flex, Text, Box, Button } from "@chakra-ui/react";
import ActionsMenu from "./ActionsMenu";

interface PostCardProps {
    postId: string

}

const PostCard = ({ postId }: PostCardProps) => {
    const postsById = usePostStore(state => state.postsById);
    const { title, body, liked, saved, author: { full_name } } = postsById[postId];
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
                <Flex alignItems="center" justifyContent="space-between">
                    <Text fontSize="lg">{title}</Text>
                    <ActionsMenu postId={postId} />
                </Flex>

                <Text fontSize="sm" color="fg.muted">{body.slice(0, 25)}</Text>
                <Flex
                    mt="3"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Actions
                        postId={postId}
                        liked={liked}
                        saved={saved}
                    />
                    <Box>
                        <Avatar name={full_name} size="sm" />
                    </Box>
                </Flex>
            </Flex>
        </Box>
    );
}

export default PostCard;
