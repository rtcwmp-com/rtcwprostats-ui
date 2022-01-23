import React, { useState } from "react";

import {
  Box,
  Button,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Text,
  AlertIcon,
  Alert,
  AlertTitle,
  Center,
  InputGroup,
  Badge,
} from "@chakra-ui/react";

import { useHistory } from "react-router-dom";
import { StatsApi } from "../../../api";
import { IGroupInput } from "../../../api/types";
import { RadioButtons } from "../../../components/RadioButtons";

export const MatchListContentModal: React.FC<{
  gametype: string;
  handleModalOnClose: CallableFunction;
  isOpen: boolean;
  matches: number[];
  region: string;
}> = ({ gametype, handleModalOnClose, isOpen, matches, region }) => {
  const [groupName, setGroupName] = useState<string>("");
  const [groupType, setGroupType] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [timestamp] = useState<string>(
    Math.round(new Date().getTime() / 1000).toString()
  );
  const { onClose } = useDisclosure();
  const history = useHistory();

  const groupTypes: string[] = ["gather", "event", "public", "private"];

  const onGroupTypeChange = (gt: number) => {
    setGroupType(gt);
  };

  const onGroupNameChange = (e: any) => {
    setGroupName(e.target.value);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const input: IGroupInput = {
      matches,
      region,
      type: gametype,
      group_name: groupName
        ? `${groupTypes[groupType]}-${groupName}-${timestamp}`
        : `${groupTypes[groupType]}-${timestamp}`,
    };
    try {
      const ret = await StatsApi.Groups.CreateGroup(input);
      setTimeout(() => {
        setIsSubmitting(false);
        onClose();
        history.push({
          pathname: "/groups",
          state: {
            shouldRefetchGroup: ret.response?.replace(
              "Matches added to group ",
              ""
            ),
          },
        });
      }, 2000);
    } catch (err) {
      setIsSubmitting(false);
      setErrorMessage("An error has occurred.");
    }
  };

  if (matches.length > 1) {
    return (
      <Modal
        isOpen={isOpen}
        onClose={() => {
          setErrorMessage("");
          handleModalOnClose(false);
          onClose();
        }}
        size="sm"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create group</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text mb={2} align="center">
              {matches.map((matchId: number, idx: number) => (
                <Badge key={`match-${idx}`} ml="1">
                  {matchId.toString()}
                </Badge>
              ))}
            </Text>
            <Center m={2}>
              <RadioButtons
                name="grouptype"
                selected={groupType}
                options={groupTypes}
                onChange={onGroupTypeChange}
              />
            </Center>
            <InputGroup size="md">
              <Input
                placeholder="Name (optional)"
                value={groupName}
                onChange={onGroupNameChange}
              />
            </InputGroup>
            {errorMessage && (
              <Box mt={2} mb={2} color="red">
                <Alert status="error">
                  <AlertIcon />
                  <AlertTitle mr={2}>{errorMessage}</AlertTitle>
                </Alert>
              </Box>
            )}
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="gray"
              mr={1}
              onClick={handleSubmit}
              isLoading={isSubmitting}
            >
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  } else {
    return (
      <Modal
        isOpen={isOpen}
        onClose={() => {
          setErrorMessage("");
          handleModalOnClose(false);
          onClose();
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create group</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Box mt={2} mb={2} color="white">
              <Alert status="info">
                <AlertIcon />
                <AlertTitle mr={2}>Select at least 2 matches</AlertTitle>
              </Alert>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="gray"
              mr={1}
              onClick={() => handleModalOnClose(false)}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  }
};
