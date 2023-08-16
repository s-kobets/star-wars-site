type AnyFunction = (...args: any[]) => void;

export function debounce<T extends AnyFunction>(func: T, delay: number): T {
  let timeoutId: ReturnType<typeof setTimeout>;

  return function (...args: Parameters<T>) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      // @ts-ignore
      func.apply(this, args);
    }, delay);
  } as T;
}
