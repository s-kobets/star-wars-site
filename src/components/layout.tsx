import { useCallback } from "react";
import { Box } from "@semcore/flex-box";
import Button from "@semcore/button";
import { Error as ErrorWidget } from "@semcore/widget-empty";
import ReloadM from "@semcore/icon/Reload/m";

export const ErrorLayout = () => {
  const handleReload = useCallback(() => {
    window && window.location.reload();
  }, []);
  return (
    <ErrorWidget>
      <Box mt={4}>
        <Button onClick={handleReload} addonLeft={ReloadM}>
          Reload page
        </Button>
      </Box>
    </ErrorWidget>
  );
};
