export interface AddressAdmin {
  id: string;
  province: string;
  city: string;
  address: string;
  created_at: string;
}

export interface UserAdmin {
  id: string;
  username: string;
  first_name: string;
  last_name: string;
  birthday: string;
  image: string;
  phone: string;
  email: string;
  role: string;
  is_email_verified: boolean;
  status: string;
  created_at: string;
  updated_at: string;
  addressList: AddressAdmin[];
}

export interface GetUserListAdminResponse {
  data: UserAdmin[];
  total: number;
  page: number;
  limit: number;
  statusCode: number;
}

export interface DeleteUserRequest {
  id: string;
}

export interface ChangeUserPermissionRequest {
  phone: string;
  role: string;
}

export type ColumnsBlackListProps = {
  currentPage: number;
  currentLimit: number;
  removeFromBlacklist: (data: RemoveUserFromBlacklistRequest) => void;
  isRemoving: boolean;
  removingVars: RemoveUserFromBlacklistRequest;
};

export interface UseGetBlacklistProps {
  page: number;
  limit: number;
}

export interface AddUserToBlacklistRequest {
  phone: string;
}

export interface UserBlacklist {
  id: string;
  username: string;
  first_name: string | null;
  last_name: string | null;
  birthday: string | null;
  image: string | null;
  imageUrl: string | null;
  phone: string;
  email: string | null;
  role: "user" | "admin" | string;
  new_email: string | null;
  new_phone: string | null;
  is_email_verified: boolean;
  status: "normal" | "block" | string;
  rt_hash: string;
  created_at: string;
  updated_at: string;
}

export interface BlacklistResponse {
  data: UserBlacklist[];
  total: number;
  page: number;
  limit: number;
  statusCode: number;
}

export interface RemoveUserFromBlacklistRequest {
  phone: string;
}
