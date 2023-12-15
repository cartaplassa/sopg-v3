import { useCallback, useState } from "react";
import { Button } from "@chakra-ui/react";
import { CopyToClipboard } from "react-copy-to-clipboard";

import {
  Clipboard as ClipboardIcon,
  ClipboardCheckFill as ClipboardCheckFillIcon,
  ClipboardXFill as ClipboardXFillIcon,
} from "@chakra-icons/bootstrap";

export default function CopyButton({ valueToCopy }: { valueToCopy: string }) {
  const [buttonText, setButtonText] = useState("Copy");
  const [buttonIcon, setButtonIcon] = useState(<ClipboardIcon />);

  const onCopy = useCallback(() => {
    if (valueToCopy) {
      console.log(valueToCopy);
      setButtonText("Copied!");
      setButtonIcon(<ClipboardCheckFillIcon />);
    } else {
      setButtonText("No value");
      setButtonIcon(<ClipboardXFillIcon />);
    }
    setTimeout(() => {
      setButtonText("Copy");
      setButtonIcon(<ClipboardIcon />);
    }, 3000);
  }, [valueToCopy]);

  return (
    <CopyToClipboard onCopy={onCopy} text={valueToCopy}>
      <Button leftIcon={buttonIcon}>{buttonText}</Button>
    </CopyToClipboard>
  );
}
