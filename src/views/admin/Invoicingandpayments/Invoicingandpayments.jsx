import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Box,
  Flex,
  Text,
  SimpleGrid,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Button,
  Td,
  TableContainer,
  useColorModeValue,
  Select,
  Checkbox,
  Textarea,
} from "@chakra-ui/react";
import Card from "components/card/Card";
import { BsEye, BsArrowUp, BsArrowDown } from "react-icons/bs";
import moment from "moment";
import { Get, Post, Patch } from "api/admin.services";
import { toast } from "react-toastify";
import Share from "components/share/Share";
import watch from "assets/img/icons/watch.svg";
import calendar from "assets/img/icons/calendar.svg";
import share from "assets/img/icons/share.png";
import print from "assets/img/icons/print.png";
import conImg from "assets/img/icons/content1.svg";
import content from "assets/img/icons/content.png";
import ReactPaginate from "react-paginate";
import SortFilterInvoicing from "components/sortfilters/SortFilterInvoicing";
import SortFilterTop from "components/sortfilters/SortFilterTop";
import Loader from "components/Loader";
import interview from "assets/img/icons/interview.svg";
import docic from "assets/img/icons/contentdoc.svg";
import pdfic from "assets/img/icons/contentpdf.svg";
import { BsArrowRight } from "react-icons/bs";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { Tooltip } from "@chakra-ui/react";


