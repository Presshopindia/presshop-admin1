

// Chakra imports
import { Box, Flex, Table, Tbody, Td, Text, Th, Thead, Tr, useColorModeValue, TableContainer, Checkbox, Textarea, Select, Button, } from "@chakra-ui/react";
import Card from "components/card/Card";
import React, { useEffect, useState } from "react";

import img1 from "assets/img/nfts/Nft4.png";
import img2 from "assets/img/avatars/avatar2.png";
import img3 from "assets/img/nfts/Nft2.png";
import img5 from "assets/img/profile/publication1.svg";
import img6 from "assets/img/profile/publication2.svg";
import watch from "assets/img/icons/watch.svg";
import calendar from "assets/img/icons/calendar.svg";
import celebrity from "assets/img/icons/celebrity.png";
import camera from "assets/img/icons/camera.svg";
import avt1 from "assets/img/avatars/avt1.png";
import avt2 from "assets/img/avatars/avt2.png";
import avt3 from "assets/img/avatars/avt3.png";
import avt4 from "assets/img/avatars/avt4.png";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { BsEye } from "react-icons/bs";
import { Tooltip } from '@chakra-ui/react';
import share from "assets/img/icons/share.png";
import print from "assets/img/icons/print.png";
import { async } from "@firebase/util";
import { Get } from "api/admin.services";
import moment from "moment/moment";
import { useParams } from "react-router-dom";
import ReactPaginate from "react-paginate";
import Loader from "components/Loader";
import Share from "components/share/Share";
import SortFilterHopper from "components/sortfilters/SortFilterHopper";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function HopperTaskControlHistory() {
  const textColor = useColorModeValue("#000", "white");
  const [historyData, setHistoryData] = useState([]);
  const [acceptedby, setAcceptedby] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const perPage = 5;

  const { id, name, component } = useParams();
  const [path, setPath] = useState("");
  const [csv, setCsv] = useState("");
  const [show, setShow] = useState(false);

  // get task history
  const getTaskHistory = async (id, page, parametersName, parameters) => {
    setLoading(true);
    const offset = (page - 1) * perPage;
    try {
      await Get(`admin/view/livetask/history?task_id=${id}&limit=${perPage}&offset=${offset}&${parametersName}=${parameters}`).then((res) => {
        setHistoryData(res?.data?.data);
        setAcceptedby(res?.data?.acceptedby);
        setTotalPages(Math.ceil(res?.data.total_count / perPage));
        setPath(res?.data?.fullPath);
        setLoading(false);
      });
    } catch (error) {
      // Handle error
    }
  };

  // download csv
  const DownloadCsvLiveTask = async (page) => {
    const offset = (page - 1) * perPage;
    try {
      const response = await Get(`admin/view/livetask/history?task_id=${id}&limit=${perPage}&offset=${offset}`);
      if (response) {
        const path = response?.data?.fullPath;
        window.open(path);
      }
    } catch (err) {
      // console.log("<---Have an error ->", err);
    }
  };

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected + 1);
  };

  useEffect(() => {
    getTaskHistory(id, currentPage);
  }, [currentPage]);

  const handleClose = () => {
    setShow(!show);
  };



  // sorting
  const [parameters, setParameters] = useState('')
  const [parametersName, setParametersName] = useState('')
  const [hideShow, setHideShow] = useState({
    status: false,
    type: ""
  })

  const closeSort = () => {
    setHideShow((prevHideShow) => ({
      ...prevHideShow,
      status: false,
      type: ""
    }));
  };

  const collectSortParms = (name, order) => {
    setParameters(order)
    setParametersName(name)
  }

  const handleApplySorting = () => {
    getTaskHistory(id, currentPage, parametersName, parameters);
    setParameters('')
    setParametersName('')
    closeSort()


  };

  const history = useHistory();



  return (
    <>
      <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
        {/* {console.log(useParams())} */}
        {loading && <Loader />}
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
              lineHeight='100%'
              fontFamily={"AirbnbBold"}>
              {name === "Live task history" ? "Live task history" : name === "Task control history" ? "Task control history" : ""}
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
              <span onClick={() => DownloadCsvLiveTask(currentPage)}><img src={print} className="opt_icons" /></span>
              <div className="fltr_btn">
                <Text fontSize={"15px"}>
                  <span onClick={() => setHideShow((prevHideShow) => ({
                    ...prevHideShow,
                    status: true,
                    type: "taskControlHistroy"
                  }))}>Sort</span>
                </Text>

                {
                  hideShow.type === "taskControlHistroy" &&
                  <SortFilterHopper hideShow={hideShow}
                    closeSort={closeSort}
                    sendDataToParent={collectSortParms}
                    handleApplySorting={handleApplySorting}
                  />
                }
                {/* <SortFilterDashboard /> */}
              </div>
            </div>
          </Flex>
          <TableContainer className="fix_ht_table">
            <Table variant='simple' className="common_table" mx="20px">
              <Thead>
                <Tr>
                  <Th>Time & date</Th>
                  <Th>Employee name</Th>
                  <Th>Broadcasted by</Th>
                  <Th className="adr_dtl">Task details</Th>
                  <Th>Accepted by</Th>
                  <Th>Assigned more hoppers</Th>
                  <Th>Mode</Th>
                  <Th>Remarks</Th>
                </Tr>
              </Thead>
              <Tbody>
                {historyData && historyData.map((curr) => {
                  return (
                    <Tr key={curr?._id}>
                      <Td className="timedate_wrap">
                        <p className="timedate"><img src={watch} className="icn_time" />{moment(curr?.updatedAt).format('hh:mm:A')}</p>
                        <p className="timedate"><img src={calendar} className="icn_time" />{moment(curr?.updatedAt).format('DD MMMM YYYY')}</p>
                      </Td>
                      <Td>
                        <Text>{curr?.admin_detail?.name}</Text>
                      </Td>
                      <Td className="item_detail"><img src={curr?.mediahouse_detail?.profile_image} alt="Content thumbnail" />
                        <Text className="nameimg"><span className="txt_mdm">{curr?.mediahouse_detail?.company_name}</span></Text>
                      </Td>
                      <Td className="contact_details">
                        <div className="desc_ht">
                          {curr?.task_detail?.task_description}
                        </div>
                      </Td>
                      <Td className="avatars_wrap">
                        <div className="overlay_imgs">
                          <div className="img_row1 top_row">
                            {curr?.acceptedby_hopper_detail && curr?.acceptedby_hopper_detail.map((item) => {
                              return (
                                <Tooltip label={`${item?.first_name} ${item?.last_name}`} placement='top'>
                                  <img src={process.env.REACT_APP_HOPPER_AVATAR + item?.avatar_details?.avatar}
                                    className="ovrl1"
                                  />
                                </Tooltip>
                              )
                            })
                            }

                          </div>
                        </div>
                      </Td>
                      <Td className="avatars_wrap">
                        <div className="overlay_imgs">
                          <div className="img_row1 top_row">
                            {curr?.assign_more_hopper_detail && curr?.assign_more_hopper_detail.map((item) => {
                              return (
                                <>
                                  {/* {console.log(item, "<----------item.assign_more_hopper_detail")} */}
                                  <Tooltip label={`${item?.first_name} ${item?.last_name}`} placement='top'>
                                    <img src={process.env.REACT_APP_HOPPER_AVATAR + item?.avatar_details?.avatar}
                                    // className="ovrl1" 

                                    />
                                  </Tooltip>
                                </>
                              )
                            })
                            }
                          </div>
                        </div>
                      </Td>

                      <Td className="select_wrap">

                        {/* <Select placeholder='Chat'>
                  <option value='option2'>Email</option>
                  <option value='option2'>Call</option>
                </Select> */}
                        {curr?.mode}

                      </Td>
                      <Td className="conversation-td">
                        <div className="conversation-details">
                          <p>{curr?.remarks}
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
