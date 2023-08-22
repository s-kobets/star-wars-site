import Card from "@semcore/card";
import {
  ReactNode,
  KeyboardEvent,
  memo,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useData } from "../../hooks";
import { Error, NoData } from "@semcore/widget-empty";
import Skeleton from "@semcore/skeleton";
import Button from "@semcore/button";
import Modal, { ModalProps } from "@semcore/modal";
import { Flex } from "@semcore/flex-box";
import { Text } from "@semcore/typography";
import Input, { InputValueProps } from "@semcore/input";
import MathPlusM from "@semcore/icon/MathPlus/m";
import SpinContainer from "@semcore/spin-container";
import { debounce } from "helpers";
import {
  FilmResponse,
  PlanetResponse,
  StarshipResponse,
  VehicleResponse,
} from "types";
import CloseM from "@semcore/icon/Close/m";
import { MAP_KEYS_LIST_ENUM } from "types/consts";
import EditL from "@semcore/icon/Edit/l";

const PersonInfoInner = ({
  isEdit,
  onChange,
  title,
  children,
}: {
  title?: string;
  children: ReactNode;
  isEdit?: boolean;
  onChange?: InputValueProps["onChange"];
}) => (
  <Card w="calc(100% / 4 - 4%)" m="2%">
    {title ? (
      <Card.Header>
        <Card.Title>{title}</Card.Title>
      </Card.Header>
    ) : null}
    <Card.Body>
      {isEdit ? (
        <Input>
          <Input.Value defaultValue={children as string} onChange={onChange} />
        </Input>
      ) : (
        children
      )}
    </Card.Body>
  </Card>
);

function PersonInfoItem({ url }: { url: string }) {
  const { data, loading, error } = useData<{ name?: string; title?: string }>(
    url?.replace(/https:\/\/swapi.dev\/api\//, ""),
    Boolean(url)
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
      {data?.title ? <Text>{data?.title}</Text> : null}
    </Flex>
  );
}

const PersonInfoModalEdit = ({
  data,
  visible,
  onClose,
  onChange,
  title,
}: Omit<ModalProps, "url"> & {
  data: string[];
  title: MAP_KEYS_LIST_ENUM;
  onChange: (url: string | string[]) => void;
}) => {
  const [list, setList] = useState(data ?? []);
  const [searchName, setSearchName] = useState("");
  const {
    data: dataResp,
    loading,
    error,
  } = useData<
    PlanetResponse | VehicleResponse | StarshipResponse | FilmResponse
  >(`${title}s?search=${searchName}`);

  useEffect(() => {
    setList(data);
  }, [data]);

  const handleSearchName = useCallback<Required<InputValueProps>["onChange"]>(
    (value) => {
      debounce(setSearchName, 300)(value);
    },
    []
  );

  const handleChangeList = useCallback(
    (url: string, action: "add" | "remove") => {
      if (title === "planet") {
        action === "add" ? setList([url]) : setList([]);
        return;
      }
      if (action === "add") {
        setList([...list, url]);
      } else {
        setList(list.filter((text) => url !== text));
      }
    },
    [list, title]
  );

  const handleSave = useCallback(
    (e: KeyboardEvent<HTMLButtonElement>) => {
      if (title === "planet") {
        onChange(list[0]);
      } else {
        onChange(list);
      }
      onClose && onClose("onCloseClick", e);
    },
    [list, onChange, onClose, title]
  );

  return (
    <Modal visible={visible} onClose={onClose}>
      <Input size="l">
        <Input.Value
          placeholder="Type something to search"
          defaultValue={searchName}
          onChange={handleSearchName}
        />
      </Input>

      <SpinContainer loading={loading} hMin="200px">
        {error && !dataResp?.results && <Error />}

        <Flex mt={4} gap={2} direction="column">
          {!dataResp?.results || !dataResp?.results.length ? (
            <NoData mt={6} />
          ) : null}
          {dataResp?.results.map((item) => (
            <Flex
              key={item.url}
              p={1}
              style={
                list.includes(item.url)
                  ? {
                      background:
                        "var(--intergalactic-bg-primary-neutral-active)",
                    }
                  : {}
              }
            >
              <Flex flex="1 1 auto" alignItems="center">
                {/* @ts-ignore */}
                {item?.name ?? item?.title}
              </Flex>

              {list.includes(item.url) ? (
                <Button onClick={() => handleChangeList(item.url, "remove")}>
                  <CloseM />
                </Button>
              ) : (
                <Button onClick={() => handleChangeList(item.url, "add")}>
                  <MathPlusM />
                </Button>
              )}
            </Flex>
          ))}
        </Flex>
      </SpinContainer>

      <Flex gap={2} mt={4}>
        {/* @ts-ignore */}
        <Button theme="success" use="primary" size="l" onClick={handleSave}>
          Save
        </Button>
        <Button
          size="l"
          // @ts-ignore
          onClick={(e) => {
            onClose && onClose("onCloseClick", e);
          }}
        >
          Cancel
        </Button>
      </Flex>
    </Modal>
  );
};

const PersonInfoListInner = ({
  title,
  data,
  isEdit,
  onChange,
}: {
  title: MAP_KEYS_LIST_ENUM;
  data?: any;
  isEdit?: boolean;
  onChange?: (value: string | string[]) => void;
}) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [list, setList] = useState(Array.isArray(data) ? data : [data]);

  useEffect(() => {
    setList(Array.isArray(data) ? data : [data]);
  }, [data]);

  const handleChange = useCallback(
    (urls: string | string[]) => {
      if (typeof urls === "string") {
        setList(urls ? [urls] : []);
      } else {
        setList(urls);
      }
      onChange && onChange(urls);
    },
    [onChange]
  );

  return (
    <>
      <Flex flexWrap>
        {list
          ? list?.map((url) => (
              <PersonInfo key={url} title={title}>
                <PersonInfoItem url={url} />
              </PersonInfo>
            ))
          : null}
        {isEdit ? (
          <Card
            m="2%"
            style={{ cursor: "pointer" }}
            onClick={() => setVisible(true)}
          >
            <Card.Body
              tag={Flex}
              alignItems="center"
              boxSizing="border-box"
              h="100%"
            >
              <EditL />
            </Card.Body>
          </Card>
        ) : null}
      </Flex>

      <PersonInfoModalEdit
        data={list}
        title={title}
        visible={visible}
        onClose={() => setVisible(false)}
        onChange={handleChange}
      />
    </>
  );
};

export const PersonInfo = memo(PersonInfoInner);
export const PersonInfoList = memo(PersonInfoListInner);
