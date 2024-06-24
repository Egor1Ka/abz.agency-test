import React, { ButtonHTMLAttributes } from 'react';

export interface IUser {
  id: number;
  name: string;
  email: string;
  phone: string;
  photo: string;
  position: string;
}

export interface IUserListRef {
  fetchUsers: () => void;
}

export interface IUserListProps {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

export interface IRegistrationFormProps {
  onUpdateUsers: () => void;
}

export interface IErrorResponse {
  response: {
    data: {
      message: string;
    };
  };
}

export interface IUserCardProps {
  user: {
    id: number;
    name: string;
    email: string;
    phone: string;
    photo: string;
    position: string;
  };
  key: number;
}

export interface IPosition {
  id: number;
  name: string;
}

export interface IFormDataType {
  name: string;
  email: string;
  phone: string;
  position_id: number;
  photo: File | null;
}

export interface IUser {
  id: number;
  name: string;
  email: string;
  phone: string;
  photo: string;
  position: string;
}

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  onClick?: () => void;
}

export interface IInputProps {
  label?: string;
  helperText?: string;
  errorText?: string;
  value?: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  type?: string;
  options?: Array<{ label: string; value: string }>;
  fileName?: string;
  placeholder?: string;
  format?: string;
}
