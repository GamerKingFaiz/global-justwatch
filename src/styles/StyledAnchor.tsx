import styled from '@emotion/styled';
import { blueGrey } from '@mui/material/colors';

const StyledAnchor = styled.a`
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

export default StyledAnchor;
