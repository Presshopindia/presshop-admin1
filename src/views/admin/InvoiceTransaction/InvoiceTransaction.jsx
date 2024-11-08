
// Chakra imports
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,

} from '@chakra-ui/react'
import { Tooltip } from '@chakra-ui/react';


//Table_components


//mui datepicker imports

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
  Checkbox,
  Button,
  Textarea,
  useDisclosure,
  Input,
  InputLeftElement,
  InputGroup,
  useColorModeValue,
} from "@chakra-ui/react";
import interview from "assets/img/icons/interview.svg";
import { BsArrowRight } from "react-icons/bs";
import Card from "components/card/Card";
import React, { useEffect, useState } from "react";
import watch from "assets/img/icons/watch.svg";
import calendar from "assets/img/icons/calendar.svg";
import camera from "assets/img/icons/camera.svg";
import Hphone from "assets/img/icons/Hphone.svg";
import { BsEye } from "react-icons/bs";
import phone from "assets/img/icons/phone.svg";
import chat from "assets/img/icons/chat.svg";
import mail from "assets/img/icons/mail.svg";
import logop from "assets/img/icons/logop.svg";
import crown from "assets/img/icons/crown.png";
import { BsArrowLeft } from "react-icons/bs";

// New-Imports
import video from "assets/img/icons/video.svg";
import auth2 from "assets/img/auth/auth2.svg";
import share from "assets/img/icons/share.png";
import print from "assets/img/icons/print.png";
import star from "assets/img/icons/star.png";
import shared from "assets/img/icons/shared.svg";
import logo from "assets/img/logo.svg";
import { Grid, GridItem } from "@chakra-ui/react";
import contactic from "assets/img/icons/Hphone.svg";
import { useParams } from 'react-router-dom';
import { Post } from 'api/admin.services';
import { Get } from 'api/admin.services';
import moment from 'moment';
import { toast } from 'react-toastify';
import ReactPaginate from 'react-paginate';
import Share from 'components/share/Share';
import ActionSort from 'components/sortfilters/AcrionSort';
import { useHistory } from 'react-router-dom';
import Loader from 'components/Loader';
export default function InvoiceTransaction() {
  const { id, component } = useParams();
  const history = useHistory();
  const [createAction, setCreateAction] = useState({
    mode: 'call',
    coversationWithhopper: '',
    Actiontaken: '',
    send_reminder: false,
    send_statment: false,
    blockaccess: false,
    removeuser: false,
  });

  const [time, setTime] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const perPage = 5;
  const [actionDetails, setActionDetails] = useState([]);
  const [path1, setpath1] = useState('');
  const [path2, setpath2] = useState('');
  const [show, setShow] = useState(false);
  const [csv, setCsv] = useState('');
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState([]);

  const textColor = useColorModeValue('#000', 'white');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const getTrackDetails = async (id) => {
    setLoading(true)
    try {
      const response = await Get(`admin/getallinvoise?id=${id}`);
      setData(response?.data?.resp);
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  };

  useEffect(() => {
    getTrackDetails(id);
  }, [id]);

  const audio = data?.content_id?.content?.filter((curr) => curr?.media_type === 'audio');
  const image = data?.content_id?.content?.filter((curr) => curr?.media_type === 'image');
  const video1 = data?.content_id?.content?.filter((curr) => curr?.media_type === 'video');

  const addAction = async () => {
    if (
      !createAction.mode ||
      !createAction.coversationWithhopper ||
      !createAction.Actiontaken ||
      createAction.mode.trim() === '' ||
      createAction.coversationWithhopper.trim() === '' ||
      createAction.Actiontaken.trim() === ''
    ) {
      // console.log(createAction)
      toast.error('Required');
    } else {
      let obj = {
        Payment_id: id,
        type: 'invoice',
        coversationWithhopper: createAction?.coversationWithhopper,
        Actiontaken: createAction?.Actiontaken,
        mode: createAction?.mode,
        send_reminder: createAction?.send_reminder,
        send_statment: createAction?.send_statment,
        blockaccess: createAction?.blockaccess,
        removeuser: createAction?.removeuser,
      };

      try {
        await Post('admin/addactiondetails', obj);
        toast.success('Action Added');
        setCreateAction({
          mode: 'call',
          coversationWithhopper: '',
          Actiontaken: '',
          send_reminder: false,
          send_statment: false,
          blockaccess: false,
          removeuser: false,
        });
        onClose();
        getActionDetails(currentPage);
      } catch (error) {
        setLoading(false)
      }
    }
  };

  const handleChange = (event) => {
    const { name, value, checked } = event.target;
    setCreateAction((prevAction) => ({
      ...prevAction,
      [name]: value || checked,
    }));
  };

  // console.log(createAction)
  
  const downloadCsvActionDetails = async (page) => {
    const offset = (page - 1) * perPage;
    try {
      const response = await Get(`admin/getactiondetails?type=invoice&limit=${perPage}&offset=${offset}`);
      if (response) {
        const onboardinPrint = response?.data?.fullPath;
        window.open(onboardinPrint);
      }
    } catch (err) {
      // console.log('<---Have an error ->', err);
    }
  };

  const getActionDetails = async (page, parametersName, parameters) => {
    setLoading(true)
    const offset = (page - 1) * perPage;
    try {
      await Get(`admin/getactiondetails?type=invoice&limit=${perPage}&offset=${offset}&${parametersName}=${parameters}&Payment_id=${id}`).then((res) => {
        setTime(res?.data?.response[res?.data?.response.length - 1]?.updatedAt);
        setActionDetails(res?.data?.response);
        setpath2(res?.data?.fullPath);
        setTotalPages(res?.data?.count / perPage);
        setLoading(false);
      });
    } catch (err) { }
  };

  useEffect(() => {
    getActionDetails(currentPage);
  }, [currentPage]);

  const handleClose = () => {
    setShow(!show);
  };

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected + 1);
  };

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
    getActionDetails(currentPage, parametersName, parameters);
    setParams({
      parameters: "",
      parametersName: "",
    })
    closeSort()
  };

  return (
    <>
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
          mb='24px'
          pb="20px"
          overflowX={{ sm: "scroll", lg: "hidden" }}>
          <Flex py="15px"
            align='start'
            justifyContent="space-between"
            className="Top_Invoice_header" >
            <div className="Top_Invoice_Logo ">
              <img src={logo} className="sideLogo" alt="content thumnail" />
            </div>
            <div className="Invoice_Gen_Date">
              <Text
                mb="20px"
                color={textColor}
                fontSize='40px'
                fontWeight="700"
                fontFamily={"AirbnbBold"}
                lineHeight='100%'>
                Invoice
              </Text>
              <div className="timedate_wrape">
                <p className=" timedate"><img src={calendar} className="icn_time" />{moment(data?.createdAt).format(`DD MMMM YYYY`)}</p>
              </div>
            </div>
          </Flex>
          <Flex my='15px'
            align='center'
            justifyContent="space-between"
            gap="5px" fontSize='13px' className="invoice_details">
            <div className="">
              <span className="number">Invoice</span>
              <span className="invoice_number">#{" "}{data?.invoiceNumber || data?._id}</span>
            </div>
            <div className="">
              <span className="number">Transaction ID</span>
              <span className="invoice_number"> {data?._id}</span>
            </div>
          </Flex>
          <Grid
            templateColumns='repeat(4, 1fr)'
            gap={'25px'}>

            <GridItem colSpan={2}
              h='174px'
              p="17px 20px" className="invoice_wrapper">
              <div className="Invoice_generated_By">
                <Text className="text_title">From</Text>
                <Text className="text_title_com">
                  {data?.admin_id?.office_details?.company_name}
                </Text>
                <Text className="text_sub_title d_flex" mb="4px">
                  <span> {data?.admin_id?.office_details?.address}</span>
                  {/* <span> Shepherds Bush </span>
                    <span>London W12 8LE </span> */}
                  {/* <span>{data?.hopper_id?.address}</span> */}
                </Text>
                <Text className="text_sub_title d_flex">
                  <span>Company # {data?.admin_id?.office_details?.company_number} </span>
                  <span> VAT # {data?.admin_id?.office_details?.company_vat}</span>
                </Text>
              </div>
            </GridItem>
            <GridItem colSpan={2} h='174px' p="17px 20px" className="invoice_wrapper">
              <Flex align="start" justifyContent="space-between" >
                <div className="Invoice_generated_To " >
                  <Text className="text_title">To</Text>
                  <Text className="text_title_com" >{data?.media_house_id?.company_name}</Text>
                  <Text className="text_sub_title d_flex" mb="24px">
                    <span>{data?.media_house_id?.office_details[0]?.address?.complete_address}</span>

                    {/* <span>5 Canada Square. Canary Wharf. London</span> */}
                    {/* <span>E14 5AQ</span> */}

                  </Text>
                  <Text className="text_sub_title d_flex">
                    <span>Company # {data?.media_house_id?.company_number} </span>

                    <span> VAT # {data?.media_house_id?.company_vat}</span>

                  </Text>
                </div>
                <div className="company_logo invtrn_pbllogo">
                  <img src={data?.media_house_id?.profile_image} alt="" />
                </div>
              </Flex>
            </GridItem>



            <GridItem colSpan={3}>
              <Card className="invoice_wrapper"
                direction='column'
                w='100%'
                px='15px'
                bg="#F3F5F4"
                p='15px'
                pe='41px'
                height="100%"
                overflowX={{ sm: "scroll", lg: "hidden" }}>
                <Flex px='0px' justify='start' mb='5px' align='center'>
                  <Text
                    color={textColor}
                    fontSize='13px'
                    lineHeight='100%'
                    fontFamily={"AirbnbBold"}>
                    Invoice details
                  </Text>
                </Flex>
                <TableContainer display="flex" flexDirection="column" h="100%">
                  <Table variant='simple' className="common_table">
                    <Thead>
                      <Tr>
                        <Th>Content</Th>
                        <Th>Description</Th>
                        <Th>Time & date</Th>
                        <Th className='text_center'>Type</Th>
                        <Th className='text_center'>License</Th>
                        <Th className='text_center'>Category</Th>
                        <Th>Amount</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      <Tr>

                        <Td onClick={() => history.push(`/admin/live-published-content/${data?.content_id?._id}/Manage content`)} style={{cursor:"pointer"}}> 
                          {data?.type === "content" ? (
                            data?.content_id?.content.length === 1 ? (
                              data?.content_id?.content[0].media_type === "image" ? (
                                <img
                                  src={process.env.REACT_APP_CONTENT + data?.content_id?.content[0]?.media}
                                  className="content_img"
                                  alt="Content thumbnail"
                                />
                              ) : data?.content_id?.content[0].media_type === "audio" ? (
                                <img src={interview} alt="Content thumbnail" className="icn m_auto" />
                              ) : data?.content_id?.content[0].media_type === "video" ? (
                                <img
                                  src={process.env.REACT_APP_CONTENT + data?.content_id?.content[0]?.thumbnail}
                                  className="content_img"
                                  alt="Content thumbnail"
                                />
                              ) : (
                                "no content"
                              )
                            ) : data?.content_id?.content.length === 0 ? (
                              "no content"
                            ) : (
                              data?.content_id?.content.length > 1 && (
                                <div className="content_imgs_wrap contnt_lngth_wrp">

                                  <div className="content_imgs">
                                    {data?.content_id?.content.map((value) => (
                                      <>
                                        {value.media_type === "image" ? (
                                          <img
                                            src={process.env.REACT_APP_CONTENT + value.media}
                                            className="content_img"
                                            alt="Content thumbnail"
                                          />
                                        ) : value.media_type === "audio" ? (
                                          <img src={interview} alt="Content thumbnail" className="icn m_auto" />
                                        ) : (
                                          <img
                                            src={process.env.REACT_APP_CONTENT + value?.thumbnail}
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
                            )
                          ) : data?.type === "task_content" ? (
                            <>
                              {data?.task_content_id?.type === "image" ? (
                                <img
                                  src={process.env.REACT_APP_UPLOADED_CONTENT + data?.task_content_id?.imageAndVideo}
                                  className="content_img"
                                  alt="Content thumbnail"
                                />
                              ) : data?.task_content_id?.type === "video" ? (
                                <img
                                  src={process.env.REACT_APP_UPLOADED_CONTENT + data?.task_content_id?.videothubnail}
                                  className="content_img"
                                  alt="Content thumbnail"
                                />
                              ) : data?.task_content_id?.type === "audio" ? (
                                "audio"
                              ) : (
                                ""
                              )}
                            </>
                          ) : (
                            ""
                          )}


                        </Td>

                        <Td className="description_details">
                          <p className="desc_ht">
                            <span>{data?.content_id?.description || data?.task_content_id?.task_id?.task_description}</span>
                          </p>
                        </Td>

                        <Td className="timedate_wrap">
                          <p className="timedate"><img src={watch} className="icn_time" />{moment(data?.content_id?.createdAt).format(`hh:mm A`)}</p>
                          <p className="timedate"><img src={calendar} className="icn_time" />{moment(data?.content_id?.createdAt).format(`DD MMM YYYY`)}</p>
                        </Td>
                        <Td className="text_center">
                        
                          <div className="dir_col text_center">
                            {data?.type === "content" ? (
                              <>
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
                                <Tooltip label={"Photo"}>
                                  <img
                                    src={camera}
                                    alt="Content thumbnail"
                                    className="icn m_auto"
                                  />
                                </Tooltip>
                              )}
                              </>
                            ) : data?.type === "task_content" ? (
                              <>
                                {data?.task_content_id?.type === "image" ? (
                                  <Tooltip label={"Photo"}><img src={camera} alt="Content thumbnail" className="icn m_auto" /></Tooltip>
                                ) : data?.task_content_id?.type === "video" ? (
                                  <Tooltip label={"Video"}><img src={video} alt="Content thumbnail" className="icn m_auto" /></Tooltip>
                                ) : data?.task_content_id?.type === "audio" ? (
                                  <Tooltip label={"Interview"}><img src={interview} alt="Content thumbnail" className="icn m_auto" /></Tooltip>
                                ) : (
                                  ""
                                )}
                              </>
                            ) : (
                              ""
                            )}


                          </div>
                        
                        </Td>

                        <Td className="text_center">
                        {data?.content_id?.Vat[0]?.purchased_content_type == "shared" ? (
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


                        <Td className='text_center'>
                          {data?.type === "content" ?
                            <Tooltip label={data?.content_id?.category_id?.name}>
                              {<img src={data?.content_id?.category_id?.icon} className="icn m_auto" />}
                            </Tooltip>
                            :
                            <Tooltip label={data?.task_content_id?.task_id?.category_id?.name}>
                              {<img src={data?.task_content_id?.task_id?.category_id?.icon} className="icn m_auto" />}
                            </Tooltip>
                          }
                        </Td>

                        <Td>
                          <span className="m_left_auto">&pound; {data?.amount}</span></Td>
                      </Tr>
                    </Tbody>
                  </Table>
                  <div className="Invoice_total">
                    <Flex mt='15px' align="start" justifyContent="start" flexDirection="column" >
                      <Flex align="center" justifyContent="space-between" className="payment_d_wrap">
                        <span className="text_title">Subtotal</span>
                        <span className="Payment_txt">&pound; {data?.amount - data?.Vat}</span>
                      </Flex>
                      <Flex align="center" justifyContent="space-between" className="payment_d_wrap">
                        <span className="text_title">VAT @20%</span>
                        <span className="Payment_txt">&pound; {data?.Vat}</span>
                      </Flex>
                      <Flex align="center" justifyContent="space-between" className="payment_d_wrap">
                        <span className="text_title">Total</span>
                        <span className="Payment_txt text_bold">&pound; {data?.amount}</span>
                      </Flex>
                      <Flex align="center" justifyContent="space-between" className="payment_d_wrap">
                        <span className="text_title">Paid</span>
                        <span className="Payment_txt">&pound; {data?.amount}</span>
                      </Flex>
                      <Flex align="center" justifyContent="space-between" className="payment_d_wrap">
                        <span className="text_title">Balance due</span>
                        <span className="Payment_txt text_bold">&pound; 0</span>
                      </Flex>
                    </Flex>
                  </div>
                </TableContainer>
              </Card>
            </GridItem>
            <GridItem rowSpan={1} colSpan={1} p="15px" px='15px' className="invoice_wrapper">
              <Text
                fontSize="13px" fontFamily="AirbnbBold" paddingBottom="23px">
                Payment received details
              </Text>
              <Flex align="start" justifyContent="start" flexDirection="column" >
                <Flex align="center" justifyContent="space-between" className="payment_d_wrap">
                  <span className="text_title">Payment received</span>
                  <span className="Payment_txt text_bold">&pound; {data?.amount}</span>
                </Flex>
                <Flex align="center" justifyContent="space-between" className="payment_d_wrap">
                  <span className="text_title">VAT received</span>
                  <span className="Payment_txt">&pound; {data?.Vat}</span>
                </Flex>
                <Flex gap='5px' align="center" justifyContent="space-between" className="payment_d_wrap">
                  <span className="text_title">Payment received date</span>
                  <span className="Payment_recievd Payment_txt"><img src={calendar} className="icn" alt="" />{moment(data?.createdAt).format(`DD MMM YYYY`)}</span>
                </Flex>
                <Flex gap='5px' align="center" justifyContent="space-between" className="payment_d_wrap border_bottom">
                  <span className="text_title">Payment receivable</span>
                  <span className="Payment_recievd Payment_txt">&pound; 0</span>
                </Flex>
                <Flex mt='15px' align="start" justifyContent="start" flexDirection="column" className="payment_d_wrap rcvd_from">
                  <span className="text_title Bnk_dtl">Received from</span>
                  <span className="Payment_txt">{data?.media_house_id?.company_bank_details?.bank_name} </span>
                  <span className="Payment_txt">Sort Code - {data?.media_house_id?.company_bank_details?.sort_code}</span>
                  <span className="Payment_txt">Account - {data?.media_house_id?.company_bank_details?.account_number}</span>
                </Flex>
                <Flex align="start" justifyContent="start" flexDirection="column" className="payment_d_wrap rcvd_from">
                  <span className="text_title Bnk_dtl">Received in</span>
                  {data?.admin_id?.bank_details ? (
                    <>
                      <span className="Payment_txt">{data?.admin_id?.bank_details?.bank_name}</span>
                      <span className="Payment_txt">Sort Code - {data?.admin_id?.bank_details?.sort_code}</span>
                      <span className="Payment_txt">Account - {data?.admin_id?.bank_details?.account_number}</span>
                    </>
                  ) : (
                    <span className="Payment_txt">Bank details not available.</span>
                  )}

                </Flex>
              </Flex>
            </GridItem>
          </Grid>
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
                  <Th>Action</Th>
                  <Th>Conversation with Publication</Th>
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
                        <Td>London</Td>
                        <Td className="text_center">
                          {curr?.mode === "chat" && <img src={chat} alt="Content thumbnail" className="icn" />}
                          {curr?.mode === "email" && <img src={mail} className="icn" />}
                          {curr?.mode === "call" && <img src={Hphone} alt="Content thumbnail" className="icn" />}
                          {!curr?.mode && "no mode"}
                        </Td>
                        <Td className="contact_details">


                          {curr?.mode === "call" &&
                            <div className="mobile detail_itm wrd_brk align_start flex_column">
                              <img src={phone} className="icn" alt="" />
                              <span>{curr?.admin_id?.country_code}&nbsp;{curr?.admin_id?.phone}</span>
                            </div>
                          }
                          {curr?.mode === "email" &&
                            <div className="mobile detail_itm wrd_brk align_start flex_column">
                              <img src={mail} className="icn" alt="" />
                              <span>{curr?.admin_id?.email}</span>
                            </div>
                          }
                          {curr?.mode === "chat" &&
                            <div className="mobile detail_itm wrd_brk align_start flex_column">
                              <p className="timedate chat">
                                <img src={logop} className="icn vrtcl_mdl" alt="" /> Presshop chat</p>
                              <a onClick={() => { history.push("/admin/chat") }}><BsEye className="icn_time" />View</a>
                            </div>
                          }
                        </Td>

                        <Td>
                          <div className="check_wrap check_wrapper">
                            <Checkbox
                              colorScheme='brandScheme'
                              me='10px'
                              defaultChecked={curr?.send_reminder}
                              disabled
                            />
                            <span>Sent reminder</span>
                          </div>
                          <div className="check_wrap check_wrapper">
                            <Checkbox
                              colorScheme='brandScheme'
                              me='10px'
                              defaultChecked={curr?.send_statment}
                              disabled


                            />
                            <span>Sent statement</span>
                          </div>
                          <div className="check_wrap check_wrapper">
                            <Checkbox
                              colorScheme='brandScheme'
                              me='10px'
                              defaultChecked={curr?.blockaccess}
                              disabled


                            />
                            <span>Blocked</span>
                          </div>
                          <div className="check_wrap check_wrapper">
                            <Checkbox
                              colorScheme='brandScheme'
                              me='10px'
                              defaultChecked={curr?.removeuser}
                              disabled

                            />
                            <span>Removed</span>
                          </div>
                        </Td>

                        {/* <Td className="item_detail">
                          <img src={process.env.REACT_APP_HOPPER_AVATAR + curr?.hopper_id?.avatar_id?.avatar} alt="Content thumbnail" />
                          <Text className="nameimg">
                            <span className="txt_mdm"> {`${curr?.hopper_id?.first_name} ${curr?.hopper_id?.last_name}`} </span>
                            <br />
                            <span>({curr?.hopper_id?.user_name})</span>
                          </Text>
                        </Td> */}
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

      <Modal className="action_modal_wrap" isOpen={isOpen} onClose={onClose} show>
        <ModalOverlay />
        <ModalContent className="action_modal_cont">
          <ModalBody>
            <Text
              fontFamily='AirbnbBold'
              fontSize='35px'
              mb='43px'>
              Update action taken
            </Text>
            <div className="action_modal_body">
              <div className="dtl_wrap mdl_itms">
                <Flex className="edit_inputs_wrap" px='0px' justify='space-between' gap='20px' mb="0px" align='center'>
                  <div className="mdl_inp" flex={1}>
                    <Text mb='6px'
                      fontSize='13px'
                      fontFamily='AirbnbMedium'>
                      Choose date
                    </Text>
                    <InputGroup>
                      <InputLeftElement
                        pointerEvents='none'>
                        <img src={calendar} className="mdl_icn" alt="" />
                      </InputLeftElement>
                      <Input className="disabled" disabled value={moment(time).format(`DD/MM/YYYY`)} />
                    </InputGroup>
                  </div>
                  <div className="mdl_inp" flex={1}>
                    <Text mb='6px'
                      fontSize='13px'
                      fontFamily='AirbnbMedium'>
                      Time
                    </Text>
                    <InputGroup>
                      <InputLeftElement
                        pointerEvents='none'>
                        <img src={watch} className="mdl_icn" alt="" />
                      </InputLeftElement>
                      <Input className="disabled" disabled value={moment(time).format(`DD/MM/YYYY`)} />
                      <Input className="disabled" disabled value={moment(time).format(`hh:mm A`)} />

                    </InputGroup>
                  </div>
                </Flex>
                <div className="modal_inp_half">
                  <Text mb='6px'
                    fontSize='13px'
                    fontFamily='AirbnbMedium'>
                    Mode
                  </Text>
                  <div className="select_wrapper">
                    <img className="location-icon" src={contactic} alt="" />
                    <Select className="icon_left_side" id="mdl_slct"
                      name="mode"
                      value={createAction?.mode}
                      onChange={handleChange}
                    >
                      <option value='call'>Call</option>
                      <option value='email'>Email</option>
                      <option value='chat'>Presshop Chat</option>
                    </Select>
                  </div>
                </div>

                <Flex className='inv_mdl_checks' justify='space-between' mb='10px' align='center'>
                  <div className="check_wrap check_wrapper">

                    <Checkbox
                      colorScheme='brandScheme'
                      me='10px'
                      name="send_reminder"
                      isChecked={createAction?.send_reminder}
                      onChange={handleChange}
                    />

                    <span>Sending reminder</span>
                  </div>
                  <div className="check_wrap check_wrapper">

                    <Checkbox
                      colorScheme='brandScheme'
                      me='10px'
                      name="send_statment"
                      isChecked={createAction?.send_statment}
                      onChange={handleChange}
                    />


                    <span>Sending statement</span>
                  </div>
                  <div className="check_wrap check_wrapper">

                    <Checkbox
                      colorScheme='brandScheme'
                      me='10px'
                      name="blockaccess"
                      checked={createAction?.blockaccess}
                      onChange={handleChange} />

                    <span>Blocking access</span>
                  </div>
                  <div className="check_wrap check_wrapper">

                    <Checkbox
                      colorScheme='brandScheme'
                      me='10px'
                      name="removeuser"
                      checked={createAction?.removeuser}
                      onChange={handleChange}

                    />

                    <span>Removing from <b> PRESSHOP</b></span>
                  </div>
                </Flex>

                <div className="">
                  <Text mb='6px'
                    fontSize='13px'
                    fontFamily='AirbnbMedium'>
                    Enter conversation details with the hopper
                  </Text>
                  <Textarea placeholder='Please enter details...'
                    name="coversationWithhopper"
                    value={createAction?.coversationWithhopper}
                    onChange={handleChange}
                  />
                </div>
                <div className="">
                  <Text mb='6px'
                    fontSize='13px'
                    fontFamily='AirbnbMedium'>
                    Enter conversation details with publications
                  </Text>
                  <Textarea placeholder='Please enter details...'
                    name="Actiontaken"
                    value={createAction?.Actiontaken}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="save_btn_wrap">
                <Button className="btn_bg" onClick={addAction}>Save</Button>
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Share show={show} csv={csv} update={handleClose} />

    </>
  );
}
