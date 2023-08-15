import Card from "@semcore/ui/card";
import { Flex } from "@semcore/ui/flex-box";
import { useData } from "../hooks";
import { PersonResponse } from "../types";
import { Loading } from "./loading";

export function People() {
  const { data, loading } = useData<PersonResponse>("people");

  if (!data || loading) return <Loading />;

  return (
    <Flex gap={4} flexWrap>
      {data.results.map((person) => (
        <Card>{person.name}</Card>
      ))}
    </Flex>
  );
}
