import React from "react";
import { rtcwColorsMiddleWare } from "../../util/colors"
import { Text } from "@chakra-ui/react";

export const RTCWColorText: React.FC<{ coloredString: string }> = ({ coloredString }) => {
    if (!coloredString) {
        return (
            <>
                    <Text as="span"> 
                      {"ERROR"} 
                    </Text>
            </>
          );
    }
    
    
    const middleOutput = rtcwColorsMiddleWare(coloredString);
    return (
        <>
            {middleOutput.map(([color, substr], idx) => (
                <Text as="span" className={color} key={color + substr + idx}> 
                  {substr} 
                </Text>
            ))}
        </>
      );
};

export default RTCWColorText;
