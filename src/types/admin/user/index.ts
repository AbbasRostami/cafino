export interface AddressAdmin {
  id: string;
  province: string;
  city: string;
  address: string;
  created_at: string;
}

export type UserRole = "user" | "admin" | "manager";

export interface UserAdmin {
  id: string;
  username: string;
  first_name: string;
  last_name: string;
  birthday: string;
  image: string;
  phone: string;
  email: string;
  role: UserRole;
  is_email_verified: boolean;
  status: string;
  created_at: string;
  updated_at: string;
  addressList: AddressAdmin[];
}

export interface GetUserListAdminResponse {
  statusCode: number;
  message: string;
  data: {
    total: number;
    page: number;
    limit: number;
    users: UserAdmin[];
  };
}

export interface DeleteUserRequest {
  id: string;
}

export interface ChangeUserPermissionRequest {
  id: string;
  role: UserRole;
}

// Props

export interface UserColumnsProps {
  currentPage: number;
  currentLimit: number;
  changePermission: (data: { id: string; role: UserRole }) => void;
  isChangingPermission: boolean;
  changePermissionVars?: { id: string; role: UserRole };
  addToBlacklist: (data: { id: string }) => void;
  isAddingToBlacklist: boolean;
  addToBlacklistVars?: { id: string };
}

// BlackList Types

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
  role: UserRole;
  new_email: string | null;
  new_phone: string | null;
  is_email_verified: boolean;
  status: "normal" | "block" | string;
  rt_hash: string;
  created_at: string;
  updated_at: string;
}

export interface BlacklistData {
  total: number;
  page: number;
  limit: number;
  users: UserBlacklist[];
}

export interface BlacklistResponse {
  statusCode: number;
  message: string;
  data: BlacklistData;
}

export interface RemoveUserFromBlacklistRequest {
  id: string;
}
