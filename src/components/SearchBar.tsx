import { FormControl, InputLabel, OutlinedInput } from '@mui/material';
import { SEARCH_WIDTH } from '../utils/constants';

interface Props {
  setFocused: Function;
  setSearchInput: Function;
}

const SearchBox = ({ setFocused, setSearchInput }: Props) => {
  return (
    <FormControl sx={{ width: SEARCH_WIDTH, mb: 1 }}>
      <InputLabel htmlFor='gjwSearchBar'>Search for media...</InputLabel>
      <OutlinedInput
        id='gjwSearchBar'
        type='search'
        autoFocus
        autoComplete='off'
        // defaultValue={searchParams}
        onFocus={() => setFocused(true)}
        onChange={(e) => setSearchInput(e.target.value)}
        onBlur={() => setTimeout(() => setFocused(false), 100)}
        label='Search for media...'
      />
    </FormControl>
  );
};

export default SearchBox;
