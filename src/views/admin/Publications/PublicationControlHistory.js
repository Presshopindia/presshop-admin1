/* eslint-disable */
import { Box, Flex, Table, Tbody, Td, Text, Th, Thead, Tr, useColorModeValue, TableContainer, Checkbox, Textarea, Select, Button, Progress, cssVar } from "@chakra-ui/react";
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
import { Tooltip } from "@chakra-ui/react";
import print from "assets/img/icons/print.png";
import { Get } from "api/admin.services";
import moment from "moment/moment";
import ReactPaginate from "react-paginate";
import Loader from "components/Loader";
import Share from "components/share/Share";
import SortFilterPublication from "components/sortfilters/SortFilterPublication";
import { BsArrowLeft } from "react-icons/bs";
export default function PublicationControlHistory() {
  const [parameters, setParameters] = useState('')
  const [parametersName, setParametersName] = useState('')
  const [parameters1, setParameters1] = useState('')
  const [parametersName1, setParametersName1] = useState('')
  const [hisData, setHistoryData] = useState([])
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  const textColor = useColorModeValue("#000", "white");
  let { id, name, component } = useParams()
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const perPage = 5;
  const [path, setPath] = useState("")
  const [csv, setCsv] = useState("")
  const [show, setShow] = useState(false)

  // get publication history
  const getHistory = async (id, page, parametersName, parameters, parametersName1, parameters1) => {
    const offset = (page - 1) * perPage
    setLoading(true)
    try {
      await Get(`admin/getPublicationMgmtHistory/${id}?limit=${perPage}&offset=${offset}&${parametersName}=${parameters}&${parametersName1}=${parameters1}`).then((res) => {
        setHistoryData(res.data.publicationHistory)
        setTotalPages(res.data.totalCount / perPage)
        setPath(res?.data?.fullPath)
        setLoading(false)

      })

    } catch (err) {
      setLoading(false)
    }

  }
  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected + 1)

  }

  // download csv file
  const printTable = async (content_id, page) => {
    const offset = (page - 1) * perPage
    try {
      const response = await Get(`admin/getPublicationMgmtHistory/${content_id}?limit=${perPage}&offset=${offset}`)
      if (response) {
        const onboardinPrint = response?.data?.fullPath;
        window.open(onboardinPrint)
      }
    } catch (err) {
      setLoading(false)
    }
  };


  const handleClose = () => {
    setShow(!show)
  }

  useEffect(() => {
    getHistory(id, currentPage)
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
    setParameters(order)
    setParametersName(name)
  }

  const collectSortParms1 = (name1, order1) => {
    setParametersName1(name1)
    setParameters1(order1)
  }

  const handleApplySorting = () => {
    getHistory(id, currentPage, parametersName, parameters, parametersName1, parameters1);

    setParameters('')
    setParametersName('')
    setParametersName1('')
    setParameters1('')

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
        <Card className="tab_card"
          direction='column'
          w='100%'
          px='0px'
          mb='24px'
          overflowX={{ sm: "scroll", lg: "hidden" }}>
          <div className="">
            <Flex px='25px' justify='space-between' mb='10px' align='center'>
              <Text
                color={textColor}
                fontSize='22px'
                fontFamily={"AirbnbBold"}
                lineHeight='100%'>
                Publication Control / History
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
                      type: "publicationControlHistory"
                    }))}>Sort</span>
                  </Text>
                  {hideShow.type === "publicationControlHistory" &&
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
              <Table variant='simple' className="common_table" mx="20px">
                <Thead>
                  <Tr>
                    <Th>Time & date</Th>
                    <Th>Employee name</Th>
                    <Th>Publication</Th>
                    <Th>Admin details</Th>
                    <Th>Mode</Th>
                    <Th>Status</Th>
                    <Th>Action taken</Th>
                    <Th>Remarks</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {
                    hisData && hisData.map((curr) => {
                      return (
                        <Tr key={curr._id}>
                          <Td className="timedate_wrap">
                            <p className="timedate"><img src={watch} className="icn_time" />{moment(curr.createdAt).format('hh:mm A')}</p>
                            <p className="timedate"><img src={calendar} className="icn_time" />{moment(curr.createdAt).format('DD:MM:YYYY')}</p>
                          </Td>
                          <Td >{curr.adminData.name}</Td>
                          <Td className="item_detail"><img src={curr.publicationData.profile_image} alt="Content thumbnail" />
                            <Text className="nameimg"><span className="txt_mdm">{curr.publicationData.company_name}</span></Text>
                            <Progress className="w_100 progress" colorScheme='red' size='sm' value={70} />
                          </Td>
                          <Td className="item_detail address_details">
                            {curr.publicationData.admin_detail.full_name} <br />
                            {curr.publicationData.admin_detail.department}< br />
                            {`${curr.publicationData.admin_detail.country_code}  ${curr.publicationData.admin_detail.phone}`} 79 231 456782 < br />
                            {curr.publicationData.admin_detail.email}
                          </Td>

                          <Td className="select_wrap">
                            {curr.mode}
                          </Td>
                          <Td className="big_select_wrap">
                            {curr.status}
                          </Td>
                          <Td className="item_detail">
                            <div className="check_wrap">
                              <Checkbox
                                colorScheme='brandScheme'
                                me='10px'
                                disabled
                                isChecked={curr?.action === "isTempBlocked" ? true : false}
                              />
                              <span>Temporary block</span>
                            </div>
                            <div className="check_wrap">
                              <Checkbox
                                colorScheme='brandScheme'
                                me='10px'
                                isChecked={curr?.action === "isPermanentBlocked" ? true : false}
                                disabled
                              />
                              <span>Permanent block</span>
                            </div>
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