export default function Invoicingandpayments() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const history = useHistory();
  const textColor = useColorModeValue("#000", "black");
  const [invoice, setInvoice] = useState([]);
  const [reports, setReports] = useState();
  const [counts, setCounts] = useState();
  const [payment, setPayment] = useState();
  const [path1, setPath1] = useState("");
  const [path2, setPath2] = useState("");
  const [csv, setCsv] = useState("");
  const [show, setShow] = useState(false);
  const invoicePage = queryParams.get('invoice');
  const [currentPage, setCurrentPage] = useState(invoicePage || 1);
  const [totalPages, setTotalPages] = useState(0);
  const paymentPage = queryParams.get('payment');
  const [currentPage1, setCurrentPage1] = useState(paymentPage || 1);
  const [totalPages1, setTotalPages1] = useState(0);
  const perPage = 5;
  const [loading, setLoading] = useState(false);
  const handleClose = () => {
    setShow(!show);
  };

  const getInvoice = async (
    page,
    parametersName,
    parameters,
    parametersName1,
    parameters1
  ) => {
    const offset = (page - 1) * perPage;
    setLoading(true);
    try {
      const response = await Get(
        `admin/getallinvoise?limit=${perPage}&offset=${offset}&${parametersName}=${parameters}&${parametersName1}=${parameters1}`
      );
      setInvoice(response?.data?.resp);
      setPath1(response?.data?.fullPath);
      setTotalPages(response?.data?.count / perPage);
      setLoading(false);
    } catch (error) {
      // Handle error
      setLoading(false);
    }
  };

  const getPayments = async (
    page,
    parametersName,
    parameters,
    parametersName1,
    parameters1
  ) => {
    const offset = (page - 1) * perPage;
    try {
      const response = await Get(
        `admin/getallinvoise?limit=${perPage}&offset=${offset}&${parametersName}=${parameters}&${parametersName1}=${parameters1}`
      );
      if (response) {
        setPayment(response?.data?.resp);
        setPath2(response?.data?.fullPath);
        setTotalPages1(response?.data?.count / perPage);
        setLoading(false);
      }
    } catch (error) {
      // Handle error
      setLoading(false);
    }
  };

  const reportsOfPayments = async (parametersName, parameters) => {
    setLoading(true);
    let obj = {
      [parametersName]: parameters,
    };
    try {
      const response = await Post(`admin/invoice/payments`, obj);
      setReports(response?.data);
    } catch (error) {
      // Handle error
      setLoading(false);
    }
  };

  const createTransactionHistory = async (index) => {
    let obj = {
      payment_id: invoice[index]._id,
      mediahouse_id: invoice[index].media_house_id?.id,
      latestAdminRemark: invoice[index]?.latestAdminRemark,
      mode: invoice[index].mode,
      send_reminder: invoice[index].send_reminder,
      send_statment: invoice[index].send_statment,
      blockaccsess: invoice[index].blockaccsess,
      remove: invoice[index].remove,
    };

    try {
      await Patch(`admin/editHopperPayment`, obj);
      toast.success("Updated Successfully");
      getInvoice(currentPage);
    } catch (error) {
      // Handle error
      setLoading(false);
    }
  };

  const createPaymentHistory = async (index) => {
    let obj = {
      payment_id: payment[index]._id,
      hopper_id: payment[index]?.hopper_id?.id,
      latestAdminRemark: payment[index].payment_remarks,
      mode: payment[index].payment_mode,
      send_statment: payment[index].payment_send_statment,
      blockaccsess: payment[index].payment_blockaccsess,
      remove: payment[index].payment_remove,
    };

    try {
      await Patch(`admin/editHopperPaymentforHopper`, obj);
      toast.success("Updated Successfully");
      getPayments(currentPage1);
    } catch (error) {
      // Handle error
      setLoading(false);
    }
  };

  useEffect(() => {
    getInvoice(currentPage);
    getPayments(currentPage1);
    reportsOfPayments();
    // getReport();
  }, [currentPage, currentPage1]);

  const handlePageChangeInvoicing = (selectedPage) => {
    setCurrentPage(selectedPage.selected + 1);
    history.push(`?invoice=${selectedPage.selected + 1}`);
  };

  const handlePageChangePayment = (selectedPage) => {
    setCurrentPage1(selectedPage.selected + 1);
    history.push(`?payment=${selectedPage.selected + 1}`);
  };

  const downloadInvoicingCsv = async (page) => {
    try {
      const response = await Get(`admin/getallinvoise`);
      if (response) {
        const path = response?.data?.fullPath;
        window.open(path);
      }
    } catch (err) {
    }
  };

  const downloadPaymentCsv = async (page) => {
    try {
      const response = await Get(`admin/getallinvoise`);
      if (response) {
        const path = response?.data?.fullPath;
        window.open(path);
      }
    } catch (err) {
      // console.log("<---Have an error ->", err);
    }
  };

  // sorting

  const [hideShow, setHideShow] = useState({
    status: false,
    type: "",
  });

  const [parameters, setParameters] = useState("");
  const [parametersName, setParametersName] = useState("");
  const [parameters1, setParameters1] = useState("");
  const [parametersName1, setParametersName1] = useState("");

  const closeSort = () => {
    setHideShow((prevHideShow) => ({
      ...prevHideShow,
      status: false,
      type: "",
    }));
  };

  const collectSortParms = (name, order) => {
    setParameters(order);
    setParametersName(name);
  };

  const collectSortParms1 = (name1, order1) => {
    setParametersName1(name1);
    setParameters1(order1);
  };

  const handleApplySorting = () => {
    if (hideShow?.type === "Invoice") {
      getInvoice(
        currentPage,
        parametersName,
        parameters,
        parametersName1,
        parameters1
      );
      setParameters("");
      setParametersName("");
      setParametersName1("");
      setParameters1("");
      closeSort();
    } else if (hideShow?.type === "Payments") {
      getPayments(
        currentPage1,
        parametersName,
        parameters,
        parametersName1,
        parameters1
      );
      setParameters("");
      setParametersName("");
      setParametersName1("");
      setParameters1("");
      closeSort();
    } else {
      reportsOfPayments(parametersName, parameters);
      setParameters("");
      setParametersName("");
      setParametersName1("");
      setParameters1("");
      closeSort();
    }
  };

  return (
    <>
      <Box className="inv_pg" pt={{ base: "130px", md: "80px", xl: "80px" }}>
        {/* {loading && <Loader />} */}
        <SimpleGrid
          className="inv_top_cards invoicing_crds_wrap"
          columns={{ base: 1, md: 2, lg: 4, "2xl": 6 }}
          gap="20px"
          mb="25px"
        >
          {/* Top cards start */}
          <div className="card dash-top-cards">
            <div className="cardcontent dash-c-body">
              <div className="cardCustomHead cardHeader">
                <div className="select_wrap">
                  <div className="fltr_btn">
                    <Text fontSize={"15px"}>
                      <span
                        onClick={() =>
                          setHideShow((prevHideShow) => ({
                            ...prevHideShow,
                            status: true,
                            type: "sortContentSold",
                          }))
                        }
                      >
                        Sort
                      </span>
                    </Text>
                    {hideShow.type === "sortContentSold" && (
                      <SortFilterTop
                        hideShow={hideShow}
                        closeSort={closeSort}
                        sendDataToParent={collectSortParms}
                        handleApplySorting={handleApplySorting}
                      />
                    )}
                  </div>
                </div>
              </div>
              <Flex px="20px" align="center" className="inv_top_txt card-grwth">
                <Text
                  fontStyle="20px"
                  lineHeight="28px"
                  fontFamily="AirbnbBold"
                  color="black"
                  fontSize="20px"
                  me="5px"
                  fontWeight="700"
                  variant="body2"
                  className="top_txt_bg card-head-txt hd_txt mb-2"
                >
                  {reports?.content_sold?.count}
                </Text>
                <Text
                  color="black"
                  fontSize="12px"
                  fontWeight="300"
                  lineHeight="24px"
                >
                  Content sold
                </Text>
              </Flex>
              <Flex
                mt="5px"
                mb="10px"
                px="20px"
                align="center"
                className="inv_mdl_txt"
              >
                <Text
                  fontSize="30px"
                  lineHeight="48px"
                  fontFamily="AirbnbBold"
                  whiteSpace="nowrap"
                  color="black"
                  letterSpacing={0.3}
                  me="5px"
                >
                  &pound; {reports?.content_sold?.constentsold.toLocaleString()}
                </Text>
              </Flex>
              <Text
                sx={{ fontSize: 15 }}
                fontSize="15px"
                fontFamily="AirbnbMedium"
                className="cardcontent_head inv_btm_txt"
              >
                Revenues
              </Text>
              <Flex align="center" className="card_grth">
                {reports?.content_sold?.type === "increase" ? (
                  <Text
                    fontFamily="AirbnbMedium"
                    color="#10AF0C"
                    fontWeight={500}
                    me="5px"

                  >
                    <BsArrowUp /> {reports?.content_sold?.percentage.toFixed(2)}%
                  </Text>
                ) : (
                  <Text
                    fontFamily="AirbnbMedium"
                    color="red"
                    fontWeight={500}
                    me="5px"
                  >
                    <BsArrowDown /> {reports?.content_sold?.percentage.toFixed(2)}%
                  </Text>
                )}
                <Text color="black" fontSize="15px" fontWeight="300">
                  since last{" "}
                  {hideShow?.type === "sortContentSold" &&
                    parameters === "daily"
                    ? "Daily"
                    : hideShow?.type === "sortContentSold" &&
                      parameters === "weekly"
                      ? "week"
                      : hideShow?.type === "sortContentSold" &&
                        parameters === "monthly"
                        ? "month"
                        : hideShow?.type === "sortContentSold" &&
                          parameters === "yearly"
                          ? "year"
                          : "month"}
                </Text>
              </Flex>
            </div>
          </div>
          <div className="card dash-top-cards">
            <div className="cardcontent dash-c-body">
              <div className="cardCustomHead cardHeader">
                <div className="select_wrap">
                  <div className="fltr_btn">
                    <Text fontSize={"15px"}>
                      <span
                        onClick={() =>
                          setHideShow((prevHideShow) => ({
                            ...prevHideShow,
                            status: true,
                            type: "sortInvoices_raised",
                          }))
                        }
                      >
                        Sort
                      </span>
                    </Text>
                    {hideShow.type === "sortInvoices_raised" && (
                      <SortFilterTop
                        hideShow={hideShow}
                        closeSort={closeSort}
                        sendDataToParent={collectSortParms}
                        handleApplySorting={handleApplySorting}
                      />
                    )}
                  </div>
                </div>
              </div>
              <Flex align="center" className="card_grth card-grwth inv_top_txt">
                <Text
                  fontStyle="20px"
                  lineHeight="28px"
                  fontFamily="AirbnbBold"
                  color="black"
                  fontSize="20px"
                  me="5px"
                  fontWeight="700"
                  variant="body2"
                  className="top_txt_bg card-head-txt hd_txt mb-2"
                >
                  {reports?.invoices_Raised?.count}
                </Text>
                <Text
                  color="black"
                  fontSize="12px"
                  fontWeight="300"
                  lineHeight="24px"
                >
                  Number of invoices
                </Text>
              </Flex>
              <Flex
                mt="5px"
                mb="10px"
                px="20px"
                align="center"
                className="inv_mdl_txt"
              >
                <Text
                  fontSize="30px"
                  lineHeight="48px"
                  fontFamily="AirbnbBold"
                  whiteSpace="nowrap"
                  color="black"
                  letterSpacing={0.3}
                  me="5px"
                >
                  &pound; {reports?.invoices_Raised?.invoices_Raised.toLocaleString()}
                </Text>
              </Flex>
              <Text
                sx={{ fontSize: 15 }}
                fontSize="15px"
                fontFamily="AirbnbMedium"
                className="cardcontent_head inv_btm_txt"
              >
                Invoices raised
              </Text>
              <Flex align="center" className="card_grth">
                {reports?.invoices_Raised?.type === "increase" ? (
                  <Text
                    fontFamily="AirbnbMedium"
                    color="#10AF0C"
                    fontWeight={500}
                    me="5px"
                  >
                    <BsArrowUp /> {reports?.invoices_Raised?.percentage.toFixed(2)}%
                  </Text>
                ) : (
                  <Text
                    fontFamily="AirbnbMedium"
                    color="red"
                    fontWeight={500}
                    me="5px"
                  >
                    <BsArrowDown /> {reports?.invoices_Raised?.percentage.toFixed(2)}%
                  </Text>
                )}
                <Text color="black" fontSize="13px" fontWeight="300">
                  since last{" "}
                  {hideShow?.type === "sortInvoices_raised" &&
                    parameters === "daily"
                    ? "Daily"
                    : hideShow?.type === "sortInvoices_raised" &&
                      parameters === "weekly"
                      ? "week"
                      : hideShow?.type === "sortInvoices_raised" &&
                        parameters === "monthly"
                        ? "month"
                        : hideShow?.type === "sortInvoices_raised" &&
                          parameters === "yearly"
                          ? "year"
                          : "month"}
                </Text>
              </Flex>
            </div>
          </div>
          <div className="card dash-top-cards">
            <div className="cardcontent dash-c-body">
              <div className="cardCustomHead cardHeader">
                <div className="select_wrap">
                  <div className="fltr_btn">
                    <Text fontSize={"15px"}>
                      <span
                        onClick={() =>
                          setHideShow((prevHideShow) => ({
                            ...prevHideShow,
                            status: true,
                            type: "sortPayment_received",
                          }))
                        }
                      >
                        Sort
                      </span>
                    </Text>
                    {hideShow.type === "sortPayment_received" && (
                      <SortFilterTop
                        hideShow={hideShow}
                        closeSort={closeSort}
                        sendDataToParent={collectSortParms}
                        handleApplySorting={handleApplySorting}
                      />
                    )}
                  </div>
                </div>
              </div>
              <Flex align="center" className="card_grth card-grwth inv_top_txt">
                <Text
                  fontStyle="20px"
                  lineHeight="28px"
                  fontFamily="AirbnbBold"
                  color="black"
                  fontSize="20px"
                  me="5px"
                  fontWeight="700"
                  variant="body2"
                  className="top_txt_bg card-head-txt hd_txt mb-2"
                >
                  {reports?.Payment_received?.count}
                </Text>
                <Text
                  color="black"
                  fontSize="12px"
                  fontWeight="300"
                  lineHeight="24px"
                >
                  Number of publications
                </Text>
              </Flex>
              <Flex
                mt="5px"
                mb="10px"
                px="20px"
                align="center"
                className="inv_mdl_txt"
              >
                <Text
                  fontSize="30px"
                  lineHeight="48px"
                  fontFamily="AirbnbBold"
                  whiteSpace="nowrap"
                  color="black"
                  letterSpacing={0.3}
                  me="5px"
                >
                  &pound; {reports?.Payment_received?.Payment_received}
                </Text>
              </Flex>
              <Text
                sx={{ fontSize: 15 }}
                fontSize="15px"
                fontFamily="AirbnbMedium"
                className="cardcontent_head inv_btm_txt"
              >
                Amount received
              </Text>
              <Flex align="center" className="card_grth">
                {reports?.Payment_received?.type === "increase" ? (
                  <Text
                    fontFamily="AirbnbMedium"
                    color="#10AF0C"
                    fontWeight={500}
                    me="5px"
                  >
                    <BsArrowUp /> {reports?.Payment_received?.percentage.toFixed(2)}%
                  </Text>
                ) : (
                  <Text
                    fontFamily="AirbnbMedium"
                    color="red"
                    fontWeight={500}
                    me="5px"
                  >
                    <BsArrowDown /> {reports?.Payment_received?.percentage.toFixed(2)}%
                  </Text>
                )}
                <Text color="black" fontSize="13px" fontWeight="300">
                  since last{" "}
                  {hideShow?.type === "sortPayment_received" &&
                    parameters === "daily"
                    ? "Daily"
                    : hideShow?.type === "sortPayment_received" &&
                      parameters === "weekly"
                      ? "week"
                      : hideShow?.type === "sortPayment_received" &&
                        parameters === "monthly"
                        ? "month"
                        : hideShow?.type === "sortPayment_received" &&
                          parameters === "yearly"
                          ? "year"
                          : "month"}
                </Text>
              </Flex>
            </div>
          </div>
          <div className="card dash-top-cards">
            <div className="cardcontent dash-c-body">
              <div className="cardCustomHead cardHeader">
                <div className="select_wrap">
                  <div className="fltr_btn">
                    <Text fontSize={"15px"}>
                      <span
                        onClick={() =>
                          setHideShow((prevHideShow) => ({
                            ...prevHideShow,
                            status: true,
                            type: "sortPayment_paid",
                          }))
                        }
                      >
                        Sort
                      </span>
                    </Text>
                    {hideShow.type === "sortPayment_paid" && (
                      <SortFilterTop
                        hideShow={hideShow}
                        closeSort={closeSort}
                        sendDataToParent={collectSortParms}
                        handleApplySorting={handleApplySorting}
                      />
                    )}
                  </div>
                </div>
              </div>
              <Flex align="center" className="card_grth card-grwth inv_top_txt">
                <Text
                  fontStyle="20px"
                  lineHeight="28px"
                  fontFamily="AirbnbBold"
                  color="black"
                  fontSize="20px"
                  me="5px"
                  fontWeight="700"
                  variant="body2"
                  className="top_txt_bg card-head-txt hd_txt mb-2"
                >
                  {reports?.payment_paid?.count}
                </Text>
                <Text
                  color="black"
                  fontSize="12px"
                  fontWeight="300"
                  lineHeight="24px"
                >
                  Number of hoppers
                </Text>
              </Flex>
              <Flex
                mt="5px"
                mb="12px"
                px="20px"
                align="center"
                className="inv_mdl_txt"
              >
                <Text
                  fontSize="30px"
                  lineHeight="48px"
                  fontFamily="AirbnbBold"
                  whiteSpace="nowrap"
                  color="black"
                  letterSpacing={0.3}
                  me="5px"
                >
                  &pound; {(+(reports?.payment_paid?.payment_paid))?.toFixed(2)}
                </Text>
              </Flex>
              <Text
                sx={{ fontSize: 15 }}
                fontSize="15px"
                fontFamily="AirbnbMedium"
                className="cardcontent_head inv_btm_txt"
              >
                Payment made
              </Text>
              <Flex align="center" className="card_grth">
                {reports?.payment_paid?.type === "increase" ? (
                  <Text
                    fontFamily="AirbnbMedium"
                    color="#10AF0C"
                    fontWeight={500}
                    me="5px"
                  >
                    <BsArrowUp /> {+(reports?.payment_paid?.percentage)?.toFixed(2)}%
                  </Text>
                ) : (
                  <Text
                    fontFamily="AirbnbMedium"
                    color="red"
                    fontWeight={500}
                    me="5px"
                  >
                    <BsArrowDown /> {+(reports?.payment_paid?.percentage)?.toFixed(2)}%
                  </Text>
                )}
                <Text color="black" fontSize="13px" fontWeight="300">
                  since last{" "}
                  {hideShow?.type === "sortPayment_paid" &&
                    parameters === "daily"
                    ? "Daily"
                    : hideShow?.type === "sortPayment_paid" &&
                      parameters === "weekly"
                      ? "week"
                      : hideShow?.type === "sortPayment_paid" &&
                        parameters === "monthly"
                        ? "month"
                        : hideShow?.type === "sortPayment_paid" &&
                          parameters === "yearly"
                          ? "year"
                          : "month"}
                </Text>
              </Flex>
            </div>
          </div>

          {/* Top cards end */}
        </SimpleGrid>
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
                Invoicing transactions
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
                </a>

                <span onClick={() => downloadInvoicingCsv(currentPage)}>
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
                          type: "Invoice",
                        }))
                      }
                    >
                      Sort
                    </span>
                  </Text>
                  {hideShow.type === "Invoice" && (
                    <SortFilterInvoicing
                      hideShow={hideShow}
                      closeSort={closeSort}
                      sendDataToParent={collectSortParms}
                      sendDataToParent1={collectSortParms1}
                      handleApplySorting={handleApplySorting}
                    />
                  )}
                </div>
                {/* <Menu /> */}
              </div>
            </Flex>
            <TableContainer className="fix_ht_table">
              <Table mx="20px" variant="simple" className="common_table">
                <Thead>
                  <Tr>
                    <Th>Content</Th>
                    <Th>Publication</Th>
                    <Th>Invoice date</Th>
                    <Th>Amount invoiced</Th>
                    <Th>VAT invoiced</Th>
                    <Th>Invoice number</Th>
                    <Th>Transaction ID</Th>
                    <Th>Amount received</Th>
                    <Th>VAT received</Th>
                    {/* <Th>Presshop commission</Th> */}
                    <Th className="pmnt_rcvd_dt_th">Amount received date</Th>
                    <Th>Amount receivable</Th>
                    <Th>Received from</Th>
                    {/* <Th>Hopper</Th>
                    <Th>Content</Th> */}
                    <Th>Mode</Th>
                    <Th>Action</Th>
                    <Th>Remarks</Th>
                    <Th>Employee details</Th>
                    <Th>CTA</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {invoice &&
                    invoice.map((curr, index) => {
                      return (
                        <Tr>
                          <Td className="">
                            {
                              curr?.type == "content"
                                ? <a onClick={() => history.push(`/admin/live-published-content/${curr?.content_id?._id}/Manage content`)}>
                                  <img
                                    src={curr?.content_id?.content[0]?.watermark}
                                    alt="Content thumbnail"
                                  />
                                </a>
                                : null
                            }
                          </Td>
                          <Td className="">
                            <a>
                              <img
                                src={curr?.media_house_id?.profile_image}
                                alt="Content thumbnail"
                              />
                            </a>
                            <Text className="nameimg naming_comn">
                              <span className="txt_mdm">
                                {curr?.media_house_id?.company_name}
                              </span>
                            </Text>
                          </Td>

                          <Td className="timedate_wrap">
                            <p className="timedate">
                              <img src={calendar} className="icn_time" />
                              {moment(curr?.createdAt).format(`DD MMM,YYYY`)}
                            </p>
                          </Td>

                          <Td>&pound; {curr?.amount}</Td>

                          <Td>&pound; {curr?.Vat}</Td>

                          <Td className="Invoice">
                            <p className="Invoice_Nbr">{curr?.invoiceNumber}</p>
                            <div
                              className="Invoice_Number"
                              onClick={() => {
                                history.push(
                                  `/admin/Invoice-Transaction/${curr?._id}/Invoicing transaction`
                                );
                              }}
                            >
                              <a
                                onClick={() => {
                                  history.push(
                                    `/admin/Invoice-Transaction/${curr?._id}/Invoicing transaction`
                                  );
                                }}
                              >
                                <BsEye className="icn" />
                              </a>
                              <span className="viewNow rd p-cursor">view</span>
                            </div>
                          </Td>

                          <Td className="Invoice">
                            <p className="Invoice_Nbr">{curr?._id}</p>
                          </Td>

                          <Td>&pound; {curr?.amount?.toFixed(2)}</Td>
                          <Td>&pound; {curr?.Vat?.toFixed(2)}</Td>
                          {/* <Td>&pound; {curr?.presshop_commission?.toFixed(2)}</Td> */}
                          <Td className="timedate_wrap">
                            <p className="timedate">
                              <img src={calendar} className="icn_time" />
                              {moment(curr?.createdAt)?.format(`DD MMMM YYYY`)}
                            </p>
                          </Td>
                          <Td></Td>
                          <Td className="contact_details">
                            {" "}
                            {
                              curr?.media_house_id?.company_bank_details
                                ?.bank_name
                            }
                            <br /> Sort Code -
                            {
                              curr?.media_house_id?.company_bank_details
                                ?.sort_code
                            }
                            <br /> Account -{" "}
                            {
                              curr?.media_house_id?.company_bank_details
                                ?.account_number
                            }
                          </Td>

                          {/* <Td className="">
                            <img
                              src={
                                curr?.type == "content" ? process.env.REACT_APP_HOPPER_AVATAR +
                                  curr?.content_id?.hopper_id?.avatar_id?.avatar : process.env.REACT_APP_HOPPER_AVATAR +
                                curr?.hopper_id?.avatar_id?.avatar
                              }
                              alt="Content thumbnail"
                            />
                            <Text className="nameimg naming_comn">
                              <span className="txt_mdm">{`${curr?.content_id?.hopper_id?.first_name || curr?.hopper_id?.first_name} ${curr?.content_id?.hopper_id?.last_name || curr?.hopper_id?.last_name}`}</span>
                            </Text>
                            <span>({curr?.content_id?.hopper_id?.user_name || curr?.hopper_id?.user_name})</span>
                          </Td>

                          <Td>
                            <a
                              onClick={() => {
                                history.push(
                                  `/admin/live-published-content/${curr?.content_id?._id}/Manage content`
                                );
                              }}
                            >
                              {curr?.type != "content" ? <img
                                src={process.env.REACT_APP_UPLOADED_CONTENT + curr?.task_content_id?.imageAndVideo}
                                className="content_img"
                                alt="Content thumbnail"
                              /> : curr?.content_id?.content?.length === 0 ? null : (
                                curr?.content_id?.content?.length > 1 && (
                                  <div className="content_imgs_wrap contnt_lngth_wrp">
                                    <div className="content_imgs">
                                      {curr?.content_id?.content
                                        .slice(0, 3)
                                        .map((value) => (
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
                                            ) : value.media_type === "video" ? (
                                              <img
                                                // src={process.env.REACT_APP_CONTENT + value.thumbnail}
                                                src={value?.watermark}
                                                className="content_img"
                                                alt="Content thumbnail"


                                              />
                                            ) : curr?.content_id?.content[0].media_type ===
                                              "doc" ? (
                                              <img
                                                // src={process.env.REACT_APP_CONTENT + curr?.content_id?.content[0]?.thumbnail}
                                                src={docic}
                                                className="icn m_auto"
                                                alt="Content thumbnail"
                                              />
                                            ) : curr?.content_id?.content[0].media_type ===
                                              "pdf" ? (
                                              <img
                                                // src={process.env.REACT_APP_CONTENT + curr?.content_id?.content[0]?.thumbnail}
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
                          </Td> */}

                          <Td className="select_wrap">
                            <Select
                              value={curr?.mode}
                              name="mode"
                              onChange={(e) => {
                                curr.mode = e.target.value;
                                setInvoice((prevItems) => {
                                  const updatedItems = [...prevItems];
                                  updatedItems[index] = curr;
                                  return updatedItems;
                                });
                              }}
                            >
                              <option value="call">Call</option>
                              <option value="chat">Chat</option>
                              <option value="email">Email</option>
                            </Select>
                          </Td>
                          <Td>
                            <div className="check_wrap check_wrapper">
                              <Checkbox
                                colorScheme="brandScheme"
                                me="10px"
                                isChecked={curr?.send_reminder}
                                onChange={(e) => {
                                  curr.send_reminder = e.target.checked;
                                  setInvoice((prevItems) => {
                                    const updatedItems = [...prevItems];
                                    updatedItems[index] = curr;
                                    return updatedItems;
                                  });
                                }}
                              />
                              <span>Send reminder</span>
                            </div>

                            <div className="check_wrap check_wrapper">
                              <Checkbox
                                colorScheme="brandScheme"
                                me="10px"
                                isChecked={curr?.send_statment}
                                onChange={(e) => {
                                  curr.send_statment = e.target.checked;
                                  setInvoice((prevItems) => {
                                    const updatedItems = [...prevItems];
                                    updatedItems[index] = curr;
                                    return updatedItems;
                                  });
                                }}
                              />
                              <span>Send statement</span>
                            </div>

                            <div className="check_wrap check_wrapper">
                              <Checkbox
                                colorScheme="brandScheme"
                                me="10px"
                                isChecked={curr?.blockaccsess}
                                onChange={(e) => {
                                  curr.blockaccsess = e.target.checked;
                                  setInvoice((prevItems) => {
                                    const updatedItems = [...prevItems];
                                    updatedItems[index] = curr;
                                    return updatedItems;
                                  });
                                }}
                              />
                              <span>Block</span>
                            </div>
                            <div className="check_wrap check_wrapper">
                              <Checkbox
                                colorScheme="brandScheme"
                                me="10px"
                                isChecked={curr?.remove}
                                onChange={(e) => {
                                  curr.remove = e.target.checked;
                                  setInvoice((prevItems) => {
                                    const updatedItems = [...prevItems];
                                    updatedItems[index] = curr;
                                    return updatedItems;
                                  });
                                }}
                              />
                              <span>Remove</span>
                            </div>
                          </Td>

                          <Td className="remarks_wrap">
                            <Textarea
                              placeholder="Enter remarks if any..."
                              value={curr?.latestAdminRemark}
                              onChange={(e) => {
                                curr.latestAdminRemark = e.target.value;
                                setInvoice((pre) => {
                                  const updatedData = [...pre];
                                  updatedData[index] = curr;
                                  return updatedData;
                                });
                              }}
                            />
                          </Td>
                          <Td className="timedate_wrap">
                            <p className="timedate emp_nme">
                              {curr?.admin_id?.name ?? "no history"}
                            </p>
                            <p className="timedate">
                              <img src={watch} className="icn_time" />
                              {moment(curr?.latestAdminUpdated).format(
                                `hh:mm A`
                              )}
                            </p>
                            <p className="timedate">
                              <img src={calendar} className="icn_time" />
                              {moment(curr?.latestAdminUpdated).format(
                                `DD MMMM YYYY`
                              )}
                            </p>
                            <a
                              className="timedate"
                              onClick={() =>
                                history.push(
                                  `/admin/invoice-history/${curr?.media_house_id?.id}/Invoicing & payments`
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
                              onClick={() => createTransactionHistory(index)}
                            >
                              Save
                            </Button>
                            <Button
                              className="theme_btn tbl_btn del-btn"
                              colorScheme="red"
                            >
                              Refund
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
            onPageChange={handlePageChangeInvoicing}
            pageRangeDisplayed={5}
            pageCount={totalPages}
            previousLabel="<"
            renderOnZeroPageCount={null}
            forcePage={currentPage - 1}
          />
        </Card>

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
                Payment transactions
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
                </a>
                <span onClick={() => downloadPaymentCsv(currentPage1)}>
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
                          type: "Payments",
                        }))
                      }
                    >
                      Sort
                    </span>
                  </Text>
                  {hideShow.type === "Payments" && (
                    <SortFilterInvoicing
                      hideShow={hideShow}
                      closeSort={closeSort}
                      sendDataToParent={collectSortParms}
                      sendDataToParent1={collectSortParms1}
                      handleApplySorting={handleApplySorting}
                    />
                  )}
                </div>
                {/* <a onClick={onOpen} className="link_link">Add</a> */}
              </div>
            </Flex>
            <TableContainer className="fix_ht_table">
              <Table mx="20px" variant="simple" className="common_table">
                <Thead>
                  <Tr>
                    <Th>Content</Th>
                    <Th>Hopper</Th>
                    <Th>Kind</Th>
                    <Th>Payment date</Th>
                    <Th>Amount received</Th>
                    <Th>Presshop commission</Th>
                    <Th>Processsing charges</Th>
                    <Th>Amount paid</Th>
                    <Th>Transaction ID</Th>
                    <Th>Paid to</Th>
                    <Th>Amount payable</Th>
                    <Th>Payment due date</Th>
                    {/* <Th>Payment made</Th>
                    <Th>Publication</Th>
                    <Th>Content</Th> */}
                    {/* <Th>Payment pending</Th>
                    <Th>Payment due date</Th> */}
                    <Th>Mode</Th>
                    <Th>Action</Th>
                    <Th>Remarks</Th>
                    <Th>Employee details</Th>
                    <Th>CTA</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {payment &&
                    payment.map((curr, index) => {
                      return (
                        <Tr>
                          <Td className="">
                            {
                              curr?.type == "content"
                                ? <a onClick={() => history.push(`/admin/live-published-content/${curr?.content_id?._id}/Manage content`)}>
                                  <img
                                    src={curr?.content_id?.content[0]?.watermark}
                                    alt="Content thumbnail"
                                  />
                                </a>
                                : null
                            }
                          </Td>
                          <Td className="">
                            <a>
                              <img
                                src={
                                  curr?.type === "content" ? process.env.REACT_APP_HOPPER_AVATAR +
                                    curr?.content_id?.hopper_id?.avatar_id?.avatar : process.env.REACT_APP_HOPPER_AVATAR +
                                  curr?.hopper_id?.avatar_id?.avatar
                                }
                                alt="Content thumbnail"
                              />
                            </a>
                            <Text className="nameimg naming_comn">
                              {" "}
                              <span className="txt_mdm">{`${curr?.type === "content" ? curr?.content_id?.hopper_id?.first_name : curr?.hopper_id?.first_name} ${curr?.type === "content" ? curr?.content_id?.hopper_id?.last_name : curr?.hopper_id?.last_name}`}</span>
                              <br />
                              <span>({curr?.type === "content" ? curr?.content_id?.hopper_id?.user_name : curr?.hopper_id?.user_name})</span>
                            </Text>

                          </Td>

                          <Td className="kind_of text_center">
                            {curr?.type === "content" ? (
                              <Tooltip label={"Content"}>
                                <img src={content} className="icn" />
                              </Tooltip>
                            ) : (
                              <Tooltip label={"Task"}>
                                <img src={conImg} className="icn" />
                              </Tooltip>
                            )}



                            {/* {audio && audio?.length > 0 && (
                                <Tooltip label={"Interview"}>
                                  <img
                                    src={interview}
                                    alt="Content thumbnail"
                                    className="icn m_auto"
                                  />
                                </Tooltip>
                              )} */}






                          </Td>

                          <Td className="timedate_wrap">
                            <p className="timedate">
                              <img src={calendar} className="icn_time" />
                              {moment(curr?.createdAt).format(`DD MMM,YYYY`)}
                            </p>
                          </Td>

                          <Td>
                            <span>&pound;{curr?.amount.toFixed(2)}</span>
                          </Td>

                          <Td>
                            <span>&pound; {curr?.presshop_commission?.toFixed(2)}</span>
                          </Td>

                          <Td></Td>
                          <Td></Td>

                          <Td className="Invoice">
                            <p className="Invoice_Nbr">{curr?._id}</p>
                            <div
                              className="Invoice_Number"
                              onClick={() => {
                                history.push(
                                  `/admin/Payment-Transaction/${curr?._id}/Payment transaction `
                                );
                              }}
                            >
                              <a>
                                <BsEye className="icn" />
                              </a>
                              <span className="viewNow rd p-cursor">view</span>
                            </div>
                          </Td>

                          <Td className="contact_details">
                            {" "}
                            {
                              curr?.media_house_id?.company_bank_details
                                ?.bank_name
                            }
                            <br /> Sort Code -
                            {
                              curr?.media_house_id?.company_bank_details
                                ?.sort_code
                            }
                            <br /> Account -{" "}
                            {
                              curr?.media_house_id?.company_bank_details
                                ?.account_number
                            }
                          </Td>

                          <Td></Td>
                          <Td></Td>

                          {/* <Td>
                            <span>
                              {curr && curr?.paid_status_for_hopper === true
                                ? `£${curr?.payable_to_hopper?.toFixed(2)}`
                                : 0}
                            </span>
                          </Td>

                          <Td className="">
                            <a
                              onClick={() => {
                                history.push("/admin/Invoice-Transaction");
                              }}
                            >
                              <img
                                src={curr?.media_house_id?.profile_image}
                                alt="Content thumbnail"
                              />
                            </a>
                            <Text className="nameimg naming_comn">
                              <span className="txt_mdm">
                                {curr?.media_house_id?.company_name}
                              </span>
                            </Text>
                          </Td>

                          <Td>
                            <a
                              onClick={() => {
                                history.push(
                                  `/admin/live-published-content/${curr?.content_id?._id}/Manage content`
                                );
                              }}
                            >
                              {curr?.type == "task_content" ? (
                                <img
                                  src={process.env.REACT_APP_UPLOADED_CONTENT + curr?.task_content_id?.imageAndVideo}
                                  className="content_img"
                                  alt="Content thumbnail"
                                />
                              ) : curr?.content_id?.content?.length === 0 ? null : (
                                curr?.content_id?.content?.length > 1 && (
                                  <div className="content_imgs_wrap contnt_lngth_wrp">
                                    <div className="content_imgs">
                                      {curr?.content_id?.content
                                        .slice(0, 3)
                                        .map((value) => (
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
                                            ) : value.media_type === "video" ? (
                                              <img
                                                // src={process.env.REACT_APP_CONTENT + value.thumbnail}
                                                src={value?.watermark}
                                                className="content_img"
                                                alt="Content thumbnail"


                                              />
                                            ) : curr?.content_id?.content[0].media_type ===
                                              "doc" ? (
                                              <img
                                                // src={process.env.REACT_APP_CONTENT + curr?.content_id?.content[0]?.thumbnail}
                                                src={docic}
                                                className="icn m_auto"
                                                alt="Content thumbnail"
                                              />
                                            ) : curr?.content_id?.content[0].media_type ===
                                              "pdf" ? (
                                              <img
                                                // src={process.env.REACT_APP_CONTENT + curr?.content_id?.content[0]?.thumbnail}
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
                          </Td> */}

                          {/* <Td><span>&pound; 0</span></Td> */}
                          {/* <Td className="">
                      <span>Paid</span>
                    </Td> */}

                          <Td className="select_wrap">
                            <Select
                              value={curr?.payment_mode}
                              name="mode"
                              onChange={(e) => {
                                curr.payment_mode = e.target.value;
                                setPayment((prevItems) => {
                                  const updatedItems = [...prevItems];
                                  updatedItems[index] = curr;
                                  return updatedItems;
                                });
                              }}
                            >
                              <option value="call">Call</option>
                              <option value="chat">Chat</option>
                              <option value="email">Email</option>
                            </Select>
                          </Td>

                          <Td>
                            <div className="check_wrap check_wrapper">
                              <Checkbox
                                colorScheme="brandScheme"
                                me="10px"
                                isChecked={curr?.payment_send_statment}
                                onChange={(e) => {
                                  curr.payment_send_statment = e.target.checked;
                                  setInvoice((prevItems) => {
                                    const updatedItems = [...prevItems];
                                    updatedItems[index] = curr;
                                    return updatedItems;
                                  });
                                }}
                              />
                              <span>Send statement</span>
                            </div>

                            <div className="check_wrap check_wrapper">
                              <Checkbox
                                colorScheme="brandScheme"
                                me="10px"
                                isChecked={curr?.payment_blockaccsess}
                                onChange={(e) => {
                                  curr.payment_blockaccsess = e.target.checked;
                                  setInvoice((prevItems) => {
                                    const updatedItems = [...prevItems];
                                    updatedItems[index] = curr;
                                    return updatedItems;
                                  });
                                }}
                              />
                              <span>Block access</span>
                            </div>

                            <div className="check_wrap check_wrapper">
                              <Checkbox
                                colorScheme="brandScheme"
                                me="10px"
                                isChecked={curr?.payment_remove}
                                onChange={(e) => {
                                  curr.payment_remove = e.target.checked;
                                  setInvoice((prevItems) => {
                                    const updatedItems = [...prevItems];
                                    updatedItems[index] = curr;
                                    return updatedItems;
                                  });
                                }}
                              />
                              <span>Remove</span>
                            </div>
                          </Td>

                          <Td className="remarks_wrap">
                            <Textarea
                              placeholder="Enter remarks if any..."
                              value={curr?.payment_remarks}
                              onChange={(e) => {
                                curr.payment_remarks = e.target.value;
                                setPayment((pre) => {
                                  const updatedData = [...pre];
                                  updatedData[index] = curr;
                                  return updatedData;
                                });
                              }}
                            />
                          </Td>
                          <Td className="timedate_wrap">
                            <p className="timedate emp_nme">
                              {curr?.payment_admin_id?.name ?? "no history"}
                            </p>
                            <p className="timedate">
                              <img src={watch} className="icn_time" />
                              {moment(curr?.payment_latestAdminUpdated).format(
                                `hh:mm A`
                              )}
                            </p>
                            <p className="timedate">
                              <img src={calendar} className="icn_time" />
                              {moment(curr?.payment_latestAdminUpdated).format(
                                `DD MMMM YYYY`
                              )}
                            </p>
                            <a
                              className="timedate"
                              onClick={() =>
                                history.push(
                                  `/admin/payment-history/${curr?.hopper_id?._id}/Invoicing & payments`
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
                              onClick={() => createPaymentHistory(index)}
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
          </div>
          <ReactPaginate
            className="paginated"
            breakLabel="..."
            nextLabel=">"
            onPageChange={handlePageChangePayment}
            pageRangeDisplayed={5}
            pageCount={totalPages1}
            previousLabel="<"
            renderOnZeroPageCount={null}
            forcePage={currentPage1 - 1}
          />
        </Card>
      </Box>
      <Share show={show} csv={csv} update={handleClose} />
    </>
  );
}
