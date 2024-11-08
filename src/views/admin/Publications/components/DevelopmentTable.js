/* eslint-disable */
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
  TableContainer,
  Checkbox,
  Textarea,
  Select,
  Button,
  Progress,
} from "@chakra-ui/react";
import Card from "components/card/Card";
import React, { useEffect, useMemo, useState, useContext } from "react";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import { useHistory } from "react-router-dom";
import mobile from "assets/img/icons/mobile.svg";
import watch from "assets/img/icons/watch.svg";
import calendar from "assets/img/icons/calendar.svg";
import { BsArrowLeft, BsEye } from "react-icons/bs";
import share from "assets/img/icons/share.png";
import print from "assets/img/icons/print.png";
import monitor from "assets/img/icons/monitor.svg";
import news from "assets/img/icons/news.svg";
import { Get } from "api/admin.services";
import { Tooltip } from "@chakra-ui/react";
import moment from "moment";
import { Patch } from "api/admin.services";
import { toast } from "react-toastify";
import { Post } from "api/admin.services";
import ReactPaginate from "react-paginate";
import docuploaded from "assets/img/icons/img-upld.svg";
import Loader from "components/Loader";
import { Link } from "react-router-dom";
import dataContext from "views/admin/ContextFolder/Createcontext";
import Share from "components/share/Share";
import SortFilterPublication from "components/sortfilters/SortFilterPublication";
import SortFilterDashboard from "components/sortfilters/SortFilterDashboard";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
export default function DevelopmentTable(props) {
  const textColor = useColorModeValue("#000", "white");
  const history = useHistory();

  const { columnsData, tableData } = props;
  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => tableData, [tableData]);

  const tableInstance = useTable({ columns, data, }, useGlobalFilter, useSortBy, usePagination);
  const { initialState } = tableInstance;
  initialState.pageSize = 11;
  const [publicationData, setpublicationData] = useState([]);
  const [purchasedData, setPurchasedData] = useState([]);
  const [sourcedData, setSourcedData] = useState([]);
  const [loading, setLoading] = useState(false)

  // pagination

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const publications = queryParams.get('publications');
  const [currentPage1, setCurrentPage1] = useState(publications || 1);
  const [totalPages1, setTotalPages1] = useState(0)

  const purchasedContent = queryParams.get('purchasedContent');
  const [currentPagePurchasedContent, setCurrentPagePurchasedContent] = useState(purchasedContent || 1)
  const [totalPagesPurchasedContent, setTotalPagesPurchasedContent] = useState(0)

  const sourcedTask = queryParams.get('sourcedTask');
  const [currentPageSourcedContent, setCurrentPageSourcedContent] = useState(sourcedTask || 1)
  const [totalPagesSourcedContent, setTotalPagesSourcedContent] = useState(0)
  const perPage = 5
  const { profile } = useContext(dataContext);
  // for share 
  const [path1, setpath1] = useState("")
  const [path2, setpath2] = useState("")
  const [path3, setpath3] = useState("")
  const [show, setShow] = useState(false)
  const [csv, setCsv] = useState("")
  // for sort&filter
  const [hideShow, setHideShow] = useState({ status: false, type: "" })
  const [params, setParms] = useState({
    parameters: "",
    parametersName: "",
    parameters1: "",
    parametersName1: "",
  })

  // get publication control data
  const getPublication = async (page, parametersName, parameters, parametersName1, parameters1) => {
    const offset = (page - 1) * perPage;
    setLoading(true);
    try {
      await Get(`admin/getPublicationList?limit=${perPage}&offset=${offset}&${parametersName ?? ""}=${parameters ?? ""}&${parametersName1 ?? ""}=${parameters1 ?? ""}`).then((res) => {
        setpublicationData(res?.data?.data);
        setTotalPages1(res.data.totalCount / perPage);
        setpath1(res?.data?.fullPath)
        setLoading(false);
      });
    } catch (error) {
      setLoading(false);
    }
  };

  const handlePageChange1 = (selectedPage) => {
    setCurrentPage1(selectedPage.selected + 1);
    history.push(`?publications=${selectedPage.selected + 1}`);
  };

  // edit data
  const handleSave = async (index) => {
    try {
      const remarks = publicationData[index].remarks;
      const mode = publicationData[index].mode;

      if (!remarks || /^\s*$/.test(remarks) || mode === null || mode === undefined || /^\s+/.test(mode)) {
        toast.error("Remarks and mode are required");
        return;
      }
      let obj = {
        publication_id: publicationData[index]._id,
        status: publicationData[index].status,
        mode: mode,
        latestAdminRemark: remarks,
        checkAndApprove: publicationData[index].checkAndApprove,
        isTempBlocked: publicationData[index].isTempBlocked,
        isPermanentBlocked: publicationData[index].isPermanentBlocked,
      };
      await Patch(`admin/editPublication`, obj).then((res) => {
        toast.success("updated");
        getPublication(currentPage1);
      });
    } catch (err) {
      // console.log(err);
      setLoading(false);
    }
  };

  // download csv of publication control
  const printPublicationTable = async () => {
    try {
      const response = await Get(`admin/getPublicationList?`);
      if (response) {
        const onboardinPrint = response?.data?.fullPath;
        window.open(onboardinPrint);
      }
    } catch (err) {
      // console.log("<---Have an error ->", err);
      setLoading(false);
    }
  };

  // purchase publication
  const PurchasedPublicationSummary = async (page, parametersName, parameters, parametersName1, parameters1) => {
    const offset = (page - 1) * perPage;
    setLoading(true);
    try {
      let obj = {
        limit: perPage,
        offset: isNaN(offset) ? 0 : offset,
        [parametersName]: parameters,
        [parametersName1]: parameters1
      };
      await Post(`admin/purchased/content/summery`, obj).then((res) => {
        setPurchasedData(res.data.purchasedPublication);
        setTotalPagesPurchasedContent(res.data?.count / perPage);
        setpath2(res?.data?.fullPath)
        setLoading(false);
      });
    } catch (error) {
      setLoading(false);
    }
  };

  // pagination
  const handlePageChangePurchasedContent = (selectedPage) => {
    setCurrentPagePurchasedContent(selectedPage.selected + 1);
    history.push(`?purchasedContent=${selectedPage.selected + 1}`);
  };

  const UpdatePurchaseData = async (index) => {
    try {
      const remarks = purchasedData[index].remarks;
      const mode = purchasedData[index].mode;

      if (!remarks || /^\s*$/.test(remarks) || mode === null || mode === undefined || /^\s+/.test(mode)) {
        toast.error("Remarks and mode are required");
        return;
      }
      let obj = {
        media_house_id: purchasedData[index]._id,
        mode: mode,
        latestAdminRemark: remarks,
        purchased_content_qty: purchasedData[index].purchased_qty,
        purchased_content_value: purchasedData[index].purchased_content_value,
        total_payment_recieved: purchasedData[index].amoumt_paid,
        payment_receivable: purchasedData[index].total_amount_payable,
        total_presshop_commition: purchasedData[index].total_presshop_commission,
        total_amount_paid: purchasedData[index].total_amount_paid,

      };
      await Patch(`admin/edit/purchased/content/summery`, obj).then((res) => {
        toast.success("updated sucessfully");
        PurchasedPublicationSummary();
      });
    } catch (err) {
      setLoading(false);

    }
  };

  // download csv of purchase control
  const printPurchaseContentTable = async (page) => {
    const offset = (page - 1) * perPage;
    try {
      let obj = {
        limit: perPage,
        offset,
      };
      const response = await Post(`admin/purchased/content/summery`, obj);
      if (response) {
        const onboardinPrint = response?.data?.fullPath;
        window.open(onboardinPrint);
      }
    } catch (err) {
      // console.log("<---Have an error ->", err);
      setLoading(false);

    }
  };

  // sourced content
  const sourcedContent = async (page, parametersName, parameters, parametersName1, parameters1) => {
    const offset = (page - 1) * perPage;
    setLoading(true);
    try {
      await Post(`admin/sourced/content/summery?limit=${perPage}&offset=${offset}&${parametersName ?? ""}=${parameters ?? ""}&${parametersName1 ?? ""}=${parameters1 ?? ""}`).then((res) => {
        setSourcedData(res?.data?.data);
        setTotalPagesSourcedContent(res?.data?.count / perPage);
        setpath3(res?.data?.fullpath)
        setLoading(false);
      });
    } catch (error) {
      setLoading(false);

    }
  };

  // pagination
  const handlePageChangeSourcedContent = (selectedPage) => {
    setCurrentPageSourcedContent(selectedPage.selected + 1);
    history.push(`?sourcedTask=${selectedPage.selected + 1}`);
  };

  const UpdateSourcedContent = async (index) => {
    try {
      const remarks = sourcedData[index].remarks;
      const mode = sourcedData[index].mode;

      if (!remarks || /^\s*$/.test(remarks) || mode === null || mode === undefined || /^\s+/.test(mode)) {
        toast.error("Remarks and mode are required");
        return;
      }
      let obj = {
        media_house_id: sourcedData[index]._id,
        mode: mode,
        remarks: remarks,
      };
      await Post(`admin/sourced/content/remarks/mode`, obj).then((res) => {
        if (res) {
          toast.success("updated sucessfully");
          sourcedContent();
        }
      });
    } catch (err) {
      setLoading(false);

    }
  };

  // download csv of sourced control
  const printSourcedContentTable = async (page) => {
    const offset = (page - 1) * perPage;
    try {
      const response = await Post(`admin/sourced/content/summery?limit=${perPage}&offset=${offset}`);
      if (response) {
        const onboardinPrint = response?.data?.fullpath;
        window.open(onboardinPrint);
      }
    } catch (err) {
      // console.log("<---Have an error ->", err);
      setLoading(false);

    }
  };

  useEffect(() => {
    getPublication(currentPage1);
  }, [currentPage1]);

  useEffect(() => {
    PurchasedPublicationSummary(currentPagePurchasedContent);
    sourcedContent(currentPageSourcedContent);
  }, [currentPagePurchasedContent, currentPageSourcedContent]);

  // for sending multiple ids through routes
  const handleLinkClick = (curr) => {
    const queryParams = new URLSearchParams();
    queryParams.append('task_id', JSON.stringify(curr?.task_id));
    history.push({
      pathname: `/admin/publication-sourced-content-detail/${(JSON.stringify(curr?.task_id))}/Manage publications`,
      search: queryParams.toString()
    });
  };
  // for sending multiple ids through routes ending


  const handleClose = () => { setShow(!show) }
  // sorting
  const closeSort = () => {
    setHideShow((prevHideShow) => ({
      ...prevHideShow,
      status: false,
      type: ""
    }));
  };




  const collectSortParms = (name, order) => {
    setParms((prev) => ({
      ...prev,
      parameters: order,
      parametersName: name,

    }))
  }

  const collectSortParms1 = (name, order) => {
    setParms((prev) => ({
      ...prev,
      parameters1: order,
      parametersName1: name,

    }))
  }

  const { parametersName, parameters, parametersName1, parameters1 } = params

  const handleApplySorting = () => {
    if (hideShow?.type === "publicationControl") {
      getPublication(currentPage1, parametersName, parameters, parametersName1, parameters1);
      setParms({
        parameters: "",
        parametersName: "",
        parameters1: "",
        parametersName1: "",
      })
      closeSort()

    } else if (hideShow?.type === "purchasedPublicationContent") {
      PurchasedPublicationSummary(currentPagePurchasedContent, parametersName, parameters, parametersName1, parameters1);
      setParms({
        parameters: "",
        parametersName: "",
        parameters1: "",
        parametersName1: "",
      })
      closeSort()

    } else if (hideShow?.type === "purchasedPublicationTask") {
      sourcedContent(currentPageSourcedContent, parametersName, parameters, parametersName1, parameters1);
      setParms({
        parameters: "",
        parametersName: "",
        parameters1: "",
        parametersName1: "",
      })
      closeSort()

    }
  };

  const formatAmountInMillion = (amount) =>
    amount?.toLocaleString('en-US', {
      maximumFractionDigits: 2,
    });

  return (
    <>
      {loading && <Loader />}
      {
        localStorage.getItem("special_navigate") === true || localStorage.getItem("special_navigate") === "true" ? <div className="back_link">
          <a onClick={() => { window.history.back() }}>
            <BsArrowLeft />
            <span>Back</span>
          </a>
        </div> : null
      }
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
              Publication control
            </Text>
            <div className="opt_icons_wrap">
              <a
                onClick={() => {
                  setShow(true)
                  setCsv(path1)
                }}
                className="txt_danger_mdm"
              >
                <Tooltip label={"Share"}>
                  <img src={share} className="opt_icons" />
                </Tooltip>
              </a>
              <span onClick={printPublicationTable}>
                <Tooltip label={"Print"}>
                  <img src={print} className="opt_icons" />
                </Tooltip>
              </span>

              <div className="fltr_btn">
                <Text fontSize={"15px"}>
                  <span onClick={() => setHideShow((prevHideShow) => ({
                    ...prevHideShow,
                    status: true,
                    type: "publicationControl"
                  }))}>Sort</span>
                </Text>
                {/* <SortFilterPublication hideShow={hideShow}
                    closeSort={closeSort}
                    sendDataToParent={collectSortParms}
                    sendDataToParent1={collectSortParms1}
                    handleApplySorting={handleApplySorting}

                  /> */}
                {hideShow.type === "publicationControl" &&
                  <SortFilterDashboard
                    hideShow={hideShow}
                    closeSort={closeSort}
                    sendDataToParent={collectSortParms}
                    sendDataToParent1={collectSortParms1}
                    handleApplySorting={handleApplySorting}

                  />
                }

                {/* <SortFilterDashboard /> */}
              </div>

            </div>
          </Flex>
          <TableContainer className="fix_ht_table">
            <Table mx="20px" variant="simple" className="common_table">
              <Thead>
                <Tr>
                  <Th>Publication</Th>
                  <Th>Time & date</Th>
                  <Th>Type</Th>
                  <Th>Rating</Th>
                  <Th>Main office</Th>
                  <Th>Other offices</Th>
                  <Th>Admin details</Th>
                  <Th>Uploaded docs</Th>
                  <Th>Banking details</Th>
                  <Th className="width_th_comn">Legal T&C’s signed</Th>
                  <Th>Check & approve</Th>
                  <Th>Mode</Th>
                  <Th>Status</Th>
                  <Th className="action_th">Action</Th>
                  <Th>Remarks</Th>
                  <Th>Employee details</Th>
                  <Th>CTA</Th>
                </Tr>
              </Thead>
              <Tbody>
                {publicationData &&
                  publicationData.map((curr, index) => {
                    return (
                      <Tr key={curr._id}>
                        <Td className="item_detail">
                          <img
                            src={curr.profile_image}
                            alt="Content thumbnail"
                            style={{ cursor: "pointer" }}
                          />
                          <Text className="nameimg naming_comn">
                            <span className="txt_mdm">{curr.company_name}</span>
                          </Text>
                        </Td>
                        <Td className="timedate_wrap">
                          <p className="timedate">
                            <img src={watch} className="icn_time" />
                            {moment(curr.createdAt).format("hh:mm A")}
                          </p>
                          <p className="timedate">
                            <img src={calendar} className="icn_time" />
                            {moment(curr.createdAt).format("DD MMMM YYYY")}
                          </p>
                        </Td>
                        <Td className="text_center">
                          {
                            curr?.hasOwnProperty("user_type_detail") && <Tooltip label={curr?.user_type_detail?.name}>
                              <img src={curr?.user_type_detail?.icon || monitor} alt="tv" className="icn" />
                            </Tooltip>
                          }
                        </Td>
                        <Td>{(curr?.ratingsforMediahouse || 0).toFixed(1)}</Td>
                        <Td className="item_detail address_details">

                          {curr.office_details && curr.office_details[0] ? (
                            <>
                              {curr.office_details[0]?.address?.country}
                              <br />
                              {curr.office_details[0]?.address?.city}
                              <br />
                              {curr.office_details[0]?.address?.pincode}
                            </>
                          ) : (
                            <p>No Office details found.</p>
                          )}


                          <br />
                        </Td>
                        <Td className="item_detail address_details">
                          Reading,
                          <br />
                          Manchester,
                          <br />
                          Liverpool,
                          <br />
                          Edinburgh
                        </Td>

                        <Td className="item_detail address_details">

                          {curr?.admin_detail?.full_name} <br />
                          {curr?.admin_detail?.department} <br />
                          {`${curr?.admin_detail?.country_code} ${curr?.admin_detail?.phone} `}{" "}
                          <br />
                          {curr?.admin_detail?.email}
                        </Td>
                        <Td className="item_detail address_details">



                          {curr?.upload_docs?.documents ? (
                            curr?.upload_docs?.documents.map((value) => (
                              <img src={docuploaded} className='doc_uploaded' alt="document uploaded" onClick={() => { window.open(value?.url, '_blank') }} />

                            ))
                          ) : (
                            ""
                          )}

                          {/* {curr.upload_docs.documents[0].url} <br />
                          VAT certificate <br />
                          Media license */}
                        </Td>
                        <Td className="contact_details">
                          {curr.company_bank_details.bank_name}
                          <br />
                          Sort Code -{curr.company_bank_details.sort_code}
                          <br />
                          Account - {curr.company_bank_details.account_number}
                        </Td>
                        <Td className="text_center">
                          <Checkbox
                            colorScheme="brandScheme"
                            me="10px"
                            name="is_terms_accepted"
                            checked={curr.is_terms_accepted}
                          />
                        </Td>
                        <Td className="check_aprv_td">
                          <Checkbox
                            colorScheme="brandScheme"
                            me="10px"
                            name="checkAndApprove"
                            isChecked={curr.checkAndApprove}
                            isDisabled={profile?.subadmin_rights?.viewRightOnly && !profile?.subadmin_rights?.controlPublication}

                            onChange={(e) => {
                              curr.checkAndApprove = e.target.checked;
                              setpublicationData((prevItems) => {
                                const updatedItems = [...prevItems];
                                updatedItems[index] = curr;
                                return updatedItems;
                              });
                            }}
                          />
                        </Td>

                        <Td className="select_wrap">
                          <Select
                            value={curr.mode}
                            name="mode"
                            isDisabled={profile?.subadmin_rights?.viewRightOnly && !profile?.subadmin_rights?.controlPublication}

                            onChange={(e) => {
                              curr.mode = e.target.value;
                              setpublicationData((prevItems) => {
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
                        <Td className="big_select_wrap">
                          <Select
                            value={curr.status}
                            name="status"
                            isDisabled={profile?.subadmin_rights?.viewRightOnly && !profile?.subadmin_rights?.controlPublication}

                            onChange={(e) => {
                              curr.status = e.target.value;

                              setpublicationData((prevItems) => {
                                const updatedItems = [...prevItems];
                                updatedItems[index] = curr;
                                return updatedItems;
                              });
                            }}
                          >
                            <option value="pending">Pending</option>
                            <option value="rejected">Rejected</option>
                            <option value="approved">Approved</option>
                          </Select>
                        </Td>
                        <Td>
                          <div className="check_wrap">
                            <Checkbox
                              colorScheme='brandScheme'
                              me='10px'
                              isChecked={curr.isTempBlocked}
                              isDisabled={profile?.subadmin_rights?.viewRightOnly && !profile?.subadmin_rights?.controlPublication}

                              onChange={(e) => {
                                setpublicationData(prevItems => {
                                  const updatedItems = [...prevItems];
                                  updatedItems[index].isTempBlocked = !updatedItems[index].isTempBlocked;
                                  if (updatedItems[index].isTempBlocked && updatedItems[index].isPermanentBlocked) {
                                    updatedItems[index].isPermanentBlocked = false;
                                  }
                                  return updatedItems;
                                });
                              }}
                            />
                            <span>Temporary Block</span>
                          </div>
                          <div className="check_wrap">
                            <Checkbox
                              colorScheme='brandScheme'
                              me='10px'
                              isChecked={curr.isPermanentBlocked}
                              isDisabled={profile?.subadmin_rights?.viewRightOnly && !profile?.subadmin_rights?.controlPublication}

                              onChange={(e) => {
                                setpublicationData(prevItems => {
                                  const updatedItems = [...prevItems];
                                  updatedItems[index].isPermanentBlocked = !updatedItems[index].isPermanentBlocked;
                                  if (updatedItems[index].isPermanentBlocked && updatedItems[index].isTempBlocked) {
                                    updatedItems[index].isTempBlocked = false;
                                  }
                                  return updatedItems;
                                });

                              }}
                            />
                            <span>Permanent Block</span>
                          </div>
                        </Td>
                        <Td className="remarks_wrap">
                          <Textarea
                            placeholder="Enter remarks if any..."
                            id={curr._id}
                            value={curr.remarks}
                            isDisabled={profile?.subadmin_rights?.viewRightOnly && !profile?.subadmin_rights?.controlPublication}

                            name="latestAdminRemark"
                            onChange={(e) => {
                              curr.remarks = e.target.value;
                              setpublicationData((prevItems) => {
                                const updatedItems = [...prevItems];
                                updatedItems[index] = curr;

                                return updatedItems;
                                {
                                }
                              });
                            }}
                          />
                        </Td>
                        <Td className="timedate_wrap">
                          <p className="timedate">{curr?.adminData?.name}</p>
                          <p className="timedate">
                            <img src={watch} className="icn_time" />
                            {moment(curr.updatedAt).format("hh:mm A")}
                          </p>
                          <p className="timedate">
                            <img src={calendar} className="icn_time" />
                            {moment(curr.updatedAt).format("DD MMMM YYYY")}
                          </p>
                          <a
                            onClick={() => {
                              history.push(
                                `/admin/publication-control-history/${curr._id}/Publication Control history/Manage publications`
                              );
                            }}
                            className="timedate"
                          >
                            <BsEye className="icn_time" />
                            View history
                          </a>
                        </Td>
                        <Td>
                          {(profile?.subadmin_rights?.viewRightOnly && profile?.subadmin_rights?.controlPublication) ||
                            profile?.subadmin_rights?.controlPublication ? (
                            <Button className="theme_btn tbl_btn" onClick={() => handleSave(index)}>Save</Button>
                          ) : (
                            <Button className="theme_btn tbl_btn" onClick={() => handleSave(index)} disabled>Save</Button>
                          )}
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
            onPageChange={handlePageChange1}
            pageRangeDisplayed={4}
            pageCount={totalPages1}
            previousLabel="<"
            renderOnZeroPageCount={null}
            forcePage={currentPage1 - 1}
          />
        </div>
      </Card>

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
            fontFamily={"AirbnbBold"}
          >
            Content purchased online Summary
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
            <span onClick={() => printPurchaseContentTable(currentPagePurchasedContent)}>
              <Tooltip label={"Print"}>
                <img src={print} className="opt_icons" />
              </Tooltip>
            </span>
            <div className="fltr_btn">
              <Text fontSize={"15px"}>
                <span onClick={() => setHideShow((prevHideShow) => ({
                  ...prevHideShow,
                  status: true,
                  type: "purchasedPublicationContent"
                }))}>Sort</span>
              </Text>
              {hideShow.type === "purchasedPublicationContent" &&
                <SortFilterPublication hideShow={hideShow}
                  closeSort={closeSort}
                  sendDataToParent={collectSortParms}
                  sendDataToParent1={collectSortParms1}
                  handleApplySorting={handleApplySorting}
                />}

              {/* <SortFilterDashboard /> */}
            </div>
          </div>
        </Flex>
        <TableContainer className="fix_ht_table">
          <Table mx="20px" variant="simple" className="common_table">
            <Thead>
              <Tr>
                <Th>Publication</Th>
                <Th>Purchased content (Qty)</Th>
                <Th>Purchased content (Value)</Th>
                <Th>Total amount received</Th>
                <Th>Total presshop commission</Th>
                <Th>Total amount paid</Th>
                <Th>Total amount payable</Th>
                {/* <Th>Total payment received</Th>
                <Th>Payment receivable</Th> */}
                <Th>Mode</Th>
                <Th>Remarks</Th>
                <Th>Employee details</Th>
                <Th>CTA</Th>
              </Tr>
            </Thead>
            <Tbody>
              {purchasedData &&
                purchasedData.map((curr, index) => {
                  return (
                    <Tr key={curr._id}>
                      <Td className="item_detail">
                        <Link to={`/admin/publication-purchased-content-detail/${curr._id}/Manage publications`}>
                          {/* <a onClick={() => { history.push("/admin/publication-purchased-content-detail") }}></a> */}
                          <img src={curr?.profile_image} alt="Content thumbnail" />
                          <Text className="nameimg naming_comn">
                            <span className="txt_mdm">{curr?.company_name}</span>
                          </Text>
                        </Link>
                      </Td>
                      <Td>{formatAmountInMillion(curr?.purchased_qty || 0)}</Td>
                      <Td>&pound;{formatAmountInMillion(curr?.purchased_content_value || 0)}</Td>
                      <Td className="">&pound;{formatAmountInMillion(curr?.purchased_content_value || 0)}</Td>
                      <Td>&pound;{formatAmountInMillion(curr?.total_presshop_commission || 0)}</Td>
                      <Td>&pound;{formatAmountInMillion(curr?.total_amount_paid || 0)}</Td>
                      <Td>
                        &pound;{formatAmountInMillion(curr?.total_amount_payable || 0)}

                      </Td>
                      <Td className="select_wrap">
                        <Select
                          defaultValue={curr?.history_detail?.mode}
                          name="mode"
                          media_house_id={curr?._id}
                          isDisabled={profile?.subadmin_rights?.viewRightOnly && !profile?.subadmin_rights?.controlPublication}

                          onChange={(e) => {
                            const updatedCurr = { ...curr }; // Create a copy of the curr object
                            updatedCurr.mode = e.target.value; // Update the mode property of the copy
                            setPurchasedData((prevItems) => {
                              const updatedItems = [...prevItems];
                              updatedItems[index] = updatedCurr; // Use the updatedCurr instead of curr
                              return updatedItems;
                            });
                          }}
                        >
                          <option value="call">Call</option>
                          <option value="chat">Chat</option>
                        </Select>
                      </Td>
                      <Td className="remarks_wrap">
                        <Textarea
                          placeholder="Enter remarks, or action to be taken..."
                          defaultValue={curr?.history_detail?.remarks}
                          media_house_id={curr?._id}
                          isDisabled={profile?.subadmin_rights?.viewRightOnly && !profile?.subadmin_rights?.controlPublication}

                          onChange={(e) => {
                            const updatedCurr = { ...curr }; // Create a copy of the curr object
                            updatedCurr.remarks = e.target.value; // Update the remarks property of the copy

                            setPurchasedData((prevItems) => {
                              const updatedItems = [...prevItems];
                              updatedItems[index] = updatedCurr; // Use the updatedCurr instead of curr

                              return updatedItems;
                            });
                          }}
                        />

                      </Td>
                      <Td className="timedate_wrap">
                        <p className="timedate">{curr?.history_detail?.admin_detail?.name === "" ? "no history created" : curr?.history_detail?.admin_detail?.name}</p>
                        <p className="timedate">
                          <img src={watch} className="icn_time" />
                          {moment(curr?.history_detail?.updatedAt).format("hh:mm A")}
                        </p>
                        <p className="timedate">
                          <img src={calendar} className="icn_time" />
                          {moment(curr?.history_detail?.updatedAt).format("DD MMMM YYYY")}
                        </p>
                        <a
                          onClick={() => {
                            history.push(`/admin/purchased-content-history/${curr?._id}/Manage publications`);
                          }}
                          className="timedate"
                        >
                          <BsEye className="icn_time" />
                          View history
                        </a>
                      </Td>
                      <Td>
                        {(profile?.subadmin_rights?.viewRightOnly && profile?.subadmin_rights?.controlPublication) ||
                          profile?.subadmin_rights?.controlPublication ? (
                          <Button className="theme_btn tbl_btn" onClick={() => UpdatePurchaseData(index)}>Save</Button>
                        ) : (
                          <Button className="theme_btn tbl_btn" onClick={() => UpdatePurchaseData(index)} disabled>Save</Button>
                        )}
                        {/* <Button
                          className="theme_btn tbl_btn"
                          onClick={() => UpdatePurchaseData(index)}
                        >
                          Save
                        </Button> */}
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
          onPageChange={handlePageChangePurchasedContent}
          pageRangeDisplayed={4}
          pageCount={totalPagesPurchasedContent}
          previousLabel="<"
          renderOnZeroPageCount={null}
          forcePage={currentPagePurchasedContent - 1}
        />
      </Card>

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
            fontFamily={"AirbnbBold"}
          >
            Content sourced from task Summary
          </Text>
          <div className="opt_icons_wrap">
            <a
              onClick={() => {
                setShow(true)
                setCsv(path3)

              }}
              className="txt_danger_mdm"
            >
              <img src={share} className="opt_icons" />
            </a>
            <span onClick={() => printSourcedContentTable(currentPageSourcedContent)}><img src={print} className="opt_icons" /></span>
            <div className="fltr_btn">
              <Text fontSize={"15px"}>
                <span onClick={() => setHideShow((prevHideShow) => ({
                  ...prevHideShow,
                  status: true,
                  type: "purchasedPublicationTask"
                }))}>Sort</span>
              </Text>
              {hideShow.type === "purchasedPublicationTask" &&
                <SortFilterPublication hideShow={hideShow}
                  closeSort={closeSort}
                  sendDataToParent={collectSortParms}
                  sendDataToParent1={collectSortParms1}
                  handleApplySorting={handleApplySorting}
                />}

              {/* <SortFilterDashboard /> */}
            </div>
          </div>
        </Flex>
        <TableContainer className="fix_ht_table">
          <Table mx="20px" variant="simple" className="common_table">
            <Thead>
              <Tr>
                <Th>Publication</Th>
                <Th>Tasks broadcasted</Th>
                <Th>Purchased content (Qty)</Th>
                <Th>Purchased content (Value)</Th>
                <Th>Total amount received</Th>
                <Th>Total presshop commission</Th>
                <Th>Total amount paid</Th>
                <Th>Total amount payable</Th>
                {/* <Th>Total payment received</Th>
                <Th>Payment receivable</Th> */}
                <Th>Mode</Th>
                <Th>Remarks</Th>
                <Th>Employee details</Th>
                <Th>CTA</Th>
              </Tr>
            </Thead>
            <Tbody>
              {sourcedData &&
                sourcedData.map((curr, index) => {

                  return (
                    <Tr key={curr?.index}>
                      <Td className="item_detail">
                        <a onClick={() => { handleLinkClick(curr) }}>
                          <img src={curr?.profile_image} alt="Content thumbnail" />
                          <Text className="nameimg naming_comn">
                            <span className="txt_mdm">{curr?.company_name}</span>
                          </Text>
                        </a>
                      </Td>
                      <Td>{curr?.sourcedContentSumSize}</Td>
                      <Td>{curr?.purchased_qty || 0}</Td>
                      <Td>£ {formatAmountInMillion(curr?.purchased_content_value || 0)}</Td>
                      <Td>£ {formatAmountInMillion(curr?.total_amount_recieved || 0)} </Td>
                      <Td>£ {formatAmountInMillion(curr?.total_presshop_commission || 0)}</Td>
                      <Td>£ {formatAmountInMillion(curr?.total_amount_paid || 0)} </Td>
                      <Td>£ {formatAmountInMillion(curr?.total_amount_payable || 0)}</Td>
                      <Td className="select_wrap">
                        <Select
                          value={curr?.mode}
                          name="mode"
                          media_house_id={curr._id}
                          isDisabled={profile?.subadmin_rights?.viewRightOnly && !profile?.subadmin_rights?.controlPublication}

                          onChange={(e) => {
                            curr.mode = e.target.value
                            setSourcedData((prevItem) => {
                              const UpdatedItem = [...prevItem];
                              UpdatedItem[index] = curr;
                              return UpdatedItem;
                            });
                          }}
                        >
                          <option value="chat">Chat</option>
                          <option value="call">Call</option>
                        </Select>
                      </Td>
                      <Td className="remarks_wrap">
                        <Textarea
                          placeholder="Enter remarks, or action to be taken..."
                          value={curr?.remarks || ""}
                          media_house_id={curr?._id}
                          isDisabled={profile?.subadmin_rights?.viewRightOnly && !profile?.subadmin_rights?.controlPublication}

                          onChange={(e) => {
                            curr.remarks = e.target.value;
                            setSourcedData((prevItem) => {
                              const UpdatedItem = [...prevItem];
                              UpdatedItem[index] = curr;
                              return UpdatedItem;
                            });
                          }}
                        />
                      </Td>
                      <Td className="timedate_wrap">
                        <p className="timedate">
                          {curr?.admin_data ? curr?.admin_data?.name : "no remarks "}


                          {/* {curr?.admin_data?.name} */}
                        </p>
                        <p className="timedate">
                          <img src={watch} className="icn_time" />
                          {moment(curr?.createdAt).format("hh:mm A")}
                        </p>
                        <p className="timedate">
                          <img src={calendar} className="icn_time" />
                          {moment(curr?.createdAt).format("DD MMMM YYYY")}
                        </p>
                        <a onClick={() => history.push(`/admin/sorced-content-summary-history/${curr?._id}/Manage publications`)} className="timedate">
                          <BsEye className="icn_time" />
                          View history
                        </a>
                      </Td>
                      <Td>
                        {(profile?.subadmin_rights?.viewRightOnly && profile?.subadmin_rights?.controlPublication) ||
                          profile?.subadmin_rights?.controlPublication ? (
                          <Button className="theme_btn tbl_btn" onClick={() => UpdateSourcedContent(index)}>Save</Button>
                        ) : (
                          <Button className="theme_btn tbl_btn" onClick={() => UpdateSourcedContent(index)} disabled>Save</Button>
                        )}
                        {/* <Button
                          className="theme_btn tbl_btn"
                          onClick={() => UpdateSourcedContent(index)}
                        >
                          Save
                        </Button> */}
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
          onPageChange={handlePageChangeSourcedContent}
          pageRangeDisplayed={4}
          pageCount={totalPagesSourcedContent}
          previousLabel="<"
          renderOnZeroPageCount={null}
          forcePage={currentPageSourcedContent - 1}
        />
      </Card>

      <Share show={show} csv={csv} update={handleClose} />
    </>
  );
}
