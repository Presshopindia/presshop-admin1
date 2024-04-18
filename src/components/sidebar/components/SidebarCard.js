import {
  // Button,
  Flex,
  Image,
  // Link,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import logoWhite from "assets/img/layout/logoWhite.png";
import React from "react";
import footerlogo from "assets/img/layout/logo.svg";
import logo2 from "assets/img/layout/footerlogo2.svg";
export default function SidebarDocs() {
  const bgColor = "#000";
  const borderColor = useColorModeValue("white", "navy.800");

  return (
    <Flex
    className="sidebar_footer_wrap"
      justify='center'
      direction='row'
      align='start'
      bg={bgColor}
      borderRadius='0px'
      me='0px'
      position='relative'>
      {/* <Flex
        border='5px solid'
        borderColor={borderColor}
        bg='linear-gradient(135deg, #F6E2E2 0%, #EC4E54 100%)'
        borderRadius='50%'
        w='94px'
        h='94px'
        align='center'
        justify='center'
        mx='auto'
        position='absolute'
        left='50%'
        top='-47px'
        transform='translate(-50%, 0%)'>
        <Image src={logoWhite} w='40px' h='40px' />
      </Flex> */}
        <div className="footer_logo">
          <img src={footerlogo} alt="" />
        </div>
      <Flex
        direction='column'
        mb='12px'
        align='start'
        justify='start'
        px='15px'
        pt='9px'
      >
          <img src={logo2} alt="" />
        <Text
          fontSize={{ base: "lg", xl: "20px" }}
          color='white'
          fontFamily={"AirbnbBk"}
          lineHeight='150%'
          textAlign='left '
          px='0px'
          pt='5.8px'
          mb='1px'
          letterSpacing={'5px'}>
            Admin Panel
        </Text>
        <Text
          fontSize={{ base: "lg", xl: "17px" }}
          color='white'
          // fontWeight='bold'
          fontFamily={"AirbnbBk"}
          lineHeight='150%'
          textAlign='left'
          px='0px'
          mb='4px'
          letterSpacing={'5px'}>
            London
        </Text>
        <Text
          fontSize='12px'
          color={"white"}
          fontFamily={"Airbnb"}
          px='0px'
          mb='8px'
          textAlign='left'>
          Copyright UK @ 2023
        </Text>
      </Flex>
    </Flex>
  );
}
