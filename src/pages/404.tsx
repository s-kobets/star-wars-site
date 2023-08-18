import { NoData } from "@semcore/widget-empty";
import { Box } from "@semcore/flex-box";
import { Link } from "react-router-dom";

export function NoMatch() {
  return (
    <NoData
      h="100vh"
      type="nothing-found"
      description="Try changing your filters."
    >
      <Box mt={4}>
        <Link to="/">Go to the home page</Link>
      </Box>
    </NoData>
  );
}
