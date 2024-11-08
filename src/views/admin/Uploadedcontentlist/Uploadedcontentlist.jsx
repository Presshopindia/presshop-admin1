

// Chakra imports
import {
  Box,
} from "@chakra-ui/react";
import {
  Text,
  SimpleGrid,
  // useColorModeValue,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import videoic from "assets/img/icons/video.svg";
import { BsArrowLeft } from "react-icons/bs";
import { Get } from "api/admin.services";
import moment from "moment";
import Loader from "components/Loader";
import { useHistory } from "react-router-dom";
import interview from "assets/img/icons/interview.svg";
// import audiowaveic from "assets/img/icons/audio-waves.svg";
import audiowaveic from "assets/img/icons/audimgsmall.svg";
import ReactPaginate from "react-paginate";




// Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
import { NavLink } from "react-router-dom/cjs/react-router-dom";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
export default function Uploadedcontentlist() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  const location = useLocation();
  // Extracting the contentPage from the URL query parameters
  const queryParams = new URLSearchParams(location.search);
  const contentPageUrl = queryParams.get('page');

  const [contentPage, setContentPage] = useState(contentPageUrl || 1)
  const [totalPageCount, setTotalPageCount] = useState(10)
  const perPage = 6;



  const GetContents = async (page) => {
    const offset = (page - 1) * perPage;
    setLoading(true)
    try {
      await Get(`admin/liveUploadedContent?limit=${8}&offset=${offset}`).then((res) => {
        setData(res?.data?.response)
        setTotalPageCount(Math.ceil(res?.data?.count / perPage))
        setLoading(false)
      })
      // await Get(`admin/getalluploadedcontent?limit=${6}&offset=${offset}`)
    } catch (error) {
      setLoading(false)
    }
  }
  useEffect(() => {
    GetContents(contentPage)
    updateUrl(contentPage)
  }, [contentPage])

  const updateUrl = (newContentPage) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set('page', newContentPage);
    history.push({ search: searchParams.toString() });
  };


  // for pagination
  const handlePageChangeLiveUploaded = (selectedPage) => {
    setContentPage(selectedPage.selected + 1);
  };


  return (
    <>
      {loading && <Loader />}
      <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
        <div className="back_link">
          <a onClick={() => window.history.back()}>
            <BsArrowLeft />
            <span>Back</span>
          </a>
        </div>
        <SimpleGrid
          className="feed_list_wrp"
          columns={{ base: 1, md: 2, lg: 3, xl: 4, "2xl": 4 }}
          gap='25px'
          mb='20px'>
          {

            data && data.length ? (
              data && data.map((curr) => {
                return (
                  <div className="Cardfeed_container cursor-pointer"
                    key={curr?._id}
                    onClick={() => history.push(`/admin/live-uploaded-content/${curr?._id?.hopper_id}/${curr?._id?.task_id}/Live uploaded content`)}
                  >
                    <a className="viewNow" onClick={() => history.push(`/admin/live-uploaded-content/${curr?._id?.hopper_id}/${curr?._id?.task_id}/Published Content`)}>
                      <div className="cardfeed_wrapper">
                        <div className="feedImgTag">

                          <Swiper
                            spaceBetween={50}
                            slidesPerView={1}
                            centeredSlides
                            onSlideChange={() => console.log("slide change")}

                          >
                            {
                              curr?.uploaded_content && curr?.uploaded_content?.map((curr) => {
                                return (
                                  curr?.type === "image" ?
                                    <SwiperSlide>
                                      <img src={curr?.videothubnail || process.env.REACT_APP_UPLOADED_CONTENT + curr?.imageAndVideo}
                                        alt="" className="slider_cont" /></SwiperSlide>
                                    : curr?.type === "video" ?
                                      <SwiperSlide>
                                        <video src={curr?.videothubnail || process.env.REACT_APP_UPLOADED_CONTENT + curr?.imageAndVideo} alt="" controls className="slider_cont" />
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
                          <div className="cont_icon_list">
                            {/* </a> */}
                            {curr?.videocount > 0 &&
                              <div className="feedIcons vdo feed_icn_txt">
                                <span>{curr?.videocount}</span>
                                <img src={videoic} alt="video" />
                              </div>}

                            {/* <div className="feedMedia_icons"> */}
                            {curr?.imagecount > 0 &&
                              <div className="feedIcons img feed_icn_txt">
                                <span>{curr?.imagecount}</span>
                                <svg width="21" height="19" viewBox="0 0 21 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M20.25 18.6094H0.75C0.336 18.6094 0 18.2741 0 17.8594V7.35938C0 6.94537 0.336 6.60938 0.75 6.60938C1.164 6.60938 1.5 6.94537 1.5 7.35938V17.1094H19.5V5.10938H15.75C15.5505 5.10938 15.36 5.03062 15.2197 4.88962L12.4395 2.10938H8.5605L5.78025 4.88962C5.64 5.03062 5.44875 5.10938 5.25 5.10938H0.75C0.336 5.10938 0 4.77338 0 4.35938C0 3.94537 0.336 3.60938 0.75 3.60938H4.9395L7.71975 0.829125C7.86 0.688125 8.05125 0.609375 8.25 0.609375H12.75C12.9495 0.609375 13.14 0.688125 13.2803 0.829125L16.0605 3.60938H20.25C20.6647 3.60938 21 3.94537 21 4.35938V17.8594C21 18.2741 20.6647 18.6094 20.25 18.6094Z" fill="white" />
                                  <path d="M10.5 15.6133C8.01825 15.6133 6 13.595 6 11.1133C6 8.63153 8.01825 6.61328 10.5 6.61328C12.9818 6.61328 15 8.63153 15 11.1133C15 13.595 12.9818 15.6133 10.5 15.6133ZM10.5 8.11328C8.8455 8.11328 7.5 9.45878 7.5 11.1133C7.5 12.7678 8.8455 14.1133 10.5 14.1133C12.1545 14.1133 13.5 12.7678 13.5 11.1133C13.5 9.45878 12.1545 8.11328 10.5 8.11328Z" fill="white" />
                                </svg>
                              </div>
                            }
                            {/* </div> */}

                            {curr?.interviewcount > 0 &&
                              <div className="feedIcons rec feed_icn_txt" style={{ top: "94px" }}>
                                <span>{curr?.interviewcount}</span>
                                <img src={interview} alt="video" />
                              </div>}


                          </div>

                        </div>
                        {/* <a className="viewNow" onClick={() => history.push(`/admin/live-uploaded-content/${curr?._id?.hopper_id}/${curr?._id?.task_id}/Published Content`)}> */}
                        <div className="feedcontent_wrap">
                          <div className="contentAcuthor_type">
                            <div className="author_type">
                              <img className="authImg cont_hpr" src={process.env.REACT_APP_HOPPER_AVATAR + curr?.avatar_details?.avatar} alt="" />
                              <Text className="authName"

                                color="#838383"
                                fontFamily="AirbnbMedium"
                                fontSize='13px'
                                fontWeight='700'
                                lineHeight='100%'>
                                {`${curr?.uploaded_by?.first_name} ${curr?.uploaded_by?.last_name}  (${curr?.uploaded_by?.user_name})`}
                              </Text>
                            </div>
                            <div className="content_type">
                              <img className="contentImg" src={curr?.category_details && curr?.category_details?.icon === null || curr?.category_details?.icon === "" ? "No Category" : curr?.category_details?.icon} alt="" />
                              <Text className="type_of_content"
                                fontFamily="AirbnbBold"
                                textTransform="uppercase"
                                fontSize='12px'
                                fontWeight='700'
                                lineHeight='100%'>
                                {curr?.category_details && curr?.category_details?.name === null || curr?.category_details?.name === "" ? "No Category" : curr?.category_details?.name}
                              </Text>
                            </div>
                          </div>
                          <Text className="contentDesc"
                            fontFamily="AirbnbMedium"
                            fontSize='15px'
                            lineHeight='24px'
                            letterSpacing={0.3}
                            fontWeight="400"
                            marginBottom="8px"
                          >
                            {curr?.task_id?.heading}
                          </Text>
                          <div className="feed_date_time">
                            <small className="feedTime">
                              <svg width="16" height="17" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M0.9375 9.39062C0.9375 4.94313 4.5525 1.32812 9 1.32812C13.4475 1.32812 17.0625 4.94313 17.0625 9.39062C17.0625 13.8381 13.4475 17.4531 9 17.4531C4.5525 17.4531 0.9375 13.8381 0.9375 9.39062ZM2.0625 9.39062C2.0625 13.2156 5.175 16.3281 9 16.3281C12.825 16.3281 15.9375 13.2156 15.9375 9.39062C15.9375 5.56563 12.825 2.45312 9 2.45312C5.175 2.45312 2.0625 5.56563 2.0625 9.39062Z" fill="#292D32" />
                                <path d="M11.498 12.2559L9.17297 10.8684C8.59547 10.5234 8.16797 9.76594 8.16797 9.09844V6.02344C8.16797 5.71594 8.42297 5.46094 8.73047 5.46094C9.03797 5.46094 9.29297 5.71594 9.29297 6.02344V9.09844C9.29297 9.36844 9.51797 9.76594 9.75047 9.90094L12.0755 11.2884C12.3455 11.4459 12.428 11.7909 12.2705 12.0609C12.158 12.2409 11.9705 12.3384 11.783 12.3384C11.6855 12.3384 11.588 12.3159 11.498 12.2559Z" fill="#292D32" />
                              </svg>{moment(curr?.task_id?.createdAt).format('hh:mm A')}, {moment(curr?.task_id?.createdAt).format('DD MMMM YYYY')}
                            </small>
                            <small className="feedlocation">
                              <svg width="18" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M6.94531 7.72312C6.94531 6.11812 8.23589 4.82812 9.81574 4.82812C11.3956 4.82812 12.6862 6.12563 12.6862 7.73063C12.6862 9.33563 11.3956 10.6256 9.81574 10.6256C8.23589 10.6256 6.94531 9.32812 6.94531 7.72312ZM8.05788 7.73063C8.05788 8.71312 8.8441 9.50812 9.81574 9.50812C10.7874 9.50812 11.5736 8.71312 11.5736 7.73063C11.5736 6.74813 10.78 5.95312 9.81574 5.95312C8.85151 5.95312 8.05788 6.74813 8.05788 7.73063Z" fill="#424242" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M6.75088 15.8175C4.56282 13.6875 2.14484 10.29 3.05715 6.2475C3.88045 2.58 7.04756 0.9375 9.81415 0.9375C9.81415 0.9375 9.81415 0.9375 9.82157 0.9375C12.5882 0.9375 15.7553 2.58 16.5786 6.255C17.4835 10.2975 15.0655 13.6875 12.8774 15.8175C12.017 16.65 10.9119 17.07 9.81415 17.07C8.71641 17.07 7.61126 16.65 6.75088 15.8175ZM4.14746 6.495C3.34641 10.0275 5.54188 13.0725 7.52967 15C8.81284 16.2525 10.8229 16.2525 12.106 15C14.0864 13.0725 16.2819 10.0275 15.4957 6.495C14.754 3.225 11.9725 2.0625 9.81415 2.0625C7.65577 2.0625 4.88176 3.225 4.14746 6.495Z" fill="#424242" />
                                <path opacity="0.01" fill-rule="evenodd" clip-rule="evenodd" d="M18.7152 0V18H0.914062V0H18.7152Z" fill="#424242" />
                              </svg>
                              <span>
                                {curr?.task_id?.location}
                              </span>
                            </small>
                          </div>
                        </div>
                        <div className="CardfeedFooter">
                          <div className="viewstask">
                            <a className="viewNow" onClick={() => history.push(`/admin/live-uploaded-content/${curr?._id?.hopper_id}/${curr?._id?.task_id}/Published Content`)}>View task</a></div>
                          <button className="cardbutton" tabIndex={0} type="button">&pound;{curr?.task_id?.photo_price ?? 0}</button>
                        </div>
                      </div>
                    </a>
                  </div>


                )
              })
            ) : <div >

              No Live Uploaded Content Found.
            </div>

          }
          {/* Feed card end */}
        </SimpleGrid>

        <div className="d-flex">

          <ReactPaginate
            className="paginated"
            breakLabel="..."
            nextLabel=">"

            onPageChange={handlePageChangeLiveUploaded}
            pageRangeDisplayed={5}
            pageCount={totalPageCount}
            previousLabel="<"
            renderOnZeroPageCount={null}
            forcePage={contentPage - 1}
          />
        </div>
      </Box>
    </>
  );
}
