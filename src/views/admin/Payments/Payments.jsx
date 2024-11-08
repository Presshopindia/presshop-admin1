import {
  Box,
  Flex,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  useColorModeValue,
  Button,
  Checkbox,
  Tooltip
} from "@chakra-ui/react";
import video from "assets/img/icons/video.svg";
import Card from "components/card/Card";
import contentic from "assets/img/icons/content.png";
import taskic from "assets/img/icons/content1.svg";
import { BsArrowRight, BsArrowLeft } from "react-icons/bs";
import interview from "assets/img/icons/interview.svg";
import React, { useContext, useEffect, useState } from "react";
import watch from "assets/img/icons/watch.svg";
import calendar from "assets/img/icons/calendar.svg";
import share from "assets/img/icons/share.png";
import print from "assets/img/icons/print.png";
import { useHistory } from "react-router-dom";
import Share from "components/share/Share";
import Loader from "components/Loader";
import { Get } from "api/admin.services";
import { toast } from "react-toastify";
import { Post } from "api/admin.services";
import ReactPaginate from "react-paginate";
import SortFilterTop from "components/sortfilters/SortFilterTop";
import ActionSort from "components/sortfilters/AcrionSort";

//pdf generation package
import jsPDF from 'jspdf';
 

// new imports end

export default function Payments() {
  const history = useHistory();
  const textColor = useColorModeValue("#000", "black");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const perPage = 5;
  const [paymentDetail, setPaymentDetail] = useState([]);
  const [dataWithCheckboxes, setDataWithCheckboxes] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [currentImageIndices, setCurrentImageIndices] = useState({});
 

  const getData = (page, parametersName, parameters) => {
    const offset = (page - 1) * perPage;
    setLoading(true);

    Get(
      `admin/paidtohopper?limit=${perPage}&offset=${offset}&${parametersName}=${parameters}`
    )
      .then((response) => {
        const data = response.data?.resp;
        const formattedData = data.map((item) => ({ ...item, checked: false }));
        setPaymentDetail(formattedData);
        setDataWithCheckboxes(formattedData);
        setTotalPages(response?.data?.count / perPage);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    getData(currentPage);
  }, [currentPage]);

  const handleCheckAll = (event) => {
    const isChecked = event.target.checked;
    setDataWithCheckboxes((prevData) =>
      prevData.map((item) => ({ ...item, checked: isChecked }))
    );

    setSelectedIds(isChecked ? dataWithCheckboxes.map((item) => item._id) : []);
  };

  const handleCheckboxClick = (id) => {
    setDataWithCheckboxes((prevData) =>
      prevData.map((item) =>
        item._id === id ? { ...item, checked: !item.checked } : item
      )
    );

    setSelectedIds((prevIds) =>
      prevIds.includes(id)
        ? prevIds.filter((selectedId) => selectedId !== id)
        : [...prevIds, id]
    );
  };

  const payAll = async () => {
    if (selectedIds.length === 0) {
      toast.error("No Hopper Selected");
    } else {
      try {
        await Post(`admin/paymenttohopperByadmin`, { hopper_id: selectedIds });
        toast.success("Payment Successfully");
        getData(currentPage);
        setSelectedIds([]);
      } catch (error) {
        // Handle error
      }
    }
  };

  const pay = async () => {
    if (selectedIds.length === 0) {
      toast.error("No Hopper Selected");
    } else {
      try {
        await Post(`admin/paymenttohopperByadmin`, { hopper_id: selectedIds });
        toast.success("Payment Successfully");
        getData(currentPage);
        setSelectedIds([]);
      } catch (error) {
        // Handle error
      }
    }
  };

  const downloadCsvFileOfPayments = async (e) => {
    generatePDF()
    // const offset = (currentPage - 1) * perPage;
    // try {
    //   const response = await Get(
    //     `admin/admin/paidtohopper&limit=${perPage}&offset=${offset}`
    //   );
    //   if (response) {
    //     const onboardinPrint = response?.data?.fullPath;
    //     window.open(onboardinPrint);
    //   }
    // } catch (err) {}
  };

  const generatePDF = () => {
    const doc = new jsPDF();
  
    // Add content to the PDF
    doc.text('Hello, this is your PDF!', 10, 10);
  
    // Save the PDF
    doc.save('myPDF.pdf');
  };
  

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected + 1);
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
    getData(currentPage, parametersName, parameters);
    setParams({
      parameters: "",
      parametersName: "",
    });
    closeSort();
  };

  return (
    <>
      {loading && <Loader />}
      <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
        {loading && <Loader />}
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
                Payments
              </Text>
              <div className="opt_icons_wrap">
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

                <a className="txt_danger_mdm">
                  <Tooltip label={"Share"}>
                    <img src={share} className="opt_icons" />
                  </Tooltip>
                </a>
                <span>
                <Tooltip label={"Print"}>
                  <img src={print} className="opt_icons" onClick={downloadCsvFileOfPayments}/>
                </Tooltip>
                </span>
              </div>
            </Flex>
            <Flex
              px="20px"
              ps="20px"
              justify="space-between"
              mb="10px"
              mt={"20px"}
              align="center"
            >
              <Button
                className="theme_btn"
                fontFamily="AirbnbBold"
                onClick={payAll}
              >
                Pay all
              </Button>
            </Flex>
            <TableContainer className="fix_ht_table pmnt_tbl_wrp">
              <Table
                w="fit-content"
                mx="20px"
                variant="simple"
                className="common_table"
              >
                <Thead>
                  <Tr>
                    <Th className="text_center cstm_sml_th">
                      <Checkbox
                        colorScheme="brandScheme"
                        me="10px"
                        className="checkAll"
                        isChecked={
                          dataWithCheckboxes.length > 0 &&
                          dataWithCheckboxes.every((item) => item.checked)
                        }
                        onChange={handleCheckAll}
                      />
                      {/* Select all */}
                    </Th>
                    <Th>Hoppers</Th>
                    <Th>Content</Th>
                    <Th className="licnc_type_th">Type</Th>
                    <Th>Received from publication</Th>
                    <Th>Presshop commission</Th>
                    <Th>Payable to hopper</Th>
                    {/* <Th>Last paid</Th> */}
                    <Th textAlign="center">Action</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {dataWithCheckboxes &&
                    dataWithCheckboxes
                      .filter((curr) => curr?.hopper_details?.length > 0)

                      .map((curr) => {
                        const name =
                          ` ${curr.hopper_details[0]?.first_name} ${curr.hopper_details[0]?.last_name}` ||
                          "";
                        const userName =
                          curr.hopper_details[0]?.user_name || "";
                        const profile_image =
                          curr.hopper_details[0]?.avatar_details[0]?.avatar ||
                          "";
                          const setId = curr?.transictions_content[0]?.content_id?._id

                        {
                          /* 
                        const transictionsContent = curr?.transictions_content;
                        const transictionsTask = curr?.transictions_task;
                        const singleContent = transictionsContent?.[0]?.content_id?.content; */
                        }

                        return (
                          <Tr key={curr._id}>
                            <Td className="text_center check_center">
                              <Checkbox
                                colorScheme="brandScheme"
                                me="10px"
                                isChecked={selectedIds.includes(curr?._id)}
                                onChange={() => handleCheckboxClick(curr?._id)}
                              />
                            </Td>
                            <Td className="item_detail">
                              <a
                                onClick={() => {
                                  history.push("/admin/payments-history");
                                }}
                              >
                                <img
                                  src={
                                    process.env.REACT_APP_HOPPER_AVATAR +
                                    profile_image
                                  }
                                  alt="Content thumbnail"
                                />
                                <Text className="nameimg naming_comn">
                                  <span className="txt_mdm">{name}</span>
                                  <br />
                                  <span>({userName})</span>
                                </Text>
                              </a>
                            </Td>

                            <Td className="cont_pmnt_td">
                              {curr?.transictions_content?.length > 0 &&
                              curr?.transictions_task?.length > 0 &&
                              curr?.transictions_content[0]?.content_id?.content
                                ?.length > 0 ? (
                                curr?.transictions_content[0]?.content_id
                                  ?.content?.length === 1 ? (
                                  curr?.transictions_content[0]?.content_id
                                    ?.content[0].media_type === "image" ? (
                                    <img
                                      // src={process.env.REACT_APP_CONTENT + curr?.transictions_content[0]?.content_id?.content[0]?.media}
                                      src={
                                        curr?.transictions_content[0]
                                          ?.content_id?.content[0]?.watermark
                                      }
                                      className="content_img"
                                      alt="Content thumbnail"
                                    />
                                  ) : curr?.transictions_content[0]?.content_id
                                      ?.content[0].media_type === "audio" ? (
                                    <img
                                      src={interview}
                                      alt="Content thumbnail"
                                      className="icn m_auto"
                                    />
                                  ) : curr?.transictions_content[0]?.content_id
                                      ?.content[0].media_type === "video" ? (
                                    <img
                                      // src={process.env.REACT_APP_CONTENT + curr?.transictions_content[0]?.content_id?.content[0]?.thumbnail}
                                      src={
                                        curr?.transictions_content[0]
                                          ?.content_id?.content[0]?.watermark
                                      }
                                      className="content_img"
                                      alt="Content thumbnail"
                                    />
                                  ) : (
                                    ""
                                  )
                                ) : (
                                  curr?.transictions_content[0]?.content_id
                                    ?.content?.length > 1 && (
                                    <div className="content_imgs_wrap contnt_lngth_wrp">
                                      <div className="content_imgs">
                                        {curr?.transictions_content[0]?.content_id?.content.map(
                                          (value) => (
                                            <React.Fragment key={value._id}>
                                              {value.media_type === "image" ? (
                                                <img
                                                  // src={process.env.REACT_APP_CONTENT + value.media}
                                                  src={value?.watermark}
                                                  className="content_img"
                                                  alt="Content thumbnail"
                                                />
                                              ) : value.media_type ===
                                                "audio" ? (
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
                                            </React.Fragment>
                                          )
                                        )}
                                      </div>
                                      <span className="arrow_span">
                                        <BsArrowRight />
                                      </span>
                                    </div>
                                  )
                                )
                              ) : (
                                ""
                              )}

                              {curr?.transictions_content?.length > 0 &&
                              curr?.transictions_task?.length === 0 ? (
                                curr?.transictions_content[0]?.content_id
                                  ?.content?.length === 1 ? (
                                  curr?.transictions_content[0]?.content_id
                                    ?.content[0].media_type === "image" ? (
                                    <img
                                      // src={process.env.REACT_APP_CONTENT + curr?.transictions_content[0]?.content_id?.content[0]?.media}
                                      src={
                                        curr?.transictions_content[0]
                                          ?.content_id?.content[0]?.watermark
                                      }
                                      className="content_img"
                                      alt="Content thumbnail"
                                    />
                                  ) : curr?.transictions_content[0]?.content_id
                                      ?.content[0].media_type === "audio" ? (
                                    <img
                                      src={interview}
                                      alt="Content thumbnail"
                                      className="icn m_auto"
                                    />
                                  ) : curr?.transictions_content[0]?.content_id
                                      ?.content[0].media_type === "video" ? (
                                    <img
                                      // src={process.env.REACT_APP_CONTENT + curr?.transictions_content[0]?.content_id?.content[0]?.thumbnail}
                                      src={
                                        curr?.transictions_content[0]
                                          ?.content_id?.content[0]?.watermark
                                      }
                                      className="content_img"
                                      alt="Content thumbnail"
                                    />
                                  ) : (
                                    "No Content"
                                  )
                                ) : curr?.transictions_content[0]?.content_id
                                    ?.content?.length > 1 ? (
                                 
                                  <div className="content_container">
                                    <div className="content_imgs" style={{minHeight:"60px"}}>
                                      {curr?.transictions_content[0]?.content_id?.content.map(
                                        (value, index) => (
                                          <div
                                            className="content_img_container"
                                            key={value._id}
                                            style={{
                                              display:
                                                index === (currentImageIndices[setId] || 0)
                                                  ? "block"
                                                  : "none",
                                            }}
                                          >
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
                                            ) : (
                                              <img
                                                src={value?.watermark}
                                                className="content_img"
                                                alt="Content thumbnail"
                                              />
                                            )}
                                          </div>
                                        )
                                      )}
                                    </div>
                                    <div
                                      style={{ display: "flex", gap: "2px" }}
                                    >
                                      <span
                                        className="arrow_span"
                                        onClick={() =>
                                          setCurrentImageIndices(prevIndices => {
                                            // console.log("id",setId)
                                            const newIndices = { ...prevIndices };
                                            newIndices[setId] = ((newIndices[setId] || 0) + 1 ) % curr?.transictions_content[0]?.content_id?.content.length;
                                            return newIndices;
                                          })
                                        }
                                      >
                                        <BsArrowLeft />
                                      </span>

                                      <span
                                        className="arrow_span"
                                        onClick={() =>
                                          setCurrentImageIndices(prevIndices => {
                                            const newIndices = { ...prevIndices };
                                            newIndices[setId] = ((newIndices[setId] || 0) - 1 + curr?.transictions_content[0]?.content_id?.content.length) % curr?.transictions_content[0]?.content_id?.content.length;
                                            return newIndices;
                                          })
                                        }
                                      >
                                        <BsArrowRight />
                                      </span>
                                    </div>
                                  </div>
                                ) : (
                                  "null"
                                )
                              ) : (
                                ""
                              )}

                              {curr?.transictions_content.length === 0 &&
                                curr?.transictions_task.length > 0 &&
                                (curr?.transictions_task[0]?.task_content_id
                                  ?.type === "image" ? (
                                  <img
                                    // key={value?._id}
                                    // src={process.env.REACT_APP_UPLOADED_CONTENT + curr?.transictions_task[0]?.task_content_id?.imageAndVideo}
                                    src={
                                      curr?.transictions_task[0]
                                        ?.task_content_id?.videothubnail
                                    }
                                    className="content_img"
                                    alt="Content thumbnail"
                                  />
                                ) : curr?.transictions_task[0]?.task_content_id
                                    ?.type === "audio" ? (
                                  <img
                                    // key={value?._id}
                                    src={interview}
                                    alt="Content thumbnail"
                                    className="icn m_auto"
                                  />
                                ) : curr?.transictions_task[0]?.task_content_id
                                    ?.type === "video" ? (
                                  <img
                                    // key={value?._id}
                                    src={
                                      curr?.transictions_task[0]
                                        ?.task_content_id?.videothubnail
                                    }
                                    alt="Content thumbnail"
                                    className="icn m_auto"
                                  />
                                ) : null)}
                            </Td>

                            <Td>
                              <Flex
                                className="pmnt_cont_type"
                                flexDir={"column"}
                                alignItems={"center"}
                                gap={"8px"}
                              >
                                {curr?.transictions_content.length > 0 &&
                                  curr?.transictions_task.length > 0 && (
                                    <>
                                      <img
                                        src={contentic}
                                        className="icn"
                                        alt=""
                                      />
                                      <img
                                        src={taskic}
                                        className="icn"
                                        alt=""
                                      />
                                    </>
                                  )}

                                {curr?.transictions_content.length > 0 &&
                                  curr?.transictions_task.length === 0 && (
                                    <Tooltip label={"Video"}>
                                    <img
                                      src={contentic}
                                      className="icn"
                                      alt=""
                                    />
                                    </Tooltip>
                                  )}

                                {curr?.transictions_content.length === 0 &&
                                  curr?.transictions_task.length > 0 && (
                                    <img src={taskic} className="icn" alt="" />
                                  )}
                              </Flex>
                            </Td>

                            <Td>&pound; {curr?.recived_from_mediahouse.toFixed(2)}</Td>
                            <Td>&pound; {curr?.presshop_commission.toFixed(2)}</Td>
                            <Td>&pound; {curr?.payable_to_hopper.toFixed(2)}</Td>
                            {/* <Td className="timedate_wrap">
                              <p className="timedate"><img src={watch} className="icn_time" />12:30 Am</p>
                              <p className="timedate"><img src={calendar} className="icn_time" />12 july 2022</p>
                            </Td> */}
                            <Td textAlign="center">
                              {/* <a onClick={() => { history.push(`/admin/payment-view/${curr?._id}`) }}>
                              </a> */}
                              <Button
                                className="theme_btn tbl_btn"
                                onClick={pay}
                              >
                                Pay
                              </Button>
                            </Td>
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
            onPageChange={handlePageChange}
            pageRangeDisplayed={5}
            pageCount={totalPages}
            previousLabel="<"
            renderOnZeroPageCount={null}
          />
        </Card>
      </Box>
      <Share show={show} csv={""} update={""} />
    </>
  );
}
