import { IsEmpty } from '@shared/core/model/isEmpty';

export interface Business extends IsEmpty{
  id: string;
  isEmpty: boolean;
  str: string;
}
