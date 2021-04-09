import styled from 'styled-components';

export const SongContainer = styled.div`
  cursor: pointer;
  transform: scale(1);
  transition: all 0.45s ease;

  :hover {
    transform: scale(1.05);
    transition: all 0.25s ease;
    box-shadow: 0px 0px 16px 12px #ffffff52;
  }

  div {
    background: whitesmoke;
  }
`;
