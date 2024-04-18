

// Chakra imports
import {
  Box,
  Flex,
  Text,
  SimpleGrid,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  useColorModeValue,
  Select,
  Textarea,
  Button,
  useDisclosure,
  Checkbox,
  Modal,

  ModalOverlay,
  ModalContent,
  ModalBody,
} from "@chakra-ui/react";
import Card from "components/card/Card";
import React, { useContext, useState } from "react";
import watch from "assets/img/icons/watch.svg";
import calendar from "assets/img/icons/calendar.svg";
import { BsArrowLeft, BsEye } from "react-icons/bs";
import shared from "assets/img/icons/shared.svg";
import share from "assets/img/icons/share.png";
import print from "assets/img/icons/print.png";
import { useHistory } from "react-router-dom";
import dataContext from "../ContextFolder/Createcontext";
import Share from "components/share/Share";
import invic from "assets/img/icons/invoice.svg";
import moment from "moment";
import crown from "assets/img/icons/crown.png"
import idic from "assets/img/icons/id.svg";
import ReactPaginate from "react-paginate";
import Loader from "components/Loader";
import hopperimg1 from "assets/img/avatars/avatar10.png";
import hoperimg2 from "assets/img/avatars/avatar10.png";
import hoperimg3 from "assets/img/avatars/avatar10.png";
import infoic from "assets/img/icons/info.svg";
import upldedimg from "assets/img/contentimages/content1.svg";
import { MdContentCopy, MdSafetyDivider } from "react-icons/md";
import { FaAddressBook } from "react-icons/fa";
// new imports end

export default function PaymentsHistory() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isEdit, setIsEdit] = useState(false);

  const history = useHistory()
  const textColor = useColorModeValue("#000", "black");  // Chakra Color Mode
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false);

  // pagination publshed content 
  const [publishedData, setPublishedData] = useState([]);
  const [currentPagePublishdContent, setCurrentPagePublishdContent] = useState(1);
  const [totalPublishdContentPages, setTotalPublishdContentPages] = useState(0);

  // common for all
  const perPage = 5;

  const [path1, setpath1] = useState("")
  const [path2, setpath2] = useState("")
  const [path3, setpath3] = useState("")

  return (
    <>
      <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
        {loading && <Loader />}
        <div className="back_link">
          <a onClick={() => { window.history.back() }}>
            <BsArrowLeft />
            <span>Back</span>
          </a>
        </div>
        <Card className="tab_card"
          direction='column'
          w='100%'
          px='0px'
          mb='24px'
          overflowX={{ sm: "scroll", lg: "hidden" }}>
          <div className="">
            <Flex px='20px' justify='space-between' mb='10px' align='center'>
              <Text
                color={textColor}
                fontSize='22px'
                fontFamily={"AirbnbBold"}
                lineHeight='100%'>
                Payments (Hopper name)
              </Text>
              <div className="opt_icons_wrap">
                <a className="txt_danger_mdm" >
                  <img src={share} className="opt_icons" />
                </a>
                <span><img src={print} className="opt_icons" /></span>
              </div>
            </Flex>
            <TableContainer className="fix_ht_table pmnt_tbl_wrp pmnt_history">
              <Table w="100%" mx='20px' variant='simple' className="common_table">
                <Thead>
                  <Tr>
                    <Th className="pmnt_paid_th">Payment paid</Th>
                    <Th className="time_date_th">Time & date</Th>
                    <Th className="transc_id_th">Transaction id</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>&pound; 465</Td>
                    <Td className="timedate_wrap">
                      <p className="timedate"><img src={watch} className="icn_time" />sdakj</p>
                      <p className="timedate"><img src={calendar} className="icn_time" />dshakj</p>
                    </Td>
                    <Td className="timedate_wrap">
                      <p className="timedate"><img src={idic} className="icn_time" />ID-782319</p>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>&pound; 465</Td>
                    <Td className="timedate_wrap">
                      <p className="timedate"><img src={watch} className="icn_time" />sdakj</p>
                      <p className="timedate"><img src={calendar} className="icn_time" />dshakj</p>
                    </Td>
                    <Td className="timedate_wrap">
                      <p className="timedate"><img src={idic} className="icn_time" />ID-782319</p>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>&pound; 465</Td>
                    <Td className="timedate_wrap">
                      <p className="timedate"><img src={watch} className="icn_time" />sdakj</p>
                      <p className="timedate"><img src={calendar} className="icn_time" />dshakj</p>
                    </Td>
                    <Td className="timedate_wrap">
                      <p className="timedate"><img src={idic} className="icn_time" />ID-782319</p>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>&pound; 465</Td>
                    <Td className="timedate_wrap">
                      <p className="timedate"><img src={watch} className="icn_time" />sdakj</p>
                      <p className="timedate"><img src={calendar} className="icn_time" />dshakj</p>
                    </Td>
                    <Td className="timedate_wrap">
                      <p className="timedate"><img src={idic} className="icn_time" />ID-782319</p>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>&pound; 465</Td>
                    <Td className="timedate_wrap">
                      <p className="timedate"><img src={watch} className="icn_time" />sdakj</p>
                      <p className="timedate"><img src={calendar} className="icn_time" />dshakj</p>
                    </Td>
                    <Td className="timedate_wrap">
                      <p className="timedate"><img src={idic} className="icn_time" />ID-782319</p>
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
          </div>
          <ReactPaginate
            className="paginated"
            breakLabel="..."
            nextLabel=">"
            onPageChange={""}
            pageRangeDisplayed={5}
            pageCount={totalPublishdContentPages}
            previousLabel="<"
            renderOnZeroPageCount={null}
          />
        </Card>
      </Box>
      <Share show={show} csv={""} update={""} />
    </>
  );
}
