import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  FaEllipsisV,
  FaLock,
  FaUserSlash,
  FaEllipsisH,
  FaPeopleArrows,
  FaTrash,
} from 'react-icons/fa';

import { useSetRecoilState } from 'recoil';

import { MANAGE_CLUB } from '@/constant';
import {
  Button,
  ClubChangeDirectorModal,
  ClubCodeModal,
  ClubMemberInfoModal,
  DeleteClubModal,
  ExpelClubMemberModal,
  UpdateClubMemberModal,
} from '@/components';
import { useFetchUser, useGetClubInfo, useGetClubMember } from '@/hooks';
import {
  changeClubDirectorModal,
  deleteClubModal,
  expelClubMemberModal,
  generateClubCodeModal,
  updateClubMemberModal,
} from '@/atoms';

import * as S from './styled';

export const ManageClubPage: React.FC = () => {
  const { data: userData } = useFetchUser();
  const cid = userData?.result?.director?.cid;

  const club = useGetClubInfo(cid);
  const members = club.data?.result.members;
  const clubName = club.data?.result.name;

  const { userId } = useParams<{ userId: string }>();
  const member = useGetClubMember({ cid, user_id: userId });
  const memberInfo = member.data;

  const [clubMemberInfoModal, setClubMemberInfoModal] = useState<boolean>(false);
  const [clubMemberPopupList, setClubMemberPopupList] = useState(
    members ? members.map(() => false) : [],
  );
  const [clubSettingPopupOpen, setClubSettingPopupOpen] = useState<boolean>(false);
  const setClubCodeModal = useSetRecoilState(generateClubCodeModal);
  const [clubCode, setClubCode] = useState<string | null>('');
  const setUpdateUserModal = useSetRecoilState(updateClubMemberModal);
  const setExpelMemberModal = useSetRecoilState(expelClubMemberModal);
  const setDeleteClubModal = useSetRecoilState(deleteClubModal);
  const setChangeClubDirectorModal = useSetRecoilState(changeClubDirectorModal);

  const navigate = useNavigate();

  // club member info modal FN
  const onClubMemberInfoModalOpen = (userId: string) => {
    setClubMemberInfoModal(true);
    navigate(`${MANAGE_CLUB}/member/${userId}/detail`);
  };

  const onClubMemberInfoModalClose = () => {
    setClubMemberInfoModal(false);
    navigate(`${MANAGE_CLUB}`);
  };

  // club code modal FN
  const onClubCodeModalOpen = () => {
    if (clubCode) {
      return setClubCodeModal({ state: true, page: null });
    }
    setClubCodeModal({ state: true, page: 1 });
    onClubCodeOpenFNClick();
  };

  const onClubCodeOpenFNClick = useCallback(() => {
    const clubCode = localStorage.getItem('clubCode');
    setClubCode(clubCode);
    setClubMemberInfoModal(false);
  }, [clubCode]);

  // club member status modal FN
  const onClubMemberChangeStatusModalOpen = (userId: string, i: number) => {
    setClubMemberPopupList((prev) => ({ ...prev, [i]: !prev[i] }));
    setUpdateUserModal({ state: true, isOk: null });
    navigate(`${MANAGE_CLUB}/member/${userId}/status/`);
  };

  // club member expel modal FN
  const onClubMemberExpelModalOpen = (userId: string, i: number) => {
    setClubMemberPopupList((prev) => ({ ...prev, [i]: !prev[i] }));
    setExpelMemberModal({ state: true, isOk: null });
    navigate(`${MANAGE_CLUB}/member/${userId}/expel`);
  };

  // club change Director modal FN
  const onClubChangeDirectorModalOpen = () => {
    setChangeClubDirectorModal({ state: true, isOk: null, page: 1 });
    navigate(`${MANAGE_CLUB}/change-director`);
  };

  // club delete modal FN
  const onClubDeleteModalOpen = () => {
    setDeleteClubModal({ state: true, isOk: null });
  };

  useEffect(() => {
    navigate(`${MANAGE_CLUB}/`);
    if (!memberInfo) {
      member.refetch();
    }
  }, [memberInfo]);

  return (
    <>
      <S.ManageClubWrapper>
        <Button onClick={onClubCodeModalOpen} to={`${MANAGE_CLUB}`} description="동아리 코드" />
        <S.ManageClubUserMenuContainer>
          <S.ManageClubUserMenuBar>
            <S.ManageClubUserMenuBarItem>부원</S.ManageClubUserMenuBarItem>
            <S.ManageClubUserMenuBarItem>대여 책</S.ManageClubUserMenuBarItem>
            <S.ManageClubUserMenuBarItem>상태</S.ManageClubUserMenuBarItem>
          </S.ManageClubUserMenuBar>
          {members?.map(({ name, freeze, uid, borrowBook, book }, i) => {
            const isMemberSelected = userId === uid;
            return (
              <>
                <S.DummyContainer>
                  <S.ManageClubUserContainer>
                    <S.ManageClubUserIconContainer
                      onClick={() => onClubMemberInfoModalOpen(`${uid}`)}
                    >
                      <S.ManageClubUserIcon />
                      <S.ManageClubUserName>{name}</S.ManageClubUserName>
                    </S.ManageClubUserIconContainer>
                    <S.ManageClubUserBookInfo onClick={() => onClubMemberInfoModalOpen(`${uid}`)}>
                      {borrowBook}
                    </S.ManageClubUserBookInfo>
                    <S.ManageClubUserStatus
                      isOk={freeze === 0}
                      onClick={() => onClubMemberInfoModalOpen(`${uid}`)}
                    >
                      {freeze === 0 ? '정상' : '대여정지'}
                      <br />
                      {freeze !== 0 && '대여가 정지된 부원입니다.'}
                    </S.ManageClubUserStatus>
                    <S.ManageClubPopupIconWrapper
                      onClick={() => setClubMemberPopupList((prev) => ({ ...prev, [i]: !prev[i] }))}
                    >
                      <FaEllipsisV size={'0.9rem'} />
                    </S.ManageClubPopupIconWrapper>
                  </S.ManageClubUserContainer>
                  <S.ManageClubPopupContainer
                    initial="closed"
                    animate={clubMemberPopupList && clubMemberPopupList[i] ? 'open' : 'closed'}
                    variants={{
                      open: { opacity: 1, zIndex: 12 },
                      closed: { opacity: 0, zIndex: -1 },
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <S.ManageClubPopupDiv
                      isOut={false}
                      onClick={() => onClubMemberChangeStatusModalOpen(uid, i)}
                    >
                      <FaLock size={'0.9rem'} />
                      <span>{freeze === 0 ? '대여정지' : '대여정지 해제'}</span>
                    </S.ManageClubPopupDiv>
                    <S.ManageClubPopupDiv
                      isOut={true}
                      onClick={() => onClubMemberExpelModalOpen(uid, i)}
                    >
                      <FaUserSlash size={'0.9rem'} />
                      <span>추방</span>
                    </S.ManageClubPopupDiv>
                  </S.ManageClubPopupContainer>
                </S.DummyContainer>
                {isMemberSelected && (
                  <>
                    {clubMemberInfoModal && (
                      <ClubMemberInfoModal
                        name={name}
                        freeze={freeze}
                        book={book}
                        borrowBooks={borrowBook}
                        leftButtonClick={onClubMemberInfoModalClose}
                      />
                    )}
                    <ExpelClubMemberModal cid={cid} userId={userId} memberName={name} />
                    <UpdateClubMemberModal
                      cid={cid}
                      userId={userId}
                      memberName={name}
                      freeze={freeze}
                    />
                  </>
                )}
              </>
            );
          })}
        </S.ManageClubUserMenuContainer>
        <div style={{ position: 'relative', width: '100%' }}>
          <S.ManageClubPopupIconWrapper
            onClick={() => {
              setClubSettingPopupOpen((prev) => !prev);
            }}
          >
            <FaEllipsisH size={'0.9rem'} />
          </S.ManageClubPopupIconWrapper>
          <S.ManageClubPopupContainer
            isSetting={true}
            initial="closed"
            animate={clubSettingPopupOpen ? 'open' : 'closed'}
            variants={{
              open: { opacity: 1, zIndex: 12 },
              closed: { opacity: 0, zIndex: -1 },
            }}
            transition={{ duration: 0.2 }}
          >
            <S.ManageClubPopupDiv isOut={false} onClick={onClubChangeDirectorModalOpen}>
              <FaPeopleArrows size={'0.9rem'} />
              <span>부장 변경</span>
            </S.ManageClubPopupDiv>
            <S.ManageClubPopupDiv isOut={true} onClick={onClubDeleteModalOpen}>
              <FaTrash size={'0.9rem'} />
              <span>동아리 삭제</span>
            </S.ManageClubPopupDiv>
          </S.ManageClubPopupContainer>
        </div>
      </S.ManageClubWrapper>
      {cid && <ClubCodeModal />}
      {club.data?.result && (
        <ClubChangeDirectorModal
          clubName={club.data?.result.name}
          cid={cid}
          clubMembers={club.data?.result.members}
          directorName={userData?.result.name}
        />
      )}
      <DeleteClubModal clubName={clubName} directorName={userData?.result.name} cid={cid} />
    </>
  );
};
