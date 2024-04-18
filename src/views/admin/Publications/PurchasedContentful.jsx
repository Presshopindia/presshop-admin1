

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
import docic from "assets/img/icons/contentdoc.svg";
import pdfic from "assets/img/icons/contentpdf.svg";

import { Link } from "react-router-dom";
import SortFilterPublication from "components/sortfilters/SortFilterPublication";


export default function PurchasedContentful() {

  const [params, setParams] = useState({ parameters: "", parametersName: "", parameters1: "", parametersName1: "" })

  const [loading, setLoading] = useState(false)
  const history = useHistory()
  const textColor = useColorModeValue("#000", "white");
  const { id, component } = useParams()
  const [summary, setSummary] = useState([])

  const [companyName, setCompanyName] = useState()
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const perPage = 5


  const [path, setPath] = useState("");
  const [csv, setCsv] = useState("")
  const [show, setShow] = useState(false)

  // get summary

  const GetSummary = async (id, page, parametersName, parameters, parametersName1, parameters1) => {
    const offset = (page - 1) * perPage
    setLoading(true)
    try {
      await Get(`admin/viewPurchasedContent/SummeryPublication/viewdetails?mediahouse_id=${id}&limit=${perPage}&offset=${offset}&${parametersName}=${parameters}&${parametersName1}=${parameters1}`).then((res) => {
        console.log(res, `<response of summary`)
        setCompanyName(res?.data?.data[0]?.purchased_publication?.company_name)
        setSummary(res?.data?.data)
        setTotalPages(res?.data?.total_count / perPage)
        setPath(res?.data?.fullPath)
        setLoading(false)
      })
    }
    catch (error) {
      setLoading(false)
    }

  }
  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected + 1);
  }


  // Create  history

  const createHistory = async (index) => {
    const remarks = summary[index].remarks;
    const mode = summary[index].mode;
    try {

      if (!remarks || /^\s*$/.test(remarks) || mode === null || mode === undefined || /^\s+/.test(mode)) {
        toast.error("Remarks and mode are required");
        return;
      }

      let obj = {
        content_id: summary[index]._id,
        mode: mode,
        latestAdminRemark: remarks

      }
      await Patch(`admin/editPurchasedPublicaation/viewDetails/History`, obj).then((res) => {

        toast.success("updated ");
        GetSummary(id, currentPage)
        setLoading(false)
      })


    } catch (error) {
      setLoading(false)
    }

  }

  // download csv
  const DownloadCsv = async (id, page) => {
    const offset = (page - 1) * perPage;

    try {
      const response = await Get(`admin/viewPurchasedContent/SummeryPublication/viewdetails?mediahouse_id=${id}&limit=${perPage}&offset=${offset}`)

      if (response) {
        const onboardinPrint = response?.data?.fullPath;
        window.open(onboardinPrint)

      }


    } catch (err) {
      console.log("<---Have an error ->", err);
    }

  };

  useEffect(() => {
    GetSummary(id, currentPage)

  }, [currentPage])

  // show hide 
  const handleClose = () => {
    setShow(!show)
  }

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


  // const collectSortParms = (name, order) => {
  //   setParameters(order)
  //   setParametersName(name)
  // }

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
    if (hideShow?.type === "purchasedContentFullPublication") {
      GetSummary(id, currentPage, parametersName, parameters, parametersName1, parameters1);
      setParams({
        parameters: "",
        parametersName: "",
        parameters1: "",
        parametersName1: ""
      })
      closeSort()
    }
  };

  // comma seprator
  const formatAmountInMillion = (amount) =>
    amount?.toLocaleString('en-US', {
      maximumFractionDigits: 2,
    });

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
              fontFamily={"AirbnbBold"}>
              {companyName} ( Content purchased online summary )
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
              <span onClick={() => DownloadCsv(id, currentPage)}>
                <img src={print} className="opt_icons" />
              </span>
              <div className="fltr_btn">
                <Text fontSize={"15px"}>
                  <span onClick={() => setHideShow((prevHideShow) => ({
                    ...prevHideShow,
                    status: true,
                    type: "purchasedContentFullPublication"
                  }))}>Sort</span>
                </Text>
                {
                  hideShow.type === "purchasedContentFullPublication" &&
                  <SortFilterPublication hideShow={hideShow}
                    closeSort={closeSort}
                    sendDataToParent={collectSortParms}
                    sendDataToParent1={collectSortParms1}
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
                  <Th className="cntnt_prchsd_onln_th">Content purchased online</Th>
                  <Th>Time & date</Th>
                  <Th>Heading</Th>
                  <Th>Description</Th>
                  <Th>Voice note</Th>
                  <Th>Type</Th>
                  <Th>License</Th>
                  <Th>Category</Th>
                  <Th>Volume</Th>
                  <Th>Published by</Th>
                  <Th>Asking Price</Th>
                  <Th>sale price</Th>
                  <Th>Sale status</Th>
                  <Th>Amount received</Th>
                  <Th>Presshop commission</Th>
                  <Th>Amount paid</Th>
                  <Th>Amount payable</Th>
                  <Th>Received from</Th>
                  {/* <Th>Payment received details</Th> */}
                  <Th>Mode</Th>
                  <Th>Remarks</Th>
                  <Th>Employee details</Th>
                  <Th>CTA</Th>
                </Tr>
              </Thead>
              <Tbody>

                {
                  summary && summary.map((value, index) => {
                    const audio = value?.content?.filter(
                      (curr) => curr?.media_type === "audio"
                    );
                    const image = value?.content?.filter(
                      (curr) => curr?.media_type === "image"
                    );

                    const video1 = value?.content?.filter(
                      (curr) => curr?.media_type === "video"
                    );

                    const Doc = value?.content?.filter(
                      (curr) => curr?.media_type === "doc"
                    );

                    const Pdf = value?.content?.filter(
                      (curr) => curr?.media_type === "pdf"
                    );

                    return (
                      <Tr key={value?._id}>
                        <Td className="">
                          <a onClick={() => history.push(`/admin/live-published-content/${value._id}/Content purchased online summary`)}>
                            {value?.content.length === 1 ? (
                              value?.content[0].media_type === "image" ? (
                                <img
                                  // src={process.env.REACT_APP_CONTENT + value?.content[0]?.media}
                                  src={value?.content[0]?.watermark}
                                  className="content_img"
                                  alt="Content thumbnail"
                                />
                              ) : value?.content[0].media_type === "audio" ? (
                                <img
                                  src={interview}
                                  alt="Content thumbnail"
                                  className="icn m_auto"
                                />
                              ) : value?.content[0].media_type === "video" ? (
                                <img
                                  // src={process.env.REACT_APP_CONTENT + value?.content[0]?.thumbnail}
                                  src={value?.content[0]?.watermark}

                                  className="content_img"
                                  alt="Content thumbnail"
                                />
                              ) : value?.content[0].media_type === "doc" ? (
                                <img
                                  // src={process.env.REACT_APP_CONTENT + value?.content[0]?.thumbnail}
                                  src={docic}

                                  className="content_img"
                                  alt="Content thumbnail"
                                />
                              ) : value?.content[0].media_type === "pdf" ? (
                                <img
                                  // src={process.env.REACT_APP_CONTENT + value?.content[0]?.thumbnail}
                                  src={pdfic}
                                  className="content_img"
                                  alt="Content thumbnail"
                                />
                              )
                                : (
                                  null
                                )
                            ) : value?.content.length === 0 ? (
                              null
                            ) : (
                              value?.content.length > 1 && (
                                <div className="content_imgs_wrap contnt_lngth_wrp">
                                  <div className="content_imgs">
                                    {value?.content.map((value) => (
                                      <>
                                        {value?.media_type === "image" ? (
                                          <img
                                            // src={process.env.REACT_APP_CONTENT + value.media}
                                            src={value?.watermark}
                                            className="content_img"
                                            alt="Content thumbnail"
                                          />
                                        ) : value?.media_type === "audio" ? (
                                          <img
                                            src={interview}
                                            alt="Content thumbnail"
                                            className="icn m_auto"
                                          />
                                        ) : value?.media_type === "video" ? (
                                          <img
                                            // src={process.env.REACT_APP_CONTENT + value.thumbnail}
                                            src={value?.watermark}
                                            className="content_img"
                                            alt="Content thumbnail"
                                          />
                                        )
                                          : null

                                        }
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
                        <Td className="description_td">
                          <p className="desc_ht">
                            {value?.heading}
                          </p>
                        </Td>
                        <Td className="description_td">
                          <p className="desc_ht">
                            {value?.description}
                          </p>
                        </Td>


                        <Td>

                          {value?.audio_descriptio &&
                            <audio controls>
                              <source src={process.env.REACT_APP_CONTENT + value?.audio_description} type="audio/mp3" />
                            </audio>}
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
                          </div>
                        </Td>
                        <Td className="text_center">
                          {value.type == "shared" ? (
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
                          {value?.category_id?.name}
                        </Td>

                        <Td className="text_center">
                          {audio && audio?.length > 0 && audio?.length}
                          {video1 && video1?.length > 0 && video1?.length}
                          {image && image?.length > 0 && image?.length}
                        </Td>

                        <Td className="item_detail">
                          <img
                            src={process.env.REACT_APP_HOPPER_AVATAR + value?.hopper_id?.avatar_id?.avatar}
                            alt="Content thumbnail"
                          />
                          <Text className="nameimg">
                            {`${value.hopper_id.first_name}  ${value.hopper_id.last_name}`}{" "}
                            <br />
                            <span>({value?.hopper_id?.user_name})</span>
                          </Text>
                        </Td>
                        <Td>&pound; {formatAmountInMillion(value?.ask_price ?? 0)}</Td>
                        <Td>&pound; {formatAmountInMillion(value?.amount_paid ?? 0)}</Td>
                        <Td className="">
                          {value?.sale_status === "sold" ? <span className="txt_success_mdm">Sold</span> : <span className="txt_danger_mdm">unsold</span>}
                        </Td>
                        <Td>&pound;{formatAmountInMillion(value?.amount_paid ?? 0)} </Td>
                        <Td>&pound;{formatAmountInMillion(value?.commition_to_payable ?? "0")}</Td>
                        <Td>&pound; {formatAmountInMillion(value?.amount_paid_to_hopper ?? 0)}</Td>
                        <Td>&pound; {formatAmountInMillion(value?.amount_paid_to_hopper && value?.amount_paid_to_hopper ? "0" : value?.amount_payable_to_hopper)}</Td>

                        <Td className="contact_details">{value?.purchased_publication?.company_bank_details?.bank_name}<br /> Sort Code - {value?.purchased_publication?.company_bank_details?.sort_code}<br /> Account -{value?.purchased_publication?.company_bank_details?.account_number}</Td>
                        <Td className="select_wrap">
                          <Select value={value?.mode}
                            onChange={(e) => {
                              value.mode = e.target.value;
                              setSummary((pre) => {
                                const updatedData = [...pre]
                                updatedData[index] = value
                                return updatedData

                              })
                            }}>0
                            <option value='email'>Email</option>
                            <option value='chat'>Chat</option>
                            <option value='call'>Call</option>
                          </Select>
                        </Td>
                        <Td className="remarks_wrap">
                          <Textarea placeholder='Enter remarks if any...'
                            value={value?.remarks}
                            onChange={(e) => {
                              value.remarks = e.target.value
                              setSummary((pre) => {
                                const updatedData = [...pre]
                                updatedData[index] = value
                                return updatedData

                              })

                            }}

                          />
                        </Td>
                        <Td className="timedate_wrap">
                          <p className="timedate">{value?.user_id?.name}</p>
                          <p className="timedate">
                            <img src={watch} className="icn_time" />
                            {moment(value?.updatedAt).format("hh:mm A")}
                          </p>
                          <p className="timedate">
                            <img src={calendar} className="icn_time" />
                            {moment(value?.updatedAt).format("DD MMMM YYYY")}
                          </p>
                          <a onClick={() => { history.push(`/admin/publication-purchased-content-detail-history/${value?._id}/Manage publications`) }} className="timedate">
                            <BsEye className="icn_time" />
                            View history
                          </a>
                        </Td>
                        <Td><Button className="theme_btn tbl_btn" onClick={() => createHistory(index)}>Save</Button></Td>
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
