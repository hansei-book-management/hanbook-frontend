import { UseMutationResult, UseQueryResult, useMutation, useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { AxiosError } from 'axios';
import { useSetRecoilState } from 'recoil';

import {
  APIErrorResponse,
  APIResponse,
  createClub,
  ClubApplyFormValue,
  APIResponseStatusType,
  generateClubCode,
  GenerateClubCodeValues,
  getClubInfo,
  GetClubMembers,
  addUserClub,
  AddClubResponse,
  CreateClubResponse,
  AddClubFormValues,
  ChangeClubDirectorValues,
  changeClubDirector,
} from '@/api';
import { addUserClubModal, changeClubDirectorModal, generateClubCodeModal } from '@/atoms';

import { useFetchUser } from './useAuth';

export const useCreateClub = (): UseMutationResult<
  APIResponse<CreateClubResponse>,
  AxiosError<APIErrorResponse>,
  ClubApplyFormValue
> => {
  const navigate = useNavigate();
  const fetchUser = useFetchUser();
  return useMutation('useCreateClub', createClub, {
    onSuccess: (data: {
      status: APIResponseStatusType;
      message: string;
      result: CreateClubResponse;
    }) => {
      fetchUser.refetch();
      toast.success(
        `${data.result.name} 동아리가 생성되었어요. \n 부장은 ${data.result.director}에요.`,
        {
          autoClose: 3000,
          position: toast.POSITION.BOTTOM_RIGHT,
        },
      );
      navigate('/');
    },
    onError: (data) => {
      toast.error(data.response?.data.message, {
        autoClose: 3000,
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    },
    retry: 0,
  });
};

export const useGetClubInfo = (
  cid?: number,
): UseQueryResult<APIResponse<GetClubMembers>, AxiosError<APIErrorResponse>> =>
  useQuery('useGetClubMember', () => getClubInfo(cid), {
    retry: 0,
    staleTime: 36000,
  });

export const useGenerateClubCode = (): UseMutationResult<
  APIResponse<{ token: string }>,
  AxiosError<APIErrorResponse>,
  GenerateClubCodeValues
> => {
  const setClubCodeModal = useSetRecoilState(generateClubCodeModal);
  return useMutation('useGenerateClubCode', generateClubCode, {
    onSuccess: (data: {
      status: APIResponseStatusType;
      message: string;
      result: { token: string };
    }) => {
      setClubCodeModal((prev) => ({ ...prev, isLoading: true }));
      setTimeout(() => {
        setClubCodeModal({ state: true, isOk: true, code: data.result.token });
      }, 1000);
      localStorage.setItem('clubCode', data.result.token);
    },
    onError: (data) => {
      setClubCodeModal({ state: true, isOk: false, data: data.response?.data.message });
    },
    retry: 0,
  });
};

export const useAddUserClub = (): UseMutationResult<
  APIResponse<AddClubResponse>,
  AxiosError<APIErrorResponse>,
  AddClubFormValues
> => {
  const setAddUserClubModal = useSetRecoilState(addUserClubModal);
  return useMutation('useAddUserClub', addUserClub, {
    onSuccess: (data: {
      status: APIResponseStatusType;
      message: string;
      result: AddClubResponse;
    }) => {
      setAddUserClubModal((prev) => ({ ...prev, isLoading: true }));
      setTimeout(() => {
        setAddUserClubModal({ state: true, isOk: true, data: data.result.name });
      }, 1000);
    },
    onError: (data) => {
      setAddUserClubModal({ state: true, isOk: false, data: data.response?.data.message });
    },
    retry: 0,
  });
};

export const useChangeClubDirector = (): UseMutationResult<
  APIResponse<ChangeClubDirectorValues>,
  AxiosError<APIErrorResponse>,
  ChangeClubDirectorValues
> => {
  const setChangeClubDirectorModal = useSetRecoilState(changeClubDirectorModal);
  return useMutation('useChangeClubDirector', changeClubDirector, {
    onSuccess: (data: {
      status: APIResponseStatusType;
      message: string;
      result: ChangeClubDirectorValues;
    }) => {
      setChangeClubDirectorModal((prev) => ({ ...prev, isLoading: true, page: 2 }));
      setTimeout(() => {
        setChangeClubDirectorModal({
          state: true,
          isOk: true,
          data: data.result.director,
          page: 3,
        });
      }, 1000);
    },
    onError: (data) => {
      setChangeClubDirectorModal({ state: true, isOk: false, data: data.response?.data.message });
    },
  });
};
