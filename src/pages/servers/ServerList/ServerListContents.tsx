import React, { useContext } from "react";
import {
  Box,
  Image,
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
import { formatDistance } from "date-fns";

import { RegionTypeContext } from "../../../context";
import { dateStringToDate } from "../../../util";
import { IServerSimple } from "../../../api/types";
import { COUNTRY_IMAGE_SOURCES, REGIONS } from "../../../constants";

export const ServerListContents = ({ data }: { data: IServerSimple[] }) => {
  const rTypeContext = useContext(RegionTypeContext);
  if (!data) return <p>There was an error fetching server data.</p>;
  const { region } = rTypeContext;
  const regionTitle = REGIONS.find((item) => item.id === region)?.longName;

  return (
    <Box overflowX="auto" my="10px">
      <Table variant="simple">
        <TableCaption>{`${regionTitle} - Active Servers`}</TableCaption>
        <Thead>
          <Tr>
            <Th></Th>
            <Th>Server Name</Th>
            <Th>IP</Th>
            <Th>Last Active</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data
            .sort((a, b) => {
              return (
                dateStringToDate(b.last_submission).getTime() -
                dateStringToDate(a.last_submission).getTime()
              );
            })
            .map((server, idx) => (
              <Tr key={idx}>
                <Td>
                  <Image
                    width="50px"
                    m="auto"
                    src={COUNTRY_IMAGE_SOURCES[server.region]}
                    alt="region flag"
                  />
                </Td>
                <Td>
                  <Link
                    as={reactLink}
                    to={`/matches/server/${server.server_name}`}
                  >
                    {server.server_name}
                  </Link>
                </Td>
                <Td>{server.IP.trim()}</Td>
                <Td>
                  {formatDistance(
                    dateStringToDate(server.last_submission),
                    new Date()
                  )}{" "}
                  ago
                </Td>
              </Tr>
            ))}
        </Tbody>
      </Table>
    </Box>
  );
};
