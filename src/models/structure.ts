import { enumToArray } from '../utils/enumToArray';

export enum StructureEnum {
  Division = 'Division',
  Group = 'Group',
  User = 'User',
  Department = 'Department',
}

export namespace StructureEnum {
  const TO_TITLE_MAP: Record<StructureEnum, string> = {
    [StructureEnum.Division]: 'Подразделения',
    [StructureEnum.Group]: 'Группы',
    [StructureEnum.User]: 'Пользователи',
    [StructureEnum.Department]: 'Отдел',
  };

  export function toReadable(value: StructureEnum): string {
    return TO_TITLE_MAP[value];
  }

  export function toArray(): StructureEnum[] {
    return enumToArray(StructureEnum);
  }
}
