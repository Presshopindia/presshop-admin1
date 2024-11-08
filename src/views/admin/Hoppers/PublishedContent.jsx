

// Chakra imports
import { Box, Flex, Table, Tbody, Td, Text, Th, Thead, Tr, useColorModeValue, TableContainer, Textarea, Select, Button, } from "@chakra-ui/react";
import Card from "components/card/Card";
import share from "assets/img/icons/share.png";
import print from "assets/img/icons/print.png";
import React, { useEffect, useState } from "react";
import publication1 from "assets/img/profile/publication1.svg";
import publication2 from "assets/img/profile/publication2.svg";
import publication3 from "assets/img/profile/publication3.svg";
// import mobile from "assets/img/icons/mobile.svg"
import crown from "assets/img/icons/crown.png";
import watch from "assets/img/icons/watch.svg";
import { Tooltip } from "@chakra-ui/react";

import calendar from "assets/img/icons/calendar.svg";
// import phone from "assets/img/icons/phone.svg";
// import mail from "assets/img/icons/mail.svg";
// import pro from "assets/img/icons/pro.png";
import celebrity from "assets/img/icons/celebrity.png";
import camera from "assets/img/icons/camera.svg";
import video from "assets/img/icons/video.svg";
import shared from "assets/img/icons/shared.svg";
import content1 from "assets/img/nfts/NftBanner1.png";
import content2 from "assets/img/nfts/Nft1.png";
import content3 from "assets/img/nfts/Nft2.png";
import idimg from "assets/img/icons/id.svg";
import interview from "assets/img/icons/interview.svg";
import { BsArrowRight } from "react-icons/bs";
import { LazyLoadImage } from 'react-lazyload';
// import video from "assets/img/icons/video.svg";
import { BsEye, BsArrowLeft } from "react-icons/bs";
import Loader from "components/Loader";
import Share from "components/share/Share";
import { useHistory, useParams } from "react-router-dom";
import { Get } from "api/admin.services";
import moment from "moment";
import { async } from "@firebase/util";
import { Post } from "api/admin.services";
import { Patch } from "api/admin.services";
import { toast } from "react-toastify";
import ReactPaginate from "react-paginate";
import SortFilterHopper from "components/sortfilters/SortFilterHopper";
export default function PublishedContent() {
  const history = useHistory()
  const textColor = useColorModeValue("#000", "white");
  const [names, setNames] = useState()
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentpage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const perPage = 5;
  const [path, setPath] = useState("");
  const [csv, setCsv] = useState("");
  const [show, setShow] = useState(false);
  const [content, setContent] = useState([])
  const { id, component } = useParams();

  // starting development

  const GetDetails = async (id, page, parametersName, parameters) => {

    const offset = (page - 1) * perPage;
    setLoading(true)
    try {
      await Get(`admin/contentpublished?hopper_id=${id}&limit=${perPage}&offset=${offset}&${parametersName}=${parameters}`).then((res) => {
        setContent(res?.data?.response)
        setNames(res?.data?.response[0])
        setPath(res?.data?.fullPath)
        setTotalPages(res?.data?.count / perPage)
        // { console.log(res?.data?.response, `<details of `) }
        setLoading(false)
      })
    } catch (error) {
      setLoading(false)
    }
  }

  // Edit details

  const EditDetails = async (index) => {
    try {
      const remarks = content[index].remarks;
      const mode = content[index].mode;

      if (!remarks || /^\s*$/.test(remarks) || mode === null || mode === undefined || /^\s+/.test(mode)) {
        toast.error("Remarks and mode are required");
        return;
      }
      let obj = {
        mode: mode,
        latestAdminRemark: remarks,
        content_id: content[index]._id,
      }
      await Patch(`admin/edithopperviewHistory`, obj);
      toast.success("Updated");
      GetDetails(id)

    } catch (error) {
      // console.log(error, `<----errors`)
      setLoading(false)
    }

  }

  useEffect(() => {
    GetDetails(id, currentPage)
  }, [currentPage])

  // page change 
  const handlePageChange = (selectedPage) => {
    setCurrentpage(selectedPage.selected + 1)
  }

  const handleClose = () => {
    setShow(!show);
  };


  // download csv
  const DownloadCsv = async (id, page) => {
    const offset = (page - 1) * perPage;
    try {

      const response = await Get(`admin/contentpublished?hopper_id=${id}&limit=${perPage}&offset=${offset}`);
      if (response) {
        const onboardinPrint = response?.data?.fullPath;
        window.open(onboardinPrint);
      }
    } catch (err) {
      // console.log("<---Have an error ->", err);
      setLoading(false);
    }
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
    if (hideShow?.type === "summaryOfPublishedContent") {
      GetDetails(id, currentPage, parametersName, parameters);
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
              {`${names?.hopper_id?.first_name} ${names?.hopper_id?.last_name} `} ({names?.hopper_id?.user_name}) Published Content Summary
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
                    type: "summaryOfPublishedContent"
                  }))}>Sort</span>
                </Text>
                {
                  hideShow.type === "summaryOfPublishedContent" &&
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
                  <Th>Published Content</Th>
                  <Th>Time & date</Th>
                  <Th>Heading</Th>
                  <Th>Description</Th>
                  <Th>Type</Th>
                  <Th>License</Th>
                  <Th>Category</Th>
                  <Th>Volume</Th>
                  <Th>Purchased by</Th>
                  <Th>Sale price</Th>
                  <Th>Sale status</Th>
                  <Th>Amount received</Th>
                  <Th>Presshop commission</Th>
                  <Th>Amount Paid</Th>
                  <Th>Amount payable</Th>
                  <Th>Paid to </Th>
                  <Th>Mode</Th>
                  <Th>Remarks</Th>
                  <Th>Employee details</Th>
                  <Th>CTA</Th>
                </Tr>
              </Thead>
              <Tbody>
                {content && content.map((value, index) => {
                  const audio = value?.content && value?.content.filter((item) => item.media_type === "audio")
                  const videos = value?.content && value?.content.filter((item) => item.media_type === "video")
                  const images = value?.content && value?.content.filter((item) => item.media_type === "image")
                  return (
                    <Tr key={value?._id}>
                      <Td className="content_img_td" >
                        <a onClick={() => { history.push(`/admin/live-published-content/${value?._id}/ManageHopper_published_content_summary`) }}>
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
                            ) : (
                              "no content"
                            )
                          ) : value?.content.length === 0 ? (
                            "no content"
                          ) : (
                            value?.content.length > 1 && (
                              <div className="content_imgs_wrap contnt_lngth_wrp">
                                <div className="content_imgs">
                                  {value?.content.map((value) => (
                                    <>
                                      {value.media_type === "image" ? (
                                        <img key={value._id}
                                          // src={process.env.REACT_APP_CONTENT + value.media}
                                          src={value?.watermark}
                                          className="content_img"
                                          alt="Content thumbnail"
                                        />
                                      ) : value.media_type === "audio" ? (
                                        <img key={value._id}
                                          src={interview}
                                          alt="Content thumbnail"
                                          className="icn m_auto"
                                        />
                                      ) : (
                                        <img key={value._id}
                                          // src={process.env.REACT_APP_CONTENT + value?.thumbnail}
                                          src={value?.watermark}
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
                      <Td className="timedate_wrap">
                        <p className="timedate"><img src={watch} className="icn_time" />{moment(value?.createdAt).format(`hh: mm A`)}</p>
                        <p className="timedate"><img src={calendar} className="icn_time" />{moment(value?.createdAt).format(`DD MMMM YYYY`)}</p>
                      </Td>
                      <Td className="description_td">
                        <Text className="desc_ht">
                          {value?.heading}
                        </Text>
                      </Td>
                      <Td className="description_td">
                        <Text className="desc_ht">
                          {value?.description}
                        </Text>
                      </Td>

                      <Td>

                        {images && images?.length > 0 && (<Tooltip label={"Photo"}>
                          <img
                            src={camera}
                            alt="Content thumbnail"
                            className="icn m_auto"
                          />
                        </Tooltip>)}

                        {audio && audio?.length > 0 && (<Tooltip label={"Interview"}>
                          <img
                            src={interview}
                            alt="Content thumbnail"
                            className="icn m_auto"
                          />
                        </Tooltip>)}
                        {videos && videos?.length > 0 && (<Tooltip label={"Video"}>
                          <img
                            src={video}
                            alt="Content thumbnail"
                            className="icn m_auto"
                          />
                        </Tooltip>)}

                      </Td>

                      <Td className="text_center">
                        {value.type == "shared" ? (
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
                      <Td className="">
                        <Tooltip label={value?.category_id?.name}>
                          <img
                            src={value?.category_id?.icon}
                            alt="Content thumbnail"
                            className="icn"
                          />
                        </Tooltip>
                      </Td>
                      <Td className="text_center">
                        {audio && audio?.length > 0 && audio?.length}
                        {videos && videos?.length > 0 && videos?.length}
                        {images && images?.length > 0 && images?.length}
                      </Td>
                      <Td
                        className="item_detail">

                        {value?.purchased_publication ? (
                          <>
                            <img src={value?.purchased_publication?.profile_image} alt="Content thumbnail" />
                            <Text className="nameimg">
                              <span className="txt_mdm">
                                {value?.purchased_publication?.company_name}
                              </span>
                            </Text>
                          </>
                        ) : (
                          <span>Not yet purchased</span>
                        )}
                      </Td>
                      <Td>
                        {/* {value?.amount_paid ? (`£${(value?.amount_paid)}`) : ("not paid yet")} */}
                        {formatAmountInMillion((value?.amount_paid ?? 0)?.toFixed(2))}

                      </Td>

                      <Td className="">
                        {
                          value?.sale_status === "sold" ? <span className="txt_success_mdm">sold</span> : <span className="txt_danger_mdm">unsold</span>

                        }
                      </Td>
                      <Td>
                        &pound; {formatAmountInMillion(value?.amount_paid ?? "0")}
                      </Td>
                      <Td>
                        &pound; {formatAmountInMillion(value?.presshop_committion ?? "0")}
                      </Td>
                      <Td className="txt_wrap">
                        &pound; {formatAmountInMillion(value?.amount_paid_to_hopper ?? "0")}
                      </Td>
                      <Td className="txt_wrap">
                        &pound; {formatAmountInMillion(value?.amount_payable_to_hopper ?? "0")}
                      </Td>

                      <Td className="contact_details">{value?.hopper_id?.bank_detail[0]?.bank_name}<br /> Sort Code - {value?.hopper_id?.bank_detail[0]?.sort_code}<br /> Account - {value?.hopper_id?.bank_detail[0]?.acc_number}</Td>
                      <Td className="select_wrap">
                        <Select value={value.mode}

                          onChange={(e) => {
                            value.mode = e.target.value;
                            setContent((pre) => {
                              const updatedData = [...pre]
                              updatedData[index] = value
                              return updatedData

                            })
                          }}
                        >
                          <option value='email'>Email</option>
                          <option value='chat'>Chat</option>
                          <option value='call'>Call</option>
                        </Select>
                      </Td>
                      <Td className="remarks_wrap">
                        <Textarea value={value?.remarks}
                          onChange={(e) => {
                            value.remarks = e.target.value;
                            setContent((pre) => {
                              const updatedData = [...pre]
                              updatedData[index] = value
                              return updatedData

                            })
                          }}

                        />
                      </Td>
                      <Td className="timedate_wrap">
                        <p className="timedate">
                          {value?.user_id?.name || "no remarks yet"}
                        </p>
                        <p className="timedate"><img src={watch} className="icn_time" />{moment(value?.updatedAt).format(`hh:mm A`)}</p>
                        <p className="timedate"><img src={calendar} className="icn_time" />{moment(value?.updatedAt).format(`DD MMM, YYYY`)}</p>
                        <a onClick={() => { history.push(`/admin/published-content-history/${value?._id}/Manage hoppers`) }} className="timedate"><BsEye className="icn_time" />View history</a>
                      </Td>
                      <Td>
                        <Button className="theme_btn" onClick={() => EditDetails(index)}>Save</Button>
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
