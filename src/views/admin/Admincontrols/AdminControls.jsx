// Chakra imports
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
import { BsEye } from "react-icons/bs";
import camera from "assets/img/icons/camera.svg";
import crown from "assets/img/icons/crown.png";
import share from "assets/img/icons/share.png";
import star from "assets/img/icons/star.png";
import video from "assets/img/icons/video.svg";
import auth1 from "assets/img/auth/auth1.svg";
import avatar13 from "assets/img/avatars/avatar13.png";
import watch from "assets/img/icons/watch.svg";
import calendar from "assets/img/icons/calendar.svg";
import print from "assets/img/icons/print.png";
import { useHistory } from "react-router-dom";
import content1 from "assets/img/nfts/NftBanner1.png";
import celebrity from "assets/img/icons/celebrity.png";
import publication1 from "assets/img/profile/publication1.svg";
import { Tooltip } from "@chakra-ui/react";
import avt1 from "assets/img/avatars/avt1.png";
import avt2 from "assets/img/avatars/avt2.png";
import avt3 from "assets/img/avatars/avt3.png";
import avt4 from "assets/img/avatars/avt4.png";
import monitor from "assets/img/icons/monitor.svg";
import mobile from "assets/img/icons/mobile.svg";
import mail from "assets/img/icons/mail.svg";
import pro from "assets/img/icons/pro.svg";
import avatar14 from "assets/img/avatars/avatar14.svg";
import idic from "assets/img/icons/id.svg";
import shared from "assets/img/icons/shared.svg";
import img1 from "assets/img/nfts/Nft4.png";
import img2 from "assets/img/avatars/avatar2.png";
import img3 from "assets/img/nfts/Nft2.png";
import docuploaded from "assets/img/icons/img-upld.svg";
import write from "assets/img/icons/write.svg";
import publication2 from "assets/img/profile/publication2.svg";
import publication3 from "assets/img/profile/publication3.svg";
// import invic from "assets/img/icons/invoice.svg";
import content2 from "assets/img/auth/auth2.svg";
import content3 from "assets/img/auth/auth3.svg";
import { BsArrowRight } from "react-icons/bs";
import recic from "assets/img/icons/recording.svg";
import crime from "assets/img/icons/crime.svg";
import interview from "assets/img/icons/interview.svg";
import news from "assets/img/icons/news.svg";
import amt from "assets/img/icons/ametuer.svg";
import { Get } from "api/admin.services";
import { toast } from "react-toastify";
import { Patch } from "api/admin.services";
import moment from "moment/moment";
import { Post } from "api/admin.services";
import dataContext from "../ContextFolder/Createcontext";
import Loader from "components/Loader";
import Timer from "../Timer";
import ReactPaginate from "react-paginate";
import { async } from "@firebase/util";
import Share from "components/share/Share";
import SortFilterDashboard from "components/sortfilters/SortFilterDashboard";
import { deleteCSV } from "utils/commonFunction";
import docic from "assets/img/icons/contentdoc.svg";
import pdfic from "assets/img/icons/contentpdf.svg";
import PopupConfirm from "components/Pop Confirm";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import DeletedContents from "../Content/components/DeletedContents";

