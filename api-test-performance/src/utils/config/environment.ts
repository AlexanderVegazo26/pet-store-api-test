export const getEnvVar = (name: string, defaultValue: string): number => {
  try {
    // @ts-ignore
    const value = globalThis[name] || defaultValue;
    return parseInt(value, 10);
  } catch {
    return parseInt(defaultValue, 10);
  }
};
