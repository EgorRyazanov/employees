import { EmployeeViews } from '../../../../models/employeeViews';
import { NodeViews } from '../../../../models/nodeVIew';

export interface ParamsOptions {
  nodeViews: NodeViews[];
  employeeViews: EmployeeViews[];
  isNodeVisible: boolean;
  isEmployeeVisible: boolean;
}
