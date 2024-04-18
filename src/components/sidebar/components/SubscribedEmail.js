// import React from "react";
import {
    Box,
    Flex,
    Table,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
    useColorModeValue,
    Select,
    Textarea,
    TableContainer,
    Checkbox,
    Button,
    Progress,
  } from "@chakra-ui/react";
  import React, { useContext, useEffect, useState } from "react";
  import Card from "components/card/Card";
//   import { BsEye } from "react-icons/bs";
//   import camera from "assets/img/icons/camera.svg";
//   import crown from "assets/img/icons/crown.png";
  import share from "assets/img/icons/share.png";
//   import star from "assets/img/icons/star.png";
//   import video from "assets/img/icons/video.svg";
//   import auth1 from "assets/img/auth/auth1.svg";
//   import avatar13 from "assets/img/avatars/avatar13.png";
//   import watch from "assets/img/icons/watch.svg";
//   import calendar from "assets/img/icons/calendar.svg";
  import print from "assets/img/icons/print.png";
//   import { useHistory } from "react-router-dom";
//   import content1 from "assets/img/nfts/NftBanner1.png";
//   import celebrity from "assets/img/icons/celebrity.png";
//   import publication1 from "assets/img/profile/publication1.svg";
//   import { Tooltip } from "@chakra-ui/react";
//   import avt1 from "assets/img/avatars/avt1.png";
//   import avt2 from "assets/img/avatars/avt2.png";
//   import avt3 from "assets/img/avatars/avt3.png";
//   import avt4 from "assets/img/avatars/avt4.png";
//   import monitor from "assets/img/icons/monitor.svg";
//   import mobile from "assets/img/icons/mobile.svg";
//   import mail from "assets/img/icons/mail.svg";
//   import pro from "assets/img/icons/pro.svg";
//   import avatar14 from "assets/img/avatars/avatar14.svg";
//   import idic from "assets/img/icons/id.svg";
//   import shared from "assets/img/icons/shared.svg";
//   import img1 from "assets/img/nfts/Nft4.png";
//   import img2 from "assets/img/avatars/avatar2.png";
//   import img3 from "assets/img/nfts/Nft2.png";
//   import docuploaded from "assets/img/icons/img-upld.svg";
//   import write from "assets/img/icons/write.svg";
//   import publication2 from "assets/img/profile/publication2.svg";
//   import publication3 from "assets/img/profile/publication3.svg";
//   // import invic from "assets/img/icons/invoice.svg";
//   import content2 from "assets/img/auth/auth2.svg";
//   import content3 from "assets/img/auth/auth3.svg";
//   import { BsArrowRight } from "react-icons/bs";
//   import recic from "assets/img/icons/recording.svg";
//   import crime from "assets/img/icons/crime.svg";
//   import interview from "assets/img/icons/interview.svg";
//   import news from "assets/img/icons/news.svg";
//   import amt from "assets/img/icons/ametuer.svg";
//   import { Get } from "api/admin.services";
//   import { toast } from "react-toastify";
//   import { Patch } from "api/admin.services";
//   import moment from "moment/moment";
//   import { Post } from "api/admin.services";
//   import dataContext from "../ContextFolder/Createcontext";
//   import Loader from "components/Loader";
//   import Timer from "../Timer";
//   import ReactPaginate from "react-paginate";
//   import { async } from "@firebase/util";
//   import Share from "components/share/Share";
//   import SortFilterDashboard from "components/sortfilters/SortFilterDashboard";
function SubscribedEmail() {
  return (
    <>
      {/* <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
        <Card
          direction="column"
          w="100%"
          px="0px"
          mb="24px"
          overflowX={{ sm: "scroll", lg: "hidden" }}
        >
          <Flex px="20px" justify="space-between" mb="10px" align="center">
            <Text
              color={textColor}
              fontSize="22px"
              fontWeight="700"
              lineHeight="100%"
              fontFamily="AirbnbBold"
            >
              Content control
            </Text>
            <div className="opt_icons_wrap">
              <a
                onClick={() => {
                  setShow(true);
                  setCsv(path1);
                }}
                className="txt_danger_mdm"
              >
                <img src={share} className="opt_icons" />
              </a>{" "}
              <span onClick={printOnboardingTable}>
                <img src={print} className="opt_icons" />
              </span>
              <div className="fltr_btn">
                <Text fontSize={"15px"}>
                  <span
                    onClick={
                        () =>
                      setHideShow((prevHideShow) => ({
                        ...prevHideShow,
                        status: true,
                        type: "contentOnboarding",
                      }))
                    }
                  >
                    Sort
                  </span>
                </Text>
                {hideShow.type === "contentOnboarding" && (
                  <SortFilterDashboard
                    hideShow={hideShow}
                    closeSort={closeSort}
                    sendDataToParent={collectSortParms}
                    sendDataToParent1={collectSortParms1}
                    handleApplySorting={handleApplySorting}
                  />
                 )}
              </div>
            </div>
          </Flex>
          <TableContainer>
            <Table mx="20px" variant="simple" className="common_table">
              <Thead>
                <Tr>
                  <Th>Published content</Th>
                  <Th>Time & date</Th>
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
                  <Th>Employee details</Th>
                  <Th>CTA</Th>
                </Tr>
              </Thead>
              <Tbody>
                {contentList &&
                  contentList.map((value, index) => {
                    const audio = value?.content?.filter(
                      (curr) => curr?.media_type === "audio"
                    );
                    const image = value?.content?.filter(
                      (curr) => curr?.media_type === "image"
                    );
                    const video1 = value?.content?.filter(
                      (curr) => curr?.media_type === "video"
                    );

                    return (
                      <Tr key={value._id}>
                        <Td>
                          <a
                            onClick={() =>
                              history.push(
                                `/admin/live-published-content/${value._id}/Admin control`
                              )
                            }
                          >
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
                                          <img
                                            // src={process.env.REACT_APP_CONTENT + value.media}
                                            src={value?.watermark}
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
                                            // src={process.env.REACT_APP_CONTENT + value.thumbnail}
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
                          <p className="timedate">
                            <img src={watch} className="icn_time" />
                            {moment(value.createdAt).format("hh:mm A")}
                          </p>
                          <p className="timedate">
                            <img src={calendar} className="icn_time" />
                            {moment(value.createdAt).format("DD MMMM YYYY")}
                          </p>
                        </Td>
                        <Td className="item_detail address_details">
                          {value.location}
                        </Td>
                        <Td className="remarks_wrap remarks_wrap_edit">
                          <Textarea
                            className="desc_txtarea"
                            isRequired
                            value={value.heading}
                            placeholder="Enter heading..."
                            content_id={value._id}
                            name="heading"
                            onChange={(e) => {
                              value.heading = e.target.value;
                              setContentList((prevItems) => {
                                const updatedItems = [...prevItems];
                                updatedItems[index] = value;
                                return updatedItems;
                              });
                            }}
                          />
                          <img className="icn_edit" src={write} />
                        </Td>
                        <Td className="remarks_wrap remarks_wrap_edit">
                          <Textarea
                            className="desc_txtarea"
                            content_id={value._id}
                            value={value.description}
                            name="description"
                            onChange={(e) => {
                              value.description = e.target.value;
                              setContentList((prevItems) => {
                                const updatedItems = [...prevItems];
                                updatedItems[index] = value;
                                return updatedItems;
                              });
                            }}
                          />
                          <img className="icn_edit" src={write} />
                        </Td>

                        <Td>
                          <audio controls>
                            <source
                              src={
                                process.env.REACT_APP_CONTENT +
                                value?.audio_description
                              }
                              type="audio/mp3"
                            />
                          </audio>

                          <audio />
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
                              <Tooltip label={"Image"}>
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
                        <Td className="text_center">
                          {value?.categoryData?.name}
                        </Td>
                        <Td className="text_center">
                          {audio && audio?.length > 0 && audio?.length}
                          {video1 && video1?.length > 0 && video1?.length}
                          {image && image?.length > 0 && image?.length}
                        </Td>
                        <Td>&pound;{value.ask_price}</Td>
                        <Td className="item_detail">
                          <img
                            src={
                              process.env.REACT_APP_HOPPER_AVATAR +
                              value?.hopper_id?.avatar_detail?.avatar
                            }
                            alt="Content thumbnail"
                          />
                          <Text className="nameimg">
                            {`${value.hopper_id.first_name}  ${value.hopper_id.last_name}`}{" "}
                            <br />
                            <span>({value.hopper_id.user_name})</span>
                          </Text>
                        </Td>
                        <Td className="item_detail">
                          <div className="check_wrap">
                            <Checkbox
                              colorScheme="brandScheme"
                              me="10px"
                              content_id={value._id}
                              isChecked={value.firstLevelCheck?.nudity}
                              onChange={(e) => {
                                value.firstLevelCheck.nudity = e.target.checked;

                                console.log(value, "<- Value is here");
                                setContentList((prevItems) => {
                                  const updatedItems = [...prevItems];
                                  updatedItems[index] = value;
                                  return updatedItems;
                                });
                              }}
                            />
                            <span>No nudity</span>
                          </div>
                          <div className="check_wrap">
                            <Checkbox
                              colorScheme="brandScheme"
                              me="10px"
                              content_id={value._id}
                              isChecked={value.firstLevelCheck?.isAdult}
                              onChange={(e) => {
                                value.firstLevelCheck.isAdult =
                                  e.target.checked;
                                setContentList((prevItems) => {
                                  const updatedItems = [...prevItems];
                                  updatedItems[index] = value;
                                  return updatedItems;
                                });
                              }}
                            />
                            <span>No children</span>
                          </div>
                          <div className="check_wrap">
                            <Checkbox
                              colorScheme="brandScheme"
                              me="10px"
                              content_id={value._id}
                              isChecked={value.firstLevelCheck?.isGDPR}
                              onChange={(e) => {
                                value.firstLevelCheck.isGDPR = e.target.checked;
                                setContentList((prevItems) => {
                                  const updatedItems = [...prevItems];
                                  updatedItems[index] = value;
                                  return updatedItems;
                                });
                              }}
                            />
                            <span>GDPR check</span>
                          </div>
                        </Td>
                        <Td className="remarks_wrap">
                          <Textarea
                            placeholder="Enter details of call..."
                            content_id={value._id}
                            defaultValue={value.secondLevelCheck}
                            name="secondLevelCheck"
                            onChange={(e) => {
                              value.secondLevelCheck = e.target.value;
                              setContentList((prevItems) => {
                                const updatedItems = [...prevItems];
                                updatedItems[index] = value;
                                return updatedItems;
                              });
                            }}
                          />
                        </Td>
                        <Td className="timedate_wrap">
                          {value.mode_updated_at ? (
                            <>
                              <p className="timedate">
                                <img src={watch} className="icn_time" />
                                {moment(value.mode_updated_at).format(
                                  "hh:mm A"
                                )}
                              </p>
                              <p className="timedate">
                                <img src={calendar} className="icn_time" />
                                {moment(value.mode_updated_at).format(
                                  "DD MMMM, YYYY"
                                )}
                              </p>
                            </>
                          ) : (
                            ""
                          )}
                        </Td>
                        <Td className="text_center">
                          <Checkbox
                            colorScheme="brandScheme"
                            me="10px"
                            isChecked={value.checkAndApprove}
                            onChange={(e) => {
                              value.checkAndApprove = e.target.checked;
                              setContentList((prevItems) => {
                                const updatedItems = [...prevItems];
                                updatedItems[index] = value;
                                return updatedItems;
                              });
                            }}
                          />
                        </Td>
                        <Td className="select_wrap">
                          <Select
                            value={value.mode}
                            content_id={value._id}
                            name="mode"
                            onChange={(e) => {
                              value.mode = e.target.value;
                              setContentList((prevItems) => {
                                const updatedItems = [...prevItems];
                                updatedItems[index] = value;
                                return updatedItems;
                              });
                            }}
                          >
                            <option value="chat">Chat</option>
                            <option value="call">Call</option>
                            <option value="email">Email</option>
                          </Select>
                        </Td>
                        <Td className="big_select_wrap">
                          <Select
                            value={value.status}
                            content_id={value._id}
                            name="status"
                            onChange={(e) => {
                              value.status = e.target.value;
                              setContentList((prevItems) => {
                                const updatedItems = [...prevItems];
                                updatedItems[index] = value;
                                return updatedItems;
                              });
                            }}
                          >
                            <option value="pending">Pending</option>
                            <option value="rejected">Rejected </option>
                            {value?.firstLevelCheck?.isAdult &&
                            value?.firstLevelCheck?.isGDPR &&
                            value?.firstLevelCheck?.nudity &&
                            value?.secondLevelCheck ? (
                              <option value="published">Published</option>
                            ) : null}
                          </Select>
                        </Td>
                        <Td className="remarks_wrap">
                          <Textarea
                            placeholder="Enter remarks if any..."
                            content_id={value._id}
                            name="remarks"
                            defaultValue={value.remarks}
                            onChange={(e) => {
                              value.remarks = e.target.value;
                              setContentList((prevItems) => {
                                const updatedItems = [...prevItems];
                                updatedItems[index] = value;
                                return updatedItems;
                              });
                            }}
                          />
                        </Td>

                        <Td className="timedate_wrap">
                          <p className="timedate">
                            {value?.admin_details?.name}
                          </p>
                          <p className="timedate">
                            <img src={watch} className="icn_time" />
                            {moment(value.updatedAt).format("hh:mm A")}
                          </p>
                          <p className="timedate">
                            <img src={calendar} className="icn_time" />
                            {moment(value.updatedAt).format("DD MMMM YYYY")}
                          </p>
                          <a
                            className="timedate"
                            onClick={() =>
                              history.push(
                                `/admin/content-onboarding-history/${value._id}/Content control history/Admin contorls`
                              )
                            }
                          >
                            <BsEye className="icn_time" />
                            View history
                          </a>
                        </Td>
                        <Td>
                          <Button
                            className="theme_btn tbl_btn"
                            type="submit"
                            onClick={() => {
                              updateContent(index);
                            }}
                          >
                            Save
                          </Button>
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
            onPageChange={handleChangeContent}
            pageRangeDisplayed={5}
            pageCount={totalContentPages}
            previousLabel="<"
            renderOnZeroPageCount={null}
          />
        </Card>
      </Box> */}
    </>
  );
}

export default SubscribedEmail;
