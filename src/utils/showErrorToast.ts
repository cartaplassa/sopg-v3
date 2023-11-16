import { createStandaloneToast } from "@chakra-ui/react";

const { toast } = createStandaloneToast();

const showErrorToast = (message: string) => {
  setTimeout(
    () =>
      toast({
        title: "Error",
        description: message,
        status: "error",
        position: "bottom",
        duration: 5000,
        isClosable: true,
      }),
    0
  );
};

export default showErrorToast;
