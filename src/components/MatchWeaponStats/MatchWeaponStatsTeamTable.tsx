import React, { useCallback } from "react";
import { useTable, useSortBy } from "react-table";
import { VscTriangleDown, VscTriangleUp } from "react-icons/vsc";

import { Box, Text, Table, Thead, Tbody, Tfoot, Tr, Th, Td } from "@chakra-ui/react";
import { IElos, IClasses, IPlayerWStatsDictionary, IPlayerWeapon } from "../../api/types";
import { useHistory } from "react-router-dom";
import styles from "./MatchWeaponStatsTeamTable.module.css";
import { CLASS_ICONS } from "../../constants";

const MatchWeaponStatsTeamTable: React.FC<{ 
  wstatsall: IPlayerWStatsDictionary[]
  elos: IElos;
  classes: IClasses;
  names: any }> = ({ wstatsall, elos, classes, names }) => {
  const history = useHistory();
  let totalSniperKills = 0;
  let totalKnifeKills = 0;
  let totalPanzerKills = 0;
  const data = React.useMemo(() =>
    wstatsall.map((player: IPlayerWStatsDictionary) => {
        const guid = Object.keys(player)[0];
        const machineGuns = ["MP-40", "Thompson", "Sten"];
        const pistols = ["Colt", "Luger"];
        const airStuff = ["Airstrike", "Artillery"];
        let smgHits = 0;
        let smgShots = 0;
        let headshots = 0;
        let smgKills = 0;
        let pistolHits = 0;
        let pistolShots = 0;
        let pistolKills = 0;
        let sniperHits = 0;
        let sniperShots = 0;
        let sniperKills = 0;
        let sniperHeadshots = 0;
        let knifeKills = 0;
        let grenadeKills = 0;
        let airKills = 0;
        let panzerHits = 0;
        let panzerShots = 0;
        let panzerKills = 0;
        let panzerDeaths = 0;
        player[guid].map((weaponDict: IPlayerWeapon) => {
          if (machineGuns.includes(weaponDict.weapon)) {
            smgHits += weaponDict.hits;
            smgShots += weaponDict.shots;
            headshots += weaponDict.headshots;
            smgKills += weaponDict.kills;
          }
          else if (pistols.includes(weaponDict.weapon)) {
            pistolHits += weaponDict.hits;
            pistolShots += weaponDict.shots;
            headshots += weaponDict.headshots;
            pistolKills += weaponDict.kills;
          }
          else if (pistols.includes(weaponDict.weapon)) {
            pistolHits += weaponDict.hits;
            pistolShots += weaponDict.shots;
            headshots += weaponDict.headshots;
            pistolKills += weaponDict.kills;
          }
          else if (weaponDict.weapon == "Mauser") {
            sniperHits += weaponDict.hits;
            sniperShots += weaponDict.shots;
            sniperKills += weaponDict.kills;
            sniperHeadshots += weaponDict.headshots;
            totalSniperKills += weaponDict.kills;
          }
          else if (weaponDict.weapon == "Panzer") {
            panzerHits += weaponDict.hits;
            panzerShots += weaponDict.shots;
            panzerKills += weaponDict.kills;
            panzerDeaths += weaponDict.deaths;
            totalPanzerKills += weaponDict.kills;
          }
          else if (airStuff.includes(weaponDict.weapon)) {
            airKills += weaponDict.kills;
          }
          else if (weaponDict.weapon == "Grenade") {
            grenadeKills += weaponDict.kills;
          }
          else if (weaponDict.weapon == "Knife") {
            knifeKills += weaponDict.kills;
            totalKnifeKills += weaponDict.kills;
          }
          else if (weaponDict.weapon == "Syringe") {
            1 == 1;
          }
          else if (weaponDict.weapon == "Dynamite") {
            1 == 1;
          }
          else  {
            console.log("Weapon is not accounted for: " + weaponDict.weapon)
          }
        })
        const calcFraction= (numerator: number, denominator: number) => {
          if (numerator == 0 || denominator == 0) {
            return "-";
          }
          return (numerator/denominator*100).toFixed(1) + "%";
        };
        const d: any = {
          guid: guid,
          name: names[guid],
          smgAcc: calcFraction(smgHits, smgShots),
          smgShots: smgShots,
          smgKills: smgKills,
          pistolAcc: calcFraction(pistolHits, pistolShots),
          pistolShots: pistolShots,
          pistolKills: pistolKills,
          hsAcc: calcFraction(headshots, smgHits + pistolHits),
          headshots: headshots,
          airKills,
          grenadeKills,
          sniperAcc: calcFraction(sniperHits, sniperShots),
          sniperShots: sniperShots,
          sniperKills: sniperKills,
          panzerAcc: calcFraction(panzerHits, panzerShots),
          panzerKills: panzerKills,
          panzerDeaths: panzerDeaths,
          knifeKills: knifeKills
        };
        return d;
      }),
    [wstatsall]
  );

  const columns = React.useMemo(
    () => {
      let temp_col = [];
      temp_col.push({Header: "Name", accessor: "name"});
      if (elos != null) {
        temp_col.push({Header: "ELO", accessor: "elo", isNumeric: true});
      }
      if (classes != null) {
        temp_col.push({Header: "Class", accessor: "class", isNumeric: false});
      }
      temp_col.push({Header: "SMG%",accessor: "smgAcc",isNumeric: false});
      temp_col.push({Header: "SMG Shots", accessor: "smgShots", isNumeric: true});
      temp_col.push({Header: "SMG Kills", accessor: "smgKills", isNumeric: true});
      temp_col.push({Header: "Pistol%", accessor: "pistolAcc", isNumeric: false});
      temp_col.push({Header: "Pistol Shots", accessor: "pistolShots", isNumeric: true});
      temp_col.push({Header: "Pistol Kills", accessor: "pistolKills", isNumeric: true});
      temp_col.push({Header: "HS%", accessor: "hsAcc", isNumeric: false});
      temp_col.push({Header: "HS", accessor: "headshots", isNumeric: true});
      temp_col.push({Header: "Grenade Kills", accessor: "grenadeKills", isNumeric: true});
      temp_col.push({Header: "Air Support Kills", accessor: "airKills", isNumeric: true});
      if (totalSniperKills > 0) {
        temp_col.push({Header: "Sniper%", accessor: "sniperAcc", isNumeric: false});
        temp_col.push({Header: "Sniper Shots", accessor: "sniperShots", isNumeric: true});
        temp_col.push({Header: "Sniper Kills", accessor: "sniperKills", isNumeric: true});
      }
      if (totalPanzerKills > 0) {
        temp_col.push({Header: "Panzer%", accessor: "panzerAcc", isNumeric: false});
        temp_col.push({Header: "Panzer Kills", accessor: "panzerKills", isNumeric: true});
        temp_col.push({Header: "Panzer Deaths", accessor: "panzerDeaths", isNumeric: true});
      }
      if (totalKnifeKills > 0) {
        temp_col.push({Header: "Knife Kills", accessor: "knifeKills", isNumeric: true});
      }
    return temp_col;
  }
  ,
    []
  );

  const createGoToPlayerPage = useCallback(
    (playerId: string) => () => {
      history.push(`/player/${playerId}`);
    },
    [history]
  );

  const sortBy = React.useMemo(() => [{ id: "smgacc", desc: true }], []);

  const { getTableProps, getTableBodyProps, headerGroups, footerGroups, rows, prepareRow } =
    useTable({ columns, data, initialState: { sortBy } }, useSortBy);

  return (
    <>
      <Text m={2} mt={5} fontSize="2xl">
        Weapon Stats
      </Text>
      <Box w="100%" overflowX={"auto"}>
        <Table size="sm" variant="striped" {...getTableProps()}>
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
                  onClick={createGoToPlayerPage(row.original.guid)}
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
      </Box>
    </>
  );
};

