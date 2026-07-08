// components/Dashboard/Profile/types.ts

export interface UserData {
  _id: string;
  email: string;
  name: string;
  photo: string;
  role: string;
  phone?: string;
  address?: string;
  city?: string;
  country?: string;
  createdAt?: string;
}

export interface FormData {
  name: string;
  phone: string;
  address: string;
  city: string;
  country: string;
}

export interface ProfileAvatarProps {
  userData: UserData | null;
  formData: FormData;
  setUserData: (data: UserData | null) => void;
}

export interface ProfileInfoProps {
  userData: UserData | null;
  formData: FormData;
  setFormData: (data: FormData) => void;
  isEditing: boolean;
}

export interface ProfileActionsProps {
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
  updating: boolean;
  setUpdating: (value: boolean) => void;
  formData: FormData;
  userData: UserData | null;
  setUserData: (data: UserData | null) => void;
    setFormData: (data: FormData) => void;  
}