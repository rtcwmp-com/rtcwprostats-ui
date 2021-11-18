import React, { useCallback } from "react";
import { useTable, useSortBy } from "react-table";
import { VscTriangleDown, VscTriangleUp } from "react-icons/vsc";

import { Text, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { IPlayerStatsWithId } from "../../api/types";
import { useHistory } from "react-router-dom";
import styles from "./MatchStatsTeamTable.module.css";

const MatchStatsTeamTable: React.FC<{
  teamName: string;
  teamData: any[];
  displayHeader: boolean;
}> = ({ teamName, teamData, displayHeader }) => {
  const history = useHistory();
  const data = React.useMemo(
    () =>
      teamData.map((player: IPlayerStatsWithId) => {
        const d: any = {
          playerId: player.playerId,
          name: player.alias,
          kdr: (player.categories.kills / player.categories.deaths).toFixed(2),
          kills: player.categories.kills,
          deaths: player.categories.deaths,
          gibs: player.categories.gibs,
          suicides: player.categories.suicides,
          revives: player.categories.revives,
          accuracy: (
            <>
              {(
                (player.categories.hits /
                  (player.categories.shots +
                    (player.categories.shots === 0 ? 1 : 0))) *
                100
              ).toFixed(1)}
              %
            </>
          ),
          headshots: player.categories.headshots,
          damagegiven: player.categories.damagegiven,
          damagereceived: player.categories.damagereceived,
          damageteam: player.categories.damageteam,
        };
        return d;
      }),
    [teamData]
  );

  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "KDR",
        accessor: "kdr",
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
        Header: "HS",
        accessor: "headshots",
        isNumeric: true,
      },
      {
        Header: "Suicides",
        accessor: "suicides",
        isNumeric: true,
      },
      {
        Header: "Revives",
        accessor: "revives",
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

  const createGoToPlayerPage = useCallback(
    (playerId: string) => () => {
      history.push(`/player/${playerId}`);
    },
    [history]
  );

  const sortBy = React.useMemo(() => [{ id: "kdr", desc: true }], []);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data, initialState: { sortBy } }, useSortBy);

  return (
    <>
      <Text m={2} mt={5} fontSize="2xl">
        {displayHeader && teamName}
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
              <Tr
                {...row.getRowProps()}
                className={styles.tableRow}
                onClick={createGoToPlayerPage(row.original.playerId)}
              >
                {row.cells.map((cell: any) => (
                  <Td
                    {...cell.getCellProps()}
                    isNumeric={cell.column.isNumeric}
                    width={cell.column.width}
                  >
                    {_renderCell(cell)}
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

const _renderKdrCell = (cell: any) => {
  if (cell.value < 1) {
    return <Text color="red.500">{cell.value}</Text>;
  }

  return <Text color="green.500">{cell.value}</Text>;
};

const _renderCell = (cell: any) => {
  if (cell.column.id === "kdr") {
    return _renderKdrCell(cell);
  }

  return cell.render("Cell");
};
