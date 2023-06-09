import React from 'react';

import { Navbar, Footer } from '@/components';

import * as S from './styled';

export interface DefaultLayoutProps {
  children: React.ReactNode;
}

export const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
  return (
    <S.DefaultLayoutContainer>
      <Navbar />
      <S.DefaultLayoutWrapper>{children}</S.DefaultLayoutWrapper>
      <Footer />
    </S.DefaultLayoutContainer>
  );
};
