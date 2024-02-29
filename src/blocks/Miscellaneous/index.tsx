import {
  chakra,
  VStack,
  Grid,
  Button,
  Switch,
  Text,
  Link,
  useColorMode,
  Icon,
} from "@chakra-ui/react";

import { FaGithub as GithubIcon } from "react-icons/fa";
import { MdOutlineCloudUpload as UploadIcon } from "react-icons/md";
import { FaFileDownload as DownloadIcon } from "react-icons/fa";

import { StateType, isError, readConfig, useConfigStore } from "@store/index";

import showErrorToast from "@utils/showErrorToast";
import { ChangeEvent } from "react";

import UploadButton from "@components/buttons/UploadButton";
import StyledIcon from "@components/StyledIcon";

import showUpdateToast from "@utils/updateSW";

interface HTMLFileInputElement extends HTMLInputElement {
  files: FileList;
}

interface FileProps {
  data: BlobPart;
  fileName: string;
  fileType: string;
}

const downloadFile = ({ data, fileName, fileType }: FileProps) => {
  // Create a blob with the data we want to download as a file
  const blob = new Blob([data], { type: fileType });
  // Create an anchor element and dispatch a click event on it
  // to trigger a download
  const a = document.createElement("a");
  a.download = fileName;
  a.href = window.URL.createObjectURL(blob);
  const clickEvt = new MouseEvent("click", {
    view: window,
    bubbles: true,
    cancelable: true,
  });
  a.dispatchEvent(clickEvt);
  a.remove();
};

export default function Miscellaneous() {
  const handleToggleLeetify = useConfigStore(
    (state: StateType) => state.toggleLeetify
  );
  const config = useConfigStore((state: StateType) => state.config);
  const setConfig = useConfigStore((state: StateType) => state.setConfig);

  const { colorMode, toggleColorMode } = useColorMode();

  const downloadConfig = (_: React.MouseEvent<HTMLElement>) => {
    downloadFile({
      data: JSON.stringify(config),
      fileName: "config.json",
      fileType: "text/json",
    });
  };

  const uploadConfig = (e: ChangeEvent<HTMLFileInputElement>) => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = (e: ProgressEvent<FileReader>) => {
      const result = (e.target as FileReader).result;
      if (typeof result !== "string") return;
      const parsed = JSON.parse(result);
      const newConfig = readConfig(parsed);

      if (!isError(newConfig)) setConfig(newConfig);
    };
  };

  return (
    <VStack>
      <chakra.label alignSelf="flex-start">
        <Switch onChange={handleToggleLeetify} isChecked={config.HDT.leetify} />
        <Text ml=".5em" as="span">
          Toggle leetrules
        </Text>
      </chakra.label>
      <chakra.label alignSelf="flex-start">
        <Switch onChange={toggleColorMode} isChecked={colorMode === "dark"} />
        <Text ml=".5em" as="span">
          Dark mode
        </Text>
      </chakra.label>
      <Button hidden onClick={showUpdateToast}>[DEBUG] Update toast</Button>
      <Grid
        w="100%"
        gap=".5em"
        gridTemplateColumns={{ base: "repeat(1, 1fr)", sm: "repeat(2, 1fr)" }}
      >
        <UploadButton
          leftIcon={<StyledIcon as={UploadIcon} />}
          onChange={uploadConfig}
          flexGrow={1}
        >
          Load config
        </UploadButton>
        <Button
          leftIcon={<StyledIcon as={DownloadIcon} />}
          onClick={downloadConfig}
          flexGrow={1}
        >
          Save config
        </Button>
      </Grid>

      <Button hidden onClick={() => console.log(config)}>
        Log config
      </Button>
      <Button hidden onClick={() => showErrorToast("Debug toast")}>
        [DEBUG] Show toast
      </Button>
      <Text>
        Copyleft,{" "}
        <Link href="https://github.com/cartaplassa/sopg-v3" isExternal>
          <Icon as={GithubIcon} /> Cartaplassa
        </Link>
        , 2023
      </Text>
    </VStack>
  );
}
