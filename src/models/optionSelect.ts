/**
 * Select options.
 */
export interface OptionSelect<T> {
  /**
   * Name of the option by which filtering.
   */
  readonly name: string;
  /**
   * Value of the option.
   */
  readonly value: T;
}
