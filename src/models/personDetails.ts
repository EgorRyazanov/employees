import { Person } from './person';

export interface PersonDetails extends Person {
  readonly email: string;
  readonly phoneNumber: string;
  readonly workType: string;
  readonly userNumber: string;
  readonly location: string;
  readonly division: string;
  readonly department: string;
  readonly group: string;
  readonly legalEntity: string;
}
