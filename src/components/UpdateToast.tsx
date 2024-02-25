import { Box, Text, Button, BoxProps } from '@chakra-ui/react';

interface UpdateToastProps extends BoxProps {
  handleUpdate: any;
  handleClose: any;
}

const style = {
  border: "1px solid var(--chakra-colors-primary)",
  borderRadius: "md",
  bg: "secondary",
  p: "1em",
}

export default function UpdateToast({handleUpdate, handleClose}: UpdateToastProps) {
  return (
    <Box sx={style}>
      <Text as="b">
        New content available
      </Text>
      <Text mb="1em">
        Click on Reload button to update
      </Text>
      <Box>
        <Button onClick={handleUpdate} mr={4}>
          Reload
        </Button>
        <Button onClick={handleClose} variant="outline" _hover={{borderColor: "primary"}}>
          Close
        </Button>
      </Box>
    </Box>
  )
}
