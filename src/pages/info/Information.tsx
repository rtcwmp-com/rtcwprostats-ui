import React from "react";
import { PageTitle } from "../../components/PageTitle";
import {
    Box,
    Link,
    Table,
    TableCaption,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Text,
    Heading,
    UnorderedList,
    ListItem,
    Divider
  } from "@chakra-ui/react";
  import { Link as reactLink } from "react-router-dom";

export const InformationPage: React.FC = () => {
  return (
    <>
      <PageTitle>Information</PageTitle>
      <br />
      <Heading as="h5" size="sm">About this Website</Heading>
      <Text color="gray.500" fontSize="xs">
         This website is a product of RTCWPro servers, RTCWPROAPI data pipeline, and this front-end UI.
      </Text>

      <UnorderedList color="gray.500" fontSize="xs">
        <ListItem>RTCWPro server admins configure servers to submit match results to the web repository RTCWPROAPI.</ListItem>
        <ListItem>RTCWPROAPI ingests, stores, aggregates, calculates and makes data available to an API consumer.</ListItem>
        <ListItem>This website is one of the API consumers that presents data to a user (you).</ListItem>
      </UnorderedList>
      <br />
      <Heading as="h5" size="sm">Where is my data</Heading>
      <Text color="gray.500" fontSize="xs">
         Each user is identified by an RTCW GUID. An initial mapping of GUIDs to names had been provided. You can search for yourself or other players using the search button above.
      </Text>
      <br />
      <Heading as="h5" size="sm">How is data split between regions/gametypes</Heading>
      <Text color="gray.500" fontSize="xs">
         All matches, server, player ranks are split into region+gametype buckets. Regions are NA, EU, SA. Gametypes are 3v3 or 6v6. 
         There are other values like unknown region or 6plus gametype, but they are not presented at this time. 
         For example, in order to see matches from NA/3v3 you have to select corresponding filters on any page that has them enabled. The filters will be memorized throughout your session.
         Other continuity options coming soon.
      </Text>
      <br />
      <Heading as="h5" size="sm">What is ELO</Heading>
      <Text color="gray.500" fontSize="xs">
         ELO is a ranking system borrowed from several places - xonotic game and originally from chess. 
      </Text>
      <Text color="gray.500" fontSize="xs">
         ELO is traditionally determined in a 1v1 scenario, but it's been retrofit to work for teams as well. The trick here is to how to adapt ELO to RTCW. 
         The calculation is arbitrary, and may change as community wishes. The formula can be found in the source code for RTCWPROAPI.
      </Text>
      <Link color="blue.500" fontSize="xs" href="https://github.com/donkz/rtcwprostats/blob/master/lambdas/postprocessing/elo/elo_calc.py" isExternal>
         Elo Calc Function
       </Link>
       <Text> </Text>
       <Link color="blue.500" fontSize="xs" href="https://github.com/PredatH0r/XonStat/blob/master/xonstat/elo.py" isExternal>
         Credit to xonotic
       </Link>
       <Text> </Text>
       <Link color="blue.500" fontSize="xs" href="https://en.wikipedia.org/wiki/Elo_rating_system" isExternal>
         ELO Wikipedia
       </Link>
       <br />
       <br />
       <Heading as="h5" size="sm">Why is my name not showing up?</Heading>
      <Text color="gray.500" fontSize="xs">
         Each player is tracked by a GUID provided by your RTCWPro installation. If you have your own CD key (rtcwpro/main/rtcwkey), your GUID will be unique. 
         It is possible you have grabbed the game somewhere else and you share that key, or simply missing it. 
         In this case, your stats will be mingled with others like you. Your name will be missing, substituded, or mingled under player "sharedguid".
      </Text>
      <br />
      <Text color="gray.500" fontSize="xs">
         To get your own key: 
      </Text>
      <UnorderedList color="gray.500" fontSize="xs">
        <ListItem>Back up your old key in rtcwpro/main/rtcwkey if exists.</ListItem>
        <ListItem>Go to the link below and save the downloaded file into your rtcwpro/main folder as file rtcwkey.</ListItem>
        <ListItem>RTCWPro will calculate your new GUID when the game starts using that key.</ListItem>
        <ListItem>Play one game to have your stats submitted with the new GUID and check this website.</ListItem>
      </UnorderedList>
      <Link color="blue.500" fontSize="xs" href="https://rtcwpro.com/rtcwkey.php" isExternal>
         https://rtcwpro.com/rtcwkey.php
       </Link>
       <br />
       <br />
       <Heading as="h5" size="sm">Can I copy over my old stats?</Heading>
      <Text color="gray.500" fontSize="xs">
         If you had a shared guid, there's nothing to copy. Stats are all mingled with others and the best is to start fresh.
         If you lost your old unique key, we can work to copy over your old data. Sooner , better. 
      </Text>
      <br />
      <Heading as="h5" size="sm">Can I change my name?</Heading>
      <Text color="gray.500" fontSize="xs">
         You can. The process is manual for now, but I (donkz) will be working on making this available somehow.
      </Text>
      <Text as="span" color="red.500" fontSize="xs">
         HINT:
      </Text>
      <Text as="span" color="gray.500" fontSize="xs">
         If you changed your key, to save you some trouble, play your first game as your real name, like player1. No caps, no clan tags, no smilies.
      </Text>
      <br />
      <br />
      <Heading as="h5" size="sm">What are groups?</Heading>
      <Text color="gray.500" fontSize="xs">
         Groups provide a way to summarize several matches together, for example 4 matches make one gather or 3 matches make a semifinal. 10 matches make a scrim.
      </Text>
      <UnorderedList color="gray.500" fontSize="xs">
        <ListItem>Go to matches page.</ListItem>
        <ListItem>Select region/gametype to find your matches.</ListItem>
        <ListItem>Select matches with checkboxes on the right.</ListItem>
        <ListItem>Click "Create group" button.</ListItem>
        <ListItem>Pick a type of the group and type in whatever name.</ListItem>
        <ListItem>Go to groups page and find your group.</ListItem>
      </UnorderedList>

    </>
  );
};
