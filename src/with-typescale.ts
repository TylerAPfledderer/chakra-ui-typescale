import { mergeThemeOverride, ThemeExtension } from '@chakra-ui/react';
import { toPrecision } from '@chakra-ui/utils';
import { SystemStyleObject } from '@chakra-ui/theme-tools';
import verticalSpace from './vertical-space';

type WithTypeScaleProps = {
  /**
   * The multiplier that is used to generate the set of font sizes
   */
  scale: number;

  /**
   * Base line-height number in rem to help assign proper lineHeight to each font-size generated for defaults, and used to generate vertical spacing tokens.
   *
   * The `rem` value helps calculate the actual line height for each font size to keep with vertical rhythm practice.
   * @default 1.5
   */
  lineHeight?: number;
};

export function withTypeScale(props: WithTypeScaleProps): ThemeExtension {
  const { scale, lineHeight = 1.5 } = props;

  if (typeof lineHeight !== 'number')
    throw Error(
      "`lineHeight` needs to be a number with no unit. The unit 'rem' will be added to it.",
    );

  /**
   * The token values to use
   */
  const SIZE_TOKENS = ['sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl'];

  /**
   * Holds the generated font sizes
   */
  const sizesArr: number[] = [];
  for (let i = 0; i < SIZE_TOKENS.length; i++) {
    const value =
      SIZE_TOKENS[i] === 'base' ? '1' : toPrecision(Math.pow(scale, i - 1), 3);

    sizesArr.push(parseFloat(value));
  }
  /**
   * The key:value pairs of the token abbreviation and related generated font size
   */
  const fontSizesObj: Record<string, string> = SIZE_TOKENS.reduce(
    (prev, curr, currIndex) => {
      return { ...prev, [curr]: sizesArr[currIndex] + 'rem' };
    },
    {},
  );

  /**
   * Array of line-heights to match the respective font sizes.
   * Array created in multiples of the function's `lineHeight` value
   * so each font size is kept aligned in the vertical "grid"
   *
   * @example
   * If the base `lineHeight` is 24px (1.5rem), then if the given font size is
   * 32px, then its line height should be 48px, taking up two "rows"
   */
  let lineHeightArr = sizesArr.map((size) => {
    let i = lineHeight;
    while (i < size) {
      i += lineHeight;
    }
    return i + 'rem';
  });

  const headingSizesObj: Record<string, SystemStyleObject> = SIZE_TOKENS.reduce(
    (prev, curr, currIndex) => {
      return {
        ...prev,
        [curr]: {
          fontSize:
            currIndex < 2
              ? curr
              : [SIZE_TOKENS[currIndex - 1] || curr, null, curr],
          lineHeight:
            currIndex < 2
              ? lineHeightArr[currIndex]
              : [lineHeightArr[currIndex - 1], null, lineHeightArr[currIndex]],
        },
      };
    },
    {},
  );

  return (theme) => {
    return mergeThemeOverride(theme, {
      fontSizes: fontSizesObj,
      space: {
        vertical: verticalSpace(lineHeight),
      },
      components: {
        Heading: {
          baseStyle: {
            marginBottom: 'vertical.2',
          },
          sizes: headingSizesObj,
        },
        Text: {
          baseStyle: {
            lineHeight: headingSizesObj.base.lineHeight,
            marginBottom: 'vertical.2',
          },
        },
      },
    });
  };
}
