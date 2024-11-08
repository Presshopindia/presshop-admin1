
// Chakra imports
import { Box, Flex, Table, Tbody, Td, Text, Th, Thead, Tr, useColorModeValue, TableContainer, Checkbox, Textarea, Select, Button, Tooltip, } from "@chakra-ui/react";
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
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import recic from "assets/img/icons/recording.svg";
import crime from "assets/img/icons/crime.svg";
import { Get } from "api/admin.services";
import { useParams } from "react-router-dom";
import moment from "moment/moment";
import interview from "assets/img/icons/interview.svg";
import ReactPaginate from "react-paginate";
import Loader from "components/Loader";
import Share from "components/share/Share";
import SortFilterContent from "components/sortfilters/SortFilterContent";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import docic from "assets/img/icons/contentdoc.svg";
import pdfic from "assets/img/icons/contentpdf.svg";


export default function ContentOnboardingHistory() {
  const { id, name, component } = useParams();
  const history = useHistory()
  const [onboardHistory, setOnboardHistory] = useState([]);
  const textColor = useColorModeValue("#000", "white");
  const [loading, setLoading] = useState(false);
  // pagination concept states
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const perPage = 5;
  const [path, setPath] = useState("");
  const [csv, setCsv] = useState("");
  const [show, setShow] = useState(false);


  const getContentOnboardingHistory = async (content_id, page, parametersName, parameters, parametersName1, parameters1) => {
    setLoading(true);
    const offset = (page - 1) * perPage;
    try {
      Get(`admin/getContentMgmtHistory/${content_id}?limit=${perPage}&offset=${offset}&${parametersName}=${parameters}&${parametersName1}=${parameters1}`).then((res) => {
        setOnboardHistory(res?.data?.contnetMgmtHistory);
        setTotalPages(res?.data?.count / perPage);
        setPath(res?.data?.fullPath);
        setLoading(false);
      });
    } catch (errors) {
      // console.log(errors);
      setLoading(false);
    }
  };

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected + 1);
  };

  const printTable = async (content_id, page) => {
    const offset = (page - 1) * perPage;
    try {
      const response = await Get(`admin/getContentMgmtHistory/${content_id}?limit=${perPage}&offset=${offset}`);
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

  // sorting
  const [params, setParams] = useState({
    parameters: "",
    parametersName: "",
    parameters1: "",
    parametersName1: "",
  })
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
    getContentOnboardingHistory(id, currentPage, parametersName, parameters, parametersName1, parameters1);
    setParams({
      parameters: "",
      parametersName: "",
      parameters1: "",
      parametersName1: "",
    })
    closeSort()

  };

  useEffect(() => {
    getContentOnboardingHistory(id, currentPage);
  }, [currentPage]);


  const formatAmountInMillion = (amount) =>
    amount?.toLocaleString('en-US', {
      maximumFractionDigits: 2,
    });

  // Back path
  const Backpath = component === "Manage content" ? `content` : component === "Admin contorls" ? `admin-controls` : ""

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
              {name === "Content control history" ? "Content control history" : name === "Content onboarding history" ? "Content onboarding history" : ""}

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
                    type: "onboardingHistory"
                  }))}>Sort</span>
                </Text>
                {
                  hideShow.type === "onboardingHistory" &&
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
            <Table mx='20px' variant='simple' className="common_table">
              <Thead>
                <Tr>
                  <Th>Time & date</Th>
                  <Th>Employee name</Th>
                  <Th>Published content</Th>
                  <Th>Location</Th>
                  <Th>Heading</Th>
                  <Th>Description</Th>
                  <Th>Voice note</Th>
                  <Th>Type</Th>
                  <Th>Licence</Th>
                  <Th>Category</Th>
                  <Th>Volume</Th>
                  <Th>Price</Th>
                  <Th>Published by</Th>
                  <Th>1st level check</Th>
                  <Th>2nd level check & call</Th>
                  <Th>Call time & date</Th>
                  <Th className="check_th">Check & approve</Th>
                  <Th>Mode</Th>
                  <Th>Status</Th>
                  <Th>Remarks</Th>
                </Tr>
              </Thead>
              <Tbody>
                {
                  onboardHistory && onboardHistory.map((curr) => {
                    const audio = curr?.content_id?.content?.filter(curr => (curr?.media_type === "audio"))
                    const image = curr?.content_id?.content?.filter(curr => (curr?.media_type === "image"))
                    const video1 = curr?.content_id?.content?.filter(curr => (curr?.media_type === "video"))
                    const Doc = curr?.content_id?.content?.filter(curr => (curr?.media_type === "doc"))
                    const Pdf = curr?.content_id?.content?.filter(curr => (curr?.media_type === "pdf"))
                    return (
                      <Tr>
                        <Td className="timedate_wrap">
                          <p className="timedate"><img src={watch} className="icn_time" />{moment(curr?.createdAt).format('hh:mm A')}</p>
                          <p className="timedate"><img src={calendar} className="icn_time" />{moment(curr?.createdAt).format('DD MM YYYY')}</p>
                        </Td>
                        <Td>{curr?.admin_id[0]?.name}</Td>

                        <Td>
                          <a onClick={() => history.push(`/admin/live-published-content/${curr?.content_id?._id}/${name}`)}>
                            {
                              curr?.content_id?.content[0]?.media_type === "image" ?
                                <img src={curr?.content_id?.content[0]?.watermark} className="content_img" alt="Content thumbnail" />
                                : curr?.content_id?.content[0]?.media_type === "video" ?
                                  <img src={curr?.content_id?.content[0]?.watermark} className="content_img" alt="Content thumbnail" />
                                  : curr?.content_id?.content[0]?.media_type === "audio" ?
                                    <img src={interview} className="content_img" alt="Content thumbnail" />
                                    : curr?.content_id?.content[0]?.media_type === "doc" ?
                                      <img src={docic} className="content_img" alt="Content thumbnail" />
                                      : curr?.content_id?.content[0]?.media_type === "pdf" ?
                                        <img src={pdfic} className="content_img" alt="Content thumbnail" />
                                        : null

                            }
                          </a>
                        </Td>


                        <Td className="item_detail address_details">{curr?.content_id?.location}</Td>
                        <Td className="remarks_wrap remarks_wrap_edit">
                          <Textarea className="desc_txtarea" value={curr?.heading} />
                          <img className="icn_edit" src={write} />
                        </Td>
                        <Td className="remarks_wrap remarks_wrap_edit">
                          <Textarea className="desc_txtarea" value={curr?.description}
                          />
                          <img className="icn_edit" src={write} />
                        </Td>
                        <Td>
                          <audio controls>
                            <source src={process.env.REACT_APP_CONTENT + curr?.content_id?.audio_description} type="audio/mp3" />
                          </audio>

                          <audio />
                        </Td>
                        <Td className="text_center">
                          <div className="dir_col text_center">
                            {audio && audio.length > 0 && <Tooltip label="Audio"><img src={interview} alt="Content thumbnail" className="icn m_auto" /></Tooltip>}
                            {video1 && video1.length > 0 && <Tooltip label="Video"><img src={video} alt="Content thumbnail" className="icn m_auto" /></Tooltip>}
                            {image && image.length > 0 && <Tooltip label="Photo"><img src={camera} alt="Content thumbnail" className="icn m_auto" /></Tooltip>}
                            {Doc && Doc.length > 0 && <Tooltip label="Document"><img src={docic} alt="Content thumbnail" className="icn m_auto" /></Tooltip>}
                            {Pdf && Pdf.length > 0 && <Tooltip label="Pdf"><img src={pdfic} alt="Content thumbnail" className="icn m_auto" /></Tooltip>}
                          </div>
                        </Td>
                        <Td className="text_center">
                          {curr?.content_id?.Vat[0]?.purchased_content_type == "shared" ? <Tooltip label="Shared"><img src={shared} alt="Content thumbnail" className="icn" /></Tooltip> : <Tooltip label="Exclusive"><img src={crown} alt="Content thumbnail" className="icn" /></Tooltip>}
                        </Td>
                        <Td
                          className="text_center">
                          <Tooltip label={curr?.category_details?.name}><img src={curr?.category_details?.icon} alt="Content thumbnail" className="icn" /></Tooltip>
                        </Td>
                        <Td className="text_center">
                          {audio && audio.length > 0 && audio.length}
                          {video1 && video1.length > 0 && video1.length}
                          {image && image.length > 0 && image.length}
                          {Pdf && Pdf.length > 0 && image.length}
                          {Doc && Doc.length > 0 && image.length}

                        </Td>
                        <Td>&pound; {formatAmountInMillion(curr?.content_id?.ask_price)} </Td>
                        <Td className="item_detail">
                          <img src={process.env.REACT_APP_HOPPER_AVATAR + curr?.avatar_detals[0]?.avatar} alt="Content thumbnail" />
                          <Text className="nameimg">{`${curr?.hopper_details?.first_name} ${curr?.hopper_details?.last_name}`}<br />
                            <span >({curr?.hopper_details?.user_name})</span></Text>
                        </Td>
                        <Td className="item_detail">
                          <div className="check_wrap">
                            <Checkbox
                              colorScheme='brandScheme'
                              me='10px'
                              isChecked={curr?.firstLevelCheck?.nudity}

                            />
                            <span>No nudity</span>
                          </div>
                          <div className="check_wrap">
                            <Checkbox
                              colorScheme='brandScheme'
                              me='10px'
                              isChecked={curr?.firstLevelCheck?.isAdult}


                            />
                            <span>No children</span>
                          </div>
                          <div className="check_wrap">
                            <Checkbox
                              colorScheme='brandScheme'
                              me='10px'
                              isChecked={curr?.firstLevelCheck?.isGDPR}
                            />
                            <span>GDPR check</span>
                          </div>
                        </Td>
                        <Td className="remarks_wrap">
                          <Textarea value={curr?.secondLevelCheck} />
                        </Td>
                        <Td className="timedate_wrap">
                          {curr?.call_time_date ?
                            <>
                              <p className="timedate"><img src={watch} className="icn_time" />{moment(curr?.call_time_date).format("hh:mm A")}</p>
                              <p className="timedate"><img src={calendar} className="icn_time" />{moment(curr?.call_time_date).format("DD MMMM, YYYY")}</p>
                            </>
                            : ""
                          }

                        </Td>
                        <Td className="text_center">
                          <Checkbox
                            colorScheme='brandScheme'
                            me='10px'
                            defaultChecked={curr?.checkAndApprove}
                          />

                        </Td>
                        <Td className="select_wrap">
                          {curr?.mode}
                        </Td>
                        <Td className="big_select_wrap">
                          {curr?.status}
                        </Td>
                        <Td className="conversation-td">
                          <div className="conversation-details">
                            <p>
                              {curr?.remarks}
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
