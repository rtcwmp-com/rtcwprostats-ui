import React from "react";
import { Box, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { IEventItem } from "../../api/types";
import { eventTranslations } from "../../util/event-tranlations";
import { isoDateStringToDateTime } from "../../util";

export const EventListContent: React.FC<{data: IEventItem[];}> = ({ data }) => {
  return (
    <Box overflowX="auto" my="10px">
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Time</Th>
            <Th>Event</Th>
            <Th>Detail</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data
              .sort()
              .reverse()
              .map((eventItem) => (
              <Tr key={eventItem.timestamp}>
                <Td>{isoDateStringToDateTime(eventItem.timestamp)}</Td>
                <Td>{eventItem.eventtype}</Td>
                <Td>{eventTranslations(eventItem.eventtype, eventItem.eventdesc)}</Td>
              </Tr>
            ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default EventListContent;
