import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

export default function Profile() {
  return (
    <Flex align="center">
      <Box mr="4" textAlign="right">
        <Text>Kelvin Oliveira</Text>
        <Text>keelviinn@gmail.com</Text>
      </Box>

      <Avatar size="md" name="Kelvin Oliveira" src="https://avatars.githubusercontent.com/u/50298432?v=4" />
    </Flex>
  );
}