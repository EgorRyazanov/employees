import { Structure } from '../models/structure';

export const getNodeTitle = (structure: Structure) => {
  if (structure === Structure.Department) {
    return 'Сотрудники в отделе';
  } else if (structure === Structure.Division) {
    return 'Сотрудники в подразделении';
  } else if (structure === Structure.Group) {
    return 'Сотрудники в группе';
  } else {
    return 'Сотрудники в подразделении';
  }
};
