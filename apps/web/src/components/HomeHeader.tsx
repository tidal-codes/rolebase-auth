import { Flex } from '@chakra-ui/react';
import NewPostButton from './post/NewPostButton';
import SessionControl from './auth/SessionControl';
import SearchPosts from './post/SearchPosts';

const HomeHeader = () => {
    return (
        <Flex
            w="full"
            justifyContent="space-between"
            alignItems="center"
            gap="3"
        >
            <SessionControl />
            <SearchPosts />
            <NewPostButton/>
        </Flex>
    );
}

export default HomeHeader;
