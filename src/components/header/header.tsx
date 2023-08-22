import { useState } from "react";
import { Box, Flex, Text, Grid, Button } from "@chakra-ui/react";
import { passwordEntropy } from "./passwordEntropy";
import { StrengthBar } from "./strengthBar";
import testGeneratePassword from "./passGenTest";

export default function Header() {
  const [password, setPassword] = useState("Y0ur+P4ssw0rd+H3r3");
  const [entropy, setEntropy] = useState(passwordEntropy(password));
  const regenPassword = () => {
    const newPassword = testGeneratePassword();
    setPassword(newPassword);
    const newEntropy = passwordEntropy(newPassword);
    setEntropy(newEntropy);
  };

  return (
    <Box p="1rem">
      <Box mb={3} boxShadow="base" rounded="md" overflow="hidden">
        <Box h="8rem">
          <Text>{password}</Text>
        </Box>
        <Flex
          justify="space-between"
          align="center"
          p="1rem"
          borderTop="1px"
          borderBottom="1px"
          borderColor="gray.100"
        >
          <Text as="b">Entropy:</Text>
          <Text as="b">{entropy} bits</Text>
        </Flex>
        <StrengthBar entropy={entropy} />
      </Box>
      <Grid templateColumns="repeat(2, 1fr)" gap={2}>
        <Button onClick={regenPassword}>Generate</Button>
        <Button>Copy</Button>
      </Grid>
    </Box>
  );
}
