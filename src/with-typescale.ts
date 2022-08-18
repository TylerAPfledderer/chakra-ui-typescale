import {
  mergeThemeOverride,
  SystemStyleObject,
  ThemeExtension,
} from '@chakra-ui/react';
import { toPrecision } from '@chakra-ui/utils';
import verticalSpace from './vertical-space';
import { clampFont } from './utils/clamp-font';

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

  /**
   * If true, the font sizes and line heights generated will use the `clamp()` function
   * instead of using an array with Chakra's breakpoint checking.
   *
   * Can also accept an object (making it truthy) to set the minimum and/or maximum viewport widths to clamp at. (`minVW` and `maxVW`)
   *
   * NOTE: This is only applied to the `sizes` theme object for the `Heading` component. The `Text` component theme does not use `sizes`.
   *
   * @default false
   */
  isClamped?: boolean | { minVW?: number; maxVW?: number };
};

export function withTypeScale(props: WithTypeScaleProps): ThemeExtension {
  const { scale, lineHeight = 1.5, isClamped = false } = props;

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
  const sizesArr: number[] = SIZE_TOKENS.map((token, index) => {
    const value = token === 'base' ? '1' : toPrecision(scale ** (index - 1), 3);

    return parseFloat(value);
  });

  /**
   * The key:value pairs of the token abbreviation and related generated font size
   */
  const fontSizesObj: Record<string, string> = SIZE_TOKENS.reduce(
    (prev, curr, currIndex) => {
      return { ...prev, [curr]: `${sizesArr[currIndex]}rem` };
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
  const lineHeightArr = sizesArr.map((size) => {
    let i = lineHeight;
    while (i < size) {
      i += lineHeight;
    }
    return i;
  });

  // Check if the `isClamped` prop is an object with min and/or max values
  const isClampedObj = typeof isClamped === 'object' ? isClamped : undefined;

  const scaledFontSize = (curr: string, currIndex: number) =>
    isClamped
      ? clampFont({
          minSize: sizesArr[currIndex - 1],
          maxSize: sizesArr[currIndex],
          minVW: isClampedObj?.minVW,
          maxVW: isClampedObj?.maxVW,
        })
      : [SIZE_TOKENS[currIndex - 1] || curr, null, curr];

  const scaledLineHeight = (currIndex: number) => {
    const lineHeightScale = isClamped
      ? clampFont({
          minSize: lineHeightArr[currIndex - 1],
          maxSize: lineHeightArr[currIndex],
          minVW: isClampedObj?.minVW,
          maxVW: isClampedObj?.maxVW,
        })
      : [
          `${lineHeightArr[currIndex - 1]}rem`,
          null,
          `${lineHeightArr[currIndex]}rem`,
        ];

    /**
     * If the lineHeight value for the current Heading size is the same as the previous,
     * return just that value.
     * Else, return the scale.
     */
    return lineHeightArr[currIndex - 1] === lineHeightArr[currIndex]
      ? `${lineHeightArr[currIndex]}rem`
      : lineHeightScale;
  };

  const sizesObj: Record<string, SystemStyleObject> = SIZE_TOKENS.reduce(
    (prev, curr, currIndex) => {
      return {
        ...prev,
        [curr]: {
          fontSize: currIndex < 2 ? curr : scaledFontSize(curr, currIndex),
          lineHeight:
            currIndex < 2
              ? `${lineHeightArr[currIndex]}rem`
              : scaledLineHeight(currIndex),
        },
      };
    },
    {},
  );

  return (theme) => {
    const vertical = verticalSpace(lineHeight);
    return mergeThemeOverride(theme, {
      fontSizes: fontSizesObj,
      space: {
        vertical,
      },
      components: {
        Heading: {
          baseStyle: {
            marginBottom: vertical[2],
          },
          sizes: sizesObj,
        },
        Text: {
          baseStyle: {
            lineHeight: sizesObj.base.lineHeight,
            marginBottom: vertical[2],
          },
          sizes: sizesObj,
        },
      },
    });
  };
}
