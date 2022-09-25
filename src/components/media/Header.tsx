import { Box, Divider, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import StyledAnchor from '../../styles/StyledAnchor';
import { GenericObject, stripLetters } from '../../utils/constants';

interface Props {
  data: GenericObject | null;
}

const Header = ({ data }: Props) => {
  const imdbScore = data?.metadata.scoring.find(
    (score: GenericObject) => score.provider_type === 'imdb:score'
  )?.value;
  const imdbLink = data?.metadata.external_ids.find(
    (id: GenericObject) => id.provider === 'imdb_latest'
  )?.external_id;

  return (
    <Box display='flex' flexWrap='wrap' justifyContent='center' mb={3}>
      {/* Poster */}
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
        <StyledAnchor
          href={`https://www.justwatch.com${data?.metadata.full_path}`}
          target='_blank'
        >
          {/* Title */}
          <Typography variant='h4'>
            {data?.metadata.title}{' '}
            <Typography variant='caption' fontSize={28} color={grey[600]}>
              ({data?.metadata.original_release_year})
            </Typography>
          </Typography>
        </StyledAnchor>
        {/* Number of seasons */}
        {data?.metadata.seasons && (
          <Typography variant='caption'>
            {data?.metadata.seasons.length} seasons
          </Typography>
        )}
        {/* Description */}
        <Typography pt={1}>{data?.metadata.short_description}</Typography>
        {/* IMDB score */}
        {imdbLink && (
          <>
            <Divider />
            <StyledAnchor
              href={`https://www.imdb.com/title/${imdbLink}/`}
              target='_blank'
            >
              <Typography variant='caption' fontWeight={700}>
                IMDB - {imdbScore}
              </Typography>
            </StyledAnchor>
          </>
        )}
      </Box>
    </Box>
  );
};

export default Header;
