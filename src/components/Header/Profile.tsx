import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

interface ProfileProps {
  showProfileData: boolean;
  avatar: string;
}

export default function Profile({ showProfileData = true, avatar }: ProfileProps) {
  return (
    <Flex align="center">
      { showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>Kelvin Oliveira</Text>
          <Text>keelviinn@gmail.com</Text>
        </Box>
      ) }      

      <Avatar size="md" name="Kelvin Oliveira" src={avatar} />
    </Flex>
  );
}