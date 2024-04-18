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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Button,
  Select,
  useColorModeValue,
  useDisclosure,
  Input,
  InputLeftElement,
  InputGroup,
  Textarea,
} from "@chakra-ui/react";
import Card from "components/card/Card";
import React, { useEffect, useState, useRef } from "react";
// import { AiFillCheckCircle } from "react-icons/ai";
import { RiHashtag } from "react-icons/ri";
import watch from "assets/img/icons/watch.svg";
import calendar from "assets/img/icons/calendar.svg";
import liveBg from "assets/img/livePublishedcontent/lpcImg.svg";
import avatar14 from "assets/img/avatars/avatar14.svg";
import Hphone from "assets/img/icons/Hphone.svg";
import { Tooltip } from "@chakra-ui/react";
import { BsArrowLeft, BsCheckCircleFill, BsEye } from "react-icons/bs";
import { IoIosWarning } from "react-icons/io";
import phone from "assets/img/icons/phone.svg";
import chat from "assets/img/icons/chat.svg";
import mail from "assets/img/icons/mail.svg";
import logop from "assets/img/icons/logop.svg";
import avatar13 from "assets/img/avatars/avatar13.png";
import sports from "assets/img/icons/sports.png";
import crown from "assets/img/icons/crown.png";
import location from "assets/img/icons/location.svg";
import share from "assets/img/icons/share.png";
import print from "assets/img/icons/print.png";
import idic from "assets/img/icons/id.svg";
import invic from "assets/img/icons/invoice.svg";
import contactic from "assets/img/icons/Hphone.svg";
import camera from "assets/img/icons/camera.svg";
import video from "assets/img/icons/video.svg";
import favouriteic from "assets/img/icons/favourite.svg";
import editic from "assets/img/icons/edit.svg";
import interview from "assets/img/icons/interview.svg";
import { toast } from "react-toastify";
import ReactPaginate from "react-paginate";
// import { Navbar, Page, BlockTitle } from 'framework7-react';
import Share from "components/share/Share";
import docic from "assets/img/icons/contentdoc.svg";
import pdfic from "assets/img/icons/contentpdf.svg";
import moment from "moment";
// Import Swiper styles
// import "swiper/css";
import "assets/css/swiper.css";
import { Get, Post } from "api/admin.services";
import { useParams } from "react-router-dom";
import { useHistory  } from "react-router-dom";
import shared from "assets/img/icons/shared.svg";
import { async } from "@firebase/util";
import { Patch } from "api/admin.services";
import Loader from "components/Loader";
// import audiowaveic from "assets/img/icons/audio-waves.svg";
import audiowaveic from "assets/img/icons/audimgbg.svg";

import videoic from "assets/img/icons/video.svg";
// import audimgsml from "assets/img/icons/audimgsmall.svg";
import audimg from "assets/img/icons/audimg.svg";
import audimgbg from "assets/img/icons/audimgbg.svg";
// Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import ActionSort from "components/sortfilters/AcrionSort";
import { Link} from "react-router-dom";

