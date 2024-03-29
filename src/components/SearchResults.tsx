import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Skeleton,
  Typography,
} from '@mui/material';
import { grey } from '@mui/material/colors';
import StyledLink from '../styles/StyledLink';
import { GenericObject, SEARCH_HEIGHT, SEARCH_WIDTH } from '../utils/constants';

interface Props {
  loading: boolean;
  searchResults: GenericObject[];
  setOpen: Function;
}

const SearchResults = ({ loading, searchResults, setOpen }: Props) => {
  return (
    <Box
      zIndex={2}
      position='absolute'
      top={80}
      bgcolor={grey[900]}
      width={SEARCH_WIDTH}
      display='flex'
      flexDirection='column'
      alignItems='center'
      borderRadius='4px'
    >
      {loading ? (
        <Skeleton
          variant='rounded'
          width={SEARCH_WIDTH}
          height={SEARCH_HEIGHT}
        />
      ) : (
        searchResults.map((result: GenericObject, index) => {
          return (
            <StyledLink
              to={result.node.content.fullPath}
              key={index}
              onClick={() => setOpen(false)}
            >
              <Card
                sx={{
                  mb: index === 3 ? 0 : 1,
                  width: SEARCH_WIDTH,
                  height: SEARCH_HEIGHT,
                  display: 'flex',
                }}
              >
                {result.node.content.posterUrl && (
                  <CardMedia
                    sx={{ width: 53 }}
                    component='img'
                    image={`https://images.justwatch.com/${result.node.content.posterUrl}`}
                    alt='media poster'
                  />
                )}
                <CardContent>
                  <Typography>{result.node.content.title}</Typography>
                  <Typography variant='caption' color={grey[600]}>
                    {result.node.objectType},{' '}
                    {result.node.content.originalReleaseYear}
                  </Typography>
                </CardContent>
              </Card>
            </StyledLink>
          );
        })
      )}
    </Box>
  );
};

export default SearchResults;
