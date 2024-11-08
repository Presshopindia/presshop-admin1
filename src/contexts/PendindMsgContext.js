import React, { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import {
  query,
  orderBy,
  getDocs,
  collection,
  getFirestore,
} from "firebase/firestore";
import { Get } from "api/admin.services";
import dataContext from "views/admin/ContextFolder/Createcontext";
export const PendingMsgContext = createContext();

//context provider
export const PendingMsgProvider = ({ children }) => {
  let [pendingChats, setPendingChats] = React.useState(null);
  const [fireStoreChats, setFireChats] = useState(null);
  const [notificationOther, setNotificationOther] = useState(null);
  const [pendingNotifications, setPendingNotifications] = useState(null);
  const [upadteChatNotificationn, setUpdateChatNotification] = useState(false);


  const { profile } = useContext(dataContext);
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

      setFireChats(chats);

      // return chats;
    } catch (error) {
      console.error("Error getting chats:", error);
      throw error; // Rethrow the error for handling in the calling code
    }
  };

  //getting list for extracting pending unseen msg
  const getNotificationOTHERS = async () => {
   
    try {
      await Get(`admin/getnotification?type=received&limit=5`).then(
        (res) => {
          // console.log("check", res?.data?.data)
          setNotificationOther(res?.data?.data);
          setPendingNotifications(res?.data?.unreadCount);
        }
      );
    } catch (error) {
    //  console.log(error)
    }
  };

  useEffect(() => {
    getChat();
    getNotificationOTHERS();
  }, [upadteChatNotificationn]);

  useEffect(() => {
    if (fireStoreChats) {
      let pendingmsg = 0;
      fireStoreChats
        .map((obj) => obj.data)
        .forEach((obj) => {
          if (obj?.readStatus === "unread" && obj?.receiverId === profile?._id ) {
            pendingmsg++;
          }
        });
      setPendingChats(pendingmsg);
    }
  }, [fireStoreChats, upadteChatNotificationn]);

  // useEffect(() => {
  //   if (notificationOther) {
  //     let pendingNotif  = 0;
  //     notificationOther
  //       .forEach((obj) => {
  //         if (obj?.is_read === false){
           
  //           pendingNotif++;
  //         }
  //       });
  //       setPendingNotifications(pendingNotif);
  //   }
  // }, [notificationOther]);

  return (
    <PendingMsgContext.Provider
      value={{
        pendingChats,
        setPendingChats,
        pendingNotifications,
        setPendingNotifications,
        setUpdateChatNotification,
      }}
    >
      {children}
    </PendingMsgContext.Provider>
  );
};

export const useMsgContext = () => React.useContext(PendingMsgContext);
