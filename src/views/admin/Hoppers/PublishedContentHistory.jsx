

// Chakra imports
import { Box, Flex, Table, Tbody, Td, Text, Th, Thead, Tr, useColorModeValue, TableContainer, Textarea, Select, Button, Tooltip, } from "@chakra-ui/react";
import Card from "components/card/Card";
import share from "assets/img/icons/share.png";
import print from "assets/img/icons/print.png";
import React, { useEffect, useState } from "react";
import publication1 from "assets/img/profile/publication1.svg";
import publication2 from "assets/img/profile/publication2.svg";
import publication3 from "assets/img/profile/publication3.svg";
import watch from "assets/img/icons/watch.svg";
import calendar from "assets/img/icons/calendar.svg";
import celebrity from "assets/img/icons/celebrity.png";
import camera from "assets/img/icons/camera.svg";
import video from "assets/img/icons/video.svg";
import shared from "assets/img/icons/shared.svg";
import content1 from "assets/img/nfts/NftBanner1.png";
import content2 from "assets/img/nfts/Nft1.png";
import content3 from "assets/img/nfts/Nft2.png";
import idimg from "assets/img/icons/id.svg";
import exclusive from "assets/img/icons/crown.png";
import crime from "assets/img/icons/crime.svg";
import business from "assets/img/icons/business.svg";
import political from "assets/img/icons/political.svg";
import crown from "assets/img/icons/crown.png";
import Share from "components/share/Share";
import { Get } from "api/admin.services";
import interview from "assets/img/icons/interview.svg";
import { BsArrowRight } from "react-icons/bs";
// import video from "assets/img/icons/video.svg";
import { BsEye, BsArrowLeft } from "react-icons/bs";
import Loader from "components/Loader";
import ReactPaginate from "react-paginate";

