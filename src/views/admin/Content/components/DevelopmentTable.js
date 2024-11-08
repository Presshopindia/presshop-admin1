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
  Select,
  Textarea,
  TableContainer,
  Checkbox,
  Button,
  Tooltip,
} from "@chakra-ui/react";
import Card from "components/card/Card";
import React, { useEffect, useMemo, useRef, useState, useContext } from "react";
import { BsEye } from "react-icons/bs";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import camera from "assets/img/icons/camera.svg";
import crown from "assets/img/icons/crown.png";
import shared from "assets/img/icons/shared.svg";
import share from "assets/img/icons/share.png";
import video from "assets/img/icons/video.svg";
import watch from "assets/img/icons/watch.svg";
import calendar from "assets/img/icons/calendar.svg";
import print from "assets/img/icons/print.png";
import write from "assets/img/icons/write.svg";
import moment from "moment";
import interview from "assets/img/icons/interview.svg";
import { BsArrowRight } from "react-icons/bs";
import { useHistory } from "react-router-dom";
import { Get } from "api/admin.services";
import { Patch } from "api/admin.services";
import { toast } from "react-toastify";
import ReactPaginate from "react-paginate";
import Loader from "components/Loader";
import dataContext from "views/admin/ContextFolder/Createcontext";
import Share from "components/share/Share";
import SortFilterContent from "components/sortfilters/SortFilterContent";
import docic from "assets/img/icons/contentdoc.svg";
import pdfic from "assets/img/icons/contentpdf.svg";

