import Input, { InputValueProps } from "@semcore/ui/input";
import { memo } from "react";

const FilterInner = ({ value, onChange }: InputValueProps) => {
  return (
    <label>
      Search name:
      <Input>
        <Input.Value
          placeholder="Type something to search"
          defaultValue={value}
          onChange={onChange}
        />
      </Input>
    </label>
  );
};

export const Filter = memo(FilterInner);
