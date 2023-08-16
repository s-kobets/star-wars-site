import { Link, useParams } from "react-router-dom";
import { useData } from "../hooks";
import { PersonResponse, PlanetResponse } from "../types";
import { Box, Flex } from "@semcore/ui/flex-box";
import Button from "@semcore/ui/button";
import { Error, NoData } from "@semcore/ui/widget-empty";
import ReloadM from "@semcore/icon/Reload/m";
import SpinContainer from "@semcore/ui/spin-container";
import Card from "@semcore/ui/card";
import ArrowLeftL from "@semcore/icon/ArrowLeft/l";
import { Text } from "@semcore/ui/typography";
import Skeleton from "@semcore/ui/skeleton";
import { ReactNode } from "react";

const MAP_KEYS = [
  "birth_year",
  "eye_color",
  "gender",
  "hair_color",
  "height",
  "mass",
  "skin_color",
] as Partial<keyof PersonResponse>[];

function Planet({ url }: { url: string }) {
  const { data, loading, error } = useData<PlanetResponse>(
    url.replace(/https:\/\/swapi.dev\/api\//, "")
  );

  if (error) return null;

  if (loading) {
    return (
      <Skeleton h={20}>
        <rect x="0" y="0" rx="4" ry="4" height="20" width="100%" />
      </Skeleton>
    );
  }

  return (
    <Flex flexWrap gap={2}>
      {data?.name ? <Text>{data?.name}</Text> : null}
    </Flex>
  );
}

const PersonInfo = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => (
  <Card w="calc(100% / 4 - 4%)" m="2%">
    <Card.Header>
      <Card.Title>{title}</Card.Title>
    </Card.Header>
    <Card.Body>{children}</Card.Body>
  </Card>
);

export function Person() {
  const params = useParams();
  const { data, loading, error } = useData<PersonResponse>(
    `people/${params.id}`
  );

  console.log(123, data);

  return (
    <>
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
          <Card m="2%">
            <Card.Header tag={Flex} alignItems="center">
              <Text tag={Link} to="/" color="black">
                <ArrowLeftL />
              </Text>
              <Card.Title tag="p" w="100%" bold size={600} textAlign="center">
                {data?.name}
              </Card.Title>
            </Card.Header>

            <Card.Body>
              {!data && (
                <NoData
                  w="100vw"
                  type="nothing-found"
                  description="Try changing your filters."
                />
              )}
              <Text tag="p" textAlign="center" size={500} bold>
                Home world
              </Text>

              {typeof data?.homeworld === "string" ? (
                <PersonInfo title="planet">
                  <Planet url={data.homeworld} />
                </PersonInfo>
              ) : null}

              {Array.isArray(data?.homeworld)
                ? data?.homeworld.map((url) => (
                    <PersonInfo title="planet">
                      <Planet url={url} />
                    </PersonInfo>
                  ))
                : null}

              <Text tag="p" textAlign="center" size={500} bold>
                Body
              </Text>
              <Flex flexWrap>
                {data &&
                  Object.keys(data)
                    .filter((key) =>
                      MAP_KEYS.includes(key as keyof PersonResponse)
                    )
                    .map((key) => (
                      <PersonInfo title={key}>
                        {/* @ts-ignore */}
                        {data[key as keyof PersonResponse]}
                      </PersonInfo>
                    ))}
              </Flex>
            </Card.Body>
          </Card>
        </SpinContainer>
      )}
    </>
  );
}
