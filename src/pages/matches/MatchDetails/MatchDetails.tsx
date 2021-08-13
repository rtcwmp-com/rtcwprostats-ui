import React from "react";
import { useParams } from "react-router-dom";

export const MatchDetails: React.FC = () => {
  const matchIds = useParams<{ matchIds: string }>();
  return <div>{matchIds}</div>;
};
