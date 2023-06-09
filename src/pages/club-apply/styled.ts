import styled from 'styled-components';

export const ClubApplyInput = styled.input`
  background-color: ${({ theme }) => theme.white};
  border: 1px solid ${({ theme }) => theme.imageBorder};
  padding: 16px;
  align-self: center;
  border-radius: 2rem;
  height: 3rem;
  width: 100%;
  font-size: 1rem;
  &::placeholder {
    font-size: 1rem;
    font-weight: 500;
    color: '#9E9E9E';
  }
  @media screen and (min-width: 300px) and (max-width: 500px) {
    height: 3.4rem;
  }
`;
