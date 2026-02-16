import { Box, Input, InputGroup } from '@chakra-ui/react';
import { Search } from 'lucide-react';
import { useSearchStore } from '../../stores/search';


const SearchPosts = () => {
    const search = useSearchStore(state => state.search);
    const setSearch = useSearchStore(state => state.setSearch);
    return (
        <Box w="full" maxW="md">
            <InputGroup startElement={<Search />}>
                <Input
                    placeholder='search here...'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    rounded="full"
                />
            </InputGroup>
        </Box>
    );
}

export default SearchPosts;
