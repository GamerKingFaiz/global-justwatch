import { Box, Divider, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import StyledAnchor from '../../styles/StyledAnchor';
import { GenericObject } from '../../utils/constants';

interface Props {
  data: GenericObject | null;
}

const Header = ({ data }: Props) => {
  const imdbScore = data?.metadata.scoring.imdbScore;
  const imdbLink = `https://www.imdb.com/title/${data?.metadata.externalIds.imdbId}`;

  return (
    <Box display='flex' flexWrap='wrap' justifyContent='center' mb={3}>
      {/* Poster */}
      {data?.metadata.fullPosterUrl && (
        <img
          src={`https://images.justwatch.com/${data?.metadata.fullPosterUrl}`}
          alt='media poster'
          style={{ maxWidth: 200, maxHeight: 284 }}
        />
      )}
      <Box p={2} maxWidth={550}>
        <StyledAnchor
          href={`https://www.justwatch.com${data?.metadata.fullPath}`}
          target='_blank'
        >
          {/* Title */}
          <Typography variant='h4'>
            {data?.metadata.title}{' '}
            <Typography variant='caption' fontSize={28} color={grey[600]}>
              ({data?.metadata.originalReleaseYear})
            </Typography>
          </Typography>
        </StyledAnchor>
        {/* Number of seasons */}
        {data?.metadata.totalSeasonCount && (
          <Typography variant='caption'>
            {data?.metadata.totalSeasonCount} season(s)
          </Typography>
        )}
        {/* Description */}
        <Typography pt={1}>{data?.metadata.shortDescription}</Typography>
        {/* IMDB score */}
        {imdbLink && (
          <>
            <Divider />
            <StyledAnchor href={imdbLink} target='_blank'>
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
