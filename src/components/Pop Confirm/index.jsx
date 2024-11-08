import React from "react";
import {
  useDisclosure,
  Button,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Tooltip,
} from "@chakra-ui/react";
import { AiOutlineDelete } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";

function PopupConfirm({
  title,
  description,
  customerId,
  onConfirm,
  buttonTitle = "Delete",
  className = ""
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  const handleDelete = () => {
    onConfirm(customerId);
    onClose();
  };

  return (
    <>
      {
        buttonTitle == "AiOutlineDelete"
          ?
          <Tooltip label="Delete"  placement="right">
            <span><AiOutlineDelete style={{ cursor: "pointer" }} className={`icn ${className}`} onClick={onOpen} /></span>
          </Tooltip>
          :
          buttonTitle == "RxCross1"
            ?
            <Tooltip label="Delete">
              <span><RxCross1 className={`icn ${className}`} onClick={onOpen} /></span>
            </Tooltip>
            :
            buttonTitle == "Testimonial"
              ?
              <span className="dlte" style={{ cursor: "pointer" }} onClick={onOpen}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#clip0_5605_71719)">
                    <path d="M1.09375 2.94531H10.8715" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M2.31641 2.94531V9.66753C2.31641 10.6801 3.13722 11.5009 4.14974 11.5009H7.81641C8.82894 11.5009 9.64974 10.6801 9.64974 9.66753V2.94531" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M4.15039 1.72222C4.15039 1.04721 4.6976 0.5 5.37261 0.5H6.59484C7.26987 0.5 7.81706 1.04721 7.81706 1.72222V2.94445H4.15039V1.72222Z" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
                  </g>
                  <defs>
                    <clipPath id="clip0_5605_71719">
                      <rect width="10.6667" height="12" fill="white" transform="translate(0.650391)" />
                    </clipPath>
                  </defs>
                </svg>

              </span>
              :
              <Button
                className="theme_btn tbl_btn del-btn"
                colorScheme="red"
                onClick={onOpen}
              >
                {buttonTitle}
              </Button>
      }

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {title}
            </AlertDialogHeader>

            <AlertDialogBody>{description}</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleDelete} ml={3}>
                {buttonTitle == "AiOutlineDelete" ? "Delete" : buttonTitle}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}

export default PopupConfirm;
