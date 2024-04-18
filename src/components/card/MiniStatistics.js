// Chakra imports
// Chakra imports
import {
  Flex,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
  Text,
} from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card.js";
// Custom icons
import React from "react";
import Menu from "../menu/MainMenu";

export default function Default(props) {
  const { startContent, endContent, name, growth,reduct, value } = props;
  const textColor = useColorModeValue("#000", "black");
  const textColorSecondary = "secondaryGray.600";

  return (
    <>
    <Card py='15px'>
      <Flex
        my='auto'
        h='100%'
        align={{ base: "center", xl: "start" }}
        justify={{ base: "center", xl: "center" }}>
        {startContent}

        <Stat my='auto' ms={startContent ? "18px" : "0px"}>
          <StatLabel className="txt_light"
            lineHeight='100%'
            color={"#000"}
            fontSize={{
              base: "sm",
            }}>
            {name}
          </StatLabel>
          <StatNumber
            color={textColor}
            fontFamily={"AirbnbMedium"}
            fontWeight={"unset"}
            fontSize={{
              base: "22px",
            }}>
            {value}
          </StatNumber>
          {growth ? (
            <Flex align='center'>
              <Text color='green.500' fontSize='xs' fontWeight='700' me='5px'>
                {growth}
              </Text>
              <Text color='secondaryGray.600' fontSize='xs' fontWeight='400'>
                since last month
              </Text>
            </Flex>
          ) : null}
          {reduct ? (
            <Flex align='center'>
              <Text color='#EC4E54' fontSize='xs' fontWeight='700' me='5px'>
                {reduct}
              </Text>
              <Text color='secondaryGray.600' fontSize='xs' fontWeight='400'>
                since last month
              </Text>
            </Flex>
          ) : null}
        </Stat>
        <Flex ms='auto' w='max-content'>
          {endContent}
        </Flex>
        <Menu />
      </Flex>
    </Card>
    </>    
  );
}
