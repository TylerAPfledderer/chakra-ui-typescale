import { extendTheme } from '@chakra-ui/react';
import { withTypeScale } from '@tylerapfledderer/chakra-ui-typescale';

const customTheme = extendTheme(
  {
    styles: {
      global: {
        html: {
          fontSize: '125%',
        },
      },
    },
  },
  withTypeScale({ scale: 1.25, lineHeight: 1.45 }),
);

export default customTheme;
