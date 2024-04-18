// Chakra imports
import {
  Box,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Input,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  useDisclosure,
  Select,
  Textarea,
  ModalHeader,
  ModalCloseButton,
  ModalFooter,
  Flex,
  Text,
  useColorModeValue,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  ButtonGroup,
} from "@chakra-ui/react";
import { React, useMemo } from "react";
import Card from "components/card/Card";
import search from "assets/img/icons/search.svg";
import addchatic from "assets/img/icons/add-chat.svg";
import filtersic from "assets/img/icons/filters.svg";
import profileimg from "assets/img/icons/profile.svg";
import clicn from "assets/img/icons/cl.svg";
import plusicn from "assets/img/icons/plus.svg";
import vdicn from "assets/img/icons/vd.svg";
import mcicn from "assets/img/icons/mc.svg";
import arwhiteicn from "assets/img/icons/arrow-white.svg";
import dltIcn from "assets/img/dlt-icon.svg";
import { auth, db } from "config/firebase";
import ReactPaginate from "react-paginate";

import {
  addDoc,
  getFirestore,
  collection,
  deleteDoc,
  doc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
// import { getFirestore } from 'firebase/firestore';
import LazyLoad from "react-lazyload";
// import { getDatabase,  set, onValue } from 'firebase/database';
import { ref, uploadBytes, getDownloadURL, getStorage } from "firebase/storage";
import { storage } from "config/firebase";
import {
  query,
  orderBy,
  onSnapshot,
  limit,
  where,
  getDocs,
  writeBatch,
  getDoc,
} from "firebase/firestore";
import moment, { duration } from "moment";
import { Get } from "api/admin.services";
import { BsArrowLeft, BsPause, BsPlay, BsStop } from "react-icons/bs";
import { useParams } from "react-router-dom";
import csvic from "assets/img/icons/csv.svg";
import vuImg from "assets/img/view-img.jpg";
import upldedimg from "assets/img/contentimages/content1.svg";
import { ReactMic } from "react-mic";
import { Tooltip } from "@chakra-ui/react";
import "./Chat.css";
import dataContext from "../ContextFolder/Createcontext";

// importing sidebar context to send pending msg data to sidebar
import { useMsgContext } from "contexts/PendindMsgContext";
import { CheckIcon } from "@chakra-ui/icons";
import { Post } from "api/admin.services";
import { IoCheckmark, IoCheckmarkDone } from "react-icons/io5";

export default function Chat() {
  let { pendingChats, setPendingChats, setUpdateChatNotification } = useMsgContext();

  const [bigImage, setBigImage] = useState();
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(null);
  const { onOpen, onClose } = useDisclosure();
  const [file, setFile] = useState("");
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState([]);
  const [profile, setprofile] = useState();
  const [publicationChats, setPublicationChats] = useState([]);
  // console.log("🚀 ~ file: Chat.jsx:75 ~ Chat ~ publicationChats:", publicationChats);

  const [roomList, setRoomList] = useState([]);
  const [roomDetails, setRoomDetails] = useState({});
  console.log("🚀 ~ Chat ~ roomDetails:", roomDetails)
  const [previewUrl, setPreviewUrl] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [type, setType] = useState("text");
  const [hide, setHide] = useState(false);
  const [activeRoomId, setActiveRoomId] = useState(null);
  const [activeRoomId1, setActiveRoomId1] = useState(null);
  const [fireStoreChats, setFireChats] = useState([]);
  const initialFocusRef = useRef();
  const csvUrl = localStorage.getItem("csvUrl");
  const messagesEndRef = useRef(null);
  const chatBoxRef = useRef(null);

  const [isUserOnline, setIsUserOnline] = useState(false);
  const [userStatusObj, setUserStatusObj] = useState({});

  const [hoopersChatList, setHoopersChatList] = useState([]);
  console.log("🚀 ~ Chat ~ hoopersChatList:", hoopersChatList)
  const [search, setSearch] = useState("");
  const [totalPagesForPub, setTotalPagesForPub] = useState(10);
  const [totalPagesForHopper, setTotalPagesForHopper] = useState(10);
  const [currentPagePub, setCurrentPagePub] = useState(1);
  const [currentPageHopper, setCurrentPageHopper] = useState(1);
  const [roomInfo, setRoomInfo] = useState(null);
  const [hopperDetails, setHopperDetails] = useState(null);

  const {
    isOpen: isOpen1,
    onOpen: onOpen1,
    onClose: onClose1,
  } = useDisclosure();
  const {
    isOpen: isOpenAdo,
    onOpen: onOpenAdo,
    onClose: onClose2,
  } = useDisclosure();

  const statusCollectionName = "OnlineOffline";

  // get profile
  const GetProfile = async () => {
    try {
      await Get(`admin/getProfile`).then((res) => {
        setprofile(res?.data?.profileData);

      });
    } catch (error) {
      console.log(error);
    }
  };

  const HopperControls = async () => {
    try {
      await Get(`admin/getHopperList`).then((res) => {
        const data = res?.data?.response?.hopperList?.map((el) => {
          return {
            first_name: el.first_name,
            last_name: el.last_name,
            full_name: el.first_name+el.last_name,
            user_name: el.user_name,
          }
        })
        setHopperDetails(data);
      })
    } catch (error) {
      console.log(error)
    }
  }

  const GetRoomIds = async () => {
    try {
      await Get(`admin/roomList?room_type=MediahousetoAdmin`).then((res) => {
        // setPublicationChats(res?.data?.data);
      });
    } catch (error) {}
  };

  const getChatsListing = (pubPage = 1, HopperPage = 1, limit = 6) => {
    const chatRef = collection(getFirestore(), "Chat");
    const q = query(chatRef, orderBy("date", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newChats = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const filteredChat = newChats.filter(
        (chat) =>
          (chat?.receiverId === profile?._id ||
            chat?.senderId === profile?._id) &&
          chat?.chat_with !== "presshop and admin"
      );
      setHoopersChatList(() => {
        const data = search
          ? filteredChat.filter((chat) =>
              chat.senderName.toLowerCase().includes(search.toLowerCase())
            )
          : filteredChat;
        setTotalPagesForHopper(data?.length ? data.length / limit : 0);
        const startIndex = (HopperPage - 1) * limit;
        return data.slice(startIndex, startIndex + limit);
      });

      const filteredPublicationsChat = newChats.filter(
        (chat) =>
          (chat?.receiverId === profile?._id ||
            chat?.senderId === profile?._id) &&
          chat?.chat_with === "presshop and admin" &&
          chat.senderName.toLowerCase().includes(search.toLowerCase()) // Filter based on message content
      );
      setPublicationChats(() => {
        const data = search
          ? filteredPublicationsChat.filter((chat) =>
              chat.senderName.toLowerCase().includes(search.toLowerCase())
            )
          : filteredPublicationsChat;
        setTotalPagesForPub(data?.length ? data.length / limit : 0);
        const startIndex = (pubPage - 1) * limit;
        return data.slice(startIndex, startIndex + limit);
      });

      // let firstIndex = search
      //     ? filteredPublicationsChat.filter((chat) =>
      //         chat.senderName.toLowerCase().includes(search.toLowerCase())
      //       )
      //     : filteredPublicationsChat;
      //   setTotalPagesForPub(firstIndex?.length ? firstIndex.length / limit : 0);
      //   const startIndex = (pubPage - 1) * limit;
      //   firstIndex = firstIndex.slice(startIndex, startIndex + limit);
      // setRoomInfo(firstIndex[0]);

      setPendingChats(
        calculatePendingCount(filteredChat, filteredPublicationsChat)
      );
    });

    return unsubscribe;
  };

  const GetRoomIds1 = async () => {
    try {
      await Get(`admin/roomList?room_type=HoppertoAdmin`).then((res) => {
        setRoomList(res?.data?.data);
      });
    } catch (error) {}
  };

  // handle audio record
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState("");

  function generateUniqueFileName() {
    const timestamp = new Date().getTime();
    const randomString = Math.random().toString(36).substring(2, 8);
    return `${timestamp}_${randomString}.mp3`;
  }

  const onStartRecording = () => {
    setIsRecording(true);
  };

  const onStopRecording = async (recordedBlob) => {
    setIsRecording(false);

    try {
      const storageRef = ref(storage, `media/${generateUniqueFileName()}`); // Generate a unique file name
      const snapshot = await uploadBytes(storageRef, recordedBlob.blob);
      // Get the download URL for the uploaded audio
      const audioURL = await getDownloadURL(snapshot.ref);
      setAudioURL(audioURL);
    } catch (error) {
      console.error("Error uploading audio:", error);
    }
  };

  const handleFileChange = (event) => {
    event.preventDefault();
    const selectedFile = event.target.files[0];
    // console.log(
    //   "🚀 ~ file: Chat.jsx:161 ~ handleFileChange ~ selectedFile:",
    //   selectedFile
    // );
    if (selectedFile) {
      setOpenModal(true);
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setOpenModal(false);
      setPreviewUrl("");
    }
    setFile(selectedFile);
  };

  const generateVideoThumbnail = (file) => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement("canvas");
      const video = document.createElement("video");
      video.autoplay = true;
      video.muted = true;
      video.src = URL.createObjectURL(file);
      video.onloadeddata = () => {
        let ctx = canvas.getContext("2d");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        canvas.toBlob((blob) => {
          const storageRef = ref(getStorage(), "thumbnails", file.name);
          uploadBytes(storageRef, blob)
            .then(() => {
              getDownloadURL(storageRef).then((downloadURL) => {
                resolve(downloadURL);
              });
            })
            .catch((error) => {
              reject(error);
            });
        }, "image/jpeg");
      };
    });
  };

  const handleSend = async () => {
    if (file) {
      const storageRef = ref(storage, `chat/${file.name}`);
      try {
        const snapshot = await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(snapshot.ref);
        let messageType = "";
        let thumbnailURL = "";

        if (file.type.startsWith("image/")) {
          messageType = "image";
        } else if (file.type.startsWith("video/")) {
          messageType = "video";
          // Generate the thumbnail and get the data URL
          const thumbnailDataUrl = await generateVideoThumbnail(file);
          thumbnailURL = thumbnailDataUrl;
        } else if (file.type.startsWith("audio/")) {
          messageType = "audio";
        }
        sendMessage(downloadURL, messageType, thumbnailURL);
        setOpenModal(false);
      } catch (error) {
        console.error("Error uploading file:", error);
      } finally {
        setFile(null);
      }
    } else if (msg?.trim() !== "") {
      // console.log("send message");
      sendMessage(msg, "text");
      setOpenModal(false);
    } else if (audioURL) {
      sendMessage(audioURL, "recording");
      setAudioURL("");
    } else if (csvUrl) {
      sendMessage(csvUrl, "csv");
      localStorage.removeItem("csvUrl");
      setOpenModal(false);
    }
  };

  const sendMessage = async (message, messageType, thumbnailURL = "") => {
    // const { uid, email } = auth.currentUser || {};
    const firestore = getFirestore();

    const messageRef = collection(
      firestore,
      "Chat",
      roomDetails?.roomId,
      "Messages"
    );
    const messageData = {
      messageId: new Date().getTime(),
      senderId: profile?._id,
      senderName: profile?.name,
      senderImage: `https://uat-presshope.s3.eu-west-2.amazonaws.com/public/adminImages/${profile?.profile_image}`,
      receiverId: roomDetails?.roomId,
      receiverName: roomDetails?.sender_id
        ? `${roomDetails?.sender_id?.first_name || ""} ${
            roomDetails?.sender_id?.last_name || ""
          }`
        : roomDetails?.senderName,
      receiverImage: roomDetails?.sender_id
        ? process.env.REACT_APP_HOPPER_AVATAR +
          roomDetails?.sender_id?.avatar_details?.avatar
        : roomDetails?.senderImage,
      roomId: roomDetails?.roomId,
      message: message,
      replyMessage: "Empty Comming Soon",
      messageType: messageType,
      videoThumbnail: thumbnailURL,
      duration: "duration",
      date: moment().utc().format("YYYY-MM-DD hh:mm:ss"),
      uploadPercent: 100,
      readStatus: isUserOnline ? "read" : "unread",
      replyType: type,
      latitude: 0.0,
      longitude: 0.0,
      isReply: "isReply",
      isLocal: 1,
      isAudioSelected: false,
    };

    // console.log("add doc", messageData);
    try {
      await addDoc(messageRef, messageData);
      setLastMessage(message, messageType, thumbnailURL, roomDetails?.room_id);
      setMsg("");
      setFile(null);
      GetMessages(roomDetails?.room_id);
      // sender_id?._id
      // await SendNotification(roomDetails?.senderId, messageType, `👋🏼 Hi ${roomDetails?.sender_id?.first_name} ${roomDetails?.sender_id?.last_name} (${roomDetails?.sender_id?.user_name}), you've got a new chat message from PRESSHOP🐰 `)
      await SendNotification(
        roomDetails?.senderId,
        messageType,
        `👋🏼 Hi ${roomDetails?.senderName}, you've got a new chat message from PRESSHOP🐰 `
      );
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const setLastMessage = async (
    message,
    messageType,
    thumbnailURL = "",
    roomId
  ) => {
    const firestore = getFirestore();
    const docRef = doc(firestore, "Chat", roomDetails.room_id);
    const updatedFields = {
      message: message,
      messageType: messageType,
      date: new Date().toISOString().slice(0, 19).replace("T", " "),
    };

    const newDoc = {
      message: message,
      messageType: messageType,
      date: new Date().toISOString().slice(0, 19).replace("T", " "),
      roomId: roomId,
    };

    try {
      // Get the current data of the document
      const docSnapshot = await getDoc(docRef);
      if (docSnapshot.exists()) {
        await updateDoc(docRef, updatedFields);
        // console.log("Document successfully updated");
      } else {
        await setDoc(docRef, newDoc);
        // console.log("Document successfully created");
      }
    } catch (error) {
      console.error("Error updating document: ", error);
      throw error;
    }
  };

  const GetMessages = (roomId) => {
    if (!roomId) {
      // console.log("room id not found");
      return;
    }
    const messageRef = collection(getFirestore(), "Chat", roomId, "Messages");
    const q = query(messageRef, orderBy("date"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newMessages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      // console.log(
      //   "🚀 ~ file: Chat.jsx:294 ~ newMessages ~ newMessages:",
      //   newMessages
      // );
      setUpdateChatNotification((prev) => !prev);
      setMessages((prevMessages) => {
        // Combine the previous messages with the new messages
        return [...prevMessages, ...newMessages];
      });
      
    });

    return unsubscribe;
  };

  //  STATUS CODE FOR ADMIN ******************************
  const createDocumentIfNotExists = async (
    collectionName,
    documentId,
    initialData
  ) => {
    const firestore = getFirestore();
    const docRef = doc(firestore, collectionName, documentId);

    try {
      const docSnapshot = await getDoc(docRef);
      if (docSnapshot.exists()) {
        // console.log("Document already exists, skipping creation");
        return; // Document already exists, no need to create
      }

      // await addDoc(docRef, initialData);
      // console.log("Document created successfully");
      await setDoc(docRef, initialData);
      // console.log("Document written with ID: ", documentId);
      return documentId; // Return the custom document ID
    } catch (error) {
      console.error("Error creating document: ", error);
      throw error;
    }
  };

  useEffect(() => {
    const initialData = {
      isOnline: false,
      last_seen: "",
      roomId: "",
      senderImage: "",
      userName: "",
    };
    if (profile?._id) {
      createDocumentIfNotExists("OnlineOffline", profile?._id, initialData);
    }
  }, [profile?._id]);

  const updateStatusDocument = async (documentId, roomId) => {
    const data = {
      isOnline: true,
      last_seen: new Date().toLocaleTimeString(),
      roomId: roomId,
      senderImage: `https://uat-presshope.s3.eu-west-2.amazonaws.com/public/adminImages/${profile?.profile_image}`,

      userName: profile?.name,
    };
    const firestore = getFirestore();
    const docRef = doc(firestore, "OnlineOffline", documentId);

    try {
      await updateDoc(docRef, data);
      // console.log("Document successfully updated");
    } catch (error) {
      // console.error("Error updating document: ", error);
      throw error;
    }
  };
  const GetUserOnlineStatus = async (documentId) => {
    const docRef = doc(getFirestore(), "OnlineOffline", documentId);

    const unsubscribe = onSnapshot(docRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        const data = docSnapshot.data();
        // console.log("Document data:", data);
        setIsUserOnline(data.isOnline);
        setUserStatusObj(data);
        // callback(data);
      } else {
        // console.log("Document does not exist");
        // callback(null);
      }
    });

    return unsubscribe;
  };

  // ADMIN OFFLINE
  const updateStatusToOffline = async (documentId) => {
    const firestore = getFirestore();
    const docRef = doc(firestore, "OnlineOffline", documentId);

    try {
      // Get the current data of the document
      const docSnapshot = await getDoc(docRef);
      if (docSnapshot.exists()) {
        // Update only the isOnline field, keeping the rest unchanged
        const currentData = docSnapshot.data();
        await updateDoc(docRef, {
          isOnline: false,
          last_seen: new Date().toLocaleTimeString(),
        });
        // console.log("Document successfully updated");
      } else {
        // console.log("Document does not exist");
      }
    } catch (error) {
      console.error("Error updating document: ", error);
      throw error;
    }
  };

  useEffect(() => {
    return () => {
      updateStatusToOffline(profile?._id);
    };
  }, []);

  // getting chat list from fireStore
  const getChat = async () => {
    const chatRef = collection(getFirestore(), "Chat"); // Assuming "Chat" is the collection name
    const q = query(chatRef, orderBy("date", "desc"));
    try {
      const querySnapshot = await getDocs(q);
      const chats = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));
      // console.log("getchats", chats);
      setFireChats(chats);
      // return chats;
    } catch (error) {
      console.error("Error getting chats:", error);
      throw error; // Rethrow the error for handling in the calling code
    }
  };

  useEffect(() => {
    GetRoomIds();
    GetRoomIds1();
    GetProfile();
    getChat();
    HopperControls();
  }, []);

  useEffect(() => {
    if (profile?._id) {
      getChatsListing(currentPagePub, currentPageHopper);
    }
  }, [profile?._id, search, currentPageHopper, currentPagePub]);

  const handleSendClick = (event) => {
    event.preventDefault();
    handleSend();
  };

  const close = () => {
    setOpenModal(false);
    setFile("");
  };

  const handleDeleteMessage = async (messageId) => {
    try {
      const messageRef = doc(
        getFirestore(),
        "Chat",
        roomDetails?.room_id,
        "Messages",
        messageId
      );
      await deleteDoc(messageRef);
    } catch (error) {}
  };

  const SendNotification = async (
    receiver_id,
    notificationsTitle,
    notificationsMessage
  ) => {
    try {
      let obj = {
        receiver_id: receiver_id,
        title: notificationsTitle,
        body: notificationsMessage,
      };
      // console.log("🚀 ~ SendNotification ~ obj:", obj);

      await Post("admin/sendNotification", obj);
    } catch (err) {
      // console.log(err);
    }
  };

  const handleSeen = async (roomId, status) => {
    const messageRef = collection(getFirestore(), "Chat", roomId, "Messages");
    const querySnapshot = await getDocs(messageRef);
    const batch = writeBatch(getFirestore());
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data?.receiverId === profile?._id) {
        batch.update(doc.ref, { readStatus: status });
      }
      // batch.update(doc.ref, { readStatus: status });
    });
    try {
      await batch.commit();
      // console.log("Read status updated successfully.");
      setUpdateChatNotification((prev) => !prev);
      GetMessages(roomId);
    } catch (error) {
      console.error("Error updating read status:", error);
    }
  };

  const handleSeenForPublications = async (roomId, status) => {
    const messageRef = collection(getFirestore(), "Chat", roomId, "Messages");
    const querySnapshot = await getDocs(messageRef);
    const batch = writeBatch(getFirestore());
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data?.receiverId === profile?._id) {
        batch.update(doc.ref, { readStatus: status });
      }
      // batch.update(doc.ref, { readStatus: status });
    });
    try {
      await batch.commit();
      // console.log("Read status updated successfully.");
      setUpdateChatNotification((prev) => !prev);
      GetMessages(roomId);
    } catch (error) {
      console.error("Error updating read status:", error);
    }
  };

  const fireStoreChatList = useMemo(() => {
    return fireStoreChats.map((obj) => obj.data);
  }, [fireStoreChats]);
  // console.log("🚀 ~ fireStoreChatList ~ fireStoreChatList:", fireStoreChatList)

  //extracting the number of unseen msgs
  const unSeenMsg = useMemo(() => {
    let pendingmsg = 0;
    fireStoreChatList.forEach((obj) => {
      if (obj.readStatus === "unread" && obj?.receiverId === profile?._id) {
        pendingmsg++;
      }
    });
    return pendingmsg;
  }, [fireStoreChatList]);
  // console.log("🚀 ~ file: Chat.jsx:430 ~ unSeenMsg ~ unSeenMsg:", unSeenMsg)

  useEffect(() => {
    // if (fireStoreChatList.length > 0) {
    // }
  }, [publicationChats, hoopersChatList]);

  function calculatePendingCount(arr1, arr2) {
    let pendingCount = 0;
    // Iterate over the first array
    arr1.forEach((item1) => {
      // Check if readStatus is not "read"
      if (item1.readStatus === "unread") {
        pendingCount++;
      }
    });
    // Iterate over the second array
    arr2.forEach((item2) => {
      // Check if readStatus is not "read"
      if (item2.readStatus === "unread") {
        pendingCount++;
      }
    });
    return pendingCount;
  }

  //setting first chat at default chat in starting
  const [firstRander, setFirstRander] = useState(true);

  // console.log({ roomInfo });

  useEffect(() => {
    if (firstRander === true) {
      if (publicationChats.length > 0) {
        setRoomDetails(publicationChats[0]);
        GetMessages(publicationChats[0]?.roomId);
        // updateStatusDocument()
        setActiveRoomId(publicationChats[0]?.roomId);
        setHide(true);
        setFirstRander(false);
      }
    }
  }, [publicationChats]);

  //update chatlist
  const updateChatList = (roomId) => {
    setFireChats((prev) => {
      return prev.map((obj) => {
        if (obj?.data?.roomId === roomId) {
          return { ...obj, data: { ...obj.data, readStatus: "seen" } };
        } else {
          return obj;
        }
      });
    });
  };

  // console.log("hdhckhchsdcdxhhkzxbsj", messages);

  const scrollToBottom = () => {
    // messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  //seen old messages
  useEffect(() => {
    if (isUserOnline) {
      handleSeen(userStatusObj?.roomId, "read");
    }
  }, [isUserOnline]);

  const handleRoomChange = (curr) => {
    const roomDetails = {
      ...curr,
      room_id: curr.roomId,
    };
    setRoomDetails(roomDetails);
  };

  const latestMsgSeen = async () => {
    const firestore = getFirestore();
    const docRef = doc(firestore, "Chat", roomDetails.room_id);
    const updatedFields = {
      readStatus: "read",
    };

    try {
      // Get the current data of the document
      const docSnapshot = await getDoc(docRef);
      if (docSnapshot.exists()) {
        await updateDoc(docRef, updatedFields);
        // console.log("Document successfully updated");
      } else {
        // console.log("Document not exist ");
      }
    } catch (error) {
      console.error("Error updating document: ", error);
      throw error;
    }
  };

  //pagination
  const handlePageChangePub = (selectedPage) => {
    setCurrentPagePub(selectedPage.selected + 1);
  };

  const handlePageChangeHopper = (selectedPage) => {
    setCurrentPageHopper(selectedPage.selected + 1);
  };

  // console.log('hopperDetails ------>', hopperDetails)

  return (
    <>
      <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
        {localStorage.getItem("special_navigate") === true ||
        localStorage.getItem("special_navigate") === "true" ? (
          <div className="back_link">
            <a
              onClick={() => {
                window.history.back();
              }}
            >
              <BsArrowLeft />
              <span>Back</span>
            </a>
          </div>
        ) : null}
        {/* {console.log(
          "localStorage.getItemspecial_navigate",
          localStorage.getItem("special_navigate")
        )} */}
        <Flex mb="0px" gap="25px">
          <Card
            className="cms_left_card chat_wrap chatsListWrap"
            direction="column"
            w="450px"
            px="0px"
            mb="0px"
            overflowX={{ sm: "scroll", lg: "hidden" }}
          >
            <div className="chat_srch">
              <Input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search"
              />
              <img src={search} className="srch_ic" alt="" />
              {/* <a onClick={onOpen}>
                <img src={addchatic} className="add_chat_ic" alt="" />
              </a>
              <img src={filtersic} className="filter_chat_ic" alt="" /> */}
            </div>
            <div className="chat_tabs_wrap">
              <Tabs
                variant="unstyled"
                // onChange={(e) => {
                //   if (e === 0) {
                //     GetRoomIds("MediahousetoAdmin")
                //   }
                //   else if (e === 1) {
                //     GetRoomIds("HoppertoAdmin")
                //   }
                // }}
              >
                <TabList>
                  <Tab
                    _selected={{ color: "white", bg: "#000" }}
                    bg="#F3F5F4"
                    onChange={() => {}}
                  >
                    <span>Publications</span>
                  </Tab>

                  <Tab
                    _selected={{ color: "white", bg: "#000" }}
                    bg="#F3F5F4"
                    onChange={() => {}}
                  >
                    <span>Hoppers </span>
                  </Tab>
                </TabList>

                <TabPanels>
                  {/* ********************PUBLICATION CHATS ******************************* */}
                  {
                    console.log('publicationChats------>', publicationChats)
                  }
                  <TabPanel className="chat_panels">
                    {
                      <div className="chat_items">
                        {publicationChats &&
                          publicationChats?.map((curr) => {
                            return (
                              <div
                                className={`chat_itm ${
                                  activeRoomId === curr?.id ? "active" : ""
                                }`}
                                key={curr?._id}
                                onClick={() => {
                                  // setRoomDetails(curr);
                                  setRoomInfo(curr);
                                  handleRoomChange(curr);
                                  setMessages([]);
                                  GetMessages(curr?.roomId);
                                  GetUserOnlineStatus(curr?.senderId);
                                  handleSeenForPublications(
                                    curr?.roomId,
                                    "read"
                                  );
                                  latestMsgSeen(curr?.roomId);
                                  // handleSeen(curr?.room_id, "seen");
                                  updateStatusDocument(
                                    profile?._id,
                                    curr?.roomId
                                  );
                                  setActiveRoomId(curr?.id);
                                  setHide(true);
                                }}
                              >
                                <div className="cht_img">
                                  <img
                                    src={curr?.senderImage}
                                    onError={(e) => {
                                      e.target.onerror = null;
                                      e.target.src = profileimg;
                                    }}
                                    alt=""
                                  />
                                </div>
                                <div className="cht_txt">
                                  <div className="hding">
                                    <p className="chat_name">
                                      {curr?.senderName}
                                      <span className="pblc">
                                        {/* &nbsp; ({curr?.sender_id?.company_name}) */}
                                      </span>
                                    </p>
                                    <p
                                      className={`msg ${
                                        curr?.readStatus === "unread"
                                          ? "unseen"
                                          : ""
                                      }`}
                                      key={curr?.messageId}
                                    >
                                      {/* {messages[messages?.length - 1]
                                        ?.messageType === "video"
                                        ? "video"
                                        : messages[messages?.length - 1]
                                          ?.messageType === "image"
                                          ? "image"
                                          : messages[messages?.length - 1]
                                            ?.messageType === "csv"
                                            ? "document"
                                            : messages[messages?.length - 1]
                                              ?.messageType === "text"
                                              ? messages[messages?.length - 1]
                                                ?.message
                                              : ""} */}
                                      {curr?.messageType === "video"
                                        ? "video"
                                        : curr?.messageType === "image"
                                        ? "image"
                                        : curr?.messageType === "csv"
                                        ? "document"
                                        : curr?.messageType === "recording"
                                        ? "Audio"
                                        : curr?.messageType === "text"
                                        ? curr?.message
                                        : ""}
                                    </p>
                                  </div>
                                  <div className="chat_time">
                                    <p>
                                      {moment
                                        .utc(curr?.date)
                                        .local()
                                        .format("hh:mm:A")}
                                    </p>
                                    <p>
                                      {moment
                                        .utc(curr?.date)
                                        .local()
                                        .format("DD MMMM YYYY")}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    }
                    <div className="d-flex">
                      <ReactPaginate
                        className="paginated"
                        breakLabel="..."
                        nextLabel=">"
                        onPageChange={handlePageChangePub}
                        pageRangeDisplayed={5}
                        pageCount={totalPagesForPub}
                        // pageCount={10}
                        previousLabel="<"
                        renderOnZeroPageCount={null}
                      />
                    </div>
                  </TabPanel>

                  {/* ********************HOPPER CHATS ******************************* */}
                  <TabPanel className="chat_panels"> 
                    <div className="chat_items">
                      {hoopersChatList &&
                        hoopersChatList.map((curr) => {
                          {/* const hopperInfo = hopperDetails.find(detail => detail.full_name === curr.senderName); */}
                          return (
                            <div
                              className={`chat_itm ${
                                activeRoomId === curr?.id ? "active" : ""
                              }`}
                              key={curr?.id}
                              onClick={() => {
                                // setRoomDetails(curr);
                                setRoomInfo(curr);
                                handleRoomChange(curr);
                                setMessages([]);
                                GetMessages(curr?.roomId);
                                GetUserOnlineStatus(curr?.senderId);
                                updateStatusDocument(
                                  profile?._id,
                                  curr?.roomId
                                );
                                setHide(true);
                                setActiveRoomId(curr?.id); // Set the active room ID
                                handleSeenForPublications(
                                  curr?.roomId,
                                  "read"
                                );
                                latestMsgSeen(curr?.roomId);
                              }}
                            >
                              <div className="cht_img">
                                <img
                                  src={curr?.senderImage}
                                  onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = profileimg;
                                  }}
                                  alt="user"
                                />
                              </div>
                              <div className="cht_txt">
                                <div className="hding">
                                  {
                                    (curr?.senderName && curr?.senderUserName)  ? 
                                    <p className="chat_name">
                                    {`${curr?.senderName}`}
                                    <span className="pblc">
                                      &nbsp; ({curr?.senderUserName})
                                    </span>
                                  </p> : <p className="chat_name">
                                    {`${curr?.senderName}`}
                                  </p>
                                  }
                                  <p
                                    className={`msg ${
                                      curr?.readStatus === "unread"
                                        ? "unseen"
                                        : ""
                                    }`}
                                    key={curr?.messageId}
                                  >
                                    {curr?.messageType === "video"
                                      ? "video"
                                      : curr?.messageType === "image"
                                      ? "image"
                                      : curr?.messageType === "csv"
                                      ? "document"
                                      : curr?.messageType === "recording"
                                      ? "Audio"
                                      : curr?.messageType === "text"
                                      ? curr?.message
                                      : ""}
                                  </p>
                                </div>
                                <div className="chat_time">
                                  <p>
                                    {moment
                                      .utc(curr?.date)
                                      .local()
                                      .format("hh:mm:A")}
                                  </p>
                                  <p>
                                    {moment
                                      .utc(curr?.date)
                                      .local()
                                      .format("DD MMMM YYYY")}
                                  </p>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                    <div className="d-flex">
                      <ReactPaginate
                        className="paginated"
                        breakLabel="..."
                        nextLabel=">"
                        onPageChange={handlePageChangeHopper}
                        pageRangeDisplayed={5}
                        pageCount={totalPagesForHopper}
                        // pageCount={10}
                        previousLabel="<"
                        renderOnZeroPageCount={null}
                      />
                    </div>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </div>
          </Card>

          <Card
            className="chat_right chattingContentWrap"
            w="100%"
            px="0px"
            mb="0px"
            overflowX={{ sm: "scroll", lg: "hidden" }}
          >
            <div className="chatingHeader">
              <img
                // src="https://uat-presshope.s3.eu-west-2.amazonaws.com/public/user/16932915082901692942462287images%20(5).jpeg"
                src={
                  roomDetails?.senderImage ||
                  roomDetails?.sender_id?.profile_image
                }
                className="chat_user_img"
                alt="user"
              />
              <div className="cht-user">
                <h5>
                  {roomDetails?.senderName  && roomDetails?.senderUserName ?
                  
                                 <p className="chat_name">
                                    {`${roomDetails?.senderName}`}
                                    <span className="pblc">
                                      &nbsp; ({roomDetails?.senderUserName})
                                    </span>
                                  </p> : <p className="chat_name">
                                    {`${roomDetails?.senderName}`}
                                  </p>
                    }
                </h5>
                {isUserOnline && <p className="activeStatus">Active</p>}
              </div>
            </div>
            <div className="chating" ref={chatBoxRef}>
              {/* {
                console.log('messages--------->', messages)
              } */}
              {Array.from(
                new Set(
                  messages
                    ?.filter((el) => el?.roomId === roomInfo?.roomId)
                    ?.map((curr) => curr?.id)
                )
              )
              ?.sort((a, b) => messages?.find((el) => el.id === b).date - messages.find((el) => el.id === a).date)
              ?.map((uniqueId) => {
                const curr = messages?.find((el) => el.id === uniqueId);
                return (
                  <div className="single_chat" key={curr?._id}>
                    <div
                      className="chat-dlt"
                      onClick={() => handleDeleteMessage(curr?.id)}
                    >
                      <img src={dltIcn} alt="" />
                    </div>
                    <div className="single_chat_img">
                      <img
                        src={curr?.senderImage || profileimg}
                        className="chat_user_img"
                        alt="user"
                      />
                    </div>
                    <div className="cht_usr_txt">
                      <p className="usr_name">
                        {curr?.senderName}

                        <span className="msg_time">
                         {moment.utc(curr?.date).local().format("DD MMM")} AT  {moment.utc(curr?.date).local().format("hh:mm:A")} 
                        </span>
                        {curr.senderId === profile?._id &&
                          (curr.readStatus == "unread" ? (
                            <span className="msgChecks">
                              <IoCheckmark
                                style={{
                                  display: "inline",
                                  marginLeft: "3px",
                                  verticalAlign: "middle",
                                }}
                              />
                            </span>
                          ) : (
                            <>
                              <span className="msgChecks">
                                <IoCheckmarkDone
                                  style={{
                                    display: "inline",
                                    marginLeft: "3px",
                                    color: "green",
                                    verticalAlign: "middle",
                                  }}
                                />
                              </span>
                            </>
                          ))}
                      </p>

                      {curr?.messageType === "image" && curr?.uploadPercent === 100 ? (
                        <LazyLoad>
                          <span
                            onClick={() => {
                              onOpen1();
                              setBigImage(curr.message);
                            }}
                          >
                            <img
                              src={curr?.message?.includes("https") ? curr.message : null}
                              alt="User"
                              className="cht_in_img"
                            />
                          </span>
                        </LazyLoad>
                      ) : curr.messageType === "video" ? (
                        <div className="pos_rel wdth_ft">
                          <span>
                            {!videoPlaying ||
                            currentVideo !== curr.messageId ? (
                              <div key={curr.messageId}>
                                <span className="vdo_thumb_wrap">
                                  <BsPlay
                                    className="thumbnail_play"
                                    onClick={(event) => {
                                      event.stopPropagation();
                                      setVideoPlaying(true);
                                      setCurrentVideo(curr.messageId);
                                    }}
                                  />
                                </span>
                                <img
                                  className="cht_in_vdo"
                                  src={curr.videoThumbnail}
                                  alt="Video Thumbnail"
                                />
                              </div>
                            ) : (
                              <video
                                key={curr.messageId}
                                className="cht_in_vdo"
                                src={curr.message}
                                controls
                                onEnded={() => {
                                  setVideoPlaying(false);
                                  setCurrentVideo(null);
                                }}
                              />
                            )}
                          </span>
                        </div>
                      ) : curr.messageType === "audio" ? (
                        curr.uploadPercent === 100 ? (
                          <audio controls>
                            <source src={curr?.message} type="audio/mpeg" />
                          </audio>
                        ) : null
                      ) : curr.messageType === "csv" ? (
                        <div>
                          <a href={curr.message} download="file.csv">
                            <img src={csvic} className="dwnld_csv_ic" />
                          </a>
                        </div>
                      ) : curr.messageType === "recording" ? (
                        curr.uploadPercent === 100 ? (
                          <audio controls>
                            <source src={curr?.message} type="audio/mpeg" />
                          </audio>
                        ) : null
                      ) : (
                        <p className="mb-0 msg">{curr.message}</p>
                      )}
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            <>
              {hide && (
                <form onSubmit={handleSendClick} className="msgSendForm">
                  <div className="type_msg_wrap">
                    <div className="typing_wrap">
                      <img
                        src={`https://uat-presshope.s3.eu-west-2.amazonaws.com/public/adminImages/${profile?.profile_image}`}
                        alt="profile"
                        className="type_profile"
                      />
                      <Input
                        w="66%"
                        className="msg_inp"
                        value={msg}
                        placeholder="Type here…"
                        border="unset"
                        onChange={(e) => {
                          setMsg(e.target.value);
                          setType("text");
                        }}
                      />
                      <div className="type_right_icns" type="file">
                        <input
                          type="file"
                          id="cht_add_img"
                          className="cht_file_inp"
                          onChange={handleFileChange}
                        />
                        <label htmlFor="cht_add_img" className="cht_fl_inp_lbl">
                          <img
                            src={plusicn}
                            alt="profile"
                            className="plus_profile"
                          />
                        </label>
                        <Popover
                          initialFocusRef={initialFocusRef}
                          placement="bottom"
                          closeOnBlur={false}
                        >
                          <PopoverTrigger>
                            <Button className="tooltip">
                              <img
                                src={mcicn}
                                alt="profile"
                                className="plus_profile"
                              />
                            </Button>
                          </PopoverTrigger>

                          <PopoverContent
                            color="Black"
                            bg="#fff"
                            borderColor="unset"
                          >
                            <PopoverHeader
                              pt={4}
                              fontFamily="AirbnbBold"
                              border="0"
                            >
                              Record Audio
                            </PopoverHeader>
                            <PopoverArrow />
                            <PopoverCloseButton mt={"13px"} />
                            <PopoverBody>
                              <Flex mt={"10px"} justify={"space-evenly"}>
                                <Button
                                  className="rec_aud_btn"
                                  color={"white"}
                                  onClick={onStartRecording}
                                  disabled={isRecording}
                                >
                                  {" "}
                                  <BsPlay fontSize={"20px"} /> Start
                                </Button>
                                <Button
                                  className="rec_aud_btn"
                                  color={"white"}
                                  onClick={onStopRecording}
                                  disabled={!isRecording}
                                >
                                  <BsPause fontSize={"20px"} /> Stop
                                </Button>
                              </Flex>
                              <Flex>
                                <ReactMic
                                  record={isRecording}
                                  className="sound-wave"
                                  onStop={onStopRecording}
                                />
                              </Flex>
                            </PopoverBody>
                            <PopoverFooter
                              border="0"
                              d="flex"
                              alignItems="center"
                              justifyContent="end"
                              pb={4}
                            >
                              {/* <Box fontSize='sm'>Step 2 of 4</Box> */}
                              <ButtonGroup>
                                {audioURL && (
                                  <Button
                                    className="theme_btn"
                                    p={"10px 20px"}
                                    ref={initialFocusRef}
                                    onClick={handleSendClick}
                                  >
                                    Send
                                  </Button>
                                )}
                              </ButtonGroup>
                            </PopoverFooter>
                          </PopoverContent>
                        </Popover>

                        <Button type="submit" className="snd_btn">
                          <img
                            src={arwhiteicn}
                            alt="profile"
                            className="plus_profile"
                          />
                        </Button>
                      </div>
                    </div>
                  </div>
                </form>
              )}
            </>
          </Card>
        </Flex>
      </Box>

      {openModal && (
        <Modal
          className="action_modal_wrap"
          isOpen={openModal}
          onClose={onClose}
          show
        >
          <ModalOverlay />
          <ModalContent className="action_modal_cont mdl_wdth">
            <ModalBody>
              <Text fontFamily="AirbnbBold" fontSize="35px" mb="43px">
                Preview media
              </Text>
              <div className="action_modal_body">
                <div className="dtl_wrap mdl_itms">
                  <Flex
                    className="cht_uplded_media"
                    px="0px"
                    justify="start"
                    gap="20px"
                    mb="0px"
                    align="center"
                    flexWrap="wrap"
                  >
                    {file.type.startsWith("video/") ? (
                      <video className="cht_in_vdo" src={previewUrl} controls />
                    ) : file.type.startsWith("image/") ? (
                      <img src={previewUrl} alt="" />
                    ) : (
                      "audio"
                    )}
                  </Flex>
                </div>
                <div className="save_btn_wrap">
                  <Button className="btn_bg btn_close" onClick={close}>
                    Close
                  </Button>
                  <Button className="btn_bg" onClick={handleSend}>
                    Send
                  </Button>
                </div>
              </div>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}

      <Modal isOpen={isOpen1} onClose={onClose1}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Image</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className="preview-media imgs">
              <img src={bigImage} alt="" />
            </div>
          </ModalBody>

          <ModalFooter className="mdl-ftr">
            <div className="save_btn_wrap">
              <Button
                variantColor="blue"
                mr={3}
                onClick={onClose1}
                className="chakra-button btn_bg"
              >
                Close
              </Button>
            </div>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
