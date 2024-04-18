import React, { useContext, useEffect, useState } from "react";
import {
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
  Tooltip,
} from "@chakra-ui/react";
import Card from "components/card/Card";
import SortFilterContent from "components/sortfilters/SortFilterContent";
import { BsArrowRight } from "react-icons/bs";
import { useHistory } from "react-router-dom";
import { BsEye } from "react-icons/bs";
import ReactPaginate from "react-paginate";

//images
import interview from "assets/img/icons/interview.svg";
import docic from "assets/img/icons/contentdoc.svg";
import pdfic from "assets/img/icons/contentpdf.svg";
import share from "assets/img/icons/share.png";
import print from "assets/img/icons/print.png";
import watch from "assets/img/icons/watch.svg";
import calendar from "assets/img/icons/calendar.svg";
import write from "assets/img/icons/write.svg";
import camera from "assets/img/icons/camera.svg";
import crown from "assets/img/icons/crown.png";
import shared from "assets/img/icons/shared.svg";
import video from "assets/img/icons/video.svg";

//helpers
import moment from "moment";
import dataContext from "views/admin/ContextFolder/Createcontext";
import { Get } from "api/admin.services";
import PopupConfirm from "components/Pop Confirm";
import { Post } from "api/admin.services";
import { toast } from "react-toastify";