export default function AdminControls() {
  //pagination
  const [currentPageEmployee, setCurrentPageEmployee] = useState(1);
  const [totalEmployeePages, setTotalEmployeePages] = useState(0);
  const [currentHopperPages, setCurrentHopperPages] = useState(1);
  const [totalHopperPages, setTotalHopperPages] = useState(0);
  const [currentPagesPublication, setCurrentPagesPublication] = useState(1);
  const [totalPublicationPages, setTotalPublicationPages] = useState(0)
  const [onboard, setonboard] = useState([]);
  const [publicationData, setpublicationData] = useState([]);
  const [employeeData, setEmployeeData] = useState([]);
  const history = useHistory();
  const textColor = useColorModeValue("#000", "white");
  const [mode, setMode] = useState([]);
  const [hopperDetails, setHopperDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [liveTasks, setLiveTasks] = useState([]);
  const [checkedMoreHopper, setCheckedMoreHopper] = useState([]);

  // live task
  const [currentPageLiveTask, setCurrentPageLiveTask] = useState(1);
  const [totalLiveTaskPages, setTotalLiveTaskPages] = useState(0);
  const perPage = 5;

  // content 
  const [contentList, setContentList] = useState([])
  const [blockedContentList, setBlockedContentList] = useState([]);
  const [currentPageContent, setCurrentPageContent] = useState(1);
  const [totalContentPages, setTotalContentPages] = useState(0);

  // const {adminRights,setAminRights}=useContext(dataContext)
  const { profile } = useContext(dataContext);
  // for share 
  const [path1, setpath1] = useState("")
  const [path2, setpath2] = useState("")
  const [path3, setpath3] = useState("")
  const [path4, setpath4] = useState("")
  const [path5, setpath5] = useState("")
  const [show, setShow] = useState(false)
  const [csv, setCsv] = useState("")

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const pubPage = queryParams.get('pubPage');
  const deletedContent = queryParams.get('deletedContent');

  const [categories, setCategories] = useState([]);
  const [Nudity, setNudity] = useState(null);
  const [gdpr, setGdpr] = useState(null);
  const [publishedData, setPublishedData] = useState([]);
  const [currentPagePublishdContent, setCurrentPagePublishdContent] = useState(pubPage || 1);
  const [totalPublishdContentPages, setTotalPublishdContentPages] = useState(0);
  const [currentPageDelCont, setCurrentPageDelCont] = useState(deletedContent || 1);
  const [deletedContents, setDeletedContents] = useState([]);
  const [deletedContentPages, setDeletedContentPages] = useState(10)

  //  uploaded Content on boarding
  const getContentList = async (page, parametersName, parameters, parametersName1, parameters1) => {
    const offset = (page - 1) * perPage
    setLoading(true)
    try {
      await Get(`admin/getContentList?status=pending&limit=${perPage}&offset=${offset}&${parametersName}=${parameters}&${parametersName1}=${parameters1}`).then((res) => {
        setContentList(res?.data?.contentList);
        setpath1(res?.data?.fullPath)
        setTotalContentPages(res?.data?.totalCount / perPage)
        setLoading(false)
      });

    } catch (err) {
      // console.log("<---Have a erro ->", err);
      setLoading(false)
    }
  };

  const handleChangeContent = (selectedPage) => {
    setCurrentPageContent(selectedPage.selected + 1)
  }

  const updateContent = async (index) => {
    try {
      const currentContent = contentList[index];
      const obj = {
        hopper_id: currentContent.hopper_id,
        content_id: currentContent._id,
        heading: currentContent.heading,
        secondLevelCheck: currentContent.secondLevelCheck,
        firstLevelCheck: currentContent.firstLevelCheck,
        description: currentContent.description,
        mode: currentContent.mode,
        remarks: currentContent.remarks,
        role: currentContent.role,
        status: currentContent.status,
        checkAndApprove: currentContent.checkAndApprove,
        call_time_date: currentContent.call_time_date,
      };

      if (currentContent.status === "rejected") {
        if (!currentContent.remarks || currentContent.remarks.trim() === "") {
          toast.error("Enter Remarks");
        } else {
          const resp = await Patch(`admin/editContent`, obj);
          if (resp) {
            contentList[index].remarks = "";
            getBlockedContentList();
            getContentList(currentPageContent);
            toast.error("Rejected");
            mode[0][index] = currentContent.mode;
          }
        }
      } else if (currentContent.status === "pending") {
        if (!currentContent.heading || currentContent.heading.trim() === "") {
          toast.error("Enter Heading");
        } else if (!currentContent.description || currentContent.description.trim() === "") {
          toast.error("Enter Description");
        } else if (!currentContent.remarks || currentContent.remarks.trim() === "") {
          toast.error("Enter Remarks");
        } else {

          const resp = await Patch(`admin/editContent`, obj);
          if (resp) {
            contentList[index].remarks = "";
            getBlockedContentList();
            getContentList(currentPageContent);
            toast.success("Updated");
            mode[0][index] = currentContent.mode;
          }
        }

      } else if (currentContent.status === "published") {
        if (!currentContent.heading || currentContent.heading.trim() === "") {
          toast.error("Enter Heading");
        } else if (!currentContent.description || currentContent.description.trim() === "") {
          toast.error("Enter Description");
        } else if (!currentContent.remarks || currentContent.remarks.trim() === "") {
          toast.error("Enter Remarks");
        } else if (!currentContent.secondLevelCheck || currentContent.secondLevelCheck.trim() === "") {
          toast.error("Second level check is required");
        } else {
          const resp = await Patch(`admin/editContent`, obj);
          if (resp) {
            contentList[index].remarks = "";
            getBlockedContentList();
            getContentList(currentPageContent);
            toast.success("Updated");
            mode[0][index] = currentContent.mode;
          }
        }
      }
    } catch (err) {
      console.error(err);
    }
  };


  useEffect(async () => {
    await getContentList(currentPageContent);
    mode.push(
      contentList.map((value) => {
        return value.mode;
      })
    );
  }, [currentPageContent]);

  const printOnboardingTable = async () => {
    try {
      const response = await Get(`admin/getContentList?status=pending`);
      if (response) {
        const onboardinPrint = response?.data?.fullPath;
        window.open(onboardinPrint);
      }
    } catch (err) {
      // console.log("<---Have an error ->", err);
      setLoading(false)
    }
  };

  // live task
  const getLiveTask = async (page, parametersName, parameters, parametersName1, parameters1) => {
    setLoading(true);
    const offset = (page - 1) * perPage;
    try {
      await Get(`admin/liveTasks?offset=${offset}&limit=${perPage}&${parametersName}=${parameters}&${parametersName1}=${parameters1}`).then((res) => {
        setpath2(res?.data?.fullPath)
        setLiveTasks(res.data?.response);
        setTotalLiveTaskPages(res.data?.count / perPage);
        setLoading(false);
      }
      );
    } catch (err) {
      setLoading(false);
    }
  };

  const handlePageChangeLiveTask = (selectedPage) => {
    setCurrentPageLiveTask(selectedPage.selected + 1);
  };

  // download csv
  const DownloadCsvLiveTask = async (page) => {
    const offset = (page - 1) * perPage;
    try {
      const response = await Get(`admin/liveTasks?offset=${offset}&limit=${perPage}`);
      if (response) {
        const path = response?.data?.fullPath;
        window.open(path);
      }
    } catch (err) {
      // console.log("<---Have an error ->", err);
      setLoading(false);
    }
  };

  // Edit Live task
  const EditLiveTask = async (index) => {
    let obj = {
      task_id: liveTasks[index]._id,
      latestAdminRemark: liveTasks[index].remarks,
      mode: liveTasks[index].mode,
      assign_more_hopper: checkedMoreHopper,
    };
    if (!liveTasks[index].mode || liveTasks[index].mode.trim() === null) {
      toast.error("Choose mode");
    } else if (
      !liveTasks[index].remarks ||
      liveTasks[index].remarks.trim() === ""
    ) {
      toast.error("Enter Remarks");
    } else {
      try {
        await Patch(`admin/editLivetask`, obj).then((res) => {
          toast.success("Updated");
          getLiveTask(currentPageLiveTask);
          setCheckedMoreHopper("");
        });
      } catch (error) {
        toast.error(error?.response?.data?.errors?.msg, `<live task errror`);
        setLoading(false)
      }
    }
  };

  const handleRowSelect = (id) => {
    setCheckedMoreHopper((prev) => {
      if (prev.includes(id)) {
        return prev.filter((rowId) => rowId !== id);
      } else {
        return [...prev, id];
      }
    });
  };


  // get publication control data
  const getPublication = async (page, parametersName, parameters, parametersName1, parameters1) => {
    const offset = (page - 1) * perPage
    setLoading(true)
    try {
      await Get(`admin/getPublicationList?offset=${offset}&limit=${perPage}&${parametersName}=${parameters}&${parametersName1}=${parameters1}`).then((res) => {
        setpublicationData(res.data.data);
        setpath3(res?.data?.fullPath)
        setTotalPublicationPages(res?.data?.totalCount / perPage)
        setLoading(false)
      });
    } catch (error) { setLoading(false) }
  };
  // handle page change
  const handleChangePublication = (selectedPage) => {
    setCurrentPagesPublication(selectedPage.selected + 1)
  }


  // edit data
  const handleSave = async (index) => {
    try {
      const remarks = publicationData[index].remarks;
      const mode = publicationData[index].mode;

      if (
        !remarks ||
        /^\s*$/.test(remarks) ||
        mode === null ||
        mode === undefined ||
        /^\s+/.test(mode)
      ) {
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
        is_terms_accepted: publicationData[index].is_terms_accepted
      };
      await Patch(`admin/editPublication`, obj).then((res) => {
        toast.success("updated");
        getPublication();
        setLoading(false)
      });
    } catch (err) {
      // console.log(err);
      setLoading(false)
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
      setLoading(false)
    }
  };


  // get hopper details
  const HopperControls = async (page, parametersName, parameters, parametersName1, parameters1) => {
    const offset = (page - 1) * perPage
    setLoading(true)
    try {
      await Get(`admin/getHopperList?offset=${offset}&limit=${perPage}&${parametersName}=${parameters}&${parametersName1}=${parameters1}`).then((res) => {
        setpath4(res?.data?.fullPath)
        setHopperDetails(res.data.response.hopperList);
        setTotalHopperPages(res.data.response.totalCount / perPage)
        setLoading(false)
      });

    } catch (error) {
      setLoading(false)
    }
  };

  // handle change for pagination
  const handlePageChangeHopper = (selectedPage) => {
    setCurrentHopperPages(selectedPage.selected + 1)
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
      // console.log("<---Have an error ->", err);
      setLoading(false);
    }
  }


  // Edit hopper
  const handleHopperSave = async (index) => {
    try {
      const remarks = hopperDetails[index].latestAdminRemark;
      const mode = hopperDetails[index].mode;

      if (
        !remarks || /^\s*$/.test(remarks) || mode === null || mode === undefined || /^\s+/.test(mode)
      ) {
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
      };
      await Patch(`admin/editHopper`, obj).then((res) => {
        toast.success("updated");
        HopperControls();
      });
    } catch (err) {
      // console.log(err);
      setLoading(false)
    }
  };



  // get employee details
  const GetEmployeeData = async (page, parametersName, parameters, parametersName1, parameters1) => {

    setLoading(true)
    const offset = (page - 1) * perPage;
    // console.log(offset, `,-------offset`)

    try {
      await Get(`admin/getEmployees?offset=${isNaN(offset) ? 0 : offset}&limit=${perPage}&${parametersName}=${parameters}&${parametersName1}=${parameters1}`).then(
        (res) => {
          setpath5(res?.data?.fullPath)
          setEmployeeData(res.data.emplyeeList);
          setTotalEmployeePages(res.data.totalCount / perPage);
          setLoading(false)
        }
      );
    } catch (error) {
      setLoading(false)
    }
  };

  // pagination control
  const handlePageChangeEmployee = (selectedPage) => {
    setCurrentPageEmployee(selectedPage.selected + 1);
  };
  // download csv file
  const DownloadEmployeeCsv = async (page) => {
    const offset = (page - 1) * perPage;
    try {
      const response = await Get(
        `admin/getEmployees?offset=${offset}&limit=${perPage}`
      );
      if (response) {
        const path = response?.data?.fullPath;
        window.open(path);
      }
    } catch (err) {
      // console.log("<---Have an error ->", err);
      setLoading(false);
    }
  };

  // Edit Employee
  const EditEmployee = async (index) => {
    try {
      const obj = {
        employee_id: employeeData[index]._id,
        status: employeeData[index].status,
        latestAdminRemark: employeeData[index].remarks,
        is_Contractsigned: employeeData[index].is_Contractsigned,
        is_Legal: employeeData[index].is_Legal,
        is_Checkandapprove: employeeData[index].is_Checkandapprove,
        isTempBlocked: employeeData[index].isTempBlocked,
        isPermanentBlocked: employeeData[index].isPermanentBlocked,
      };
      await Patch(`admin/editEmployee`, obj);
      toast.success("Updated");
      GetEmployeeData();
    } catch (err) {
      setLoading(false)
    }

  };

  useEffect(() => {
    getLiveTask(currentPageLiveTask);
    getPublication(currentPagesPublication)

    HopperControls(currentHopperPages);
  }, [currentHopperPages, currentPagesPublication, currentPageLiveTask]);
  useEffect(() => {
    GetEmployeeData(currentPageEmployee);
  }, [currentPageEmployee]);

  const handleClose = () => {
    setShow(!show)
  }

  // sorting

  const [hideShow, setHideShow] = useState({
    status: false,
    type: ""
  })

  // const [parameters, setParameters] = useState('')
  // const [parametersName, setParametersName] = useState('')

  const [params, setParams] = useState({
    parameters: "",
    parametersName: "",
    parameters1: "",
    parametersName1: "",
  })

  const closeSort = () => {
    setHideShow((prevHideShow) => ({
      ...prevHideShow,
      status: false,
      // type: ""
    }));
  };

  const collectSortParms = (name, order) => {
    setParams((prev) => ({
      ...prev,
      parametersName: name,
      parameters: order
    }))
  }
  const collectSortParms1 = (name, order) => {
    setParams((prev) => ({
      ...prev,
      parametersName1: name,
      parameters1: order

    }))
  }
  const { parameters, parametersName, parameters1, parametersName1 } = params

  const handleApplySorting = () => {
    if (hideShow?.type === "contentOnboarding") {
      getContentList(currentPageContent, parametersName, parameters, parametersName1, parameters1);
      setParams({
        parameters: "",
        parametersName: "",
        parameters1: "",
        parametersName1: "",
      })
      closeSort()


    } else if (hideShow?.type === "liveTask") {
      getLiveTask(currentPageLiveTask, parametersName, parameters, parametersName1, parameters1);
      setParams({
        parameters: "",
        parametersName: "",
        parameters1: "",
        parametersName1: "",
      })
      closeSort()

    } else if (hideShow?.type === "HopperControls") {
      HopperControls(currentHopperPages, parametersName, parameters, parametersName1, parameters1);
      setParams({
        parameters: "",
        parametersName: "",
        parameters1: "",
        parametersName1: "",
      })
      closeSort()

    } else if (hideShow?.type === "publicationControl") {
      getPublication(currentPagesPublication, parametersName, parameters, parametersName1, parameters1);
      setParams({
        parameters: "",
        parametersName: "",
        parameters1: "",
        parametersName1: "",
      })
      closeSort()

    } else if (hideShow?.type === "employeeControl") {
      GetEmployeeData(currentPageEmployee, parametersName, parameters, parametersName1, parameters1);
      setParams({
        parameters: "",
        parametersName: "",
        parameters1: "",
        parametersName1: "",
      })
      closeSort()
    }
  };
  // comma seprator
  const formatAmountInMillion = (amount) =>
    amount?.toLocaleString('en-US', {
      maximumFractionDigits: 0,
    });

  // Get content categories -
  const getContentCategories = async () => {
    try {
      const response = await Get(`admin/getCategoryType?type=content`);

      if (response) {
        let data = response.data?.data;
        setCategories(data);
      }
    } catch (err) {
      // console.log("<---Have an error ->", err);
    }
  };

  useEffect(() => {
    getContentCategories();
  }, []);

  // Blocked content-
  const getBlockedContentList = async (
    page,
    parametersName,
    parameters,
    parametersName1,
    parameters1,
  ) => {
    setLoading(true);
    const offset = (page - 1) * perPage || 0;
    try {
      await Get(`admin/getContentList?status=blocked
        &limit=${perPage}&offset=${offset}&${parametersName}=${parameters}
        &${parametersName1}=${parameters1}`).then((res) => {
        setBlockedContentList(res?.data?.contentList);
        setpath1(res?.data?.fullPath);
        setTotalContentPages(res?.data?.totalCount / perPage);
        setLoading(false);
        deleteCSV(res?.data?.fullPath)
      });
    } catch (err) {
      // console.log("<---Have a erro ->", err);
      setLoading(false);
    }
  };

  useEffect(async () => {
    if (hideShow?.type === "contentOnboarding") {
      getBlockedContentList(
        currentPageContent,
        parametersName,
        parameters,
        parametersName1,
        parameters1
      );
    } else {
      getBlockedContentList(currentPageContent);
    }

    mode.push(
      contentList.map((value) => {
        return value.mode;
      })
    );
  }, [currentPageContent]);

  // Delete blocked content-
  const [idOfBlockContent, setIdOfBlockContent] = useState([]);

  const deleteBlockedContent = async () => {
    try {
      if (idOfBlockContent.length === 0) {
        return;
      }
      setLoading(true);
      await Post("admin/deleteMultiContent", { content_id: idOfBlockContent });
      setIdOfBlockContent([]);
      getBlockedContentList();
      setLoading(false);
    }
    catch (error) {
      setLoading(false);
    }
  }


  // Download csv
  const DownloadCsv = async (page) => {
    const offset = (page - 1) * perPage;
    try {
      const response = await Get(
        `admin/getContentList?status=published&offset=${offset}&limit=${perPage}`
      );

      if (response) {
        const onboardinPrint = response?.data?.fullPath;
        window.open(onboardinPrint);
        deleteCSV(response?.data?.fullPath)
      }
    } catch (err) {
      // console.log("<---Have an error ->", err);
    }
  };

  // Handle delete -
  const handleDelete = async (item) => {
    try {
      // if(item?.purchased_mediahouse?.length > 0){
      //   return  toast.success("This is a sold content, so it cannot be deleted.");
      // }
      await Post("admin/deleteContent", { content_id: item._id, is_deleted: true });
      toast.success("Content Deleted Successfully");
      getContentListPublished(currentPagePublishdContent);
      getDeletedContents(currentPageDelCont)
    } catch (error) {
      // console.log(error.message);
    }
  };

  // pagination
  const handlePageChangePublished = (selectedPage) => {
    setCurrentPagePublishdContent(selectedPage.selected + 1);
    history.push(`?pubPage=${selectedPage.selected + 1}`);
  };

  // Published content-
  const getContentListPublished = async (page, parametersName, parameters) => {
    setLoading(true);
    const offset = (page - 1) * perPage;
    try {
      const data = await Get(
        `admin/getContentList?status=published&offset=${offset}&limit=${perPage}&${parametersName}=${parameters}`
      );
      setPublishedData(data.data.contentList);
      setpath2(data?.data?.fullPath);
      setTotalPublishdContentPages(data.data.totalCount / perPage);
      setLoading(false);
      deleteCSV(data?.data?.fullPath)
    } catch (err) {
      // console.log("<---Have a erro ->", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    getContentListPublished(currentPagePublishdContent)
  }, [currentPagePublishdContent]);


  //delete content listing
  const getDeletedContents = async (page, parametersName, parameters) => {
    setLoading(true);
    const offset = (page - 1) * perPage;
    try {
      const data = await Get(
        `admin/getContentList?status=published&is_deleted=true&limit=${perPage}&offset=${offset}&${parametersName}=${parameters}`
      );
      setDeletedContents(data.data?.contentList)
      setDeletedContentPages(data?.data?.totalCount / perPage);
      setLoading(false);

    } catch (err) {
      // console.log("<---Have a erro ->", err);
      setLoading(false);
    }
  }

  useEffect(() => {
    getDeletedContents(currentPageDelCont)
  }, [currentPageDelCont])


  const PublishedUpdated = async (index) => {
    let obj = {
      content_id: publishedData[index]._id,
      heading: publishedData[index].heading,
      mode: publishedData[index].mode,
      description: publishedData[index].description,
      latestAdminRemark: publishedData[index].remarks,
    };

    try {
      if (
        !publishedData[index].heading ||
        publishedData[index].heading.trim() === ""
      ) {
        toast.error("Enter heading");
      } else if (
        !publishedData[index].mode ||
        publishedData[index].mode.trim() === null
      ) {
        toast.error("Choose mode");
      } else if (
        !publishedData[index].remarks ||
        publishedData[index].remarks.trim() === ""
      ) {
        toast.error("Enter remarks");
      } else {
        const resp = await Patch(`admin/editPublishedContent`, obj);
        if (resp) {
          // onboard[index].remarks = ""
          getContentListPublished(currentPagePublishdContent);
          toast.success("Successfully updated");
        }
      }
    } catch (error) { }
  };

  const handlePageChangeDeleted = (selectedPage) => {
    setCurrentPageDelCont(selectedPage.selected + 1);
    history.push(`?deletedContent=${selectedPage.selected + 1}`);
  };


  return (
    <>
      <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
        {loading && <Loader />}

        {/* Content onboarding */}
        <Card
          className="tab_card"
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
              Content onboarding
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
              <span onClick={printOnboardingTable}>
                <Tooltip label={"Print"}>
                  <img src={print} className="opt_icons" />
                </Tooltip>
              </span>
              <div className="fltr_btn">
                <Text fontSize={"15px"}>
                  <span onClick={() => setHideShow((prevHideShow) => ({
                    ...prevHideShow,
                    status: true,
                    type: "contentOnboarding"
                  }))}>Sort</span>
                </Text>
                {hideShow.type === "contentOnboarding" &&
                  <SortFilterDashboard hideShow={hideShow}
                    closeSort={closeSort}
                    sendDataToParent={collectSortParms}
                    sendDataToParent1={collectSortParms1}
                    handleApplySorting={handleApplySorting}
                  />}
              </div>
            </div>
          </Flex>
          <TableContainer className="fix_ht_table">
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
                          <a onClick={() => history.push(`/admin/live-published-content/${value._id}/Admin control`)}>
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
                                    {value?.content.map((value, index) => (
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
                              src={process.env.REACT_APP_CONTENT + value?.audio_description}
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
                              <Tooltip label={"Photo"}>
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
                          <Tooltip label={value?.categoryData?.name}>
                            <img
                              src={value?.categoryData?.icon}
                              alt="Content thumbnail"
                              className="icn"
                            />
                          </Tooltip>
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
                            {`${value?.hopper_id?.first_name}  ${value?.hopper_id?.last_name}`}{" "}
                            <br />
                            <span>({value?.hopper_id?.user_name})</span>
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

                                // console.log(value, "<- Value is here");
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
                                value.firstLevelCheck.isAdult = e.target.checked;
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

                          {/* Newly added */}
                          <div className="check_wrap">
                            <Checkbox
                              colorScheme="brandScheme"
                              me="10px"
                              content_id={value._id}
                              isChecked={value.firstLevelCheck?.deep_fake_check}
                              isDisabled={
                                profile?.subadmin_rights?.viewRightOnly &&
                                !profile?.subadmin_rights?.controlContent
                              }
                              onChange={(e) => {
                                value.firstLevelCheck.deep_fake_check = e.target.checked;
                                setContentList((prevItems) => {
                                  const updatedItems = [...prevItems];
                                  updatedItems[index] = value;
                                  return updatedItems;
                                });
                              }}
                            />
                            <span>Deep fake check</span>
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
                                {moment(value.mode_updated_at).format("hh:mm A")}
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
                            {
                              (value?.firstLevelCheck?.isAdult && value?.firstLevelCheck?.isGDPR && value?.firstLevelCheck?.nudity && value?.secondLevelCheck && value?.firstLevelCheck?.deep_fake_check) ? <option value="published">Published</option> : null
                            }
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
                          <p className="timedate">{value?.admin_details?.name}</p>
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
                            onClick={() => { updateContent(index); }}  >
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

        {/* Blocked content summary */}
        <Card
          className="tab_card"
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
              Blocked content summary
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

              <span onClick={printOnboardingTable}>
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

          <Flex px="20px" gap={5} mb="10px" align="center">
            <Button
              className="theme_btn tbl_btn"
              onClick={() => {
                setIdOfBlockContent((prev) => {
                  let updatedData = [...prev];
                  if (updatedData.length > 0) {
                    return updatedData = []
                  }
                  else {
                    return updatedData = blockedContentList?.map((el) => el._id)
                  }
                })
              }}
            >
              Select all
            </Button>

            <Button
              className="theme_btn tbl_btn del-btn"
              onClick={() => deleteBlockedContent()}
            >
              Delete
            </Button>
          </Flex>

          <TableContainer className="fix_ht_table">
            <Table mx="20px" variant="simple" className="common_table">
              <Thead>
                <Tr>
                  <Th>
                    <Checkbox
                      colorScheme="brandScheme"
                      me="10px"
                      isChecked={true}
                    />
                  </Th>
                  <Th>Posted content</Th>
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
                  <Th>Posted by</Th>
                  <Th className="width_th_comn">1st level check</Th>
                  <Th className="width_th_comn">2nd level check & call</Th>
                  <Th className="width_th_comn">Call time & date</Th>
                  <Th className="check_th">Check & approve</Th>
                  <Th>Mode</Th>
                  <Th>Status</Th>
                  <Th>Remarks</Th>
                  <Th>Employee details</Th>
                  <Th>CTA</Th>
                </Tr>
              </Thead>
              <Tbody>
                {blockedContentList &&
                  blockedContentList.map((value, index) => {
                    const audio = value?.content?.filter(
                      (curr) => curr?.media_type === "audio"
                    );
                    const image = value?.content?.filter(
                      (curr) => curr?.media_type === "image"
                    );
                    const video1 = value?.content?.filter(
                      (curr) => curr?.media_type === "video"
                    );
                    const Doc = value?.content?.filter(
                      (curr) => curr?.media_type === "doc"
                    );
                    const Pdf = value?.content?.filter(
                      (curr) => curr?.media_type === "pdf"
                    );

                    return (
                      <Tr key={value._id}>
                        <Td>
                          <Checkbox
                            colorScheme="brandScheme"
                            me="10px"
                            isChecked={idOfBlockContent.includes(value._id)}
                            onChange={(e) => {
                              setIdOfBlockContent((prev) => {
                                if (idOfBlockContent.includes(value._id)) {
                                  return prev.filter((el) => el !== value._id);
                                } else {
                                  return [...prev, value._id];
                                }
                              });
                            }}
                          />
                        </Td>
                        <Td>
                          <a
                            onClick={() =>
                              history.push(
                                `/admin/live-published-content/${value._id}/Manage content`
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
                                <span>
                                  <img
                                    src={interview}
                                    alt="Content thumbnail"
                                    className="icn m_auto"
                                  />
                                </span>
                              ) : value?.content[0].media_type === "video" ? (
                                <img
                                  src={
                                    process.env.REACT_APP_CONTENT +
                                    value?.content[0]?.thumbnail
                                  }
                                  className="content_img"
                                  alt="Content thumbnail"
                                />
                              ) : value?.content[0].media_type === "doc" ? (
                                <img
                                  src={docic}
                                  className="content_img"
                                  alt="Content thumbnail"
                                />
                              ) : value?.content[0].media_type === "pdf" ? (
                                <img
                                  src={pdfic}
                                  className="content_img"
                                  alt="Content thumbnail"
                                />
                              ) : null
                            ) : value?.content.length === 0 ? (
                              "no content"
                            ) : (
                              value?.content.length > 1 && (
                                <div className="content_imgs_wrap contnt_lngth_wrp">
                                  <div className="content_imgs">
                                    {value?.content.slice(0, 3).map((value) => (
                                      <>
                                        {value.media_type === "image" ? (
                                          <img
                                            // src={process.env.REACT_APP_CONTENT + value.media}
                                            src={value?.watermark}
                                            className="content_img"
                                            alt="Content thumbnail"
                                          />
                                        ) : value.media_type === "audio" ? (
                                          <span>
                                            <img
                                              src={interview}
                                              alt="Content thumbnail"
                                              className="icn m_auto"
                                            />
                                          </span>
                                        ) : value.media_type === "audio" ? (
                                          <img
                                            src={
                                              process.env.REACT_APP_CONTENT +
                                              value.thumbnail
                                            }
                                            className="content_img"
                                            alt="Content thumbnail"
                                          />
                                        ) : value.media_type === "doc" ? (
                                          <img
                                            src={docic}
                                            className="content_img"
                                            alt="Content thumbnail"
                                          />
                                        ) : value.media_type === "pdf" ? (
                                          <img
                                            src={pdfic}
                                            className="content_img"
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
                            {moment(value.createdAt).format("hh:mm A")}
                          </p>
                          <p className="timedate">
                            <img src={calendar} className="icn_time" />
                            {moment(value.createdAt).format("DD MMMM YYYY")}
                          </p>
                        </Td>
                        <Td className="item_detail address_details">
                          {value.location}
                          {/* <br /> E14 5AQ */}
                        </Td>
                        <Td className="remarks_wrap remarks_wrap_edit">
                          <Textarea
                            className="desc_txtarea"
                            isRequired
                            defaultValue={value.heading}
                            isDisabled={
                              profile?.subadmin_rights?.viewRightOnly &&
                              !profile?.subadmin_rights?.controlContent
                            }
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
                            defaultValue={value.description}
                            isDisabled={
                              profile?.subadmin_rights?.viewRightOnly &&
                              !profile?.subadmin_rights?.controlContent
                            }
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
                          {value?.audio_description && (
                            <audio controls>
                              <source
                                src={
                                  process.env.REACT_APP_CONTENT +
                                  value?.audio_description
                                }
                                type="audio/mp3"
                              />
                            </audio>
                          )}

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
                              <Tooltip label={"Photo"}>
                                <img
                                  src={camera}
                                  alt="Content thumbnail"
                                  className="icn m_auto"
                                />
                              </Tooltip>
                            )}
                            {Doc && Doc?.length > 0 && (
                              <Tooltip label={"document"}>
                                <img
                                  src={docic}
                                  alt="Content thumbnail"
                                  className="icn m_auto"
                                />
                              </Tooltip>
                            )}
                            {Pdf && Pdf?.length > 0 && (
                              <Tooltip label={"pdf"}>
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
                          {/* {value.type == "shared" ? (
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
                        )} */}
                          <Select
                            placeholder="Select option"
                            value={value?.type}
                            name="type"
                            onChange={(e) => {
                              const selectedId = e.target.value;
                              const updatedItems = contentList.map(
                                (item, idx) => {
                                  if (idx === index) {
                                    return { ...item, type: selectedId };
                                  }
                                  return item;
                                }
                              );
                              setContentList(updatedItems);
                            }}
                          >
                            <option key={"shared"} value={"shared"}>Shared</option>
                            <option key={"exclusive"} value={"exclusive"}>Exclusive</option>
                          </Select>
                        </Td>
                        <Td className="text_center">
                          <Tooltip label={value?.categoryData?.name}>
                            {/* <img
                            src={value?.categoryData?.icon}
                            alt="Content thumbnail"
                            className="icn"
                          /> */}
                            <Select
                              placeholder="Select option"
                              value={value?.category_id}
                              name="categoryData"
                              onChange={(e) => {
                                const selectedId = e.target.value;
                                const updatedItems = contentList.map(
                                  (item, idx) => {
                                    if (idx === index) {
                                      return { ...item, category_id: selectedId };
                                    }
                                    return item;
                                  }
                                );
                                // Update the contentList with the new array
                                setContentList(updatedItems);
                              }}
                            >
                              {categories?.map((option) => (
                                <option key={option._id} value={option._id}>
                                  {option.name}
                                </option>
                              ))}
                            </Select>
                          </Tooltip>
                          {/* {value?.categoryData?.name} */}
                        </Td>
                        <Td className="text_center">
                          <p>{audio && audio?.length > 0 && audio?.length}</p>
                          <p>{video1 && video1?.length > 0 && video1?.length}</p>
                          <p>{image && image?.length > 0 && image?.length}</p>
                          <p>{Doc && Doc?.length > 0 && Doc?.length}</p>
                          <p>{Pdf && Pdf?.length > 0 && Pdf?.length}</p>
                        </Td>
                        <Td>
                          <Flex alignItems="center" gap="4px">
                            £
                            <input
                              type="number"
                              value={value.ask_price}
                              onChange={(e) => {
                                value.ask_price = e.target.value;
                                value.original_ask_price = (e.target.value * 5) / 6;
                                setContentList((prevItems) => {
                                  const updatedItems = [...prevItems];
                                  updatedItems[index] = value;
                                  return updatedItems;
                                });
                              }}
                            />
                          </Flex>
                        </Td>
                        <Td className="item_detail">
                          <img
                            src={
                              process.env.REACT_APP_HOPPER_AVATAR +
                              value?.hopper_id?.avatar_detail?.avatar
                            }
                            alt="Content thumbnail"
                          />
                          <Text className="nameimg naming_comn">
                            <span className="txt_mdm">{`${value?.hopper_id?.first_name}  ${value?.hopper_id?.last_name}`}{" "}</span>
                            <br />
                            <span>({value?.hopper_id?.user_name})</span>
                          </Text>
                        </Td>
                        <Td className="item_detail">
                          <div className="check_wrap">
                            <Checkbox
                              colorScheme="brandScheme"
                              me="10px"
                              content_id={value._id}
                              isChecked={value.firstLevelCheck?.nudity}
                              isDisabled={
                                profile?.subadmin_rights?.viewRightOnly &&
                                !profile?.subadmin_rights?.controlContent
                              }
                              onChange={(e) => {
                                value.firstLevelCheck.nudity = e.target.checked;
                                if (e.target.checked == true) {
                                  setNudity(true);
                                } else {
                                  setNudity(false);
                                }
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
                              // isDisabled={
                              //   profile?.subadmin_rights?.viewRightOnly &&
                              //   !profile?.subadmin_rights?.controlContent
                              // }
                              content_id={value._id}
                              isChecked={value.firstLevelCheck?.isAdult}
                              onChange={(e) => {
                                // if(e.target.checked==true){
                                  // console.log('sdhhhhhhhhhhhhhhhjhv')
                                //   setAdult[index](true)
                                // }else{
                                //   setAdult[index](false)
                                // }
                                value.firstLevelCheck.isAdult = e.target.checked;
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
                              isDisabled={
                                profile?.subadmin_rights?.viewRightOnly &&
                                !profile?.subadmin_rights?.controlContent
                              }
                              onChange={(e) => {
                                value.firstLevelCheck.isGDPR = e.target.checked;
                                if (e.target.checked == true) {
                                  setGdpr(true);
                                } else {
                                  setGdpr(false);
                                }
                                setContentList((prevItems) => {
                                  const updatedItems = [...prevItems];
                                  updatedItems[index] = value;
                                  return updatedItems;
                                });
                              }}
                            />
                            <span>GDPR check</span>
                          </div>

                          {/* Newly added */}
                          <div className="check_wrap">
                            <Checkbox
                              colorScheme="brandScheme"
                              me="10px"
                              content_id={value._id}
                              isChecked={value.firstLevelCheck?.deep_fake_check}
                              isDisabled={
                                profile?.subadmin_rights?.viewRightOnly &&
                                !profile?.subadmin_rights?.controlContent
                              }
                              onChange={(e) => {
                                value.firstLevelCheck.deep_fake_check = e.target.checked;
                                setContentList((prevItems) => {
                                  const updatedItems = [...prevItems];
                                  updatedItems[index] = value;
                                  return updatedItems;
                                });
                              }}
                            />
                            <span>Deep fake check</span>
                          </div>

                        </Td>

                        <Td className="remarks_wrap">
                          <Textarea
                            placeholder="Enter details of call..."
                            content_id={value._id}
                            defaultValue={value.secondLevelCheck}
                            isDisabled={
                              profile?.subadmin_rights?.viewRightOnly &&
                              !profile?.subadmin_rights?.controlContent
                            }
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
                                {moment(value.mode_updated_at).format("hh:mm A")}
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
                            isDisabled={
                              profile?.subadmin_rights?.viewRightOnly &&
                              !profile?.subadmin_rights?.controlContent
                            }
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
                            isDisabled={
                              profile?.subadmin_rights?.viewRightOnly &&
                              !profile?.subadmin_rights?.controlContent
                            }
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
                            isDisabled={
                              profile?.subadmin_rights?.viewRightOnly &&
                              !profile?.subadmin_rights?.controlContent
                            }
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
                            {/* {
                            value?.firstLevelCheck?.isAdult === true && value?.checkAndApprove && value?.secondLevelCheck !== undefined ||
                              value?.firstLevelCheck?.isGDPR === true && value?.checkAndApprove && value?.secondLevelCheck !== undefined ||
                              (value?.firstLevelCheck?.nudity === true && value?.checkAndApprove && value?.secondLevelCheck !== undefined)
                              ? <option value="published">Published</option>
                              : null
                          } */}
                            {value?.firstLevelCheck?.isAdult &&
                              value?.firstLevelCheck?.isGDPR &&
                              value?.firstLevelCheck?.nudity &&
                              value?.firstLevelCheck?.deep_fake_check &&
                              value?.checkAndApprove &&
                              value?.secondLevelCheck ? (
                              <option value="published">Published</option>
                            ) : null}
                          </Select>
                        </Td>
                        <Td className="remarks_wrap">
                          <Textarea
                            placeholder="Enter remarks if any..."
                            content_id={value._id}
                            disabled={
                              profile?.subadmin_rights?.viewRightOnly &&
                              !profile?.subadmin_rights?.controlContent
                            }
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
                          <p className="timedate">{value?.admin_details?.name}</p>
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
                                `/admin/content-onboarding-history/${value._id}/Content onboarding history/Manage content`
                              )
                            }
                          >
                            <BsEye className="icn_time" />
                            View history
                          </a>
                        </Td>
                        <Td>
                          {(profile?.subadmin_rights?.viewRightOnly &&
                            profile?.subadmin_rights?.controlContent) ||
                            profile?.subadmin_rights?.controlContent ? (
                            <Button
                              className="theme_btn tbl_btn"
                              onClick={() => updateContent(index)}
                            >
                              Publish
                            </Button>
                          ) : (
                            <Button
                              className="theme_btn tbl_btn"
                              onClick={() => updateContent(index)}
                              disabled
                            >
                              Publish
                            </Button>
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
            onPageChange={handleChangeContent}
            pageRangeDisplayed={5}
            pageCount={totalContentPages}
            previousLabel="<"
            renderOnZeroPageCount={null}
            previousClassName="custom-arrow"
            nextClassName="custom-arrow"
            forcePage={currentPageContent - 1}
          />
        </Card>

        {/* Published content summary */}
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
                Published content summary
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
                <span onClick={() => DownloadCsv(currentPagePublishdContent)}>
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
                          type: "Live published content",
                        }))
                      }
                    >
                      Sort
                    </span>
                  </Text>

                  {hideShow.type === "Live published content" && (
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

            <TableContainer className="fix_ht_table">
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
                    <Th>License</Th>
                    <Th>Category</Th>
                    <Th>Volume</Th>
                    <Th>Asking price</Th>
                    <Th>Sale price</Th>
                    {/* <Th>Published by</Th> */}
                    <Th>Sale status</Th>
                    <Th>Amount received</Th>
                    <Th>Presshop commission</Th>
                    <Th>Amount paid</Th>
                    <Th>Amount payable</Th>
                    <Th className="rcvd_comn_th">Received From</Th>
                    <Th>Published by</Th>
                    <Th>Mode</Th>
                    <Th>Remarks</Th>
                    <Th>Employee details</Th>
                    <Th>CTA</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {/* ?.sort(
                      (a, b) =>
                        new Date(b.published_time_date) -
                        new Date(a.published_time_date)
                    ) */}
                  {publishedData &&
                    publishedData
                      ?.map((curr, index) => {
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
                                      // src={process.env.REACT_APP_CONTENT + curr?.content[0]?.media}
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
                                      // src={process.env.REACT_APP_CONTENT + curr?.content[0]?.thumbnail}
                                      src={curr?.content[0]?.watermark}
                                      className="content_img"
                                      alt="Content thumbnail"
                                    />
                                  ) : curr?.content[0].media_type === "doc" ? (
                                    <img
                                      // src={process.env.REACT_APP_CONTENT + curr?.content[0]?.thumbnail}
                                      src={docic}
                                      className="icn m_auto"
                                      alt="Content thumbnail"
                                    />
                                  ) : curr?.content[0].media_type === "pdf" ? (
                                    <img
                                      // src={process.env.REACT_APP_CONTENT + curr?.content[0]?.thumbnail}
                                      src={pdfic}
                                      className="icn m_auto"
                                      alt="Content thumbnail"
                                    />
                                  ) : null
                                ) : curr?.content.length === 0 ? null : (
                                  curr?.content.length > 1 && (
                                    <div className="content_imgs_wrap contnt_lngth_wrp">
                                      <div className="content_imgs">
                                        {curr?.content
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
                                              ) : curr?.content[0].media_type ===
                                                "doc" ? (
                                                <img
                                                  // src={process.env.REACT_APP_CONTENT + curr?.content[0]?.thumbnail}
                                                  src={docic}
                                                  className="icn m_auto"
                                                  alt="Content thumbnail"
                                                />
                                              ) : curr?.content[0].media_type ===
                                                "pdf" ? (
                                                <img
                                                  // src={process.env.REACT_APP_CONTENT + curr?.content[0]?.thumbnail}
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
                                {moment(curr.published_time_date).format(
                                  "hh:mm A"
                                )}
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
                                  setPublishedData((pre) => {
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
                                  setPublishedData((pre) => {
                                    const updatedData = [...pre];
                                    updatedData[index] = curr;
                                    return updatedData;
                                  });
                                }}
                              />
                              <img className="icn_edit" src={write} />
                            </Td>

                            {/* <Td className="description_details"><p className="desc_ht">{curr.description}</p></Td> */}
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
                                  <Tooltip label={"Interview"}>
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
                              <a>
                                <Tooltip label={curr?.categoryData?.name}>
                                  <img
                                    src={curr?.categoryData?.icon}
                                    alt="Content thumbnail"
                                    className="icn"
                                  />
                                </Tooltip>
                              </a>
                            </Td>
                            <Td className="text_center">
                              <p>
                                {" "}
                                {audio && audio?.length > 0 && audio?.length}
                              </p>
                              <p>
                                {video1 && video1?.length > 0 && video1?.length}
                              </p>
                              <p>{image && image?.length > 0 && image?.length}</p>
                            </Td>

                            <Td className="text-nowrap">
                              &pound; {formatAmountInMillion(curr?.ask_price)}
                            </Td>
                            <Td>
                              &pound; {formatAmountInMillion(curr?.amount_paid)}
                            </Td>
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
                                  curr?.purchased_publication
                                    ?.company_bank_details?.bank_name
                                }
                              </p>
                              <p>{`Sort Code ${curr?.purchased_publication?.company_bank_details?.sort_code}`}</p>
                              <p>{`Account ${curr?.purchased_publication?.company_bank_details?.account_number}`}</p>
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
                                  setPublishedData((pre) => {
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
                                  setPublishedData((pre) => {
                                    const updatedData = [...pre];
                                    updatedData[index] = curr;
                                    return updatedData;
                                  });
                                }}
                              />
                            </Td>
                            <Td className="timedate_wrap">
                              <p className="timedate emp_nme">
                                {curr?.admin_details?.name}
                              </p>
                              <p className="timedate">
                                <img src={watch} className="icn_time" />
                                {moment(curr?.updatedAt).format("hh:mm A")}
                              </p>
                              <p className="timedate">
                                <img src={calendar} className="icn_time" />
                                {moment(curr?.updatedAt).format("DD MMMM YYYY")}
                              </p>
                              <a
                                className="timedate"
                                onClick={() => {
                                  // history.push(
                                  //   `/admin/live-published-content/${curr._id}/Manage content`
                                  // );
                                  history.push(
                                    `/admin/content-published-history/${curr._id}/Published Content Summary History/Manage content`
                                  )
                                }

                                }
                              >
                                <BsEye className="icn_time" />
                                View history
                              </a>
                            </Td>
                            <Td>
                              {(profile?.subadmin_rights?.viewRightOnly &&
                                profile?.subadmin_rights?.controlContent) ||
                                profile?.subadmin_rights?.controlContent ? (
                                <Button
                                  className="theme_btn tbl_btn"
                                  onClick={() => PublishedUpdated(index)}
                                >
                                  Save
                                </Button>
                              ) : (
                                <Button
                                  className="theme_btn tbl_btn"
                                  onClick={() => PublishedUpdated(index)}
                                  disabled
                                >
                                  Save
                                </Button>
                              )}
                              {
                                profile?.role === "admin" ?
                                  <PopupConfirm
                                    title="Confirmation"
                                    description="Are you sure you want to delete this content?"
                                    onConfirm={() => handleDelete(curr)}
                                    buttonTitle={"Delete"}
                                  /> : null
                              }
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
            onPageChange={handlePageChangePublished}
            pageRangeDisplayed={5}
            pageCount={totalPublishdContentPages}
            previousLabel="<"
            renderOnZeroPageCount={null}
            forcePage={currentPagePublishdContent - 1}

          />
        </Card>

        {/* Uploaded content summary */}


        {/* Deleted content summary */}
        <DeletedContents
          setShow={setShow}
          setCsv={setCsv}
          DownloadCsv={DownloadCsv}
          setHideShow={setHideShow}
          hideShow={hideShow}
          closeSort={closeSort}
          collectSortParms={collectSortParms}
          setLoading={setLoading}
          deletedContents={deletedContents}
          setDeletedContents={setDeletedContents}
          handlePageChangeDeleted={handlePageChangeDeleted}
          handleApplySorting={handleApplySorting}
          deletedContentPages={deletedContentPages}
          getDeletedContents={getDeletedContents}
          currentPageDelCont={currentPageDelCont}
          getContentListPublished={getContentListPublished}
          currentPagePublishdContent={currentPagePublishdContent}
          profile={profile}
        />

        {/* Hopper control */}
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
              fontFamily={"AirbnbBold"}>
              Hopper control
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
              <span onClick={() => DownloadCsvHopper(currentHopperPages)}>
                <Tooltip label={"Print"}>
                  <img src={print} className="opt_icons" />
                </Tooltip>
              </span>
              <div className="fltr_btn">
                <Text fontSize={"15px"}>
                  <span onClick={() => setHideShow((prevHideShow) => ({
                    ...prevHideShow,
                    status: true,
                    type: "HopperControls"
                  }))}>Sort</span>
                </Text>
                {hideShow.type === "HopperControls" &&
                  <SortFilterDashboard hideShow={hideShow}
                    closeSort={closeSort}
                    sendDataToParent={collectSortParms}
                    sendDataToParent1={collectSortParms1}
                    handleApplySorting={handleApplySorting}
                  />}
              </div>
            </div>
          </Flex>
          <TableContainer className="fix_ht_table">
            <Table mx="20px" variant="simple" className="common_table">
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
                  <Th>Action</Th>
                  <Th>Remarks</Th>
                  <Th>Employee details</Th>
                  <Th>CTA</Th>
                </Tr>
              </Thead>
              <Tbody>
                {hopperDetails?.map((curr, index) => {
                  return (
                    <Tr key={curr?._id}>
                      <Td className="item_detail">
                        <a
                          onClick={() => {
                            history.push(`/admin/hopper-control-history/${curr?._id}/Admin controls`);
                          }}
                        >
                          <img
                            src={process.env.REACT_APP_HOPPER_AVATAR + curr?.avatarData?.avatar}
                            alt="Content thumbnail"
                          />
                          <Text className="nameimg">
                            <span className="txt_mdm">{`${curr?.first_name} ${curr?.last_name}`}</span>
                            <br />
                            <span>({curr?.user_name})</span>
                          </Text>
                        </a>
                      </Td>
                      <Td className="timedate_wrap">
                        <p className="timedate">
                          <img src={watch} className="icn_time" />
                          {moment(curr?.createdAt).format("hh:mm A")}
                        </p>
                        <p className="timedate">
                          <img src={calendar} className="icn_time" />
                          {moment(curr?.createdAt).format("DD MMMM YYYY")}
                        </p>
                      </Td>
                      <Td className="address_wrap">{curr?.address}</Td>
                      <Td className="contact_details">
                        <div className="mobile detail_itm">
                          <img src={mobile} className="icn" />
                          <span>
                            {curr?.country_code}&nbsp;{curr?.phone}
                          </span>
                        </div>
                        <div className="mobile detail_itm">
                          <img src={mail} className="icn" />
                          <span>{curr?.email}</span>
                        </div>
                      </Td>

                      <Td className="text_center">
                        <img
                          src={curr?.category === "amateur" ? amt : pro}
                          className="catgr_img m_auto"
                        />
                        <Select
                          mt="10px"
                          value={curr?.category}
                          name="category"
                          onChange={(e) => {
                            curr.category = e.target.value;

                            setHopperDetails((prevItems) => {
                              const updatedItems = [...prevItems];
                              updatedItems[index] = curr;
                              return updatedItems;
                            });
                          }}
                        >
                          <option value="pro">pro</option>
                          <option value="amateur">Amateur</option>
                        </Select>
                      </Td>
                      <Td>{curr.ratingsforMediahouse ? (+(curr.ratingsforMediahouse)).toFixed(2) : 0}</Td>
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
                      <Td className="contact_details">
                        {curr?.bank_detail[0]?.bank_name}
                        <br /> Sort Code - {curr?.bank_detail[0]?.sort_code}
                        <br /> Account - {curr?.bank_detail[0]?.acc_number}
                      </Td>
                      <Td className="check_td">
                        <Checkbox
                          colorScheme="brandScheme"
                          me="10px"
                          isChecked={
                            curr?.is_terms_accepted === true ? true : false
                          }
                        />
                      </Td>

                      <Td className="check_aprv_td">
                        <Checkbox
                          colorScheme="brandScheme"
                          me="10px"
                          name="checkAndApprove"
                          isChecked={curr?.checkAndApprove}
                          onChange={(e) => {
                            curr.checkAndApprove = e.target.checked;
                            setHopperDetails((prevItems) => {
                              const updatedItems = [...prevItems];
                              updatedItems[index] = curr;
                              return updatedItems;
                            });
                          }}
                        />
                      </Td>

                      <Td className="select_wrap">
                        <Select
                          value={curr?.mode}
                          name="mode"
                          onChange={(e) => {
                            curr.mode = e.target.value;
                            setHopperDetails((prevItems) => {
                              const updatedItems = [...prevItems];
                              updatedItems[index] = curr;
                              return updatedItems;
                            });
                          }}
                        >
                          <option value="call">Call</option>
                          <option value="chat">Chat</option>
                        </Select>
                      </Td>

                      <Td className="big_select_wrap">
                        <Select
                          value={curr?.status}
                          name="status"
                          onChange={(e) => {
                            curr.status = e.target.value;
                            setHopperDetails((prevItems) => {
                              const updatedItems = [...prevItems];
                              updatedItems[index] = curr;
                              return updatedItems;
                            });
                          }}>
                          <option value="pending">Pending</option>
                          <option value="approved">Approved</option>
                          <option value="rejected">Rejected</option>
                        </Select>
                      </Td>
                      <Td>
                        <div className="check_wrap">
                          <Checkbox
                            colorScheme="brandScheme"
                            me="10px"
                            isChecked={curr?.isTempBlocked}
                            onChange={(e) => {
                              setHopperDetails((prevItems) => {
                                const updatedItems = [...prevItems];
                                updatedItems[index].isTempBlocked =
                                  !updatedItems[index].isTempBlocked;
                                if (
                                  updatedItems[index].isTempBlocked &&
                                  updatedItems[index].isPermanentBlocked
                                ) {
                                  updatedItems[
                                    index
                                  ].isPermanentBlocked = false;
                                }
                                // console.log(updatedItems)
                                return updatedItems;
                              });
                            }}
                          />
                          <span>Temporary Block</span>
                        </div>
                        <div className="check_wrap">
                          <Checkbox
                            colorScheme="brandScheme"
                            me="10px"
                            isChecked={curr?.isPermanentBlocked}
                            onChange={(e) => {
                              setHopperDetails((prevItems) => {
                                const updatedItems = [...prevItems];
                                updatedItems[index].isPermanentBlocked =
                                  !updatedItems[index].isPermanentBlocked;
                                if (
                                  updatedItems[index].isPermanentBlocked &&
                                  updatedItems[index].isTempBlocked
                                ) {
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
                          id={curr?._id}
                          value={curr?.latestAdminRemark}
                          name="latestAdminRemark"
                          onChange={(e) => {
                            curr.latestAdminRemark = e.target.value;
                            setHopperDetails((prevItems) => {
                              const updatedItems = [...prevItems];
                              updatedItems[index] = curr;
                              return updatedItems;
                            });
                          }}
                        />
                      </Td>

                      <Td className="timedate_wrap">
                        <p className="timedate">
                          {curr?.adminData
                            ? curr?.adminData?.name
                            : "no remarks "}
                        </p>
                        <p className="timedate">
                          <img src={watch} className="icn_time" />
                          {moment(curr?.updatedAt).format("hh:mm A")}
                        </p>
                        <p className="timedate">
                          <img src={calendar} className="icn_time" />
                          {moment(curr?.updatedAt).format("DD MMMM YYYY")}
                        </p>

                        <a
                          onClick={() => {
                            history.push(
                              `/admin/hopper-control-history/${curr?._id}/Admin controls`
                            );
                          }}
                          className="timedate"
                        >
                          <BsEye className="icn_time" />
                          View history
                        </a>
                      </Td>
                      <Td>
                        <Button
                          className="theme_btn tbl_btn"
                          type="onSubmit"
                          onClick={() => {
                            handleHopperSave(index);
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
            onPageChange={handlePageChangeHopper}
            pageRangeDisplayed={5}
            pageCount={totalHopperPages}
            previousLabel="<"
            renderOnZeroPageCount={null}
          />
        </Card>

        {/* Task control */}
        <Card
          className="tab_card"
          direction="column"
          w="100%"
          px="0px"
          mb="24px"
          overflowX={{ sm: "scroll", lg: "hidden" }}
        >
          <div className="">
            <Flex px="25px" justify="space-between" mb="10px" align="center">
              <Text
                color={textColor}
                fontSize="22px"
                fontFamily={"AirbnbBold"}
                lineHeight="100%"
              >
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
                      type: "liveTask"
                    }))}>Sort</span>
                  </Text>
                  {hideShow.type === "liveTask" &&
                    <SortFilterDashboard hideShow={hideShow}
                      closeSort={closeSort}
                      sendDataToParent={collectSortParms}
                      sendDataToParent1={collectSortParms1}
                      handleApplySorting={handleApplySorting}
                    />}
                </div>
              </div>
            </Flex>
            <TableContainer className="fix_ht_table">
              <Table mx="20px" variant="simple" className="common_table">
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
                  {liveTasks &&
                    liveTasks.map((curr, index) => {
                      return (
                        <Tr key={curr?._id}>
                          <Td className="item_detail">
                            <img
                              src={curr?.mediahouse_id?.profile_image}
                              alt="Content thumbnail"
                            />
                            <Text className="nameimg">
                              <span className="txt_mdm">
                                {curr?.mediahouse_id?.company_name}
                              </span>
                            </Text>
                          </Td>
                          <Td className="timedate_wrap">
                            <p className="timedate">
                              <img src={watch} className="icn_time" />
                              {moment(curr?.createdAt).format(`hh:mm:A`)}
                            </p>
                            <p className="timedate">
                              <img src={calendar} className="icn_time" />
                              {moment(curr?.createdAt).format(`DD MMMM YYYY`)}
                            </p>
                          </Td>
                          {/* <Td className="address_wrap">{curr?.location}</Td> */}
                          <Td className="remarks_wrap remarks_wrap_edit">
                            <Textarea
                              className="desc_txtarea"
                              value={curr?.task_description} />
                          </Td>
                          <Td className="text_center">
                            <div className="dir_col text_center">
                              {curr?.need_photos && curr?.need_photos === true ? (

                                <Tooltip label={"Image"}>
                                  <img
                                    src={camera}
                                    alt="Content thumbnail"
                                    className="icn m_auto"
                                  />
                                </Tooltip>
                              ) : (
                                ""
                              )}
                              {/* <br></br> */}
                              {curr?.need_interview &&
                                curr?.need_interview === true ? (
                                <Tooltip label={"Interview"}>
                                  <img
                                    src={interview}
                                    alt="Content thumbnail"
                                    className="icn m_auto"
                                  />
                                </Tooltip>
                              ) : (
                                ""
                              )}
                              {/* <br></br> */}
                              {curr?.need_videos && curr?.need_videos === true ? (
                                <Tooltip label={"Video"}>
                                  <img
                                    src={video}
                                    alt="Content thumbnail"
                                    className="icn m_auto"
                                  />
                                </Tooltip>
                              ) : (
                                ""
                              )}
                            </div>
                          </Td>
                          <Td className="text_center">
                            <div className="dir_col text_center">
                              <p className="text_center">{curr?.image_count}</p>
                              <p className="text_center">
                                {curr?.interview_count}
                              </p>
                              <p className="text_center">{curr?.video_count}</p>
                            </div>
                          </Td>
                          <Td className="text_center">
                            <Tooltip label={curr?.category_details?.name}>
                              {
                                <img
                                  src={curr?.category_details?.icon}
                                  className="icn m_auto"
                                />
                              }
                            </Tooltip>
                          </Td>
                          <Td className="avatars_wrap">
                            <div className="overlay_imgs">
                              <div className="img_row1 top_row">
                                {curr?.acceptedby &&
                                  curr?.acceptedby.map((item) => {
                                    const matchingAvatar =
                                      item?.avatar_details?.filter(
                                        (detail) =>
                                          detail?._id === item?.avatar_id
                                      );
                                    if (matchingAvatar) {
                                      return (
                                        <Tooltip
                                          key={item?._id}
                                          label={`${item?.first_name} ${item?.last_name}`}
                                          placement="top"
                                        >
                                          <img
                                            src={process.env.REACT_APP_HOPPER_AVATAR + matchingAvatar[0]?.avatar}
                                            // className="ovrl1"
                                            alt="Avatar"
                                          />
                                        </Tooltip>
                                      );
                                    }

                                    return "no one is accepted ";
                                  })}
                              </div>
                            </div>
                          </Td>
                          <Td className="content_wrap new_content_wrap">
                            <a onClick={() => { history.push(`/admin/live-tasks/${curr?._id}/Live task `) }}>
                              {curr?.uploaded_content &&
                                curr?.uploaded_content.length <= 0 ? (
                                "No Content"
                              ) : curr?.uploaded_content.length <= 1 ? (
                                <img
                                  src={curr?.uploaded_content[0]?.thubnail || process.env.REACT_APP_UPLOADED_CONTENT + curr?.uploaded_content[0]?.imageAndVideo}
                                  className="content_img"
                                  alt="Content thumbnail"
                                />
                              ) : (
                                <div className="content_imgs_wrap contnt_lngth_wrp">
                                  <div className="content_imgs">
                                    {curr?.uploaded_content &&
                                      curr?.uploaded_content
                                        .slice(0, 3)
                                        .map((value) => {
                                          return value.type === "image" ? (
                                            <img
                                              key={value?._id}
                                              src={value.thubnail || process.env.REACT_APP_UPLOADED_CONTENT + value.imageAndVideo}
                                              className="content_img"
                                              alt="Content thumbnail"
                                            />
                                          ) : value.type === "audio" ? (
                                            <img
                                              key={value?._id}
                                              src={interview}
                                              alt="Content thumbnail"
                                              className="icn m_auto"
                                            />
                                          ) : value.type === "video" ? (
                                            <img
                                              key={value?._id}
                                              src={value?.thubnail || process.env.REACT_APP_UPLOADED_CONTENT + value.thubnail}
                                              alt="Content thumbnail"
                                              className="icn m_auto"
                                            />
                                          ) : (
                                            null
                                          );
                                        })}
                                  </div>
                                  <span className="arrow_span">
                                    <BsArrowRight />
                                  </span>
                                </div>
                              )}
                            </a>
                          </Td>
                          <Td className="timedate_wrap">
                            <p className="timedate">
                              <img src={watch} className="icn_time" />
                              {moment(curr?.deadline_date).format(`hh:mm:A`)}
                            </p>
                            <p className="timedate">
                              <img src={calendar} className="icn_time" />
                              {moment(curr?.deadline_date).format(`DD MMMM YYYY`)}
                            </p>
                            <span className="time_left danger">
                              <Timer deadline={curr?.deadline_date} />
                            </span>
                          </Td>
                          <Td className="asign_wrap">
                            <div className="slct">
                              {curr?.assignmorehopperList &&
                                curr?.assignmorehopperList.map((item) => {
                                  return (
                                    <div
                                      className="sl_itm pos_rel active"
                                      key={item._id}
                                    >
                                      <input
                                        type="checkbox"
                                        id={item._id}
                                        className="tsk_asign_check"
                                        onChange={() => handleRowSelect(item._id)}
                                      />
                                      <label
                                        htmlFor={item._id}
                                        className="asign_hpr_lbl"
                                      >
                                        <p>{`${item?.first_name} ${item?.last_name}`}</p>
                                        <span className="sml_txt">
                                          {`${(
                                            item.distance * 0.00062137119
                                          ).toFixed(2)} m away`}
                                        </span>
                                      </label>
                                    </div>
                                  );
                                })}
                            </div>
                          </Td>
                          <Td className="select_wrap">
                            <Select
                              value={curr.mode}
                              onChange={(e) => {
                                curr.mode = e.target.value;
                                setLiveTasks((pre) => {
                                  const updatedData = [...pre];
                                  updatedData[index] = curr;
                                  return updatedData;
                                });
                              }}
                            >
                              <option value="call">Call</option>
                              <option value="chat">Chat</option>
                              <option value="email">Email</option>
                            </Select>
                          </Td>
                          <Td className="remarks_wrap">
                            <Textarea
                              value={curr?.remarks}
                              onChange={(e) => {
                                curr.remarks = e.target.value;
                                setLiveTasks((pre) => {
                                  const updatedData = [...pre];
                                  updatedData[index] = curr;
                                  return updatedData;
                                });
                              }}
                            />
                          </Td>
                          <Td className="timedate_wrap">
                            <p className="timedate emp_nme">
                              {curr?.admin_id[0]?.name}
                            </p>
                            <p className="timedate">
                              <img src={watch} className="icn_time" />
                              {moment(curr?.updatedAt).format(`hh:mm:A`)}
                            </p>
                            <p className="timedate">
                              <img src={calendar} className="icn_time" />
                              {moment(curr?.updatedAt).format(`DD MMMM YYYY`)}
                            </p>
                            <a
                              onClick={() => {
                                history.push(
                                  `/admin/hopper-task-contol-history/${curr?._id}/Task control history/Admin controls`
                                );
                              }}
                              className="timedate"
                            >
                              <BsEye className="icn_time" />
                              View history
                            </a>
                          </Td>
                          <Td>
                            <Button
                              className="theme_btn tbl_btn"
                              onClick={() => EditLiveTask(index)}
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
            onPageChange={handlePageChangeLiveTask}
            pageRangeDisplayed={5}
            pageCount={totalLiveTaskPages}
            previousLabel="<"
            renderOnZeroPageCount={null}
          />
        </Card>

        {/* Publication control */}
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
                    setCsv(path3)
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
                  {hideShow.type === "publicationControl" &&
                    <SortFilterDashboard hideShow={hideShow}
                      closeSort={closeSort}
                      sendDataToParent={collectSortParms}
                      sendDataToParent1={collectSortParms1}
                      handleApplySorting={handleApplySorting}
                    />}
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
                    <Th>Legal T&C’s signed</Th>
                    <Th>Check & approve</Th>
                    <Th>Mode</Th>
                    <Th>Status</Th>
                    <Th>Action</Th>
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
                            />
                            <Text className="nameimg">
                              <span className="txt_mdm">{curr.company_name}</span>
                            </Text>
                            {/* <Progress
                              className="w_100 progress"
                              colorScheme="red"
                              size="sm"
                              value={70}
                            /> */}
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
                          <Td>{curr.ratingsforMediahouse ? curr.ratingsforMediahouse : 'N/A'}</Td>

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
                            {curr?.upload_docs?.documents
                              ? curr?.upload_docs?.documents.map((value) => (
                                <img
                                  src={docuploaded}
                                  className="doc_uploaded"
                                  alt="document uploaded"
                                  onClick={() => {
                                    window.open(value?.url, "_blank");
                                  }}
                                />
                              ))
                              : ""}

                            {/* {curr.upload_docs.documents[0].url} <br />
                          VAT certificate <br />
                          Media license */}
                          </Td>
                          <Td className="contact_details">
                            {curr.company_bank_details.bank_name}
                            <br />
                            Sort Code -{curr?.company_bank_details?.sort_code}
                            <br />
                            Account - {curr?.company_bank_details?.account_number}
                          </Td>
                          <Td className="text_center">
                            <Checkbox
                              colorScheme="brandScheme"
                              me="10px"
                              name="is_terms_accepted"
                              isChecked={true}
                            // onChange={(e) => {
                            //   curr.is_terms_accepted = e.target.checked;
                            //   setpublicationData((prevItems) => {
                            //     const updatedItems = [...prevItems];
                            //     updatedItems[index] = curr;
                            //     return updatedItems;
                            //   });
                            // }}
                            />

                          </Td>
                          <Td className="check_aprv_td">
                            <Checkbox
                              colorScheme="brandScheme"
                              me="10px"
                              name="checkAndApprove"
                              isChecked={curr?.checkAndApprove}
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
                              value={curr?.mode}
                              name="mode"
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
                            </Select>
                          </Td>
                          <Td className="big_select_wrap">
                            <Select
                              value={curr?.status}
                              name="status"
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
                                colorScheme="brandScheme"
                                me="10px"
                                isChecked={curr?.isTempBlocked}
                                onChange={(e) => {
                                  setpublicationData((prevItems) => {
                                    const updatedItems = [...prevItems];
                                    updatedItems[index].isTempBlocked =
                                      !updatedItems[index].isTempBlocked;
                                    if (
                                      updatedItems[index].isTempBlocked &&
                                      updatedItems[index].isPermanentBlocked
                                    ) {
                                      updatedItems[
                                        index
                                      ].isPermanentBlocked = false;
                                    }
                                    return updatedItems;
                                  });
                                }}
                              />
                              <span>Temporary Block</span>
                            </div>
                            <div className="check_wrap">
                              <Checkbox
                                colorScheme="brandScheme"
                                me="10px"
                                isChecked={curr?.isPermanentBlocked}
                                onChange={(e) => {
                                  setpublicationData((prevItems) => {
                                    const updatedItems = [...prevItems];
                                    updatedItems[index].isPermanentBlocked =
                                      !updatedItems[index].isPermanentBlocked;
                                    if (
                                      updatedItems[index].isPermanentBlocked &&
                                      updatedItems[index].isTempBlocked
                                    ) {
                                      updatedItems[index].isTempBlocked = false;
                                    }
                                    return updatedItems;
                                  });
                                }} />
                              <span>Permanent Block</span>
                            </div>
                          </Td>
                          <Td className="remarks_wrap">
                            <Textarea
                              placeholder="Enter remarks if any..."
                              id={curr?._id}
                              value={curr.remarks}
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
                                  `/admin/publication-control-history/${curr._id}/Publication control history/Admin controls`
                                );
                              }}
                              className="timedate"
                            >
                              <BsEye className="icn_time" />
                              View history
                            </a>
                          </Td>
                          <Td>
                            <Button
                              className="theme_btn"
                              onClick={() => {
                                handleSave(index);
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
          </div>
          <ReactPaginate
            className="paginated"
            breakLabel="..."
            nextLabel=">"
            onPageChange={handleChangePublication}
            pageRangeDisplayed={5}
            pageCount={totalPublicationPages}
            previousLabel="<"
            renderOnZeroPageCount={null}
          />
        </Card>

        {/* Employee control */}
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
                Employee Control
              </Text>
              <div className="opt_icons_wrap">
                <a
                  onClick={() => {
                    setShow(true)
                    setCsv(path5)
                  }}
                  className="txt_danger_mdm"
                >
                  <Tooltip label={"Share"}>
                    <img src={share} className="opt_icons" />
                  </Tooltip>
                </a>

                <span onClick={() => DownloadEmployeeCsv(currentPageEmployee)}>
                  {" "}
                  <Tooltip label={"Print"}>
                    <img src={print} className="opt_icons" />
                  </Tooltip>
                </span>
                <div className="fltr_btn">
                  <Text fontSize={"15px"}>
                    <span onClick={() => setHideShow((prevHideShow) => ({
                      ...prevHideShow,
                      status: true,
                      type: "employeeControl"
                    }))}>Sort</span>
                  </Text>
                  {hideShow.type === "employeeControl" &&
                    <SortFilterDashboard hideShow={hideShow}
                      closeSort={closeSort}
                      sendDataToParent={collectSortParms}
                      sendDataToParent1={collectSortParms1}
                      handleApplySorting={handleApplySorting}
                    />}
                </div>
              </div>
            </Flex>
            <TableContainer className="fix_ht_table">
              <Table mx="20px" variant="simple" className="common_table">
                <Thead>
                  <Tr>
                    <Th>Employee details</Th>
                    <Th>Employee ID</Th>
                    <Th>Address</Th>
                    <Th>Office</Th>
                    <Th>Banking details</Th>
                    <Th>Contract signed</Th>
                    <Th>Legal T&C’s signed</Th>
                    <Th>Approved</Th>
                    <Th>Status</Th>
                    {profile?.subadmin_rights?.blockRemoveEmployess && (
                      <Th>Action</Th>
                    )}
                    <Th>Remarks</Th>

                    <Th>CTA</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {employeeData &&
                    employeeData.map((curr, index) => {
                      return (
                        <Tr>
                          <Td className="item_detail">
                            <img
                              src={`https://uat-presshope.s3.eu-west-2.amazonaws.com/public/adminImages/${curr?.profile_image}`}
                              alt="Content thumbnail"
                            />
                            <Text className="nameimg">
                              {curr?.name}
                              <br />
                              <span>({curr?.designationData?.name})</span>
                            </Text>
                          </Td>
                          <Td>
                            <div className="id_wrap">
                              <img src={idic} alt="id" className="icn" />
                              <span>{curr?._id}</span>
                            </div>
                          </Td>
                          {/* <Td className="item_detail address_details">5 Canada Square. Canary Wharf. London < br /> E14 5AQ</Td> */}
                          <Td className="item_detail address_details">
                            {curr?.employee_address?.complete_address}{" "}
                            {curr?.employee_address?.city},
                            {curr?.employee_address?.country}
                            <br />
                            post-code {curr?.employee_address?.post_code}
                          </Td>

                          <Td>{curr?.officeDetails?.address.country}</Td>
                          <Td className="contact_details">
                            {curr?.bank_details?.bank_name}
                            <br />
                            Sort Code-{curr?.bank_details?.sort_code}
                            <br />
                            Account-{curr?.bank_details?.account_number}
                          </Td>

                          <Td className="text_center">
                            <Checkbox
                              colorScheme="brandScheme"
                              me="10px"
                              isChecked={curr?.is_Contractsigned}
                              onChange={(e) => {
                                const updatedCurr = {
                                  ...curr,
                                  is_Contractsigned: e.target.checked,
                                };
                                setEmployeeData((pre) => {
                                  const updatedItems = [...pre];
                                  updatedItems[index] = updatedCurr;
                                  return updatedItems;
                                });
                              }}
                            />
                          </Td>

                          <Td className="text_center">
                            <Checkbox
                              colorScheme="brandScheme"
                              me="10px"
                              isChecked={curr?.is_Legal}
                              onChange={(e) => {
                                const updatedCurr = {
                                  ...curr,
                                  is_Legal: e.target.checked,
                                };
                                setEmployeeData((pre) => {
                                  const updatedItems = [...pre];
                                  updatedItems[index] = updatedCurr;
                                  return updatedItems;
                                });
                              }}
                            />
                          </Td>

                          <Td className="text_center">
                            <Checkbox
                              colorScheme="brandScheme"
                              me="10px"
                              isChecked={curr?.is_Checkandapprove}
                              onChange={(e) => {
                                const updatedCurr = {
                                  ...curr,
                                  is_Checkandapprove: e.target.checked,
                                };
                                setEmployeeData((pre) => {
                                  const updatedItems = [...pre];
                                  updatedItems[index] = updatedCurr;
                                  return updatedItems;
                                });
                              }}
                            />
                          </Td>

                          <Td className="big_select_wrap">
                            <Select
                              value={curr?.status}
                              onChange={(e) => {
                                const updatedCurr = {
                                  ...curr,
                                  status: e.target.value,
                                };
                                setEmployeeData((pre) => {
                                  const updatedItems = [...pre];
                                  updatedItems[index] = updatedCurr;
                                  return updatedItems;
                                });
                              }}
                            >
                              <option value="approved">Onboarded</option>
                              <option value="pending">Pending</option>
                            </Select>
                          </Td>

                          {profile?.subadmin_rights?.blockRemoveEmployess && (
                            <Td className="item_detail">
                              <div className="check_wrap">
                                <Checkbox
                                  colorScheme="brandScheme"
                                  me="10px"
                                  isChecked={curr?.isTempBlocked}
                                  onChange={(e) => {
                                    setEmployeeData((prevItems) => {
                                      const updatedItems = [...prevItems];
                                      updatedItems[index].isTempBlocked =
                                        !updatedItems[index].isTempBlocked;
                                      if (
                                        updatedItems[index].isTempBlocked &&
                                        updatedItems[index].isPermanentBlocked
                                      ) {
                                        updatedItems[index].isTempBlocked = false;
                                      }
                                      return updatedItems;
                                    });
                                  }}
                                />
                                <span>Termporary block</span>
                              </div>
                              <div className="check_wrap">
                                <Checkbox
                                  colorScheme="brandScheme"
                                  me="10px"
                                  isChecked={curr?.isPermanentBlocked}
                                  onChange={(e) => {
                                    setEmployeeData((prevItems) => {
                                      const updatedItems = [...prevItems];
                                      updatedItems[index].isPermanentBlocked =
                                        !updatedItems[index].isPermanentBlocked;
                                      if (
                                        updatedItems[index].isPermanentBlocked &&
                                        updatedItems[index].isTempBlocked
                                      ) {
                                        updatedItems[index].isTempBlocked = false;
                                      }
                                      return updatedItems;
                                    });
                                  }}
                                />
                                <span>Permanent block</span>
                              </div>
                            </Td>
                          )}

                          <Td className="remarks_wrap">
                            <Textarea
                              placeholder="Enter remarks if any..."
                              value={curr?.remarks}
                              onChange={(e) => {
                                const updatedCurr = {
                                  ...curr,
                                  remarks: e.target.value,
                                };
                                setEmployeeData((pre) => {
                                  const updatedItems = [...pre];
                                  updatedItems[index] = updatedCurr;
                                  return updatedItems;
                                });
                              }}
                            />
                          </Td>

                          <Td>
                            <Button
                              className="theme_btn tbl_btn"
                              onClick={() => EditEmployee(index)}
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
            onPageChange={handlePageChangeEmployee}
            pageRangeDisplayed={5}
            pageCount={totalEmployeePages}
            previousLabel="<"
            renderOnZeroPageCount={null}
          />
        </Card>
      </Box>
      <Share show={show} csv={csv} update={handleClose} />
    </>
  );
}
