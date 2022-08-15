# @tylerapfledderer/chakra-ui-typescale

## 1.2.1

### Patch Changes

- ee6e63b: Update dependencies, import(s) and remove `@chakra-ui/theme-tools` dependency.

  - Dependecy versions have been bumped
  - Removed `@chakra-ui/theme-tools` dependency as it is no longer needed to import `SystemStyleObject`
  - `SystemStyleObject` is now imported from `@chakra-ui/react`

## 1.2.0

### Minor Changes

- 1daaa73: Add tsup to build the package

### Patch Changes

- 56e1f6c: Bump dependencies

## 1.1.2

### Patch Changes

- e0e5407: Fix generated component base styles where the default values for `marginBottom` should come directly from the `verticalSpace` function return instead of calling the token strings.

## 1.1.1

### Patch Changes

- ceaee99: Fix import for `vertical-space` into `with-typescale`

## 1.1.0

### Minor Changes

- 0a6e762: Add generation of vertical spacing tokens

## 1.0.5

### Patch Changes

- e3b880a: fix link for LGTM language grade badge

## 1.0.4

### Patch Changes

- cb70fe4: Add README badges for license and language grade

## 1.0.3

### Patch Changes

- adf9330: fix usage example in README

## 1.0.2

### Patch Changes

- eb8d754: Add github action step to run build for release workflow
