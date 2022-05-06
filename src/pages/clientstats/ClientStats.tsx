import React, { useContext, useState } from "react";
import { Text, Box, Button, ButtonGroup } from "@chakra-ui/react";
import { Input } from '@chakra-ui/react'
import { useQuery } from "react-query";
import { StatsApi } from "../../api";
import { Loading } from "../../components/Loading";
import { PageTitle } from "../../components/PageTitle";
import { Stack, Radio, RadioGroup } from '@chakra-ui/react'
import { Link } from '@chakra-ui/react'

import axios from 'axios';

export const ClientStats: React.FC = () => {

  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [customText, setCustomText] = useState<string>("");
  const [region, setRegion] = useState<string>("");
  const [gametype, setGametype] = useState<string>("");
  const [uploadOK, setUploadOK] = useState<boolean>(false);
  const [uploaded, setUploaded] = useState<boolean>(false);
  const [uploadMessage, setUploadMessage] = useState<string>("Select a file");
  const [newFileName, setNewFileName] = useState<string>("");
	
	const onFileChange = (event: any) => {
    // https://fettblog.eu/typescript-react/events/#wheres-inputevent
    setSelectedFile(event.target.files[0]);
	};

	const onFileUpload = () => {
    
    if(fileValidation()) {
      let timeString = (new Date()).toISOString().slice(0, 19).replace("T", "-").replace(":", "-").replace(":", "-");

      const fileName = (selectedFile as any).name;
      
      //build file name
      const suffix = customText == "" ? "" : customText.replace(/[^a-zA-Z0-9]/g, "");
      
      let newFileNameTmp = timeString + "-" + fileName;
      if(suffix.length > 0) {
        newFileNameTmp =  timeString + "-" + suffix + ".log";
      }
      setNewFileName(newFileNameTmp)
      
      
      axios.post('https://aanvhjvr5i.execute-api.us-east-1.amazonaws.com/v1', selectedFile, {
        headers: {
          'Content-Type': 'application/octet-stream',
          'filename': newFileNameTmp,
          'region': region,
          'gametype': gametype
        }
      }
      ).then(response => setUploadMessage(response.data.statusCode == 200 ? "Uploaded!!!" : "Did not upload. Code " + response.data.statusCode));
      setUploadOK(false);
      setUploaded(true);
    }
	};
	
	
  const fileValidation = () => {
    let uploadMessage = "";
    
    const fileSetok = selectedFile == null ? false : true;
    let extensionOk = false;
    let fileSizeOk = false;
    if (fileSetok) {
      extensionOk = (selectedFile as any).name.split('.').pop() == "log" ? true : false;
      fileSizeOk = (selectedFile as any).size < 1024000 ? true : false;
    }

    const regions = ["na","eu","oc","sa"]
    const regionOk = regions.includes(region!) ? true : false;

    const gametypes = ["no","pub","gthree","gsix","gxxx","event"]
    const gametypeOk = gametypes.includes(gametype!) ? true : false;

    if (!extensionOk) {
      setUploadMessage(uploadMessage + "Only file type of .log is allowed;");
    }

    if (!fileSizeOk) {
      setUploadMessage(uploadMessage + "Only file size < 1MB is allowed;");
    }

    if (!regionOk) {
      setUploadMessage(uploadMessage + "Select a region;");
    }

    if (!gametypeOk) {
      setUploadMessage(uploadMessage + "Select a gametype;");
    }
    
    if(fileSetok && gametypeOk && regionOk && fileSizeOk && extensionOk) {
      setUploadMessage("Upload started!");
      return true;
    }
    else {
      return false;
    }
  }

	const fileData = () => {
	
    if (selectedFile) {
      setUploadOK(true);
      return (
        <>
        <div>
            <Text fontSize="m">File details:</Text>
            <Text fontSize="xs">Name: {selectedFile.name}</Text>
            <Text fontSize="xs">Size: {selectedFile.size} bytes </Text>	
            <Text fontSize="xs">
              Last Modified:{" "}
              {selectedFile.lastModifiedDate.toDateString()}
            </Text>
            <br/>
            <Text fontSize="m">Validation  message: {uploadMessage}</Text>
            <br/>
            { uploaded && <Text fontSize="m">Results will be ready in a few seconds at:</Text> && 
            <Link href={'https://stats.donkanator.com/filehere'.replace('filehere', newFileName).replace(".log",".html")} isExternal>
            {'https://stats.donkanator.com/filehere'.replace('filehere', newFileName).replace(".log",".html")}
            </Link> }
        </div>
        </>
      );
    } else  {
      return (
      <>
      <div>
        <br />
        <h4>Choose a correct file before Pressing the Upload button</h4>
      </div>
      </>
      );
    }
  }

  return (
    <>
      <PageTitle>Client Stats Upload</PageTitle>
			<Box my="50px">
      <Text fontSize="s">
        Upload rtcwconsole.log:
      </Text>
			<input type="file" onChange={onFileChange} />
      
      <br/>
      <br/>
      <Text fontSize="s">
        (Optional) give it a shot name. It will look like 2022-05-13-22-30-53-yourtext.
      </Text>
      <Input
            width='20rem'
            pr="2.5rem"
            type="text"
            id="fileUpload"
            placeholder="custom text"
            onChange={event => setCustomText(event.target.value)}
      />
      <br/>
      <br/>
      <p>Select <b>region</b> where this game took place:</p>
      <RadioGroup onChange={setRegion} value={region}>
        <Stack direction='row'>
          <Radio value='na'>NA</Radio>
          <Radio value='eu'>EU</Radio>
          <Radio value='oc'>OC</Radio>
          <Radio value='sa'>SA</Radio>
        </Stack>
      </RadioGroup>

      <br/>
      <p>Select <b>match type</b> for this game:</p>
      <RadioGroup onChange={setGametype} value={gametype}>
        <Stack direction='column'>
          <Radio value='no'>Unclassified/private</Radio>
          <Radio value='pub'>Public/Open pug</Radio>
          <Radio value='gthree'>gather 3v3</Radio>
          <Radio value='gsix'>gather 6v6</Radio>
          <Radio value='gxxx'>gather-other</Radio>
          <Radio value='event'>Event/Tournament</Radio>
        </Stack>
      </RadioGroup>

      <Box my="10px">
        <Button
          key={"a"}
          size="sm"
          isActive={true}
          value={"b"}
          onClick={onFileUpload}
          isDisabled={false}
          m="0 5px 5px"
        >
          {"Upload Log File"}
        </Button>
      </Box>
    </Box>
		{fileData()}
    </>
	);
}
