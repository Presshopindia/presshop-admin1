// Chakra imports
import { Box } from "@chakra-ui/react";
import {
  Flex,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  TableContainer,
  Select,
  useColorModeValue,
  useDisclosure,
  Input,
  InputLeftElement,
  InputGroup,
  Textarea,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Button,
} from "@chakra-ui/react";
import editic from "assets/img/icons/edit.svg";

import Card from "components/card/Card";
import React, { useEffect, useState } from "react";
import { RiHashtag } from "react-icons/ri";
import watch from "assets/img/icons/watch.svg";
import calendar from "assets/img/icons/calendar.svg";
import camera from "assets/img/icons/camera.svg";
import liveBg from "assets/img/livePublishedcontent/lpcImg.svg";
import avatar14 from "assets/img/avatars/avatar14.svg";
import Hphone from "assets/img/icons/Hphone.svg";
import videoic from "assets/img/icons/video.svg";

import { BsArrowLeft, BsEye } from "react-icons/bs";
import phone from "assets/img/icons/phone.svg";
import chat from "assets/img/icons/chat.svg";
import mail from "assets/img/icons/mail.svg";
import logop from "assets/img/icons/logop.svg";
import avt4 from "assets/img/avatars/avatar11.png";
import avatar13 from "assets/img/avatars/avatar13.png";
import sports from "assets/img/icons/sports.png";
import crown from "assets/img/icons/crown.png";
import location from "assets/img/icons/location.svg";
import share from "assets/img/icons/share.png";
import print from "assets/img/icons/print.png";
import publication from "assets/img/profile/publication1.svg";
import { Tooltip } from "@chakra-ui/react";
import avt1 from "assets/img/avatars/avatar11.png";
import avt2 from "assets/img/avatars/avatar12.png";
import avt3 from "assets/img/avatars/avatar13.png";
import idic from "assets/img/icons/id.svg";
import invic from "assets/img/icons/invoice.svg";
import contactic from "assets/img/icons/Hphone.svg";
import video from "assets/img/icons/video.svg";
import { useParams } from "react-router-dom";
import { Get } from "api/admin.services";
import moment from "moment";
import useric from "assets/img/icons/user.svg";
import Timer from "../Timer";
import interview from "assets/img/icons/interview.svg";
import { Patch } from "api/admin.services";
import { toast } from "react-toastify";
import { Post } from "api/admin.services";
import ReactPaginate from "react-paginate";
import Loader from "components/Loader";
import Timer1 from "views/Timer1";
import Share from "components/share/Share";

// Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
import audiowaveic from "assets/img/icons/audio-waves.svg";
import ActionSort from "components/sortfilters/AcrionSort";
import { Link } from "react-router-dom";
import SwiperCore, { Pagination } from 'swiper';
SwiperCore.use([Pagination]);

