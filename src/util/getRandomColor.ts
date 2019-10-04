export const getRandomColor = (seedString: string) => {
  const num = seedString.split('').reduce((acc, letter) => {
    return acc + letter.charCodeAt(0);
  }, 0);
  return `#${Math.floor(Math.abs(Math.cos(num) * 16777215) % 16777215).toString(16)}`;
};
