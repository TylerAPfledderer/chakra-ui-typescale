---
'@tylerapfledderer/chakra-ui-typescale': minor
---

Add option to use `clamp()` functionality for `Heading` sizes via the prop `isClamped`.

> Defaults to `false`

- Adds ability to toggle between the use of the CSS `clamp()` function or the use of Chakra's breakpoint array feature for the `Heading` component's `sizes` object. Affects both the font sizes and line heights generated.
- Instead of `true` to enable `clamp()`, can accept an object to replace the default sizes (in pixels) with newly defined min and/or max screen sizes to clamp to.

```ts
withTypeScale({
  scale: 1.25,
  lineHeight: 1.45,
  isClamped: { minW: 300, maxW: 1200 },
});
```

- The README file is updated to reflect the new functionality, along with other minor changes to the documentation.

> NOTE: This is not a breaking change, as the clamp functionality is not enabled by default, and will not affect current projects. Enabling the functionality, however, may require adjustments as it could unexpectedly break UI layouts.
