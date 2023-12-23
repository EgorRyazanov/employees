import { EmployeeViews } from '../../../../models/EmployeeViews';
import { NodeViews } from '../../../../models/nodeVIew';

export interface ParamsOptions {
  nodeViews: NodeViews[];
  employeeViews: EmployeeViews[];
  isNodeVisible: boolean;
  isEmployeeVisible: boolean;
}
