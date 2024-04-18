// Chakra imports
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
  Td,
  TableContainer,
  useColorModeValue,
  Select,
  Textarea,
  Button,
  useDisclosure,
  Checkbox,
} from "@chakra-ui/react";
import Card from "components/card/Card";
import React, { useContext, useState } from "react";
import Timer from "../Timer";
import watch from "assets/img/icons/watch.svg";
import calendar from "assets/img/icons/calendar.svg";
import { BsEye } from "react-icons/bs";
import camera from "assets/img/icons/camera.svg";
import video from "assets/img/icons/video.svg";
import shared from "assets/img/icons/shared.svg";
import share from "assets/img/icons/share.png";
import print from "assets/img/icons/print.png";
import { BsArrowUp, BsArrowDown } from "react-icons/bs";
import { BsArrowRight } from "react-icons/bs";
import interview from "assets/img/icons/interview.svg";
import { Tooltip } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import write from "assets/img/icons/write.svg";
import cont1 from "assets/img/contentimages/content1.svg";
import cont2 from "assets/img/contentimages/content2.svg";
import cont3 from "assets/img/contentimages/content3.svg";
import { Get, Patch } from "api/admin.services";
import dataContext from "../ContextFolder/Createcontext";
import { useEffect } from "react";
import Share from "components/share/Share";
import moment from "moment";
import crown from "assets/img/icons/crown.png";
import { toast } from "react-toastify";
import ReactPaginate from "react-paginate";
import Loader from "components/Loader";
import SortFilterDashboard from "../../../components/sortfilters/SortFilterDashboard";
import SortFilterTop from "components/sortfilters/SortFilterTop";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
// new imports end

