import styled from '@emotion/styled';
import { blueGrey } from '@mui/material/colors';
import { Link } from 'react-router-dom';

const StyledLink = styled(Link)`
  color: inherit;

  &:hover {
    color: ${blueGrey[200]};
  }
  text-decoration: none;

  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;

export default StyledLink;
