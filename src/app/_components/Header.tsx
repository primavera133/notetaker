import { Avatar, Box, Flex, Heading } from "@chakra-ui/react";
import { signIn, signOut, useSession } from "next-auth/react";

export const Header = () => {
  const { data: sessionData } = useSession();

  return (
    <Flex
      direction={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
      p={4}
      bgColor={"gray.100"}
    >
      <Heading as="h1" size="md">
        {sessionData?.user?.name ? `Notes for ${sessionData.user.name}` : ""}
      </Heading>
      <Box>
        {sessionData?.user ? (
          <Avatar
            src={sessionData?.user?.image ?? ""}
            name={sessionData?.user?.name ?? ""}
            onClick={() => void signOut()}
          />
        ) : (
          <button onClick={() => void signIn()}>Sign in</button>
        )}
      </Box>
    </Flex>
  );
};
