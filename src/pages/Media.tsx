import { Box, Skeleton } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CountryCards from '../components/media/CountryCards';
import Header from '../components/media/Header';
import { API_URL, GenericObject } from '../utils/constants';

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

  useEffect(() => {
    document.title = data?.metadata.title;
  }, [data?.metadata.title]);

  return (
    <Box m={3}>
      {loading ? (
        <Skeleton variant='rounded' height={284} />
      ) : (
        <Box display='flex' justifyContent='center'>
          <Box width='100%' maxWidth={750}>
            <Header data={data} />
            <CountryCards data={data} type={type} />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Media;
