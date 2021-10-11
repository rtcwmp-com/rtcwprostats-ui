import React, { useMemo } from "react";
import { useTable, useSortBy } from "react-table";
import { VscTriangleDown, VscTriangleUp } from "react-icons/vsc";

import {
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  chakra,
} from "@chakra-ui/react";

const MatchStatsTeamTable: React.FC<{ teamName: string; teamData: any[] }> = ({
  teamName,
  teamData,
}) => {
  const data = React.useMemo(
    () =>
      teamData.map((player: any) => {
        const d: any = {
          name: player.alias,
          efficiency: player.categories.efficiency,
          kills: player.categories.kills,
          deaths: player.categories.deaths,
          gibs: player.categories.gibs,
          suicides: player.categories.suicides,
          accuracy: `${player.categories.accuracy.toFixed(2)}% (${player.categories.hits}/${player.categories.shots})`,
          headshots: player.categories.headshots,
          damagegiven: player.categories.damagegiven,
          damagereceived: player.categories.damagereceived,
          damageteam: player.categories.damageteam,
        };
        return d;
      }),
    []
  );

  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
        isSorted: true,
      },
      {
        Header: "Efficiency",
        accessor: "efficiency",
        isNumeric: true,
      },
      {
        Header: "Kills",
        accessor: "kills",
        isNumeric: true,
      },
      {
        Header: "Deaths",
        accessor: "deaths",
        isNumeric: true,
      },
      {
        Header: "Gibs",
        accessor: "gibs",
        isNumeric: true,
      },
      {
        Header: "Suicides",
        accessor: "suicides",
        isNumeric: true,
      },
      {
        Header: "Accuracy",
        accessor: "accuracy",
        isNumeric: true,
      },
      {
        Header: "DMG Given",
        accessor: "damagegiven",
        isNumeric: true,
      },
      {
        Header: "DMG Received",
        accessor: "damagereceived",
        isNumeric: true,
      },
      {
        Header: "DMG Team",
        accessor: "damageteam",
        isNumeric: true,
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useSortBy);

  return (
    <>
      <Text m={2} mt={5} fontSize="2xl">
        {teamName}
      </Text>
      <Table
        size="sm"
        variant="striped"
        width="calc(100% - 24px);"
        {...getTableProps()}
      >
        <Thead>
          {headerGroups.map((headerGroup: any) => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column: any) => (
                <Th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  isNumeric={column.isNumeric}
                >
                  {column.render("Header")}
                  {column.isSorted ? (
                    column.isSortedDesc ? (
                      <VscTriangleDown
                        style={{ display: "inline", paddingLeft: "3px" }}
                        aria-label="sorted descending"
                      />
                    ) : (
                      <VscTriangleUp
                        style={{ display: "inline", paddingLeft: "3px" }}
                        aria-label="sorted ascending"
                      />
                    )
                  ) : null}
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {rows.map((row: any) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()}>
                {row.cells.map((cell: any) => (
                  <Td
                    {...cell.getCellProps()}
                    isNumeric={cell.column.isNumeric}
                  >
                    {cell.render("Cell")}
                  </Td>
                ))}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </>
  );
};

export default MatchStatsTeamTable;
