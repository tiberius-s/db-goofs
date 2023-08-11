export function tryRun<T>(fn: () => Promise<T>) {
  try {
    return fn();
  } catch (error) {
    console.error(error);
  }
}
