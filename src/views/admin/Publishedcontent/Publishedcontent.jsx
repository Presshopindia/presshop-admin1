

// Chakra imports
import { Box, SimpleGrid } from "@chakra-ui/react";
import {
  Flex,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  Tfoot,
  TableContainer,
  Checkbox,
  useColorModeValue,
} from "@chakra-ui/react";
import Card from "components/card/Card";
import React from "react";
// import Card from "components/card/Card";
import { AndroidLogo, AppleLogo, WindowsLogo } from "components/icons/Icons";
import Menu from "components/menu/MainMenu";
import  { useMemo } from "react";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import img1 from "../../../assets/img/nfts/Nft4.png";
import img2 from "../../../assets/img/avatars/avatar2.png";
import img3 from "../../../assets/img/nfts/Nft2.png";
import img4 from "../../../assets/img/nfts/Nft3.png";
import mobile from "../../../assets/img/icons/mobile.png";
import watch from "../../../assets/img/icons/watch.png";
import calendar from "../../../assets/img/icons/calendar.png";
import camera from "../../../assets/img/icons/camera.svg";
// import calendar from "../../../../assets/img/icons/calendar.png";
// import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
export default function Publishedcontent() {
  const textColor = useColorModeValue("#000", "white");
  const iconColor = useColorModeValue("secondaryGray.500", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
  // Chakra Color Mode
  return (
    <>
      <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
        <SimpleGrid
          mb='20px'
          columns={{ sm: 1, md: 1 }}
          spacing={{ base: "20px", xl: "20px" }}>
          <Card
            direction='column'
            w='100%'
            px='0px'
            mb='24px'
            overflowX={{ sm: "scroll", lg: "hidden" }}>
            <Flex px='25px' justify='space-between' mb='10px' align='center'>
              <Text
                color={textColor}
                fontSize='22px'
                fontWeight='700'
                lineHeight='100%'>
                Janet Morison (Pseudonymous) Published Content Summary
              </Text>
              <Menu />
            </Flex>
            <TableContainer>
              <Table variant='simple' className="common_table">
                <Thead>
                  <Tr>
                    <Th>Published content</Th>
                    <Th>Time & date</Th>
                    <Th className="adr_dtl">Description</Th>
                    <Th>Type</Th>
                    <Th>License</Th>
                    <Th>Category</Th>
                    <Th>Purchased by</Th>
                    <Th>Sale price</Th>
                    <Th>Sale status</Th>
                    <Th>Payment received</Th>
                    <Th>Presshop commission</Th>
                    <Th>Payment made</Th>
                    <Th>Paid to</Th>
                    <Th>Payment made details</Th>
                    <Th>Payment pending</Th>
                    <Th>Payment due date</Th>
                    <Th>Mode</Th>
                    <Th>Remarks</Th>
                    <Th>User details</Th>
                    <Th>Cta</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td className="item_detail"><img src={img1} alt="Content thumbnail" />
                    </Td>
                    <Td className="timedate_wrap">
                      <p className="timedate"><img src={watch} className="icn_time" />12:36 PM</p>
                      <p className="timedate"><img src={calendar} className="icn_time" />10 Oct 2021</p>
                    </Td>
                    <Td>This is description text.</Td>
                    <Td className="contact_details">
                      <div className="mobile detail_itm">
                        <img src={camera} className="icn" />
                        <span>+4147323425</span>
                      </div>
                      <div className="mobile detail_itm">
                        <img src={mobile} className="icn" />
                        <span>+4147323425</span>
                      </div>
                      <div className="mobile detail_itm">
                        <img src={mobile} className="icn" />
                        <span>+4147323425</span>
                      </div>
                    </Td>
                    <Td>34</Td>
                    <Td>46</Td>
                    <Td>14</Td>
                    <Td>34</Td>
                    <Td>46</Td>
                    <Td>26</Td>
                    <Td>26</Td>
                    <Td>
                      <Checkbox 
                        colorScheme='brandScheme'
                        me='10px'
                      />
                    </Td>
                    <Td>46</Td>
                    <Td>14</Td>
                    <Td>34</Td>
                    <Td>46</Td>
                  </Tr>
                  <Tr>
                    <Td><img src={img2} alt="Content thumbnail" /></Td>
                    <Td>
                      <p className="time">10:25 AM</p>
                      <p className="date">24 Feb, 2023</p>
                    </Td>
                    <Td>Lorem ipsum dolor sit amet.</Td>
                    <Td>46</Td>
                    <Td>26</Td>
                    <Td>34</Td>
                    <Td>46</Td>
                    <Td>14</Td>
                    <Td>34</Td>
                    <Td>46</Td>
                    <Td>26</Td>
                    <Td>26</Td>
                    <Td>34</Td>
                    <Td>46</Td>
                    <Td>14</Td>
                    <Td>34</Td>
                  </Tr>
                  <Tr>
                    <Td><img src={img3} alt="Content thumbnail" /></Td>
                    <Td>
                      <p className="time">10:25 AM</p>
                      <p className="date">24 Feb, 2023</p>
                    </Td>
                    <Td>Lorem ipsum dolor sit amet.</Td>
                    <Td>46</Td>
                    <Td>26</Td>
                    <Td>34</Td>
                    <Td>46</Td>
                    <Td>14</Td>
                    <Td>34</Td>
                    <Td>46</Td>
                    <Td>26</Td>
                    <Td>34</Td>
                    <Td>46</Td>
                    <Td>14</Td>
                    <Td>34</Td>
                    <Td>46</Td>
                  </Tr>
                  <Tr>
                    <Td><img src={img4} alt="Content thumbnail" /></Td>
                    <Td>
                      <p className="time">10:25 AM</p>
                      <p className="date">24 Feb, 2023</p>
                    </Td>
                    <Td>Lorem ipsum dolor sit amet.</Td>
                    <Td>46</Td>
                    <Td>26</Td>
                    <Td>34</Td>
                    <Td>46</Td>
                    <Td>14</Td>
                    <Td>34</Td>
                    <Td>46</Td>
                    <Td>26</Td>
                    <Td>26</Td>
                    <Td>46</Td>
                    <Td>14</Td>
                    <Td>34</Td>
                    <Td>46</Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
          </Card>
          </SimpleGrid>
      </Box>
    </>
  );
}
