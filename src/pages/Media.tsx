import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Skeleton,
  Typography,
} from '@mui/material';
import { grey } from '@mui/material/colors';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { API_URL, GenericObject, stripLetters } from '../utils/constants';

const Media = () => {
  const [data, setData] = useState<GenericObject | null>(null);
  const [loading, setLoading] = useState(false);
  const { type, id } = useParams();

  useEffect(() => {
    setLoading(true);
    fetch(`${API_URL}/title/${type}/${id}`)
      .then((response) => response.json())
      .then((result) => {
        setData(result);
        setLoading(false);
      });
  }, [type, id]);

  return (
    <Box m={3}>
      {loading ? (
        <Skeleton variant='rounded' />
      ) : (
        <>
          <Card sx={{ display: 'flex', mb: 3 }}>
            {data?.metadata.poster && (
              <CardMedia
                sx={{ width: 300 }}
                component='img'
                image={`https://images.justwatch.com/poster/${stripLetters(
                  data?.metadata.poster
                )}/s592`}
              />
            )}
            <CardContent sx={{ pl: 2 }}>
              <Typography variant='h4'>
                {data?.metadata.title}{' '}
                <Typography variant='caption' fontSize={28} color={grey[600]}>
                  ({data?.metadata.original_release_year})
                </Typography>
              </Typography>
              <Typography paddingTop={2}>
                {data?.metadata.short_description}
              </Typography>
            </CardContent>
          </Card>

          {data?.offers.map((offer: GenericObject) => {
            return (
              <Card sx={{ mb: 2 }}>
                <CardContent>
                  <Typography variant='h3'>{offer.country}</Typography>
                  <Box display='flex' flexWrap='wrap'>
                    {offer.offers.map((service: GenericObject) => {
                      if (service.monetization_type === 'flatrate')
                        return (
                          <Card sx={{ mr: 1, mb: 1 }}>
                            <CardContent>
                              {service.package_short_name}
                              {type === 'show' && (
                                <Typography>
                                  {service.element_count} season(s)
                                </Typography>
                              )}
                            </CardContent>
                          </Card>
                        );
                    })}
                  </Box>
                </CardContent>
              </Card>
            );
          })}
        </>
      )}
    </Box>
  );
};

export default Media;
