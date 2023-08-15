import { Suspense, useState } from "react";
import { Loading, People } from "../components";

export function Home() {
  const [query, setQuery] = useState("");

  return (
    <div>
      <label>
        Search albums:
        <input value={query} onChange={(e) => setQuery(e.target.value)} />
      </label>
      <Suspense fallback={<Loading />}>
        <People />
      </Suspense>
    </div>
  );
}
