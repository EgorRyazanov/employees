import { Person } from './person';

export interface PersonDetails extends Person {
  readonly id: number;
  readonly fullName: string;
  readonly email: string;
  readonly phoneNumber: string;
  readonly position: string;
  readonly isVacancy: boolean;
  readonly workType: string;
  readonly userNumber: string;
  readonly location: string;
}
