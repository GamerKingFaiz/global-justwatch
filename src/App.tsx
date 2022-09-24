import { Box, createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import Media from './pages/Media';
import NotFound from './pages/NotFound';
import { API_URL } from './utils/constants';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const App = () => {
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState(true);

  const handleSearch = async (searchInput: string) => {
    if (searchInput) {
      const response = await fetch(`${API_URL}/search/${searchInput}`);
      const results = await response.json();
      setSearchResults(results.items);
      setLoading(false);
    } else {
      setSearchResults([]);
    }
  };

  // Only searches after user stops typing
  useEffect(() => {
    searchInput && setLoading(true);
    const delayDebounceFn = setTimeout(() => {
      handleSearch(searchInput);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchInput]);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box p={2} display='flex' flexDirection='column' alignItems='center'>
        <SearchBar setFocused={setFocused} setSearchInput={setSearchInput} />
        {focused && (
          <SearchResults loading={loading} searchResults={searchResults} />
        )}
      </Box>
      <Routes>
        <Route path='/' element={<></>} />
        <Route path='/media/:type/:id' element={<Media />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