export default function UserReports() {
  const textColor = useColorModeValue("#000", "black");
  const history = useHistory();
  const { profile, setProfile } = useContext(dataContext);
  const [chatPerson, setChatPerson] = useState([]);
  const [show, setShow] = useState(false);
  const [taskCount, setTaskCount] = useState({});
  const [liveTasks, setLiveTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [checkedMoreHopper, setCheckedMoreHopper] = useState([]);
  const [liveUploadedContent, setLiveUploadedContent] = useState([]);
  const [publishedData, setPublishedData] = useState([]);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const pubPage = queryParams.get('pubPage');
  const livePage = queryParams.get('livePage');
  const taskPage = queryParams.get('taskPage');
  
  // pagination publshed content
  const [currentPagePublishdContent, setCurrentPagePublishdContent] =useState(pubPage || 1);
  const [totalPublishdContentPages, setTotalPublishdContentPages] = useState(0);

  // live task
  const [currentPageLiveTask, setCurrentPageLiveTask] = useState(taskPage || 1);
  const [totalLiveTaskPages, setTotalLiveTaskPages] = useState(0);

  // live uploaded content
  const [liveUploadedContPage, setLiveUploadedContPage] = useState(livePage || 1);
  const [liveUploadedContentTotalPages, setLiveUploadedContTotalPages] = useState(0);

  const perPage = 5;

  const [path1, setpath1] = useState("");
  const [path2, setpath2] = useState("");
  const [path3, setpath3] = useState("");
  const [csv, setCsv] = useState("");
  const [chat, setChat] = useState();
  const [hideShow, setHideShow] = useState({ status: false, type: "" });
  const [parameters, setParameters] = useState("");
  const [parametersName, setParametersName] = useState("");
  const [parameters1, setParameters1] = useState("");
  const [parametersName1, setParametersName1] = useState("");

  const getProfile = async () => {
    setLoading(true);
    try {
      const response = await Get("admin/getProfile");
      if (response) {
        setLoading(false);
      }
      const profileData = response?.data?.profileData;
      setProfile(profileData);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setShow(!show);
  };

  useEffect(() => {
    getProfile();
  }, []);

  //  dashboard content
  const getReport = async (parametersName, parameters) => {
    const parametersOrder = parameters;
    setLoading(true);
    try {
      await Get(
        `admin/taskCount?${parametersName}=${parametersOrder}&${parametersOrder}=${parametersOrder}`
      ).then((res) => {
        setTaskCount(res?.data);
        setLoading(false);
      });
    } catch (err) {
      setLoading(false);
    }
  };

  // published content summary
  const getContentList = async (
    page,
    parametersName,
    parameters,
    parametersName1,
    parameters1
  ) => {
    setLoading(true);
    const offset = (page - 1) * perPage;
    try {
      const data = await Get(
        `admin/getContentList?status=published&offset=${offset}&limit=${perPage}&${parametersName}=${parameters}&${parametersName1}=${parameters1}`
      );
      setPublishedData(data.data.contentList);
      setTotalPublishdContentPages(data.data.totalCount / perPage);
      setpath1(data.data.fullPath);
      setLoading(false);
    } catch (err) {
      console.log("<---Have a erro ->", err);
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
        toast.error("Enter Heading");
      } else if (
        !publishedData[index].mode ||
        publishedData[index].mode.trim() === null
      ) {
        toast.error("Choose mode");
      } else if (
        !publishedData[index].remarks ||
        publishedData[index].remarks.trim() === ""
      ) {
        toast.error("Enter Remarks");
      } else {
        const resp = await Patch(`admin/editPublishedContent`, obj);
        if (resp) {
          // onboard[index].remarks = ""
          getContentList(currentPagePublishdContent);
          toast.success("updated sucessfuly");
        }
      }
    } catch (error) {}
  };
  // pagination
  const handlePageChangePublished = (selectedPage) => {
    setCurrentPagePublishdContent(selectedPage.selected + 1);
    history.push(`?pubPage=${selectedPage.selected + 1}`);
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
      }
    } catch (err) {
      console.log("<---Have an error ->", err);
    }
  };

  // live task
  const getLiveTask = async (
    page,
    parametersName,
    parameters,
    parametersName1,
    parameters1
  ) => {
    setLoading(true);
    const offset = (page - 1) * perPage;
    try {
      await Get(
        `admin/liveTasks?offset=${offset}&limit=${perPage}&${parametersName}=${parameters}&${parametersName1}=${parameters1}`
      ).then((res) => {
        setLiveTasks(res.data?.response);
        setTotalLiveTaskPages(res.data?.count / perPage);
        setpath3(res.data.fullPath);
        setLoading(false);
      });
    } catch (err) {
      setLoading(false);
    }
  };

  // for pagination

  const handlePageChangeLiveTask = (selectedPage) => {
    setCurrentPageLiveTask(selectedPage.selected + 1);
    history.push(`?taskPage=${selectedPage.selected + 1}`);
  };

  // download csv
  const DownloadCsvLiveTask = async (page) => {
    const offset = (page - 1) * perPage;

    try {
      const response = await Get(
        `admin/liveTasks?offset=${offset}&limit=${perPage}`
      );

      if (response) {
        const path = response?.data?.fullPath;
        window.open(path);
      }
    } catch (err) {
      console.log("<---Have an error ->", err);
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
      }
    }
  };

  // live uploaded content
  const getLiveUploadedContent = async (
    page,
    parametersName,
    parameters,
    parametersName1,
    parameters1
  ) => {
    const offset = (page - 1) * perPage;
    setLoading(true);
    try {
      await Get(
        `admin/liveUploadedContent?offset=${offset}&limit=${perPage}&${parametersName}=${parameters}&${parametersName1}=${parameters1}`
      ).then((res) => {
        setLiveUploadedContent(res?.data?.response);
        setLiveUploadedContTotalPages(res?.data?.count / perPage);
        setpath2(res?.data?.fullPath);
        setLoading(false);
      });
    } catch (error) {
      setLoading(false);
    }
  };
  // for pagination
  const handlePageChangeLiveUploaded = (selectedPage) => {
    setLiveUploadedContPage(selectedPage.selected + 1);
    history.push(`?livePage=${selectedPage.selected + 1}`);
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

    // }

    try {
      await Patch(`admin/editLiveuploadedContent`, obj);
      toast.success("updated");
      getLiveUploadedContent(liveUploadedContPage);
    } catch (err) {
      console.log(err, `<------------err for tings`);
    }
  };

  // const EditUploadedContent = async (index) => {
  //   const id = [];

  //   if (liveUploadedContent && liveUploadedContent[index]?.uploaded_content !== undefined) {
  //     liveUploadedContent[index]?.uploaded_content.forEach((item) => {
  //       id.push(item?._id);
  //     });
  //   }

  //   let obj = {
  //     mode: liveUploadedContent[index]?.task_id?.mode,
  //     latestAdminRemark: liveUploadedContent[index]?.task_id?.remarks,
  //     content_id: id,
  //     task_id: liveUploadedContent[index]?._id?.task_id
  //   };

  //   if (!liveUploadedContent[index]?.task_id?.mode || liveUploadedContent[index]?.task_id?.mode.trim() === "") {
  //     toast.error("Choose mode");
  //   } else if (liveUploadedContent[index]?.task_id?.remarks === undefined || liveUploadedContent[index]?.task_id?.remarks.trim() === "") {
  //     toast.error("Enter Remarks");
  //   } else {
  //     try {
  //       await Patch("admin/editLiveuploadedContent", obj);
  //       toast.success("updated");
  //       getLiveUploadedContent(liveUploadedContPage);
  //     } catch (err) {
  //       console.log(err, "<------------err for tings");
  //     }
  //   }
  // };

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
      }
    } catch (err) {
      console.log("<---Have an error ->", err);
    }
  };

  useEffect(() => {
    getReport();
    if(hideShow?.type === "Live published content"){
      getContentList(
        currentPagePublishdContent,
        parametersName,
        parameters,
        parametersName1,
        parameters1
      )
    }else{
      getContentList(currentPagePublishdContent );
    }
  }, [currentPagePublishdContent]);

  useEffect(()=>{
     if (hideShow?.type === "Live tasks"){
      getLiveTask(
        currentPageLiveTask,
        parametersName,
        parameters,
        parametersName1,
        parameters1
      );
     }else{
      getLiveTask(currentPageLiveTask);
     }

  },[currentPageLiveTask])

  useEffect(()=>{
    if (hideShow?.type === "Live uploaded content") {
      getLiveUploadedContent(
        liveUploadedContPage,
        parametersName,
        parameters,
        parametersName1,
        parameters1
      );
    }else{

      getLiveUploadedContent(liveUploadedContPage);
    }

  },[liveUploadedContPage])

  const handleRowSelect = (id) => {
    setCheckedMoreHopper((prev) => {
      if (prev.includes(id)) {
        return prev.filter((rowId) => rowId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  // amount
  const million = 1000000;
  const billion = 1000000000;
  const trillion = 1000000000000;

  // ongoing chat
  const onGoingChat = async (parametersName, parameters) => {
    setLoading(true);
    const parametersOrder = parameters;
    try {
      await Get(
        `admin/ongoing/chat/count?${parametersName}=${parametersOrder}&${parametersOrder}=${parametersOrder}`
      ).then((res) => {
        setChat(res?.data);
        setLoading(false);
      });
    } catch (error) {
      setLoading(false);
    }
  };

  const hopperDetails = async () => {
    try {
      await Get(`admin/roomList?room_type=HoppertoAdmin`).then((res) => {
        setChatPerson(res?.data?.data);
      });
    } catch (error) {}
  };

  useEffect(() => {
    onGoingChat();
    hopperDetails();
  }, []);

  // sorting

  const closeSort = () => {
    setHideShow((prevHideShow) => ({
      ...prevHideShow,
      status: false,
      // type: "",
    }));
  };
  const collectSortParms = (name, order) => {
    setParameters(order);
    setParametersName(name);
  };

  const collectSortParms1 = (name, order) => {
    setParameters1(order);
    setParametersName1(name);
  };

  const handleApplySorting = () => {
    if (hideShow?.type === "Live published content") {
      getContentList(
        currentPagePublishdContent,
        parametersName,
        parameters,
        parametersName1,
        parameters1
      );
      // setParameters("");
      // setParametersName("");
      // setParameters1("");
      // setParametersName1("");
      closeSort();
    } else if (hideShow?.type === "Live uploaded content") {
      getLiveUploadedContent(
        liveUploadedContPage,
        parametersName,
        parameters,
        parametersName1,
        parameters1
      );
      // setParameters("");
      // setParametersName("");
      // setParameters1("");
      // setParametersName1("");
      closeSort();
    } else if (hideShow?.type === "Live tasks") {
      getLiveTask(
        currentPageLiveTask,
        parametersName,
        parameters,
        parametersName1,
        parameters1
      );
      // setParameters("");
      // setParametersName("");
      // setParameters1("");
      // setParametersName1("");
      closeSort();
    } else if (hideShow?.type === "sortOngoingChat") {
      onGoingChat(parametersName, parameters);
      setParameters("");
      setParametersName("");
      closeSort();
    } else {
      getReport(parametersName, parameters);
      setParameters("");
      setParametersName("");
      closeSort();
    }
  };

  // comma seprator
  const formatAmountInMillion = (amount) =>
    amount?.toLocaleString("en-US", {
      maximumFractionDigits: 2,
    });

    const scrollToTasks=()=>{
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth' // Optional: adds smooth scrolling effect
    });
    }

    const clearFilters = ()=>{
       setParameters("");
      setParametersName("");
      setParameters1("");
      setParametersName1("");
    }

  return (
    <>
      <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
        {loading && <Loader />}
        <SimpleGrid
          className="dshbrd_crds"
          columns={{ base: 1, md: 2, lg: 3, xl: 4 , "2xl": 5 }}
          gap="20px"
          mb="20px"
        >
          {/* Top cards start */}
          <div className="card dash-top-cards">
            <div className="slct cardCustomHead cardHeader">
              <div className="select_wrap">
                {/* <div className="fltr_btn">
                    <Text fontSize={"15px"}>
                      <span >Sort</span>
                    </Text>
                    <SortFilterTop/>
                  </div> */}
                <div className="fltr_btn">
                  <Text fontSize={"15px"}>
                    <span
                      onClick={() =>
                        setHideShow((prevHideShow) => ({
                          ...prevHideShow,
                          status: true,
                          type: "sortlivePublish",
                        }))
                      }
                    >
                      Sort
                    </span>
                  </Text>
                  {hideShow.type === "sortlivePublish" && (
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

            <a
              onClick={() => {
                history.push("/admin/published-content-list");
              }}
            >
              <div className="cardcontent dash-c-body">
                <div className="cardCustomHead tp_txt">
                  <Text
                    lineHeight="54px"
                    variant="body2"
                    className="card-head-txt hd_txt mb-2"
                  >
                    {formatAmountInMillion(
                      taskCount?.live_published_content?.count || 0
                    )}
                  </Text>
                </div>
                <Text
                  sx={{ fontSize: 15 }}
                  className="cardcontent_head subhead"
                >
                  Live published content
                </Text>
                <Flex align="center" className="card_grth">
                  {taskCount?.live_published_content &&
                  taskCount?.live_published_content?.type === "decrease" ? (
                    <Text fontWeight="600" color="#ec4e54" me="5px">
                      <BsArrowDown />
                      {taskCount?.live_published_content?.percentage?.toFixed(
                        2
                      )}
                      %
                    </Text>
                  ) : (
                    <Text color="#10AF0C" me="5px" fontWeight="600">
                      {" "}
                      <BsArrowUp />{" "}
                      {taskCount?.live_published_content?.percentage?.toFixed(
                        2
                      )}
                      %
                    </Text>
                  )}

                  <Text color="black" fontSize="15px" fontWeight="300">
                    since last month
                  </Text>
                </Flex>
              </div>
              <div className="dash-c-foot">
                <div className="card-imgs-wrap">
                  {taskCount &&
                    taskCount.live_published_content?.task
                      ?.slice(0, 3)
                      .map((curr) => {
                        return curr?.content &&
                          curr?.content[0].media_type === "image" ? (
                          <img
                            src={curr?.content[0]?.watermark}
                            className="content_img"
                            alt="Content thumbnail"
                          />
                        ) : curr?.content[0].media_type === "video" ? (
                          <img
                            src={curr?.content[0]?.watermark}
                            className="content_img"
                            alt="Content thumbnail"
                          />
                        ) : curr?.content[0].media_type === "audio" ? (
                          <span>
                            <img
                              src={interview}
                              alt="Content thumbnail"
                              className="icn m_auto"
                            />
                          </span>
                        ) : (
                          ""
                        );
                      })}
                  <span
                    onClick={() => {
                      history.push("/admin/published-content-list");
                    }}
                  >
                    <BsArrowRight />
                  </span>
                </div>
              </div>
            </a>
          </div>

          <div className="card dash-top-cards">
            <div className="slct cardCustomHead cardHeader">
              <div className="select_wrap">
                <div className="fltr_btn">
                  <Text fontSize={"15px"}>
                    <span
                      onClick={() =>
                        setHideShow((prevHideShow) => ({
                          ...prevHideShow,
                          status: true,
                          type: "sortliveUpload",
                        }))
                      }
                    >
                      Sort
                    </span>
                  </Text>
                  {hideShow.type === "sortliveUpload" && (
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

            <a
              onClick={() => {
                history.push("/admin/uploaded-content-list");
              }}
            >
              <div className="cardcontent dash-c-body">
                <div className="cardCustomHead tp_txt">
                  <Text
                    lineHeight="54px"
                    variant="body2"
                    className="card-head-txt hd_txt mb-2"
                  >
                    {formatAmountInMillion(
                      taskCount?.live_uploaded_content?.count || 0
                    )}
                  </Text>
                </div>
                <Text
                  sx={{ fontSize: 15 }}
                  className="cardcontent_head subhead"
                >
                  Live uploaded content
                </Text>
                <Flex align="center" className="card_grth">
                  {taskCount?.live_uploaded_content &&
                  taskCount?.live_uploaded_content?.type === "decrease" ? (
                    <Text fontWeight="600" color="#ec4e54" me="5px">
                      <BsArrowDown />
                      {taskCount?.live_uploaded_content?.percentage?.toFixed(2)}
                      %
                    </Text>
                  ) : (
                    <Text color="#10AF0C" me="5px" fontWeight="600">
                      {" "}
                      <BsArrowUp />{" "}
                      {taskCount?.live_uploaded_content?.percentage?.toFixed(2)}
                      %
                    </Text>
                  )}

                  <Text color="black" fontSize="15px" fontWeight="300">
                    since last month
                  </Text>
                </Flex>
              </div>
              <div className="dash-c-foot">
                <div className="card-imgs-wrap">
                  {taskCount &&
                    taskCount?.live_uploaded_content?.task
                      ?.slice(0, 3)
                      .map((curr) => {
                        return curr?.type === "image" ? (
                          <img
                            src={
                              curr?.videothubnail ||
                              process.env.REACT_APP_UPLOADED_CONTENT +
                                curr?.imageAndVideo
                            }
                            // src={curr?.videothubnail}
                            className="content_img"
                            alt="Content thumbnail"
                          />
                        ) : curr?.type === "video" ? (
                          <img
                            src={
                              curr?.videothubnail ||
                              process.env.REACT_APP_UPLOADED_CONTENT +
                                curr?.videothubnail
                            }
                            // src={curr?.videothubnail}

                            className="content_img"
                            alt="Content thumbnail"
                          />
                        ) : curr?.type === "audio" ? (
                          <span>
                            <img
                              src={interview}
                              alt="Content thumbnail"
                              className="icn m_auto"
                            />
                          </span>
                        ) : (
                          ""
                        );
                      })}
                  <span
                    onClick={() => {
                      history.push("/admin/uploaded-content-list");
                    }}
                  >
                    <BsArrowRight />
                  </span>
                </div>
              </div>
            </a>
          </div>

          <div className="card dash-top-cards">
            <div className="slct cardCustomHead cardHeader">
              <div className="select_wrap">
                <div className="fltr_btn">
                  <Text fontSize={"15px"}>
                    <span
                      onClick={() =>
                        setHideShow((prevHideShow) => ({
                          ...prevHideShow,
                          status: true,
                          type: "sorttotalContentPaid",
                        }))
                      }
                    >
                      Sort
                    </span>
                  </Text>
                  {hideShow.type === "sorttotalContentPaid" && (
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

            <a
            onClick={() => {
              history.push("/admin/invoicing-and-payments");
            }}
            >
              <div className="cardcontent dash-c-body">
                <div className="cardCustomHead tp_txt">
                  <Text
                    lineHeight="54px"
                    variant="body2"
                    className="card-head-txt hd_txt mb-2"
                  >
                    £
                    {formatAmountInMillion(
                      taskCount?.totalcontent_paid?.task || 0
                    )}
                    {/* {
                      formatAmountInMillion(taskCount?.totalcontent_paid?.task >= trillion ? `${(taskCount?.totalcontent_paid?.task / trillion)?.toFixed()} trillion`
                        : taskCount?.totalcontent_paid?.task >= billion ? `${(taskCount?.totalcontent_paid?.task / billion)?.toFixed()} billion`
                          : taskCount?.totalcontent_paid?.task >= million ? `${(taskCount?.totalcontent_paid?.task / million)?.toFixed()} million`
                            : taskCount?.totalcontent_paid?.task?.toString())
                    } */}
                  </Text>
                </div>
                <Text
                  sx={{ fontSize: 15 }}
                  className="cardcontent_head subhead"
                >
                  Total Invoice value
                </Text>
                <Flex align="center" className="card_grth">
                  <Text fontWeight="600" color="#10AF0C" me="5px">
                    <BsArrowUp /> 5%
                  </Text>
                  <Text color="black" fontSize="15px" fontWeight="300">
                    since last month
                  </Text>
                </Flex>
              </div>
              <div className="dash-c-foot">
                <div className="card-imgs-wrap">
                  {taskCount &&
                    taskCount.live_published_content?.task
                      ?.slice(0, 3)
                      .map((curr) => {
                        return curr?.content &&
                          curr?.content[0].media_type === "image" ? (
                          <img
                            src={curr?.content[0]?.watermark}
                            className="content_img"
                            alt="Content thumbnail"
                          />
                        ) : curr?.content[0].media_type === "video" ? (
                          <img
                            // src={
                            //   process.env.REACT_APP_CONTENT +
                            //   curr?.content[0].thumbnail
                            // }
                            src={curr?.content[0]?.watermark}
                            className="content_img"
                            alt="Content thumbnail"
                          />
                        ) : curr?.content[0].media_type === "audio" ? (
                          <span>
                            <img
                              src={interview}
                              alt="Content thumbnail"
                              className="icn m_auto"
                            />
                          </span>
                        ) : (
                          ""
                        );
                      })}
                  <span>
                    <BsArrowRight />
                  </span>
                </div>
              </div>
            </a>
          </div>

          <div className="card dash-top-cards">
            <div className="slct cardCustomHead cardHeader">
              <div className="select_wrap">
                <div className="fltr_btn">
                  <Text fontSize={"15px"}>
                    <span
                      onClick={() =>
                        setHideShow((prevHideShow) => ({
                          ...prevHideShow,
                          status: true,
                          type: "sorttotalCommision",
                        }))
                      }
                    >
                      Sort
                    </span>
                  </Text>
                  {hideShow.type === "sorttotalCommision" && (
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
            <a
            onClick={() => {
              history.push("/admin/invoicing-and-payments");
            }}
            >
              <div className="cardcontent dash-c-body">
                <div className="cardCustomHead tp_txt">
                  <Text
                    lineHeight="54px"
                    variant="body2"
                    className="card-head-txt hd_txt mb-2"
                  >
                    {/* {taskCount?.total_commision?.amount >= trillion
                      ? `${(
                        taskCount?.total_commision?.amount / trillion || 0
                      )?.toFixed()} trillion`
                      : taskCount?.total_commision?.amount >= billion
                        ? `${(
                          taskCount?.total_commision?.amount / billion || 0
                        )?.toFixed()} billion`
                        : taskCount?.total_commision?.amount >= million
                          ? `${(
                            taskCount?.total_commision?.amount / million || 0
                          )?.toFixed()} million`
                          : (taskCount?.total_commision?.amount || 0)?.toFixed(1)} */}
                    £{" "}
                    {formatAmountInMillion(
                      taskCount?.total_commision?.amount || 0
                    )}
                  </Text>
                </div>
                <Text
                  sx={{ fontSize: 15 }}
                  className="cardcontent_head subhead"
                >
                  Total commission earned
                </Text>
                <Flex align="center" className="card_grth">
                  {taskCount?.total_commision &&
                  taskCount?.total_commision?.type === "decrease" ? (
                    <Text fontWeight="600" color="#ec4e54" me="5px">
                      <BsArrowDown />
                      {taskCount?.total_commision?.percentage?.toFixed(2)}%
                    </Text>
                  ) : (
                    <Text color="#10AF0C" me="5px" fontWeight="600">
                      {" "}
                      <BsArrowUp />{" "}
                      {taskCount?.total_commision?.percentage?.toFixed(2)}%
                    </Text>
                  )}
                  <Text color="black" fontSize="15px" fontWeight="300"></Text>
                  <Text color="black" fontSize="15px" fontWeight="300">
                    since last month
                  </Text>
                </Flex>
              </div>
              <div className="dash-c-foot">
                <div className="card-imgs-wrap">
                  {taskCount &&
                    taskCount.live_published_content?.task
                      ?.slice(0, 3)
                      .map((curr) => {
                        return curr?.content &&
                          curr?.content[0].media_type === "image" ? (
                          <img
                            // src={
                            //   process.env.REACT_APP_CONTENT +
                            //   curr?.content[0].media
                            // }
                            src={curr?.content[0]?.watermark}
                            className="content_img"
                            alt="Content thumbnail"
                          />
                        ) : curr?.content[0].media_type === "video" ? (
                          <img
                            // src={
                            //   process.env.REACT_APP_CONTENT +
                            //   curr?.content[0].thumbnail
                            // }
                            src={curr?.content[0]?.watermark}
                            className="content_img"
                            alt="Content thumbnail"
                          />
                        ) : curr?.content[0].media_type === "audio" ? (
                          <span>
                            <img
                              src={interview}
                              alt="Content thumbnail"
                              className="icn m_auto"
                            />
                          </span>
                        ) : (
                          ""
                        );
                      })}

                  <span>
                    <BsArrowRight />
                  </span>
                </div>
              </div>
            </a>
          </div>

          <div className="card dash-top-cards">
            <div className="slct cardCustomHead cardHeader">
              <div className="select_wrap">
                <div className="fltr_btn">
                  <Text fontSize={"15px"}>
                    <span
                      onClick={() =>
                        setHideShow((prevHideShow) => ({
                          ...prevHideShow,
                          status: true,
                          type: "sortlivetask",
                        }))
                      }
                    >
                      Sort
                    </span>
                  </Text>
                  {hideShow.type === "sortlivetask" && (
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

            <a
         
             onClick={() => {
              // history.push("/live-tasks/id/component");
              scrollToTasks()

            }}
            >
              <div className="cardcontent dash-c-body">
                <div className="cardCustomHead tp_txt">
                  <Text
                    lineHeight="54px"
                    variant="body2"
                    className="card-head-txt hd_txt mb-2"
                  >
                    {formatAmountInMillion(taskCount?.live_task?.count || 0)}
                  </Text>
                </div>
                <Text
                  sx={{ fontSize: 15 }}
                  className="cardcontent_head subhead"
                >
                   Tasks
                </Text>
                <Flex align="center" className="card_grth">
                  {taskCount?.live_task &&
                  taskCount?.live_task?.type === "decrease" ? (
                    <Text fontWeight="600" color="#ec4e54" me="5px">
                      <BsArrowDown />
                      {taskCount?.live_task?.percentage?.toFixed(2)}%
                    </Text>
                  ) : (
                    <Text color="#10AF0C" me="5px" fontWeight="600">
                      {" "}
                      <BsArrowUp />{" "}
                      {taskCount?.live_task?.percentage?.toFixed(2)}%
                    </Text>
                  )}
                  <Text color="black" fontSize="15px" fontWeight="300">
                    since last month
                  </Text>
                </Flex>
              </div>
              <div className="dash-c-foot">
                <div className="card-imgs-wrap">
                  {taskCount &&
                    taskCount?.live_uploaded_content?.task
                      ?.slice(0, 3)
                      .map((curr) => {
                        return curr?.type === "image" ? (
                          <img
                            src={
                              curr?.videothubnail ||
                              process.env.REACT_APP_UPLOADED_CONTENT +
                                curr?.imageAndVideo
                            }
                            className="content_img"
                            alt="Content thumbnail"
                          />
                        ) : curr?.type === "video" ? (
                          <img
                            src={
                              curr?.videothubnail ||
                              process.env.REACT_APP_UPLOADED_CONTENT +
                                curr?.videothubnail
                            }
                            className="content_img"
                            alt="Content thumbnail"
                          />
                        ) : curr?.type === "audio" ? (
                          <span>
                            <img
                              src={interview}
                              alt="Content thumbnail"
                              className="icn m_auto"
                            />
                          </span>
                        ) : (
                          ""
                        );
                      })}
                  <span>
                    <BsArrowRight />
                  </span>
                </div>
              </div>
            </a>
          </div>

          <div className="card dash-top-cards">
            <div className="slct cardCustomHead cardHeader">
              <div className="select_wrap">
                <div className="fltr_btn">
                  <Text fontSize={"15px"}>
                    <span
                      onClick={() =>
                        setHideShow((prevHideShow) => ({
                          ...prevHideShow,
                          status: true,
                          type: "sortOngoingChat",
                        }))
                      }
                    >
                      Sort
                    </span>
                  </Text>
                  {hideShow.type === "sortOngoingChat" && (
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

            <a
              onClick={() => {
                history.push("/admin/chat");
                localStorage.setItem("special_navigate", true);
              }}
            >
              <div className="cardcontent dash-c-body">
                <div className="cardCustomHead tp_txt">
                  <Text
                    lineHeight="54px"
                    variant="body2"
                    className="card-head-txt hd_txt mb-2"
                  >
                    {formatAmountInMillion(chat?.count ?? 0)}
                  </Text>
                </div>
                <Text
                  sx={{ fontSize: 15 }}
                  className="cardcontent_head subhead"
                >
                  Ongoing chats
                </Text>

                <Flex align="center" className="card_grth">
                  {chat && chat?.details?.type === "decrease" ? (
                    <Text fontWeight="600" color="#ec4e54" me="5px">
                      <BsArrowDown />
                      {chat?.details?.percentage?.toFixed(2)}%
                    </Text>
                  ) : (
                    <Text color="#10AF0C" me="5px" fontWeight="600">
                      {" "}
                      <BsArrowUp /> {chat?.details?.percentage?.toFixed(2)}%
                    </Text>
                  )}

                  <Text color="black" fontSize="15px" fontWeight="300">
                    since last month
                  </Text>
                </Flex>
              </div>

              <div className="dash-c-foot">
                <div className="card-imgs-wrap">
                  {chatPerson &&
                    chatPerson?.slice(-3).map((curr) => {
                      return (
                        <img
                          src={
                            process.env.REACT_APP_HOPPER_AVATAR +
                            curr?.sender_id?.avatar_details?.avatar
                          }
                          className="content_img"
                          alt="Content thumbnail"
                        />
                      );
                    })}
                  <span onClick={() => history.push("/admin/chat")}>
                    <BsArrowRight />
                  </span>
                </div>
              </div>
            </a>
          </div>

          <div className="card dash-top-cards">
            <div className="slct cardCustomHead cardHeader">
              <div className="select_wrap">
                <div className="fltr_btn">
                  <Text fontSize={"15px"}>
                    <span
                      onClick={() =>
                        setHideShow((prevHideShow) => ({
                          ...prevHideShow,
                          status: true,
                          type: "sorttotalPublication",
                        }))
                      }
                    >
                      Sort
                    </span>
                  </Text>
                  {hideShow.type === "sorttotalPublication" && (
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

            <a
              onClick={() => {
                history.push(`/admin/publications-management`);
                localStorage.setItem("special_navigate", true);
              }}
            >
              <div className="cardcontent dash-c-body">
                <div className="cardCustomHead tp_txt">
                  <Text
                    lineHeight="54px"
                    variant="body2"
                    className="card-head-txt hd_txt mb-2"
                  >
                    {formatAmountInMillion(
                      taskCount?.total_publication?.count || 0
                    )}
                  </Text>
                </div>
                <Text
                  sx={{ fontSize: 15 }}
                  className="cardcontent_head subhead"
                >
                  Total publications
                </Text>
                <Flex align="center" className="card_grth">
                  {taskCount?.total_publication &&
                  taskCount?.total_publication?.type === "decrease" ? (
                    <Text fontWeight="600" color="#ec4e54" me="5px">
                      <BsArrowDown />
                      {taskCount?.total_publication?.percentage?.toFixed(2)}%
                    </Text>
                  ) : (
                    <Text color="#10AF0C" me="5px" fontWeight="600">
                      {" "}
                      <BsArrowUp />{" "}
                      {taskCount?.total_publication?.percentage?.toFixed(2)}%
                    </Text>
                  )}
                  <Text color="black" fontSize="15px" fontWeight="300">
                    since last month
                  </Text>
                </Flex>
              </div>
              <div className="dash-c-foot">
                <div className="card-imgs-wrap">
                  {taskCount?.total_publication?.task &&
                    taskCount?.total_publication?.task.slice(-3).map((curr) => {
                      return (
                        <img
                          src={curr?.profile_image}
                          className="content_img"
                          alt="Content thumbnail"
                        />
                      );
                    })}
                  <span
                    onClick={() =>
                      history.push(`/admin/publications-management`)
                    }
                  >
                    <BsArrowRight />
                  </span>
                </div>
              </div>
            </a>
          </div>

          <div className="card dash-top-cards">
            <div className="slct cardCustomHead cardHeader">
              <div className="select_wrap">
                <div className="fltr_btn">
                  <Text fontSize={"15px"}>
                    <span
                      onClick={() =>
                        setHideShow((prevHideShow) => ({
                          ...prevHideShow,
                          status: true,
                          type: "sorttotalHopper",
                        }))
                      }
                    >
                      Sort
                    </span>
                  </Text>
                  {hideShow.type === "sorttotalHopper" && (
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

            <a
              onClick={() => {
                history.push(`/admin/hoppers`);
                localStorage.setItem("special_navigate", true);
              }}
            >
              <div className="cardcontent dash-c-body">
                <div className="cardCustomHead tp_txt">
                  <Text
                    lineHeight="54px"
                    variant="body2"
                    className="card-head-txt hd_txt mb-2"
                  >
                    {formatAmountInMillion(taskCount?.total_hopper?.count || 0)}
                  </Text>
                </div>
                <Text
                  sx={{ fontSize: 15 }}
                  className="cardcontent_head subhead"
                >
                  Total hoppers
                </Text>
                <Flex align="center" className="card_grth">
                  {taskCount?.total_hopper &&
                  taskCount?.total_hopper?.type === "decrease" ? (
                    <Text fontWeight="600" color="#ec4e54" me="5px">
                      <BsArrowDown />
                      {taskCount?.total_hopper?.percentage?.toFixed(2)}%
                    </Text>
                  ) : (
                    <Text color="#10AF0C" me="5px" fontWeight="600">
                      {" "}
                      <BsArrowUp />{" "}
                      {taskCount?.total_hopper?.percentage?.toFixed(2)}%
                    </Text>
                  )}

                  <Text color="black" fontSize="15px" fontWeight="300">
                    since last month
                  </Text>
                </Flex>
              </div>
              <div className="dash-c-foot">
                <div className="card-imgs-wrap">
                  {taskCount?.total_hopper?.task &&
                    taskCount?.total_hopper?.task
                      ?.slice(1, 4)
                      .map((curr) => {
                        return (
                          <img
                            src={
                              // process.env.REACT_APP_HOPPER_AVATAR +
                              // curr?.admin_detail?.admin_profile
                              curr?.hasOwnProperty("avatar_id")
                                ? process.env.REACT_APP_HOPPER_AVATAR +
                                  curr?.avatar_id?.avatar
                                : curr?.admin_detail?.admin_profile
                            }
                            alt="Content thumbnail"
                          />
                        );
                      })}
                  <span onClick={() => history.push(`/admin/hoppers`)}>
                    <BsArrowRight />
                  </span>
                </div>
              </div>
            </a>
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
                Live published content
              </Text>
              <div className="opt_icons_wrap">
                <a
                  onClick={() => {
                    history.push("/admin/published-content-list");
                  }}
                  className="back_link timedate"
                >
                  <BsEye className="icn_time" />
                  View all published content
                </a>
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
                <span onClick={() => DownloadCsv(currentPagePublishdContent)}>
                <Tooltip label={"Print"}>
                  <img src={print} className="opt_icons" />
                </Tooltip>
                </span>

                <div className="fltr_btn">
                  <Text fontSize={"15px"}>
                    <span
                      onClick={() => {
                        if(hideShow.type !== "Live published content"){
                          clearFilters()
                        }
                        setHideShow((prevHideShow) => ({
                          ...prevHideShow,
                          status: true,
                          type: "Live published content",
                        }))
                      }
                        
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
                    <Th>Sale status</Th>
                    <Th>Amount received</Th>
                    <Th>Presshop commission</Th>
                    <Th>Amount paid</Th>
                    <Th>Amount payable</Th>
                    <Th className="rcvd_comn_th">Received From</Th>
                    {/* <Th>Payment pending</Th>
                    <Th>Presshop commission</Th>
                  <Th>Payment details</Th> */}
                    <Th>Published by</Th>
                    <Th>Mode</Th>
                    <Th>Remarks</Th>
                    <Th>Employee details</Th>
                    <Th>CTA</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {publishedData &&
                    publishedData?.map((curr, index) => {
                      const audio = curr?.content?.filter(
                        (curr) => curr?.media_type === "audio"
                      );
                      const image = curr?.content?.filter(
                        (curr) => curr?.media_type === "image"
                      );
                      const video1 = curr?.content?.filter(
                        (curr) => curr?.media_type === "video"
                      );
                      return (
                        <Tr key={curr._id}>
                          <Td>
                            {curr &&
                            curr?.content &&
                            curr?.content?.length > 0 ? (
                              <a
                                onClick={() => {
                                  history.push(
                                    `/admin/live-published-content/${curr?._id}/Dashboard`
                                  );
                                }}
                              >
                                {
                                  curr?.content?.length === 1 ? (
                                  curr?.content[0]?.media_type === "image" ? (
                                    <img
                                      // src={
                                      //   process.env.REACT_APP_CONTENT +
                                      //   curr.content[0]?.media
                                      // }
                                      src={curr.content[0]?.watermark}
                                      className="content_img"
                                      alt="Content thumbnail"
                                    />
                                  ) : curr.content[0].media_type === "audio" ? (
                                    <img
                                      src={interview}
                                      alt="Content thumbnail"
                                      className="icn m_auto"
                                    />
                                  ) : curr.content[0].media_type === "video" ? (
                                    <img
                                      // src={
                                      //   process.env.REACT_APP_CONTENT +
                                      //   curr.content[0]?.thumbnail
                                      // }
                                      src={curr.content[0]?.watermark}
                                      className="content_img"
                                      alt="Content thumbnail"
                                    />
                                  ) : null
                                ) : (
                                  curr.content.length > 1 && (
                                    <div className="content_imgs_wrap contnt_lngth_wrp">
                                      <div className="content_imgs">
                                        {curr.content.map((value , index) => (
                                         index < 3 &&
                                          <>
                                            {value.media_type === "image" ? (
                                              <img
                                                key={value._id}
                                                // src={
                                                //   process.env
                                                //     .REACT_APP_CONTENT +
                                                //   value.media ?? ""
                                                // }
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
                                                key={value._id}
                                                // src={
                                                //   process.env
                                                //     .REACT_APP_CONTENT +
                                                //   value.thumbnail ?? ""
                                                // }
                                                src={value?.watermark}
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
                            ) : null
                            }
                          </Td>
                          <Td className="timedate_wrap">
                            <p className="timedate">
                              <img src={watch} className="icn_time" />
                              {moment(curr?.published_time_date).format("hh:mm A")}
                            </p>
                            <p className="timedate">
                              <img src={calendar} className="icn_time" />
                              {moment(curr?.published_time_date).format("DD MMMM YYYY")}
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
                          </Td>{" "}
                          <Td>
                            {curr?.audio_description && (
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

                            {/* <audio /> */}
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
                                <Tooltip label={"Camera"}>
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
                            <Tooltip label={curr?.categoryData?.name}>
                              <img
                                src={curr?.categoryData?.icon}
                                alt={curr?.categoryData?.name}
                                className="icn m_auto"
                              />
                            </Tooltip>
                          </Td>
                          <Td className="text_center">
                            <p>
                              {" "}
                              {audio && audio?.length > 0 && audio?.length}
                            </p>
                            <p>
                              {" "}
                              {video1 && video1?.length > 0 && video1?.length}
                            </p>
                            <p>
                              {" "}
                              {image && image?.length > 0 && image?.length}
                            </p>
                          </Td>
                          <Td>
                            &pound; {formatAmountInMillion(curr.ask_price || 0)}
                          </Td>
                          <Td>
                            &pound;{" "}
                            {formatAmountInMillion(curr?.amount_paid || 0)}
                          </Td>
                          <Td className="sale-status gr">
                            {curr?.sale_status === "sold" ? (
                              <span className="txt_success_mdm">Sold</span>
                            ) : (
                              <span className="txt_danger_mdm">Unsold</span>
                            )}
                          </Td>
                          <Td>
                            &pound;{" "}
                            {formatAmountInMillion(curr?.amount_paid || 0)}
                            <p>
                              {" "}
                              <a
                                className="back_link timedate"
                                onClick={() => {
                                  if (curr?.transaction_id) {
                                    history.push(
                                      `/admin/Payment-Transaction/${curr?.transaction_id}/Payment transaction `
                                    );
                                    // history.push("/admin/invoicing-and-payments");
                                  } else {
                                    toast.error(
                                      "Payment is not completed yet."
                                    );
                                  }
                                }}
                              >
                                <BsEye className="icn_time" />
                                View
                              </a>
                            </p>
                          </Td>
                          <Td>
                            &pound;{" "}
                            {formatAmountInMillion(
                              curr?.commition_to_payable || 0
                            )}
                          </Td>
                          <Td>
                            &pound; {curr?.amount_paid_to_hopper ?? "0"}
                            <p>
                              {" "}
                              <a
                                className="back_link timedate"
                                onClick={() => {
                                  if (curr?.transaction_id) {
                                    history.push(
                                      `/admin/Payment-Transaction/${curr?.transaction_id}/Payment transaction `
                                    );
                                    // history.push("/admin/invoicing-and-payments");
                                  } else {
                                    toast.error(
                                      "Payment is not completed yet."
                                    );
                                  }
                                }}
                              >
                                <BsEye className="icn_time" />
                                View
                              </a>
                            </p>
                          </Td>
                          <Td>
                            &pound;{" "}
                            {formatAmountInMillion(
                              curr?.amount_paid_to_hopper &&
                                curr?.amount_paid_to_hopper
                                ? "0"
                                : curr?.amount_payable_to_hopper
                            )}
                          </Td>
                          <Td className="rcvd_comn_td">
                            <p>
                              {curr?.purchased_publication?.company_bank_details
                                ?.bank_name ?? ""}
                            </p>
                            <p>{`Sort Code ${
                              curr?.purchased_publication?.company_bank_details
                                ?.sort_code ?? ""
                            }`}</p>
                            <p>{`Account ${
                              curr?.purchased_publication?.company_bank_details
                                ?.account_number ?? ""
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
                              onClick={() =>
                                history.push(
                                  `/admin/content-published-history/${curr._id}/Live published content History/Dashboard`
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
                Live uploaded content
              </Text>
              <div className="opt_icons_wrap">
                <a
                  onClick={() => {
                    history.push("/admin/uploaded-content-list");
                  }}
                  className="back_link timedate"
                >
                  <BsEye className="icn_time" />
                  View all uploaded content
                </a>
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

                <span
                  onClick={() => DownloadCsvLiveUploaded(liveUploadedContPage)}
                >
                  <Tooltip label={"Print"}>
                    <img src={print} className="opt_icons" />
                  </Tooltip>
                </span>

                <div className="fltr_btn">
                  <Text fontSize={"15px"}>
                    <span
                      onClick={() =>{
                        if(hideShow.type !== "Live uploaded content"){
                          clearFilters()
                        }
                        setHideShow((prevHideShow) => ({
                          ...prevHideShow,
                          status: true,
                          type: "Live uploaded content",
                        }))
                      }
                      }
                    >
                      Sort
                    </span>
                  </Text>

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
                    <Th>Uploaded by</Th>

                    {/* <Th>Payment pending</Th>
                    <Th>Presshop commission</Th>
                    <Th>Payment details</Th> */}

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
                            {curr &&
                            curr.uploaded_content &&
                            curr.uploaded_content.length > 0 ? (
                              <a
                                onClick={() => {
                                  history.push(
                                    `/admin/live-uploaded-content/${curr?._id?.hopper_id}/${curr?._id?.task_id}/Live uploaded content`
                                  );
                                }}
                              >
                                {curr.uploaded_content.length === 1 ? (
                                  <img
                                    src={
                                      curr?.videothubnail ||
                                      process.env.REACT_APP_UPLOADED_CONTENT +
                                        curr.uploaded_content[0]?.imageAndVideo
                                    }
                                  />
                                ) : (
                                  <div className="content_imgs_wrap contnt_lngth_wrp">
                                    <div className="content_imgs">
                                      {curr.uploaded_content
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
                                              src={
                                                value?.videothubnail ||
                                                process.env
                                                  .REACT_APP_UPLOADED_CONTENT +
                                                  value.thumbnail
                                              }
                                              alt="Content thumbnail"
                                              className="icn m_auto"
                                            />
                                          ) : null
                                        )}
                                      <span className="arrow_span">
                                        <BsArrowRight />
                                      </span>
                                    </div>
                                  </div>
                                )}
                              </a>
                            ) : (
                              <Td>No content</Td>
                            )}
                          </Td>

                          <Td className="timedate_wrap">
                            <p className="timedate">
                              <img src={watch} className="icn_time" />
                              {moment(curr?.task_time).format(
                                `hh:mm:A`
                              )}
                            </p>
                            <p className="timedate">
                              <img src={calendar} className="icn_time" />
                              {moment(curr?.task_time).format(
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
                                <Tooltip label={"Camera"}>
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
                          {/* <Td className="text_center">
                          <Tooltip label={curr?.category_details[0]?.name}>
                            {curr?.category_details.length <= 0 ? "No Category Defined" : <img src={curr?.category_details[0]?.icon} className="icn m_auto" />}
                          </Tooltip>
                        </Td> */}
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
                          <Td className="text_center">
                            <div className="dir_col text_center">
                              <p className="text_center">{curr?.imagecount}</p>
                              <p className="text_center">
                                {curr?.interviewcount}
                              </p>
                              <p className="text_center">{curr?.videocount}</p>
                            </div>
                          </Td>
                          <Td className="text_center">
                            <div className="dir_col">
                              <p>£ {curr?.total_image_price ?? "0"}</p>
                              <p>£ {curr?.total_interview_price ?? "0"}</p>
                              <p>£ {curr?.total_video_price ?? "0"}</p>
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

                          <Td className="item_detail">
                            <img
                              src={
                                process.env.REACT_APP_HOPPER_AVATAR +
                                curr?.avatar_details?.avatar
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
                                curr.task_id.modeforliveUploaded =
                                  e.target.value;
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
                              {moment(curr?.task_id?.updatedAt).format(
                                `hh:mm A`
                              )}
                            </p>
                            <p className="timedate">
                              <img src={calendar} className="icn_time" />
                              {moment(curr?.task_id?.updatedAt).format(
                                `DD MMMM,YYYY`
                              )}
                            </p>
                            <a
                              onClick={() => {
                                history.push(
                                  `/admin/content-uploaded-summary-history/${curr?._id?.task_id}/Live uploaded content/Dashboard`
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
                 Tasks
              </Text>
              <div className="opt_icons_wrap">

              {/* <Tooltip label={"Share"}>
               (
                  ) : ( "" )
              </Tooltip> */}

                  <a onClick={() => { setShow(true); setCsv(path3);}}
                    className="txt_danger_mdm">
                      <Tooltip label={"Share"}>
                        <img src={share} className="opt_icons" alt="Content thumbnail" />
                      </Tooltip>
                  </a>
              
                
                    <span onClick={() => DownloadCsvLiveTask(currentPageLiveTask)}>
                    <Tooltip label={"Print"}>
                      <img src={print} className="opt_icons" />
                    </Tooltip>
                    </span>

                {/* <Tooltip label={"Print"}>
                  (
                  ) : ( "" )
                </Tooltip> */}

                <div className="fltr_btn">
                  <Text fontSize={"15px"}>
                    <span
                      onClick={() =>{
                        if(hideShow.type !== "Live tasks"){
                          clearFilters()
                        }
                        setHideShow((prevHideShow) => ({
                          ...prevHideShow,
                          status: true,
                          type: "Live tasks",
                        }))
                      }
                      
                      }
                    >
                      Sort
                    </span>
                  </Text>

                  {hideShow.type === "Live tasks" && (
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
                {/* <Menu /> */}
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
                    <Th>Accepted by</Th>
                    {/* <Th>Time & date</Th> */}
                    <Th>Deadline & time left</Th>
                    <Th>Assign more Hoppers</Th>
                    {/* <Th>Payment details</Th> */}
                    <Th>Amount received</Th>
                    <Th>Presshop commission</Th>
                    <Th>Amount paid</Th>
                    <Th>Amount payable</Th>
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
                          <Td className="content_wrap new_content_wrap">
                            <a
                              onClick={() => {
                                history.push(
                                  `/admin/live-tasks/${curr?._id}/Tasks`
                                );
                              }}
                            >
                              {curr?.uploaded_content &&
                              curr?.uploaded_content.length <= 0 ? (
                                "No Content"
                              ) : curr?.uploaded_content.length <= 1 ? (
                                <img
                                  src={
                                    curr?.uploaded_content[0]?.videothubnail ||
                                    process.env.REACT_APP_UPLOADED_CONTENT +
                                      curr?.uploaded_content[0]?.imageAndVideo
                                  }
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
                                              key={value?._id}
                                              src={interview}
                                              alt="Content thumbnail"
                                              className="icn m_auto"
                                            />
                                          ) : value.type === "video" ? (
                                            <img
                                              key={value?._id}
                                              src={
                                                value?.videothubnail ||
                                                process.env
                                                  .REACT_APP_UPLOADED_CONTENT +
                                                  value.thubnail
                                              }
                                              alt="Content thumbnail"
                                              className="icn m_auto"
                                            />
                                          ) : null;
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
                              {moment(curr?.createdAt).format(`hh:mm:A`)}
                            </p>
                            <p className="timedate">
                              <img src={calendar} className="icn_time" />
                              {moment(curr?.createdAt).format(`DD MMMM YYYY`)}
                            </p>
                          </Td>
                          <Td className="address_wrap">{curr?.location}</Td>

                          <Td className="item_detail">
                            <img
                              src={curr?.mediahouse_id?.profile_image}
                              alt="Content thumbnail"
                            />
                            <Text className="nameimg naming_comn">
                              <span className="txt_mdm">
                                {curr?.mediahouse_id?.company_name}
                              </span>
                            </Text>
                          </Td>
                          <Td className="description_td">
                            <Text className="desc_ht">
                              {curr?.task_description}
                            </Text>
                          </Td>
                          <Td className="text_center">
                            <div className="dir_col text_center">
                              <Tooltip label={"Camera"}>
                                {curr?.need_photos &&
                                curr?.need_photos === true ? (
                                  <img
                                    src={camera}
                                    alt="Content thumbnail"
                                    className="icn m_auto"
                                  />
                                ) : (
                                  ""
                                )}
                              </Tooltip>

                              <Tooltip label={"Interview"}>
                                {curr?.need_interview &&
                                curr?.need_interview === true ? (
                                  <img
                                    src={interview}
                                    alt="Content thumbnail"
                                    className="icn m_auto"
                                  />
                                ) : (
                                  ""
                                )}
                              </Tooltip>

                              <Tooltip label={"Video"}>
                                {curr?.need_videos &&
                                curr?.need_videos === true ? (
                                  <img
                                    src={video}
                                    alt="Content thumbnail"
                                    className="icn m_auto"
                                  />
                                ) : (
                                  ""
                                )}
                              </Tooltip>
                            </div>
                          </Td>
                          <Td className="text_center">
                            <Tooltip label={curr?.category_details?.name}>
                              <img
                                src={curr?.category_details?.icon}
                                className="icn m_auto"
                              />
                            </Tooltip>
                          </Td>
                          <Td className="text_center">
                            <div className="dir_col text_center">
                              <p className="text_center">
                                {curr?.image_count ?? "0"}
                              </p>
                              <p className="text_center">
                                {curr?.interview_count ?? "0"}
                              </p>
                              <p className="text_center">
                                {curr?.video_count ?? "0"}
                              </p>
                            </div>
                          </Td>
                          <Td className="text_center">
                            <div className="dir_col">
                              {/* <p>£ {curr?.total_image_price && curr?.total_image_price === null ? "0" : curr?.total_image_price}</p>
                              <p>£ {curr?.total_interview_price && curr?.total_interview_price === null ? "0" : curr?.total_interview_price}</p>
                              <p>£ {curr?.total_video_price && curr?.total_video_price === null ? "0" : curr?.total_video_pric}</p> */}

                              <p>
                                £
                                {formatAmountInMillion(
                                  curr?.total_image_price ?? "0"
                                )}
                              </p>
                              <p>
                                £
                                {formatAmountInMillion(
                                  curr?.total_interview_price ?? "0"
                                )}
                              </p>
                              <p>
                                £
                                {formatAmountInMillion(
                                  curr?.total_video_price ?? "0"
                                )}
                              </p>
                            </div>
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
                                            src={
                                              process.env
                                                .REACT_APP_HOPPER_AVATAR +
                                              matchingAvatar[0]?.avatar
                                            }
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
                          {/* <Td className="timedate_wrap">
                            <p className="timedate"><img src={watch} className="icn_time" />10:25 AM</p>
                            <p className="timedate"><img src={calendar} className="icn_time" />24 Feb, 2023</p>
                          </Td> */}
                          <Td className="timedate_wrap">
                            <p className="timedate">
                              <img src={watch} className="icn_time" />
                              {moment(curr?.deadline_date).format(`hh:mm:A`)}
                            </p>
                            <p className="timedate">
                              <img src={calendar} className="icn_time" />
                              {moment(curr?.deadline_date).format(
                                `DD MMMM YYYY`
                              )}
                            </p>
                            <p className="timedate time_left danger deadln_time">
                              <img src={watch} className="icn_time" />
                              <Timer deadline={curr?.deadline_date} />
                            </p>
                          </Td>

                          <Td className="asign_wrap">
                            <div className="slct">
                              {curr?.assignmorehopperList &&
                                curr?.assignmorehopperList.map((item) => {
                                  const isActive = checkedMoreHopper.includes(
                                    item._id
                                  );
                                  return (
                                    <div
                                      className={`sl_itm pos_rel ${
                                        isActive ? "active" : ""
                                      }`}
                                      key={item._id}
                                    >
                                      <input
                                        type="checkbox"
                                        id={item._id} // Use the same value for id and htmlFor
                                        className="tsk_asign_check"
                                        onChange={() =>
                                          handleRowSelect(item._id)
                                        }
                                      />
                                      <label
                                        htmlFor={item._id} // Use the same value as the associated input's id
                                        className="asign_hpr_lbl"
                                      >
                                        <p>{`${item?.first_name} ${item?.last_name}`}</p>
                                        <span className="sml_txt">
                                          {`${(
                                            item.distance * 0.00062137119
                                          ).toFixed(2)}m away`}
                                        </span>
                                      </label>
                                    </div>
                                  );
                                })}
                            </div>
                          </Td>

                          <Td className="timedate_wrap">
                            &pound;{curr?.total_amount_recieved ?? "0"}
                            <p>
                              {" "}
                              <a className="back_link timedate">
                                <BsEye className="icn_time" />
                                View
                              </a>
                            </p>
                          </Td>
                          <Td className="timedate_wrap">
                            &pound;{curr?.total_presshop_commission ?? "0"}
                          </Td>
                          <Td className="timedate_wrap">
                            &pound;{curr?.total_amount_paid ?? "0"}
                            <p>
                              {" "}
                              <a className="back_link timedate">
                                <BsEye className="icn_time" />
                                View
                              </a>
                            </p>
                          </Td>
                          <Td className="timedate_wrap">
                            &pound;{curr?.total_amount_payable ?? "0"}
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
                                  `/admin/hopper-task-contol-history/${curr?._id}/Live task history/Dashboard`
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
            forcePage={currentPageLiveTask - 1}
          />
        </Card>
      </Box>

      <Share show={show} csv={csv} update={handleClose} />
    </>
  );
}
