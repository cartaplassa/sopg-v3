import { chakra, Button, ChakraProps } from "@chakra-ui/react";
import { ReactNode } from "react";

interface UploadButtonProps extends ChakraProps {
  children: ReactNode;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  leftIcon?: JSX.Element;
  rightIcon?: JSX.Element;
}

export default function UploadButton({
  onChange,
  children,
  leftIcon,
  rightIcon,
  ...props
}: UploadButtonProps) {
  return (
    <chakra.label cursor="pointer" {...props}>
      {/* W/o chakra factory hover prop doesn't work on Button */}
      <input style={{ display: "none" }} type="file" onChange={onChange} />
      <Button as="span" w="100%" leftIcon={leftIcon} rightIcon={rightIcon}>
        {children}
      </Button>
    </chakra.label>
  );
}
