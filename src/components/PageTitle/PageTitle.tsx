import React from "react";
import { Heading } from "@chakra-ui/react";

const PageTitle: React.FC = ({ children }) => {
  return <Heading my="10px">{children}</Heading>;
};

export default PageTitle;
