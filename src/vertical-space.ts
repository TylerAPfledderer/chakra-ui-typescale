/**
 * The space theme object for vertical rhythm as a function to generate the tokens from a specified value
 * @param base - The base value use to scale the object
 * @returns RecursiveObject
 */
const verticalSpace = (base: number) => {
  const TOKEN_QUANTITY = 13;

  return Array.from<number>({
    length: TOKEN_QUANTITY,
  }).reduce<{ [x: number]: string }>((acc, _, currIndex) => {
    const tokenKey = currIndex + 1;
    // `(base / 2)` to keep whole number keys with multiples of half of the line height value.
    return { ...acc, [tokenKey]: `${((base / 2) * tokenKey).toFixed(3)}rem` };
  }, {});
};

export default verticalSpace;
