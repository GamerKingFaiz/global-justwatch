import { Box, TextField } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { GenericObject, SEARCH_WIDTH } from '../utils/constants';
import SearchResults from './SearchResults';

interface Props {
  setSearchInput: Function;
  loading: boolean;
  searchResults: GenericObject[];
}

const SearchBox = ({ setSearchInput, loading, searchResults }: Props) => {
  const [open, setOpen] = useState(false);

  const escFunction = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', escFunction, false);

    return () => {
      document.removeEventListener('keydown', escFunction, false);
    };
  }, [escFunction]);

  return (
    <Box
      m={2}
      display='flex'
      flexDirection='column'
      alignItems='center'
      width='100%'
      maxWidth={SEARCH_WIDTH}
    >
      <TextField
        sx={{ width: '100%', mb: 1, zIndex: 2 }}
        id='gjwSearchBar'
        label='Search for media...'
        variant='filled'
        autoComplete='off'
        onClick={() => setOpen(true)}
        onChange={(e) => {
          setSearchInput(e.target.value);
          setOpen(true);
        }}
      />
      {open && (
        <SearchResults
          loading={loading}
          searchResults={searchResults}
          setOpen={setOpen}
        />
      )}
      {/* Click blocker */}
      {open && searchResults.length > 0 && (
        <Box
          position='fixed'
          width='100%'
          height='100%'
          top={0}
          left={0}
          bgcolor='rgba(0,0,0,0.5)'
          onClick={() => setOpen(false)}
        ></Box>
      )}
    </Box>
  );
};

export default SearchBox;
