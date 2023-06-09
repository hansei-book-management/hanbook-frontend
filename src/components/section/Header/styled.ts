import { Link } from 'react-router-dom';

import styled, { css } from 'styled-components';

export const HeaderSectionContainer = styled.section<{ manageUserBookPage: boolean }>`
  display: flex;
  flex-direction: ${({ manageUserBookPage }) =>
    manageUserBookPage ? ' column' : 'column-reverse'};
  row-gap: 1rem;
`;

export const HeaderSectionTitle = styled.h1<{ manageUserBookPage: boolean }>`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: ${({ manageUserBookPage }) => (manageUserBookPage ? '0' : '2rem')};
`;

export const HeaderSectionSubTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.black};
`;

export const HeaderSectionList = styled.div<{ manageUserBookPage: boolean }>`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1.4rem;
  margin-bottom: ${({ manageUserBookPage }) => (manageUserBookPage ? '2rem' : '0')};
`;

export const HeaderSectionItem = styled(Link)<{ active: boolean }>`
  padding: 0.75rem 1rem;
  border-radius: 1.2rem;
  text-decoration: none;
  font-size: 0.8rem;
  font-weight: 500;
  transition: background 150ms;
  ${(props) =>
    props.active
      ? css`
          color: ${props.theme.primary.white};
          background-color: ${props.theme.black};
        `
      : css`
          color: ${props.theme.black};
          background-color: ${props.theme.primary.white};
        `}
`;

export const HeaderSectionAddIconWrap = styled.div`
  padding: 0.6rem 1rem;
  border-radius: 1.2rem;
  text-decoration: none;
  font-size: 0.8rem;
  font-weight: 500;
  transition: all 200ms ease-in-out;
  color: ${({ theme }) => theme.black};
  background-color: ${({ theme }) => theme.primary.white};
  &:hover {
    color: ${({ theme }) => theme.primary.white};
    background-color: ${({ theme }) => theme.black};
  }
`;

export const HeaderSectionUserMessage = styled.span`
  width: 100%;
  padding: 1.4rem;
  border-radius: 0.4rem;
  font-size: 1rem;
  font-weight: 400;
  color: ${({ theme }) => theme.primary.black};
  background-color: #ffcfcf;
  text-align: left;
  margin-bottom: 2rem;
`;
