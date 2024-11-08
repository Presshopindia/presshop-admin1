// Chakra Imports
import {
  Flex,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorModeValue,
  useColorMode,
} from "@chakra-ui/react";
// Custom Components
import { ItemContent } from "components/menu/ItemContent";
import { SearchBar } from "components/navbar/searchBar/SearchBar";
import { SidebarResponsive } from "components/sidebar/Sidebar";
import PropTypes from "prop-types";
import React, { createContext, useContext, useEffect, useState } from "react";
// Assets
import { useHistory } from "react-router-dom";
import { useAuth } from "../../auth-context/auth.context";
// import AuthApi from "../../api/auth";
import useravatar from "assets/img/avatars/avatar6.png";
import editic from "assets/img/icons/edit.svg";
import routes from "routes.js";
import watchic from "assets/img/icons/watch.svg";
import notifyic from "assets/img/icons/notification.svg";
import { Post } from "api/admin.services";
import { Get } from "api/admin.services";
import moment from "moment/moment";
import DigitalClock from "components/DigitalClock";

export default function HeaderLinks(props) {
  const history = useHistory();
  const { setUser } = useAuth();
  let { user } = useAuth();
  const { secondary } = props;
  const { colorMode, toggleColorMode } = useColorMode();
  // Chakra Color Mode
  const navbarIcon = useColorModeValue("gray.400", "white");
  let menuBg = useColorModeValue("white", "navy.800");
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorBrand = useColorModeValue("brand.700", "brand.400");
  const ethColor = useColorModeValue("gray.700", "white");
  const borderColor = useColorModeValue("#E6ECFA", "rgba(135, 140, 189, 0.3)");
  const ethBg = useColorModeValue("secondaryGray.300", "navy.900");
  const ethBox = useColorModeValue("white", "navy.800");
  const shadow = useColorModeValue(
    "14px 17px 40px 4px rgba(112, 144, 176, 0.18)",
    "14px 17px 40px 4px rgba(112, 144, 176, 0.06)"
  );
  const storedLoginTime = sessionStorage.getItem('loginTime');
  const handleLogout = async () => {
    // await AuthApi.Logout(user);
    await setUser(null);
    localStorage.removeItem("user");
    return history.push("/auth/signin");
  };

  const {admin} = useAuth()


  const borderButton = useColorModeValue("secondaryGray.500", "whiteAlpha.200");
  return (
    <Flex
      className="hdr_rt_wrap"
      w={{ sm: "100%", md: "auto" }}
      alignItems='center'
      flexDirection='row'
      bg={menuBg}
      flexWrap={secondary ? { base: "wrap", md: "nowrap" } : "unset"}
      p='10px'
      borderRadius='15px'
      gap='15px'
    // boxShadow={shadow}
    >

      <SearchBar
        className="hdr_cstm_search"
        w='270px'
        mb={secondary ? { base: "10px", md: "unset" } : "unset"}
        me='0px'
        borderRadius='9px'
      />
      <SidebarResponsive routes={routes} />
      <Flex
        w={{ sm: "100%", md: "auto" }}
        alignItems='start'
        flexDirection='column'
        bg={menuBg}
        flexWrap={secondary ? { base: "wrap", md: "nowrap" } : "unset"}
        p='0px'
        borderRadius='15px'
        gap='2px'>
        <Text
          fontSize='15px'
          fontFamily='AirbnbMedium'
          color='#EC4E54'
          lineHeight='17px'>
          {admin?.email}
        </Text>
        <Text
          fontSize='12px'
          fontFamily='Airbnb'
          lineHeight='16px'
        >
          {admin?.role === "admin" ? "Admin" : admin?.designation} {admin?.employee_address?.city}
        </Text>
        <Flex
          justifyContent='space-between'
          w='100%'>
          <Flex
            align='center'
            className="hdr_time_wrap">
            <img src={watchic} alt="Login Time" />
            <Text
              display='inline-block'
              fontSize='10px'
              lineHeight='10px'
            >
              {/* {moment(Date.now()).format('h:mm:ss A')} */}
              <DigitalClock shortMonth={true} />
            </Text>
          </Flex>
          <div className="ntf_edit_ic_wrap">
            <Menu>
              <MenuButton p='0px' onClick={() => history.push(`/admin/notifications`)}>
                <Link >
                  <img src={notifyic} className="hdr_ntf_icon" alt="Notification icon" />
                </Link>

              </MenuButton>
            </Menu>
            <Menu>
              <Link onClick={() => history.push(`/admin/edit-employee`)}>
                <img src={editic} className="hdr_edit_img" alt="edit profile" />
              </Link>
            </Menu>
          </div>
        </Flex>
      </Flex>

      <Menu>
        <MenuButton p='0px'>
          <div className="user_img_nav">
            <img src={`https://uat-presshope.s3.eu-west-2.amazonaws.com/public/adminImages/${admin?.profile_image}`} alt="User" />
          </div>
        </MenuButton>
        <MenuList
          boxShadow={shadow}
          p='0px'
          mt='10px'
          borderRadius='20px'
          bg={menuBg}
          border='none'>
          <Flex w='100%' mb='0px'>
            {/* <Text
              ps='20px'
              pt='16px'
              pb='10px'
              w='100%'
              borderBottom='1px solid'
              borderColor={borderColor}
              fontSize='sm'
              fontWeight='700'
              color={textColor}>
              👋&nbsp; Hey, Adela
            </Text> */}
          </Flex>
          <Flex flexDirection='column' p='10px'>
            {/* <MenuItem
              _hover={{ bg: "none" }}
              _focus={{ bg: "none" }}
              borderRadius='8px'
              px='14px'>
              <Text fontSize='sm'>Profile Settings</Text>
            </MenuItem> */}
            <MenuItem
              _hover={{ bg: "none" }}
              _focus={{ bg: "none" }}
              color='#EC4E54'
              fontFamily="AirbnbMedium"
              fontWeight="800"
              borderRadius='8px'
              px='14px'
              onClick={handleLogout}>
              <Text fontSize='sm'>Log out</Text>
            </MenuItem>
          </Flex>
        </MenuList>
      </Menu>

    </Flex>
  );
}

HeaderLinks.propTypes = {
  variant: PropTypes.string,
  fixed: PropTypes.bool,
  secondary: PropTypes.bool,
  onOpen: PropTypes.func,
};
