import { unitsToMeters } from "./index";

export const eventTranslations = (eventType: string, eventDetail: string ) => {
    switch(eventType) {
        case "New player achievement":
          let achValue = "";
          if (eventDetail.split("#")[0] == "Longest Kill") {
            achValue = unitsToMeters(parseInt(eventDetail.split("#")[1])) + " m";
          }
          else {
            achValue = parseInt(eventDetail.split("#")[1]).toFixed(0);
          }
          return eventDetail.split("#")[4] + " achieved " + eventDetail.split("#")[0] + " in " + eventDetail.split("#")[2] + "/" + eventDetail.split("#")[3] + " with value " + achValue;
        case "New server added":
          return eventDetail.split("#")[1] + " in region " + eventDetail.split("#")[0];
        case "New user added":
          return eventDetail;
        case "New monthly group":
          return eventDetail;
        default:
          return eventDetail;
      }
  };