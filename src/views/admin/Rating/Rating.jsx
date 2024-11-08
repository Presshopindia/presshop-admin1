import {
  Box,
  Input,
  useDisclosure,
  TabPanel,
  TabPanels,
  Tab,
  TabList,
  Tabs,
} from "@chakra-ui/react";
import React, { useState, useEffect, useReducer } from "react";
import { Flex } from "@chakra-ui/react";
import Card from "components/card/Card";
import searchic from "assets/img/icons/search.svg";
import addchatic from "assets/img/icons/add-chat.svg";
import { Get } from "api/admin.services";
import moment from "moment";
import Loader from "components/Loader";
import star from "assets/img/star.png";
import FillStar from "assets/img/half_filled_star.png";
import { ratingAndReviewReducer } from "utils/reducer";
import { initStateOfRatingAndReviewReducer } from "utils/reducer";
import { hasDecimal } from "utils/commonFunction";
import ReactPaginate from "react-paginate";

const Rating = () => {
  const { onOpen } = useDisclosure();
  const [perPage, setPerPage] = useState(10);
  const [state, dispatch] = useReducer(ratingAndReviewReducer, initStateOfRatingAndReviewReducer);

  // Get Publication Data-
  const getPublication = async (page = 1, search = "") => {
    const offset = (page - 1) * perPage;
    dispatch({ type: "PublicationPending" })
    try {
      await Get(`admin/getPublicationList?limit=${perPage}&offset=${offset}&is_rated=-1&Publication_search=${search}`).then((res) => {
        getRatingAndReviewOfPub(res?.data?.data?.[0]?._id)
        dispatch({ type: "PublicationResolve", payload: res?.data?.data, total: res?.data?.totalCount / state?.publicationLimit })
      });
    } catch (error) {
      dispatch({ type: "PublicationError" })
    }
  };

  // Get Hopper Data-
  const getHopper = async (page = 1, search = "") => {
    const offset = (page - 1) * perPage;
    dispatch({ type: "HopperPending" })
    try {
      await Get(`admin/getHopperList?limit=${perPage}&offset=${offset}&is_rated=-1&Hoppers=${search}`).then((res) => {
        dispatch({ type: "HopperResolve", payload: res?.data?.response?.hopperList, total: res?.data?.response?.totalCount / state?.hopperLimit })
      });
    } catch (error) {
      dispatch({ type: "HopperError" })
    }
  };

  // Get Publication Rating And Review List-
  const getRatingAndReviewOfPub = async (id, url = "listofRatingAndReviewForPublication") => {
    dispatch({ type: "ActiveDiv", activeDivId: id })
    dispatch({ type: "R&RPending" })
    try {
      await Get(`admin/${url}?id=${id}`).then((res) => {
        dispatch({ type: "R&RResolve", payload: res?.data?.data })
      });
    } catch (error) {
      dispatch({ type: "R&RError" })
    }
  };

  useEffect(() => {
    getPublication();
    getHopper();
  }, []);

  return (
    <>
      {state?.loading && <Loader />}
      <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
        <Flex mb="0px" gap="25px">
          <Card
            className="cms_left_card chat_wrap notificationsWrap"
            direction="column"
            w="450px"
            px="0px"
            mb="0px"
            overflowX={{ sm: "scroll", lg: "hidden" }}
          >
            <div className="chat_srch">
              <Input
                placeholder="Search"
                type="text"
                onChange={(e) => {
                  state?.activeTab == 1 ?
                    getHopper(1, e.target.value)
                    :
                    getPublication(1, e.target.value)
                }}
              />
              <img src={searchic} className="srch_ic" alt="" />
              <a onClick={onOpen}>
                <img src={addchatic} className="add_chat_ic" alt="" />
              </a>
            </div>

            <div className="chat_tabs_wrap">
              <Tabs variant="unstyled" onChange={(e) => dispatch({ type: "ActiveTab", activeTab: e })} >
                <TabList>
                  <Tab
                    _selected={{ color: "white", bg: "#000" }}
                    bg="#F3F5F4"
                  >
                    <span>Publications</span>
                  </Tab>
                  <Tab
                    _selected={{ color: "white", bg: "#000" }}
                    bg="#F3F5F4"
                  >
                    <span>Hoppers</span>
                  </Tab>
                </TabList>

                <TabPanels>
                  <TabPanel className="chat_panels">
                    {
                      state?.publicationList?.map((el, i) => <div className="rating-wrapper" key={i}>
                        <div className={`rating-item ${state?.activeDivId == el?._id ? "active" : ""}`} onClick={() => {
                          dispatch({ type: "ActiveDiv", activeDivId: el?._id })
                          getRatingAndReviewOfPub(el?._id, "listofRatingAndReviewForPublication");
                        }} >
                          <div className="rating-cnt">
                            <div className="rting-img">
                              <img src={el?.profile_image} />
                            </div>
                            <div className="rting-heading">
                              <h4>{el?.company_name}</h4>
                              <p>{el?.latestrating?.review}</p>
                            </div>
                          </div>
                          <div className="rting-timedate">
                            <span>{el?.latestrating?.createdAt && moment(el?.latestrating?.createdAt)?.format("hh:mm A")}</span>
                            <span>{el?.latestrating?.createdAt && moment(el?.latestrating?.createdAt)?.format("DD MMM YYYY")}</span>
                          </div>
                        </div>
                      </div>)
                    }

                    <div>
                      <ReactPaginate
                        className="paginated"
                        breakLabel="..."
                        nextLabel=">"
                        onPageChange={(page) => getPublication(page.selected + 1)}
                        pageRangeDisplayed={1}
                        pageCount={state?.totalPublication}
                        previousLabel="<"
                        renderOnZeroPageCount={null}
                      />
                    </div>
                  </TabPanel>

                  <TabPanel className="chat_panels">
                    <div className="hopper-cnt">
                      {
                        state?.hopperList?.map((el, i) => <div className="rating-wrapper hopper-wrap" key={i}>
                          <div className={`rating-item ${state?.activeDivId == el?._id ? "active" : ""}`} onClick={() => {
                            dispatch({ type: "ActiveDiv", activeDivId: el?._id })
                            getRatingAndReviewOfPub(el?._id, "listofRatingAndReviewForhopper");
                          }} >
                            <div className="rating-cnt">
                              <div className="rting-img">
                                <img src={process.env.REACT_APP_HOPPER_AVATAR + el?.avatarData?.avatar} />
                              </div>
                              <div className="rting-heading">
                                <h4>{`${el?.first_name} ${el?.last_name}`}<span>({el?.user_name})</span></h4>
                                <div className="testi-star-rating d-flex gap-2">
                                  {
                                    el?.latestrating?.rating > 0 ?
                                      <>
                                        {Array.from({ length: Math.floor(el?.latestrating?.rating) }, (_, i) => <img src={star} alt={i} key={i} />)}
                                        {hasDecimal(el?.latestrating?.rating) && <img src={FillStar} alt="half_star" />}
                                      </>
                                      : null
                                  }
                                </div>
                              </div>
                            </div>
                            <div className="rting-timedate">
                              <span>{el?.latestrating?.createdAt && moment(el?.latestrating?.createdAt)?.format("hh:mm A")}</span>
                              <span>{el?.latestrating?.createdAt && moment(el?.latestrating?.createdAt)?.format("DD MMM YYYY")}</span>
                            </div>
                          </div>
                        </div>)
                      }
                    </div>
                    <div>
                      <ReactPaginate
                        className="paginated"
                        breakLabel="..."
                        nextLabel=">"
                        onPageChange={(page) => getHopper(page.selected + 1)}
                        pageRangeDisplayed={1}
                        pageCount={state?.totalHopper}
                        previousLabel="<"
                        renderOnZeroPageCount={null}
                      />
                    </div>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </div>
          </Card>
          <Card
            className="chat_right rating-chat notificationContent px-0"
            w="100%"
            px="0px"
            mb="0px"
            overflowX={{ sm: "scroll", lg: "hidden" }}
          >
            <div className="chating pr-2">
              <div className="rating-content">
                {
                  state?.ratingAndReviewList?.map((el, i) => {
                    const findContent = el?.content_id?.Vat?.find((el) => el?.purchased_mediahouse_id == state?.activeDivId)
                    return <Card className="list-card rcnt_act_card review-crd" key={i} >
                      <div className="dash-c-body">
                        <div className="list-in">
                          <div className="rateReview_content list-crd">
                            <img
                              className="list-card-img"
                              src={el?.content_id?.content?.[0]?.watermark}
                              alt="content"
                            />
                            <button className="rating-btn">Paid <br />
                              <strong>£{+(findContent?.amount) + (+(findContent?.Vat)) || (+(findContent?.original_Vatamount))}</strong> (inc VAT)</button>
                            <span>
                              <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g opacity="0.8">
                                  <path fill-rule="evenodd" clip-rule="evenodd" d="M0.625 6.34375C0.625 3.37875 3.035 0.96875 6 0.96875C8.965 0.96875 11.375 3.37875 11.375 6.34375C11.375 9.30875 8.965 11.7188 6 11.7188C3.035 11.7188 0.625 9.30875 0.625 6.34375ZM1.375 6.34375C1.375 8.89375 3.45 10.9688 6 10.9688C8.55 10.9688 10.625 8.89375 10.625 6.34375C10.625 3.79375 8.55 1.71875 6 1.71875C3.45 1.71875 1.375 3.79375 1.375 6.34375Z" fill="black" />
                                  <path d="M7.66531 8.25461L6.11531 7.32961C5.73031 7.09961 5.44531 6.59461 5.44531 6.14961V4.09961C5.44531 3.89461 5.61531 3.72461 5.82031 3.72461C6.02531 3.72461 6.19531 3.89461 6.19531 4.09961V6.14961C6.19531 6.32961 6.34531 6.59461 6.50031 6.68461L8.05031 7.60961C8.23031 7.71461 8.28531 7.94461 8.18031 8.12461C8.10531 8.24461 7.98031 8.30961 7.85531 8.30961C7.79031 8.30961 7.72531 8.29461 7.66531 8.25461Z" fill="black" />
                                </g>
                              </svg>
                              {moment(el?.createdAt)?.format("hh:mm A")}
                            </span>
                            <span>
                              <svg width="11" height="12" viewBox="0 0 11 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2.44434 5.29297H3.66656V6.39297H2.44434V5.29297ZM2.44434 7.49297H3.66656V8.59297H2.44434V7.49297ZM4.88878 5.29297H6.111V6.39297H4.88878V5.29297ZM4.88878 7.49297H6.111V8.59297H4.88878V7.49297ZM7.33322 5.29297H8.55545V6.39297H7.33322V5.29297ZM7.33322 7.49297H8.55545V8.59297H7.33322V7.49297Z" fill="black" />
                                <path d="M8.30556 1.44375V1.69375H8.55556H9.77778C10.3392 1.69375 10.75 2.0993 10.75 2.54375V10.2438C10.75 10.6882 10.3392 11.0938 9.77778 11.0938H1.22222C0.66081 11.0938 0.25 10.6882 0.25 10.2438V2.54375C0.25 2.0993 0.66081 1.69375 1.22222 1.69375H2.44444H2.69444V1.44375V0.59375H3.41667V1.44375V1.69375H3.66667H7.33333H7.58333V1.44375V0.59375H8.30556V1.44375ZM10.0278 3.64373L10.0278 3.39375H9.77778H1.22222H0.972222V3.64375V10.2438V10.4938H1.22222H9.77839H10.0284L10.0284 10.2437L10.0278 3.64373Z" stroke="black" stroke-width="0.5" />
                              </svg>
                              {moment(el?.createdAt)?.format("DD MMM YYYY")}
                            </span>
                          </div>
                          <div className="right-wrap rating-update ">
                            <div className="list-in-txt mt-1 w-100 p-0">
                              <div className="list-cnt">
                                <div
                                  variant="body2"
                                  className="list-car-txt mb-2"
                                >
                                  PUBLISHED CONTENT
                                </div>
                                <span className="exclusive-txt">
                                  {
                                    findContent?.purchased_content_type === "shared" ?
                                      <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M14.696 8.76839C14.5125 7.04066 13.5798 5.47348 12.1426 4.47965C11.8827 4.29618 11.8215 3.94451 11.9973 3.68459C12.1808 3.42467 12.5401 3.36351 12.7924 3.53934C14.5048 4.72429 15.6057 6.58962 15.8274 8.64607C15.858 8.95951 15.6363 9.24237 15.3152 9.28059C15.3076 9.28059 15.2846 9.28059 15.2693 9.28059C14.9788 9.28059 14.7342 9.05889 14.696 8.76839Z" fill="black" />
                                        <path d="M2.11259 9.3195C1.79916 9.28128 1.56981 8.99842 1.60039 8.68499C1.8068 6.62853 2.90001 4.77084 4.58951 3.5706C4.84944 3.38713 5.20874 3.44829 5.39222 3.70821C5.57569 3.96814 5.51454 4.32744 5.25461 4.51092C3.83268 5.51239 2.9153 7.07957 2.73947 8.8073C2.71653 9.09781 2.46426 9.3195 2.17375 9.3195C2.15082 9.3195 2.13553 9.3195 2.11259 9.3195Z" fill="black" />
                                        <path d="M5.50673 15.8101C5.22387 15.6649 5.1092 15.3208 5.25445 15.038C5.3997 14.7551 5.74372 14.6404 6.02658 14.7857C7.67785 15.619 9.66551 15.6343 11.3321 14.8316C11.6149 14.694 11.9589 14.8163 12.0966 15.0991C12.2342 15.382 12.1118 15.726 11.829 15.8636C10.8505 16.3376 9.81076 16.5746 8.72519 16.5746C7.59376 16.5746 6.51584 16.3147 5.50673 15.8101Z" fill="black" />
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M6.02637 3.04237C6.02637 1.55163 7.23425 0.34375 8.72499 0.34375C10.2157 0.34375 11.4236 1.55163 11.4236 3.04237C11.4236 4.53311 10.2081 5.74099 8.72499 5.74099C7.23425 5.74099 6.02637 4.53311 6.02637 3.04237ZM7.17309 3.05001C7.17309 3.90623 7.86877 4.60191 8.72499 4.60191C9.58121 4.60191 10.2769 3.90623 10.2769 3.05001C10.2769 2.19379 9.57356 1.49812 8.72499 1.49812C7.86877 1.49812 7.17309 2.19379 7.17309 3.05001Z" fill="black" />
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M0.5 12.392C0.5 10.9089 1.70788 9.69336 3.19862 9.69336C4.68936 9.69336 5.89724 10.9012 5.89724 12.392C5.89724 13.8751 4.68936 15.0906 3.19862 15.0906C1.70788 15.0906 0.5 13.8827 0.5 12.392ZM1.64672 12.392C1.64672 13.2482 2.3424 13.9439 3.19862 13.9439C4.05484 13.9439 4.75052 13.2482 4.75052 12.392C4.75052 11.5358 4.05484 10.8401 3.19862 10.8401C2.3424 10.8401 1.64672 11.5358 1.64672 12.392Z" fill="black" />
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M11.4629 12.392C11.4629 10.9089 12.6708 9.69336 14.1615 9.69336C15.6522 9.69336 16.8601 10.9012 16.8601 12.392C16.8525 13.8751 15.6446 15.0906 14.1615 15.0906C12.6708 15.0906 11.4629 13.8827 11.4629 12.392ZM12.6096 12.392C12.6096 13.2482 13.3053 13.9439 14.1615 13.9439C15.0177 13.9439 15.7134 13.2482 15.7134 12.392C15.7058 11.5358 15.0177 10.8401 14.1615 10.8401C13.3053 10.8401 12.6096 11.5358 12.6096 12.392Z" fill="black" />
                                      </svg> :
                                      <svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M1.396 2.17292V9.79203C1.396 11.6511 3.17356 13.1686 5.35132 13.1686H14.658C17.0591 13.1686 18.6133 11.8418 18.6133 9.79203V2.17292C18.6133 1.98224 18.5854 1.87101 18.5574 1.80745C18.483 1.83923 18.3713 1.90279 18.2131 2.03786L15.8027 4.09557C15.1884 4.61993 14.1089 4.61993 13.5039 4.09557L10.1629 1.24337C10.0698 1.16392 9.92088 1.16392 9.83712 1.24337L6.50534 4.08763C5.8911 4.61199 4.81153 4.61199 4.2066 4.08763L1.79618 2.02991C1.63797 1.89485 1.51698 1.83129 1.45184 1.79951C1.42392 1.86307 1.396 1.98224 1.396 2.17292Z" stroke="black" stroke-width="1.4" />
                                      </svg>
                                  }
                                  {findContent?.purchased_content_type === "shared" ? "Shared" : "Exclusive"}
                                </span>
                                <div className="rtng_dn d-flex justify-content-between align-items-center">
                                  <div className="rtng_strs_wrp d-flex align-items-center">
                                    <p className="mb-0 rtng_txt me-1">
                                    </p>
                                    <div class="rtng_dn d-flex justify-content-between align-items-center">
                                      <div class="rtng_strs_wrp d-flex align-items-center">
                                        <p class="mb-0 rtng_txt me-1">{el?.rating}</p>
                                        {
                                          el?.rating > 0 ?
                                            <>
                                              {Array.from({ length: Math.floor(el?.rating) }, (_, i) => <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" class="filled-star" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 0 0 .6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0 0 46.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z"></path>
                                              </svg>)}
                                            </>
                                            : null
                                        }
                                        {
                                          hasDecimal(el?.rating) && <svg width="30" height="29" viewBox="0 0 30 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g clip-path="url(#clip0_5652_68796)">
                                              <path d="M15.3008 0.200195C15.9 0.210132 15.9113 -0.286042 16.5841 -0.0415926C17.0263 0.648032 17.0263 0.648032 17.4267 1.58012C17.5357 1.82855 17.5357 1.82855 17.6469 2.082C17.8915 2.64393 18.1283 3.20879 18.3648 3.7742C18.5534 4.21713 18.7422 4.65999 18.9312 5.10277C19.4277 6.26826 19.9131 7.4377 20.3999 8.60753C23.5059 8.94332 26.612 9.27911 29.8121 9.62507C29.8121 11.6602 29.8121 11.6602 29.5175 12.1665C29.3812 12.2831 29.245 12.3996 29.1046 12.5197C28.9542 12.6534 28.8038 12.7871 28.6488 12.9248C28.4871 13.0584 28.3253 13.192 28.1586 13.3296C27.9147 13.5425 27.9147 13.5425 27.6659 13.7597C27.3438 14.04 27.0196 14.3179 26.6933 14.5933C26.1384 15.0621 25.5991 15.5475 25.0583 16.0324C24.5331 16.4924 24.038 16.8663 23.4525 17.2567C23.7728 19.5225 24.2726 21.7344 24.8066 23.9583C24.8614 24.1914 24.9163 24.4245 24.9728 24.6646C25.0479 24.9772 25.0479 24.9772 25.1245 25.2961C25.2403 25.9458 25.2868 26.5194 25.2332 27.1777C25.0653 27.3456 24.8974 27.5135 24.7244 27.6865C23.6427 27.5373 22.7474 26.9335 21.8149 26.3986C21.6359 26.2977 21.4569 26.1967 21.2725 26.0927C20.3933 25.5928 19.5274 25.0799 18.6788 24.5295C18.5313 24.4346 18.3839 24.3397 18.232 24.2419C17.8305 23.9805 17.4322 23.7141 17.0342 23.4474C16.3699 23.0641 16.3699 23.0641 15.7295 23.1075C14.7537 23.477 13.8954 23.9957 13.0068 24.5385C12.8165 24.652 12.6262 24.7656 12.4302 24.8826C11.5513 25.4075 10.6771 25.9396 9.80706 26.4791C9.54079 26.6415 9.27452 26.8038 9.00018 26.971C8.76768 27.1163 8.53519 27.2616 8.29565 27.4112C7.68055 27.6865 7.68055 27.6865 7.0893 27.604C6.94863 27.5473 6.80795 27.4905 6.66301 27.4321C6.28559 26.4317 6.52949 25.6526 6.77331 24.6348C6.81319 24.4643 6.85308 24.2937 6.89417 24.1179C7.02162 23.5739 7.1521 23.0307 7.28307 22.4875C7.41282 21.9451 7.54187 21.4026 7.66925 20.8597C7.78515 20.3663 7.90343 19.8735 8.02182 19.3807C8.169 18.632 8.27057 18.0136 8.18932 17.2567C7.7493 16.7498 7.34481 16.3497 6.8379 15.9211C6.70099 15.8006 6.56409 15.6801 6.42303 15.5559C5.28802 14.5644 4.12156 13.6093 2.94261 12.6707C1.76368 11.6915 1.76368 11.6915 1.3209 11.1514C1.29407 10.4827 1.29407 10.4827 1.3209 9.87946C3.10733 9.48372 4.87248 9.23868 6.69481 9.0845C6.9332 9.06253 7.1716 9.04056 7.41722 9.01793C8.78289 8.89759 10.1255 8.83934 11.4963 8.86192C11.5231 8.68886 11.5498 8.5158 11.5773 8.33749C11.7842 7.44577 12.1228 6.63966 12.49 5.80531C12.5625 5.63832 12.6349 5.47133 12.7096 5.29929C12.8621 4.94841 13.0152 4.5978 13.1689 4.24744C13.4048 3.70939 13.6387 3.1705 13.8723 2.63145C14.0209 2.29023 14.1696 1.94906 14.3184 1.60794C14.3887 1.44631 14.4589 1.28468 14.5312 1.11816C15.0282 -0.012043 15.0168 0.484131 15.3008 0.200195Z" fill="#FFDB63" />
                                              <path d="M15.3008 0.200359C16.1609 0.528581 16.6294 0.580781 16.9981 1.39928C17.0712 1.57455 17.1443 1.74982 17.2196 1.93041C17.3352 2.18889 17.3352 2.18889 17.4532 2.4526C18.1801 4.1051 18.1801 4.1051 18.3008 4.90355C17.8079 5.44412 17.8079 5.44412 17.4472 5.77502C12.6831 10.3354 10.0436 17.6194 9.69936 24.0779C9.69699 24.3032 9.69461 24.5285 9.69216 24.7606C9.62143 26.2987 9.96154 25.5294 9.30078 26.2005C7.99717 27.0792 8.17082 27.3488 7.30078 27.2005C7.0818 27.1231 6.56805 27.6229 6.34465 27.5439C5.96723 26.5436 6.21113 25.7644 6.45495 24.7466C6.49483 24.5761 6.53472 24.4055 6.57581 24.2297C6.70326 23.6857 6.83374 23.1425 6.96472 22.5993C7.09446 22.0569 7.22351 21.5144 7.35089 20.9715C7.46679 20.4782 7.58507 19.9853 7.70346 19.4925C7.85064 18.7438 7.78471 18.4572 7.70346 17.7003C7.26345 17.1935 6.8077 16.6289 6.30079 16.2003C6.16388 16.0798 5.94184 15.8245 5.80079 15.7003C4.66578 14.7088 3.8032 13.7211 2.62425 12.7826C1.44532 11.8033 1.44532 11.8033 1.00254 11.2632C0.975714 10.5945 0.975714 10.5945 1.00254 9.99127C2.78897 9.59552 4.55412 9.35049 6.37645 9.19631C6.61484 9.17434 6.85324 9.15237 7.09886 9.12973C8.46453 9.0094 9.42998 8.67793 10.8008 8.70051C10.8275 8.52745 10.7732 8.37881 10.8008 8.20051C11.0076 7.30878 11.8045 6.75146 12.1717 5.91711C12.2441 5.75013 12.3166 5.58314 12.3912 5.41109C12.5437 5.06022 12.6968 4.70961 12.8505 4.35925C13.0864 3.8212 13.3203 3.28231 13.5539 2.74325C13.7025 2.40203 13.8512 2.06086 14.0001 1.71975C14.0703 1.55812 14.1405 1.39649 14.2129 1.22996C14.8341 -0.182835 14.5489 0.206667 15.3008 0.200359Z" fill="#FFC850" />
                                            </g>
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M15.0484 23.4965L8.33601 27.0864C6.84698 27.8828 5.87112 27.1569 6.1548 25.4743L7.43677 17.8706L2.00629 12.4857C0.801644 11.2911 1.17874 10.1227 2.83943 9.87717L10.3442 8.76781L13.7004 1.84976C14.4449 0.315126 15.6538 0.318889 16.3965 1.84976L19.7527 8.76781L27.2575 9.87717C28.9222 10.1233 29.2923 11.2941 28.0906 12.4857L22.6601 17.8706L23.9421 25.4743C24.2265 27.161 23.2463 27.8808 21.7609 27.0864L15.0484 23.4965Z" stroke="#FFDC64" stroke-width="1.27803" stroke-linecap="round" stroke-linejoin="round" />
                                            <defs>
                                              <clipPath id="clip0_5652_68796">
                                                <rect width="15.11" height="27.9864" fill="white" />
                                              </clipPath>
                                            </defs>
                                          </svg>
                                        }
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="rting-tabs">
                              <ul class="flex-wrap">
                                {
                                  el?.features?.map((el, i) => <li class="clickable" key={i}>{el}</li>)
                                }
                              </ul>
                            </div>
                            <div class="position-relative rating-textbox">
                              <div class="right_text_svg">
                                <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <g clip-path="url(#clip0_5392_68861)">
                                    <path d="M8.62094 4.26367H2.46094V4.82367H8.62094V4.26367Z" fill="black" />
                                    <path d="M8.62094 5.94336H2.46094V6.50336H8.62094V5.94336Z" fill="black" />
                                    <path d="M7.22094 7.62305H2.46094V8.18305H7.22094V7.62305Z" fill="black" />
                                    <path d="M5.82094 9.30273H2.46094V9.86273H5.82094V9.30273Z" fill="black" />
                                    <path d="M5.82094 10.9824H2.46094V11.5424H5.82094V10.9824Z" fill="black" />
                                    <path d="M10.8617 5.54713V2.74713L8.7376 0.623047H0.22168V14.063H10.8617V9.13897L13.7776 6.22305L11.9817 4.42713L10.8617 5.54713ZM10.5817 6.61897L11.5858 7.62305L8.22576 10.983H7.22168V9.97897L10.5817 6.61897ZM8.90168 1.57897L9.90576 2.58305H8.90168V1.57897ZM10.3017 13.503H0.78168V1.18305H8.34168V3.14305H10.3017V6.10713L6.66168 9.74713V11.543H8.4576L10.3017 9.69897V13.503ZM11.9817 7.22713L10.9776 6.22305L11.9817 5.21897L12.9858 6.22305L11.9817 7.22713Z" fill="black" />
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_5392_68861">
                                      <rect width="14" height="14" fill="white" transform="translate(0 0.34375)" />
                                    </clipPath>
                                  </defs>
                                </svg>
                              </div>
                              <div class="mb-0">
                                <textarea placeholder="" value={el?.review} rows="3" id="exampleForm.ControlTextarea1" class="form-control"></textarea>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  })
                }
              </div>
            </div>
          </Card>
        </Flex>
      </Box>
    </>
  );
};

export default Rating;
