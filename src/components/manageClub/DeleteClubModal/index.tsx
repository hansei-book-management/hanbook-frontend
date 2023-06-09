import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { useRecoilState } from 'recoil';

import { CommonModal } from '@/components/modal';
import { deleteClubModal } from '@/atoms';
import { useDeleteClub, useFetchUser, useGetClubInfo } from '@/hooks';

export interface DeleteClubModalProps {
  cid?: number;
  clubName?: string;
  directorName?: string;
}

export const DeleteClubModal: React.FC<DeleteClubModalProps> = ({
  cid,
  clubName,
  directorName,
}) => {
  const { handleSubmit } = useForm();
  const { mutate } = useDeleteClub(cid);
  const user = useFetchUser();
  const clubInfo = useGetClubInfo(cid);

  const onSubmit = () => {
    mutate({});
  };

  const [deleteClubModalState, setDeleteClubModalState] = useRecoilState(deleteClubModal);

  const navigate = useNavigate();

  const onDeleteClubModalClose = () => {
    if (deleteClubModalState.isOk === true) {
      user.refetch();
      clubInfo.refetch();
      navigate('/');
    }
    setDeleteClubModalState({ state: false });
  };

  return (
    <CommonModal
      leftButtonClick={onDeleteClubModalClose}
      modal={deleteClubModalState}
      title={'삭제'}
      isDanger={true}
      message={
        `정말로 '${clubName}' 동아리를 삭제할까요?\n` +
        `삭제된 동아리의 도서는 더 이상 대여할 수 없어요.`
      }
      successMessage={
        `'${clubName}' 동아리가 삭제 되었어요.\n` +
        `앞으로 '${clubName}' 동아리의 도서를 대여할 수 없어요.\n` +
        `그리고 부장이었던 '${directorName}'님은 이제 일반 회원이 되었어요.`
      }
      failMessage={
        `'${clubName}' 동아리가 삭제에 실패했어요.\n` +
        `${deleteClubModalState.data} \n` +
        `위의 문제로 인해 ${clubName} 동아리 삭제에 실패하였어요.`
      }
      rightButtonText={'삭제할게요'}
      handleSubmit={handleSubmit}
      onValid={onSubmit}
    />
  );
};
