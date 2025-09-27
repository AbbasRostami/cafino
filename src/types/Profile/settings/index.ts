export interface User {
  id?: string;
  username?: string;
  first_name?: string;
  last_name?: string;
  birthday?: string;
  image?: string;
  imageUrl?: string;
  phone?: string;
  email?: string;
  role?: string;
  is_email_verified?: boolean;
  status?: string;
  created_at?: string;
  updated_at?: string;
  addressList?: string[];
}

export interface UserResponse {
  data: {
    user: User;
    statusCode: number;
  };
}

export interface UpdateProfileRequest {
  username: string;
  first_name: string;
  last_name: string;
  birthday: string;
}

export interface ProfileFormData {
  first_name: string;
  last_name: string;
  birthday: string;
}

export interface AvatarProps {
  user: User | undefined;
  avatarPreview: string | null;
  isUpdatingImage: boolean;
  isRemovingImage: boolean;
  onAvatarChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveImage: () => void;
}

export interface ProfileInfoProps {
  user: User | undefined;
}

export interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ProfileFormData) => void;
  isPending: boolean;
  user: User | undefined;
}

export interface InputBlockProps {
  label: string;
  name: string;
  register: any;
  errors: any;
  type?: string;
}

export interface SettingsFormData {
  username: string;
  first_name: string;
  last_name: string;
  birthday: string;
  phone: string;
}

export interface UpdateSettingsRequest {
  username?: string;
  first_name?: string;
  last_name?: string;
  birthday?: string;
  phone?: string;
}
