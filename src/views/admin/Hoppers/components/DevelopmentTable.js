/* eslint-disable */
import { Flex, Table, Tbody, Td, Text, Th, Thead, Tr, useColorModeValue, TableContainer, Checkbox, Textarea, Select, Button, FormControl } from "@chakra-ui/react";
import Card from "components/card/Card";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { useGlobalFilter, usePagination, useSortBy, useTable, } from "react-table";
import img1 from "assets/img/nfts/Nft4.png";
import img2 from "assets/img/avatars/avatar2.png";
import img3 from "assets/img/nfts/Nft2.png";
import { useHistory } from "react-router-dom";
import mobile from "assets/img/icons/mobile.svg";
import watch from "assets/img/icons/watch.svg";
import calendar from "assets/img/icons/calendar.svg";
import mail from "assets/img/icons/mail.svg";
import pro from "assets/img/icons/pro.png";
import amt from "assets/img/icons/amature.png";
import celebrity from "assets/img/icons/celebrity.png";
import camera from "assets/img/icons/camera.svg";
import avt1 from "assets/img/avatars/avt1.png";
import avt2 from "assets/img/avatars/avt2.png";
import avt3 from "assets/img/avatars/avt3.png";
import avt4 from "assets/img/avatars/avt4.png";
import avt11 from "assets/img/avatars/avatar11.png";
import avt12 from "assets/img/avatars/avatar12.png";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { BsEye } from "react-icons/bs";
import { Tooltip } from '@chakra-ui/react';
import share from "assets/img/icons/share.png";
import print from "assets/img/icons/print.png";
import { Get } from "api/admin.services";
import moment from "moment/moment"
import { Patch } from "api/admin.services";
import publication1 from "assets/img/profile/publication1.svg";
import publication2 from "assets/img/profile/publication2.png";
import publication3 from "assets/img/profile/publication3.svg";
import interview from "assets/img/icons/interview.svg";
import crime from "assets/img/icons/crime.svg";
import video from "assets/img/icons/video.svg";
import { toast } from "react-toastify";
import ReactPaginate from "react-paginate";
import { Post } from "api/admin.services";
import { async } from "@firebase/util";
import docuploaded from "assets/img/icons/img-upld.svg";
import idimg from "assets/img/icons/id.svg";
import invic from "assets/img/icons/invoice.svg";
import Loader from "components/Loader";
import Timer from "views/admin/Timer";
import dataContext from "views/admin/ContextFolder/Createcontext";
import Share from "components/share/Share";
import SortFilterHopper from "components/sortfilters/SortFilterHopper";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";


