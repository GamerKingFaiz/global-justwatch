import HomeIcon from '@mui/icons-material/Home';
import {
  AppBar,
  Box,
  createTheme,
  CssBaseline,
  ThemeProvider,
  Toolbar,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import SearchBar from './components/SearchBar';
import HomePage from './pages/HomePage';
import Media from './pages/Media';
import NotFound from './pages/NotFound';
import StyledLink from './styles/StyledLink';
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
    }, 250);

    return () => clearTimeout(delayDebounceFn);
  }, [searchInput]);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <AppBar position='sticky'>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <StyledLink to={'/'}>
            <HomeIcon fontSize='large' />
          </StyledLink>
          <SearchBar
            setSearchInput={setSearchInput}
            loading={loading}
            searchResults={searchResults}
          />
        </Toolbar>
      </AppBar>

      <Box m={3}>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/media/:type/:id' element={<Media />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Box>
    </ThemeProvider>
  );
};

export default App;
