import { TextField } from '@mui/material';
import { SEARCH_WIDTH } from '../utils/constants';

interface Props {
  setFocused: Function;
  setSearchInput: Function;
}

const SearchBox = ({ setFocused, setSearchInput }: Props) => {
  return (
    <TextField
      sx={{ width: '100%', maxWidth: SEARCH_WIDTH, mb: 1 }}
      id='gjwSearchBar'
      label='Search for media...'
      variant='filled'
      autoFocus
      autoComplete='off'
      onFocus={() => setFocused(true)}
      onChange={(e) => setSearchInput(e.target.value)}
      onBlur={() => setTimeout(() => setFocused(false), 100)}
    />
  );
};

export default SearchBox;
