import React, { useMemo } from "react";
import { formatDistance } from "date-fns";
import {
  Link,
  Table,
  TableCaption,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";
import { Link as reactLink } from "react-router-dom";

import { IRecentPlayer } from "../../api/types";
import { LAST_RECENT_PLAYERS_NUM } from "../../constants";

interface RecentPlayerTableExtendedType extends IRecentPlayer {
  lastSeenRelative: string;
}

const RecentPlayerTable: React.FC<{ data: IRecentPlayer[] }> = ({ data }) => {
  const tableData = useMemo(() => {
    return data
      .sort((a, b) => {
        return Math.abs(
          new Date(b.last_seen).getTime() - new Date(a.last_seen).getTime()
        );
      })
      .map((item) => {
        const myDate = new Date();
        const d: RecentPlayerTableExtendedType = Object.assign({}, item, {
          lastSeenRelative: formatDistance(myDate, new Date(item.last_seen)),
        });
        return d;
      });
  }, [data]);

  return (
    <Table variant="simple">
      <TableCaption>{`Last ${LAST_RECENT_PLAYERS_NUM} Recent Players Across All Regions`}</TableCaption>
      <Thead>
        <Tr>
          <Th>Name</Th>
          <Th>Last Played As</Th>
          <Th>Last Seen</Th>
        </Tr>
      </Thead>
      <Tbody>
        {tableData.map((item, idx) => (
          <Tr key={`item.guid-${idx}`}>
            <Td>
              <Link as={reactLink} to={`/player/${item.guid}`}>
                {item.real_name}
              </Link>
            </Td>
            <Td>
              <Link as={reactLink} to={`/player/${item.guid}`}>
                {item.alias}
              </Link>
            </Td>
            <Td>{item.lastSeenRelative}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default RecentPlayerTable;
