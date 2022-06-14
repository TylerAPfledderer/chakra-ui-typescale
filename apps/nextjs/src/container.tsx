import { Flex, FlexProps } from '@chakra-ui/react';

export const Container = (props: FlexProps) => (
  <Flex
    direction="column"
    alignItems="center"
    justifyContent="flex-start"
    color="black"
    maxW="container.xl"
    m="auto"
    py="4"
    {...props}
  />
);