export default function LivePublishdedcontent() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const perPage = 5;
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  // const navigate = useNavigate();
  const textColor = useColorModeValue("#000", "white");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { id, component , page  } = useParams();
  const [Details, setDetails] = useState([]);
  const [actionDetails, setActionDetails] = useState([]);
  const [time, setTime] = useState();
  const [path1, setpath1] = useState("");
  const [path2, setpath2] = useState("");
  const [show, setShow] = useState(false);
  const [csv, setCsv] = useState("");

  // const navigate = useNaiga
  const [createAction, setCreateAction] = useState({
    mode: "call",
    coversationWithhopper: "",
    Actiontaken: "",
  });

  const getPublishedContentDetails = async (id) => {
    setLoading(true);
    try {
      await Get(`admin/contentInfo?content_id=${id}`).then((res) => {
        setDetails(res?.data?.response[0]);
        console.log("res------------------------->", res);
        setpath1(res?.data?.fullPath);
        setLoading(false);
      });
    } catch (error) {
      setLoading(false);
    }
  };

  const hopperId = Details?.hopper_id?._id;
  const ContentId = Details?._id;

  const editPublishedContent = async () => {
    try {
      let obj = {
        content_id: id,
        hopper_id: hopperId,
        heading: Details.heading,
        description: Details.description,
      };
      await Post(`admin/updatecontentinfo`, obj);
      toast.success("Updated");
      getPublishedContentDetails(id);
    } catch (error) {
      setLoading(false);
    }
  };

  const AddAction = async () => {
    if (
      !createAction ||
      !createAction.mode ||
      !createAction.coversationWithhopper ||
      !createAction.Actiontaken ||
      createAction.mode.trim() === "" ||
      createAction.coversationWithhopper.trim() === "" ||
      createAction.Actiontaken.trim() === ""
    ) {
      toast.error("required");
    } else {
      try {
        let obj = {
          hopper_id: Details?.hopper_id?._id,
          content_id: Details?._id,
          mode: createAction.mode,
          coversationWithhopper: createAction.coversationWithhopper,
          Actiontaken: createAction.Actiontaken,
          type: "livepublished",
        };
        await Post(`admin/addactiondetails`, obj);
        toast.success("Added");
        onClose();
        if (hopperId && ContentId && currentPage) {
          await GetActionDetails(hopperId, ContentId, currentPage);
        }
        // GetActionDetails(hopperId,ContentId,currentPage);
      } catch (error) {
        // Handle error
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCreateAction((prevAction) => ({
      ...prevAction,
      [name]: value,
    }));
  };

  const GetActionDetails = async (
    hopperId,
    ContentId,
    page,
    parametersName,
    parameters
  ) => {
    const offset = (page - 1) * perPage;
    setLoading(true);
    try {
      await Get(
        `admin/getactiondetails?type=livepublished&hopper_id=${hopperId}&content_id=${ContentId}&limit=${perPage}&offset=${offset}&${parametersName}=${parameters}`
      ).then((res) => {
        setTime(res?.data?.response[res?.data?.response.length - 1]?.updatedAt);
        setpath2(res?.data?.fullPath);
        // console.log()
        setActionDetails(res?.data?.response);
        setTotalPages(res?.data?.count / perPage);
        setLoading(false);
      });
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Scroll to the top when the component mounts
    window.scrollTo(0, 0);
  }, []);

  useEffect(async () => {
    if (hopperId && ContentId && currentPage) {
      await GetActionDetails(hopperId, ContentId, currentPage);
    }
  }, [hopperId, ContentId, currentPage]);

  useEffect(async () => {
    await getPublishedContentDetails(id);
  }, [id]);

  const DownloadCsv = async (id, page) => {
    const offset = (page - 1) * perPage;
    try {
      const response = await Get(
        `admin/getactiondetails?type=livepublished&hopper_id=${id}&limit=${perPage}&offset=${offset}`
      );
      if (response) {
        const onboardinPrint = response?.data?.fullPath;
        window.open(onboardinPrint);
      }
    } catch (err) {
      console.log("<---Have an error ->", err);
    }
  };

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected + 1);
  };

  const DownloadCsvContent = async (id) => {
    try {
      const response = await Get(`admin/contentInfo?content_id=${id}`);
      if (response) {
        const onboardinPrint = response?.data?.fullPath;
        window.open(onboardinPrint);
      }
    } catch (err) {
      console.log("<---Have an error ->", err);
    }
  };

  const handleClose = () => {
    setShow(!show);
  };

  // sorting
  const [params, setParams] = useState({
    parameters: "",
    parametersName: "",
  });

  const [hideShow, setHideShow] = useState({
    status: false,
    type: "",
  });

  const closeSort = () => {
    setHideShow((prevHideShow) => ({
      ...prevHideShow,
      status: false,
      type: "",
    }));
  };

  const collectSortParms = (name, order) => {
    setParams((prev) => ({
      ...prev,
      parametersName: name,
      parameters: order,
    }));
  };

  const { parametersName, parameters } = params;

  const handleApplySorting = () => {
    GetActionDetails(
      hopperId,
      ContentId,
      currentPage,
      parametersName,
      parameters
    );
    setParams({
      parameters: "",
      parametersName: "",
    });
    closeSort();
  };

  // const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const slides = [];

  for (let i = 0; i < 5; i++) {
    slides.push(<SwiperSlide key={`slide-${i}`}>Slide {i}</SwiperSlide>);
  }

  const audio = Details?.content?.filter(
    (curr) => curr?.media_type === "audio"
  );
  const image = Details?.content?.filter(
    (curr) => curr?.media_type === "image"
  );
  const video1 = Details?.content?.filter(
    (curr) => curr?.media_type === "video"
  );

  const path =
    component === "Manage content"
      ? "content"
      : component === "Dashboard"
      ? "default"
      : component === "Published Content"
      ? "published-content-list"
      : component === "Content purchased online summary"
      ? `publication-purchased-content-detail/${Details?.purchased_publication?.id}/Manage publications`
      : component === "Content onboarding history"
      ? `content-onboarding-history/${Details?._id}/Content onboarding history/Manage content`
      : component === "Published Content Summary History"
      ? `content-published-history/${Details?._id}/Published Content Summary History/Manage content`
      : component === "Content purchased online summary history"
      ? `publication-purchased-content-detail-history/${Details?._id}/Manage publications`
      : component === "ManageHopper_published_content_summary"
      ? `published-content/${Details?.hopper_id?._id}/Manage hoppers`
      : component === "ManageHopper_published_content_summary_history"
      ? `published-content-history/${Details?._id}/Manage hoppers`
      : component === "Admin control"
      ? `admin-controls`
      : component === "Content control history"
      ? `content-onboarding-history/${Details?._id}/Content control history/Admin contorls`
      : component === "Live published content History"
      ? `content-published-history/${Details?._id}/Live published content History/Dashboard`
      : "";

  return (
    <>
      {loading && <Loader />}
      <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
        <div className="back_link">
          <a
            onClick={() => {
              // history.push(`/admin/published-content-list?page=${page || 1}`);
              window.history.back()

            }}
          >
            <BsArrowLeft />
            <span>Back</span>
          </a>
        </div>
        <div className="cstm_brand_txt">
          <Text className="brnd_txt">{Details?.is_deleted ? "Deleted Content" : Details?.published_time_date ? "Live Published Content" : "Posted Content"}</Text>
        </div>
        <Card
          direction="column"
          w="100%"
          px="0px"
          mb="24px"
          py="0px"
          overflowX={{ sm: "scroll", lg: "hidden" }}
        >
          <Flex mb="10px" align="start">
            <div className="content_img_wrap cont_type_wrap myswipe">
              <Swiper
                spaceBetween={50}
                slidesPerView={1}
                slidesPerGroupSkip={1}
                focusableElements="pagination"
                nested={true}
                pagination={{ clickable: true }}
                onSlideChange={() => console.log("slide change")}
                onSwiper={(swiper) => console.log(swiper)}
              >
                {Details &&
                  Details?.content?.map((curr, index) => {
                    return (
                      <SwiperSlide key={index}>
                        {curr?.media_type === "image" ? (
                          <img
                            src={
                              curr?.watermark ||
                              process.env.REACT_APP_CONTENT + curr?.media
                            }
                            alt=""
                            className="slider_cont"
                          />
                        ) : curr?.media_type === "video" ? (
                          <video
                            src={curr?.media}
                            alt=""
                            controls
                            className="slider_cont"
                          />
                        ) : curr?.media_type === "audio" ? (
                          <div className="slide_audio_wrap">
                            <img
                              src={audiowaveic}
                              alt=""
                              className="audio_wave_ic"
                            />
                            <audio controls className="slider_cont">
                              <source
                                src={
                                  process.env.REACT_APP_CONTENT + curr?.media
                                }
                                type="audio/mpeg"
                              />
                            </audio>
                          </div>
                        ) : curr?.media_type === "doc" ? (
                          <img src={docic} alt="" className="slider_cont" />
                        ) : curr?.media_type === "pdf" ? (
                          <embed 
                            src={`${process.env.REACT_APP_CONTENT + curr?.media}`} 
                            type="application/pdf" 
                            width="100%" 
                            height="400" 
                            cursor="pointer"
                            style={{borderRadius:"20px", cursor:"pointer"}}
                          />
                        ) : null}
                      </SwiperSlide>
                    );
                  })}
              </Swiper>

              {/* Slide End */}

              {video1 && video1?.length > 0 && (
                <div className="conttp contp_n vdo">
                  <div className="cont_inner">
                    <span>{video1?.length > 0 && video1?.length}</span>
                    <img src={videoic} alt="camera" />
                  </div>
                </div>
              )}


              {image && image?.length > 0 && (
                <div className="conttp">
                  <div className="cont_inner">
                    <span>{image && image?.length > 0 && image?.length}</span>
                    <img src={camera} alt="camera" />
                  </div>
                </div>
              )}

           
              {audio && audio?.length > 0 && (
                <div className="conttp contp_n">
                  <div className="cont_inner">
                    <span>{audio && audio?.length > 0 && audio?.length}</span>
                    <img src={interview} alt="camera" />
                  </div>
                </div>
              )}
            </div>
            <div className="content_data_info">
              <div className="heading">
                <Text
                  color={textColor}
                  fontSize="20px"
                  lineHeight="100%"
                  fontFamily={"AirbnbBold"}
                >
                  Content info
                </Text>
              </div>
              <div className="info_wrapper">
                <div className="sub_content">
                  <Text fontSize="12px" lineHeight="16px">
                    Hopper
                  </Text>
                </div>
                <div className="info_img_text">
                  <img
                    src={
                      Details?.hopper_id?.avatar_id?.avatar
                        ? process.env.REACT_APP_HOPPER_AVATAR +
                          Details?.hopper_id?.avatar_id?.avatar
                        : avatar13
                    }
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
                    {/* {Details?.hopper_id?.user_name} */}
                    {`${Details?.hopper_id?.first_name}  ${Details?.hopper_id?.last_name}  (${Details?.hopper_id?.user_name})` }
                  </Text>
                </div>
              </div>
              <div className="info_wrapper">
                <div className="sub_content">
                  <p>Location</p>
                </div>
                <div className="info_img_text">
                  <div className="content_information">
                    <img src={location} className="icn_time" alt="" />
                    <Text
                      fontSize="12px"
                      textAlign="justify"
                      className="info-text"
                    >
                      {" "}
                      {Details?.location}
                    </Text>
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
                        {Details?.published_time_date ? moment(Details?.published_time_date).format(`hh:mm A`) : moment(Details?.createdAt).format(`hh:mm A`)}
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
                        {Details?.published_time_date ? moment(Details?.published_time_date).format(`DD MMMM, YYYY`) : moment(Details?.createdAt).format(`DD MMMM, YYYY`)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="info_wrapper">
                <div className="sub_content">
                  <p>Hashtags</p>
                </div>
                <div className="info_img_text">
                  <div className="content_information hashtags">
                    {Details?.tag_ids &&
                      Details?.tag_ids.slice(0, 2).map((item) => {
                        return (
                          <div className="hashtags_sub">
                            <RiHashtag className="icn_time" />
                            <span className="info-text">{item?.name}</span>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
              <div className="info_wrapper">
                <div className="sub_content">
                  <p>category</p>
                </div>
                <div className="info_img_text">
                  <img src={sports} className="icn" alt="" />
                  <Text
                    color={textColor}
                    fontSize="13px"
                    lineHeight="100%"
                    fontFamily="AirbnbMedium"
                  >
                    {Details?.category_id?.name}
                  </Text>
                </div>
              </div>
              <div className="info_wrapper">
                <div className="sub_content">
                  <p>License</p>
                </div>
                <div className="info_img_text">
                  {Details?.type == "shared" ? (
                    <img src={shared} className="icn" alt="" />
                  ) : (
                    <img src={crown} className="icn" alt="" />
                  )}
                  <Text
                    color={textColor}
                    fontSize="13px"
                    lineHeight="100%"
                    fontFamily="AirbnbMedium"
                    textTransform="capitalize"
                  >
                    {Details?.type == "shared" ? Details?.type : Details?.type}
                  </Text>
                </div>
              </div>
            </div>
          </Flex>

          <Flex mb="0px" direction="column" px="20px" align="start">
            <div className="blog_details w_100">
              {/* <h2 className="blog-heading">{Details?.heading}</h2> */}

              <input
                className="blog-heading w_100"
                value={Details?.heading}
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
                value={Details?.description}
                onChange={(e) => {
                  setDetails((pre) => ({
                    ...pre,
                    description: e.target.value,
                  }));
                }}
              />
              <img
                onClick={() => editPublishedContent()}
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
              fontWeight="700"
              lineHeight="100%"
              fontFamily={"AirbnbBold"}
            >
              Content & trade details
            </Text>
            <div className="opt_icons_wrap">
              <a
                onClick={() => {
                  setShow(true);
                  setCsv(path1);
                }}
                className="txt_danger_mdm"
              >
                <Tooltip label={"Share"}>
                  <img src={share} className="opt_icons" />
                </Tooltip>
              </a>{" "}
              <span onClick={() => DownloadCsvContent(id)}>
              <Tooltip label={"Print"}>
                <img src={print} className="opt_icons" />
              </Tooltip>
              </span>
            </div>
          </Flex>
          <TableContainer>
            <Table
              mx="20px"
              variant="simple"
              className="common_table lv_pblsh_cnt_wrap"
            >
              <Thead>
                <Tr>
                  <Th className="sl_prc">Approval details</Th>
                  <Th className="sl_prc">Volume / type</Th>
                  <Th className="sl_prc">Asking price</Th>
                  <Th className="sl_prc">Sale price</Th>
                  <Th className="sl_stts">Sale status</Th>
                  <Th className="amt_rcvd_th">Amount received</Th>
                  <Th className="prsp_cmsn">Presshop commission</Th>
                  <Th className="pybl_to_hpr">Payable to Hopper</Th>
                  <Th className="rcv_frm">Received from</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td className="timedate_wrap">
                    <p className="timedate tick_txt">
                      {
                        Details?.published_time_date ? <span className="tick icn_time">
                          <BsCheckCircleFill />
                        </span> : <span className="tick not_posted">
                        <IoIosWarning />
                      </span>
                      }
                      {
                        Details?.published_time_date ? "Published" : "Under review"
                      }
                    </p>
                    <p className="timedate">
                      <img src={watch} className="icn_time" />
                      {Details?.published_time_date ? moment(Details?.published_time_date).format(`hh:mm A`) : moment(Details?.createdAt).format(`hh:mm A`)}
                    </p>
                    <p className="timedate">
                      <img src={calendar} className="icn_time" />
                      {Details?.published_time_date ? moment(Details?.published_time_date).format(`DD MMM YYYY`) : moment(Details?.createdAt).format(`DD MMM YYYY`)}
                    </p>
                    <a
                      onClick={() => {
                        // history.push("/admin/content");
                        history.push(`/admin/content-onboarding-history/${Details?._id}/Content onboarding history/Manage content`)
                      }}
                    >
                      <BsEye className="icn_time" />
                      View
                    </a>
                  </Td>
                  <Td className="text_center">
                    <div className="dir_col vol_type">
                      <div className="voltype_item">
                        <span>
                          {image && image?.length > 0 && image?.length}
                        </span>
                        {image && image?.length > 0 ? (
                          <Tooltip label={"Camera"}>
                            <img
                              src={camera}
                              alt="Content thumbnail"
                              className="icn"
                            />
                          </Tooltip>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="voltype_item">
                        <span>
                          {video1 && video1?.length > 0 && video1?.length}
                        </span>
                        {video1 && video1?.length > 0 ? (
                          <Tooltip label={"Video"}>
                            <img
                              src={video}
                              alt="Content thumbnail"
                              className="icn"
                            />
                          </Tooltip>
                        ) : (
                          ""
                        )}
                      </div>

                      <div className="voltype_item">
                        <span>
                          {audio && audio?.length > 0 && audio?.length}
                        </span>
                        {audio && audio?.length > 0 ? (
                          <Tooltip label={"Interview"}>
                            <img
                              src={interview}
                              alt="Content thumbnail"
                              className="icn"
                            />
                          </Tooltip>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </Td>
                  <Td>£ {Details?.ask_price}</Td>
                  <Td>£ {Details?.amount_paid}</Td>
                  <Td className="sale-status gr">
                    {Details?.sale_status === "sold" ? (
                      <span className="txt_success_mdm">Sold</span>
                    ) : (
                      <span className="txt_danger_mdm">Unsold</span>
                    )}
                  </Td>
                  <Td>
                    £ {Details?.amount_paid}{" "}
                    <p>
                      {" "}
                      <a
                        onClick={() => {
                          if(Details?.transaction_id){
                            history.push(
                              `/admin/Payment-Transaction/${Details?.transaction_id}/Payment transaction `
                            );
                          // history.push("/admin/invoicing-and-payments");
                          }else{
                            toast.error('Payment is not completed yet.')
                          }
                        }}
                        className="back_link timedate"
                      >
                        <BsEye className="icn_time" />
                        View
                      </a>
                    </p>
                  </Td>
                  <Td>£ {Details?.commition_to_payable}</Td>
                  <Td>
                    &pound;{" "}
                    {Details?.amount_paid_to_hopper &&
                    Details?.amount_paid_to_hopper
                      ? "0"
                      : Details?.amount_payable_to_hopper}
                  </Td>
                  <Td>
                    <p>
                      {Details?.purchased_publication?.company_bank_details
                        ?.bank_name ?? ""}
                    </p>
                    <p>{`Sort Code ${
                      Details?.purchased_publication?.company_bank_details
                        ?.sort_code ?? ""
                    }`}</p>
                    <p>{`Account ${
                      Details?.purchased_publication?.company_bank_details
                        ?.account_number ?? ""
                    }`}</p>
                  </Td>
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
              lineHeight="100%"
              fontFamily={"AirbnbBold"}
            >
              Action details
            </Text>
            <div className="opt_icons_wrap">
              <a
                onClick={() => {
                  setShow(true);
                  setCsv(path2);
                }}
                className="txt_danger_mdm"
              >
                <Tooltip label={"Share"}>
                  <img src={share} className="opt_icons" />
                </Tooltip>
              </a>{" "}
              <span onClick={() => DownloadCsv(hopperId, currentPage)}>
              <Tooltip label={"Print"}>
                <img src={print} className="opt_icons" />
              </Tooltip>
              </span>
              <div className="fltr_btn">
                <Text fontSize={"15px"}>
                  <span
                    onClick={() =>
                      setHideShow((prevHideShow) => ({
                        ...prevHideShow,
                        status: true,
                        type: "actionDetails",
                      }))
                    }
                  >
                    Sort
                  </span>
                </Text>
                {hideShow.type === "actionDetails" && (
                  <ActionSort
                    hideShow={hideShow}
                    closeSort={closeSort}
                    sendDataToParent={collectSortParms}
                    handleApplySorting={handleApplySorting}
                  />
                )}
              </div>
              <a onClick={onOpen} className="link_link">
                Add
              </a>
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
                  <Th>Conversation with Hopper</Th>
                  <Th>Action taken</Th>
                </Tr>
              </Thead>
              <Tbody>
                {actionDetails &&
                  actionDetails.map((curr) => {
                    return (
                      <Tr key={curr?._id}>
                        <Td className="timedate_wrap">
                          <p className="timedate">
                            <img src={watch} className="icn_time" />
                            {moment(curr?.createdAt).format(`hh:mm A`)}
                          </p>
                          <p className="timedate">
                            <img src={calendar} className="icn_time" />
                            {moment(curr?.createdAt).format(`DD MMMM YYYY`)}
                          </p>
                        </Td>
                        <Td className="">
                          <img
                            src={`https://uat-presshope.s3.eu-west-2.amazonaws.com/public/adminImages/${curr?.admin_id?.profile_image}`}
                            alt="Content thumbnail"
                          />
                          <Text className="nameimg">
                            <span className="txt_medium font_14">
                              {curr?.admin_id?.name}
                            </span>
                            <br />
                            <span className="font_14">
                              ({curr?.admin_id?.designation_id?.name})
                            </span>
                          </Text>
                        </Td>
                        <Td>{curr?.admin_id?.office_id?.address?.city}</Td>
                        <Td className="text_center">
                          {curr?.mode === "chat" && (
                            <img
                              src={chat}
                              alt="Content thumbnail"
                              className="icn"
                            />
                          )}
                          {curr?.mode === "email" && (
                            <img src={mail} className="icn" />
                          )}
                          {curr?.mode === "call" && (
                            <img
                              src={Hphone}
                              alt="Content thumbnail"
                              className="icn"
                            />
                          )}
                          {!curr?.mode && "no mode"}
                        </Td>
                        <Td className="contact_details">
                          {curr?.mode === "call" && (
                            <div className="mobile detail_itm">
                              <img src={phone} className="icn" alt="" />
                              <span>
                                {curr?.hopper_id?.country_code}&nbsp;
                                {curr?.hopper_id?.phone}
                              </span>
                            </div>
                          )}
                          {curr?.mode === "email" && (
                            <div className="mobile detail_itm">
                              <img src={mail} className="icn" alt="" />
                              <span>{curr?.hopper_id?.email}</span>
                            </div>
                          )}
                          {curr?.mode === "chat" && (
                            <div className="mobile detail_itm ">
                              <p className="timedate chat">
                                <img src={logop} className="icn" alt="" />{" "}
                                Presshop chat
                              </p>
                              <Link to={`/admin/chat`} className="timedate">
                                <BsEye className="icn_time" />
                                View
                              </Link>
                            </div>
                          )}
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
                    );
                  })}
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
                      <Input
                        className="disabled"
                        disabled
                        value={moment(time).format(`DD/MM/YYYY`)}
                      />
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
                      <Input
                        className="disabled"
                        disabled
                        value={moment(time).format(`hh:mm A`)}
                      />
                    </InputGroup>
                  </div>
                </Flex>
                <div className="modal_inp_half">
                  <Text mb="6px" fontSize="13px" fontFamily="AirbnbMedium">
                    Mode
                  </Text>
                  <div className="select_wrapper">
                    <img className="location-icon" src={contactic} alt="" />
                    <Select
                      className="icon_left_side"
                      id="mdl_slct"
                      name="mode"
                      value={createAction.mode}
                      onChange={handleChange}
                    >
                      <option value="call">Call</option>
                      <option value="email">Email</option>
                      <option value="chat">Presshop Chat</option>
                    </Select>
                  </div>
                </div>
                <div className="">
                  <Text mb="6px" fontSize="13px" fontFamily="AirbnbMedium" n>
                    Enter conversation details with the Hopper
                  </Text>
                  <Textarea
                    placeholder="Please enter details..."
                    name="coversationWithhopper"
                    value={createAction.coversationWithhopper}
                    onChange={handleChange}
                  />
                </div>
                <div className="">
                  <Text mb="6px" fontSize="13px" fontFamily="AirbnbMedium">
                    Enter action taken by you
                  </Text>
                  <Textarea
                    placeholder="Please enter details..."
                    name="Actiontaken"
                    value={createAction.Actiontaken}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="save_btn_wrap">
                <Button
                  className="btn_bg"
                  onClick={() => {
                    AddAction();
                  }}
                >
                  Save
                </Button>
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Share show={show} csv={csv} update={handleClose} />
    </>
  );
}
