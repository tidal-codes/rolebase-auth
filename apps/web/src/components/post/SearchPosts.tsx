import { Box, Input, InputGroup } from '@chakra-ui/react';
import { Search } from 'lucide-react';


const SearchPosts = () => {
    return (
        <Box w="full" maxW="md">
            <InputGroup startElement={<Search />}>
                <Input
                    placeholder='search here...'
                    rounded="full"
                />
            </InputGroup>
        </Box>
    );
}

export default SearchPosts;
