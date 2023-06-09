import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useSetRecoilState, useRecoilState } from 'recoil';

import { MANAGE_CLUB_BOOK, MANAGE_CLUB_BOOK_OPTIONS } from '@/constant';
import {
  Section,
  DetailModal,
  HeaderSection,
  AddClubBookModal,
  DeleteClubBookModal,
  NoDataMessage,
  Skeleton,
} from '@/components';
import { useFetchUser, useGetClubBooks, useModal } from '@/hooks';
import { addClubBookModal, deleteClubBookModal } from '@/atoms';
import { BookListProps } from '@/api';

import * as S from './styled';

export interface AddBookModalStateProps {
  status: boolean;
  isOk?: boolean | null;
}

export const ManageClubBookPage: React.FC = () => {
  const { data: userData } = useFetchUser();
  const cid = userData?.result?.director?.cid;
  const { data: clubBookData, isLoading } = useGetClubBooks(cid);
  const clubBook = clubBookData?.result;
  const isBookExits = clubBook?.map(({ book }) => book).flat().length === 0;

  const navigate = useNavigate();

  const { option, bookId } = useParams<{ option: string; bookId: string }>();
  const activeOption = MANAGE_CLUB_BOOK_OPTIONS.find(({ id }) => id === option);
  const optionValue = activeOption?.id;

  let book: BookListProps[] = [];

  if (clubBook) {
    if (activeOption?.id === 'can-rent') {
      book = clubBook?.map(({ book }) => book.filter(({ end }) => end === 0)).flat();
    } else if (activeOption?.id === 'renting') {
      book = clubBook.map(({ book }) => book.filter(({ end }) => end !== 0)).flat();
    } else {
      book = clubBook.map(({ book }) => book).flat();
    }
  } else {
    book = [];
  }

  const setAddBookModal = useSetRecoilState(addClubBookModal);
  const [deleteBook, setDeleteBook] = useRecoilState(deleteClubBookModal);

  const { modalActive } = useModal();

  const onBookDetailModalClose = () => {
    close();
    navigate(`/club-book/${optionValue}`);
  };

  const onAddBookModalOpen = () => {
    setAddBookModal({ state: true, isOk: null });
  };

  const onDeleteBookModalOpen = () => {
    setDeleteBook({ state: true, isOk: null });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!activeOption) {
      navigate(`${MANAGE_CLUB_BOOK}/${MANAGE_CLUB_BOOK_OPTIONS[0].id}`);
    }
  }, [activeOption, isLoading]);

  return (
    <>
      {isLoading ? (
        <>
          <Skeleton />
        </>
      ) : activeOption && !isBookExits ? (
        <S.ManageClubBookContainer>
          <HeaderSection
            name={activeOption.text}
            activeId={option}
            href={`${MANAGE_CLUB_BOOK}`}
            optionList={MANAGE_CLUB_BOOK_OPTIONS}
            showPlusIcon={true}
            onClick={onAddBookModalOpen}
          />
          <Section data={book} navigateUrl={`${MANAGE_CLUB_BOOK}/${optionValue}/book`} />
          {modalActive && !deleteBook.state && (
            <DetailModal
              leftButtonText="닫기"
              rightButtonText="삭제"
              isRed={true}
              data={book}
              leftButtonClick={onBookDetailModalClose}
              rightButtonClick={onDeleteBookModalOpen}
            />
          )}
          <DeleteClubBookModal cid={cid} bid={Number(bookId)} />
        </S.ManageClubBookContainer>
      ) : (
        <>
          <NoDataMessage
            children={
              <HeaderSection
                activeId={option}
                href={`${MANAGE_CLUB_BOOK}`}
                optionList={MANAGE_CLUB_BOOK_OPTIONS}
              />
            }
            message={`동아리에 도서가 없어요.\n` + `아래 버튼을 눌러 도서를 추가해보세요.`}
            btnLink={`${MANAGE_CLUB_BOOK}/${MANAGE_CLUB_BOOK_OPTIONS[0].id}`}
            btnMessage="도서 추가하기"
            onClick={onAddBookModalOpen}
          />
        </>
      )}
      <AddClubBookModal cid={cid} clubName={userData?.result.director?.name} />
    </>
  );
};
