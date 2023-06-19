import { APIResponse, API_SUFFIX, instance } from './api';

export interface UpdateClubMemberValues extends ClubMemberValues {
  freeze: number;
}

export interface ClubMemberValues {
  cid?: number;
  user_id?: string;
}

export interface ClubMemberInfo {
  name: string;
  num: string;
  phone: string;
  role: string;
  uid: string;
  freeze?: number;
  borrowBook: number;
}

export interface GetClubMemberResponse extends ClubMemberInfo {
  books: [
    {
      title?: string;
      data?: string;
    },
  ];
}

export type ExpelClubMemberValues = ClubMemberValues;

export const getClubMember = async ({
  cid,
  user_id,
}: ClubMemberValues): Promise<APIResponse<GetClubMemberResponse>> => {
  if (cid && user_id) {
    const { data } = await instance.get(`${API_SUFFIX.CLUB}/${cid}/member/${user_id}`);
    return data;
  } else {
    throw new Error('cid or user_id is undefined');
  }
};

export const updateClubMember = async ({
  cid,
  user_id,
  freeze,
}: UpdateClubMemberValues): Promise<APIResponse<GetClubMemberResponse>> => {
  if (cid && user_id) {
    const { data } = await instance.patch(`${API_SUFFIX.CLUB}/${cid}/member/${user_id}`, {
      freeze,
    });
    return data;
  } else {
    throw new Error('cid or user_id is undefined');
  }
};

export const expelClubMember = async ({ cid, user_id }: ExpelClubMemberValues) => {
  if (cid && user_id) {
    const { data } = await instance.delete(`${API_SUFFIX.CLUB}/${cid}/member/${user_id}`);
    return data;
  } else {
    throw new Error('cid or user_id is undefined');
  }
};