import { doc } from "firebase/firestore";
import { recic } from "assets/img/icons/recording.svg";
import { categoryic } from "assets/img/icons/category.svg";
import { Post } from "api/admin.services";
import PopupConfirm from "components/Pop Confirm";
import DeletedContents from "./DeletedContents";
import SortFilterDashboard from "components/sortfilters/SortFilterDashboard";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { deleteCSV } from "utils/commonFunction";
export default function DevelopmentTable(props) {
  const [contentId, setContentId] = useState(null);
  const [adult, setAdult] = useState(null);
  const [gdpr, setGdpr] = useState(null);
  const [Nudity, setNudity] = useState(null);
  const { profile } = useContext(dataContext);
  const textColor = useColorModeValue("#000", "white");
  const [mode, setMode] = useState([]);
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  // for Uploaded-
  const uploadedContent = queryParams.get('uploadedContent');
  const [liveUploadedContPage, setLiveUploadedContPage] = useState(uploadedContent || 1);
  const [liveUploadedContentTotalPages, setLiveUploadedContTotalPages] =
    useState(0);
  const [liveUploadedContent, setLiveUploadedContent] = useState([]);

  const pubPage = queryParams.get('pubPage');

  // pagination published content
  const [publishedData, setPublishedData] = useState([]);
  const [currentPagePublishdContent, setCurrentPagePublishdContent] = useState(pubPage || 1);
  const [totalPublishdContentPages, setTotalPublishdContentPages] = useState(0);

  // states for content on boarding
  const [contentList, setContentList] = useState([]);
  const [blockedContentList, setBlockedContentList] = useState([]);
  const contOnboarding = queryParams.get('contOnboarding');
  const [currentPageContent, setCurrentPageContent] = useState(contOnboarding || 1);
  const [totalContentPages, setTotalContentPages] = useState(0);
  const perPage = 5;
  // for share
  const [path1, setpath1] = useState("");
  const [path2, setpath2] = useState("");

  const [selectedCategory, setselectedCategory] = useState(null);

  const [path3, setpath3] = useState("");
  const [show, setShow] = useState(false);
  const [csv, setCsv] = useState("");
  const history = useHistory();
  const [hideShow, setHideShow] = useState({ status: false, type: "" });
  const [params, SetParams] = useState({
    parameters: "",
    parametersName: "",
    parameters1: "",
    parametersName1: "",
  });
  const [categories, setCategories] = useState([]);

  const [deletedContents, setDeletedContents] = useState([])
  const deletedContent = queryParams.get('deletedContent');
  const [currentPageDelCont, setCurrentPageDelCont] = useState(deletedContent || 1)
  const [deletedContentPages, setDeletedContentPages] = useState(10)

  // content onBoarding
  const getContentList = async (
    page,
    parametersName,
    parameters,
    parametersName1,
    parameters1,
  ) => {
    setLoading(true);
    const offset = (page - 1) * perPage;
    try {
      await Get(`admin/getContentList?status=pending
      &limit=${perPage}&offset=${offset}&${parametersName}=${parameters}
      &${parametersName1}=${parameters1}`).then((res) => {
        setContentList(res?.data?.contentList);
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

  const handleChangeContent = (selectedPage) => {
    setCurrentPageContent(selectedPage.selected + 1);
    history.push(`?contOnboarding=${selectedPage.selected + 1}`);
  };

  // content on boarding update
  const updateContent = async (index) => {
    try {
      closeSort();
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
        ask_price: currentContent.ask_price,
        original_ask_price: currentContent.original_ask_price,
        type: currentContent.type,
        category_id: currentContent?.category_id,
        check_explicity: currentContent?.content?.map((el) => el.watermark)
      };
      if (currentContent.status === "rejected") {
        if (!currentContent.remarks || currentContent.remarks.trim() === "") {
          toast.error("Enter remarks");
        } else {
          const resp = await Patch(`admin/editContent`, obj);
          if (resp) {
            contentList[index].remarks = "";
            getBlockedContentList();
            getContentList(currentPageContent);
            getContentListPublished(currentPagePublishdContent);
            toast.error("Content rejected");
            mode[0][index] = currentContent.mode;
          }
        }
      } else if (currentContent?.checkAndApprove === false) {
        toast.error("Please choose check and approve");
      } else if (currentContent.status === "pending") {
        if (!currentContent.heading || currentContent.heading.trim() === "") {
          toast.error("Enter heading");
        } else if (
          currentContent?.isAdult === false ||
          currentContent?.isGDPR === false ||
          currentContent?.nudity === false
        ) {
          toast.error("Please check all the first level");
        } else if (
          !currentContent.description ||
          currentContent.description.trim() === ""
        ) {
          toast.error("Enter description");
        } else if (
          !currentContent.remarks ||
          currentContent.remarks.trim() === ""
        ) {
          toast.error("Enter remarks");
        } else {
          const resp = await Patch(`admin/editContent`, obj);
          if (resp) {
            contentList[index].remarks = "";
            getBlockedContentList()
            getContentList(currentPageContent);
            getContentListPublished(currentPagePublishdContent);
            toast.success("Updated");
            mode[0][index] = currentContent.mode;
          }
        }
      } else if (currentContent.status === "published") {
        if (!currentContent.heading || currentContent.heading.trim() === "") {
          toast.error("Enter heading");
        } else if (
          !currentContent.description ||
          currentContent.description.trim() === ""
        ) {
          toast.error("Enter description");
        } else if (
          !currentContent.remarks ||
          currentContent.remarks.trim() === ""
        ) {
          toast.error("Enter remarks");
        } else if (
          !currentContent.secondLevelCheck ||
          currentContent.secondLevelCheck.trim() === ""
        ) {
          toast.error("Second level check is required");
        } else {
          const resp = await Patch(`admin/editContent`, obj);
          if (resp) {
            contentList[index].remarks = "";
            getBlockedContentList();
            getContentList(currentPageContent);
            getContentListPublished(currentPagePublishdContent);
            getBlockedContentList(currentPageContent)
            toast.success("Content published on the marketplace");
            mode[0][index] = currentContent.mode;
          }
        }
      }
    } catch (err) {
      // console.error(err);
    }
  };

  useEffect(() => {
    getContentCategories();
  }, []);

  useEffect(async () => {
    if (hideShow?.type === "contentOnboarding") {
      getContentList(
        currentPageContent,
        parametersName,
        parameters,
        parametersName1,
        parameters1
      );
    } else {
      getContentList(currentPageContent);
    }

    // await getContentList(currentPageContent);
    mode.push(
      contentList.map((value) => {
        return value.mode;
      })
    );
  }, [currentPageContent]);

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

  // states published data

  const getContentListPublished = async (page, parametersName, parameters) => {
    setLoading(true);
    const offset = (page - 1) * perPage;
    try {
      const data = await Get(
        `admin/getContentList?status=published&offset=${offset}&limit=${perPage}&${parametersName}=${parameters}`
      );

      // console.log("Data pub")
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
  // pagination
  const handlePageChangePublished = (selectedPage) => {
    setCurrentPagePublishdContent(selectedPage.selected + 1);
    history.push(`?pubPage=${selectedPage.selected + 1}`);
  };

  const handlePageChangeDeleted = (selectedPage) => {
    setCurrentPageDelCont(selectedPage.selected + 1);
    history.push(`?deletedContent=${selectedPage.selected + 1}`);
  };


  // download csv
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

  useEffect(() => {
    if (hideShow?.type === "Live published content") {
      getContentListPublished(
        currentPagePublishdContent,
        parametersName,
        parameters,
        parametersName1,
        parameters1
      );
    } else {

      getContentListPublished(currentPagePublishdContent);
    }
  }, [currentPagePublishdContent]);

  // print content onBoarding
  const printOnboardingTable = async () => {
    try {
      const response = await Get(`admin/getContentList?status=pending`);
      if (response) {
        const onboardinPrint = response?.data?.fullPath;
        window.open(onboardinPrint);
        deleteCSV(response?.data?.fullPath)
      }
    } catch (err) {
      // console.log("<---Have an error ->", err);
    }
  };

  // uploaded content

  const getLiveUploadedContent = async (page, parametersName, parameters) => {
    const offset = (page - 1) * perPage;
    setLoading(true);
    try {
      await Get(
        `admin/getalluploadedcontent?offset=${offset}&limit=${perPage}&${parametersName}=${parameters}`
      ).then((res) => {
        setLiveUploadedContent(res?.data?.response);
        setpath3(res?.data?.fullPath);
        setLiveUploadedContTotalPages(res?.data?.count / perPage);
        setLoading(false);
        deleteCSV(res?.data?.fullPath)
      });
    } catch (error) {
      setLoading(false);
    }
  };

  // download csv
  const DownloadCsvLiveUploaded = async (page) => {
    const offset = (page - 1) * perPage;
    try {
      const response = await Get(
        `admin/liveUploadedContent?offset=${offset}&limit=${perPage}`
      );
      if (response) {
        const path = response?.data?.fullPath;
        window.open(path);
        deleteCSV(response?.data?.fullPath)
      }
    } catch (err) {
      // console.log("<---Have an error ->", err);
    }
  };
  // for pagination
  const handlePageChangeLiveUploaded = (selectedPage) => {
    setLiveUploadedContPage(selectedPage.selected + 1);
    history.push(`?uploadedContent=${selectedPage.selected + 1}`);
  };
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
  // edit live uploaded content
  const EditUploadedContent = async (index) => {
    const id = [];
    if (liveUploadedContent && liveUploadedContent[index]?.uploaded_content) {
      liveUploadedContent[index]?.uploaded_content.forEach((item) => {
        id.push(item?._id);
      });
    }
    let obj = {
      mode: liveUploadedContent[index].task_id.modeforliveUploaded,
      latestAdminRemark:
        liveUploadedContent[index].task_id.remarksforliveUploaded,
      content_id: id,
      task_id: liveUploadedContent[index]._id.task_id,
    };

    // if (
    //   !liveUploadedContent[index].task_id.mode ||
    //   liveUploadedContent[index].task_id.mode.trim() === null
    // ) {
    //   toast.error("Choose mode");
    // } else if (
    //   !liveUploadedContent[index].task_id.remarks ||
    //   liveUploadedContent[index].task_id.remarks.trim() === ""
    // ) {
    //   toast.error("Enter Remarks");
    // } else {

    try {
      await Patch(`admin/editLiveuploadedContent`, obj);
      toast.success("Successfully updated");
      getLiveUploadedContent(liveUploadedContPage);
    } catch (err) { }
    // }
  };

  const handleClose = () => {
    setShow(!show);
  };

  useEffect(() => {
    getLiveUploadedContent(liveUploadedContPage);
  }, [liveUploadedContPage]);

  // sorting
  const closeSort = () => {
    setHideShow((prevHideShow) => ({
      ...prevHideShow,
      status: false,
      // type: "",
    }));
  };

  const collectSortParms = (name, order) => {
    SetParams((prevParams) => ({
      ...prevParams,
      parameters: order,
      parametersName: name,
    }));
  };

  const collectSortParms1 = (name, order) => {
    SetParams((prevParams) => ({
      ...prevParams,
      parameters1: order,
      parametersName1: name,
    }));
  };
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
  const { parameters, parametersName, parameters1, parametersName1 } = params;

  const handleApplySorting = () => {
    if (hideShow?.type === "contentOnboarding") {
      getContentList(
        currentPageContent,
        parametersName,
        parameters,
        parametersName1,
        parameters1
      );

      closeSort();
    } else if (hideShow?.type === "Live published content") {
      getContentListPublished(
        currentPagePublishdContent,
        parametersName,
        parameters,
        parametersName1,
        parameters1
      );
      closeSort();
    } else if (hideShow?.type === "Live uploaded content") {
      getLiveUploadedContent(
        liveUploadedContPage,
        parametersName,
        parameters,
        parametersName1,
        parameters1
      );
      closeSort();

    }
    else if (hideShow?.type === "deletedContent") {
      getDeletedContents(
        liveUploadedContPage,
        parametersName,
        parameters,
        parametersName1,
        parameters1
      );
      closeSort();
    }
  };
  // convert amount comma seprator
  const formatAmountInMillion = (amount) =>
    amount?.toLocaleString("en-US", {
      maximumFractionDigits: 2,
    });

  // const categoryOpt = [ "Sport"]  //category array for category select options ,place dynamic options here
  // const categoryOpt = categories;
  // //handle Content change
  // const handleChange = (e, name) => {
  //   //check from where the function is called and perform operation
  //   if (e.target.name === "categoryData") {
  //     setContentList((prev) => ({
  //       ...prev,
  //       [e.target.name]: { ...[e.target.name], name: e.target.value },
  //     }));
  //   }
  // };


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

  return (
    <>
      {loading && <Loader />}
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
        <TableContainer className="fix_ht_table">
          <Table mx="20px" variant="simple" className="common_table">
            <Thead>
              <Tr>
                <Th>Posted content</Th>
                <Th>Time & date</Th>
                <Th>Location</Th>
                <Th>Heading</Th>
                <Th>Description</Th>
                <Th className="text_center">Voice note</Th>
                <Th>Type</Th>
                <Th>Licence</Th>
                <Th>Category</Th>
                <Th>Volume</Th>
                <Th>Price</Th>
                <Th>Posted by</Th>
                <Th className="width_th_comn">1st level check</Th>
                <Th className="width_th_comn">2nd level check & call</Th>
                <Th className="width_th_comn">Time & date</Th>
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
                  const Doc = value?.content?.filter(
                    (curr) => curr?.media_type === "doc"
                  );
                  const Pdf = value?.content?.filter(
                    (curr) => curr?.media_type === "pdf"
                  );

                  return (
                    <Tr key={value._id}>
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

                      <Td className="text_center">
                        {value?.audio_description ? (
                          <audio controls>
                            <source
                              src={
                                process.env.REACT_APP_CONTENT +
                                value?.audio_description
                              }
                              type="audio/mp3"
                            />
                          </audio>
                        ) : "NA"}

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
                              //   // console.log('sdhhhhhhhhhhhhhhhjhv')
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
                if(updatedData.length > 0){
                  return updatedData = []
                }
                else{
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
                              //   // console.log('sdhhhhhhhhhhhhhhhjhv')
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

                {/* <SortFilterDashboard /> */}
              </div>
            </div>
          </Flex>

          {/* live published content  */}
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
              Uploaded content summary
            </Text>
            <div className="opt_icons_wrap">
              <a
                onClick={() => {
                  setShow(true);
                  setCsv(path3);
                }}
                className="txt_danger_mdm"
              >
                <img src={share} className="opt_icons" />
              </a>
              <span
                onClick={() => DownloadCsvLiveUploaded(liveUploadedContPage)}
              >
                <img src={print} className="opt_icons" />
              </span>

              <div className="fltr_btn">
                <Text fontSize={"15px"}>
                  <span
                    onClick={() =>
                      setHideShow((prevHideShow) => ({
                        ...prevHideShow,
                        status: true,
                        type: "Live uploaded content",
                      }))
                    }
                  >
                    Sort
                  </span>
                </Text>

                {/* <SortFilterContent */}
                {hideShow.type === "Live uploaded content" && (
                  <SortFilterDashboard
                    hideShow={hideShow}
                    closeSort={closeSort}
                    sendDataToParent={collectSortParms}
                    sendDataToParent1={collectSortParms1}
                    handleApplySorting={handleApplySorting}
                  />
                )}

                {/* <SortFilterDashboard /> */}
              </div>
            </div>
          </Flex>
          <TableContainer className="fix_ht_table">
            <Table mx="20px" variant="simple" className="common_table">
              <Thead>
                <Tr>
                  <Th>Uploaded content</Th>
                  <Th>Time & date</Th>
                  <Th>Location</Th>
                  <Th>Task broadcasted by</Th>
                  <Th>Task details</Th>
                  <Th>Type</Th>
                  <Th>Category</Th>
                  <Th>Volume</Th>
                  <Th>Total price</Th>
                  <Th>Sale status</Th>
                  <Th>Amount received</Th>
                  <Th>Presshop commission</Th>
                  <Th>Amount paid</Th>
                  <Th>Amount payable</Th>
                  {/* <Th className="rcvd_comn_th">Received From</Th> */}
                  <Th>Uploaded by</Th>
                  <Th>Mode</Th>
                  <Th>Remarks</Th>
                  <Th>Employee details</Th>
                  <Th>CTA</Th>
                </Tr>
              </Thead>
              <Tbody>
                {liveUploadedContent &&
                  liveUploadedContent.map((curr, index) => {
                    return (
                      <Tr>
                        <Td className="content_wrap new_content_wrap">
                          <a
                            onClick={() => {
                              history.push(
                                `/admin/live-uploaded-content/${curr?._id?.hopper_id}/${curr?._id?.task_id}/Uploaded content`
                              );
                            }}
                          >
                            {curr &&
                              curr.uploaded_content &&
                              curr.uploaded_content.length === 1 ? (
                              <img
                                src={
                                  process.env.REACT_APP_UPLOADED_CONTENT +
                                  curr?.uploaded_content[0]?.imageAndVideo
                                }
                              />
                            ) : (
                              <div className="content_imgs_wrap contnt_lngth_wrp">
                                <div className="content_imgs">
                                  {curr?.uploaded_content &&
                                    curr?.uploaded_content
                                      .slice(0, 3)
                                      .map((value) =>
                                        value.type === "image" ? (
                                          <img
                                            key={value?._id}
                                            src={
                                              value?.videothubnail ||
                                              process.env
                                                .REACT_APP_UPLOADED_CONTENT +
                                              value.imageAndVideo
                                            }
                                            className="content_img"
                                            alt="Content thumbnail"
                                          />
                                        ) : value.type === "audio" ? (
                                          <img
                                            src={interview}
                                            alt="Content thumbnail"
                                            className="icn m_auto"
                                          />
                                        ) : value.type === "video" ? (
                                          <img
                                            src={value?.videothubnail}
                                            alt="Content thumbnail"
                                            className="icn m_auto"
                                          />
                                        ) : (
                                          "No content"
                                        )
                                      )}
                                  <span className="arrow_span">
                                    <BsArrowRight />
                                  </span>
                                </div>
                              </div>
                            )}
                          </a>
                        </Td>
                        <Td className="timedate_wrap">
                          <p className="timedate">
                            <img src={watch} className="icn_time" />
                            {moment(curr?.task_id?.createdAt).format(`hh:mm:A`)}
                          </p>
                          <p className="timedate">
                            <img src={calendar} className="icn_time" />
                            {moment(curr?.task_id?.createdAt).format(
                              `DD MMMM YYYY`
                            )}
                          </p>
                        </Td>
                        <Td className="address_wrap">
                          {curr?.task_id?.location}
                        </Td>
                        <Td className="item_detail">
                          <img
                            src={curr?.brodcasted_by?.profile_image}
                            alt="Content thumbnail"
                          />
                          <Text className="nameimg naming_comn">
                            <span className="txt_mdm">
                              {curr?.brodcasted_by?.company_name}
                            </span>
                          </Text>
                        </Td>
                        <Td className="description_td">
                          <Text className="desc_ht">
                            {curr?.task_id?.task_description}
                          </Text>
                        </Td>
                        <Td className="text_center">
                          <div className="dir_col text_center">
                            {curr?.task_id &&
                              curr?.task_id?.need_photos === true ? (
                              <Tooltip label={"Photo"}>
                                <img
                                  src={camera}
                                  alt="Content thumbnail"
                                  className="icn m_auto"
                                />
                              </Tooltip>
                            ) : (
                              ""
                            )}
                            {curr?.task_id &&
                              curr?.task_id?.need_interview === true ? (
                              <Tooltip label={"Inreview"}>
                                <img
                                  src={interview}
                                  alt="Content thumbnail"
                                  className="icn m_auto"
                                />
                              </Tooltip>
                            ) : (
                              ""
                            )}
                            {curr?.task_id &&
                              curr?.task_id?.need_videos === true ? (
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
                          <Tooltip label={curr?.category_details?.[0]?.name}>
                            {
                              <img
                                src={curr?.category_details?.[0]?.icon}
                                className="icn m_auto"
                              />
                            }
                          </Tooltip>
                        </Td>
                        <Td className="text_center">
                          <div className="dir_col text_center">
                            <p className="text_center">
                              {curr?.imagecount ?? 0}
                            </p>
                            <p className="text_center">
                              {curr?.interviewcount ?? 0}
                            </p>
                            <p className="text_center">
                              {curr?.videocount ?? 0}
                            </p>
                          </div>
                        </Td>
                        <Td className="text_center">
                          <div className="dir_col">
                            <p>
                              £{" "}
                              {formatAmountInMillion(
                                curr?.total_image_price ?? 0
                              )}
                            </p>
                            <p>
                              £{" "}
                              {formatAmountInMillion(
                                curr?.total_interview_price ?? 0
                              )}
                            </p>
                            <p>
                              £{" "}
                              {formatAmountInMillion(
                                curr?.total_video_price ?? 0
                              )}
                            </p>
                          </div>
                        </Td>
                        <Td className="">
                          {curr?.sale_status === "sold" ? (
                            <span className="txt_success_mdm">sold</span>
                          ) : (
                            <span className="txt_danger_mdm">unsold</span>
                          )}
                        </Td>
                        <Td className="timedate_wrap">
                          &pound;
                          {formatAmountInMillion(
                            curr?.total_amount_recieved ?? "0"
                          )}
                          <p>
                            {" "}
                            <a className="back_link timedate">
                              <BsEye className="icn_time" />
                              View
                            </a>
                          </p>
                        </Td>
                        <Td className="timedate_wrap">
                          &pound;
                          {formatAmountInMillion(
                            curr?.total_presshop_commission ?? "0"
                          )}
                        </Td>
                        <Td className="timedate_wrap">
                          &pound;
                          {formatAmountInMillion(
                            curr?.total_amount_paid ?? "0"
                          )}
                          <p>
                            {" "}
                            <a className="back_link timedate">
                              <BsEye className="icn_time" />
                              View
                            </a>
                          </p>
                        </Td>
                        <Td className="timedate_wrap">
                          &pound;
                          {formatAmountInMillion(
                            curr?.total_amount_payable ?? "0"
                          )}
                        </Td>
                        {/* <Td className="rcvd_comn_td">
                          <p>
                            {curr?.transictions_false[0]?.purchased_publication
                              ?.company_bank_details?.bank_name ?? ""}
                          </p>
                          <p>{`Sort Code ${
                            curr?.transictions_false[0]?.purchased_publication
                              ?.company_bank_details?.sort_code ?? ""
                          }`}</p>
                          <p>{`Account ${
                            curr?.transictions_false[0]?.purchased_publication
                              ?.company_bank_details?.account_number ?? ""
                          }`}</p>
                        </Td> */}
                        <Td className="item_detail">
                          <img
                            src={
                              process.env.REACT_APP_HOPPER_AVATAR +
                              curr?.avatar_details?.[0]?.avatar
                            }
                            alt="Content thumbnail"
                          />
                          <Text className="nameimg naming_comn">
                            <span className="txt_mdm">{`${curr?.uploaded_by?.first_name} ${curr?.uploaded_by?.last_name}`}</span>
                            <br />
                            <span>({curr?.uploaded_by?.user_name})</span>
                          </Text>
                        </Td>

                        <Td className="select_wrap">
                          <Select
                            value={curr?.task_id?.modeforliveUploaded}
                            onChange={(e) => {
                              curr.task_id.modeforliveUploaded = e.target.value;
                              setLiveUploadedContent((pre) => {
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
                            placeholder="Enter remarks if any..."
                            value={curr?.task_id?.remarksforliveUploaded}
                            onChange={(e) => {
                              curr.task_id.remarksforliveUploaded =
                                e.target.value;
                              setLiveUploadedContent((pre) => {
                                const updatedData = [...pre];
                                updatedData[index] = curr;
                                return updatedData;
                              });
                            }}
                          />
                        </Td>
                        <Td className="timedate_wrap">
                          <p className="timedate emp_nme">
                            {curr?.admin_details?.name ?? "no remarks"}
                          </p>
                          <p className="timedate">
                            <img src={watch} className="icn_time" />
                            {moment(curr?.task_id?.updatedAt).format(`hh:mm A`)}
                          </p>
                          <p className="timedate">
                            <img src={calendar} className="icn_time" />
                            {moment(curr?.task_id?.updatedAt).format(
                              `DD MMM,YYYY`
                            )}
                          </p>
                          <a
                            onClick={() => {
                              history.push(
                                `/admin/content-uploaded-summary-history/${curr?._id?.task_id}/Uploaded content summary/Manage content`
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
                            onClick={() => EditUploadedContent(index)}
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
          onPageChange={handlePageChangeLiveUploaded}
          pageRangeDisplayed={5}
          pageCount={liveUploadedContentTotalPages}
          previousLabel="<"
          renderOnZeroPageCount={null}
          forcePage={liveUploadedContPage - 1}
        />
      </Card>

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
      <Share show={show} csv={csv} update={handleClose} />
    </>
  );
}
