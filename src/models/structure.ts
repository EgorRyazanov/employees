import { enumToArray } from '../utils/enumToArray';

export enum Structure {
  Division = 'Division',
  Group = 'Group',
  User = 'User',
  Department = 'Department',
}

export namespace Structure {
  const TO_TITLE_MAP: Record<Structure, string> = {
    [Structure.Division]: 'Подразделения',
    [Structure.Group]: 'Группы',
    [Structure.User]: 'Пользователи',
    [Structure.Department]: 'Отдел',
  };

  export function toReadable(value: Structure): string {
    return TO_TITLE_MAP[value];
  }

  export function toArray(): Structure[] {
    return enumToArray(Structure);
  }
}
