import {
  VStack,
  Grid,
  Button,
  Switch,
  Text,
  Link,
  Box,
} from "@chakra-ui/react";
import {
  Github as GithubIcon,
  CloudUpload as CloudUploadIcon,
  Download as DownloadIcon,
} from "@chakra-icons/bootstrap";

import { StateType, isError, readConfig, useConfigStore } from "@store/index";

import showErrorToast from "@utils/showErrorToast";
import { ChangeEvent } from "react";

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

      // console.log(config);
      if (!isError(newConfig)) setConfig(newConfig);
      // console.log(config);
    };
  };

  return (
    <VStack>
      <Switch onChange={handleToggleLeetify} isChecked={config.HDT.leetify}>
        Toggle leetrules
      </Switch>
      <Switch>Dark mode [WIP]</Switch>
      <Grid
        w="100%"
        gap=".5rem"
        gridTemplateColumns={{ base: "repeat(1, 1fr)", sm: "repeat(2, 1fr)" }}
      >
        <Box flexGrow={1}>
          <label>
            <input
              style={{ display: "none" }}
              type="file"
              onChange={uploadConfig}
            />
            <Button
              as="span"
              w="100%"
              leftIcon={<CloudUploadIcon />}
              // onClick={uploadConfig}
            >
              Load config
            </Button>
          </label>
        </Box>
        <Button
          as="span"
          leftIcon={<DownloadIcon />}
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
          <GithubIcon /> Cartaplassa
        </Link>
        , 2023
      </Text>
    </VStack>
  );
}