import { useHistory, useParams } from "react-router-dom";
import moment from "moment";
import SortFilterHopper from "components/sortfilters/SortFilterHopper";
export default function PublishedContentHistory() {
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  const textColor = useColorModeValue("#000", "white");
  const { id, component } = useParams()
  const [historyDetail, setHistoryDetail] = useState([])
  const [path, setPath] = useState("");
  const [csv, setCsv] = useState("");
  const [show, setShow] = useState(false);
  const [currentPage, setCurrentpage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const perPage = 5;
  const [hopper, setHopper] = useState("")
  const GetHistory = async (id, page, parametersName, parameters) => {
    const offset = (page - 1) * perPage;
    setLoading(true)
    try {
      await Get(`admin/gethopperViewHistory/${id}?limit=${perPage}&offset=${offset}&${parametersName}=${parameters}`).then((res) => {
        // console.log(res, `<--------res for name`)
        setHistoryDetail(res?.data?.contnetMgmtHistory)
        setPath(res?.data?.fullPath)
        setHopper(res?.data?.contnetMgmtHistory[0]?.content_id?.hopper_id)
        setTotalPages(res?.data?.count / perPage)
        setLoading(false)
      })
    } catch (error) {

      setLoading(false)
    }
  }
  useEffect(() => {
    GetHistory(id, currentPage)
  }, [])

  // download csv file 
  const DownloadCsv = async (id, page) => {
    const offset = (page - 1) * perPage;
    try {
      const response = await Get(`admin/gethopperViewHistory/${id}?limit=${perPage}&offset=${offset}`);

      if (response) {
        const path = response?.data?.fullPath;
        window.open(path);
      }
    } catch (err) {
      // console.log("<---Have an error ->", err);
    }
  };

  const handleClose = () => {
    setShow(!show);
  };

  // page change 
  const handlePageChange = (selectedPage) => {
    setCurrentpage(selectedPage.selected + 1)
  }

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
      type: ""
    }));
  };
  const collectSortParms = (name, order) => {
    setParameters(order)
    setParametersName(name)
  }

  const handleApplySorting = () => {
    if (hideShow?.type === "summaryOfPublishedContentHistory") {
      GetHistory(id, currentPage, parametersName, parameters);
      setParameters('')
      setParametersName('')
      closeSort()
    }
  };

  // comma seprator
  const formatAmountInMillion = (amount) =>
    amount?.toLocaleString('en-US', {
      maximumFractionDigits: 0,
    });

  // back path
  const backpath = `published-content/${historyDetail[0]?.content_id?.hopper_id?.id}/Manage hoppers`

  return (
    <>

      {loading && <Loader />}
      <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
        <div className="back_link">
          <a onClick={() => { window.history.back() }}>
            <BsArrowLeft />
            <span>Back</span>
          </a>
        </div>
        <div className="cstm_brand_txt">
          <Text className="brnd_txt">
            {component}
          </Text>
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
              {hopper?.first_name} {hopper?.last_name} ({hopper?.user_name}) Published Content Summary / History
            </Text>
            <div className="opt_icons_wrap">
              {/* <RxUpload />
            <TfiPrinter /> */}
              <a
                onClick={() => {
                  setShow(true)
                  setCsv(path)
                }} className="txt_danger_mdm"  >
                <img src={share} className="opt_icons" />
              </a>
              <span onClick={() => DownloadCsv(id, currentPage)}>
                <img src={print} className="opt_icons" />
              </span>
              <div className="fltr_btn">
                <Text fontSize={"15px"}>
                  <span onClick={() => setHideShow((prevHideShow) => ({
                    ...prevHideShow,
                    status: true,
                    type: "summaryOfPublishedContentHistory"
                  }))}>Sort</span>
                </Text>
                {
                  hideShow.type === "summaryOfPublishedContentHistory" &&
                  <SortFilterHopper hideShow={hideShow}
                    closeSort={closeSort}
                    sendDataToParent={collectSortParms}
                    handleApplySorting={handleApplySorting}
                  />
                }
              </div>
              {/* <Menu /> */}
            </div>
          </Flex>
          <TableContainer className="" mx="20px">
            <Table variant='simple' className="common_table">
              <Thead>
                <Tr>
                  <Th>Time & date</Th>
                  <Th>Employee name</Th>
                  <Th>Published Content</Th>
                  <Th>Heading</Th>
                  <Th>Description</Th>
                  <Th>Type</Th>
                  <Th>License</Th>
                  <Th>Category</Th>
                  <Th>Volume</Th>
                  <Th>Published by</Th>
                  <Th>Sale price</Th>
                  <Th>Sale status</Th>
                  <Th>Amount Received</Th>
                  <Th>Presshop commission</Th>
                  <Th>Amount paid</Th>
                  <Th>Amount payable</Th>
                  <Th>Paid to </Th>
                  {/* <Th>Payment received</Th>
                  <Th>Presshop commission</Th>
                  <Th>Payment made</Th>
                  <Th>Paid to</Th>
                  <Th>Payment made details</Th>
                  <Th>Payment pending</Th>
                  <Th>Payment due date</Th> */}
                  <Th>Mode</Th>
                  <Th>Remarks</Th>
                </Tr>
              </Thead>
              <Tbody>

                {historyDetail && historyDetail.map((curr) => {
                  const audio = curr?.content_id?.content && curr?.content_id?.content.filter((item) => item.media_type === "audio")
                  const videos = curr?.content_id?.content && curr?.content_id?.content.filter((item) => item.media_type === "video")
                  const images = curr?.content_id?.content && curr?.content_id?.content.filter((item) => item.media_type === "image")
                  return (

                    <Tr key={curr?._id}>
                      <Td className="timedate_wrap">
                        <p className="timedate"><img src={watch} className="icn_time" />{moment(curr?.updatedAt).format(`hh:mm A`)}</p>
                        <p className="timedate"><img src={calendar} className="icn_time" />{moment(curr?.updatedAt).format(`DD MMMM, YYYY`)}</p>
                      </Td>
                      <Td >
                        {curr?.admin_id?.name}
                      </Td>
                      <Td className="content_img_td">
                        <a onClick={() => { history.push(`/admin/live-published-content/${curr?.content_id?._id}/ManageHopper_published_content_summary_history`) }}>

                          {curr?.content_id?.content.length === 1 ? (
                            curr?.content_id?.content[0].media_type === "image" ? (
                              <img
                                src={process.env.REACT_APP_CONTENT + curr?.content_id?.content[0]?.media}
                                className="content_img"
                                alt="Content thumbnail"
                              />
                            ) : curr?.content_id?.content[0].media_type === "audio" ? (
                              <img
                                src={interview}
                                alt="Content thumbnail"
                                className="icn m_auto"
                              />
                            ) : curr?.content_id?.content[0].media_type === "video" ? (
                              <img
                                src={process.env.REACT_APP_CONTENT + curr?.content_id?.content[0]?.thumbnail}
                                className="content_img"
                                alt="Content thumbnail"
                              />
                            ) : (
                              "no content"
                            )
                          ) : curr?.content_id?.content.length === 0 ? (
                            "no content"
                          ) : (
                            curr?.content_id?.content.length > 1 && (
                              <div className="content_imgs_wrap contnt_lngth_wrp">
                                <div className="content_imgs">
                                  {curr?.content_id?.content.map((value) => (
                                    <>
                                      {value.media_type === "image" ? (
                                        <img
                                          src={process.env.REACT_APP_CONTENT + value.media}
                                          className="content_img"
                                          alt="Content thumbnail"
                                        />
                                      ) : value.media_type === "audio" ? (
                                        <img
                                          src={interview}
                                          alt="Content thumbnail"
                                          className="icn m_auto"
                                        />
                                      ) : (
                                        <img
                                          src={process.env.REACT_APP_CONTENT + value.thumbnail}
                                          className="content_img"
                                          alt="Content thumbnail"
                                        />
                                      )}
                                    </>
                                  ))}
                                </div>
                                <span className="arrow_span">
                                  <BsArrowRight />
                                </span>
                              </div>
                            )
                          )}
                        </a>
                      </Td>
                      <Td className="description_td">
                        {curr?.content_id?.heading}
                      </Td>
                      <Td className="description_td">

                        <div className="desc-limit">

                          {curr?.content_id?.description}
                        </div>
                      </Td>
                      <Td>
                        {audio && audio?.length > 0 && (<img src={interview} alt="Content thumbnail" className="icn m_auto" />)}
                        {videos && videos?.length > 0 && (<img src={video} alt="Content thumbnail" className="icn m_auto" />)}
                        {images && images?.length > 0 && (<img src={camera} alt="Content thumbnail" className="icn m_auto" />)}
                      </Td>

                      <Td className="text_center">
                        {curr?.content_id?.type == "shared" ? (
                          <img
                            src={shared}
                            alt="Content thumbnail"
                            className="icn"
                          />
                        ) : (
                          <img
                            src={crown}
                            alt="Content thumbnail"
                            className="icn"
                          />
                        )}
                      </Td>

                      <Td className="">
                        {curr?.category__id?.name || "No category"}

                      </Td>
                      <Td className="text_center">
                        <p>   {audio && audio?.length > 0 && audio?.length}</p>
                        <p>  {videos && videos?.length > 0 && videos?.length}</p>
                        <p> {images && images?.length > 0 && images?.length}</p>
                      </Td>
                      <Td
                        className="item_detail">

                        {curr?.content_id?.purchased_publication ? (
                          <>
                            <img src={curr?.content_id?.purchased_publication?.profile_image} alt="Content thumbnail" />
                            <Text className="nameimg">
                              <span className="txt_mdm">
                                {curr?.content_id?.purchased_publication?.company_name}
                              </span>
                            </Text>
                          </>
                        ) : (
                          <span>Not yet purchased</span>
                        )}
                      </Td>

                      <Td>
                        {/* {curr?.content_id?.amount_paid ? (
                          `£${curr?.content_id?.amount_paid}`
                        ) : (
                          "not paid yet"
                        )} */}
                        {formatAmountInMillion(curr?.content_id?.amount_paid ?? 0)}
                      </Td>
                      <Td className="">
                        {curr?.content_id?.sale_status === "sold" ? <span className="txt_success_mdm">sold</span> : <span className="txt_success_mdm">unsold</span>}
                      </Td>
                      <Td>
                        {/* {curr?.content_id?.amount_paid ? (
                          `£${curr?.content_id?.amount_paid}`
                        ) : (
                          "not paid yet"
                        )} */}
                        {formatAmountInMillion(curr?.content_id?.amount_paid ?? 0)}
                      </Td>
                      <Td>
                        &pound; {formatAmountInMillion(curr?.content_id?.presshop_committion ?? 0)}
                      </Td>
                      <Td className="txt_wrap">
                        &pound;{formatAmountInMillion(curr?.content_id?.amount_paid_to_hopper ?? 0)}
                      </Td>
                      <Td className="txt_wrap">
                        &pound;{curr?.content_id?.amount_paid_to_hopper && curr?.content_id?.amount_paid_to_hopper ? "0" : curr?.content_id?.amount_payable_to_hopper}
                      </Td>
                      <Td className="contact_details"> {curr?.content_id?.hopper_id?.bank_detail[0]?.bank_name}<br /> Sort Code - {curr?.content_id?.hopper_id?.bank_detail[0]?.sort_code}<br /> Account - {curr?.content_id?.hopper_id?.bank_detail[0]?.acc_number} </Td>
                      <Td className="select_wrap">
                        {/* <Select placeholder='Chat'> */}
                        {/* <option value='option2'>Call</option> */}
                        {/* </Select> */}
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
