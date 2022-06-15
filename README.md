# withTypeScale for ChakraUI

![NPM Package License](https://img.shields.io/npm/l/@tylerapfledderer/chakra-ui-typescale?style=for-the-badge)
![LGTM Grade](https://img.shields.io/lgtm/grade/javascript/github/TylerAPfledderer/chakra-ui-typescale?style=for-the-badge)

A theme extension for ChakraUI to generate a type scale for use with the `Text`
and `Heading` components.

> This is a project for personal use, but feel free to try it out in your own
> Chakra projects. Any feedback and help to make the extension better is always
> welcome! 😁

## Installation

```bash
npm i @tylerapfledderer/chakra-ui-typescale

# or

yarn add @tylerapfledderer/chakra-ui-typescale
```

## Usage

`withTypeScale` as an extension is included as an additional argument to the
`extendTheme`

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

It requires one prop, referred to as the `scale`. It is a unitless number value,
with the lowest common value usually `1.067` (or the "Minor Second") up to
`1.618` (the "Golden Ratio") and any other scale or custom value in between.
There is a [type-scale generator](https://type-scale.com/) by Jeremy Church for
reference. (Scroll down on the page to see his suggestions on picking a scale
value!)

### `lineHeight` prop

An optional prop is the `lineHeight` which is also passed as a unitless number
value, but renders as a `rem` value. It needs to be unitless to allow for
certain calculations on the return to the theme.

Why `rem` for the `lineHeight` value? This is to allow easier consistency with
the different font sizes to stay within a "baseline" separation for vertical
rhythm. In other words, if the line height in pixels for a `16px` body copy is
`24px`, and the `h1` is given a font size of `56px`, then the lineHeight for the
`h1` should be `3 * 24 = 72px`. This means the `h1` takes up three "rows" in the
base line height.

This `lineHeight` value is also used to generate a new set of `space` theme tokens specifically for the vertical rhyhtm in line with the type scale. This provides spacing consistency between text content, regardless of any other content that may not fit in the baseline.

> To learn more on vertical rhythm check out the discussion from designer Matej
> Latin on his site
> [BetterWebType.com](https://betterwebtype.com/articles/2018/10/15/rhythm-in-web-typography/#vertical-rhythm)

## Return Object

`withTypeScale` generates the following set of token values for sizing:

`['sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl']`

These are then paired with each value in the scale as font sizes, from a text
used one smaller than the body copy up to a size that can be for the `h1` tag.
Since some projects may only require 3 of the six heading and/or of drastically
varying sizes, any of the sizes in scales can certainly be used for any heading
(give the `h3` element a font size from the `lg` token, say, instead of `3xl`).

The `Heading` component receives an object for its `sizes` group of `fontSize` /
`lineHeight` array pairs which are also assigned the same token values. See the
section in the ChakraUI docsite on
[Changing font size](https://chakra-ui.com/docs/components/typography/heading#changing-font-size)
to get an idea on how `withTypeScale` returns a similar set.

The `Text` component gets a base style `lineHeight` of the `base` token line
height value.

Both the `Heading` and `Text` components also receive a base style `marginBottom` of the `vertical.2` token denoting the line height value in `rem`. (See below)

It also generates a subset of tokens under the `space` theme object with the object name `vertical`. There are 13 whole-number tokens, with values equal to multiple of half the given `lineHeight` from the extension's props in `rem`.

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

So use the even token numbers if you want to use multiples of the line height!

## Future Considerations

- Testing with Capsize and the
  [chakra-capsize package](https://github.com/ceteio/chakra-capsize) to find any
  impact with its implementation.
- As the extension gets used, there may be discovery of other ways to generate
  the values more effeciently or with more flexibility.
