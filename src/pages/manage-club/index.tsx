import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaRegCopy } from 'react-icons/fa';
import Lottie from 'react-lottie';

import { useModal } from '@/hooks';
import { USER_LIST, generateCodeOptionList, loadingLottieOptions } from '@/constant';
import { Button, Modal } from '@/components';

import * as S from './styled';

export const ManageClubPage: React.FC = () => {
  const { open, modalActive } = useModal();
  const [inviteCodeClick, setInviteCodeClick] = useState<boolean>(false);
  const [userBoxClick, setUserBoxClick] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [ok, setOk] = useState<boolean>(false);
  const [inviteCode, setInviteCode] = useState<string>('');
  const [page, setPage] = useState<number>(1);

  const navigate = useNavigate();

  const onSubmit = () => {
    navigate(`/manage-club?generate-code-step=2`);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOk(true);
      setPage(2);
    }, 1000);
    setOk(false);
    setInviteCode('앙앙기모링');
  };

  const onCloseNavigate = () => {
    navigate(`/manage-club`);
  };

  const onInviteCodeClick = () => {
    setInviteCodeClick(true);
    setUserBoxClick(false);
    setPage(1);
    setOk(false);
    open();
  };

  const onUserBoxClick = () => {
    setUserBoxClick(true);
    setInviteCodeClick(false);
    open();
  };

  const onCopyText = () => {
    navigator.clipboard.writeText(inviteCode);
  };

  const onCheckClick = () => {
    setOk(false);
    setInviteCodeClick(false);
    navigate(`/manage-club`);
  };

  const onEditClick = () => {
    setOk(false);
    setPage(1);
  };

  useEffect(() => {
    navigate(`/manage-club`);
  }, []);

  return (
    <S.ManageClubWrapper>
      <Button onClick={onInviteCodeClick} to="?generate-code-step=1" description="초대 코드 생성" />
      <S.ManageClubUserMenuContainer>
        <S.ManageClubUserMenuBar>
          <S.ManageClubUserMenuBarItem>부원</S.ManageClubUserMenuBarItem>
          <S.ManageClubUserMenuBarItem>대여 책</S.ManageClubUserMenuBarItem>
          <S.ManageClubUserMenuBarItem>상태</S.ManageClubUserMenuBarItem>
        </S.ManageClubUserMenuBar>
        {USER_LIST.map(({ name, bookInfo, status, errorMessage }) => (
          <S.ManageClubUserInfoContainer onClick={onUserBoxClick}>
            <S.ManageClubUserIconContainer>
              <S.ManageClubUserIcon />
              <S.ManageClubUserName>{name}</S.ManageClubUserName>
            </S.ManageClubUserIconContainer>
            <S.ManageClubUserBookInfo>{bookInfo}</S.ManageClubUserBookInfo>
            <S.ManageClubUserStatus isOk={status}>
              {status ? '정상' : '대출정지'}
              <br />
              {errorMessage && `(${errorMessage})`}
            </S.ManageClubUserStatus>
          </S.ManageClubUserInfoContainer>
        ))}
      </S.ManageClubUserMenuContainer>

      {modalActive && userBoxClick && (
        <Modal.OverLay>
          <Modal
            textProps={
              <S.ModalUserContainer>
                <S.ModalTitle>부원 박찬영</S.ModalTitle>
                <S.ModalUserBookInfoText>현재 대출중인 책: 3권</S.ModalUserBookInfoText>
                <S.ModalUserBookInfo>
                  <S.ModalUserBookInfoTitle>너의 이름은:</S.ModalUserBookInfoTitle>
                  <S.ModalUserBookInfoStatus isOk={false}>3일 연체됨</S.ModalUserBookInfoStatus>
                </S.ModalUserBookInfo>
                <S.ModalUserBookInfo>
                  <S.ModalUserBookInfoTitle>키미노 나마에와:</S.ModalUserBookInfoTitle>
                  <S.ModalUserBookInfoStatus isOk={true}> 4일 남음</S.ModalUserBookInfoStatus>
                </S.ModalUserBookInfo>
                <S.ModalUserBookInfo>
                  <S.ModalUserBookInfoTitle>what is your fucking name:</S.ModalUserBookInfoTitle>
                  <S.ModalUserBookInfoStatus isOk={true}>1주일 남음</S.ModalUserBookInfoStatus>
                </S.ModalUserBookInfo>
              </S.ModalUserContainer>
            }
            leftButtonText="확인"
            modalSize="large"
          />
        </Modal.OverLay>
      )}
      {modalActive && inviteCodeClick && !ok && page === 1 && (
        <Modal.OverLay>
          <Modal
            textProps={
              <S.GenerateCodeContainer>
                <S.ModalTitle>코드 생성하기</S.ModalTitle>
                {generateCodeOptionList.map(({ title, optionList }) => (
                  <S.GenerateCodeSelectContainer>
                    <S.GenerateCodeTitle>{title}</S.GenerateCodeTitle>
                    <S.GenerateCodeSelect>
                      {optionList.map(({ value }) => (
                        <option key={value}>{value}</option>
                      ))}
                    </S.GenerateCodeSelect>
                  </S.GenerateCodeSelectContainer>
                ))}
              </S.GenerateCodeContainer>
            }
            leftButtonText="닫기"
            rightButtonText={
              loading ? (
                <Lottie options={loadingLottieOptions} height={'1.2rem'} width={'2.6rem'} />
              ) : (
                '생성하기'
              )
            }
            statusDisable={loading}
            modalSize="medium"
            {...(!loading && {
              nextButtonClick: () => onSubmit(),
              doneButtonClick: () => onCloseNavigate(),
            })}
          />
        </Modal.OverLay>
      )}
      {modalActive && inviteCodeClick && ok && page === 2 && (
        <Modal.OverLay>
          <Modal
            textProps={
              <S.InviteCodeContainer>
                <div>
                  <S.ModalTitle>초대 코드 발급</S.ModalTitle>
                  <S.InviteCodeSubTitleContainer>
                    최대 사용 횟수는 7회이고, 30일 동안 유효해요.
                    <Link to="?generate-code-step=1" onClick={onEditClick}>
                      수정하기
                    </Link>
                  </S.InviteCodeSubTitleContainer>
                </div>
                <S.InviteCodeValueContainer>
                  <S.InviteCodeText>앙기모링</S.InviteCodeText>
                  <S.InviteCodeCopyButtonWrapper onClick={onCopyText}>
                    <FaRegCopy size={'0.9rem'} />
                  </S.InviteCodeCopyButtonWrapper>
                </S.InviteCodeValueContainer>
              </S.InviteCodeContainer>
            }
            onlyRightButton={true}
            leftButtonText="확인했어요"
            modalSize="small"
            doneButtonClick={() => onCheckClick()}
          />
        </Modal.OverLay>
      )}
    </S.ManageClubWrapper>
  );
};