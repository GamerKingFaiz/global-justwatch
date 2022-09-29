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
import {
  GenericObject,
  SEARCH_HEIGHT,
  SEARCH_WIDTH,
  stripLetters,
} from '../utils/constants';

interface Props {
  loading: boolean;
  searchResults: GenericObject[];
  setOpen: Function;
}

const SearchResults = ({ loading, searchResults, setOpen }: Props) => {
  return loading ? (
    <Skeleton variant='rounded' width={SEARCH_WIDTH} height={SEARCH_HEIGHT} />
  ) : (
    <Box zIndex={2}>
      {searchResults.map((result: GenericObject, index) => {
        return (
          <StyledLink
            to={`/media/${result.object_type}/${result.id}`}
            key={index}
            onClick={() => setOpen(false)}
          >
            <Card
              sx={{
                mb: 1,
                width: SEARCH_WIDTH,
                height: SEARCH_HEIGHT,
                display: 'flex',
              }}
            >
              {result.poster && (
                <CardMedia
                  sx={{ width: 53 }}
                  component='img'
                  image={`https://images.justwatch.com/poster/${stripLetters(
                    result.poster
                  )}/s592`}
                  alt='media poster'
                />
              )}
              <CardContent>
                <Typography>{result.title}</Typography>
                <Typography variant='caption' color={grey[600]}>
                  {result.object_type}, {result.original_release_year}
                </Typography>
              </CardContent>
            </Card>
          </StyledLink>
        );
      })}
    </Box>
  );
};

export default SearchResults;
