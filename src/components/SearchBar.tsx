import { Box, ClickAwayListener, TextField } from '@mui/material';
import { useState } from 'react';
import { GenericObject, SEARCH_WIDTH } from '../utils/constants';
import SearchResults from './SearchResults';

interface Props {
  setSearchInput: Function;
  loading: boolean;
  searchResults: GenericObject[];
}

const SearchBox = ({ setSearchInput, loading, searchResults }: Props) => {
  const [open, setOpen] = useState(true);

  return (
    <Box display='flex' justifyContent='center'>
      <ClickAwayListener onClickAway={() => setOpen(false)}>
        <Box
          m={2}
          display='flex'
          flexDirection='column'
          alignItems='center'
          width='100%'
          maxWidth={SEARCH_WIDTH}
        >
          <TextField
            sx={{ width: '100%', mb: 1 }}
            id='gjwSearchBar'
            label='Search for media...'
            variant='filled'
            autoFocus
            autoComplete='off'
            onFocus={() => setOpen(true)}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          {open && (
            <SearchResults
              loading={loading}
              searchResults={searchResults}
              setOpen={setOpen}
            />
          )}
        </Box>
      </ClickAwayListener>
    </Box>
  );
};

export default SearchBox;
