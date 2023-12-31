import Card from "@semcore/card";
import { Flex, Box } from "@semcore/flex-box";
import Pagination from "@semcore/pagination";
import { Text } from "@semcore/typography";
import { InputValueProps } from "@semcore/input";
import { NoData } from "@semcore/widget-empty";
import SpinContainer from "@semcore/spin-container";

import { useData } from "../hooks";
import { PeopleResponse } from "../types";
import { useCallback, useEffect, useState } from "react";
import { debounce } from "../helpers";
import { Filter } from "./filter";
import { Avatar } from "./avatar";
import { Link } from "react-router-dom";

import logoWhite from "images/logo-white.png";
import logoBlack from "images/logo-black.png";
import { useContextTokens } from "@semcore/utils/lib/ThemeProvider";
import { URL, maxPerson } from "helpers/consts";
import { ErrorLayout } from "./layout";

const searchParams = new URLSearchParams();

export function People() {
  const tokens = useContextTokens();
  const isDark = tokens ? tokens["--bg-main"] !== "white" : false;
  const [searchName, setSearchName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [fetchParams, setFetchParams] = useState(searchParams.toString());

  const { data, loading, error } = useData<PeopleResponse>(
    `people?${fetchParams}`
  );

  const totalPages = data?.count ? Math.ceil(data?.count / maxPerson) : 0;

  useEffect(() => {
    searchParams.set("page", String(currentPage));
    searchParams.set("search", searchName);
    setFetchParams(searchParams.toString());
  }, [currentPage, searchName]);

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
      <Flex mb={4} justifyContent="center" style={{ overflowX: "hidden" }}>
        {isDark ? (
          <img src={logoBlack} width="700" height="400" alt="logo" />
        ) : (
          <img src={logoWhite} width="700" height="400" alt="logo" />
        )}
      </Flex>
      <Filter value={searchName} onChange={handleSearchName} />

      {error && <ErrorLayout />}

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
                    to={`/${URL.person}/${person.url.replace(
                      /https:\/\/swapi.dev\/api\/people\//,
                      ""
                    )}`}
                    position="absolute"
                    top={0}
                    right={0}
                    bottom={0}
                    left={0}
                  />
                  <Avatar name={person.name} />
                  <Text bold py={2}>
                    {person.name}
                  </Text>
                </Flex>
              </Card>
            ))}
          </Flex>
          <Pagination
            mx="2%"
            mb={4}
            currentPage={currentPage}
            onCurrentPageChange={setCurrentPage}
            totalPages={totalPages}
          >
            <Pagination.FirstPage size="l" />
            <Pagination.PrevPage size="l" />
            <Pagination.NextPage size="l" />
            <Pagination.PageInput size="l" />
            <Pagination.TotalPages size={300} />
          </Pagination>
        </SpinContainer>
      )}
    </>
  );
}
