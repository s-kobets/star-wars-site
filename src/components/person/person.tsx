import { Link, useParams } from "react-router-dom";
import { Box, Flex } from "@semcore/flex-box";
import Button from "@semcore/button";
import { Error, NoData } from "@semcore/widget-empty";
import ReloadM from "@semcore/icon/Reload/m";
import SpinContainer from "@semcore/spin-container";
import Card from "@semcore/card";
import ArrowLeftL from "@semcore/icon/ArrowLeft/l";
import { Text } from "@semcore/typography";
import EditL from "@semcore/icon/Edit/l";
import CloseL from "@semcore/icon/Close/l";
import { PersonInfo, PersonInfoList } from "./person-info";
import { PersonResponse } from "types";
import { useData } from "hooks";
import { Fragment, ReactNode, useCallback, useEffect, useState } from "react";
import { capitalizeFirstLetter } from "helpers";
import { MAP_KEYS_DESCRIPTION, MAP_KEYS_LIST_ENUM } from "types/consts";

const MAP_KEYS_LIST = Object.keys(MAP_KEYS_LIST_ENUM).filter(
  (name) => !["planet"].includes(name)
) as Partial<keyof PersonResponse>[];

const Title = (props: { children: ReactNode }) => (
  <Text tag="p" textAlign="center" size={500} bold {...props} />
);

export function Person() {
  const params = useParams();
  const { data, loading, error } = useData<PersonResponse>(
    `people/${params.id}`
  );
  const [isEdit, setIsEdit] = useState(false);
  const [form, setForm] = useState<Record<string, string | string[]>>({});
  const localStorageKey = `person-${params.id}`;

  useEffect(() => {
    const form = localStorage.getItem(localStorageKey);
    if (form) {
      setForm(JSON.parse(form));
      return;
    }
    if (data) {
      setForm(
        Object.keys(data).reduce(
          // @ts-ignore
          (acc, key) => ({ ...acc, [key]: data[key] }),
          {}
        )
      );
    }
  }, [data, localStorageKey]);

  const handleChangeEdit = useCallback(
    (isEdit: boolean) => () => {
      setIsEdit(isEdit);
    },
    []
  );

  const handleChangeFormItem = useCallback(
    (key: keyof PersonResponse) => (value: string | string[]) => {
      setForm({ ...form, [key as string]: value });
    },
    [form]
  );

  const handleSaveForm = useCallback(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(form));
    setIsEdit(false);
  }, [form, localStorageKey]);

  console.log(123, form);

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
          <Card mx="2%" my={2}>
            <Card.Header tag={Flex} alignItems="center">
              <Button tag={Link} use="tertiary" to="/" theme="muted">
                <ArrowLeftL />
              </Button>
              <Card.Title tag="p" w="100%" bold size={600} textAlign="center">
                {data?.name}
              </Card.Title>
              <Flex gap={2} position="relative">
                {isEdit ? (
                  <Button
                    position="absolute"
                    left="-60px"
                    theme="success"
                    use="primary"
                    onClick={handleSaveForm}
                  >
                    Save
                  </Button>
                ) : null}
                <Button onClick={handleChangeEdit(isEdit ? false : true)}>
                  {isEdit ? <CloseL /> : <EditL />}
                </Button>
              </Flex>
            </Card.Header>

            <Card.Body>
              {!data && !loading && (
                <NoData
                  w="100vw"
                  type="nothing-found"
                  description="Try changing your filters."
                />
              )}

              <Title>Home world</Title>
              <PersonInfoList
                title={MAP_KEYS_LIST_ENUM["planet"]}
                data={data?.homeworld}
                isEdit={isEdit}
                onChange={handleChangeFormItem("homeworld")}
              />

              <Title>Description</Title>
              <Flex flexWrap>
                {form
                  ? MAP_KEYS_DESCRIPTION.map((key) => (
                      <PersonInfo
                        key={key}
                        isEdit={isEdit}
                        onChange={handleChangeFormItem(key)}
                        title={key as string}
                      >
                        {form[key] as string}
                      </PersonInfo>
                    ))
                  : null}
              </Flex>

              {form
                ? MAP_KEYS_LIST.map((key) => {
                    if (
                      Array.isArray(form[key]) &&
                      (form[key] as string[])?.length
                    ) {
                      return (
                        <Fragment key={key}>
                          <Title>{capitalizeFirstLetter(key)}</Title>
                          <PersonInfoList
                            title={key.slice(0, -1) as MAP_KEYS_LIST_ENUM}
                            data={form[key]}
                            isEdit={isEdit}
                            onChange={handleChangeFormItem(key)}
                          />
                        </Fragment>
                      );
                    }
                    return null;
                  })
                : null}
            </Card.Body>
          </Card>
        </SpinContainer>
      )}
    </>
  );
}
