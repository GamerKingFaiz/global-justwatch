import { Box, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { GenericObject, stripLetters } from '../../utils/constants';

interface Props {
  data: GenericObject | null;
}

const Header = ({ data }: Props) => {
  return (
    <Box display='flex' flexWrap='wrap' justifyContent='center' mb={3}>
      {data?.metadata.poster && (
        <img
          src={`https://images.justwatch.com/poster/${stripLetters(
            data?.metadata.poster
          )}/s592`}
          alt='media poster'
          style={{ maxWidth: 200, maxHeight: 284 }}
        />
      )}
      <Box p={2} maxWidth={550}>
        <Typography variant='h4'>
          {data?.metadata.title}{' '}
          <Typography variant='caption' fontSize={28} color={grey[600]}>
            ({data?.metadata.original_release_year})
          </Typography>
        </Typography>
        <Typography pt={2}>{data?.metadata.short_description}</Typography>
      </Box>
    </Box>
  );
};

export default Header;