export default MatchWeaponStatsTeamTable;

const _footerSum = (data: any, accessor: string) => {
  const total: number = data.reduce((sum:number, row:any) => row[accessor] + sum, 0);
  return <>{total}</>
};

const _renderCell = (cell: any) => {
  if (["smgAcc", "pistolAcc"].includes(cell.column.id)) {
    return _renderGunAccCell(cell);
  }
  if (cell.column.id === "hsAcc") {
    return _renderHsAccCell(cell);
  }
  return cell.render("Cell");
};

const _renderGunAccCell = (cell: any) => {
  if (parseFloat(cell.value) > 30) {
    return <Text color="green.500">{cell.value}</Text>;
  }
  if (parseFloat(cell.value) < 15) {
    return <Text color="red.500">{cell.value}</Text>;
  }
  return cell.value;
};

const _renderHsAccCell = (cell: any) => {
  if (parseFloat(cell.value) > 12) {
    return <Text color="green.500">{cell.value}</Text>;
  }
  if (parseFloat(cell.value) < 5) {
    return <Text color="red.500">{cell.value}</Text>;
  }
  return cell.value;
};

const _renderPlayerClassCell = (iconType: string) => {
  const PlayerClassIcon = CLASS_ICONS[iconType];
  return <PlayerClassIcon className={styles.linkIcon}/>;
};