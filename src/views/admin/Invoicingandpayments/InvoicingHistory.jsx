

// Chakra imports
import { Box, Flex, Table, Tbody, Td, Text, Th, Thead, Tr, useColorModeValue, TableContainer, Checkbox, Textarea, Select, Button, } from "@chakra-ui/react";
import Card from "components/card/Card";
import moment from 'moment';
import { React, useEffect, useState } from "react";
import watch from "assets/img/icons/watch.svg";
import calendar from "assets/img/icons/calendar.svg";
import share from "assets/img/icons/share.png";
import print from "assets/img/icons/print.png";
import avt11 from "assets/img/avatars/avatar11.png";
import avt12 from "assets/img/avatars/avatar12.png";
import avt13 from "assets/img/avatars/avatar13.png";
import { Get } from "api/admin.services";
import { useParams } from "react-router-dom";
import Loader from "components/Loader";
import Share from "components/share/Share";
import ReactPaginate from "react-paginate";
import { BsArrowLeft, BsEye } from "react-icons/bs";
import { useHistory } from "react-router-dom";
import SortFilterInvoicing from "components/sortfilters/SortFilterInvoicing";


export default function InvoicingHistory() {
  const history = useHistory();
  const textColor = useColorModeValue("#000", "white");
  const { id, component } = useParams();
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const perPage = 5;
  const [path, setPath] = useState("");
  const [csv, setCsv] = useState("");
  const [show, setShow] = useState(false);
  const [historyData, setHistoryData] = useState([])

  const handleClose = () => {
    setShow(!show);
  };

  const invoiceHistory = async (page) => {
    setLoading(true)
    const offset = (page - 1) * perPage
    await Get(`admin/editHopperPaymenthistorydetails?user_id=${id}&type=Mediahouse&limit=${perPage}&offset=${offset}`).then((res) => {
      setHistoryData(res?.data?.data)
      setTotalPages(res?.data?.total_count / perPage)
      setPath(res?.data?.fullPath)
      setLoading(false)
    })
  }

  useEffect(() => {
    invoiceHistory(currentPage)
  }, [currentPage])

  const downloadInvoicingCsvHistroy = async (page) => {
    const offset = (page - 1) * perPage;
    try {
      const response = await Get(`admin/editHopperPaymenthistorydetails?user_id=${id}&type=Mediahouse&limit=${perPage}&offset=${offset}`);
      if (response) {
        const path = response?.data?.fullPath;
        window.open(path);
      }
    } catch (err) {
      console.log('<---Have an error ->', err);
    }
  };

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected + 1);
  };

  // sorting

  const [hideShow, setHideShow] = useState({
    status: false,
    type: ""
  })

  const [parameters, setParameters] = useState('')
  const [parametersName, setParametersName] = useState('')

  const closeSort = () => {
    setHideShow((prevHideShow) => ({
      ...prevHideShow,
      status: false,
      type: ""
    }));
  };
  const collectSortParms = (name, order) => {
    setParameters(order)
    setParametersName(name)
  }

  const handleApplySorting = () => {
    if (hideShow?.type === "invoiceHistory") {
      invoiceHistory(currentPage, parametersName, parameters);
      setParameters('')
      setParametersName('')
      closeSort()
    }
  };

  return (
    <>
      <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
        {loading && <Loader />}
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
        <Card className="tab_card"
          direction='column'
          w='100%'
          px='0px'
          mb='24px'
          overflowX={{ sm: "scroll", lg: "hidden" }}>
          <div className="">
            <Flex px='20px' justify='space-between' mb='10px' align='center'>
              <Text
                color={textColor}
                fontSize='22px'
                fontFamily={"AirbnbBold"}
                lineHeight='100%'>
                Invoicing transactions / history
              </Text>
              <div className="opt_icons_wrap">
                <a
                  onClick={() => {
                    setShow(true)
                    setCsv(path)
                  }}
                  className="txt_danger_mdm"
                >
                  <img src={share} className="opt_icons" />
                </a>
                <span onClick={() => downloadInvoicingCsvHistroy(currentPage)}>
                  <img src={print} className="opt_icons" />
                </span>

                <div className="fltr_btn">
                  <Text fontSize={"15px"}>
                    <span onClick={() => setHideShow((prevHideShow) => ({
                      ...prevHideShow,
                      status: true,
                      type: "invoiceHistory"
                    }))}>Sort</span>
                  </Text>
                  {
                    hideShow.type === "invoiceHistory" &&
                    <SortFilterInvoicing hideShow={hideShow}
                      closeSort={closeSort}
                      sendDataToParent={collectSortParms}
                      handleApplySorting={handleApplySorting}
                    />
                  }
                </div>

              </div>
            </Flex>
            <TableContainer className="fix_ht_table">
              <Table mx='20px' variant='simple' className="common_table">
                <Thead>
                  <Tr>
                    <Th>Time & date</Th>
                    <Th>Employee name</Th>
                    <Th>Publication</Th>
                    <Th>Invoice date</Th>
                    <Th>Amount invoiced</Th>
                    <Th>VAT invoiced</Th>
                    <Th>Invoice number</Th>
                    <Th>Transaction ID</Th>
                    <Th>Amount received</Th>
                    <Th>Presshop commission</Th>
                    <Th>VAT received</Th>
                    <Th className="pmnt_rcvd_dt_th">Amount received date</Th>
                    {/* <Th>Payment receivable</Th> */}
                    <Th>Hopper</Th>
                    <Th>Received from</Th>
                    <Th>Mode</Th>
                    <Th>Action</Th>
                    <Th>Remarks</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {historyData && historyData.map((curr, index) => {
                    return (
                      <Tr key={curr?._id}>
                        <Td className="timedate_wrap">
                          <p className="timedate"><img src={watch} className="icn_time" />
                            {moment(curr?.updatedAt).format('hh:mm A')}
                          </p>
                          <p className="timedate">
                            <img src={calendar} className="icn_time" />
                            {moment(curr?.updatedAt).format('DD MMMM YYYY')}
                          </p>
                        </Td>

                        <Td>
                          {curr?.admin_id?.name}
                        </Td>

                        <Td className="">
                          <img src={curr?.payment_id?.media_house_id?.profile_image} alt="Content thumbnail" />
                          <Text className="nameimg naming_comn"><span className="txt_mdm">{curr?.payment_id?.media_house_id?.company_name}</span></Text>
                        </Td>
                        <Td className="timedate_wrap">
                          <p className="timedate"><img src={watch} className="icn_time" />
                            {moment(curr.createdAt).format('hh:mm A')}
                          </p>
                          <p className="timedate">
                            <img src={calendar} className="icn_time" />
                            {moment(curr.createdAt).format('DD MMMM YYYY')}
                          </p>
                        </Td>
                        <Td>
                          &pound; {curr?.payment_id?.amount ?? "0"}
                        </Td>
                        <Td>
                          &pound; {curr?.payment_id?.Vat ?? "0"}
                        </Td>
                        <Td className="timedate_wrap Invoice">
                          <p className="Invoice_Nbr">{curr?.payment_id?.invoiceNumber}</p>
                          <div className="Invoice_Number" 
                        
                          >
                            <a 
                              onClick={() => {
                                history.push(
                                  `/admin/Invoice-Transaction/${curr?.payment_id?._id}/Invoicing transaction`
                                );
                              }}
                             ><BsEye className="icn" />
                            <span className="viewNow rd" >view</span></a>
                          </div>
                        </Td>
                        <Td className="Invoice">
                          <p className="Invoice_Nbr">{curr?.payment_id?._id}</p>
                        </Td>
                        <Td>
                          &pound; {curr?.payment_id?.amount}
                        </Td>
                        <Td>
                          &pound; {curr?.payment_id?.presshop_commission}
                        </Td>
                        <Td>
                          &pound; {curr?.payment_id?.Vat}
                        </Td>
                        <Td className="timedate_wrap">
                          <p className="timedate"><img src={calendar} className="icn_time" />
                            {moment(curr?.createdAt).format(`DD MMMM YYYY`)}
                          </p>
                        </Td>

                        <Td className="">
                          <img src={process.env.REACT_APP_HOPPER_AVATAR + curr?.payment_id?.hopper_id?.avatar_id?.avatar} alt="Content thumbnail" />
                          <Text className="nameimg naming_comn">
                            <span className="txt_mdm">{`${curr?.payment_id?.hopper_id?.first_name} ${curr?.payment_id?.hopper_id?.last_name}`}</span>
                          </Text>
                        </Td>
                        <Td className="contact_details"> {curr?.payment_id?.media_house_id?.company_bank_details?.bank_name}<br /> Sort Code -{curr?.payment_id?.media_house_id?.company_bank_details?.sort_code}<br /> Account - {curr?.payment_id?.media_house_id?.company_bank_details?.account_number}</Td>
                        <Td className="select_wrap">
                          <Select
                            value={curr?.payment_id?.mode} disabled>

                            <option value='call'>Call</option>
                            <option value='chat'>Chat</option>
                            <option value='email'>Email</option>

                          </Select>
                        </Td>
                        <Td>

                          <div className="check_wrap check_wrapper">
                            <Checkbox
                              colorScheme='brandScheme'
                              me='10px'

                              defaultChecked={curr?.payment_id?.send_reminder === true ? true : false}

                            />
                            <span>Send reminder</span>
                          </div>

                          <div className="check_wrap check_wrapper">
                            <Checkbox
                              colorScheme='brandScheme'
                              me='10px'
                              defaultChecked={curr?.payment_id?.send_statement === true ? true : false}

                            />
                            <span>Send statement</span>
                          </div>

                          <div className="check_wrap check_wrapper">
                            <Checkbox
                              colorScheme='brandScheme'
                              me='10px'
                              defaultChecked={curr?.payment_id?.blockaccess === true ? true : false}

                            />
                            <span>Block</span>
                          </div>
                          <div className="check_wrap check_wrapper">
                            <Checkbox
                              colorScheme='brandScheme'
                              me='10px'
                              defaultChecked={curr?.payment_id?.removeuser === true ? true : false}
                            />
                            <span>Remove</span>
                          </div>
                        </Td>
                        <Td className="conversation-td">
                          <div className="conversation-details">

                            <p>{curr?.payment_id?.latestAdminRemark} </p>
                          </div>
                        </Td>
                      </Tr>
                    )
                  })
                  }
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
      <Share show={show} csv={csv} update={handleClose} />

    </>
  );
}