export default function DevelopmentTable(props) {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const { profile } = useContext(dataContext)
  const history = useHistory()
  const { columnsData, tableData } = props;
  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => tableData, [tableData]);
  const [hopperDetails, setHopperDetails] = useState([])
  const [liveTasks, setLiveTasks] = useState([])
  const [uploadedCont, setUploadCont] = useState([])
  const [publishedCont, setPublishedCont] = useState([])
  const [loading, setLoading] = useState(false)
  const [checkedMoreHopper, setCheckedMoreHopper] = useState([])
  // for share 
  const [path1, setpath1] = useState("")
  const [path2, setpath2] = useState("")
  const [path3, setpath3] = useState("")
  const [path4, setpath4] = useState("")
  const [show, setShow] = useState(false)
  const [csv, setCsv] = useState("")

  // states for pagination published content summary
  const pubCont = queryParams.get('pubCont');
  const [currentPage, setCurrentPage] = useState(pubCont || 1);
  const [totalPages, setTotalPages] = useState(0);
  const perPage = 5;

  // Upload content summary
  const uploadCont = queryParams.get('uploadCont');
  const [currentPageUpload, setCurrentPageUpload] = useState(uploadCont || 1);
  const [totalPages1, setTotalPages1] = useState(0);

  // live task 
  const liveTask = queryParams.get('liveTask');
  const [currentPageLiveTask, setCurrentPageLiveTask] = useState(liveTask || 1);
  const [totalLiveTaskPages, setTotalLiveTaskPages] = useState(0);

  // hopper list
  const hopperList = queryParams.get('hopperList');
  const [currentPageHopperList, setCurrentPageHopperList] = useState(hopperList || 1);
  const [totalHopperListPages, setTotalHopperListPages] = useState(0);



  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );
  const {
    initialState,
  } = tableInstance;
  initialState.pageSize = 11;

  const textColor = useColorModeValue("#000", "white");

  const HopperControls = async (page, parametersName, parameters) => {
    const offset = (page - 1) * perPage;

    setLoading(true)
    try {

      await Get(`admin/getHopperList?limit=${perPage}&offset=${offset}&${parametersName}=${parameters}`).then((res) => {
        setHopperDetails(res.data.response.hopperList);
        console.log('res?.data', res?.data)
        setTotalHopperListPages(res.data.response?.totalCount / perPage)
        setpath1(res?.data?.fullPath)
        setLoading(false)
      })
    } catch (er) {
      console.log(error)
      setLoading(false)
    }


  }
  const handlePageChangeHopper = (selectedPage) => {
    setCurrentPageHopperList(selectedPage.selected + 1);
    history.push(`?hopperList=${selectedPage.selected + 1}`);
  }
  // download csv

  const DownloadCsvHopper = async (page) => {
    const offset = (page - 1) * perPage;
    try {
      const response = await Get(`admin/getHopperList?offset=${offset}&limit=${perPage}`);
      if (response) {
        const path = response?.data?.fullPath;
        window.open(path);
      }
    } catch (err) {
      console.log("<---Have an error ->", err);
      setLoading(false);
    }


  }


  // post Api
  const handleSave = async (index) => {
    try {
      const remarks = hopperDetails[index].latestAdminRemark;
      const mode = hopperDetails[index].mode;

      if (!remarks || /^\s*$/.test(remarks) || mode === null || mode === undefined || /^\s+/.test(mode)) {
        toast.error("Remarks and mode are required");
        return;
      }


      let obj = {
        hopper_id: hopperDetails[index]._id,
        status: hopperDetails[index].status,
        category: hopperDetails[index].category,
        mode: mode,
        latestAdminRemark: remarks,
        checkAndApprove: hopperDetails[index].checkAndApprove,
        isTempBlocked: hopperDetails[index].isTempBlocked,
        isPermanentBlocked: hopperDetails[index].isPermanentBlocked,

      }
      await Patch(`admin/editHopper`, obj).then((res) => {
        toast.success("updated")
        HopperControls(currentPageHopperList)

      })
    } catch (err) {
      console.log(err)
      setLoading(false)
    }
  }


  // live task 
  const getLiveTask = async (page, parametersName, parameters) => {
    setLoading(true)
    const offset = (page - 1) * perPage;
    try {
      await Get(`admin/liveTasks?offset=${offset}&limit=${perPage}&${parametersName}=${parameters}`).then((res) => {
        console.log(res, `response of live task `)
        setLiveTasks(res.data?.response)
        setTotalLiveTaskPages(res.data?.count / perPage)
        setpath2(res?.data?.fullPath)
        setLoading(false)
      })
    } catch (err) {
      setLoading(false)

    }
  }

  // for pagination

  const handlePageChangeLiveTask = (selectedPage) => {
    setCurrentPageLiveTask(selectedPage.selected + 1);
    history.push(`?liveTask=${selectedPage.selected + 1}`);
  }

  // download csv
  const DownloadCsvLiveTask = async (page, parametersName, parameters) => {
    const offset = (page - 1) * perPage;
    try {
      const response = await Get(`admin/liveTasks?offset=${offset}&limit=${perPage}&${parametersName}=${parameters}`)
      if (response) {
        const path = response?.data?.fullPath;
        window.open(path)
      }
    } catch (err) {
      setLoading(false)
    }
  };

  // Edit Live task
  const EditLiveTask = async (index) => {
    let obj = {
      task_id: liveTasks[index]._id,
      latestAdminRemark: liveTasks[index].remarks,
      mode: liveTasks[index].mode,
      assign_more_hopper: checkedMoreHopper,

    }
    if (
      !liveTasks[index].mode ||
      liveTasks[index].mode.trim() === null
    ) {
      toast.error("Choose mode");
    } else if (
      !liveTasks[index].remarks ||
      liveTasks[index].remarks.trim() === ""
    ) {
      toast.error("Enter Remarks");
    } else {

      try {
        await Patch(`admin/editLivetask`, obj).then((res) => {
          toast.success("Updated")
          getLiveTask(currentPageLiveTask);
          setCheckedMoreHopper("")
        })

      } catch (error) {

        toast.error(error?.response?.data?.errors?.msg, `<live task errror`)
      }

    }
  }
  const handleRowSelect = (id) => {
    console.log(id,)
    setCheckedMoreHopper((prev) => {
      if (prev.includes(id)) {
        return prev.filter((rowId) => rowId !== id);
      } else {
        return [...prev, id];
      }
    })
  }


  // published content summarry
  const getUploadContentSummary = async (page, parameters, parametersName) => {
    setLoading(true)
    const offset = (page - 1) * perPage;

    try {
      await Get(`admin/uploaded/content/summery/hopper?offset=${offset}&limit=${perPage}&${parametersName}=${parameters}`).then((res) => {

        setUploadCont(res?.data?.uploadedContentSummeryHopper[0].data)
        setTotalPages1(res?.data?.uploadedContentSummeryHopper[0].totalCount[0].count / perPage)
        setpath4(res?.data?.fullpath)
        setLoading(false)
      })

    } catch (err) {
      console.log(err)

    }
  }

  // download csv file for Uploaded Content summary
  const downloadCsvUploadedContent = async (page) => {
    const offset = (page - 1) * perPage;
    try {
      const response = await Get(`admin/uploaded/content/summery/hopper?offset=${offset}&limit=${perPage}`)
      if (response) {
        const path = response?.data?.fullpath;
        window.open(path)
      }
    } catch (err) {
      console.log("<---Have an error ->", err);
    }
  };



  const handlePageChangeUpload = (selectedPage) => {
    setCurrentPageUpload(selectedPage.selected + 1);
    history.push(`?uploadCont=${selectedPage.selected + 1}`);
  }

  // edit  uploadContent history
  const uploadContenthistory = async (index) => {
    try {

      const remarks = uploadedCont[index].uploaded_content_remarks;
      const mode = uploadedCont[index].uploaded_content_admin_mode;

      if (!remarks || /^\s*$/.test(remarks) || mode === null || mode === undefined || /^\s+/.test(mode)) {
        toast.error("Remarks and mode are required");
        return;
      }


      const obj = {
        mode: mode,
        remarks: remarks,
        hopper_id: uploadedCont[index]._id,
        Tasksaccepted: uploadedCont[index].accepted_tasks,
        UploadedcontentValue: uploadedCont[index].uploaded_content_val,
        UploadedcontentQty: uploadedCont[index].uploaded_content,
      };

      await Patch(`admin/edit/uploaded/Content/Summery/Hopper`, obj).then((res) => {
        toast.success("updated");
        getUploadContentSummary(currentPageUpload);
      });
    } catch (err) {
      // Handle error
    }
  };



  const getPublishedContentSummary = async (page, parametersName, parameters) => {
    setLoading(true)
    const offset = (page - 1) * perPage;
    try {
      await Get(`admin/published/content/summery/hopper?offset=${offset}&limit=${perPage}&${parametersName}=${parameters}`).then((res) => {
        setPublishedCont(res?.data?.publishedContentSummeryHopper)
        setpath3(res?.data?.fullpath)
        setTotalPages(res?.data?.count / perPage);
        setLoading(false)
      })

    } catch (err) {
      console.log(err)

    }
  }

  // edit 
  const editPublishedContentSummary = async (index) => {
    try {
      const remarks = publishedCont[index].published_content_remarks;
      const mode = publishedCont[index].published_content_admin_mode;

      if (!remarks || /^\s*$/.test(remarks) || mode === null || mode === undefined || /^\s+/.test(mode)) {
        toast.error("Remarks and mode are required");
        return;
      }

      const obj = {
        mode: mode,
        remarks: remarks,
        hopper_id: publishedCont[index]._id,
        avatar: publishedCont[index].avatar,
        published_qty: publishedCont[index].published_content_qty,
        published_content_val: publishedCont[index].published_content_val,
        total_payment_earned: publishedCont[index].total_payment_earned,
        // payment_pending,
        // payment_due_date,
        // presshop_commission
      };

      await Patch(`admin/edit/published/content/summery/hopper`, obj).then((res) => {
        toast.success("updated");
        getPublishedContentSummary(currentPage);
      });
    } catch (err) {
      // Handle error
    }
  };
  // download csv for published content summary
  const publisedContentCsv = async (page) => {
    const offset = (page - 1) * perPage;
    try {
      const response = await Get(`admin/published/content/summery/hopper?offset=${offset}&limit=${perPage}`)
      if (response) {
        const path = response?.data?.fullpath;
        window.open(path)
      }
    } catch (err) {
      console.log("<---Have an error ->", err);
    }
  }


  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected + 1);
    history.push(`?pubCont=${selectedPage.selected + 1}`);
  }

  useEffect(() => {
    getPublishedContentSummary(currentPage);
  }, [currentPage]);

  useEffect(() => {
    getUploadContentSummary(currentPageUpload);
  }, [currentPageUpload])


  useEffect(() => {
    HopperControls(currentPageHopperList)
    getLiveTask(currentPageLiveTask);

  }, [currentPageLiveTask, currentPageHopperList])


  // sending multiple id's
  const handleLinkClick = (curr) => {
    const queryParams = new URLSearchParams();
    queryParams.append('task_id', JSON.stringify(curr?.task_id));
    queryParams.append('hopper_id', curr?._id);
    queryParams.append('component', "Manage hoppers");

    history.push({
      pathname: `/admin/hopper-uploaded-content/${JSON.stringify(curr?.task_id)}/${curr?._id}/Manage hoppers`,
      search: queryParams.toString()
    });
  };

  const handleClose = () => {
    setShow(!show)
  }

  // sorting

  const [parameters, setParameters] = useState('')
  const [parametersName, setParametersName] = useState('')

  const [hideShow, setHideShow] = useState({
    status: false,
    type: ""
  })

  const closeSort = () => {
    setHideShow((prevHideShow) => ({
      ...prevHideShow,
      status: false,
      // type: ""
    }));
  };
  const collectSortParms = (name, order) => {
    setParameters(order)
    setParametersName(name)
  }

  const handleApplySorting = () => {
    if (hideShow?.type === "Hopper controls") {
      HopperControls(currentPageHopperList, parametersName, parameters);
      setParameters('')
      setParametersName('')
      closeSort()

    } else if (hideShow?.type === "Task control") {
      getLiveTask(currentPageLiveTask, parametersName, parameters);
      setParameters('')
      setParametersName('')
      closeSort()

    } else if (hideShow?.type === "Published content summary") {
      getPublishedContentSummary(currentPage, parametersName, parameters);
      setParameters('')
      setParametersName('')
      closeSort()


    } else if (hideShow?.type === "Uploaded content summary") {
      getUploadContentSummary(currentPageUpload, parametersName, parameters);
      setParameters('')
      setParametersName('')
      closeSort()

    }
  };

  // amount comma seprator
  const formatAmountInMillion = (amount) =>
    amount?.toLocaleString('en-US', {
      maximumFractionDigits: 0,
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
        direction='column'
        w='100%'
        px='0px'
        mb='24px'
        overflowX={{ sm: "scroll", lg: "hidden" }}>
        <Flex px='20px' justify='space-between' mb='10px' align='center'>
          <Text
            color={textColor}
            fontSize='22px'
            lineHeight='100%'
            fontFamily={"AirbnbBold"}>
            Hopper controls
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
            <span onClick={() => DownloadCsvHopper(currentPageHopperList)}>
              <Tooltip label={"Print"}>
                <img src={print} className="opt_icons" />
              </Tooltip>
            </span>

            <div className="fltr_btn">
              <Text fontSize={"15px"}>
                <span onClick={() => setHideShow((prevHideShow) => ({
                  ...prevHideShow,
                  status: true,
                  type: "Hopper controls"
                }))}>Sort</span>
              </Text>
              {hideShow.type === "Hopper controls" &&
                <SortFilterHopper hideShow={hideShow}
                  closeSort={closeSort}
                  sendDataToParent={collectSortParms}
                  handleApplySorting={handleApplySorting}
                />}

              {/* <SortFilterDashboard /> */}
            </div>
          </div>
        </Flex>
        <TableContainer className="fix_ht_table">
          <Table mx='20px' variant='simple' className="common_table">
            <Thead>
              <Tr>
                <Th>Hopper details</Th>
                <Th>Time & date</Th>
                <Th className="adr_dtl">Address</Th>
                <Th>Contact details</Th>
                <Th>Category</Th>
                <Th>Ratings</Th>
                <Th>Uploaded docs</Th>
                <Th>Banking details</Th>
                <Th>Legal T&C's signed</Th>
                <Th>Check & approve</Th>
                <Th>Mode</Th>
                <Th>Status</Th>
                <Th className="actn_blck">Action</Th>
                <Th>Remarks</Th>
                <Th>User details</Th>
                <Th>CTA</Th>
              </Tr>
            </Thead>
            <Tbody>
              {hopperDetails && hopperDetails.map((curr, index) => {

                return (
                  <Tr key={curr._id}>

                    <Td className="item_detail">
                      <img src={process.env.REACT_APP_HOPPER_AVATAR + curr?.avatarData?.avatar} alt="Content thumbnail" style={{ cursor: "pointer" }} />
                      <Text className="nameimg naming_comn"><span className="txt_mdm">{`${curr.first_name} ${curr.last_name}`}</span><br />
                        <span >({curr?.user_name})</span></Text>
                    </Td>
                    <Td className="timedate_wrap">
                      <p className="timedate"><img src={watch} className="icn_time" />{moment(curr.createdAt).format('hh:mm A')}</p>
                      <p className="timedate"><img src={calendar} className="icn_time" />{moment(curr.createdAt).format('DD MMMM YYYY')}</p>
                    </Td>
                    <Td className="address_wrap">{curr.address}</Td>
                    <Td className="contact_details">
                      <div className="mobile detail_itm">
                        <img src={mobile} className="icn" />
                        <span>{curr.country_code}&nbsp;{curr.phone}</span>
                      </div>
                      <div className="mobile detail_itm">
                        <img src={mail} className="icn" />
                        <span className="eml_id">{curr.email}</span>
                      </div>
                    </Td>

                    <Td className="text_center hpr_catg_td">
                      <img src={curr.category === "amateur" ? amt : pro} className="catgr_img m_auto" />
                      <Select
                        mt="10px"
                        className="hpr_catgr"
                        value={curr.category} name="category"
                        isDisabled={profile?.subadmin_rights?.viewRightOnly && profile?.subadmin_rights?.controlHopper && (curr?.status !== "approved" || !curr?.doc_to_become_pro)}
                        onChange={(e) => {
                          curr.category = e.target.value;
                          setHopperDetails(prevItems => {
                            const updatedItems = [...prevItems];
                            updatedItems[index] = curr;
                            return updatedItems;
                          });
                        }
                        }>
                        <option value="pro">PRO</option>
                        <option value="amateur">Amateur</option>

                      </Select>
                    </Td>
                    <Td>4.1</Td>
                    <Td className="contact_details">
                      {
                        curr?.doc_to_become_pro && curr?.doc_to_become_pro?.comp_incorporation_cert !== null ? <div className="doc_flex"> <img src={docuploaded} className='doc_uploaded' alt="document uploaded"
                          onClick={() => { window.open(process.env.REACT_APP_HOPPER_Docs_App + curr?.doc_to_become_pro?.comp_incorporation_cert, '_blank') }} /> <p className="text_center">{curr?.doc_to_become_pro?.comp_incorporation_cert_mediatype}</p> </div> : ""
                      }
                      {
                        curr?.doc_to_become_pro && curr?.doc_to_become_pro?.govt_id !== null ? <div className="doc_flex"><img src={docuploaded} className='doc_uploaded' alt="document uploaded"
                          onClick={() => { window.open(process.env.REACT_APP_HOPPER_Docs_App + curr?.doc_to_become_pro?.govt_id, '_blank') }} /> <p className="text_center">{curr?.doc_to_become_pro?.govt_id_mediatype}</p></div> : ""

                      }
                      {
                        curr?.doc_to_become_pro && curr?.doc_to_become_pro?.photography_licence !== null ? <div className="doc_flex"> <img src={docuploaded} className='doc_uploaded' alt="document uploaded"
                          onClick={() => { window.open(process.env.REACT_APP_HOPPER_Docs_App + curr?.doc_to_become_pro?.photography_licence, '_blank') }} /> <p className="text_center">{curr?.doc_to_become_pro?.photography_mediatype}</p></div> : ""
                      }

                    </Td>


                    <Td className="contact_details">{curr?.bank_detail[0]?.bank_name}<br /> Sort Code - {curr?.bank_detail[0]?.sort_code}<br /> Account - {curr?.bank_detail[0]?.acc_number}</Td>
                    <Td className="check_td">
                      <Checkbox
                        colorScheme='brandScheme'
                        me='10px'
                        isChecked={curr.is_terms_accepted === true ? true : false}
                      />

                    </Td>

                    <Td className="check_aprv_td">
                      <Checkbox
                        colorScheme='brandScheme'
                        me='10px'
                        name="checkAndApprove"
                        isChecked={curr.checkAndApprove}
                        isDisabled={profile?.subadmin_rights?.viewRightOnly && !profile?.subadmin_rights?.controlHopper}

                        onChange={(e) => {
                          curr.checkAndApprove = e.target.checked;
                          setHopperDetails(prevItems => {
                            const updatedItems = [...prevItems];
                            updatedItems[index] = curr;
                            return updatedItems;
                          });
                        }}
                      />
                    </Td>

                    <Td className="select_wrap">
                      <Select value={curr.mode} name="mode"
                        isDisabled={profile?.subadmin_rights?.viewRightOnly && !profile?.subadmin_rights?.controlHopper}

                        onChange={(e) => {
                          curr.mode = e.target.value
                          setHopperDetails(prevItems => {
                            const updatedItems = [...prevItems];
                            updatedItems[index] = curr;
                            return updatedItems;
                          });
                        }
                        }>
                        <option value='call'>Call</option>
                        <option value='chat'>Chat</option>
                      </Select>
                    </Td>

                    <Td className="big_select_wrap">
                      <Select value={curr.status} name="status"
                        isDisabled={profile?.subadmin_rights?.viewRightOnly && !profile?.subadmin_rights?.controlHopper}

                        onChange={(e) => {
                          curr.status = e.target.value
                          setHopperDetails(prevItems => {
                            const updatedItems = [...prevItems];
                            updatedItems[index] = curr;
                            return updatedItems;
                          });
                        }

                        }  >
                        <option value='pending'>Pending</option>
                        <option value='approved'>Approved</option>
                        <option value='rejected'>Rejected</option>
                      </Select>
                    </Td>
                    <Td>
                      <div className="check_wrap">
                        <Checkbox
                          colorScheme='brandScheme'
                          me='10px'
                          isChecked={curr.isTempBlocked}
                          isDisabled={profile?.subadmin_rights?.viewRightOnly && !profile?.subadmin_rights?.controlHopper}

                          onChange={(e) => {
                            setHopperDetails(prevItems => {
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
                          isDisabled={profile?.subadmin_rights?.viewRightOnly && !profile?.subadmin_rights?.controlHopper}

                          onChange={(e) => {
                            setHopperDetails(prevItems => {
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
                      <Textarea placeholder='Enter remarks if any...'
                        id={curr._id} value={curr.latestAdminRemark} name="latestAdminRemark"
                        isDisabled={profile?.subadmin_rights?.viewRightOnly && !profile?.subadmin_rights?.controlHopper}

                        onChange={(e) => {
                          curr.latestAdminRemark = e.target.value;
                          setHopperDetails(prevItems => {
                            const updatedItems = [...prevItems];
                            updatedItems[index] = curr;
                            return updatedItems;
                          });
                        }} />

                    </Td>

                    <Td className="timedate_wrap">
                      <p className="timedate emp_nme">
                        {curr?.adminData ? curr?.adminData?.name : "no remarks "}


                      </p>
                      <p className="timedate"><img src={watch} className="icn_time" />{moment(curr.updatedAt).format('hh:mm A')}</p>
                      <p className="timedate"><img src={calendar} className="icn_time" />{moment(curr.updatedAt).format('DD MMMM YYYY')}</p>

                      <a onClick={() => { history.push(`/admin/hopper-control-history/${curr._id}/Manage hoppers`) }} className="timedate">
                        <BsEye className="icn_time" />View history</a>
                    </Td>
                    <Td>
                      {(profile?.subadmin_rights?.viewRightOnly && profile?.subadmin_rights?.controlHopper) ||
                        profile?.subadmin_rights?.controlHopper ? (
                        <Button className="theme_btn tbl_btn"
                          type="onSubmit"
                          onClick={() => {
                            handleSave(index)
                          }}>Save</Button>
                      ) : (
                        <Button className="theme_btn tbl_btn" type="onSubmit" onClick={() => handleSave(index)} disabled>Save</Button>
                      )}

                      {/* 
                      <Button className="theme_btn tbl_btn"
                        type="onSubmit"
                        onClick={() => {
                          handleSave(index)
                        }}>Save</Button> */}

                    </Td>
                  </Tr>
                )
              })}


            </Tbody>
          </Table>
        </TableContainer>

        <ReactPaginate
          className="paginated"
          breakLabel="..."
          nextLabel=">"
          onPageChange={handlePageChangeHopper}
          pageRangeDisplayed={5}
          pageCount={totalHopperListPages}
          previousLabel="<"
          renderOnZeroPageCount={null}
          forcePage={currentPageHopperList - 1}
        />

      </Card>


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
              Task control
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
              <span onClick={() => DownloadCsvLiveTask(currentPageLiveTask)}>
              <Tooltip label={"Print"}>
                <img src={print} className="opt_icons" />
              </Tooltip>
              </span>
              <div className="fltr_btn">
                <Text fontSize={"15px"}>
                  <span onClick={() => setHideShow((prevHideShow) => ({
                    ...prevHideShow,
                    status: true,
                    type: "Task control"
                  }))}>Sort</span>
                </Text>
                {hideShow.type === "Task control" &&
                  <SortFilterHopper hideShow={hideShow}
                    closeSort={closeSort}
                    sendDataToParent={collectSortParms}
                    handleApplySorting={handleApplySorting}
                  />}

                {/* <SortFilterDashboard /> */}
              </div>
            </div>
          </Flex>

          <TableContainer className="fix_ht_table">
            <Table mx='20px' variant='simple' className="common_table">
              <Thead>
                <Tr>
                  <Th>Broadcasted by</Th>
                  <Th>Time & date</Th>
                  {/* <Th>Location</Th> */}
                  <Th>Task details</Th>
                  <Th>Type</Th>
                  <Th>Volume</Th>
                  <Th>Category</Th>
                  <Th>Accepted by</Th>
                  <Th>Uploaded Content</Th>
                  <Th>Deadline & time left</Th>
                  <Th>Assign more hoppers</Th>
                  <Th>Mode</Th>
                  <Th>Remarks</Th>
                  <Th>Employee details</Th>
                  <Th>CTA</Th>
                </Tr>
              </Thead>
              <Tbody>
                {
                  liveTasks && liveTasks.map((curr, index) => {
                    console.log(curr, `<---`)
                    return (
                      <Tr key={curr?._id}>
                        <Td className="item_detail"><img src={curr?.mediahouse_id?.profile_image} alt="Content thumbnail" />
                          <Text className="nameimg"><span className="txt_mdm">{curr?.mediahouse_id?.company_name}</span></Text>
                        </Td>
                        <Td className="timedate_wrap">
                          <p className="timedate"><img src={watch} className="icn_time" />{moment(curr?.createdAt).format(`hh:mm:A`)}</p>
                          <p className="timedate"><img src={calendar} className="icn_time" />{moment(curr?.createdAt).format(`DD MMMM YYYY`)}</p>
                        </Td>
                        {/* <Td className="address_wrap">{curr?.location}</Td> */}
                        <Td className="description_td">
                          <Text className="desc_ht">
                            {curr?.task_description}
                          </Text>
                        </Td>

                        <Td className="text_center">
                          <div className="dir_col text_center">
                            {curr?.need_photos && curr?.need_photos === true ?

                              <Tooltip label={"Camera"}>
                                <img src={camera} alt="Content thumbnail" className="icn m_auto" />
                              </Tooltip>

                              : ""}
                            {/* <br></br> */}
                            {curr?.need_interview && curr?.need_interview === true ?

                              <Tooltip label={"Interview"}>
                                <img src={interview} alt="Content thumbnail" className="icn m_auto" />
                              </Tooltip>

                              : ""}
                            {/* <br></br> */}
                            {curr?.need_videos && curr?.need_videos === true ?

                              <Tooltip label={"Video"}>

                                <img src={video} alt="Content thumbnail" className="icn m_auto" />
                              </Tooltip>
                              : ""}
                          </div>
                        </Td>

                        <Td className="text_center">
                          <div className="dir_col text_center">
                            <p className="text_center">{curr?.image_count}</p>
                            <p className="text_center">{curr?.interview_count}</p>
                            <p className="text_center">{curr?.video_count}</p>
                          </div>
                        </Td>

                        <Td className="text_center">
                          <Tooltip label={curr?.category_details?.name}>
                            {<img src={curr?.category_details?.icon} className="icn m_auto" />}
                          </Tooltip>
                        </Td>

                        <Td className="avatars_wrap">
                          <div className="overlay_imgs">
                            <div className="img_row1 top_row">
                              {curr?.acceptedby
                                && curr?.acceptedby.map((item) => {
                                  const matchingAvatar = item?.avatar_details?.filter(detail => detail?._id === item?.avatar_id);
                                  if (matchingAvatar) {
                                        {/* <> */}
                                    return (
                                      <Tooltip key={item?._id} label={`${item?.first_name} ${item?.last_name}`} placement='top'>
                                        <img
                                          src={process.env.REACT_APP_HOPPER_AVATAR + matchingAvatar[0]?.avatar}
                                          // className="ovrl1"
                                          alt="Avatar"
                                        />
                                      </Tooltip>
                                    );
                                  }
                                        {/* <Text className="nameimg naming_comn"><span className="txt_mdm">{`${item.first_name} ${item.last_name}`}</span><br />
                                      <span >({item?.user_name})</span></Text>
                                      </> */}

                                  return "no one is accepted ";
                                })}
                            </div>
                          </div>
                        </Td>
                        <Td className="content_wrap new_content_wrap">
                          <a onClick={() => { history.push(`/admin/live-tasks/${curr?._id}/Live task `) }}>
                            {
                              curr?.uploaded_content && curr?.uploaded_content.length <= 0
                                ? "No Content"
                                : curr?.uploaded_content.length <= 1
                                  ? (
                                    <img
                                      src={process.env.REACT_APP_UPLOADED_CONTENT + curr?.uploaded_content[0]?.imageAndVideo}
                                      className="content_img"
                                      alt="Content thumbnail"
                                    />
                                  )
                                  : <div className="content_imgs_wrap contnt_lngth_wrp">
                                    <div className="content_imgs">
                                      {curr?.uploaded_content &&
                                        curr?.uploaded_content
                                          .slice(0, 3)
                                          .map((value) => {
                                            return (
                                              value.type === "image" ? (


                                                <img
                                                  key={value?._id}
                                                  src={value?.videothubnail || process.env.REACT_APP_UPLOADED_CONTENT + value.imageAndVideo}
                                                  className="content_img"
                                                  alt="Content thumbnail"
                                                />
                                              ) : value.type === "audio" ? (
                                                <img
                                                  key={value?._id}
                                                  src={interview} alt="Content thumbnail" className="icn m_auto" />
                                              ) : value.type === "video" ? (
                                                <img
                                                  key={value?._id}
                                                  src={value?.videothubnai} alt="Content thumbnail" className="icn m_auto" />
                                              ) : (
                                                "No content"
                                              )
                                            );
                                          })
                                      }
                                    </div>
                                    <span className="arrow_span"><BsArrowRight /></span>
                                  </div>

                            }

                          </a>
                        </Td>
                        <Td className="timedate_wrap">
                          <p className="timedate"><img src={watch} className="icn_time" />{moment(curr?.deadline_date).format(`hh:mm:A`)}</p>
                          <p className="timedate"><img src={calendar} className="icn_time" />{moment(curr?.deadline_date).format(`DD MMMM YYYY`)}</p>
                          <p className="timedate time_left danger"><img src={watch} className="icn_time" /><Timer deadline={curr?.deadline_date} /></p>
                        </Td>
                        <Td className="asign_wrap">
                          <div className="slct">
                            {
                              curr?.assignmorehopperList && curr?.assignmorehopperList.map((item) => {
                                const isActive = checkedMoreHopper.includes(item._id);
                                return (
                                  <div className={`sl_itm pos_rel ${isActive ? 'active' : ''}`}
                                    key={item._id}>
                                    <input
                                      type="checkbox"
                                      id={item._id}
                                      className="tsk_asign_check"
                                      onChange={() => handleRowSelect(item._id)}
                                    />
                                    <label className="asign_hpr_lbl active">
                                      <p>{`${item?.first_name} ${item?.last_name}`}</p>
                                      <span className="sml_txt">
                                        {`${(item.distance * 0.00062137119).toFixed(2)}m away`}
                                      </span>
                                    </label>
                                  </div>
                                );
                              })}

                          </div>
                        </Td>
                        <Td className="select_wrap">
                          <Select value={curr.mode}
                            isDisabled={profile?.subadmin_rights?.viewRightOnly && !profile?.subadmin_rights?.controlHopper}

                            onChange={(e) => {
                              curr.mode = e.target.value;
                              setLiveTasks((pre) => {
                                const updatedData = [...pre]
                                updatedData[index] = curr
                                return updatedData

                              })
                            }}
                          >
                            <option value='call'>Call</option>
                            <option value='chat'>Chat</option>
                            <option value='email'>Email</option>


                          </Select>
                        </Td>
                        <Td className="remarks_wrap">
                          <Textarea value={curr?.remarks}
                            isDisabled={profile?.subadmin_rights?.viewRightOnly && !profile?.subadmin_rights?.controlHopper}

                            onChange={(e) => {
                              curr.remarks = e.target.value;
                              setLiveTasks((pre) => {
                                const updatedData = [...pre]
                                updatedData[index] = curr
                                return updatedData

                              })
                            }}

                          />
                        </Td>
                        <Td className="timedate_wrap">
                          <p className="timedate emp_nme">{curr?.admin_id[0]?.name}</p>
                          <p className="timedate"><img src={watch} className="icn_time" />
                            {moment(curr?.updatedAt).format(`hh:mm:A`)}
                          </p>
                          <p className="timedate"><img src={calendar} className="icn_time" />
                            {moment(curr?.updatedAt).format(`DD MMMM YYYY`)}
                          </p>
                          <a onClick={() => { history.push(`/admin/hopper-task-contol-history/${curr?._id}/Task control history/Manage hoppers`) }} className="timedate"><BsEye className="icn_time" />View history</a>
                        </Td>
                        <Td>
                          {(profile?.subadmin_rights?.viewRightOnly && profile?.subadmin_rights?.controlHopper) ||
                            profile?.subadmin_rights?.controlHopper ? (
                            <Button className="theme_btn tbl_btn" onClick={() => EditLiveTask(index)}>Save</Button>
                          ) : (
                            <Button className="theme_btn tbl_btn" onClick={() => EditLiveTask(index)} disabled>Save</Button>
                          )}

                          {/* <Button className="theme_btn tbl_btn" onClick={() => EditLiveTask(index)}>Save</Button> */}
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
            onPageChange={handlePageChangeLiveTask}
            pageRangeDisplayed={5}
            pageCount={totalLiveTaskPages}
            previousLabel="<"
            renderOnZeroPageCount={null}
            forcePage={currentPageLiveTask - 1}
          />
        </div>
      </Card>

      <Card
        direction='column'
        w='100%'
        px='0px'
        mb='24px'
        overflowX={{ sm: "scroll", lg: "hidden" }}>
        <Flex px='20px' justify='space-between' mb='10px' align='center'>
          <Text
            color={textColor}
            fontSize='22px'
            lineHeight='100%'
            fontFamily={"AirbnbBold"}>
            Published content summary
          </Text>
          <div className="opt_icons_wrap">
            <a
              onClick={() => {
                setShow(true)
                setCsv(path3)

              }}
              className="txt_danger_mdm"
            >
              <Tooltip label={"Share"}>
              <img src={share} className="opt_icons" />
              </Tooltip>
            </a>
            <span onClick={() => publisedContentCsv(currentPage)}>
              <Tooltip label={"Print"}>
                <img src={print} className="opt_icons" />
              </Tooltip>
            </span>
            <div className="fltr_btn">
              <Text fontSize={"15px"}>
                <span onClick={() => setHideShow((prevHideShow) => ({
                  ...prevHideShow,
                  status: true,
                  type: "Published content summary"
                }))}>Sort</span>
              </Text>
              {hideShow.type === "Published content summary" &&
                <SortFilterHopper hideShow={hideShow}
                  closeSort={closeSort}
                  sendDataToParent={collectSortParms}
                  handleApplySorting={handleApplySorting}
                />}

              {/* <SortFilterDashboard /> */}
            </div>

          </div>
        </Flex>
        <TableContainer className="fix_ht_table">
          <Table mx='20px' variant='simple' className="common_table">
            <Thead>
              <Tr>
                <Th>Hopper details</Th>
                <Th>Published content (Qty)</Th>
                <Th >Published content (Value)</Th>
                <Th>Total amount paid</Th>
                <Th>Total amount payable</Th>
                <Th>Total presshop commission</Th>
                <Th>Mode</Th>
                <Th>Remarks</Th>
                <Th>Employee details</Th>
                <Th>CTA</Th>
              </Tr>
            </Thead>
            <Tbody>
              {publishedCont && publishedCont.map((curr, index) => {
                return (
                  <Tr key={curr?._id}>
                    <Td className="item_detail">
                      <a onClick={() => { history.push(`/admin/published-content/${curr?._id}/Manage hoppers`) }}>
                        <img src={process.env.REACT_APP_HOPPER_AVATAR + curr?.avatar} alt="Content thumbnail" />
                        <Text className="nameimg naming_comn"><span className="txt_mdm">{`${curr?.first_name} ${curr?.last_name}`}</span> <br></br>
                          <span >({curr?.user_name})</span></Text>
                      </a>
                    </Td>
                    <Td>
                      {curr?.published_content_qty}
                    </Td>
                    <Td> &pound; {formatAmountInMillion((curr?.published_content_val || 0)?.toFixed(0))}</Td>
                    <Td className="">
                      &pound; {formatAmountInMillion((curr?.total_payment_earned || 0)?.toFixed(0))}
                    </Td>
                    <Td>
                      &pound;{formatAmountInMillion((curr?.total_amount_payable || 0)?.toFixed(0))}
                    </Td>
                    <Td >
                      &pound;{formatAmountInMillion((curr?.total_presshop_commission || 0)?.toFixed(0))}

                    </Td>

                    <Td className="select_wrap">
                      <Select
                        value={curr?.published_content_admin_mode}
                        isDisabled={profile?.subadmin_rights?.viewRightOnly && !profile?.subadmin_rights?.controlHopper}

                        onChange={(e) => {
                          curr.published_content_admin_mode = e.target.value;
                          setPublishedCont(prevItems => {
                            const updatedItems = [...prevItems];
                            updatedItems[index] = curr;
                            return updatedItems;
                          });
                        }}

                      >
                        <option value='chat'>Chat</option>
                        <option value='call'>Call</option>
                        <option value='email'>Email</option>


                      </Select>
                    </Td>
                    <Td className="remarks_wrap">
                      <Textarea placeholder='Enter remarks if any...'
                        value={curr?.published_content_remarks}
                        name="remarks"
                        isDisabled={profile?.subadmin_rights?.viewRightOnly && !profile?.subadmin_rights?.controlHopper}

                        onChange={(e) => {
                          curr.published_content_remarks = e.target.value;
                          setPublishedCont(prevItems => {
                            const updatedItems = [...prevItems];
                            updatedItems[index] = curr;
                            return updatedItems;
                          });
                        }}
                      />
                    </Td>
                    <Td className="timedate_wrap">
                      <p className="timedate emp_nme">{curr?.employee_name && curr?.employee_name !== "" ? curr?.employee_name : "no updates"}</p>
                      <p className="timedate"><img src={watch} className="icn_time" />{moment(curr?.published_content_admin_employee_id_date).format('hh : mm : A')}</p>
                      <p className="timedate"><img src={calendar} className="icn_time" />{moment(curr?.published_content_admin_employee_id_date).format('DD MMMM YYYY')}</p>
                      <a onClick={() => { history.push(`/admin/hopper-published-content-history/${curr?._id}/Manage hoppers`) }} className="timedate"><BsEye className="icn_time" />View history</a>
                    </Td>
                    <Td>

                      {(profile?.subadmin_rights?.viewRightOnly && profile?.subadmin_rights?.controlHopper) ||
                        profile?.subadmin_rights?.controlHopper ? (
                        <Button className="theme_btn tbl_btn" onClick={() => editPublishedContentSummary(index)}>Save</Button>
                      ) : (
                        <Button className="theme_btn tbl_btn" onClick={() => editPublishedContentSummary(index)} disabled>Save</Button>
                      )}
                      {/* <Button className="theme_btn tbl_btn" onClick={() => editPublishedContentSummary(index)}>Save</Button> */}

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
          forcePage={currentPage - 1}
        />
      </Card>

      <Card
        direction='column'
        w='100%'
        px='0px'
        mb='24px'
        overflowX={{ sm: "scroll", lg: "hidden" }}>
        <Flex px='20px' justify='space-between' mb='10px' align='center'>
          <Text
            color={textColor}
            fontSize='22px'
            lineHeight='100%'
            fontFamily={"AirbnbBold"}>
            Uploaded content summary
          </Text>
          <div className="opt_icons_wrap">
            <a
              onClick={() => {
                setShow(true)
                setCsv(path4)

              }}
              className="txt_danger_mdm"
            >
              <Tooltip label={"Share"}>
              <img src={share} className="opt_icons" />
              </Tooltip>
            </a>
            <span onClick={() => downloadCsvUploadedContent(currentPageUpload)}>
              <Tooltip label={"Print"}>
                <img src={print} className="opt_icons" />
              </Tooltip>
            </span>
            <div className="fltr_btn">
              <Text fontSize={"15px"}>
                <span onClick={() => setHideShow((prevHideShow) => ({
                  ...prevHideShow,
                  status: true,
                  type: "Uploaded content summary"
                }))}>Sort</span>
              </Text>
              {hideShow.type === "Uploaded content summary" &&
                <SortFilterHopper hideShow={hideShow}
                  closeSort={closeSort}
                  sendDataToParent={collectSortParms}
                  handleApplySorting={handleApplySorting}
                />}

              {/* <SortFilterDashboard /> */}
            </div>          </div>
        </Flex>
        <TableContainer className="fix_ht_table">
          <Table mx='20px' variant='simple' className="common_table">
            <Thead>
              <Tr>
                <Th>Hopper details</Th>
                <Th>Tasks accepted</Th>
                <Th >Uploaded content (Qty)</Th>
                <Th>Uploaded content (Value)</Th>
                <Th>Total amount paid</Th>
                <Th>Total amount payable</Th>
                <Th>Total presshop commission</Th>
                <Th>Mode</Th>
                <Th>Remarks</Th>
                <Th>Employee details</Th>
                <Th>CTA</Th>
                {/* <Th>Payment pending</Th> */}
                {/* <Th>Payment due date</Th> */}
              </Tr>
            </Thead>
            <Tbody>
              {uploadedCont && uploadedCont.map((curr, index) => {
                return (
                  <Tr key={curr?._id}>

                    <Td className="item_detail">
                      <a onClick={() => handleLinkClick(curr)}>
                        <img src={process.env.REACT_APP_HOPPER_AVATAR + curr?.avatar} alt="Content thumbnail" />
                        <Text className="nameimg naming_comn"><span className="txt_mdm">{`${curr?.first_name} ${curr?.last_name}`}</span> <br></br>
                          <span >({curr?.user_name})</span></Text>
                      </a>

                    </Td>
                    <Td>
                      {curr?.accepted_tasks}
                    </Td>
                    <Td>
                      {curr?.uploaded_content}
                    </Td>
                    <Td>&pound; {curr?.total_amount_recieved}</Td>
                    <Td className="">
                      &pound;{curr?.total_amount_paid ?? ")"}
                    </Td>
                    <Td>
                      &pound; {curr?.total_amount_payable ?? "0"}
                    </Td>

                    <Td className="txt_wrap">
                      <p>&pound;{curr?.total_presshop_commission ?? "0"}</p>
                    </Td>

                    <Td className="select_wrap">
                      <Select
                        value={curr?.uploaded_content_admin_mode}
                        isDisabled={profile?.subadmin_rights?.viewRightOnly && !profile?.subadmin_rights?.controlHopper}

                        onChange={(e) => {
                          curr.uploaded_content_admin_mode = e.target.value;
                          setUploadCont(prevItems => {
                            const updatedItems = [...prevItems];
                            updatedItems[index] = curr;
                            return updatedItems;
                          })
                        }
                        }
                      >
                        <option value='chat'>Chat</option>
                        <option value='call'>Call</option>
                        <option value='email'>Email</option>

                      </Select>
                    </Td>
                    <Td className="remarks_wrap">
                      <Textarea placeholder='Enter remarks if any...' value={curr?.uploaded_content_remarks}
                        isDisabled={profile?.subadmin_rights?.viewRightOnly && !profile?.subadmin_rights?.controlHopper}

                        onChange={(e) => {
                          curr.uploaded_content_remarks = e.target.value;
                          setUploadCont(prevItems => {
                            const updatedItems = [...prevItems];
                            updatedItems[index] = curr;
                            return updatedItems;
                          })
                        }
                        }
                      />
                    </Td>
                    <Td className="timedate_wrap">
                      <p className="timedate emp_nme">{curr?.employee_name && curr?.employee_name !== "" ? curr?.employee_name : "no updates"}</p>
                      <p className="timedate"><img src={watch} className="icn_time" />{moment(curr?.uploaded_content_admin_employee_id_date).format('hh:mm:A')}</p>
                      <p className="timedate"><img src={calendar} className="icn_time" />{moment(curr?.uploaded_content_admin_employee_id_date).format('DD MMMM YYYY')}</p>
                      <a onClick={() => { history.push(`/admin/hopper-uploaded-content-history/${curr?._id}/Manage hoppers`) }} className="timedate"><BsEye className="icn_time" />View history</a>
                    </Td>
                    <Td>

                      {(profile?.subadmin_rights?.viewRightOnly && profile?.subadmin_rights?.controlHopper) ||
                        profile?.subadmin_rights?.controlHopper ? (
                        <Button className="theme_btn tbl_btn" onClick={() => uploadContenthistory(index)}>Save</Button>
                      ) : (
                        <Button className="theme_btn tbl_btn" onClick={() => uploadContenthistory(index)} disabled>Save</Button>
                      )}
                      {/* <Button className="theme_btn tbl_btn" onClick={() => uploadContenthistory(index)}>Save</Button> */}

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
          onPageChange={handlePageChangeUpload}
          pageRangeDisplayed={5}
          pageCount={totalPages1}
          previousLabel="<"
          renderOnZeroPageCount={null}
          forcePage={currentPageUpload - 1}
        />
      </Card>
      <Share show={show} csv={csv} update={handleClose} />

    </>
  );
}