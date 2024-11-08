import { Box } from "@chakra-ui/react";
import { React, useState } from "react";
import {
  Flex,
  Text,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Input,
  useDisclosure,
  Select,
} from "@chakra-ui/react";
import { EmailShareButton, EmailIcon } from "react-share";
import chatic from "assets/img/icons/chat.svg";
import { useHistory } from "react-router-dom";

const SendCSVByEmail = ({ Url }) => {
  // console.log(Url, `<-----props`)
  const handleSendByEmail = () => {
    const emailSubject = 'CSV File';
    const emailBody = ` Download the reports 
    Link :  ${Url}`;
    if (Url) {
      const mailtoUrl = `mailto:?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(
        emailBody
      )}&attachment=${encodeURIComponent(Url)}`;

      window.location.href = mailtoUrl;
    } else {
      console.error('Url is undefined. Cannot send email.');
    }
  };

  return (
    <EmailIcon className="email_share" size={32} round={true} onClick={handleSendByEmail} />
  );
};

// import { EmailIcon } from 'your-email-icon-library'; // Import the appropriate email icon component

// const SendURLByEmail = ({ Url }) => {
//   const handleSendByEmail = () => {
//     const emailSubject = 'URL Link';
//     const emailBody = `Please find the URL link: ${Url}`;

//     const mailtoUrl = `mailto:recipient@example.com?subject=${encodeURIComponent(
//       emailSubject
//     )}&body=${encodeURIComponent(emailBody)}`;

//     // Open the mail client with the mailto URL
//     window.location.href = mailtoUrl;
//   };

//   return (
//     <EmailIcon className="email_share" size={32} round={true} onClick={handleSendByEmail} />
//   );
// };


export default function Share(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isEdit, setIsEdit] = useState(false);
  const history = useHistory();
  const csvUrl = props.csv;
  const RedirectChat = () => {
    // console.log(csvUrl, `<--------------csvUrl122222222`)
    localStorage.setItem('csvUrl', csvUrl);
    history.push(`/admin/chat`);
  };

  return (
    <>

      <Modal
        className="action_modal_wrap"
        isOpen={props.show}
        onClose={() => {
          props.update();
        }}
        show
      >
        <ModalOverlay />
        <ModalContent className="action_modal_cont catg_modal_cont">
          <ModalBody>
            <Text
              fontFamily="AirbnbBold"
              fontSize="22px"
              mb="25px"
              fontWeight="bold"
              textAlign="center"
            // ms="28px"
            >
              Share
            </Text>
            <div className="action_modal_body share_icns">
              <div className="dtl_wrap mdl_itms">
                <Flex
                  className="edit_inputs_wrap"
                  px="0px"
                  justify="space-between"
                  gap="20px"
                  mb="0px"
                  align="center"
                >
                  <Flex direction="column" gap={"5px"}>
                    <SendCSVByEmail Url={csvUrl} />
                    <Text mb={"0"} fontFamily="AirbnbMedium">Mail</Text>
                  </Flex>
                  <Flex direction="column" gap={"5px"}>
                    <a onClick={RedirectChat} className="share_to_chat">
                      <img src={chatic} alt="Chat" className="chat_ic" />
                    </a>
                    <Text mb={"0"} fontFamily="AirbnbMedium">Chat</Text>
                  </Flex>
                </Flex>
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
