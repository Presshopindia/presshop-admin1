

// Chakra imports
import { Box, Flex, Table, Tbody, Td, Text, Th, Thead, Tr, useColorModeValue, TableContainer, Textarea, Select, Button, } from "@chakra-ui/react";
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
import { BsEye, BsArrowLeft } from "react-icons/bs";
import { useHistory, useParams } from "react-router-dom";
import exclusive from "assets/img/icons/crown.png";
import crown from "assets/img/icons/crown.png";
import ReactPaginate from "react-paginate";
import Loader from "components/Loader";
import crime from "assets/img/icons/crime.svg";
import political from "assets/img/icons/political.svg";
import business from "assets/img/icons/business.svg";
import fashion from "assets/img/icons/Fashion.svg";
import avt1 from "assets/img/avatars/avt1.png";
import avt2 from "assets/img/avatars/avt2.png";
import { Get } from "api/admin.services";
import interview from "assets/img/icons/interview.svg";
import { BsArrowRight } from "react-icons/bs";
import moment from "moment";
import { Patch } from "api/admin.services";
import { toast } from "react-toastify";
import Share from "components/share/Share";
import SortFilterPublication from "components/sortfilters/SortFilterPublication";
import docic from "assets/img/icons/contentdoc.svg";
import pdfic from "assets/img/icons/contentpdf.svg";


