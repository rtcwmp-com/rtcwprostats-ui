import React from "react";
import { Spinner } from "@chakra-ui/react";

const Loading: React.FC = ({ children }) => {
  return <Spinner color="red.500">{children}</Spinner>;
};

export default Loading;
