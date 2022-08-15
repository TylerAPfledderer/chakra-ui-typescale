// Based on CSS Tricks walkthrough of calculating the clamp for font sizes: https://css-tricks.com/linearly-scale-font-size-with-css-clamp-based-on-the-viewport/

import { toPrecision } from '@chakra-ui/utils';

type ClampFontProps = {
  minSize: number;
  maxSize: number;
  minVW?: number;
  maxVW?: number;
};

export function clampFont(props: ClampFontProps) {
  const { minSize, maxSize, minVW = 375, maxVW = 640 } = props;

  const minVWtoRem = minVW / 16;
  const maxVWtoRem = maxVW / 16;

  const slope = (maxSize - minSize) / (maxVWtoRem - minVWtoRem);
  const yAxisDirection = -minVWtoRem * slope + minSize;
  const preferredVal = `${toPrecision(yAxisDirection, 2)}rem + ${toPrecision(
    slope * 100,
    2,
  )}vw`;

  return `clamp(${minSize}rem, ${preferredVal}, ${maxSize}rem)`;
}
