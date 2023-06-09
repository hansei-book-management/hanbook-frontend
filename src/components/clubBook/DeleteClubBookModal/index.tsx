import { useForm } from 'react-hook-form';

import { useRecoilState, useRecoilValue } from 'recoil';

import { bookName, deleteClubBookModal } from '@/atoms';
import { CommonModal } from '@/components/modal';
import { useDeleteBook } from '@/hooks';

export interface DeleteClubBookModalProps {
  cid?: number;
  bid?: number;
}

export const DeleteClubBookModal: React.FC<DeleteClubBookModalProps> = ({ cid, bid }) => {
  const [deleteBook, setDeleteBook] = useRecoilState(deleteClubBookModal);
  const clubBookName = useRecoilValue(bookName);

  const { handleSubmit } = useForm();
  const { mutate } = useDeleteBook({ cid, bid });

  const onSubmit = () => {
    mutate({});
  };

  const onDeleteClubBookModalClose = () => {
    setDeleteBook({ state: false });
  };

  return (
    <CommonModal
      leftButtonClick={onDeleteClubBookModalClose}
      modal={deleteBook}
      title={'도서 삭제'}
      isDanger={true}
      message={
        `정말로 '${clubBookName}' 도서를 삭제할까요?\n` + `삭제된 도서는 더 이상 대여할 수 없어요.`
      }
      successMessage={
        `'${clubBookName}' 도서가 삭제 되었어요.\n` +
        `앞으로 '${clubBookName}' 도서를 관리하거나 대여할  수 없어요.\n` +
        `자유롭게 HANBOOK을 이용해 보세요.`
      }
      failMessage={
        `'${clubBookName}' 도서가 삭제에 실패했어요.\n` +
        `${deleteBook.data} \n` +
        `위의 문제로 인해 '${clubBookName}' 도서 삭제에 실패하였어요.`
      }
      rightButtonText={'삭제할게요'}
      handleSubmit={handleSubmit}
      onValid={onSubmit}
    />
  );
};
