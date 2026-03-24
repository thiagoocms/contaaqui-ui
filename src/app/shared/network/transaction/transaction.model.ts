export enum TransactionType {
  INPUT = 'INPUT',
  OUTPUT = 'OUTPUT'
}

export interface TransactionModel {
  id?: number;
  walletId?: number;
  categoryId?: number;
  category?: string;
  type?: TransactionType;
  amount: number;
  date: string;
}