export default function PurchasedContentfulHistory() {
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  const [companyName, setCompanyName] = useState()
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const perPage = 5

  const [historyDetails, setHistoryDetails] = useState([])
  const { id, component } = useParams();
  const [path, setPath] = useState("")
  const [show, setShow] = useState(false)
  const [csv, setCsv] = useState("")

  // get history 
  const historyPurchasedContent = async (id, page, parametersName, parameters) => {
    const offset = (page - 1) * perPage
    setLoading(true)
    try {
      await Get(`admin/viewPurchasedContent/SummeryPublicationrHistory/viewdetails?content_id=${id}&limit=${perPage}&offset=${offset}&${parametersName}=${parameters}`).then((res) => {
        setHistoryDetails(res?.data?.data)
        setTotalPages(res?.data?.total_count / perPage)
        setCompanyName(res?.data?.data[0]?.content_id?.purchased_publication?.company_name)
        setPath(res?.data?.fullPath)
        setLoading(false)
      })
    } catch (error) {
      // console.log(error)
      setLoading(false)

    }

  }


  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected + 1);
  }



  // download csv file
  // download csv
  const DownloadCsv = async (id, page) => {
    const offset = (page - 1) * perPage;

    try {
      const response = await Get(`admin/viewPurchasedContent/SummeryPublicationrHistory/viewdetails?content_id=${id}&limit=${perPage}&offset=${offset}`)

      if (response) {
        const onboardinPrint = response?.data?.fullPath;
        window.open(onboardinPrint)

      }


    } catch (err) {
      // console.log("<---Have an error ->", err);
    }

  };

  useEffect(() => {
    historyPurchasedContent(id, currentPage)
  }, [currentPage])

  const handleClose = () => {
    setShow(!show)
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
    if (hideShow?.type === "purchasedContentFullPublicationHistory") {
      historyPurchasedContent(id, currentPage, parametersName, parameters);
      setParameters('')
      setParametersName('')
      closeSort()
    }
  };

  // for comma seprated
  const formatAmountInMillion = (amount) =>
    amount?.toLocaleString('en-US', {
      maximumFractionDigits: 0,
    });

  // back path 
  const backPath = `publication-purchased-content-detail/${historyDetails[0]?.content_id?.purchased_publication?.id}/Manage publications`

  return (
    <>
      {/* {console.log(historyDetails[0]?.content_id?.purchased_publication?.id, `<---this is a `) */}
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
          <Flex px='20px' justify='space-between' mb='10px' align='center'>
            <Text
              fontSize='22px'
              fontWeight='700'
              lineHeight='100%'
              fontFamily={"AirbnbBold"}>
              {companyName} ( Content purchased online history )
            </Text>
            <div className="opt_icons_wrap">
              <a
                onClick={() => {
                  setShow(true)
                  setCsv(path)
                }}
                className="txt_danger_mdm">
                <img src={share} className="opt_icons" />
              </a>                <span onClick={() => DownloadCsv(id, currentPage)}>
                <img src={print} className="opt_icons" />
              </span>
              <div className="fltr_btn">
                <Text fontSize={"15px"}>
                  <span onClick={() => setHideShow((prevHideShow) => ({
                    ...prevHideShow,
                    status: true,
                    type: "purchasedContentFullPublicationHistory"
                  }))}>Sort</span>
                </Text>
                {
                  hideShow.type === "purchasedContentFullPublicationHistory" &&
                  <SortFilterPublication hideShow={hideShow}
                    closeSort={closeSort}
                    sendDataToParent={collectSortParms}
                    handleApplySorting={handleApplySorting}
                  />
                }
              </div>
            </div>
          </Flex>
          <TableContainer className="">
            <Table mx="20px" variant='simple' className="common_table">
              <Thead>
                <Tr>
                  <Th>Time & date</Th>
                  <Th>Employee name</Th>
                  <Th className="cntnt_prchsd_onln_th">Content purchased online</Th>
                  <Th>Heading</Th>
                  <Th>Description</Th>
                  <Th>Voice Note</Th>
                  <Th>Type</Th>
                  <Th>License</Th>
                  <Th>Category</Th>
                  <Th>Volume</Th>
                  <Th>Published by</Th>
                  <Th>Asking price</Th>
                  <Th>Sale price</Th>
                  <Th>Sale status</Th>
                  <Th>Amount received</Th>
                  {/* <Th>Payment receiveable</Th> */}
                  <Th>Presshop commission</Th>
                  <Th>Amount paid</Th>
                  <Th>Amount Payable</Th>
                  <Th>Received from</Th>

                  {/* <Th>Payment received details</Th> */}
                  <Th>Mode</Th>
                  <Th>Remarks</Th>
                </Tr>
              </Thead>
              <Tbody>

                {historyDetails && historyDetails.map((value) => {

                  const audio = value?.content_id?.content?.filter(
                    (curr) => curr?.media_type === "audio"
                  );
                  const image = value?.content_id?.content?.filter(
                    (curr) => curr?.media_type === "image"
                  );
                  const video1 = value?.content_id?.content?.filter(
                    (curr) => curr?.media_type === "video"
                  );
                  const Pdf = value?.content_id?.content?.filter(
                    (curr) => curr?.media_type === "pdf"
                  );
                  const Doc = value?.content_id?.content?.filter(
                    (curr) => curr?.media_type === "doc"
                  );


                  return (
                    <Tr >
                      <Td className="timedate_wrap">
                        <p className="timedate">
                          <img src={watch} className="icn_time" />
                          {moment(value.createdAt).format("hh:mm A")}
                        </p>
                        <p className="timedate">
                          <img src={calendar} className="icn_time" />
                          {moment(value.createdAt).format("DD MMMM YYYY")}
                        </p>
                      </Td>
                      <Td >{value?.admin_id?.name}</Td>
                      <Td className="">
                        <a onClick={() => { history.push(`/admin/live-published-content/${value?.content_id?._id}/Content purchased online summary history`) }}>
                          {value?.content_id?.content.length === 1 ? (
                            value?.content_id?.content[0].media_type === "image" ? (
                              <img
                                src={process.env.REACT_APP_CONTENT + value?.content_id?.content[0]?.media}
                                className="content_img"
                                alt="Content thumbnail"
                              />
                            ) : value?.content_id?.content[0].media_type === "audio" ? (
                              <img
                                src={interview}
                                alt="Content thumbnail"
                                className="icn m_auto"
                              />
                            ) : value?.content_id?.content[0].media_type === "video" ? (
                              <img
                                src={process.env.REACT_APP_CONTENT + value?.content_id?.content[0]?.thumbnail}
                                className="content_img"
                                alt="Content thumbnail"
                              />
                            ) : (
                              "no content"
                            )
                          ) : value?.content_id?.content.length === 0 ? (
                            "no content"
                          ) : (
                            value?.content_id?.content.length > 1 && (
                              <div className="content_imgs_wrap contnt_lngth_wrp">
                                <div className="content_imgs">
                                  {value?.content_id?.content?.slice(0, 3)?.map((value) => (
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

                      <Td className="conversation-td">
                        <div className="conversation-details">
                          <p> {value?.content_id?.heading}</p>
                        </div>
                      </Td>
                      <Td className="conversation-td">
                        <div className="conversation-details">
                          <p className="desc_ht"> {value?.content_id?.description}</p>
                        </div>
                      </Td>
                      <Td>
                        <audio controls>
                          <source
                            src={process.env.REACT_APP_CONTENT + value?.content_id?.audio_description}
                            type="audio/mp3"
                          />
                        </audio>

                        <audio />
                      </Td>
                      <Td className="text_center">
                        <div className="dir_col text_center">
                          {audio && audio?.length > 0 && (
                            <img
                              src={interview}
                              alt="Content thumbnail"
                              className="icn m_auto"
                            />
                          )}
                          {video1 && video1?.length > 0 && (
                            <img
                              src={video}
                              alt="Content thumbnail"
                              className="icn m_auto"
                            />
                          )}
                          {image && image?.length > 0 && (
                            <img
                              src={camera}
                              alt="Content thumbnail"
                              className="icn m_auto"
                            />
                          )}
                          {Pdf && Pdf?.length > 0 && (
                            <img
                              src={pdfic}
                              alt="Content thumbnail"
                              className="icn m_auto"
                            />
                          )}
                          {Doc && Doc?.length > 0 && (
                            <img
                              src={docic}
                              alt="Content thumbnail"
                              className="icn m_auto"
                            />
                          )}
                        </div>
                      </Td>
                      <Td className="text_center">
                        {value?.content_id?.type == "shared" ? (
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
                      <Td className="text_center">
                        {value?.content_id?.category_id?.name}
                      </Td>

                      <Td className="text_center">
                        {audio && audio?.length > 0 && audio?.length}
                        {video1 && video1?.length > 0 && video1?.length}
                        {image && image?.length > 0 && image?.length}
                        {Pdf && Pdf?.length > 0 && Pdf?.length}
                        {Doc && Doc?.length > 0 && Doc?.length}
                      </Td>
                      <Td className="item_detail">
                        <img
                          src={process.env.REACT_APP_HOPPER_AVATAR + value?.content_id?.hopper_id?.avatar_id?.avatar}
                          alt="Content thumbnail"
                        />
                        <Text className="nameimg">
                          {`${value?.content_id?.hopper_id?.first_name} ${value?.content_id?.hopper_id?.last_name}`}
                          <br />
                          <span>({value?.content_id?.hopper_id?.user_name})</span>
                        </Text>
                      </Td>
                      <Td>&pound; {formatAmountInMillion(value?.content_id?.ask_price ?? 0)}</Td>
                      <Td>&pound; {formatAmountInMillion(value?.content_id?.amount_paid ?? 0)}</Td>
                      <Td className="">
                        {value?.content_id?.sale_status === "sold" ? <span className="txt_success_mdm">Sold</span> : <span className="txt_danger_mdm">unsold</span>}
                      </Td>
                      <Td>&pound; {formatAmountInMillion(value?.content_id?.amount_paid ?? 0)}</Td>
                      <Td>&pound; {formatAmountInMillion(value?.content_id?.commition_to_payable ?? 0)}</Td>
                      <Td>&pound; {formatAmountInMillion(value?.content_id?.amount_paid_to_hopper ?? 0)}</Td>
                      <Td>&pound; {formatAmountInMillion(value?.content_id?.amount_paid_to_hopper && value?.content_id?.amount_paid_to_hopper ? "0" : value?.content_id?.amount_payable_to_hopper)}</Td>
                      <Td className="contact_details">{value?.content_id?.purchased_publication?.company_bank_details?.bank_name}<br /> Sort Code - {value?.content_id?.purchased_publication?.company_bank_details?.sort_code}<br /> Account -{value?.content_id?.purchased_publication?.company_bank_details?.account_number}</Td>
                      <Td className="select_wrap">
                        <Select value={value?.mode} >
                          <option value='email'>Email</option>
                          <option value='chat'>Chat</option>
                          <option value='call'>Call</option>
                        </Select>
                      </Td>
                      <Td className="conversation-td">
                        <div className="conversation-details">
                          <p> {value?.remarks}</p>
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
            activeClassName="active"
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
