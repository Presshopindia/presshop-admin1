
// Chakra imports
import {
  Box, Flex,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  Select,
  Textarea,
  TableContainer,
  Checkbox,
  Button,
  Progress,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import Card from "components/card/Card";
import { BsArrowLeft, BsEye } from "react-icons/bs";
import camera from "assets/img/icons/camera.svg";
import crown from "assets/img/icons/crown.png";
import share from "assets/img/icons/share.png";
import video from "assets/img/icons/video.svg";
import watch from "assets/img/icons/watch.svg";
import calendar from "assets/img/icons/calendar.svg";
import print from "assets/img/icons/print.png";
import { useHistory, useParams } from "react-router-dom";
import { Tooltip } from '@chakra-ui/react';
import avt1 from "assets/img/avatars/avt1.png";
import avt2 from "assets/img/avatars/avt2.png";
import avt3 from "assets/img/avatars/avt3.png";
import avt4 from "assets/img/avatars/avt4.png";
import monitor from "assets/img/icons/monitor.svg";
import mobile from "assets/img/icons/mobile.svg";
import mail from "assets/img/icons/mail.svg";
import pro from "assets/img/icons/pro.svg";
import idic from "assets/img/icons/id.svg";
import shared from "assets/img/icons/shared.svg";
import img1 from "assets/img/nfts/Nft4.png";
import img2 from "assets/img/avatars/avatar2.png";
import img3 from "assets/img/nfts/Nft2.png";
import docuploaded from "assets/img/icons/img-upld.svg";
import write from "assets/img/icons/write.svg";
import { BsArrowRight } from "react-icons/bs";
import interview from "assets/img/icons/interview.svg";
import amt from "assets/img/icons/ametuer.svg";
import { Get } from "api/admin.services";
import { toast } from "react-toastify";
import { Patch } from "api/admin.services";
import moment from "moment/moment";
import { Post } from "api/admin.services";
import dataContext from "../ContextFolder/Createcontext";
import { async } from "@firebase/util";
import { RiTextDirectionL } from "react-icons/ri";
import ReactPaginate from "react-paginate";
import Loader from "components/Loader";
import Share from "components/share/Share";
import SortFilterDashboard from "components/sortfilters/SortFilterDashboard";

export default function AdminControls() {
  const textColor = useColorModeValue("#000", "white");
  const history = useHistory()
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const perPage = 5;
  const [loading, setLoading] = useState(false);
  const { id, component } = useParams();
  const [EmployeeData, setEmployeeData] = useState([]);
  const [path, setPath] = useState("");
  const [csv, setCsv] = useState("");
  const [show, setShow] = useState(false);

  const GetEmployeeHistory = async (id, page, parametersName, parameters) => {
    const offset = (page - 1) * perPage;
    setLoading(true);
    try {
      await Get(`admin/getemployeeHistory?employee_id=${id}&limit=${perPage}&offset=${offset}&${parametersName}=${parameters}`).then((res) => {
        setPath(res?.data?.fullpath)
        setEmployeeData(res?.data?.response);
        setTotalPages(res?.data?.total_count / perPage)
        setLoading(false);
      });
    } catch (error) {
      setLoading(false);
    }
  };
  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected + 1);
  };

  const printTable = async (id, page) => {
    const offset = (page - 1) * perPage;

    try {
      const response = await Get(`admin/getemployeeHistory?employee_id=${id}&offset=${offset}&limit=${perPage}&task_id=${id}`);
      if (response) {
        const csvData = response?.data?.fullpath;
        window.open(csvData);
      }
    } catch (err) {

    }
  };

  const handleClose = () => {
    setShow(!show);
  };
  useEffect(() => {
    GetEmployeeHistory(id, currentPage);
  }, [id, currentPage]);


  // sorting

  const [hideShow, setHideShow] = useState({
    status: false,
    type: ""
  })

  const [parameters, setParameters] = useState('')
  const [parametersName, setParametersName] = useState('')

  const closeSort = () => {
    setHideShow((prevHideShow) => ({
      ...prevHideShow,
      status: false,
      // type: ""
    }));
  };

  const collectSortParms = (name, order) => {
    setParameters(order)
    setParametersName(name)
  }

  const handleApplySorting = () => {
    if (hideShow?.type === "employeeHistory") {
      GetEmployeeHistory(id, currentPage, parametersName, parameters);
      setParameters('')
      setParametersName('')
    };
    closeSort()
  }

  return (
    <>
      {loading && <Loader />}
      <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
        <div className="cstm_brand_txt">
          <Text className="brnd_txt">
            {component}
          </Text>
        </div>

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
                Employee control history
              </Text>
              <div className="opt_icons_wrap">
                <a
                  onClick={() => {
                    setShow(true)
                    setCsv(path)
                  }}
                  className="txt_danger_mdm"
                >
                  <img src={share} className="opt_icons" />
                </a>
                <span onClick={() => printTable(id, currentPage)}><img src={print} className="opt_icons" /></span>
                <div className="fltr_btn">
                  <Text fontSize={"15px"}>
                    <span onClick={() => setHideShow((prevHideShow) => ({
                      ...prevHideShow,
                      status: true,
                      type: "employeeHistory"
                    }))}>Sort</span>
                  </Text>
                  {hideShow.type === "employeeHistory" &&
                    <SortFilterDashboard hideShow={hideShow}
                      closeSort={closeSort}
                      sendDataToParent={collectSortParms}
                      handleApplySorting={handleApplySorting}
                    />}
                </div>
              </div>
            </Flex>
            <TableContainer className="fix_ht_table">
              <Table mx='20px' variant='simple' className="common_table">
                <Thead>
                  <Tr>
                    <Th>Time & date</Th>
                    <Th>Employee name</Th>
                    <Th>Employee ID</Th>
                    <Th>Address</Th>
                    <Th>Banking details</Th>
                    <Th>Contract signed</Th>
                    <Th>Legal T&C’s signed</Th>
                    <Th>Check & approve</Th>
                    <Th>Status</Th>
                    <Th>Action taken</Th>
                    <Th>Remarks</Th>
                    {/* <Th>CTA</Th> */}
                  </Tr>
                </Thead>
                <Tbody>

                  {
                    EmployeeData && EmployeeData.map((curr) => {
                      return (
                        <Tr key={curr?._id}>
                          <Td className="timedate_wrap">
                            <p className="timedate"><img src={watch} className="icn_time" />{moment(curr.createdAt).format('hh:mm A')}</p>
                            <p className="timedate"><img src={calendar} className="icn_time" />{moment(curr.createdAt).format('DD MM YYYY')}</p>
                          </Td>
                          <Td>
                            <span>{curr?.admin_id?.name}</span>
                          </Td>

                          <Td className="item_detail">
                            <img src={idic} alt="id" className="icn" />

                            <span>{curr._id}</span>
                          </Td>

                          <Td className="item_detail address_details">
                            {curr?.employee_id?.employee_address?.city}
                            {curr?.employee_id?.employee_address?.country}
                            <br></br>
                            post-code {curr?.employee_id?.employee_address?.post_code}</Td>
                          <Td className="contact_details">
                            {curr?.employee_id.bank_details?.bank_name}<br />
                            Sort Code-{curr?.employee_id.bank_details?.sort_code}<br />
                            Account-{curr?.employee_id.bank_details?.account_number}
                          </Td>
                          <Td className="text_center">
                            <Checkbox
                              colorScheme='brandScheme'
                              me='10px'
                              isChecked={curr?.is_Contractsigned}
                              disabled
                            />
                          </Td>
                          <Td className="text_center">
                            <Checkbox
                              colorScheme='brandScheme'
                              me='10px'
                              isChecked={curr?.is_Legal}
                              disabled
                            />
                          </Td>
                          <Td className="text_center">
                            <Checkbox
                              colorScheme='brandScheme'
                              me='10px'
                              isChecked={curr?.is_Checkandapprove}
                              disabled
                            />
                          </Td>
                          <Td className="big_select_wrap">
                            <Select value={curr?.status} disabled>
                              <option value='onbord'>Onboarded</option>
                              <option value='pending'>Pending</option>

                            </Select>
                          </Td>
                          <Td className="item_detail">
                            <span>
                              {curr?.isTempBlocked === true ? "Temporary Block" : "No Action Taken"}
                            </span>
                          </Td>
                          <Td className="conversation-td">
                            <div className="conversation-details">
                              <p>{curr.remarks}
                              </p>
                            </div>
                          </Td>
                        </Tr>

                      )
                    })
                  }
                </Tbody>
              </Table>
            </TableContainer>
          </div>

          <ReactPaginate

            className="paginated"
            breakLabel="..."
            nextLabel=">"
            onPageChange={handlePageChange}
            pageRangeDisplayed={5}
            pageCount={totalPages}
            previousLabel="<"
            renderOnZeroPageCount={null}
          />
        </Card>
      </Box>
      <Share show={show} csv={csv} update={handleClose} />
    </>
  );
}
