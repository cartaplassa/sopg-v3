import { useCallback, useState } from "react";
import { Button } from "@chakra-ui/react";
import { CopyToClipboard } from "react-copy-to-clipboard";

import {
  BsClipboard,
  BsClipboardCheckFill,
  BsClipboardXFill,
} from "react-icons/bs";
import StyledIcon from "@components/StyledIcon";

export default function CopyButton({ valueToCopy }: { valueToCopy: string }) {
  const [buttonText, setButtonText] = useState("Copy");
  const [buttonIcon, setButtonIcon] = useState(<StyledIcon as={BsClipboard} />);

  const onCopy = useCallback(() => {
    if (valueToCopy) {
      setButtonText("Copied!");
      setButtonIcon(<StyledIcon as={BsClipboardCheckFill} />);
    } else {
      setButtonText("No value");
      setButtonIcon(<StyledIcon as={BsClipboardXFill} />);
    }
    setTimeout(() => {
      setButtonText("Copy");
      setButtonIcon(<StyledIcon as={BsClipboard} />);
    }, 3000);
  }, [valueToCopy]);

  return (
    <CopyToClipboard onCopy={onCopy} text={valueToCopy}>
      <Button leftIcon={buttonIcon}>{buttonText}</Button>
    </CopyToClipboard>
  );
}
