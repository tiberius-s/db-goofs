export function tryRun<T>(fn: () => T | Promise<T>) {
  try {
    return fn();
  } catch (error) {
    console.error(error);
  }
}
