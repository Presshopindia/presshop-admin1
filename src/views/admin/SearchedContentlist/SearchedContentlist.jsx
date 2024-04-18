

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
import sports from "assets/img/icons/sports.png";
// import card1 from "assets/img/cards/card1.svg";
// import card2 from "assets/img/cards/card2.png"
// import card3 from "assets/img/cards/card3.png"
// import Cauth from "assets/img/cards/Cauth.svg";
// import crime from "assets/img/icons/crime.svg";
// import avatar from "assets/img/avatars/Avatar.png";
// import fashion from "assets/img/icons/Fashion.svg";
import videoic from "assets/img/icons/video.svg";
import { BsArrowLeft } from "react-icons/bs";
import { Get } from "api/admin.services";
import moment from "moment";
import { useHistory } from "react-router-dom";
import Loader from "components/Loader";
import "assets/css/swiper.css";
// Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
import interview from "assets/img/icons/interview.svg";
import audiowaveic from "assets/img/icons/audio-waves.svg";
import audioIcn from "assets/img/audioIcn.svg";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { Post } from "api/admin.services";

export default function SearchedContentlist() {
  const { id, component } = useParams()
  console.log(id, `<---tag id`)
  const [publishedData, setPublishedData] = useState([])
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  const GetPublishedData = async () => {
    setLoading(true)
    try {
      // const params = {
      //   search :id
      // }
      await Post(`admin/search`,{search :id}).then((res) => {
        console.log(res?.data?.resp, `response of published data`)
        setPublishedData(res?.data?.resp)
        setLoading(false)
      })


    } catch (error) {
      setLoading(false)
      console.log(error)
    }

  }

  useEffect(() => {
    GetPublishedData()

  }, [id])

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
        <div className="cstm_brand_txt">
          <Text className="brnd_txt">
            {component}
          </Text>
        </div>
        <SimpleGrid
          className="feed_list_wrp"
          columns={{ base: 1, md: 2, lg: 3, "2xl": 6 }}
          gap='25px'
          mb='20px'>
          {
            publishedData && publishedData.map((curr) => {
              const audio1 = curr?.content?.filter(curr => (curr?.media_type === "audio"))
              const image = curr?.content?.filter(curr => (curr?.media_type === "image"))
              const video1 = curr?.content?.filter(curr => (curr?.media_type === "video"))
              return (
                <div className="Cardfeed_container">
                  <div className="cardfeed_wrapper publsh_cont_itm">
                    <div className="feedImgTag ">
                      <Swiper
                        spaceBetween={50}
                        slidesPerView={1}
                        centeredSlides
                        onSlideChange={() => console.log("slide change")}
                        onSwiper={(swiper) => console.log(swiper)}
                      >
                        {curr &&
                          curr?.content?.map((curr, index) => {
                            return (
                              <SwiperSlide key={index}>
                                {curr?.media_type === "image" ? (
                                  <img
                                    src={process.env.REACT_APP_CONTENT + curr?.media}
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
                                  <div className="slide_audio_wrap myaudio">
                                    <img src={audiowaveic} alt="" className="audio_wave_ic" />
                                    <audio controls className="slider_cont">
                                      <source
                                        src={process.env.REACT_APP_CONTENT + curr?.media}
                                        type="audio/mpeg"
                                      />
                                    </audio>
                                  </div>
                                ) : null}
                              </SwiperSlide>
                            );
                          })}
                      </Swiper>

                      <div className="cont_icon_list">


                        {
                          video1 && video1?.length > 0 &&
                          <div className="feedIcons vdo feed_icn_txt">
                            <span>{video1 && video1?.length > 0 && video1?.length}</span>
                            <img src={videoic} alt="Content thumbnail" className="icn m_auto" />
                          </div>
                        }

                        {/* <div className="feedMedia_icons"> */}
                        {image && image?.length > 0 &&
                          <div className="feedIcons img feed_icn_txt">
                            <span>{image && image?.length > 0 && image?.length}</span>
                            <svg width="21" height="19" viewBox="0 0 21 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M20.25 18.6094H0.75C0.336 18.6094 0 18.2741 0 17.8594V7.35938C0 6.94537 0.336 6.60938 0.75 6.60938C1.164 6.60938 1.5 6.94537 1.5 7.35938V17.1094H19.5V5.10938H15.75C15.5505 5.10938 15.36 5.03062 15.2197 4.88962L12.4395 2.10938H8.5605L5.78025 4.88962C5.64 5.03062 5.44875 5.10938 5.25 5.10938H0.75C0.336 5.10938 0 4.77338 0 4.35938C0 3.94537 0.336 3.60938 0.75 3.60938H4.9395L7.71975 0.829125C7.86 0.688125 8.05125 0.609375 8.25 0.609375H12.75C12.9495 0.609375 13.14 0.688125 13.2803 0.829125L16.0605 3.60938H20.25C20.6647 3.60938 21 3.94537 21 4.35938V17.8594C21 18.2741 20.6647 18.6094 20.25 18.6094Z" fill="white" />
                              <path d="M10.5 15.6133C8.01825 15.6133 6 13.595 6 11.1133C6 8.63153 8.01825 6.61328 10.5 6.61328C12.9818 6.61328 15 8.63153 15 11.1133C15 13.595 12.9818 15.6133 10.5 15.6133ZM10.5 8.11328C8.8455 8.11328 7.5 9.45878 7.5 11.1133C7.5 12.7678 8.8455 14.1133 10.5 14.1133C12.1545 14.1133 13.5 12.7678 13.5 11.1133C13.5 9.45878 12.1545 8.11328 10.5 8.11328Z" fill="white" />
                            </svg>
                          </div>}

                        {audio1 && audio1?.length > 0 &&
                          <div className="feedIcons rec feed_icn_txt">
                            <span>{audio1 && audio1?.length > 0 && audio1?.length}</span>
                            <img src={interview}></img>
                          </div>}

                        {/* <div className="feedIcons">
                          <svg width="20" height="20" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M15.6001 22.9964L12.6101 21.2264C12.3001 21.0464 11.7001 21.0464 11.4001 21.2264L8.40012 22.9964C6.63012 24.0464 5.59012 23.6264 5.12012 23.2864C4.66012 22.9464 3.94012 22.0764 4.41012 20.0764L5.12012 17.0064C5.20012 16.6864 5.04012 16.1364 4.80012 15.8964L2.32012 13.4164C1.08012 12.1764 1.18012 11.1164 1.35012 10.5964C1.52012 10.0764 2.06012 9.15641 3.78012 8.86641L6.97012 8.33641C7.27012 8.28641 7.70012 7.96641 7.83012 7.69641L9.60012 4.16641C10.4001 2.55641 11.4501 2.31641 12.0001 2.31641C12.5501 2.31641 13.6001 2.55641 14.4001 4.16641L16.1601 7.68641C16.3001 7.95641 16.7301 8.27641 17.0301 8.32641L20.2201 8.85641C21.9501 9.14641 22.4901 10.0664 22.6501 10.5864C22.8101 11.1064 22.9101 12.1664 21.6801 13.4064L19.2001 15.8964C18.9601 16.1364 18.8101 16.6764 18.8801 17.0064L19.5901 20.0764C20.0501 22.0764 19.3401 22.9464 18.8801 23.2864C18.6301 23.4664 18.2301 23.6664 17.6601 23.6664C17.1301 23.6664 16.4501 23.4964 15.6001 22.9964ZM13.3701 19.9364L16.3601 21.7064C17.2301 22.2264 17.7801 22.2264 17.9901 22.0764C18.2001 21.9264 18.3501 21.3964 18.1301 20.4164L17.4201 17.3464C17.2301 16.5164 17.5401 15.4464 18.1401 14.8364L20.6201 12.3564C21.1101 11.8664 21.3301 11.3864 21.2301 11.0564C21.1201 10.7264 20.6601 10.4564 19.9801 10.3464L16.7901 9.81641C16.0201 9.68641 15.1801 9.06641 14.8301 8.36641L13.0701 4.84641C12.7501 4.20641 12.3501 3.82641 12.0001 3.82641C11.6501 3.82641 11.2501 4.20641 10.9401 4.84641L9.17012 8.36641C8.82012 9.06641 7.98012 9.68641 7.21012 9.81641L4.03012 10.3464C3.35012 10.4564 2.89012 10.7264 2.78012 11.0564C2.67012 11.3864 2.90012 11.8764 3.39012 12.3564L5.87012 14.8364C6.47012 15.4364 6.78012 16.5164 6.59012 17.3464L5.88012 20.4164C5.65012 21.4064 5.81012 21.9264 6.02012 22.0764C6.23012 22.2264 6.77012 22.2164 7.65012 21.7064L10.6401 19.9364C11.0201 19.7064 11.5101 19.5864 12.0001 19.5864C12.4901 19.5864 12.9801 19.7064 13.3701 19.9364Z" fill="white" />
                            <path opacity="0.01" fill-rule="evenodd" clip-rule="evenodd" d="M24 0.996094V24.9961H0V0.996094H24Z" fill="white" />
                            </svg>
                          </div> */}
                        {/* </div> */}
                      </div>
                    </div>
                    <a onClick={() => { history.push(`/admin/live-published-content/${curr._id}/Published Content`) }}>

                      <div className="feedcontent_wrap">
                        <div className="contentAcuthor_type">
                          <div className="author_type">
                            <img className="authImg cont_hpr" src={process.env.REACT_APP_HOPPER_AVATAR + curr?.hopper_id?.avatar_id?.avatar} alt="" />
                            <Text className="authName"
                              color="#838383"
                              fontFamily="AirbnbMedium"
                              fontSize='13px'
                              fontWeight='700'
                              lineHeight='100%'>
                              {curr?.hopper_id?.first_name}
                            </Text>
                          </div>
                          <div className="content_type">
                            <img className="contentImg" src={curr?.category_id?.icon} alt="" />
                            <Text className="type_of_content"
                              fontFamily="AirbnbBold"
                              textTransform="uppercase"
                              fontSize='12px'
                              fontWeight='700'
                              lineHeight='100%'>
                              {curr?.category_id?.name}
                            </Text>
                          </div>
                        </div>
                        <Text className="contentDesc"
                          fontFamily="AirbnbMedium"
                          fontSize='15px'
                          lineHeight='24px'
                          letterSpacing={0.3}
                          fontWeight="400"
                          marginBottom="8px">

                          {curr?.heading}
                        </Text>
                        <div className="feed_date_time">
                          <small className="feedTime">
                            <svg width="16" height="17" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path fill-rule="evenodd" clip-rule="evenodd" d="M0.9375 9.39062C0.9375 4.94313 4.5525 1.32812 9 1.32812C13.4475 1.32812 17.0625 4.94313 17.0625 9.39062C17.0625 13.8381 13.4475 17.4531 9 17.4531C4.5525 17.4531 0.9375 13.8381 0.9375 9.39062ZM2.0625 9.39062C2.0625 13.2156 5.175 16.3281 9 16.3281C12.825 16.3281 15.9375 13.2156 15.9375 9.39062C15.9375 5.56563 12.825 2.45312 9 2.45312C5.175 2.45312 2.0625 5.56563 2.0625 9.39062Z" fill="#292D32" />
                              <path d="M11.498 12.2559L9.17297 10.8684C8.59547 10.5234 8.16797 9.76594 8.16797 9.09844V6.02344C8.16797 5.71594 8.42297 5.46094 8.73047 5.46094C9.03797 5.46094 9.29297 5.71594 9.29297 6.02344V9.09844C9.29297 9.36844 9.51797 9.76594 9.75047 9.90094L12.0755 11.2884C12.3455 11.4459 12.428 11.7909 12.2705 12.0609C12.158 12.2409 11.9705 12.3384 11.783 12.3384C11.6855 12.3384 11.588 12.3159 11.498 12.2559Z" fill="#292D32" />
                            </svg> {`${moment(curr?.createdAt).format(`hh:mm A`)}  ${moment(curr?.createdAt).format(`DD MMMM YYYY`)}`}


                          </small>
                          <small className="feedlocation">
                            <svg width="18" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path fill-rule="evenodd" clip-rule="evenodd" d="M6.94531 7.72312C6.94531 6.11812 8.23589 4.82812 9.81574 4.82812C11.3956 4.82812 12.6862 6.12563 12.6862 7.73063C12.6862 9.33563 11.3956 10.6256 9.81574 10.6256C8.23589 10.6256 6.94531 9.32812 6.94531 7.72312ZM8.05788 7.73063C8.05788 8.71312 8.8441 9.50812 9.81574 9.50812C10.7874 9.50812 11.5736 8.71312 11.5736 7.73063C11.5736 6.74813 10.78 5.95312 9.81574 5.95312C8.85151 5.95312 8.05788 6.74813 8.05788 7.73063Z" fill="#424242" />
                              <path fill-rule="evenodd" clip-rule="evenodd" d="M6.75088 15.8175C4.56282 13.6875 2.14484 10.29 3.05715 6.2475C3.88045 2.58 7.04756 0.9375 9.81415 0.9375C9.81415 0.9375 9.81415 0.9375 9.82157 0.9375C12.5882 0.9375 15.7553 2.58 16.5786 6.255C17.4835 10.2975 15.0655 13.6875 12.8774 15.8175C12.017 16.65 10.9119 17.07 9.81415 17.07C8.71641 17.07 7.61126 16.65 6.75088 15.8175ZM4.14746 6.495C3.34641 10.0275 5.54188 13.0725 7.52967 15C8.81284 16.2525 10.8229 16.2525 12.106 15C14.0864 13.0725 16.2819 10.0275 15.4957 6.495C14.754 3.225 11.9725 2.0625 9.81415 2.0625C7.65577 2.0625 4.88176 3.225 4.14746 6.495Z" fill="#424242" />
                              <path opacity="0.01" fill-rule="evenodd" clip-rule="evenodd" d="M18.7152 0V18H0.914062V0H18.7152Z" fill="#424242" />
                            </svg>{curr?.location}
                          </small>
                        </div>
                      </div>
                      <div className="CardfeedFooter">
                        <div className="viewstask">
                          <a className="viewNow" onClick={() => { history.push(`/admin/live-published-content/${curr._id}/Published Content`) }}>View details</a>
                        </div>
                        <button className="cardbutton" tabIndex={0} type="button">&pound;{curr?.amount_paid ?? 0}</button>
                      </div>
                    </a>

                  </div>
                </div>
              )

            })

          }
          {/* Feed card end */}
        </SimpleGrid>
      </Box>
    </>
  );
}
