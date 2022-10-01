import { Home, KeyboardArrowUp } from '@mui/icons-material';
import {
  AppBar,
  Box,
  createTheme,
  CssBaseline,
  Fab,
  ThemeProvider,
  Toolbar,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import ScrollTop from './components/ScrollTop';
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
      <AppBar>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <StyledLink to={'/'}>
            <Home fontSize='large' />
          </StyledLink>
          <SearchBar
            setSearchInput={setSearchInput}
            loading={loading}
            searchResults={searchResults}
          />
        </Toolbar>
      </AppBar>
      <Toolbar id='back-to-top-anchor' sx={{ mb: 8 }} />

      <Box m={3}>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/media/:type/:id' element={<Media />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Box>

      <ScrollTop>
        <Fab aria-label='scroll back to top'>
          <KeyboardArrowUp />
        </Fab>
      </ScrollTop>
    </ThemeProvider>
  );
};

export default App;
