import { Routes, Route, Outlet, Link } from "react-router-dom";
import { Home, Person } from "./pages";
import { NoData } from "@semcore/ui/widget-empty";
import { Box } from "@semcore/ui/flex-box";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="person/:id" element={<Person />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </div>
  );
}

function Layout() {
  return (
    <div>
      <Outlet />
    </div>
  );
}

function NoMatch() {
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
