export enum UserDocumentTypeEnum {
  CPF = 'CPF',
  CNPJ = 'CNPJ',
  OTHER = 'OTHER'
}

export enum UserProfileEnum {
  ADMIN = 'ADMIN',
  USER = 'USER'
}

export interface UserModel {
  id?: number;
  name: string;
  documentNumber: string;
  documentType: UserDocumentTypeEnum;
  login: string;
  password: string;
  email: string;
  profile: UserProfileEnum;
}
