/* eslint-disable */
import React, { useContext, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
// chakra imports
import { useHistory } from "react-router-dom";
import { useAuth } from "../../../auth-context/auth.context";
import { Logout } from "../../../routes";
import {
  Box,
  Button,
  Collapse,
  Flex,
  HStack,
  Link,
  Select,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import AuthApi from "../../../api/auth";
import sidebareditic from "assets/img/icons/sidebaredit.svg";
// import dataContext from "../ContextFolder/CreateContext";
import dataContext from "views/admin/ContextFolder/Createcontext";

import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
// importing sidebar context to send pending msg data to sidebar
import { useMsgContext } from "contexts/PendindMsgContext";

export function SidebarLinks(props) {

  let {pendingChats,setPendingChats , pendingNotifications } = useMsgContext()

  const { profile, setProfile } = useContext(dataContext);
  const pathname = window.location.pathname;

  const { isOpen, onToggle } = useDisclosure();

  const history = useHistory();
  const { setUser } = useAuth();
  const handleLogout = async () => {
    await setUser(null);
    localStorage.removeItem("user");
    return history.push("/auth/signin");
  };
  //   Chakra color mode
  let location = useLocation();
  let activeColor = useColorModeValue("gray.700", "white");
  let inactiveColor = useColorModeValue(
    "secondaryGray.600",
    "secondaryGray.600"
  );
  let activeIcon = useColorModeValue("brand.500", "white");
  let textColor = useColorModeValue("#000", "white");
  let brandColor = useColorModeValue("brand.500", "brand.400");

  const { routes } = props;

  const activeRoute = (routeName) => {
    // console.log(routeName,`<--------routeName`)
    return location.pathname.includes(routeName);
  };

  const createLinks = (routes) => {
    const routesar = routes.filter((curr) => {
      if (!curr.hide) {
        if (
          (curr.name === "New employee registration" &&
            (profile?.subadmin_rights?.onboardEmployess === true ||
              profile?.subadmin_rights?.viewRightOnly === true)) ||
          (curr.name === "Manage content" &&
            (profile?.subadmin_rights?.controlContent === true ||
              profile?.subadmin_rights?.viewRightOnly === true)) ||
          (curr.name === "Manage publications" &&
            (profile?.subadmin_rights?.controlPublication === true ||
              profile?.subadmin_rights?.viewRightOnly === true)) ||
          (curr.name === "Manage hoppers" &&
            (profile?.subadmin_rights?.controlHopper === true ||
              profile?.subadmin_rights?.viewRightOnly === true))
        ) {
          return curr.name;
        } else if (
          (curr.name === "New employee registration" && curr.name === "") ||
          (curr.name === "Manage content" && curr.name === "") ||
          (curr.name === "Manage publications" && curr.name === "") ||
          (curr.name === "Manage hoppers" && curr.name === "")
        ) {
          return curr.name && curr?.hide;
        }
      }
      // return false;
      if (curr?.name === "Dashboard") {
        return true;
      } else if (curr?.name === "Invoicing & payments") {
        return true;
      } else if (curr?.name === "Chat") {
        return true;
      } else if (curr?.name === "Notifications") {
        return true;
      } else if (curr?.name === "Manage tabs / categories") {
        return true;
      } else if (curr?.name === "Edit app") {
        return true;
      } else if (curr?.name === "Admin controls" && profile.role === "admin") {
        return true;
      } else if (curr?.name === "Avatars") {
        return true;
      } else if (curr?.name === "Payment process") {
        return true;
      }
    });

    useEffect(() => {
      return routesar;
    }, [window.location.pathname]);

    // console.log("🚀 ~ file: Links.js:118 ~ useEffect ~ routesar:", routesar);

    return routesar.map((route, index) => {
      if (route.category) {
        return (
          <>
            <Text
              fontSize={"md"}
              color={activeColor}
              fontWeight="bold"
              mx="auto"
              ps={{
                sm: "10px",
                xl: "16px",
              }}
              pt="18px"
              pb="12px"
              key={index}
            >
              {route.name}
            </Text>
            {createLinks(route.items)}
          </>
        );
      } else if (route.path == "/app-cms") {
        return (
          <div>
            {route.icon ? (
              <Box>
                <HStack
                  spacing={
                    activeRoute(route.path.toLowerCase()) ? "22px" : "26px"
                  }
                  py="5px"
                  ps="10px"
                >
                  <Flex w="100%" alignItems="start" justifyContent="start">
                    <Box
                      color={
                        activeRoute(route.path.toLowerCase())
                          ? activeIcon
                          : textColor
                      }
                      me="18px"
                      mt="2px"
                    >
                      {route.icon}
                    </Box>
                    <Accordion
                      allowToggle
                      w="100%"
                      className="edit_sidebr_link"
                    >
                      <AccordionItem border="unset">
                        <h2>
                          <AccordionButton p="0" border="unset">
                            <Box
                              flex="1"
                              textAlign="left"
                              p="0px"
                              color={
                                activeRoute(route.path.toLowerCase())
                                  ? activeColor
                                  : textColor
                              }
                              fontFamily={
                                activeRoute(route.path.toLowerCase())
                                  ? "AirbnbBold"
                                  : "AirbnbMedium"
                              }
                            >
                              Edit
                            </Box>
                            <AccordionIcon />
                          </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                          <ul className="sidebar_ul sidebar_edit_accr">
                            <li>
                              <a
                                onClick={() => {
                                  history.push("/admin/app-cms");
                                }}
                              >
                                App
                              </a>
                            </li>
                            <li>
                              <a
                                fontFamily={"AirbnbMedium"}
                                onClick={() => {
                                  history.push("/admin/edit-marketplace");
                                }}
                              >
                                Marketplace
                              </a>
                            </li>
                          </ul>
                        </AccordionPanel>
                      </AccordionItem>
                    </Accordion>
                  </Flex>
                  <Box
                    h="36px"
                    w="4px"
                    bg={
                      activeRoute(route.path.toLowerCase())
                        ? brandColor
                        : "transparent"
                    }
                    borderRadius="5px"
                  />
                </HStack>
              </Box>
            ) : (
              <Box>
                <HStack
                  spacing={
                    activeRoute(route.path.toLowerCase()) ? "22px" : "26px"
                  }
                  py="5px"
                  ps="10px"
                >
                  <Text
                    me="auto"
                    color={
                      activeRoute(route.path.toLowerCase())
                        ? activeColor
                        : inactiveColor
                    }
                    fontWeight={
                      activeRoute(route.path.toLowerCase()) ? "bold" : "normal"
                    }
                  >
                    {route.name}
                  </Text>
                  <Box h="36px" w="4px" bg="brand.400" borderRadius="5px" />
                </HStack>
              </Box>
            )}
          </div>
          // </NavLink>
        );
      } else if (
        route.layout === "/admin" ||
        route.layout === "/auth" ||
        route.layout === "/rtl"
      ) {
        return (
          <NavLink key={index} to={route.layout + route.path}>
            {route.icon ? (
              <Box position="relative">
              {(route.name==="Notifications" || route.name==="Chat") 
              &&
              <Box
              position="absolute"
              top="-2px"
              left="-2px"
              bgColor="#007BFF"
              display="flex"
              justifyContent="center"
              alignItems="center"
              color="#FFFFFF"
               p="0px 6px"
              borderRadius="50%"
              width="20px"
              height="20px"
              zIndex="1"
             fontSize="11px"
            >
              {route.name==="Notifications" ? pendingNotifications : pendingChats}
            </Box>
                }
             
                <HStack
                  spacing={
                    activeRoute(route.path.toLowerCase()) ? "22px" : "26px"
                  }
                  py="5px"
                  ps="10px"
                >
                  <Flex w="100%" alignItems="center" justifyContent="center">
                    <Box
                      color={
                        activeRoute(route.path.toLowerCase())
                          ? activeIcon
                          : textColor
                      }
                      me="18px"
                    >
                      {route.icon}
                    </Box>
                    <Text
                      me="auto"
                      color={
                        activeRoute(route.path.toLowerCase())
                          ? activeColor
                          : textColor
                      }
                      fontWeight={
                        activeRoute(route.path.toLowerCase())
                          ? "bold"
                          : "normal"
                      }
                    >
                      {route.name}
                    </Text>
                  </Flex>
                  <Box
                    h="36px"
                    w="4px"
                    bg={
                      activeRoute(route.path.toLowerCase())
                        ? brandColor
                        : "transparent"
                    }
                    borderRadius="5px"
                  />
                </HStack>
            
              </Box>
            ) : (
              <Box>
                <HStack
                  spacing={
                    activeRoute(route.path.toLowerCase()) ? "22px" : "26px"
                  }
                  py="5px"
                  ps="10px"
                >
                  <Text
                    me="auto"
                    color={
                      activeRoute(route.path.toLowerCase())
                        ? activeColor
                        : inactiveColor
                    }
                    fontWeight={
                      activeRoute(route.path.toLowerCase()) ? "bold" : "normal"
                    }
                  >
                    {route.name}
                  </Text>
                  <Box h="36px" w="4px" bg="brand.400" borderRadius="5px" />
                </HStack>
              </Box>
            )}
          </NavLink>
        );
      }
    });
  };
  const createLogout = (routes) => {
    return routes.map((route, key) => {
      return (
        <NavLink
          to={route.layout + route.path}
          key={key}
          onClick={handleLogout}
        >
          {route.icon ? (
            <Flex
              align="center"
              justifyContent="space-between"
              w="100%"
              ps="17px"
              mb="0px"
            >
              <HStack
                mb="6px"
                spacing={
                  activeRoute(route.path.toLowerCase()) ? "22px" : "26px"
                }
              >
                <Flex w="100%" alignItems="center" justifyContent="center">
                  <Box
                    color={
                      activeRoute(route.path.toLowerCase())
                        ? activeIcon
                        : inactiveColor
                    }
                    me="12px"
                    mt="6px"
                  >
                    {route.icon}
                  </Box>
                  <Text
                    me="auto"
                    color={
                      activeRoute(route.path.toLowerCase())
                        ? activeColor
                        : "secondaryGray.600"
                    }
                    fontWeight="500"
                  >
                    {route.name}
                  </Text>
                </Flex>
              </HStack>
            </Flex>
          ) : (
            <ListItem ms={null}>
              <Flex ps="34px" alignItems="center" mb="8px">
                <Text
                  color={
                    activeRoute(route.path.toLowerCase())
                      ? activeColor
                      : inactiveColor
                  }
                  fontWeight="500"
                  fontSize="sm"
                >
                  {route.name}
                </Text>
              </Flex>
            </ListItem>
          )}
        </NavLink>
      );
    });
  };
  //  BRAND
  return (
    <>
      {createLinks(routes)}
      {createLogout(Logout)}
    </>
  );
}

export default SidebarLinks;
