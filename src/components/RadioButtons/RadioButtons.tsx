import React, { useState } from "react";
import { ButtonGroup, HStack, useRadioGroup } from "@chakra-ui/react";
import { default as RadioButton } from "./RadioButton";

const RadioButtons: React.FC<{
  name: string;
  selected: number;
  options: string[];
  onChange?: CallableFunction;
}> = ({ name, selected, options, onChange = () => {} }) => {
  const [optionSelected, setOptionSelected] = useState<number>(selected);

  const handleOnChange = (newOptionSelected: number) => {
    if (newOptionSelected !== optionSelected) {
      setOptionSelected(newOptionSelected);
      onChange(newOptionSelected);
    }
  };

  return (
    <ButtonGroup size="sm" isAttached variant="outline">
      {options.map((value: string, index: number) => (
        <RadioButton
          key={`${name}-${index}`}
          value={value}
          index={index}
          isSelected={index === optionSelected}
          onChange={handleOnChange}
        >
          {value}
        </RadioButton>
      ))}
    </ButtonGroup>
  );
};
export default RadioButtons;
