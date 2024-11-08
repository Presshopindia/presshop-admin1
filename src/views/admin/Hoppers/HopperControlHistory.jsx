

// Chakra imports
import { Box, Flex, Table, Tbody, Td, Text, Th, Thead, Tr, useColorModeValue, TableContainer, Checkbox, Textarea, Select, Button, } from "@chakra-ui/react";
import Card from "components/card/Card";
import moment from 'moment';
import { React, useEffect, useState } from "react";
import watch from "assets/img/icons/watch.svg";
import calendar from "assets/img/icons/calendar.svg";
import share from "assets/img/icons/share.png";
import print from "assets/img/icons/print.png";
import avt11 from "assets/img/avatars/avatar11.png";
import avt12 from "assets/img/avatars/avatar12.png";
import avt13 from "assets/img/avatars/avatar13.png";
import { Get } from "api/admin.services";
import { useParams } from "react-router-dom";
import Loader from "components/Loader";
import { Tooltip } from "@chakra-ui/react";
import Share from "components/share/Share";

import ReactPaginate from "react-paginate";
import SortFilterHopper from "components/sortfilters/SortFilterHopper";
import { BsArrowLeft } from "react-icons/bs";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";


export default function HopperControlHistory() {
  const textColor = useColorModeValue("#000", "white");
  const history = useHistory();
  const [data, setData] = useState([]);
  const { id, component } = useParams();
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const perPage = 5;
  const [path, setPath] = useState("");
  const [csv, setCsv] = useState("");
  const [show, setShow] = useState(false);

  const getUserHistory = async (hopper_id, page, parametersName, parameters) => {
    const offset = (page - 1) * perPage;
    setLoading(true);
    try {
      await Get(`admin/getHopperMgmtHistory/${hopper_id}?limit=${perPage}&offset=${offset}&${parametersName}=${parameters}`).then((res) => {
        setData(res.data.hopperHistory);
        setTotalPages(res.data.totalCount / perPage);
        setPath(res?.data?.fullPath);
        setLoading(false);
      });
    } catch (err) {
      setLoading(false);
    }
  };

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected + 1);
  };

  // download csv file
  const printTable = async (content_id, page) => {
    const offset = (page - 1) * perPage;
    try {
      const response = await Get(`admin/getHopperMgmtHistory/${content_id}?limit=${perPage}&offset=${offset}`);
      if (response) {
        const onboardinPrint = response?.data?.fullPath;
        window.open(onboardinPrint);
      }
    } catch (err) {
      // console.log("<---Have an error ->", err);
    }
  };

  const handleClose = () => {
    setShow(!show);
  };

  useEffect(() => {
    getUserHistory(id, currentPage);
  }, [currentPage]);


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
    getUserHistory(id, currentPage, parametersName, parameters);
    setParameters('')
    setParametersName('')
    closeSort()


  };




  return (
    <>
      <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
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
              Hopper Controls / History
            </Text>
            <div className="opt_icons_wrap">
              <a
                onClick={() => {
                  setShow(true)
                  setCsv(path)
                }}
                className="txt_danger_mdm"
              >
                <Tooltip label={"Share"}>
                  <img src={share} className="opt_icons" />
                </Tooltip>
              </a>
              <span onClick={() => printTable(id, currentPage)}>
                <Tooltip label={"Print"}>
                  <img src={print} className="opt_icons" />
                </Tooltip>
              </span>

              <div className="fltr_btn">
                <Text fontSize={"15px"}>
                  <span onClick={() => setHideShow((prevHideShow) => ({
                    ...prevHideShow,
                    status: true,
                    type: "hopperControlHistory"
                  }))}>Sort</span>
                </Text>

                {
                  hideShow.type === "hopperControlHistory" &&
                  <SortFilterHopper hideShow={hideShow}
                    closeSort={closeSort}
                    sendDataToParent={collectSortParms}
                    handleApplySorting={handleApplySorting}
                  />
                }
                {/* <SortFilterDashboard /> */}
              </div>
              {/* <a onClick={() => { history.push("/admin/hopper-edit") }} className="txt_danger_mdm">
              Add
            </a> */}
            </div>
          </Flex>
          <TableContainer className="fix_ht_table">
            <Table variant='simple' className="common_table" mx="20px">
              <Thead>
                <Tr>
                  <Th>Time & date</Th>
                  <Th>Employee name</Th>
                  <Th>Hopper details</Th>
                  <Th>Status</Th>
                  <Th>Action taken</Th>
                  <Th>Mode</Th>
                  <Th>Remarks</Th>
                </Tr>
              </Thead>
              <Tbody>
                {
                  data && data.map((value) => {
                    return (
                      <Tr key={value?._id} >
                        <Td className="timedate_wrap">

                          <p className="timedate"><img src={watch} className="icn_time" />{moment(value.createdAt).format('hh:mm A')}</p>
                          <p className="timedate"><img src={calendar} className="icn_time" />{moment(value.createdAt).format('DD MMMM YYYY')}</p>


                        </Td>
                        <Td>{`${value.adminData.name}`}</Td>
                        <Td className="item_detail"><img src={process.env.REACT_APP_HOPPER_AVATAR + value?.hopperData?.avatar_details?.avatar} alt="Content thumbnail" />
                          <Text className="nameimg"><span className="txt_mdm"> {`${value.hopperData.first_name}  ${value.hopperData.last_name}`}  </span><br />
                            <span >({value?.hopperData?.user_name})</span></Text>
                        </Td>
                        <Td className="big_select_wrap">

                          <span>{value.status}</span>
                        </Td>
                        <Td>
                          <div className="check_wrap">
                            <Checkbox
                              isChecked={value?.action === "isTempBlocked" ? true : false}
                              disabled

                              colorScheme='brandScheme'
                              me='10px'
                            />
                            <span>Temporary Block</span>
                          </div>
                          <div className="check_wrap">
                            <Checkbox
                              colorScheme='brandScheme'
                              me='10px'
                              isChecked={value?.action === "isPermanentBlocked" ? true : false}
                              disabled

                            />
                            <span>Permanent Blocked</span>
                          </div>
                        </Td>
                        <Td className="select_wrap">
                          {/* <Select >
                    <option value='option3'>{value.mode}</option>
                  </Select> */}
                          <span>{value.mode}</span>

                        </Td>
                        <Td className="conversation-td">
                          <div className="conversation-details">
                            <p>{value.remarks}
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
            pageRangeDisplayed={4}
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
