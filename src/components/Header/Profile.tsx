import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

interface ProfileProps {
  showProfileData: boolean;
  avatar?: string;
  name: string;
  email: string;
}

export default function Profile({ showProfileData = true, avatar, name, email }: ProfileProps) {
  return (
    <Flex align="center">
      { showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>{name}</Text>
          <Text>{email}</Text>
        </Box>
      ) }      

      <Avatar size="md" name="Kelvin Oliveira" src={avatar} />
    </Flex>
  );
}