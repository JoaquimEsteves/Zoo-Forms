export const isNullish = <T>(
  foo: T | null | undefined
): foo is null | undefined => foo == null;

export const isNotNullish = <T>(foo: T | null | undefined): foo is T =>
  !isNullish(foo);

export const interpolateSize = (
  size: React.CSSProperties["width"],
  defaultValue: React.CSSProperties["width"] = undefined
) => {
  if (isNullish(size)) {
    return defaultValue;
  }
  if (size.constructor === Number) {
    return `${size}px`;
  }
  return size;
};



/**
 * IIFE: Immediately Invoked Function Expression.
 *
 * Basically a nicer way of writting:
 *
 * ```
 * const hello = (function IIFE() {
 *   if (I_can_now_use_statements) {
 *     return true;
 *   }
 * })();   
 * ```
 *
 */
export const IIFE = <T>(f: () => T): T => f();

export const no_op = () => void 0
