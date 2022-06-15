/**
 * The space theme object for vertical rhythm as a function to generate the tokens from a specified value
 * @param base - The base value use to scale the object
 * @returns RecursiveObject
 */
const verticalSpace = (base: number) => {
  const TOKEN_QUANTITY = 13;
  const keyNameArray = Array.from<number>({
    length: TOKEN_QUANTITY,
  }).map((_, index) => {
    const key = index + 1;
    return key * 0.5;
  });
  const spaces = keyNameArray.reduce<{ [x: number]: string }>((acc, curr) => {
    const tokenKey = curr;
    return { ...acc, [tokenKey]: `${(base * curr).toFixed(3)}rem` };
  }, {});
  return spaces;
};

export default verticalSpace;
