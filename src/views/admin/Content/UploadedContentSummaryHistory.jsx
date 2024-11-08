

// Chakra imports
import { Box, Flex, Table, Tbody, Td, Text, Th, Thead, Tr, useColorModeValue, TableContainer, Checkbox, Textarea, Select, Button, } from "@chakra-ui/react";
import Card from "components/card/Card";
import { React, useEffect, useState } from "react";
import calendar from "assets/img/icons/calendar.svg";
import share from "assets/img/icons/share.png";
import print from "assets/img/icons/print.png";
import watch from "assets/img/icons/watch.svg";
import auth1 from "assets/img/auth/auth1.svg";
import crown from "assets/img/icons/crown.png";
import shared from "assets/img/icons/shared.svg";
import star from "assets/img/icons/star.png";
import video from "assets/img/icons/video.svg";
import camera from "assets/img/icons/camera.svg";
import avatar13 from "assets/img/avatars/avatar13.png"
import write from "assets/img/icons/write.svg";
import content1 from "assets/img/auth/auth1.svg";
import content2 from "assets/img/auth/auth2.svg";
import content3 from "assets/img/auth/auth3.svg";
import { BsArrowRight } from "react-icons/bs";
import { BsArrowLeft } from "react-icons/bs";
import recic from "assets/img/icons/recording.svg";
import crime from "assets/img/icons/crime.svg";
import idic from "assets/img/icons/id.svg";
import invic from "assets/img/icons/invoice.svg";
import avatar11 from "assets/img/avatars/avatar11.png";
import avatar12 from "assets/img/avatars/avatar12.png";
import auth2 from "assets/img/auth/auth2.svg";
import auth3 from "assets/img/auth/auth3.svg";
import publication1 from "assets/img/profile/publication1.svg";
import publication2 from "assets/img/profile/publication2.svg";
import interview from "assets/img/icons/interview.svg";
import { useParams } from "react-router-dom";
import { Get } from "api/admin.services";
import moment from "moment/moment";
import ReactPaginate from "react-paginate";
import { Tooltip } from '@chakra-ui/react';
import Loader from "components/Loader";
import Share from "components/share/Share";
import SortFilterContent from "components/sortfilters/SortFilterContent";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function UploadedContentSummaryHistory() {
  const { id, name, component } = useParams();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const textColor = useColorModeValue("#000", "white");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const perPage = 5;
  const [contentSummary, setContentSummary] = useState([]);
  const [path, setPath] = useState("")
  const [csv, setCsv] = useState("")
  const [show, setShow] = useState(false)

  const [params, setParams] = useState({
    parameters: "",
    parametersName: "",
    parameters1: "",
    parametersName1: "",
  })

  // api calling
  const UploadContentHistory = (id, page, parametersName, parameters, parametersName1, parameters1) => {
    const offset = (page - 1) * perPage;
    setLoading(true)
    try {
      Get(`admin/viewliveuploadedcontenhistory/?offset=${offset}&limit=${perPage}&task_id=${id}&${parametersName}=${parameters}&${parametersName1}=${parameters1}`).then((res) => {
        setContentSummary(res?.data?.data);
        setPath(res?.data?.fullPath)
        setTotalPages(res?.data?.count / perPage)
        setLoading(false)
      })

    } catch (error) {
      setLoading(false)
    }
  }

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected + 1);
  }

  const printTable = async (id, page) => {
    const offset = (page - 1) * perPage;
    try {
      const response = await Get(`admin/viewliveuploadedcontenhistory/?offset=${offset}&limit=${perPage}&task_id=${id}`)
      if (response) {
        const csvData = response?.data?.fullPath;
        window.open(csvData)
      }
    } catch (err) {
      setLoading(false)
    }
  };

  useEffect(() => {
    UploadContentHistory(id, currentPage)
  }, [currentPage])

  const handleClose = () => {
    setShow(!show)
  }
  // sorting
  const [hideShow, setHideShow] = useState({ status: false, type: "" })

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
      parametersName: name,
      parameters: order,
    }))
  }

  const collectSortParms1 = (name, order) => {
    setParams((prev) => ({
      ...prev,
      parametersName1: name,
      parameters1: order,
    }))
  }
  const { parametersName, parameters, parametersName1, parameters1 } = params

  const handleApplySorting = () => {
    UploadContentHistory(id, currentPage, parametersName, parameters, parametersName1, parameters1);
    setParams({
      parameters: "",
      parametersName: "",
      parameters1: "",
      parametersName1: "",
    })
    closeSort()
  };

  // convert amount comma seprator
  const formatAmountInMillion = (amount) =>
    amount.toLocaleString('en-US', {
      maximumFractionDigits: 2,
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
              fontWeight='700'
              lineHeight='100%'
              fontFamily='AirbnbBold'>
              {
                name === "Live uploaded content" ? "Live uploaded content history" : name === "Uploaded content summary" ? "Uploaded content summary history" : ""
              }
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
                    type: "uploadedContent"
                  }))}>Sort</span>
                </Text>

                {
                  hideShow.type === "uploadedContent" &&
                  <SortFilterContent hideShow={hideShow}
                    closeSort={closeSort}
                    sendDataToParent={collectSortParms}
                    sendDataToParent1={collectSortParms1}
                    handleApplySorting={handleApplySorting}
                  />
                }
                {/* <SortFilterDashboard /> */}
              </div>
            </div>
          </Flex>
          <TableContainer>
            <Table variant='simple' className="common_table" mx="20px">
              <Thead>
                <Tr>
                  <Th>Time & date</Th>
                  <Th>Employee name</Th>
                  <Th>Uploaded content</Th>
                  <Th>Location</Th>
                  <Th>Task broadcasted by</Th>
                  <Th>Task details</Th>
                  <Th>Type</Th>
                  <Th>Category</Th>
                  <Th>Volume</Th>
                  <Th>Total price</Th>
                  <Th>Sale status</Th>
                  <Th>Amount received</Th>
                  <Th>Presshop commission</Th>
                  <Th>Amount paid</Th>
                  <Th>Amount payable</Th>
                  <Th>Received from</Th>
                  <Th>Uploaded by</Th>
                  <Th>Mode</Th>
                  <Th>Remarks</Th>
                </Tr>
              </Thead>
              <Tbody>
                {
                  contentSummary && contentSummary.map((curr) => {
                    const imageCount = curr?.content_id?.filter((el) => el?.type === "image")?.length;
                    const videoCount = curr?.content_id?.filter((el) => el?.type === "video")?.length;
                    const interviewCount = curr?.content_id?.filter((el) => el?.type === "interview")?.length;
                    return (
                      <Tr key={curr?._id}>
                        <Td className="timedate_wrap">
                          <p className="timedate"><img src={watch} className="icn_time" />{moment(curr?.createdAt).format('hh:mm A')}</p>
                          <p className="timedate"><img src={calendar} className="icn_time" />{moment(curr?.createdAt).format('DD MMMM YYYY')}</p>
                        </Td>
                        <Td> {curr?.admin_id?.name}</Td>
                        <Td className="content_wrap new_content_wrap">
                          <a onClick={() => {
                            history.push(
                              `/admin/live-uploaded-content/${curr?.content_id[0]?.hopper_id?._id}/${curr?.task_id?._id}/${name}`);
                          }}>

                            {curr && curr.content_id && curr.content_id.length > 0 ? (
                              curr.content_id.length === 1 ? (
                                <img src={process.env.REACT_APP_UPLOADED_CONTENT + curr.content_id[0]?.imageAndVideo} />
                              ) : (
                                <div className="content_imgs_wrap contnt_lngth_wrp">
                                  <div className="content_imgs">
                                    {curr.content_id?.slice(0, 3).map((value) => (
                                      value.type === "image" ? (
                                        <img
                                          key={value?._id}
                                          src={process.env.REACT_APP_UPLOADED_CONTENT + value?.imageAndVideo}
                                          className="content_img"
                                          alt="Content thumbnail"
                                        />
                                      ) : value.type === "audio" ? (
                                        <img src={interview} alt="Content thumbnail" className="icn m_auto" />
                                      ) : value.type === "video" ? (
                                        <img src={process.env.REACT_APP_UPLOADED_CONTENT + value?.thubnail} alt="Content thumbnail" className="icn m_auto" />
                                      ) : (
                                        null
                                      )
                                    ))}
                                    <span className="arrow_span"><BsArrowRight /></span>
                                  </div>
                                </div>
                              )

                            ) : null

                            }
                          </a>
                        </Td>
                        <Td className="item_detail address_details">
                          <Text className="desc_ht">
                            {curr?.task_id?.location}
                          </Text>
                        </Td>
                        <Td className="item_detail"><img src={curr?.task_id?.mediahouse_id?.profile_image} alt="Content thumbnail" />
                          <Text className="nameimg"><span className="txt_mdm">{curr?.task_id?.mediahouse_id?.company_name}</span></Text>
                        </Td>
                        <Td className="description_details " >
                          <Text className="desc_ht">
                            {curr?.task_id?.task_description}
                          </Text>
                        </Td>
                        <Td className="text_center">
                          <div className="dir_col text_center">
                            <Tooltip label={"Photo"}>{curr?.task_id && curr?.task_id?.need_photos === true ? <img src={camera} alt="Content thumbnail" className="icn m_auto" /> : ""}</Tooltip>
                            <Tooltip label={"Interview"}>{curr?.task_id && curr?.task_id?.need_interview === true ? <img src={interview} alt="Content thumbnail" className="icn m_auto" /> : ""}</Tooltip>
                            <Tooltip label={"Video"}>{curr?.task_id && curr?.task_id?.need_videos === true ? <img src={video} alt="Content thumbnail" className="icn m_auto" /> : ""}</Tooltip>
                          </div>
                        </Td>
                        <Td className="text_center">
                          <Tooltip label={curr?.task_id?.category_id?.name}>
                            {<img src={curr?.task_id?.category_id?.icon} className="icn m_auto" />}
                          </Tooltip>
                        </Td>
                        <Td className="text_center">
                          <div className="dir_col text_center">
                            <p className="text_center">{imageCount}</p>
                            <p className="text_center">{interviewCount}</p>
                            <p className="text_center">{videoCount}</p>
                          </div>
                        </Td>
                        <Td className="text_center">
                          <div className="dir_col">
                            <p>£ {formatAmountInMillion(curr?.task_id?.photo_price ?? "0")}</p>
                            <p>£ {formatAmountInMillion(curr?.task_id?.interview_price ?? "0")}</p>
                            <p>£ {formatAmountInMillion(curr?.task_id?.videos_price ?? "0")}</p>
                          </div>
                        </Td>
                        <Td className="sale-status gr">{curr?.paid_status === true ? "sold" : "unsold"}</Td>
                        <Td>£0 </Td>
                        <Td>£0 </Td>
                        <Td>£0 </Td>
                        <Td className="timedate_wrap">
                          <p className="timedate"><img src={idic} className="icn_time" />ID-782319</p>
                          <p className="timedate"><img src={invic} className="icn_time" />INV- 628192</p>
                          <p className="timedate"><img src={calendar} className="icn_time" />10 Oct 2021</p>
                        </Td>
                        <Td className="item_detail">
                          <img src={process.env.REACT_APP_HOPPER_AVATAR + curr?.content_id[0]?.avatar_id?.avatar} alt="Content thumbnail" />
                          <Text className="nameimg">{`${curr?.content_id[0]?.hopper_id?.first_name}  ${curr?.content_id[0]?.hopper_id?.last_name} `}<br />
                            <span >({curr?.content_id[0]?.hopper_id?.user_name})</span></Text>
                        </Td>
                        <Td className="select_wrap">
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
