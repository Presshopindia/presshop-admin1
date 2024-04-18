import React from "react";

// Chakra imports
import { Flex, useColorModeValue } from "@chakra-ui/react";
// Custom components
// import logo from "assets/img/logoblack.svg";
import { HSeparator } from "components/separator/Separator";
import sidebarlogo from "../../../assets/img/icons/sidebar-logo.png";
export function SidebarBrand() {
  //   Chakra color mode
  let logoColor = useColorModeValue("navy.700", "white");

  return (
    <Flex align='center' direction='column'>
      <img className="sidebarLogo" src={sidebarlogo} />
      {/* <HSeparator mb='20px' /> */}
    </Flex>
  );
}

export default SidebarBrand;
