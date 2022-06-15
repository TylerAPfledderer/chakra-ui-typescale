---
'@tylerapfledderer/chakra-ui-typescale': patch
---

Fix generated component base styles where the default values for `marginBottom` should come directly from the `verticalSpace` function return instead of calling the token strings.
