import GitHubIcon from '@mui/icons-material/GitHub';
import { Box, Skeleton, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import StyledAnchor from '../styles/StyledAnchor';
import StyledLink from '../styles/StyledLink';
import { API_URL, GenericObject, stripLetters } from '../utils/constants';

const HomePage = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<GenericObject | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch(`${API_URL}/search`)
      .then((response) => response.json())
      .then((result) => {
        setData(result);
        setLoading(false);
      });
  }, []);

  return (
    <>
      {/* Welcome info */}
      <Typography variant='h4' mb={1}>
        Welcome to Global JustWatch
      </Typography>
      <Typography>
        Find what services are streaming your favorite media around the world!
      </Typography>
      <Typography variant='caption'>
        Disclaimer: This is a personal project and has no affiliation with
        JustWatch. Check out the site's code on{' '}
        <StyledAnchor
          href='https://github.com/GamerKingFaiz/global-justwatch'
          style={{ textDecoration: 'underline' }}
        >
          GitHub
        </StyledAnchor>{' '}
        <GitHubIcon fontSize='inherit' />.
      </Typography>

      {/* Popular media posters */}
      <Typography variant='h4' mt={2} mb={2}>
        Popular Media
      </Typography>
      <Box>
        {loading ? (
          <Skeleton variant='rounded' height={200} />
        ) : (
          <Box
            display='grid'
            gridTemplateColumns='repeat(auto-fill,minmax(164px,1fr))'
            gap={2}
          >
            {data?.items.map((media: GenericObject, index: number) => (
              <StyledLink
                to={`/media/${media.object_type}/${media.id}`}
                key={index}
              >
                <img
                  src={`https://images.justwatch.com/poster/${stripLetters(
                    media.poster
                  )}/s592`}
                  alt='media poster'
                  width={'100%'}
                  style={{ borderRadius: '5px' }}
                />
              </StyledLink>
            ))}
          </Box>
        )}
      </Box>
    </>
  );
};

export default HomePage;
