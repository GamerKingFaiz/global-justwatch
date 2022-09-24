import { Box, Card, CardContent, Typography } from '@mui/material';
import { GenericObject, stripLetters } from '../../utils/constants';

interface Props {
  data: GenericObject | null;
  type: string | undefined;
}

const CountryCards = ({ data, type }: Props) => {
  return (
    <>
      {data?.services.map((service: GenericObject, index: number) => {
        return (
          <Card sx={{ mb: 2 }} key={index}>
            <CardContent>
              {/* Country name */}
              <Typography variant='h5'>{service.country}</Typography>
              {/* Streaming Services */}
              <Box display='flex' flexWrap='wrap' mt={2} ml={2}>
                {service.offers.map((offer: GenericObject, index: number) => {
                  return (
                    <Box
                      key={index}
                      mr={2}
                      mb={2}
                      display='flex'
                      flexDirection='column'
                      alignItems='center'
                    >
                      {offer.iconUrl ? (
                        <a
                          href={offer.urls.standard_web}
                          target='_blank'
                          rel='noreferrer'
                        >
                          <img
                            src={`https://www.justwatch.com/images/icon/${stripLetters(
                              offer.iconUrl
                            )}/s100`}
                            alt='streaming service logo'
                            width={50}
                            style={{ borderRadius: '5px' }}
                          />
                        </a>
                      ) : (
                        <Typography>{offer.package_short_name}</Typography>
                      )}
                      {type === 'show' && (
                        <Typography variant='caption'>
                          {offer.element_count} season
                          {offer.element_count > 1 && 's'}
                        </Typography>
                      )}
                    </Box>
                  );
                })}
              </Box>
            </CardContent>
          </Card>
        );
      })}
    </>
  );
};

export default CountryCards;
