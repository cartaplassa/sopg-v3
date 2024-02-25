import { createStandaloneToast } from '@chakra-ui/react';

import UpdateToast from "@components/UpdateToast";

const { toast } = createStandaloneToast();

const showUpdateToast = (updateSW: any) => {
  toast({
    title: "New content available",
    description: "Click on Reload button to update",
    status: "success",
    position: "bottom",
    duration: null,
    render: () => (
      <UpdateToast
        handleUpdate={() => updateSW(true)}
        handleClose={() => toast.closeAll()}
      />
    ),
  });
}

export default showUpdateToast;



