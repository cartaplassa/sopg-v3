import { As, Icon, IconProps } from "@chakra-ui/react";

export default function StyledIcon({ as, ...props }: IconProps & { as: As }) {
  const boxSize = "1.2em";
  //   const color = useColorModeValue("black", "primary");
  return (
    <Icon
      as={as}
      //   color={color}
      boxSize={boxSize}
      {...props}
    />
  );
}
