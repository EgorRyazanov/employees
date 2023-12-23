import { enumToArray } from '../utils/enumToArray';

export enum NodeViews {
  Vacancies = 'Vacancies',
  Employees = 'Employees',
}

export namespace NodeViews {
  const TO_TITLE_MAP: Record<NodeViews, string> = {
    [NodeViews.Vacancies]: 'Вакансии',
    [NodeViews.Employees]: 'Сотрудники',
  };

  export function toReadable(value: NodeViews): string {
    return TO_TITLE_MAP[value];
  }

  export function toArray(): NodeViews[] {
    return enumToArray(NodeViews);
  }
}
