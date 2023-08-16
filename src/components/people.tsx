import Card from "@semcore/ui/card";
import { Flex, Box } from "@semcore/ui/flex-box";
import Pagination from "@semcore/ui/pagination";
import { InputValueProps } from "@semcore/ui/input";
import Button from "@semcore/ui/button";
import { Error, NoData } from "@semcore/ui/widget-empty";
import SpinContainer from "@semcore/ui/spin-container";
import ReloadM from "@semcore/icon/Reload/m";

import { useData } from "../hooks";
import { PersonResponse } from "../types";
import { useCallback, useEffect, useState } from "react";
import { debounce } from "../helpers";
import { Filter } from "./filter";

export function People() {
  const [searchName, setSearchName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const { data, loading, error } = useData<PersonResponse>(
    `people?page=${currentPage}&search=${searchName}`
  );
  const totalPages = data?.count ? Math.ceil(data?.count / 10) : 0;

  useEffect(() => {
    if (searchName.length) {
      setCurrentPage(1);
    }
  }, [searchName.length]);

  const handleSearchName = useCallback<Required<InputValueProps>["onChange"]>(
    (value) => {
      debounce(setSearchName, 300)(value);
    },
    []
  );

  console.log(123, data);

  return (
    <>
      <Filter value={searchName} onChange={handleSearchName} />

      {error && (
        <Error>
          <Box mt={4}>
            <Button tag="a" href="/" addonLeft={ReloadM}>
              Reload page
            </Button>
          </Box>
        </Error>
      )}

      {!error && (
        <SpinContainer loading={loading} hMin={300}>
          <Flex py={6} gap={4} flexWrap>
            {!data?.results.length && (
              <NoData
                w="100vw"
                type="nothing-found"
                description="Try changing your filters."
              />
            )}
            {data?.results.map((person) => (
              <>
                {JSON.stringify(person)}
                <Card>{person.name}</Card>
              </>
            ))}
          </Flex>
          <Pagination
            currentPage={currentPage}
            onCurrentPageChange={setCurrentPage}
            totalPages={totalPages}
          />
        </SpinContainer>
      )}
    </>
  );
}
