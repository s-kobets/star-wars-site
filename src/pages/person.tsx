import { Suspense } from "react";
import { Link, useParams } from "react-router-dom";
import { Loading } from "../components";

export function Person() {
  let params = useParams();

  return (
    <div>
      <Link to="/">Go to the home page</Link>
      <Suspense fallback={<Loading />}>
        <h2>Person {params.id}</h2>
      </Suspense>
    </div>
  );
}
