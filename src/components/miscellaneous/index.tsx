import { VStack, Grid, Button, Switch, Text, Link } from "@chakra-ui/react";
import { Github, CloudUpload, Download } from "@chakra-icons/bootstrap";
import { StateType, useConfigStore } from "@store/index";

import showErrorToast from "@utils/showErrorToast";

export default function Miscellaneous() {
  const handleToggleLeetify = useConfigStore(
    (state: StateType) => state.toggleLeetify
  );

  return (
    <VStack>
      <Switch onChange={handleToggleLeetify} defaultChecked>
        Toggle leetrules
      </Switch>
      <Switch>Dark mode [WIP]</Switch>
      <Grid
        w="100%"
        gap=".5rem"
        gridTemplateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)"]}
      >
        <Button leftIcon={<CloudUpload />} flexGrow={1}>
          Load config [WIP]
        </Button>
        <Button leftIcon={<Download />} flexGrow={1}>
          Save config [WIP]
        </Button>
      </Grid>
      <Button hidden onClick={() => showErrorToast("Debug toast")}>
        [DEBUG] Show toast
      </Button>
      <Text>
        Copyleft,{" "}
        <Link href="https://github.com/cartaplassa/sopg-v3" isExternal>
          <Github /> Cartaplassa
        </Link>
        , 2023
      </Text>
    </VStack>
  );
}
