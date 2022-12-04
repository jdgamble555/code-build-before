export interface UserRec {
  id: string;
  email: string;
  role: Role;
  createdAt: Date;
  updatedAt: Optional<Date>;
  displayName: Optional<string>;
  phoneNumber: Optional<string>;
  photoURL: Optional<string>;
  username: Optional<string>;
  providers: Provider[]
};

export interface ActionRequest {
  error: Optional<string>;
  data?: Optional<boolean>;
};

export type Role = 'ADMIN' | 'EDITOR' | 'USER';
export type Optional<T> = T | null | undefined;
export type Provider = 'apple' | 'google' | 'email';