const DeletedContents = ({
  setShow,
  setCsv,
  DownloadCsv,
  setHideShow,
  hideShow,
  closeSort,
  collectSortParms,
  handleApplySorting,
  collectSortParms1,
  setLoading,
  deletedContents,
  setDeletedContents,
  handlePageChangeDeleted,
  deletedContentPages,
  getDeletedContents,
  currentPageDelCont,
  getContentListPublished,
  currentPagePublishdContent
}) => {
  const textColor = useColorModeValue("#000", "white");

  const history = useHistory();
  const { profile } = useContext(dataContext);

  const handleClick = async (obj) => {
    try {
      await Post("admin/deleteContent", obj);
      getDeletedContents(currentPageDelCont);
      getContentListPublished(currentPagePublishdContent);
      toast.success("Content restored successfully");
    } catch (error) {
      console.log(error.message);
    }
  };

  // convert amount comma seprator
  const formatAmountInMillion = (amount) =>
    amount?.toLocaleString("en-US", {
      maximumFractionDigits: 2,
    });

  return (
    <Card
      className="tab_card"
      direction="column"
      w="100%"
      px="0px"
      mb="24px"
      overflowX={{ sm: "scroll", lg: "hidden" }}
    >
      <div className="">
        <Flex px="20px" justify="space-between" mb="10px" align="center">
          <Text
            color={textColor}
            fontSize="22px"
            fontFamily={"AirbnbBold"}
            lineHeight="100%"
          >
            Deleted content summary
          </Text>
          <div className="opt_icons_wrap"></div>
        </Flex>

        {/* Deleted Content  */}
        <TableContainer className="fix_ht_table">
          <Table mx="20px" variant="simple" className="common_table">
            <Thead>
              <Tr>
                <Th>Deleted content</Th>
                <Th>Time & date</Th>
                <Th>Location</Th>
                <Th>Heading</Th>
                <Th>Description</Th>
                <Th>Voice note</Th>
                <Th>Type</Th>
                <Th>License</Th>
                <Th>Category</Th>
                <Th>Volume</Th>
                <Th>Asking price</Th>
                <Th>Sale price</Th>
                <Th>Sale status</Th>
                <Th>Amount received</Th>
                <Th>Presshop commission</Th>
                <Th>Amount paid</Th>
                <Th>Amount payable</Th>
                <Th className="rcvd_comn_th">Received From</Th>
                <Th>Published by</Th>
                <Th>Mode</Th>
                <Th>Remarks</Th>
                {
                  profile?.role === "admin" ? <Th>CTA</Th> : null
                }
              </Tr>
            </Thead>
            <Tbody>
              {deletedContents?.map((curr, index) => {
                const audio = curr.content.filter(
                  (curr) => curr.media_type === "audio"
                );
                const image = curr.content.filter(
                  (curr) => curr.media_type === "image"
                );
                const video1 = curr.content.filter(
                  (curr) => curr.media_type === "video"
                );
                const Doc = curr.content.filter(
                  (curr) => curr.media_type === "doc"
                );
                const Pdf = curr.content.filter(
                  (curr) => curr.media_type === "pdf"
                );

                return (
                  <Tr key={curr._id}>
                    <Td>
                      <a
                        onClick={() => {
                          history.push(
                            `/admin/live-published-content/${curr._id}/Manage content`
                          );
                        }}
                      >
                        {curr?.content.length === 1 ? (
                          curr?.content[0].media_type === "image" ? (
                            <img
                              src={curr?.content[0]?.watermark}
                              className="content_img"
                              alt="Content thumbnail"
                            />
                          ) : curr?.content[0].media_type === "audio" ? (
                            <img
                              src={interview}
                              alt="Content thumbnail"
                              className="icn m_auto"
                            />
                          ) : curr?.content[0].media_type === "video" ? (
                            <img
                              src={curr?.content[0]?.watermark}
                              className="content_img"
                              alt="Content thumbnail"
                            />
                          ) : curr?.content[0].media_type === "doc" ? (
                            <img
                              src={docic}
                              className="icn m_auto"
                              alt="Content thumbnail"
                            />
                          ) : curr?.content[0].media_type === "pdf" ? (
                            <img
                              src={pdfic}
                              className="icn m_auto"
                              alt="Content thumbnail"
                            />
                          ) : null
                        ) : curr?.content.length === 0 ? null : (
                          curr?.content.length > 1 && (
                            <div className="content_imgs_wrap contnt_lngth_wrp">
                              <div className="content_imgs">
                                {curr?.content.slice(0, 3).map((value) => (
                                  <>
                                    {value.media_type === "image" ? (
                                      <img
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
                                    ) : value.media_type === "video" ? (
                                      <img
                                        src={value?.watermark}
                                        className="content_img"
                                        alt="Content thumbnail"
                                      />
                                    ) : curr?.content[0].media_type ===
                                      "doc" ? (
                                      <img
                                        src={docic}
                                        className="icn m_auto"
                                        alt="Content thumbnail"
                                      />
                                    ) : curr?.content[0].media_type ===
                                      "pdf" ? (
                                      <img
                                        src={pdfic}
                                        className="icn m_auto"
                                        alt="Content thumbnail"
                                      />
                                    ) : null}
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
                        {moment(curr.published_time_date).format("hh:mm A")}
                      </p>
                      <p className="timedate">
                        <img src={calendar} className="icn_time" />
                        {moment(curr.published_time_date).format(
                          "DD MMMM YYYY"
                        )}
                      </p>
                    </Td>

                    <Td className="item_detail address_details">
                      {curr.location}
                    </Td>

                    <Td className="remarks_wrap remarks_wrap_edit">
                      <Textarea
                        className="desc_txtarea"
                        value={curr.heading}
                        content_id={curr._id}
                        isDisabled={
                          profile?.subadmin_rights?.viewRightOnly &&
                          !profile?.subadmin_rights?.controlContent
                        }
                        onChange={(e) => {
                          curr.heading = e.target.value;
                          setDeletedContents((pre) => {
                            const updatedData = [...pre];
                            updatedData[index] = curr;
                            return updatedData;
                          });
                        }}
                      />
                      <img className="icn_edit" src={write} />
                    </Td>

                    <Td className="remarks_wrap remarks_wrap_edit">
                      <Textarea
                        className="desc_txtarea"
                        value={curr?.description}
                        content_id={curr._id}
                        isDisabled={
                          profile?.subadmin_rights?.viewRightOnly &&
                          !profile?.subadmin_rights?.controlContent
                        }
                        onChange={(e) => {
                          curr.description = e.target.value;
                          setDeletedContents((pre) => {
                            const updatedData = [...pre];
                            updatedData[index] = curr;
                            return updatedData;
                          });
                        }}
                      />
                      <img className="icn_edit" src={write} />
                    </Td>

                    <Td>
                      {curr.audio_description && (
                        <audio controls>
                          <source
                            src={
                              process.env.REACT_APP_CONTENT +
                              curr.audio_description
                            }
                            type="audio/mp3"
                          />
                        </audio>
                      )}
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
                          <Tooltip label={"Camera"}>
                            <img
                              src={camera}
                              alt="Content thumbnail"
                              className="icn m_auto"
                            />
                          </Tooltip>
                        )}

                        {Doc && Doc?.length > 0 && (
                          <Tooltip label={"Doc"}>
                            <img
                              src={docic}
                              alt="Content thumbnail"
                              className="icn m_auto"
                            />
                          </Tooltip>
                        )}

                        {Pdf && Pdf?.length > 0 && (
                          <Tooltip label={"Pdf"}>
                            <img
                              src={pdfic}
                              alt="Content thumbnail"
                              className="icn m_auto"
                            />
                          </Tooltip>
                        )}
                      </div>
                    </Td>

                    <Td className="text_center">
                      {curr.type == "shared" ? (
                        <Tooltip label={"Shared"}>
                          <img
                            src={shared}
                            alt="Content thumbnail"
                            className="icn"
                          />
                        </Tooltip>
                      ) : (
                        <Tooltip label={"Crown"}>
                          <img
                            src={crown}
                            alt="Content thumbnail"
                            className="icn"
                          />
                        </Tooltip>
                      )}
                    </Td>

                    <Td className="text_center">
                      <Tooltip label={curr?.categoryData?.name}>
                        <img
                          src={curr?.categoryData?.icon}
                          alt={curr?.categoryData?.name}
                          className="icn"
                        />
                      </Tooltip>
                    </Td>

                    <Td className="text_center">
                      <p> {audio && audio?.length > 0 && audio?.length}</p>
                      <p>{video1 && video1?.length > 0 && video1?.length}</p>
                      <p>{image && image?.length > 0 && image?.length}</p>
                    </Td>

                    <Td className="text-nowrap">
                      &pound; {formatAmountInMillion(curr?.ask_price)}
                    </Td>

                    <Td>&pound; {formatAmountInMillion(curr?.amount_paid)}</Td>

                    <Td className="sale-status gr">
                      {curr?.sale_status === "sold" ? (
                        <span className="txt_success_mdm">Sold</span>
                      ) : (
                        <span className="txt_danger_mdm">Unsold</span>
                      )}
                    </Td>

                    <Td>&pound; {curr?.amount_paid}</Td>

                    <Td>&pound; {curr?.commition_to_payable}</Td>

                    <Td>&pound; {curr?.amount_paid_to_hopper ?? "0"}</Td>

                    <Td>
                      &pound;{" "}
                      {curr?.amount_paid_to_hopper &&
                      curr?.amount_paid_to_hopper
                        ? "0"
                        : curr?.amount_payable_to_hopper}
                    </Td>

                    <Td className="rcvd_comn_td">
                      <p>
                        {
                          curr?.purchased_publication?.company_bank_details
                            ?.bank_name
                        }
                      </p>
                      <p>{`Sort Code ${
                        curr?.purchased_publication?.company_bank_details
                          ?.sort_code || ""
                      }`}</p>
                      <p>{`Account ${
                        curr?.purchased_publication?.company_bank_details
                          ?.account_number || ""
                      }`}</p>
                    </Td>

                    <Td className="item_detail">
                      <img
                        src={
                          process.env.REACT_APP_HOPPER_AVATAR +
                          curr?.hopper_id?.avatar_detail?.avatar
                        }
                        alt="Content thumbnail"
                      />
                      <Text className="nameimg naming_comn">
                        <span className="txt_mdm">
                          {`${curr?.hopper_id?.first_name}  ${curr?.hopper_id?.last_name} `}{" "}
                        </span>
                        <br />
                        <span>({curr?.hopper_id?.user_name})</span>
                      </Text>
                    </Td>

                    <Td className="select_wrap">
                      <Select
                        value={curr.mode}
                        content_id={curr._id}
                        isDisabled={
                          profile?.subadmin_rights?.viewRightOnly &&
                          !profile?.subadmin_rights?.controlContent
                        }
                        onChange={(e) => {
                          curr.mode = e.target.value;
                          setDeletedContents((pre) => {
                            const updatedData = [...pre];
                            updatedData[index] = curr;
                            return updatedData;
                          });
                        }}
                      >
                        <option value="email">Email</option>
                        <option value="chat">Chat</option>
                        <option value="call">Call</option>
                      </Select>
                    </Td>

                    <Td className="remarks_wrap">
                      <Textarea
                        value={curr.remarks}
                        content_id={curr._id}
                        isDisabled={
                          profile?.subadmin_rights?.viewRightOnly &&
                          !profile?.subadmin_rights?.controlContent
                        }
                        onChange={(e) => {
                          curr.remarks = e.target.value;
                          setDeletedContents((pre) => {
                            const updatedData = [...pre];
                            updatedData[index] = curr;
                            return updatedData;
                          });
                        }}
                      />
                    </Td>
                    {
                      profile?.role === "admin" ? 
                      <Td>
                      <PopupConfirm
                        title="Confirmation"
                        description="Are you sure you want to restore this content?"
                        onConfirm={()=>handleClick({ content_id: curr?._id, is_deleted: false })}
                        buttonTitle={"Restore"}
                      />
                    </Td>
                    : null
                    }
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </div>
      <ReactPaginate
        className="paginated"
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageChangeDeleted}
        pageRangeDisplayed={5}
        pageCount={deletedContentPages}
        previousLabel="<"
        renderOnZeroPageCount={null}
        forcePage={currentPageDelCont-1}
      />
    </Card>
  );
};

export default DeletedContents;
