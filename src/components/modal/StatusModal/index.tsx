import React from 'react';
import Lottie from 'react-lottie';
import { useNavigate } from 'react-router-dom';

import { checkLottieOptions } from '@/constant';

import { Modal } from '../CommonModal';

import * as S from './styled';

export interface StatusModalProps {
  url: string;
}

export const StatusModal: React.FC<StatusModalProps> = ({ url }) => {
  const navigate = useNavigate();
  const onCloseNavigate = () => {
    navigate(`${url}`);
  };

  return (
    <Modal.OverLay>
      <Modal
        textProps={
          <S.ModalSuccessContainer>
            <Lottie options={checkLottieOptions} height={'8rem'} width={'8rem'} />
            <S.ModalTitle>대출 성공</S.ModalTitle>
            <S.ModalLastContainer>
              <S.ModalSubTitle>‘당신이 모르는 민주주의’ 책을 대여했어요.</S.ModalSubTitle>
              <S.ModalSubTitle>대출 기한은 10일이며, 연장 신청을 할 수 있어요.</S.ModalSubTitle>
              <S.ModalSubTitle>1차 반납 기간은 2023년 X월 X일까지에요.</S.ModalSubTitle>
            </S.ModalLastContainer>
          </S.ModalSuccessContainer>
        }
        leftButtonText="확인했어요"
        rightButtonText="확인했어요"
        onCloseNavigate={() => onCloseNavigate()}
        lastPage={true}
      />
    </Modal.OverLay>
  );
};