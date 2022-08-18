# withTypeScale for ChakraUI

![NPM Package License](https://img.shields.io/npm/l/@tylerapfledderer/chakra-ui-typescale?style=for-the-badge)
![LGTM Grade](https://img.shields.io/lgtm/grade/javascript/github/TylerAPfledderer/chakra-ui-typescale?style=for-the-badge)

A theme extension for ChakraUI to generate a type scale for use with the `Text`
and `Heading` components.

> Any feedback and help to make the extension better is always welcome! 😁

## Installation

```bash
npm i @tylerapfledderer/chakra-ui-typescale
```

or

```bash
yarn add @tylerapfledderer/chakra-ui-typescale
```

---

## Usage

Because `withTypeScale` is a theme extension, it is included as an additional argument to the
`extendTheme`, along with any other extension that may be used.

```ts
import { withTypeScale } from '@tylerapfledderer/chakra-ui-typescale';

const customTheme = extendTheme(
  {
    // default custom styles
  },
  withTypeScale({ scale: 1.25 }),
);

export default customTheme;
```

### `scale` prop

It requires one prop, referred to as the `scale`. It is a unitless number value,
with the lowest common value usually `1.067` (or the "Minor Second") up to
`1.618` (the "Golden Ratio") and any other scale or custom value in between.
There is a [type-scale generator](https://type-scale.com/) by Jeremy Church for
reference. (Scroll down on the page to see his suggestions on picking a scale
value!)

### `lineHeight` prop _(optional)_

An optional prop is the `lineHeight` which is also passed as a unitless number
value, but renders as a `rem` value. It needs to be unitless to allow for
certain calculations on the return to the theme.

Why `rem` for the `lineHeight` value? This is to allow easier consistency with
the different font sizes to stay within a "baseline" separation for vertical
rhythm. In other words, if the line height in pixels for a `16px` body copy is
`24px`, and the `h1` is given a font size of `56px`, then the lineHeight for the
`h1` should be `3 * 24 = 72px`. This means the `h1` takes up three "rows" in the
base line height.

This `lineHeight` value is also used to generate a new set of `space` theme tokens specifically for the vertical rhythm in line with the type scale. This provides spacing consistency between text content, regardless of any other content that may not fit in the baseline.

> To learn more on vertical rhythm check out the discussion from designer Matej
> Latin on his site
> [BetterWebType.com](https://betterwebtype.com/articles/2018/10/15/rhythm-in-web-typography/#vertical-rhythm)

### `isClamped` prop _(optional)_

> Defaults to `false`

This prop toggles between the use of custom functionality with the CSS `clamp()` function, or Chakra's breakpoint array feature. This is applied to the `Heading` component font sizes and line heights generated in the `sizes` theme object.

- If `true` a custom function with `clamp()` is used so the font sizes and line heights are scaled gradually throughout screen sizes instead of breakpoints. By default, the minimum screen size set is `375px` and the maximum screen size is `640px`.
  - Instead of true, you can also define an object to set a `minVW` and/or `maxVW` in pixels.

```ts
withTypeScale({
  scale: 1.25,
  lineHeight: 1.45,
  isClamped: { minVW: 300, maxVW: 1200 },
});
```

- If `false` Chakra's breakpoint array is used to declare change of the font sizes and line heights via a sensible breakpoint. (breakpoint used is `min-width` 48em, aka `md`). For more information, see Chakra UI's page on [Responsive Styles](https://chakra-ui.com/docs/styled-system/responsive-styles)

---

## Return Object

`withTypeScale` generates the following set of token values for sizing:

`['sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl']`

These are then paired with each value in the scale as font sizes, from a text
used one smaller than the body copy up to a size that can be for the `h1` tag.
Since some projects may only require 3 of the six heading and/or of drastically
varying sizes, any of the sizes in scales can certainly be used for any heading
(give the `h3` element a font size from the `lg` token, say, instead of `3xl`).

The `Text` component gets a base style `lineHeight` of the `base` token line
height value.

Both the `Heading` and `Text` components receive a base style `marginBottom` of the `vertical.2` token denoting the line height value in `rem`. (See below) They also receive an object for its `sizes` group of `fontSize` /
`lineHeight` array pairs which are also assigned the same token values. See the
section in the ChakraUI docsite on
[Changing font size](https://chakra-ui.com/docs/components/typography/heading#changing-font-size)
to get an idea on how `withTypeScale` returns a similar set.

This extension also generates a subset of tokens under the `space` theme object with the object name `vertical`. There are 13 whole-number tokens, with values equal to multiple of half the given `lineHeight` from the extension's props in `rem`.

> Using whole numbers to prevent confusion and minimize complexity when calling the tokens.
> i.e. `vertical.1, vertical.2` instead of `vertical.1, vertical.1.5`

```js
// lineHeight value: 1.5
{
  space: {
    // Other values
    vertical: {
      1: "0.75rem",
      2: "1.5rem",
      3: "2.25rem"
      // etc. up to 13
    }
  }
}
```

> **So use the even token numbers if you want to use multiples of the line height!**

### Extended Theme Output

```ts
{
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
}
```

## Future Considerations

- As the extension gets used, there may be discovery of other ways to generate
  the values more efficiently or with more flexibility.
