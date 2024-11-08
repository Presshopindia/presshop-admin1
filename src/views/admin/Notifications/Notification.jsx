import {
  Box,
  Input,
  Textarea,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  TabPanel,
  TabPanels,
  Tab,
  TabList,
  Tabs,
  Tooltip,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { Flex, Text } from "@chakra-ui/react";
import Card from "components/card/Card";
import searchic from "assets/img/icons/search.svg";
import { MultiSelect } from "react-multi-select-component";
import { useHistory } from "react-router-dom";
import addchatic from "assets/img/icons/add-chat.svg";
import filtersic from "assets/img/icons/filter.svg";
import { Get } from "api/admin.services";
import { Post } from "api/admin.services";
import { toast } from "react-toastify";
import { async } from "@firebase/util";
import moresent from "assets/img/icons/hopper.png";
import moment from "moment";
import Loader from "components/Loader";
import { Patch } from "api/admin.services";
import { useMsgContext } from "contexts/PendindMsgContext";
import ReactPaginate from "react-paginate";
import profileimg from "assets/img/icons/profile.svg";


const Notification = () => {
  const history = useHistory();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedOptionsMediahouseList, setSelectedOptionsMediahouseList] =
    useState([]);
  const [mediahouseList, setMediahouseList] = useState([]);
  const [selectedOptionsHopper, setSelectedOptionsHopper] = useState([]);
  const [HopperList, setHopperList] = useState([]);
  const [notificationsTitle, setNotificationsTitle] = useState("");
  const [notificationsMessage, setNotificationsMessage] = useState("");
  const MediaHouseId = selectedOptionsMediahouseList.map((item) => item?.value);
  const HopperId = selectedOptionsHopper.map((item) => item?.value);
  const receiver_id = [...MediaHouseId, ...HopperId];
  const [notificationOther, setNotificationOther] = useState([]);
  const [notificationAdmin, setNotificationAdmin] = useState([]);
  const [notificationById, setNotificationById] = useState();
  const [loading, setLoading] = useState(false);
  const [activeNotification, setActiveNotification] = useState();
  let { setPendingNotifications } = useMsgContext();

  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(10)

  const [currentPageForSent, setCurrentPageForSent] = useState(1)
  const [totalPagesForSent, setTotalPagesForSent] = useState(10)
  const perPage = 8;

  // get list of media house
  const getMediahouseList = async () => {
    setLoading(true);
    try {
      const res = await Get("admin/getmediahousefornotification");
      setMediahouseList(res?.data?.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  // get list of media house
  const getHopperList = async () => {
    setLoading(true);
    try {
      const res = await Get("admin/gethopperfornotification");
      setHopperList(res?.data?.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  // Add notification
  const SendNotification = async () => {
    try {
      let obj = {
        receiver_id: receiver_id,
        title: notificationsTitle,
        body: notificationsMessage,
      };

      await Post("admin/sendNotification", obj);
      toast.success("Notification sent");
      onClose();
      setNotificationsMessage("");
      setNotificationsTitle("");
      setSelectedOptionsHopper([]);
      setSelectedOptionsMediahouseList([]);
      getNotificationAdmin();
    } catch (err) {
      setLoading(false);
    }
  };

  const [search, setSearch] = useState("");

  // get notification
  const getNotificationOTHERS = async (search) => {
    setLoading(true);
    const offset = (currentPage - 1) * perPage;
    try {
      await Get(
        `admin/getnotification?type=received&search=${search}&offset=${offset}&limit=${perPage}`
      ).then((res) => {
        setNotificationOther(res?.data?.data);
        setPendingNotifications(res?.data?.unreadCount);
        setTotalPages(res?.data?.totalCount / perPage)
        setLoading(false);
      });
    } catch (error) {
      setLoading(false);
    }
  };

  const getNotificationAdmin = async (search) => {
    setLoading(true);
    const offset = (currentPageForSent - 1) * perPage;
    try {
      const resp = await Get(
        `admin/getnotification?type=sent&search=${search}&offset=${offset}&limit=${perPage}`
      );

      if (resp) {
        setNotificationAdmin(resp?.data?.data);
        setTotalPagesForSent(resp?.data?.totalCount / perPage)
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  // get notification
  const getNotificationById = async (id, type) => {
    setLoading(true);

    try {
      await Get(`admin/getnotification?id=${id}&type=${type}`).then((res) => {
        if (res) {
          setNotificationById(res?.data?.data);

          setLoading(false);
        }
      });
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    const debounce = setTimeout(() => {
      getNotificationOTHERS(search);
    }, 300);

    return () => {
      clearTimeout(debounce);
    };
  }, [search, currentPage]);

  useEffect(() => {
    const debounce = setTimeout(() => {
      getNotificationAdmin(search);
    }, 300);

    return () => {
      clearTimeout(debounce);
    };
  }, [search, currentPageForSent]);


  useEffect(() => {
    getMediahouseList();
    getHopperList();
  }, []);

  useEffect(() => {
    if (notificationOther.length > 0) {
      getNotificationById(notificationOther[0]?._id, "received");
      //  setActiveNotification(notificationOther[0]?._id);
    }
  }, [notificationOther]);

  //handling seen notification , update backend
  const handleSeen = async (id, seen, i) => {
    try {
      const res = await Patch("admin/updateNotification", { id: id });
      setNotificationOther((prev) => {
        const updatedData = [...prev];
        updatedData[i].is_read = true;
        return updatedData;
      })
      getNotificationById(id, "received");
    } catch (error) {
      // console.log(error);
    }
  };

  // console.log("🚀 ~ file: Notification.jsx:172 ~ Notification ~ notificationById:", notificationById)
  const handleChangeContent = (selectedPage) => {
    setCurrentPage(selectedPage.selected + 1);
  };

  const handleChangeForSent = (selectedPage) => {
    setCurrentPageForSent(selectedPage.selected + 1);
  };

  return (
    <>
      {loading && <Loader />}
      <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
        <Flex mb="0px" gap="25px">
          <Card
            className="cms_left_card chat_wrap notificationsWrap"
            direction="column"
            w="450px"
            px="0px"
            mb="0px"
            overflowX={{ sm: "scroll", lg: "hidden" }}
          >
            <div className="chat_srch">
              <Input
                placeholder="Search"
                type="text"
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
              <img src={searchic} className="srch_ic" alt="" />
              <a onClick={onOpen}>
                <img src={addchatic} className="add_chat_ic" alt="" />
              </a>
              {/* <img src={filtersic} className="filter_chat_ic" alt="" /> */}
            </div>

            {/* Experiment Start */}
            <div className="chat_tabs_wrap">
              <Tabs variant="unstyled">
                <TabList>
                  <Tab
                    // onClick={() => getNotificationOTHERS("received")}
                    // event={"Received"}
                    _selected={{ color: "white", bg: "#000" }}
                    bg="#F3F5F4"
                  >
                    <span>Received</span>
                  </Tab>
                  <Tab
                    //  onClick={() => getNotificationAdmin("sent")}
                    // event={"Sent"}
                    _selected={{ color: "white", bg: "#000" }}
                    bg="#F3F5F4"
                  >
                    <span>Sent</span>
                  </Tab>
                </TabList>

                <TabPanels>
                  <TabPanel className="chat_panels">
                    {notificationOther &&
                      notificationOther.map((curr, index) => {
                        return (
                          <div
                            key={curr?._id}
                            className="chat_tabs_wrap notification_list lft_notfs"
                            onClick={() => {
                              setActiveNotification(curr?._id);
                              curr?.is_read !== true ? handleSeen(curr?._id, "seen", index) : getNotificationById(curr?._id, "received");;
                            }}
                          >
                            <div className="notif_list">
                              <div
                                className={`notif_item ${activeNotification === curr?._id || curr?.is_read !== true
                                  ? "active"
                                  : ""
                                  }`}
                              >
                                <div className="hding" >
                                  <div className="img-wrap">
                                    <div className="cht_img">
                                      <img
                                        src={
                                          !curr?.sender_id?.hasOwnProperty("admin_detail") ? process.env.REACT_APP_HOPPER_AVATAR + curr?.sender_id?.avatar_id?.avatar :
                                          curr?.sender_id?.admin_detail?.admin_profile
                                        }
                                        onError={(e) => {
                                          e.target.onerror = null;
                                          e.target.src = profileimg;
                                        }}
                                        alt="user"
                                      />
                                    </div>
                                    <div>
                                      <Text
                                        className="ntf_title"
                                        display="flex"
                                        alignItems="center"
                                        gap="5px"
                                      >
                                        {curr?.sender_id?.role === "Hopper"
                                          ? `${curr?.sender_id?.first_name} ${curr?.sender_id?.last_name} ( ${curr?.sender_id?.role} )`
                                          : `${curr?.sender_id?.first_name} ${curr?.sender_id?.last_name} (${curr?.sender_id?.company_name} )`}
                                      </Text>
                                      <Text
                                        className={`ntf_desc  ${curr?.is_read === false ? "unseen" : ""
                                          }`}
                                      >
                                        {curr?.title}
                                      </Text>
                                    </div>
                                  </div>
                                </div>
                                <div className="notf_time">
                                  <p
                                    className={
                                      curr?.is_read === false ? "unseen" : ""
                                    }
                                  >
                                    {moment(curr?.createdAt).format(`hh:mm A`)}
                                  </p>
                                  <p
                                    className={
                                      curr?.is_read === false ? "unseen" : ""
                                    }
                                  >
                                    {moment(curr?.createdAt).format(
                                      `DD MMMM,YYYY`
                                    )}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}

                    <div>
                      <ReactPaginate
                        className="paginated"
                        breakLabel="..."
                        nextLabel=">"
                        onPageChange={handleChangeContent}
                        pageRangeDisplayed={1}
                        pageCount={totalPages}
                        // pageCount={10}
                        previousLabel="<"
                        renderOnZeroPageCount={null}
                      />
                    </div>
                  </TabPanel>

                  <TabPanel className="chat_panels">
                    {notificationAdmin &&
                      notificationAdmin.filter((el) => el?.receiver_id?.length != 0)?.map((curr) => {
                        return (
                          <div
                            key={curr?._id}
                            className="chat_tabs_wrap notification_list lft_notfs"
                            onClick={() => {
                              getNotificationById(curr?._id, "sent");
                              setActiveNotification(curr?._id);
                            }}
                          >
                            <div className="notif_ilst">
                              <div
                                className={`notif_item ${curr
                                  ? activeNotification === curr?._id
                                    ? "active"
                                    : ""
                                  : ""
                                  }`}
                                onClick={() => setActiveNotification(curr?._id)}
                              >
                                <div className="hding">
                                  <div className="img-wrap">
                                    <div className="cht_img">
                                      <img
                                        src={
                                          curr?.receiver_id[0]?.hasOwnProperty("admin_detail") ? curr?.receiver_id[0]?.admin_detail?.admin_profile :
                                          process.env.REACT_APP_HOPPER_AVATAR + curr?.receiver_id[0]?.avatar_id?.avatar
                                        }
                                        onError={(e) => {
                                          e.target.onerror = null;
                                          e.target.src = profileimg;
                                        }}
                                        alt="user"
                                      />
                                    </div>
                                    <div>
                                      <Text
                                        className="ntf_title"
                                        display="flex"
                                        alignItems="center"
                                        gap="5px"
                                      >
                                        {curr?.receiver_id[0]?.role === "Hopper"
                                          ? `${curr?.receiver_id[0]?.first_name} ${curr?.receiver_id[0]?.last_name} ( ${curr?.receiver_id[0]?.user_name} )`
                                          : curr?.receiver_id[0]?.company_name}
                                      </Text>
                                      <Text className="ntf_desc">
                                        {curr?.title}
                                      </Text>
                                    </div>
                                  </div>

                                </div>
                                <div className="notf_time">
                                  <p>
                                    {moment(curr?.createdAt)?.format(`hh:mm A`)}
                                  </p>
                                  <p>
                                    {moment(curr?.createdAt)?.format(
                                      `DD MMMM,YYYY`
                                    )}
                                  </p>
                                </div>
                              </div>
                              <hr />
                            </div>
                          </div>
                        );
                      })}
                    <div>
                      <ReactPaginate
                        className="paginated"
                        breakLabel="..."
                        nextLabel=">"
                        onPageChange={handleChangeForSent}
                        pageRangeDisplayed={1}
                        pageCount={totalPagesForSent}
                        // pageCount={10}
                        previousLabel="<"
                        renderOnZeroPageCount={null}
                      />
                    </div>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </div>
            {/* Experiment End */}
          </Card>

          <Card
            className="chat_right notificationContent"
            w="100%"
            px="0px"
            mb="0px"
            overflowX={{ sm: "scroll", lg: "hidden" }}
          >
            <div className="chating">
              <Text
                className="notif_hdr"
                fontSize="40px"
                letterSpacing="unset"
                lineHeight="48px"
                fontFamily="AirbnbBold"
              >
                {notificationById?.title}
              </Text>
              <Text
                className="notif_desc"
                fontSize="15px"
                letterSpacing="unset"
                lineHeight="unset"
                fontFamily="Airbnb"
              >
                {notificationById?.body}
              </Text>
            </div>
          </Card>
        </Flex>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent className="notf_modal">
          <ModalHeader ps="35px" mb="20px">
            <Text fontSize="40px" fontFamily="AirbnbBold">
              New notification
            </Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Card
              className="chat_right notf_right"
              w="100%"
              px="0px"
              mb="0px"
              overflowX={{ sm: "scroll", lg: "hidden" }}
            >
              <div className="chating notification_wrap">
                <Flex className="sel_ppl_wrap" gap="20px">
                  <div className="ntf_itm_wrap">
                    <Text mb="6px" fontSize="15px" fontFamily="AirbnbMedium">
                      Select Publications
                    </Text>

                    <MultiSelect
                      options={mediahouseList?.map((option) => ({
                        value: option.id,
                        label: option.company_name,
                      }))}
                      value={selectedOptionsMediahouseList}
                      onChange={setSelectedOptionsMediahouseList}
                    />
                  </div>
                  <div className="ntf_itm_wrap">
                    <Text mb="6px" fontSize="15px" fontFamily="AirbnbMedium">
                      Select Hoppers
                    </Text>
                    <MultiSelect
                      options={HopperList?.map((option) => ({
                        value: option.id,
                        label: `${option?.first_name} ${option?.last_name}`,
                      }))}
                      value={selectedOptionsHopper}
                      onChange={setSelectedOptionsHopper}
                    />
                  </div>
                </Flex>

                <div className="ntf_itm_wrap">
                  <Text mb="6px" fontSize="15px" fontFamily="AirbnbMedium">
                    Notification Title
                  </Text>

                  <Input
                    className="msg_inp"
                    placeholder="Enter title"
                    value={notificationsTitle}
                    onChange={(e) => setNotificationsTitle(e.target.value)}
                  />
                </div>
                <div className="ntf_itm_wrap">
                  <Text mb="6px" fontSize="15px" fontFamily="AirbnbMedium">
                    Notification Description
                  </Text>

                  <Textarea
                    placeholder="Enter description"
                    value={notificationsMessage}
                    onChange={(e) => setNotificationsMessage(e.target.value)}
                  />
                </div>
                <div className="btn_wrap text_center">
                  <Button
                    mt="20px"
                    w="200px"
                    fontFamily="AirbnbBold"
                    fontSize="15px"
                    className="theme_btn"
                    onClick={SendNotification}
                  >
                    Send
                  </Button>
                </div>
              </div>
            </Card>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Notification;
