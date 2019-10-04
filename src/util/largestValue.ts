export const largestValue = (data: any[], key: string) => data.reduce((prev, current) => {
  return prev[key] > current[key] ? prev : current;
}, 0);
