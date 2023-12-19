import { enumToArray } from '../utils/enumToArray';
import { OptionSelect } from './optionSelect';

/** Project status text. */
export enum NodeCities {
  Ekb = 'Брусника.Екатеринбург',
  Kurgan = 'Брусника.Курган',
}

/** Namespace related to project status. */
export namespace NodeCities {
  const TO_TITLE_MAP: Record<NodeCities, string> = {
    [NodeCities.Ekb]: 'Екатерибург',
    [NodeCities.Kurgan]: 'Курган',
  };

  /**
   * Converts a certain project status type to readable title.
   * @param value Project status type.
   */
  export function toReadable(value: NodeCities): string {
    return TO_TITLE_MAP[value];
  }

  /**
   * Gets list of all project status types.
   */
  export function toArray(): NodeCities[] {
    return enumToArray(NodeCities);
  }

  export function isNodeCity(value: unknown): value is NodeCities {
    return typeof value === 'string' && NodeCities.toArray().filter(nodeCity => nodeCity === value).length !== 0;
  }

  /**
   * Gets list of all project status types.
   */
  export function toOptions(): OptionSelect<NodeCities>[] {
    return NodeCities.toArray().map(value => ({
      name: NodeCities.toReadable(value),
      value,
    }));
  }
}
