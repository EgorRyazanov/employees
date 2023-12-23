import { enumToArray } from '../utils/enumToArray';

export enum EmployeeViews {
  Position = 'Position',
}

export namespace EmployeeViews {
  const TO_TITLE_MAP: Record<EmployeeViews, string> = {
    [EmployeeViews.Position]: 'Должность',
  };

  export function toReadable(value: EmployeeViews): string {
    return TO_TITLE_MAP[value];
  }

  export function toArray(): EmployeeViews[] {
    return enumToArray(EmployeeViews);
  }
}
