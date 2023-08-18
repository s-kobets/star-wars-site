import Card from "@semcore/ui/card";
import { ReactNode, memo } from "react";
import { useData } from "../../hooks";
import Skeleton from "@semcore/ui/skeleton";
import { Flex } from "@semcore/ui/flex-box";
import { Text } from "@semcore/ui/typography";
import Input, { InputValueProps } from "@semcore/ui/input";

const PersonInfoInner = ({
  isEdit,
  onChange,
  title,
  children,
}: {
  title: string;
  children: ReactNode;
  isEdit?: boolean;
  onChange?: InputValueProps["onChange"];
}) => (
  <Card w="calc(100% / 4 - 4%)" m="2%">
    <Card.Header>
      <Card.Title>{title}</Card.Title>
    </Card.Header>
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
      {data?.title ? <Text>{data?.title}</Text> : null}
    </Flex>
  );
}

const PersonInfoListInner = ({
  title,
  data,
}: {
  title: string;
  data?: any;
}) => (
  <>
    {typeof data === "string" ? (
      <PersonInfo title={title}>
        <PersonInfoItem url={data} />
      </PersonInfo>
    ) : null}

    {Array.isArray(data) ? (
      <Flex flexWrap>
        {data.map((url) => (
          <PersonInfo key={url} title={title}>
            <PersonInfoItem url={url} />
          </PersonInfo>
        ))}
      </Flex>
    ) : null}
  </>
);

export const PersonInfo = memo(PersonInfoInner);
export const PersonInfoList = memo(PersonInfoListInner);
