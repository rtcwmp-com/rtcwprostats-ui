import React, { useState } from "react";
import { Box, Heading, Text, Select, Link } from "@chakra-ui/react";
import { PageTitle } from "../../components/PageTitle";

const OnDemand: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState<string>("");

  return (
    <Box>
      <PageTitle>On Demand</PageTitle>
      <Box mt={6}>
        <Text mt={4}>
          This functionality allows anyone to start an RTCW server from a common RTCWPro image.
        </Text>
        
        <Box mt={6}>
          <Box as="ul" pl={6} mb={4}>
            <Box as="li" mb={2}>
              There are 3 available regions for RTCW OnDemand servers.
            </Box>
            <Box as="li" mb={2}>
              Each region can have maximum of <strong>1</strong> server.
            </Box>
            <Box as="li" mb={2}>
              Once the server is started, it will run until 3am of local time zone.
            </Box>
            <Box as="li" mb={2}>
              The servers are open for anyone at the following address depending on a region:
            </Box>
          </Box>
          <Box mt={4} ml={4}>
            <Text>na.donkanator.com</Text>
            <Text>sa.donkanator.com</Text>
            <Text>eu.donkanator.com</Text>
          </Box>
          <Box mt={8}>
            <Text><strong>Start a server:</strong></Text>
          </Box>

          <Box mt={4}>
            <Select 
              placeholder="Select a region" 
              width="200px"
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
            >
              <option value="us-east-1">North America</option>
              <option value="sa-east-1">South America</option>
              <option value="eu-west-2">Europe</option>
            </Select>
            {selectedRegion && (
              <Box mt={4}>
                <Link href={`https://ondemand.donkanator.com/start/${selectedRegion}`} target="_blank">Click</Link>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default OnDemand; 