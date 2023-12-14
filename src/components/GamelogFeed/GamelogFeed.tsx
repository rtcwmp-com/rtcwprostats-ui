import React from "react";
import { IGamelogGictionary, IGamelogItem } from "../../api/types";
import { Box } from "@chakra-ui/react";


export const GamelogFeed: React.FC<{ data: IGamelogGictionary, names: any }> = ({ data, names }) => {
  let matchIds = Object.keys(data);
  matchIds.sort((a, b) => {
    return parseInt(a) - parseInt(b);
  })
  let simpleEventText: any = {};
  simpleEventText["ObjDestroyed"] = " destroyed an objective";
  simpleEventText["ObjDynPlanted"] = " planted a dynamite";
  simpleEventText["suicide"] = " suicided";
  simpleEventText["ObjSpawnFlagCaptured"] = " got flag";
  simpleEventText["ObjTaken"] = " took objective";
  simpleEventText["ObjDropped"] = " dropped objective";
  simpleEventText["ObjReturned"] = " returned objective";
  simpleEventText["ObjKilledCarrier"] = " killed objective carrier";
  simpleEventText["ObjCapture"] = " captured the objective";

  function spawnMessage(line: IGamelogItem) {
    const diff: number = parseInt(line.Axis) - parseInt(line.Allied);
    let beforeAfter: string = "";
    if (diff > 0) {
      beforeAfter = diff.toString() + " seconds after";
    }
    else if (diff < 0) {
      beforeAfter = diff.toString() + " seconds before";
    }
    else {
      beforeAfter = "same as";
    }
    
    let message = "Axis spawn is " + beforeAfter + " Allies";
    return message;
  
  }
    
  function interpretGameLogLine(line: IGamelogItem) {
    if (line.label === "kill") {
      return (
        <>
          <Box fontSize="14px">
            <Box as="span" color="white" fontWeight="bold">
              {names[line.agent]}
            </Box>
                   
            <Box as="span" color="white" fontWeight="normal">
              { " killed " }
            </Box>

            <Box as="span" color="white" fontWeight="bold">
              {names[line.other]}
            </Box>
          </Box>
        </>
      );
    }
    else if (line.label === "revive") {
      return (
        <>
          <Box fontSize="14px">
            <Box as="span" color="white" fontWeight="bold">
              {names[line.agent]}
            </Box>
                   
            <Box as="span" color="orange" fontWeight="normal">
              { " revived " }
            </Box>

            <Box as="span" color="white" fontWeight="bold">
              {names[line.other]}
            </Box>
          </Box>
        </>
      );
    }
    else if (line.label === "teamkill") {
      return (
        <>
          <Box fontSize="14px">
            <Box as="span" color="white" fontWeight="bold">
              {names[line.agent]}
            </Box>
                   
            <Box as="span" color="red" fontWeight="normal">
              { " team killed " }
            </Box>

            <Box as="span" color="white" fontWeight="bold">
              {names[line.other]}
            </Box>
          </Box>
        </>
      );
    }
    else if (line.label === "global_chat") {
      return (
        <>
          <Box fontSize="14px">
            <Box as="span" color="white" fontWeight="bold">
              {names[line.agent]}
            </Box>
                   
            <Box as="span" color="white" fontWeight="normal">
              { " : " }
            </Box>

            <Box as="span" color="green" fontWeight="bold">
              {line.text}
            </Box>
          </Box>
        </>
      );
    }
    else if (line.label === "class_change") {
      return (
        <>
          <Box fontSize="14px">
            <Box as="span" color="white" fontWeight="bold">
              {names[line.agent]}
            </Box>
                   
            <Box as="span" color="white" fontWeight="normal">
              { " changed class to " }
            </Box>

            <Box as="span" color="white" fontWeight="bold">
              {line.other}
            </Box>
          </Box>
        </>
      );
    }
    else if (line.label === "round_start") {
      return (
        <>
          <Box fontSize="16px">
            <Box as="span" color="Yellow" fontWeight="bold">
              { "Match " + line.match_id + " started. Round " + line.round_id}
            </Box>
          </Box>
        </>
      );
    }
    else if (line.label === "round_end") {
      return (
        <>
          <Box fontSize="16px">
            <Box as="span" color="Yellow" fontWeight="bold">
              { "Match " + line.match_id + " Round " + line.round_id + " ended."}
            </Box>
          </Box>
        </>
      );
    }
    else if (line.label === "firstRespawn") {
      return (
        <>
          <Box fontSize="14px">
            <Box as="span" color="white" fontWeight="bold">
              { spawnMessage(line) }
            </Box>
          </Box>
        </>
      );
    }
    else if (line.label === "ObjDynPlanted" 
            || line.label === "ObjDestroyed" 
            || line.label === "suicide" 
            || line.label === "ObjTaken"
            || line.label === "ObjDropped"
            || line.label === "ObjSpawnFlagCaptured"
            || line.label === "ObjReturned"
            || line.label === "ObjKilledCarrier"
            || line.label === "ObjCapture"
            ) {
      return (
        <>
          <Box fontSize="14px">
            <Box as="span" color="white" fontWeight="bold">
              {names[line.agent]}
            </Box>
                   
            <Box as="span" color="white" fontWeight="normal">
              { simpleEventText[line.label] }
            </Box>
          </Box>
        </>
      );
    }
    else {
      return (
        <>
          <Box fontSize="14px">
            <Box as="span" color="white" fontWeight="bold">
              {"----->>>" + line.label}
            </Box>
          </Box>
        </>
      );
    }
  }

  return (
    <>
      <Box mt={5} fontSize="2xl">
        Game Events
      </Box>
      <Box display="inline-block">
        {matchIds.map((matchId) => (
          data[matchId].map((line) => (
              interpretGameLogLine(line)
          ))
        ))}
      </Box>
    </>
  );
};
