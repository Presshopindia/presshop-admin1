/* eslint-disable */
import { Box, Flex, Table, Tbody, Td, Text, Th, Thead, Tr, useColorModeValue, TableContainer, Checkbox, Textarea, Select, Button, Progress } from "@chakra-ui/react";
import Card from "components/card/Card";
// import Menu from "components/menu/MainMenu";
import React, { useEffect, useState } from "react";
import publication1 from "assets/img/profile/publication1.svg";
import publication2 from "assets/img/profile/publication2.svg";
import publication3 from "assets/img/profile/publication3.svg";
import { useHistory, useParams } from "react-router-dom";
import watch from "assets/img/icons/watch.svg";
import calendar from "assets/img/icons/calendar.svg";
import share from "assets/img/icons/share.png";
import print from "assets/img/icons/print.png";
import { BsArrowLeft, BsEye } from "react-icons/bs";
import { MultiSelect } from "react-multi-select-component";
import { Tooltip } from '@chakra-ui/react';
import monitor from "assets/img/icons/monitor.svg";
import news from "assets/img/icons/news.svg";
import { Post } from "api/admin.services";
import moment from "moment/moment";
import ReactPaginate from "react-paginate";
import Loader from "components/Loader";
import Share from "components/share/Share";
import SortFilterPublication from "components/sortfilters/SortFilterPublication";
export default function SourcedContentHistory() {
  const [params, setParams] = useState({ parameters: "", parametersName: "", parameters1: "", parametersName1: "" })

  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const perPage = 5
  const history = useHistory()
  const textColor = useColorModeValue("#000", "white");
  const [historyData, setHistoryData] = useState([])
  const { id, component } = useParams()

  const [path, setPath] = useState("")
  const [csv, setCsv] = useState("")
  const [show, setShow] = useState(false)


  const sourcedContentHistory = async (media_house_id, page, parametersName, parameters, parametersName1, parameters1) => {
    const offset = (page - 1) * perPage
    setLoading(true)
    try {
      await Post(`admin/sourced/content/history/${media_house_id}?limit=${perPage}&offset=${offset}&${parametersName}=${parameters}&${parametersName1}=${parameters1}`).then((res) => {
        setHistoryData(res.data.data)
        setTotalPages(res?.data?.count / perPage)
        setPath(res?.data?.fullpath)
        setLoading(false)
      })
    } catch (error) {
      // console.log(error)
      setLoading(false)
    }
  }
  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected + 1)
  }
  // download csv file
  const downloadCsv = async (media_house_id, page) => {
    const offset = (page - 1) * perPage
    try {
      const response = await Post(`admin/sourced/content/history/${media_house_id}?limit=${perPage}&offset=${offset}`)
      if (response) {
        const path = response?.data?.fullpath;
        window.open(path)
      }
    } catch (err) {
      // console.log("<---Have an error ->", err);
      setLoading(false)
    }
  };

  const handleClose = () => {
    setShow(!show)
  }

  useEffect(() => {
    sourcedContentHistory(id, currentPage)
  }, [currentPage])


  // sorting
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
    setParams((prev) => ({
      ...prev,
      parameters: order,
      parametersName: name
    }))
  }

  const collectSortParms1 = (name, order) => {
    setParams((prev) => ({
      ...prev,
      parameters1: order,
      parametersName1: name
    }))
  }
  const { parameters, parametersName, parameters1, parametersName1 } = params
  const handleApplySorting = () => {
    sourcedContentHistory(id, currentPage, parametersName, parameters, parametersName1, parameters1);
    setParams({
      parameters: "",
      parametersName: "",
      parameters1: "",
      parametersName1: ""
    })
    closeSort()

  };

  const formatAmountInMillion = (amount) =>
    amount?.toLocaleString('en-US', {
      maximumFractionDigits: 0,
    });



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
          <Flex px='20px' justify='space-between' mb='10px' align='center'>
            <Text
              color={textColor}
              fontSize='22px'
              lineHeight='100%'
              fontFamily={"AirbnbBold"}>
              Content sourced from task Summary / History
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
              <span onClick={() => downloadCsv(id, currentPage)}>
              <Tooltip label={"Print"}>
                <img src={print} className="opt_icons" />
              </Tooltip>
                </span>
              <div className="fltr_btn">
                <Text fontSize={"15px"}>
                  <span onClick={() => setHideShow((prevHideShow) => ({
                    ...prevHideShow,
                    status: true,
                    type: "purchasedContentHistory"
                  }))}>Sort</span>
                </Text>
                {hideShow.type === "purchasedContentHistory" &&
                  <SortFilterPublication hideShow={hideShow}
                    closeSort={closeSort}
                    sendDataToParent={collectSortParms}
                    sendDataToParent1={collectSortParms1}
                    handleApplySorting={handleApplySorting}
                  />}

                {/* <SortFilterDashboard /> */}
              </div>
            </div>
          </Flex>
          <TableContainer className="fix_ht_table">
            <Table mx='20px' variant='simple' className="common_table">
              <Thead>
                <Tr>
                  <Th>Time & date</Th>
                  <Th>Employee name</Th>
                  <Th>Publication</Th>
                  <Th>Tasks broadcasted</Th>
                  <Th className='wdth_th'>Purchased content (Qty)</Th>
                  <Th className='wdth_th'>Purchased content (Value)</Th>
                  <Th>Total amount received</Th>
                  <Th>Total presshop commission</Th>
                  <Th>Total amount paid</Th>
                  <Th>Total amount payable</Th>
                  {/* <Th className='wdth_th'>Total payment received</Th>
                  <Th>Payment receivable</Th> */}
                  <Th>Mode</Th>
                  <Th>Remarks</Th>
                </Tr>
              </Thead>
              <Tbody>
                {historyData && historyData.map((curr) => {
                  return (

                    <Tr key={curr?._id}>
                      <Td className="timedate_wrap">
                        <p className="timedate"><img src={watch} className="icn_time" />{moment(curr?.updatedAt).format("hh:mm A")}</p>
                        <p className="timedate"><img src={calendar} className="icn_time" />{moment(curr?.updatedAt).format("DD MMMM YYYY")}</p>
                      </Td>
                      <Td >{curr?.admin_details?.name}</Td>
                      <Td className="item_detail">
                        <img src={curr?.media_house_details?.profile_image} alt="Content thumbnail" />
                        <Text className="nameimg"><span className="txt_mdm">{curr?.media_house_details?.company_name}</span>
                        </Text>
                      </Td>
                      <Td>{curr?.sourcedContentSumSize}</Td>
                      <Td>{curr?.purchased_qty}</Td>
                      <Td>£ {formatAmountInMillion(curr?.purchased_content_value || 0)}</Td>
                      <Td>£ {formatAmountInMillion(curr?.total_amount_recieved || 0)} </Td>
                      <Td>£ {formatAmountInMillion(curr?.total_presshop_commission || 0)}</Td>
                      <Td>£ {formatAmountInMillion(curr?.total_amount_paid || 0)} </Td>
                      <Td>£ {formatAmountInMillion(curr?.total_amount_payable || 0)}</Td>
                      <Td className="select_wrap">
                        {/* <Select placeholder='Chat'>
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
                })}
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
