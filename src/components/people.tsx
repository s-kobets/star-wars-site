import Card from "@semcore/ui/card";
import { Flex, Box } from "@semcore/ui/flex-box";
import Pagination from "@semcore/ui/pagination";
import { Text } from "@semcore/ui/typography";
import { InputValueProps } from "@semcore/ui/input";
import Button from "@semcore/ui/button";
import { Error, NoData } from "@semcore/ui/widget-empty";
import SpinContainer from "@semcore/ui/spin-container";
import ReloadM from "@semcore/icon/Reload/m";

import { useData } from "../hooks";
import { PeopleResponse } from "../types";
import { useCallback, useEffect, useState } from "react";
import { debounce } from "../helpers";
import { Filter } from "./filter";
import { Avatar } from "./avatar";
import { Link } from "react-router-dom";

export function People() {
  const [searchName, setSearchName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const { data, loading, error } = useData<PeopleResponse>(
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
          <Flex py={6} flexWrap>
            {!data?.results.length && (
              <NoData
                w="100vw"
                type="nothing-found"
                description="Try changing your filters."
              />
            )}
            {data?.results.map((person) => (
              <Card
                key={person.name}
                w="calc(100% / 2 - 4%)"
                m="2%"
                position="relative"
              >
                <Flex direction="column" alignItems="center">
                  <Box
                    tag={Link}
                    to={`/person/${person.url.replace(
                      /https:\/\/swapi.dev\/api\/people\//,
                      ""
                    )}`}
                    position="absolute"
                    top={0}
                    right={0}
                    bottom={0}
                    left={0}
                  />
                  <Avatar />
                  <Text bold py={2}>
                    {person.name}
                  </Text>
                </Flex>
              </Card>
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
