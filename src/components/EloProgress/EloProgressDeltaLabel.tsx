import React from "react";
import { chakra } from "@chakra-ui/react";

export const EloProgressDeltaLabel: React.FC<{ delta: number }> = ({ delta }) => {
  if (delta > 0) {
    return (
      <chakra.span color="green.300" fontSize="sm">
        (+{delta})
      </chakra.span>
    );
  } else {
    if (delta < 0) {
      return (
        <chakra.span color="red.300" fontSize="sm">
          ({delta})
        </chakra.span>
      );
    } else {
      return (
        <chakra.span color="yellow.300" fontSize="sm">
          (-)
        </chakra.span>
      );
    }
  }
};
