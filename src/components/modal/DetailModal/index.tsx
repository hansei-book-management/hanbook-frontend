import React, { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

import { useGetWindowSize } from '@/hooks';
import { Book1PNG } from '@/assets';

import { Modal } from '../CommonModal';

import * as S from './styled';

export interface DetailModalProps {
  clubId?: string;
  message: ReactNode;
}

export const DetailModal: React.FC<DetailModalProps> = ({ clubId, message }) => {
  const navigate = useNavigate();
  const { getWidth } = useGetWindowSize();

  const onNextNavigate = (id: number, stepNum: number) => {
    navigate(`/rent/${clubId}/book-rent/${id}?step=${stepNum}`);
  };

  const onCloseNavigate = () => {
    navigate(`/rent/${clubId}`);
  };

  return (
    <Modal.OverLay>
      <Modal
        textProps={
          <>
            <S.ModalDetailContainer>
              {getWidth <= 580 && (
                <div style={{ justifySelf: 'center', alignSelf: 'center' }}>
                  {message}
                  <S.MobileModalTitle>세노이의 가르침</S.MobileModalTitle>
                  <S.ModalImage src={Book1PNG} />
                </div>
              )}
              {getWidth > 580 && <S.ModalImage src={Book1PNG} />}
              <S.ModalInfoContainer>
                {getWidth > 580 && <>{message}</>}
                <S.ModalTitle>세노이의 가르침</S.ModalTitle>
                <S.ModalInfo>
                  세이노 저자(글)
                  <br />
                  데이원 · 2023년 03월 02일
                </S.ModalInfo>
                <S.ModalSubTitle>
                  머릿글: 초판 한정 블랙 에디션
                  <br />
                  재야의 명저 《세이노의 가르침》 2023년판 정식 출간!
                  <br />
                  순자산 천억 원대 자산가, 세이노의 ‘요즘 생각’을 만나다
                </S.ModalSubTitle>
              </S.ModalInfoContainer>
            </S.ModalDetailContainer>
            <S.ModalContentTitle>책 소개</S.ModalContentTitle>
            <S.ModalContent>
              2000년부터 발표된 그의 주옥같은 글들. 독자들이 자발적으로 만든 제본서는 물론, 전자책과
              앱까지 나왔던 《세이노의 가르침》이 드디어 전국 서점에서 독자들을 마주한다. 여러
              판본을 모으고 저자의 확인을 거쳐 최근 생각을 추가로 수록하였다. 정식 출간본에만 추가로
              수록된 글들은 목차와 본문에 별도 표시하였다.더 많은 사람이 이 책을 보고 힘을 얻길
              바라기에 인세도 안 받는 저자의 마음을 담아, 700쪽이 넘는 분량에도 7천 원 안팎에 책을
              구매할 수 있도록 했다. 정식 출간 전자책 또한 무료로 선보인다.*필명 ‘세이노(Say No)’는
              당신이 믿고 있는 것들에 ‘No!’를 외치고 제대로 살아가라는 뜻이다. 세이노는 지난 20여
              년간 여러 칼럼을 통해 인생 선배로서 부와 성공에 대한 지혜와 함께 삶에 대한 체험적
              지식을 나누어 주었다. 그래서 그의 글을 좋아하는 사람들은 그를 ‘세이노 스승님’이라
              부른다.
            </S.ModalContent>
          </>
        }
        {...(clubId
          ? {
              leftButtonText: '취소',
              rightButtonText: '대여하기',
              onNavigate: () => onNextNavigate(2, 1),
              onCloseNavigate: () => onCloseNavigate(),
            }
          : {
              leftButtonText: '닫기',
              rightButtonText: '확인',
            })}
      />
    </Modal.OverLay>
  );
};