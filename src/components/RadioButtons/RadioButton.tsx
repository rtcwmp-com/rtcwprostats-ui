import React, { MouseEventHandler } from "react";
import { Box, Button, useRadio, UseRadioProps } from "@chakra-ui/react";

export const RadioButton: React.FC<{
  value: string;
  index: number;
  isSelected: boolean;
  onChange: CallableFunction;
}> = ({ index, value, isSelected, onChange }) => {
  return (
    <Button
      mr="-px"
      colorScheme="customGrey"
      variant={isSelected ? "solid" : "outline"}
      onClick={() => onChange(index)}
      style={{ textTransform: "uppercase" }}
    >
      {value}
    </Button>
  );
};

export default RadioButton;
