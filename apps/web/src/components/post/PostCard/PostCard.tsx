import { usePostStore } from "../../../stores/posts";
import Actions from "./Actions";
import Avatar from "../../ui/avatar";
import { Flex, Text, Box } from "@chakra-ui/react";
import ActionsMenu from "./ActionsMenu";
import { useLayoutEffect, useState } from "react";
import React from "react";

interface PostCardProps {
    postId: string

}

const colorPaletteArray = ["red", "blue", "green", "yellow", "purple", "orange"]

const PostCard = ({ postId }: PostCardProps) => {
    const body = usePostStore(state => state.postsById[postId]?.body);
    const title = usePostStore(state => state.postsById[postId]?.title);
    const authorName = usePostStore(state => state.postsById[postId]?.author.full_name);
    if (!body || !title || !authorName) return null;
    const [colorPalette, setColorPalette] = useState<string | undefined>(undefined);

    useLayoutEffect(() => {
        const index = authorName.charCodeAt(0) % colorPaletteArray.length;
        setColorPalette(colorPaletteArray[index])
    }, [authorName, setColorPalette])

    console.log("re render");

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
                    <Text fontSize="lg" truncate>{title}</Text>
                    <ActionsMenu postId={postId} />
                </Flex>

                <Text fontSize="sm" color="fg.muted">{body.slice(0, 25)}</Text>
                <Flex
                    mt="3"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Actions postId={postId} />
                    <Box>
                        <Avatar
                            colorPalette={colorPalette}
                            name={authorName}
                            size="sm"
                        />
                    </Box>
                </Flex>
            </Flex>
        </Box>
    );
}

export default React.memo(PostCard);
