

// Chakra imports
import { Box, Flex, Table, Tbody, Td, Text, Th, Thead, Tr, useColorModeValue, TableContainer, Checkbox, Textarea, Select, Button, Tooltip, } from "@chakra-ui/react";
import Card from "components/card/Card";
import { React } from "react";
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
import idic from "assets/img/icons/id.svg";
import invic from "assets/img/icons/invoice.svg";
import avatar11 from "assets/img/avatars/avatar11.png";
import avatar12 from "assets/img/avatars/avatar12.png";
import { useParams } from "react-router-dom";
import { Get } from "api/admin.services";
import { useEffect, useState } from "react";
import moment from "moment/moment";
import interview from "assets/img/icons/interview.svg";
import ReactPaginate from "react-paginate";
import Loader from "components/Loader";
import Share from "components/share/Share";
import SortFilterContent from "components/sortfilters/SortFilterContent";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import docic from "assets/img/icons/contentdoc.svg";
import pdfic from "assets/img/icons/contentpdf.svg";
export default function PublishedContenHistory() {
  const [loading, setLoading] = useState(false)
  const { id, name, component } = useParams();
  const [publishedHistory, setPublishedHistory] = useState([])
  const textColor = useColorModeValue("#000", "white");
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const perPage = 5;
  const [path, setPath] = useState("")
  const [csv, setCsv] = useState("")
  const [show, setShow] = useState(false)
  const [params, setParams] = useState({
    parameters: "",
    parametersName: "",
    parameters1: "",
    parametersName1: "",
  })

  const audiowidth = { width: '210px', };

  // Get published content history
  const getPublishedHistory = async (content_id, page, parametersName, parameters, parametersName1, parameters1) => {
    const offset = (page - 1) * perPage
    setLoading(true)
    try {
      Get(`admin/getPublishedContentSummery/${content_id}?limit=${perPage}&offser=${offset}&${parametersName}=${parameters}&${parametersName1}=${parameters1}`).then((res) => {
        setPublishedHistory(res?.data?.publishedContentSummery)
        setPath(res?.data?.fullPath)
        setTotalPages(res?.data?.count / perPage)
        setLoading(false)
      })
    } catch (errors) {
      setLoading(false)
    }

  }
  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected + 1)
  }
  useEffect(() => {
    getPublishedHistory(id, currentPage)
  }, [currentPage])

  const printTable = async (content_id, page) => {
    const offset = (page - 1) * perPage
    try {
      const response = await Get(`admin/getPublishedContentSummery/${content_id}?limit=${perPage}&offser=${offset}`)
      if (response) {
        const onboardinPrint = response?.data?.fullPath;
        window.open(onboardinPrint)
      }
    } catch (err) {
      // console.log("<---Have an error ->", err);
      setLoading(false)
    }
  };

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
      parameters: order,
      parametersName: name,
    }))
  }
  const collectSortParms1 = (name, order) => {
    setParams((prev) => ({
      ...prev,
      parameters1: order,
      parametersName1: name,
    }))
  }
  const { parametersName, parameters, parametersName1, parameters1 } = params

  const handleApplySorting = () => {
    getPublishedHistory(id, currentPage, parametersName, parameters, parametersName1, parameters1);
    setParams({
      parameters: "",
      parametersName: "",
      parameters1: "",
      parametersName1: "",
    })
    closeSort()

  };
  const history = useHistory()

  // back path 
  const backPath = component === "Dashboard" ? `default` : component === "Manage content" ? `content` : ""

  // comma seprator
  const formatAmountInMillion = (amount) =>
    amount?.toLocaleString('en-US', {
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
              {name === "Live published content History" ? "Live published content history" : name === "Published Content Summary History" ? " Published Content Summary History" : ""}

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
                    type: "publishedHistory"
                  }))}>Sort</span>
                </Text>

                {
                  hideShow.type === "publishedHistory" &&
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
                  <Th>Asking price</Th>
                  <Th>Sale price</Th>
                  <Th>Sale status</Th>
                  <Th>Amount received</Th>
                  <Th>Presshop commission</Th>
                  <Th>Amount paid</Th>
                  <Th>Amount payable</Th>
                  <Th>Received From</Th>
                  <Th>Published by</Th>
                  {/* <Th>Payment details</Th> */}
                  <Th>Mode</Th>
                  <Th>Remarks</Th>
                </Tr>
              </Thead>
              <Tbody>
                {
                  publishedHistory && publishedHistory.map((curr) => {
                    const audio = curr?.content_id?.content?.filter(curr => (curr?.media_type === "audio"))
                    const image = curr?.content_id?.content?.filter(curr => (curr?.media_type === "image"))
                    const video1 = curr?.content_id?.content?.filter(curr => (curr?.media_type === "video"))
                    const Pdf = curr?.content_id?.content?.filter(curr => (curr?.media_type === "pdf"))
                    const Doc = curr?.content_id?.content?.filter(curr => (curr?.media_type === "doc"))

                    return (
                      <Tr>
                        <Td className="timedate_wrap">
                          <p className="timedate"><img src={watch} className="icn_time" />{moment(curr.createdAt).format('hh:mm A')}</p>
                          <p className="timedate"><img src={calendar} className="icn_time" />{moment(curr.createdAt).format('DD MM YYYY')}</p>
                        </Td>
                        <Td>{curr?.admin_id?.name}</Td>
                        <Td>
                          <a onClick={() => history.push(`/admin/live-published-content/${curr?.content_id?._id}/${name}`)}>
                            {curr?.content_id?.content.length === 1 ? (
                              curr?.content_id?.content[0].media_type === "image" ? (
                                <img
                                  // src={process.env.REACT_APP_CONTENT + curr?.content_id?.content[0]?.media}
                                  src={curr?.content_id?.content[0]?.watermark}
                                  className="content_img"
                                  alt="Content thumbnail"
                                />
                              ) : curr?.content_id?.content[0].media_type === "audio" ? (
                                <img src={interview} alt="Content thumbnail" className="icn m_auto" />
                              ) : curr?.content_id?.content[0].media_type === "video" ? (
                                <img
                                  src={curr?.content_id?.content[0]?.watermark}
                                  className="content_img"
                                  alt="Content thumbnail"
                                />
                              ) : curr?.content_id?.content[0].media_type === "doc" ? (
                                <img
                                  src={docic}
                                  className="content_img"
                                  alt="Content thumbnail"
                                />
                              ) : curr?.content_id?.content[0].media_type === "pdf" ? (
                                <img
                                  src={pdfic}
                                  className="content_img"
                                  alt="Content thumbnail"
                                />
                              ) : (
                                null
                              )
                            ) : curr?.content_id?.content.length === 0 ? (
                              null
                            ) : (
                              curr?.content_id?.content.length > 1 && (
                                <div className="content_imgs_wrap contnt_lngth_wrp">
                                  <div className="content_imgs">
                                    {curr?.content_id?.content?.slice(0, 3)?.map((value) => (
                                      <>
                                        {value.media_type === "image" ? (
                                          <img
                                            src={value.watermark}
                                            className="content_img"
                                            alt="Content thumbnail"
                                          />
                                        ) : value.media_type === "audio" ? (
                                          <img src={interview} alt="Content thumbnail" className="icn m_auto" />
                                        ) : value.media_type === "video" ? (
                                          <img
                                            src={value?.watermark}
                                            className="content_img"
                                            alt="Content thumbnail"
                                          />
                                        ) : value.media_type === "doc" ? (
                                          <img
                                            src={docic}
                                            className="content_img"
                                            alt="Content thumbnail"
                                          />
                                        ) : value.media_type === "pdf" ? (
                                          <img
                                            src={docic}
                                            className="content_img"
                                            alt="Content thumbnail"
                                          />
                                        ) : null
                                        }
                                      </>
                                    ))}
                                  </div>
                                  <span className="arrow_span"><BsArrowRight /></span>
                                </div>
                              )
                            )}
                          </a>
                        </Td>



                        <Td className="item_detail address_details">{curr?.content_id?.location}</Td>
                        <Td className="remarks_wrap remarks_wrap_edit">
                          <Textarea className="desc_txtarea" value={curr?.heading} />
                          <img className="icn_edit" src={write} />
                        </Td>
                        <Td className="description_details">
                          <Text className="desc_ht">
                            {curr?.content_id?.description}
                          </Text>
                        </Td>
                        <Td className="timedate_wrap vcnote_td vc_note_cstm">
                          <div className="dir_col">
                            <p className="timedate"><img src={watch} className="icn_time" />{curr?.content_id?.audio_description_duration}mins</p>
                            <audio controls className="" style={audiowidth}>
                              <source src={process.env.REACT_APP_CONTENT + curr?.content_id?.audio_description} type="audio/mp3" />
                            </audio>
                            {/* <audio /> */}
                          </div>
                        </Td>
                        <Td className="text_center">
                          <div className="dir_col text_center">
                            {audio && audio?.length > 0 && (
                              <Tooltip label={"Audio"}>
                                <img
                                  src={interview}
                                  alt="Content thumbnail"
                                  className="icn m_auto"
                                />
                              </Tooltip>
                            )}
                            {video1 && video1?.length > 0 && (
                              <Tooltip label={"Video"}>
                                <img
                                  src={video}
                                  alt="Content thumbnail"
                                  className="icn m_auto"
                                />
                              </Tooltip>
                            )}
                            {image && image?.length > 0 && (
                              <Tooltip label={"Photo"}>
                                <img
                                  src={camera}
                                  alt="Content thumbnail"
                                  className="icn m_auto"
                                />
                              </Tooltip>
                            )}
                            {Pdf && Pdf.length > 0 && (
                              <Tooltip label={"PDF"}>
                                <img
                                  src={camera}
                                  alt="Content thumbnail"
                                  className="icn m_auto"
                                />
                              </Tooltip>
                            )}
                            {Doc && Doc.length > 0 && (
                              <Tooltip label={"Doc"}>
                                <img
                                  src={camera}
                                  alt="Content thumbnail"
                                  className="icn m_auto"
                                />
                              </Tooltip>
                            )}

                          </div>
                        </Td>
                        <Td className="text_center">
                          {curr?.content_id?.type == "shared" ? (
                            <Tooltip label={"Shared"}>
                              <img
                                src={shared}
                                alt="Content thumbnail"
                                className="icn"
                              />
                            </Tooltip>
                          ) : (
                            <Tooltip label={"Exclusive"}>
                              <img
                                src={crown}
                                alt="Content thumbnail"
                                className="icn"
                              />
                            </Tooltip>
                          )}
                        </Td>
                        <Td>
                          <Tooltip label={curr?.content_id?.categoryDetails?.name}>
                            <img
                              src={curr?.content_id?.categoryDetails?.icon}
                              alt="Content thumbnail"
                              className="icn"
                            />
                          </Tooltip>
                        </Td>
                        <Td className="text_center">
                          {audio && audio.length > 0 && audio.length}
                          <br></br>
                          {video1 && video1.length > 0 && video1.length}
                          <br></br>
                          {Pdf && Pdf.length > 0 && image.length}
                          <br></br>
                          {image && image.length > 0 && image.length}
                          <br></br>
                          {Doc && Doc.length > 0 && image.length}
                        </Td>
                        <Td>&pound; {formatAmountInMillion(curr?.content_id?.ask_price || 0)}</Td>
                        <Td>&pound; {formatAmountInMillion(curr?.content_id?.amount_paid || 0)}</Td>
                        <Td className="sale-status gr">
                          {curr?.content_id?.sale_status === "sold" ? <span className="txt_success_mdm">Sold</span> : <span className="txt_danger_mdm">Unsold</span>}
                        </Td>
                        <Td>&pound; {formatAmountInMillion(curr?.content_id?.amount_paid || 0)}</Td>
                        <Td>&pound; {formatAmountInMillion(curr?.content_id?.commition_to_payable || 0)}</Td>
                        <Td>&pound; {formatAmountInMillion(curr?.content_id?.amount_paid_to_hopper ?? "0")}</Td>
                        <Td>&pound; {formatAmountInMillion(curr?.content_id?.amount_paid_to_hopper && curr?.content_id?.amount_paid_to_hopper ? "0" : curr?.content_id?.amount_payable_to_hopper)}</Td>
                        <Td >
                          <p>{curr?.content_id?.purchased_publication?.company_bank_details?.bank_name}</p>
                          <p>{`Sort Code ${curr?.content_id?.purchased_publication?.company_bank_details?.sort_code}`}</p>
                          <p>{`Account ${curr?.content_id?.purchased_publication?.company_bank_details?.account_number}`}</p>
                        </Td>
                        <Td className="item_detail">
                          <img src={process.env.REACT_APP_HOPPER_AVATAR + curr.content_id.hopperDetails.avatar_details.avatar} alt="Content thumbnail" />
                          <Text className="nameimg">{`${curr?.content_id?.hopperDetails?.first_name} ${curr?.content_id?.hopperDetails?.last_name}`} <br />
                            <span >({curr?.content_id?.hopperDetails?.user_name})</span></Text>
                        </Td>
                        <Td className="select_wrap">
                          {curr?.mode}
                        </Td>
                        <Td className="conversation-td">
                          <div className="conversation-details">
                            <p>{curr?.remarks}                          </p>
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
