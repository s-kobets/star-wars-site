import { Flex } from "@semcore/flex-box";
import Input, { InputValueProps } from "@semcore/input";
import { Text } from "@semcore/typography";
import { memo } from "react";

const FilterInner = ({ value, onChange }: InputValueProps) => {
  return (
    <Flex tag="label" alignItems="center" gap={4} mx="2%">
      <Text
        size={300}
        flex="0 0 auto"
        color="var(--intergalactic-text-primary)"
      >
        Search name:
      </Text>
      <Input size="l">
        <Input.Value
          placeholder="Type something to search"
          defaultValue={value}
          onChange={onChange}
        />
      </Input>
    </Flex>
  );
};

export const Filter = memo(FilterInner);