export default function LiveTasks() {
  const [loading, setLoading] = useState(false)
  const { id, component } = useParams();

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const perPage = 5;

  const textColor = useColorModeValue("#000", "white");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [details, setDetails] = useState({});
  const [hopperId, setHopperId] = useState("");
  const [time, setTime] = useState();
  const [actionDetails, setActionDetails] = useState([]);
  const [path1, setpath1] = useState("")
  const [path2, setpath2] = useState("")
  const [show, setShow] = useState(false)
  const [csv, setCsv] = useState("")
  const [createAction, setCreateAction] = useState({ mode: "call", coversationWithhopper: "", Actiontaken: "", });

  // sorting
  const getLiveTaskDetails = async () => {
    try {
      const response = await Get(`admin/liveTasks?task_id=${id}`);
      setDetails(response?.data?.response);
      setpath1(response?.data.fullPath)
    } catch (error) {
      // console.log(error, "<------ Error");
    }
  };

  const editDetails = async () => {
    try {
      const obj = {
        task_description: details?.task_description,
        heading: details?.heading,
        task_id_foredit: details?._id,
        assign_more_hopper: [],
      };
      await Patch(`admin/editLivetask`, obj);
      toast.success("Updated");
    } catch (error) {
      setLoading(false)
      // Handle error
    }
  };

  const addAction = async () => {
    if (
      !createAction ||
      !createAction.mode ||
      !createAction.coversationWithhopper ||
      !createAction.Actiontaken ||
      createAction.mode.trim() === "" ||
      createAction.coversationWithhopper.trim() === "" ||
      createAction.Actiontaken.trim() === ""
    ) {
      toast.error("Required");
    } else {
      try {
        const obj = {
          task_id: details?._id,
          hopper_id: hopperId,
          mode: createAction.mode,
          coversationWithhopper: createAction.coversationWithhopper,
          Actiontaken: createAction.Actiontaken,
          type: "livetask",
        };
        await Post(`admin/addactiondetails`, obj);
        toast.success("Added");
        onClose();
        if (currentPage && actionId) {

          await getActionDetails(currentPage, actionId);
        }
      } catch (error) {
        setLoading(false)

      }
    }
  };
  const actionId = details?._id;

  const getActionDetails = async (page, id, parametersName, parameters) => {
    const offset = (page - 1) * perPage;
    setLoading(true)

    try {
      const response = await Get(`admin/getactiondetails?type=livetask&task_id=${id}&limit=${perPage}&offset=${offset}&${parametersName}=${parameters}`);
      setTime(response?.data?.response[response?.data?.response.length - 1]?.updatedAt);
      setActionDetails(response?.data?.response);
      setpath2(response?.data?.fullPath)
      setTotalPages(response?.data?.count / perPage);
      setLoading(false);
    } catch (error) {
      setLoading(false)

    }
  };

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected + 1);
  };



  useEffect(() => {

    getLiveTaskDetails(id);
  }, []);

  useEffect(async () => {
    if (currentPage && actionId) {

      await getActionDetails(currentPage, actionId);
    }
  }, [currentPage, actionId]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCreateAction((prevAction) => ({
      ...prevAction,
      [name]: value,
    }));
  };

  const downloadCsvContent = async () => {

    try {
      const response = await Get(`admin/liveTasks?task_id=${id}`);
      if (response) {
        const onboardinPrint = response?.data?.fullPath;
        window.open(onboardinPrint);
      }
    } catch (err) {
      // console.log("<---Have an error ->", err);
    }
  };

  const downloadCsvActionDetails = async (page) => {
    const offset = (page - 1) * perPage;
    try {
      const response = await Get(`admin/getactiondetails?type=livetask&limit=${perPage}&offset=${offset}`);
      if (response) {
        const onboardinPrint = response?.data?.fullPath;
        window.open(onboardinPrint);
      }
    } catch (err) {
      // console.log("<---Have an error ->", err);
    }
  };

  const handleClose = () => {
    setShow(!show)
  }

  // sorting
  const [params, setParams] = useState({
    parameters: "",
    parametersName: "",
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


  const { parametersName, parameters } = params

  const handleApplySorting = () => {
    getActionDetails(currentPage, actionId, parametersName, parameters);
    setParams({
      parameters: "",
      parametersName: "",
    })
    closeSort()
  };

  const deadline_date = details?.deadline_date;

  // get the content type

  const Audio = details?.uploaded_content?.filter((item) => item.type === "audio")
  const Video = details?.uploaded_content?.filter((item) => item.type === "video")
  const Image = details?.uploaded_content?.filter((item) => item.type === "image")

  return (
    <>
      {loading && <Loader />}
      <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
        <div className="back_link">
          <Link onClick={() => {
            window.history.back()
          }}>
            <BsArrowLeft />
            <span>Back</span>
          </Link>
        </div>
        <div className="cstm_brand_txt">
          <Text className="brnd_txt">
            {component}
          </Text>
        </div>        <Card
          direction="column"
          w="100%"
          px="0px"
          mb="24px"
          py="0px"
          overflowX={{ sm: "scroll", lg: "hidden" }}
        >
          <Flex mb="10px" align="start">
            <div className="content_img_wrap cont_type_wrap">
              {/* <img src={liveBg} alt="" /> */}
              {/* slider start */}
              <Swiper
                spaceBetween={50}
                slidesPerView={1}
                centeredSlides
                onSlideChange={() => console.log("slide change")}
                onSwiper={swiper => console.log(swiper)}
                modules={[Pagination]}
                focusableElements="pagination"
                pagination={{ clickable: true }}
              >
                {
                  details && details?.uploaded_content?.map((curr) => {
                    return (
                      curr?.type === "image" ?
                        <SwiperSlide><img src={process.env.REACT_APP_UPLOADED_CONTENT + curr?.imageAndVideo} alt="" className="slider_cont" /></SwiperSlide>
                        : curr?.type === "video" ?
                          <SwiperSlide>
                            <video src={process.env.REACT_APP_UPLOADED_CONTENT + curr?.imageAndVideo} alt="" controls className="slider_cont" />
                          </SwiperSlide>
                          : curr?.type === "audio" ?
                            <SwiperSlide>
                              <div className="slide_audio_wrap">
                                <img src={audiowaveic} className="audio_wave_ic" />
                                <audio controls className="slider_cont">
                                  <source src={process.env.REACT_APP_UPLOADED_CONTENT + curr?.imageAndVideo} type="audio/mpeg" />
                                </audio>
                              </div>
                            </SwiperSlide>
                            : ""
                    )
                  })
                }

              </Swiper>
              {/* slider end */}

              {Image && Image.length > 0 &&
                <div className="conttp">
                  <div className="cont_inner">
                    <span>{Image?.length}</span>
                    <img src={camera} alt="camera" />
                  </div>
                </div>}


              {Video && video?.length > 0 &&
                <div className="conttp contp_n vdo">
                  <div className="cont_inner">
                    <span>{Video?.length}</span>
                    <img src={videoic} alt="camera" />
                  </div>
                </div>}


              {
                Audio?.length > 0 &&
                <div className="conttp contp_n">
                  <div className="cont_inner">
                    <span>{Audio?.length}</span>
                    <img src={interview} alt="camera" />
                  </div>
                </div>}

            </div>
            <div className="content_data_info">
              <div className="heading">
                <Text
                  color={textColor}
                  fontSize="20px"
                  fontWeight="700"
                  lineHeight="100%"
                  fontFamily={"AirbnbBold"}
                >
                  Content info
                </Text>
              </div>
              <div className="info_wrapper">
                <div className="sub_content wdth_40">
                  <p>Hopper</p>
                </div>
               
                <div className="info_img_text">
                  <img
                    src={process.env.REACT_APP_HOPPER_AVATAR + details?.acceptedby?.[0]?.avatar_details[0]?.avatar}
                    className="icn_hopper_avt "
                    alt=""
                  />
                  <Text
                    color={textColor}
                    fontSize="15px"
                    lineHeight="100%"
                    fontFamily="AirbnbMedium"
                    letterSpacing={0.3}
                  >
                    {`${details?.acceptedby?.[0]?.first_name}  ${details?.acceptedby?.[0]?.last_name}`}
                  </Text>
                  {`(${details?.acceptedby?.[0]?.user_name})`}
                </div>
              </div>
              <div className="info_wrapper">
                <div className="sub_content">
                  <p>Location</p>
                </div>
                <div className="info_img_text">
                  <div className="content_information">
                    <img src={location} className="icn_time" alt="" />
                    <span className="info-text">{details?.location}</span>
                  </div>
                </div>
              </div>
              <div className="info_wrapper">
                <div className="sub_content">
                  <p>Timestamp</p>
                </div>
                <div className="info_img_text">
                  <div className="content_information timedate_wrap">
                    <div className="timedate_wrap_sub">
                      <div className="icn_time">
                        <svg
                          width="16"
                          height="17"
                          viewBox="0 0 18 19"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M0.9375 9.39062C0.9375 4.94313 4.5525 1.32812 9 1.32812C13.4475 1.32812 17.0625 4.94313 17.0625 9.39062C17.0625 13.8381 13.4475 17.4531 9 17.4531C4.5525 17.4531 0.9375 13.8381 0.9375 9.39062ZM2.0625 9.39062C2.0625 13.2156 5.175 16.3281 9 16.3281C12.825 16.3281 15.9375 13.2156 15.9375 9.39062C15.9375 5.56563 12.825 2.45312 9 2.45312C5.175 2.45312 2.0625 5.56563 2.0625 9.39062Z"
                            fill="#292D32"
                          />
                          <path
                            d="M11.498 12.2559L9.17297 10.8684C8.59547 10.5234 8.16797 9.76594 8.16797 9.09844V6.02344C8.16797 5.71594 8.42297 5.46094 8.73047 5.46094C9.03797 5.46094 9.29297 5.71594 9.29297 6.02344V9.09844C9.29297 9.36844 9.51797 9.76594 9.75047 9.90094L12.0755 11.2884C12.3455 11.4459 12.428 11.7909 12.2705 12.0609C12.158 12.2409 11.9705 12.3384 11.783 12.3384C11.6855 12.3384 11.588 12.3159 11.498 12.2559Z"
                            fill="#292D32"
                          />
                        </svg>
                      </div>
                      <span className="info-text">
                        {moment(details && details?.createdAt).format(
                          `hh:mm A`
                        )}
                      </span>
                    </div>
                    <div className="timedate_wrap_sub">
                      <div className="icn_time">
                        <svg
                          width="16"
                          height="17"
                          viewBox="0 0 261 267"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M32.8368 19.0986H42.0259V6.68129C42.0259 2.99061 45.2881 0 49.3062 0H86.1434C90.165 0 93.4237 2.99061 93.4237 6.68129V19.0986H167.576V6.68129C167.576 2.99061 170.835 0 174.857 0H211.694C215.712 0 218.974 2.99061 218.974 6.68129V19.0986H228.163C246.239 19.0986 261 32.6451 261 49.2338V236.865C261 253.454 246.239 267 228.163 267H32.8368C14.7609 267 0 253.454 0 236.865V49.2338C0 32.6451 14.7609 19.0986 32.8368 19.0986ZM56.5864 34.4969H78.8632V13.3626H56.5864V34.4969ZM182.137 34.4969H204.414V13.3626H182.137V34.4969ZM65.4697 104.93H92.9105V130.113H65.4697V104.93ZM65.4697 179.443H92.9105V204.626H65.4697V179.443ZM168.09 179.443H195.53V204.626H168.09V179.443ZM116.78 179.443H144.22V204.626H116.78V179.443ZM65.4697 142.188H92.9105V167.371H65.4697V142.188ZM168.09 142.188H195.53V167.371H168.09V142.188ZM116.78 142.188H144.22V167.371H116.78V142.188ZM168.09 104.93H195.53V130.113H168.09V104.93ZM116.78 104.93H144.22V130.113H116.78V104.93ZM40.5952 71.6424H220.405C224.423 71.6424 227.685 74.633 227.685 78.3237V231.235C227.685 234.923 224.423 237.917 220.405 237.917H40.5952C36.5771 237.917 33.3149 234.923 33.3149 231.235V78.3237C33.3149 74.633 36.5771 71.6424 40.5952 71.6424ZM213.125 85.005H47.8754V224.554H213.125V85.005ZM42.0259 32.4612H32.8368C22.8005 32.4612 14.5605 40.0232 14.5605 49.2338V236.865C14.5605 246.075 22.8005 253.637 32.8368 253.637H228.163C238.2 253.637 246.439 246.075 246.439 236.865V49.2338C246.439 40.0232 238.2 32.4612 228.163 32.4612H218.974V41.1782C218.974 44.8689 215.712 47.8595 211.694 47.8595H174.857C170.835 47.8595 167.576 44.8689 167.576 41.1782V32.4612H93.4237V41.1782C93.4237 44.8689 90.165 47.8595 86.1434 47.8595H49.3062C45.2881 47.8595 42.0259 44.8689 42.0259 41.1782V32.4612Z"
                            fill="black"
                          />
                        </svg>
                      </div>
                      <span className="info-text">
                        {moment(details && details?.createdAt).format(
                          `DD MMMM, YYYY`
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="info_wrapper">
                <div className="sub_content">
                  <p>category</p>
                </div>
                <div className="info_img_text">
                  <img
                    src={details && details?.category_details?.icon}
                    className="icn"
                    alt=""
                  />
                  <Text
                    color={textColor}
                    fontSize="13px"
                    lineHeight="100%"
                    letterSpacing={0.3}
                    fontFamily="AirbnbMedium"
                  >
                    {details && details?.category_details?.name}
                  </Text>
                </div>
              </div>
            </div>
          </Flex>

          <Flex mb="0px" direction="column" px="20px" align="start">
            <div className="blog_details w_100">
              <Textarea
                className="blog-heading w_100"
                value={details && details?.heading}
                onChange={(e) => {
                  setDetails((pre) => ({
                    ...pre,
                    heading: e.target.value,
                  }));
                }}
              />
            </div>
            <div className="blog_content cont_desc_txt w_100">
              <Textarea
                p="0"
                wordBreak="break-all"
                border="unset"
                mb="40px"
                fontSize="20px"
                lineHeight="30px"
                letterSpacing="0px"
                className="txtara blog_desc"
                value={details && details?.task_description}
                onChange={(e) => {
                  setDetails((pre) => ({
                    ...pre,
                    task_description: e.target.value,
                  }));
                }}
              />
              <img
                onClick={() => editDetails()}
                src={editic}
                alt="Edit"
                className="edit_txt_ic"
              />
            </div>
          </Flex>
        </Card>

        <Card
          direction="column"
          w="100%"
          px="0px"
          mb="24px"
          gap="10px"
          overflowX={{ sm: "scroll", lg: "hidden" }}
        >
          <Flex px="20px" justify="space-between" mb="10px" align="center">
            <Text
              color={textColor}
              fontSize="22px"
              lineHeight="100%"
              fontFamily={"AirbnbBold"}
            >
              Content & trade details
            </Text>
            <div className="opt_icons_wrap">
              <a
                onClick={() => {
                  setShow(true)
                  setCsv(path1)
                }}
                className="txt_danger_mdm"
              >
                <Tooltip label={"Share"}>
                  <img src={share} className="opt_icons" />
                </Tooltip>
              </a>
              <span onClick={downloadCsvContent}>
                <Tooltip label={"Print"}>
                  <img src={print} className="opt_icons" />
                </Tooltip>
              </span>
              {/* <Menu /> */}
            </div>
          </Flex>
          <TableContainer>
            <Table
              mx="20px"
              variant="simple"
              className="common_table lv_tsk_dtl"
            >
              <Thead>
                <Tr>
                  <Th>Task broadcasted by</Th>
                  <Th>Accepted by</Th>
                  <Th>Assign more hoppers</Th>
                  <Th className="acpt_tm_dt">Accepted time & date</Th>
                  <Th>Deadline & time left</Th>
                  <Th className="sl_prc">Volume / type</Th>
                  <Th>Total price</Th>
                  <Th>Sale status</Th>
                  <Th>Amount received</Th>
                  <Th>Presshop commission</Th>
                  <Th>Amount paid</Th>
                  <Th>Amount payable</Th>

                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td className="item_detail">
                    <img
                      src={details?.mediahouse_id?.profile_image}
                      alt="Content thumbnail"
                    />
                    <Text className="nameimg">
                      <span className="txt_mdm">
                        {details?.mediahouse_id?.company_name}
                      </span>
                    </Text>
                  </Td>
                  <Td className="avatars_wrap">
                    <div className="overlay_imgs">
                      <div className="img_row1 top_row">
                        {details.acceptedby &&
                          details.acceptedby.map((item) => {
                            return (
                              <Tooltip
                                key={item?._id}
                                label={`${item?.first_name} ${item?.last_name}`}
                                placement="top"
                              >
                                <img
                                  src={process.env.REACT_APP_HOPPER_AVATAR + item?.avatar_details[0]?.avatar}
                                  className="ovrl1"
                                  alt="Avatar"
                                />
                              </Tooltip>
                            );
                          })}
                      </div>
                    </div>
                  </Td>
                  <Td className="asign_wrap">
                    <div className="slct">
                      {details?.assignmorehopperList &&
                        details?.assignmorehopperList.map((item) => {
                          return (
                            <div
                              className="sl_itm pos_rel active"
                              key={item._id}
                            >
                              <input
                                type="checkbox"
                                id={item._id}
                                className="tsk_asign_check"
                              // onChange={() => handleRowSelect(item._id)}
                              />
                              <label
                                htmlFor={item._id}
                                className="asign_hpr_lbl"
                              >
                                <p>{`${item?.first_name} ${item?.last_name}`}</p>
                                <span className="sml_txt">
                                  {`${(item.distance * 0.00062137119).toFixed(
                                    2
                                  )} m away`}
                                </span>
                              </label>
                            </div>
                          );
                        })}
                    </div>
                  </Td>
                  <Td className="timedate_wrap">
                    {details && details.acepted_Contents && details.acepted_Contents.length > 0 && (
                      <>
                        <p className="timedate">
                          <img src={watch} className="icn_time" />
                          {moment(details.acepted_Contents[0].createdAt).format(`hh:mm A`)}
                        </p>
                        <p className="timedate">
                          <img src={calendar} className="icn_time" />
                          {moment(details.acepted_Contents[0].createdAt).format(`DD MMMM, YYYY`)}
                        </p>
                      </>
                    )}
                  </Td>

                  <Td className="timedate_wrap">
                    <p className="timedate">
                      <img src={watch} className="icn_time" />
                      {
                        moment(details?.deadline_date).format(`hh:mm:A`)}
                    </p>
                    <p className="timedate">
                      <img src={calendar} className="icn_time" />
                      {moment(details?.deadline_date).format(`DD MMMM YYYY`)}
                    </p>
                    <p className="timedate time_left danger deadln_time">
                      <img src={watch} className="icn_time" />
                      <Timer1 deadline={deadline_date} />
                    </p>
                  </Td>
                  <Td className="text_center">
                    <div className="dir_col text_center">
                      <div className="volm_type_cont">
                        <span>{details?.image_count ?? "0"}</span>
                        {details?.need_photos ? (
                          <img
                            src={camera}
                            alt="Content thumbnail"
                            className="icn"
                          />
                        ) : (
                          ""
                        )}
                      </div>

                      <div className="volm_type_cont">
                        <span>{details?.interview_count ?? "0"}</span>
                        {details?.need_interview ? (
                          <img
                            src={interview}
                            alt="Content thumbnail"
                            className="icn"
                          />
                        ) : (
                          ""
                        )}
                      </div>

                      <div className="volm_type_cont">
                        <span>{details?.video_count ?? "0"}</span>
                        {details?.need_videos ? (
                          <img
                            src={video}
                            alt="Content thumbnail"
                            className="icn"
                          />
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </Td>
                  <Td className="text_center">
                    <div className="dir_col vol_type">
                      <div className="voltype_item">
                        <span>£ {details?.total_image_price ?? "0"}</span>
                      </div>

                      <div className="voltype_item">
                        <span>£ {details?.total_interview_price ?? "0"}</span>
                      </div>

                      <div className="voltype_item">
                        <span>£ {details?.total_video_price ?? "0"}</span>
                      </div>
                    </div>
                  </Td>
                  <Td className="sale-status gr">
                    {details.sale_status === "sold" ? "sold" : "unsold"}
                  </Td>
                  <Td className="">£ {details?.total_amount_recieved ?? "0"}</Td>
                  <Td className="">£ {details?.total_presshop_commission}</Td>
                  <Td className="">£ {details?.total_amount_paid}</Td>
                  <Td className="">£ {details?.total_amount_payable}</Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </Card>

        <Card
          direction="column"
          w="100%"
          px="0px"
          mb="24px"
          gap="10px"
          overflowX={{ sm: "scroll", lg: "hidden" }}
        >
          <Flex px="20px" justify="space-between" mb="10px" align="center">
            <Text
              color={textColor}
              fontSize="22px"
              fontWeight="700"
              lineHeight="100%"
              fontFamily={"AirbnbBold"}
            >
              Action details
            </Text>
            <div className="opt_icons_wrap">
              <a
                onClick={() => {
                  setShow(true)
                  setCsv(path2)
                }}
                className="txt_danger_mdm"
              >
                <Tooltip label={"Share"}>
                  <img src={share} className="opt_icons" />
                </Tooltip>
              </a>
              <span onClick={() => downloadCsvActionDetails(currentPage)}>
                <Tooltip label={"Print"}>
                  <img src={print} className="opt_icons" />
                </Tooltip>
              </span>
              <div className="fltr_btn">
                <Text fontSize={"15px"}>
                  <span onClick={() => setHideShow((prevHideShow) => ({
                    ...prevHideShow,
                    status: true,
                    type: "actionDetails"
                  }))}>Sort</span>
                </Text>
                {
                  hideShow.type === "actionDetails" &&
                  <ActionSort hideShow={hideShow}
                    closeSort={closeSort}
                    sendDataToParent={collectSortParms}
                    handleApplySorting={handleApplySorting}
                  />
                }
              </div>
              <a onClick={onOpen} className="link_link">Add</a>
            </div>
          </Flex>
          <TableContainer>
            <Table mx="20px" variant="simple" className="common_table">
              <Thead>
                <Tr>
                  <Th>Time & date</Th>
                  <Th>Employee details</Th>
                  <Th>Office</Th>
                  <Th>Mode</Th>
                  <Th>Contact number</Th>
                  <Th>Hopper details</Th>
                  <Th>Conversation with Hopper</Th>
                  <Th>Action taken</Th>
                </Tr>
              </Thead>
              <Tbody>
                {
                  actionDetails && actionDetails.map((curr) => {
                    return (
                      <Tr>
                        <Td className="timedate_wrap">
                          <p className="timedate">
                            <img src={watch} className="icn_time" />
                            {/* 12:36 PM */}
                            {moment(curr?.updatedAt).format(`hh:mm:A`)}
                          </p>
                          <p className="timedate">
                            <img src={calendar} className="icn_time" />
                            {/* 10 Oct 2021 */}
                            {moment(curr?.updatedAt).format(`DD MMMM YYYY`)}
                          </p>
                        </Td>
                        <Td className="">
                          <img src={`https://uat-presshope.s3.eu-west-2.amazonaws.com/public/adminImages/${curr?.admin_id?.profile_image}`} alt="Content thumbnail" />
                          <Text className="nameimg"><span className="txt_medium">{curr?.admin_id?.name}</span><br />
                            <span >({curr?.admin_id?.designation_id?.name})</span></Text>
                        </Td>
                        <Td>{curr?.admin_id?.office_id?.address?.city}</Td>
                        <Td className="text_center">
                          {curr?.mode === "chat" && <Tooltip label={"Chat"}><img src={chat} alt="Content thumbnail" className="icn" /> </Tooltip>}
                          {curr?.mode === "email" && <Tooltip label={"Mail"}><img src={mail} className="icn" /> </Tooltip>}
                          {curr?.mode === "call" && <Tooltip label={"HeadPhone"}><img src={Hphone} alt="Content thumbnail" className="icn" /> </Tooltip>}
                          {!curr?.mode && "no mode"}
                        </Td>
                        <Td className="contact_details">


                          {curr?.mode === "call" &&
                            <div className="mobile detail_itm wrd_brk align_start flex_column">
                              <img src={phone} className="icn" alt="" />
                              <span>{curr?.hopper_id?.country_code}&nbsp;{curr?.hopper_id?.phone}</span>
                            </div>
                          }
                          {curr?.mode === "email" &&
                            <div className="mobile detail_itm wrd_brk align_start flex_column">
                              <img src={mail} className="icn" alt="" />
                              <span>{curr?.hopper_id?.email}</span>
                            </div>
                          }
                          {curr?.mode === "chat" &&
                            <div className="mobile detail_itm wrd_brk align_start flex_column">
                              <p className="timedate chat">
                                <img src={logop} className="icn vrtcl_mdl" alt="" /> Presshop chat</p>
                              <Link to={'/admin/chat'} className="timedate d_flex"><BsEye className="icn_time" />View</Link>
                            </div>
                          }
                        </Td>
                        <Td className="item_detail">
                          <img src={process.env.REACT_APP_HOPPER_AVATAR + curr?.hopper_id?.avatar_id?.avatar} alt="Content thumbnail" />
                          <Text className="nameimg">
                            <span className="txt_mdm"> {`${curr?.hopper_id?.first_name} ${curr?.hopper_id?.last_name}`} </span>
                            <br />
                            <span>({curr?.hopper_id?.user_name})</span>
                          </Text>
                        </Td>
                        <Td className="conversation-td">
                          <div className="conversation-details">
                            <p>
                              {curr?.coversationWithhopper}
                              <>
                                <BsEye className="icn_time" />
                              </>
                            </p>
                          </div>
                        </Td>
                        <Td className="conversation-td">
                          <div className="conversation-details">
                            <p>
                              {curr?.Actiontaken}
                              <>
                                <BsEye className="icn_time" />
                              </>
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


      <Modal
        className="action_modal_wrap"
        isOpen={isOpen}
        onClose={onClose}
        show
      >
        <ModalOverlay />
        <ModalContent className="action_modal_cont">
          <ModalBody>
            <Text fontFamily="AirbnbBold" fontSize="35px" mb="43px">
              Update action taken
            </Text>
            <div className="action_modal_body">
              <div className="dtl_wrap mdl_itms">
                <Flex
                  className="edit_inputs_wrap"
                  px="0px"
                  justify="space-between"
                  gap="20px"
                  mb="0px"
                  align="center"
                >
                  <div className="mdl_inp" flex={1}>
                    <Text mb="6px" fontSize="13px" fontFamily="AirbnbMedium">
                      Choose date
                    </Text>
                    <InputGroup>
                      <InputLeftElement pointerEvents="none">
                        <img src={calendar} className="mdl_icn" alt="" />
                      </InputLeftElement>
                      <Input className="disabled" disabled value={moment(time).format(`DD/MM/YYYY`)} />
                    </InputGroup>
                  </div>
                  <div className="mdl_inp" flex={1}>
                    <Text mb="6px" fontSize="13px" fontFamily="AirbnbMedium">
                      Time
                    </Text>
                    <InputGroup>
                      <InputLeftElement pointerEvents="none">
                        <img src={watch} className="mdl_icn" alt="" />
                      </InputLeftElement>
                      <Input className="disabled" value={moment(time).format(`hh:mm A`)} disabled />
                    </InputGroup>
                  </div>
                </Flex>
                <Flex
                  className="edit_inputs_wrap"
                  px="0px"
                  justify="space-between"
                  gap="20px"
                  mb="0px"
                  align="center"
                >
                  <div className="modal_inp_half">
                    <Text mb="6px" fontSize="13px" fontFamily="AirbnbMedium">
                      Mode
                    </Text>
                    <div className="select_wrapper">
                      <img className="location-icon" src={contactic} alt="" />
                      <Select className="icon_left_side" id="mdl_slct"
                        name="mode"
                        value={createAction.mode}
                        onChange={handleChange}
                      >
                        <option value='call'>Call</option>
                        <option value='email'>Email</option>
                        <option value='chat'>Presshop Chat</option>
                      </Select>
                    </div>
                  </div>
                  <div className="modal_inp_half">
                    <Text mb="6px" fontSize="13px" fontFamily="AirbnbMedium">
                      Select hopper
                    </Text>
                    <div className="select_wrapper">
                      <img className="location-icon" src={useric} alt="" />

                      <Select
                        className="icon_left_side"
                        id="mdl_slct"
                        value={hopperId}
                        placeholder="select hopper"
                        name="hopperId"
                        onChange={(e) => setHopperId(e.target.value)}
                      >
                        {details?.acceptedby?.map((item) => (
                          <option key={item?._id} value={item?._id}>
                            {`${item?.first_name} ${item?.last_name}`}
                          </option>
                        ))}
                      </Select>
                    </div>
                  </div>
                </Flex>
                <div className="">
                  <Text mb='6px'
                    fontSize='13px'
                    fontFamily='AirbnbMedium'
                    n

                  >
                    Enter conversation details with the Hopper
                  </Text>
                  <Textarea placeholder='Please enter details...'
                    name="coversationWithhopper"
                    value={createAction.coversationWithhopper}
                    onChange={handleChange}
                  />
                </div>
                <div className="">
                  <Text mb='6px'
                    fontSize='13px'
                    fontFamily='AirbnbMedium'
                  >
                    Enter action taken by you
                  </Text>
                  <Textarea placeholder='Please enter details...'
                    name="Actiontaken"
                    value={createAction.Actiontaken}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="save_btn_wrap">
                <Button className="btn_bg" onClick={() => {
                  addAction();
                }}>Save</Button>
              </div>
            </div>

          </ModalBody>
        </ModalContent>
      </Modal>
      <Share show={show} csv={csv} update={handleClose} />

    </>
  );
}
