import React, { useEffect, useState, useRef } from "react";
import { InputGroup, ModalCloseButton, ModalHeader, Tooltip } from "@chakra-ui/react";
import { GrAttachment } from "react-icons/gr";
import {
  Box,
  Container,
  Textarea,
  Flex,
  Text,
  useColorModeValue,
  Button,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  TableContainer,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Input,
  useDisclosure,
  Select,
  Checkbox,
  TableCaption,
  Tfoot
} from "@chakra-ui/react";
import { IoShareOutline } from "react-icons/io5";
import Card from "components/card/Card";
import { useHistory } from "react-router-dom";
import printic from "assets/img/icons/print.png";
import shareic from "assets/img/icons/share.png";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Get, Patch, Post } from "api/admin.services";
import moment from "moment";
import { BsEye } from "react-icons/bs";
import share from "assets/img/icons/share.png";

import videoic from "assets/img/icons/video.svg";
import writeic from "assets/img/icons/write.svg";
import shared from "assets/img/icons/smallShared.svg";
import { AiOutlineDelete } from "react-icons/ai";
import Tablecard from "./Tablecard";
import { toast } from "react-toastify";
import AddPic from "assets/img/icons/AddPic.svg";
import "moment/locale/en-gb";
import Loader from "components/Loader";
import closeic from "assets/img/sorticons/close.svg";
import dltIcn from "assets/img/icons/dlt.svg"
import PopupConfirm from "components/Pop Confirm";
import TestiImg from "assets/img/testi-1.png";
import DailyTimes from "assets/img/daily-times.png";
import star from "assets/img/star.png";
import FillStar from "assets/img/half_filled_star.png";
import camera from "assets/img/icons/camera.svg";
import { hasDecimal } from "utils/commonFunction";
import { Delete } from "api/admin.services";
import { MultiSelect } from "react-multi-select-component";
export default function EditMarketplace() {
  const [uploadedDoc, setUploadedDoc] = useState([]);
  const [type, setType] = useState("doc");
  const [videoPreview, setVideoPreview] = useState(null);
  const [videoDescp, setVideoDescp] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [show, setShow] = useState(false);
  const [faq, setFaq] = useState({ ques: "", ans: "" });
  const [faqData, setFaqData] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isOpen1, onOpen: onOpen1, onClose: onClose1, } = useDisclosure();
  const [isEdit, setIsEdit] = useState(false);
  const [isEdit1, setIsEdit1] = useState(false);
  const textColor = useColorModeValue("#000", "white");
  const history = useHistory();
  const [video, setVideo] = useState([]);
  const [docType, setDocType] = useState({ document_name: "" });
  const [isViewMore, setIsViewMore] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showUpload, setShowUpload] = useState(true);
  const tableRef = useRef(null);
  const [mediahouseList, setMediahouseList] = useState([]);
  const [updateDate, setUpdateDate] = useState({ uploadDocs: "", privacy_policy: "", legalTerms: "", Faq: "", });
  const [activeClass, setActiveClass] = useState({
    uploadedDoc: "active",
    privacyPolicy: "",
    legal: "",
    faq: "",
    testimonial: "",
    tutorial: ""
  })

  // Get dates from the API
  const getDate = async () => {
    try {
      const privacy = await Get(
        "admin/genral/mgmt?privacy_policy=privacy_policy"
      );
      setUpdateDate((prev) => ({
        ...prev,
        privacy_policy: privacy.data.status.updatedAt,
      }));
      const legalTerms = await Get("admin/genral/mgmt?legal=legal");
      setUpdateDate((prev) => ({
        ...prev,
        legalTerms: legalTerms.data.status.updatedAt,
      }));
      // const uploadDocs = await Get("admin/genral/mgmt?doc=doc");
      // setUpdateDate(prev => ({ ...prev, uploadDocs: uploadDocs.data.status.updatedAt }));
    } catch (error) {
      // console.log(error);
    }
  };

  const handleUpdate = () => { getDate(); };

  // Videos section
  const [selected, setSelected] = useState(false)
  const handleFileSelect = async (event) => {
    const file = event.target.files[0]
    if (file) {
      setSelected(true)
    }
    const formdata = new FormData();
    formdata.append("images", file);
    formdata.append("path", "tutorial");
    setLoading(true);
    try {
      const res = await Post("admin/upload/data", formdata);
      setVideoPreview(res.data.imgs[0]);
      setLoading(false)
      setShowUpload(false);
    } catch (error) {
      // console.log(error);
      setLoading(false)
    }
  };

  const handleFileUpload = async (type) => {
    if (!videoPreview || videoPreview.trim() === "") {
      toast.error("Please add a video")
    } else if (!videoDescp || videoDescp.trim() === "") {
      toast.error("Please add a brief description")
    } else {

      try {
        const obj = {
          for: "marketplace",
          type: type,
          video: videoPreview,
          description: videoDescp,
        };
        setLoading(true);
        const res = await Patch("admin/update/genral/mgmt", obj);
        if (res) {
          toast.success("A new video has been uploaded.")
          getVideo("videos");
          setVideoDescp("");
          setVideoPreview("");
          setSelected(false);
          setLoading(false)
        }
      } catch (error) {
        // console.log(error);
        setLoading(false)
      }
      setShowUpload(true);
    }
  };

  const getVideo = async (type) => {
    setLoading(true)
    try {
      const res = await Get(`admin/genral/mgmt?${type}=${type}`);
      setVideo(res.data.status);
      setLoading(false)
    } catch (error) {
      // console.log(error);
      setLoading(false)
    }
  };

  // Faq section
  const addFaq = async () => {
    if (!faq?.ques || faq.ques.trim() === "") {
      toast.error("Both fields are required");
    } else if (!faq?.ans || faq.ans.trim() === "") {
      toast.error("Both fields are required");
    } else {
      try {
        const obj = {
          for: "marketplace",
          ques: faq.ques,
          ans: faq.ans,
        };

        await Post("admin/create/faq", obj);
        onClose();
        toast.success("Faq added successfully");
        getFaq();
        setLoading(false)
      } catch (error) {
        // console.log(error);
        setLoading(false)

      }
    }
  };

  const getFaq = async () => {
    setLoading(true)
    try {
      const res = await Get("admin/get/faq?for=marketplace");
      setFaqData(res?.data?.faq);
      setUpdateDate((prev) => ({ ...prev, Faq: res?.data?.faq[0]?.updatedAt }));
      setLoading(false)
    } catch (error) {
      // console.log(error);
      setLoading(false)

    }
  };

  const getFAQById = async (id) => {
    try {
      const res = await Get(`admin/get/faq?faq_id=${id}`);
      setFaq(res.data.faq);
      onOpen();
      setIsEdit(true);
      setIsViewMore(false)
      setLoading(false)
    } catch (error) {
      // console.log(error);
      setLoading(false)

    }
  };

  // view more
  const viewMore = async (id) => {
    try {
      const res = await Get(`admin/get/faq?faq_id=${id}`);
      setFaq(res.data.faq);
      onOpen();
      setIsViewMore(true)
      setLoading(false)
    } catch (error) {
      // console.log(error);
      setLoading(false)

    }
  };


  const editFAQ = async () => {
    try {
      const obj = {
        type: "faq",
        id: faq._id,
        ques: faq.ques,
        ans: faq.ans,
      };
      setLoading(true);
      await Patch("admin/update/genral/mgmt", obj);
      onClose();
      toast.success("Successfully updated");
      await getFaq();
      setLoading(false)
    } catch (error) {
      // console.log(error);
      setLoading(false)

    }
  };

  const deleteFaq = async (_id) => {
    try {
      const obj = {
        id: _id,
      };
      await Post("admin/delete/faq", obj);
      toast.error("Deleted");
      await getFaq();
      setLoading(false);
    } catch (error) {
      // console.log(error);
      setLoading(false)
    }
  };


  // Docs section
  const addDocs = async () => {
    if (!docType.document_name || docType.document_name.trim() === "") {
      toast.error("Document name is required");
    } else {
      try {
        const obj = { type: "marketplace", document_name: docType.document_name };
        await Post("admin/create/docs", obj);
        toast.success("Docs added successfully");
        onClose1();
        uploadedDocs();
      } catch (error) {
        // console.log(error);
        setLoading(false)
      }
    }
  };

  const uploadedDocs = async () => {
    setLoading(true)
    try {
      const res = await Get("admin/get/docs?type=marketplace");
      setUploadedDoc(res.data.data);
      setUpdateDate((prev) => ({
        ...prev,
        uploadDocs: res?.data?.data[res?.data?.data.length - 1]?.updatedAt,
      }));
    } catch (error) {
      // console.log(error);
      setLoading(false)

    }
  };
  const uploadedDocsById = async (id) => {
    try {
      await Get(`admin/get/docs?doc_id=${id}&type=marketplace`).then((res) => {
        setDocType(res.data.data);
        onOpen1();
        setIsEdit1(true);
      })

    } catch (error) {
      // console.log(error);
      setLoading(false)
    }
  };


  const editDocs = async () => {
    if (!docType.document_name || docType.document_name.trim() === "") {
      toast.error("required");
    } else {
      try {
        let obj = {
          is: "edit",
          doc_id: docType._id,
          document_name: docType.document_name,
        };

        await Post("admin/edit/delete/docs/type", obj);
        onClose1();
        uploadedDocs();
        toast.success("Successfully updated");
      } catch (err) {
        // console.log(err);
        setLoading(false)
      }
    }
  };
  const deleteDocs = async (_id) => {
    try {
      const obj = {
        is: "delete",
        doc_id: _id,
      };
      await Post("admin/edit/delete/docs/type", obj);
      uploadedDocs();
      toast.error("Deleted");
    } catch (error) {
      // console.log(error);
      setLoading(false)
    }
  };

  // delete video
  const deleteVideo = async (_id) => {
    try {
      let obj = {
        id: _id,
      };
      await Post(`admin/delete/tutorials`, obj).then((res) => {
        toast.error("Deleted");
        getVideo("videos");
      });
    } catch (err) {
      setLoading(false)
    }
  };


  // Tetimonials-
  const [testimonials, setTestimonials] = useState([]);
  const getTestimonials = async (_id) => {
    try {
      await Get(`admin/testimonialListing`)
        .then((res) => {
          setTestimonials(res?.data?.data)
        });
    } catch (err) {
      setLoading(false)
    }
  };

  const updateTestimonial = async (data) => {
    try {
      await Patch(`admin/update/status/testimonial`, data)
        .then((res) => {
          getTestimonials()
        });
    } catch (err) {
      setLoading(false)
    }
  };

  const deleteTestimonial = async (data) => {
    try {
      setLoading(true);
      await Post(`admin/deletetestimonials`, data)
        .then((res) => {
          getTestimonials()
          toast.success("Deleted successfully");
          setLoading(false);
        });
    } catch (err) {
      setLoading(false);
    }
  };


  // Promocode-
  const [promo, setPromo] = useState({
    open: false,
    content: [],
    addPromoPayload: {},
    promoList: []
  })

  const getContentForPromocode = async () => {
    try {
      setLoading(true);
      const res = await Get(`admin/Content/MoreThan/ThreeOffer?sortField=createdAt&sortOrder=-1`);
      setLoading(false);
      setPromo({ ...promo, open: true, content: res?.data?.data })
    } catch (err) {
      setLoading(false)
    }
  };

  const getPromocode = async () => {
    try {
      setLoading(true);
      const res = await Get(`admin/getpromotionCodes?limit=1000`);
      setLoading(false);
      setPromo({ ...promo, promoList: res?.data?.data, open: false })
    } catch (err) {
      setLoading(false)
    }
  };

  const addPromocode = async () => {
    try {
      const data = {
        duration: "once",
        percent_off: promo?.addPromoPayload?.promo_discount,
        id: promo?.addPromoPayload?.promo_name,
        code: promo?.addPromoPayload?.promo_name,
        coupon: promo?.addPromoPayload?.promo_name,
        expires_at: new Date(`${promo?.addPromoPayload?.expire_date} ${promo?.addPromoPayload?.expire_time}`).getTime(),
        expire_date_time: new Date(`${promo?.addPromoPayload?.expire_date} ${promo?.addPromoPayload?.expire_time}`),
        applies_to: {
          products: [promo?.addPromoPayload?.content]
        }
      }
      setLoading(true);
      const res = await Post("admin/create/PromotionCodes", data);
      if (res) {
        setLoading(false);
        getPromocode();
        toast.success("Promocode added successfully");
        setPromo({
          ...promo,
          open: false,
          addPromoPayload: {}
        })
      }
    }
    catch (error) {
      // console.log(error);
      setLoading(false);
    }
  }

  const deletPromocode = async (id) => {
    try {
      setLoading(true);
      await Delete(`admin/deletepromotionCodes/${id}`);
      getPromocode();
      setLoading(false);
    } catch (err) {
      setLoading(false)
    }
  };

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


  // Discount-
  const [discount, setDiscount] = useState({
    open: false,
    content: [],
    addDiscountPayload: {}
  })


  const getContentForDiscount = async () => {
    try {
      setLoading(true);
      const res = await Get(`admin/Content/MoreThan/ThreeOffer?type=discount&limit=100&sortField=createdAt&sortOrder=-1`);
      setLoading(false);
      setDiscount({ ...discount, open: false, content: res?.data?.data })
    } catch (err) {
      setLoading(false)
    }
  };

  const handleDiscount = (type, name, value, index) => {
    setDiscount((prev) => {
      const updatedData = { ...prev };
      updatedData.content[index][name] = value;
      return updatedData;
    })
  }

  const addDiscount = async () => {
    try {
      const discountedData = discount?.content?.filter((el) => el?.isCheck && !el?.sales_prefix)?.map((el) => {
        return {
          id: el?._id,
          updatedObj: {
            isCheck: true,
            content_view_type: discount?.addDiscountPayload?.sales_prefix,
            sales_prefix: discount?.addDiscountPayload?.sales_prefix,
            discount_percent: discount?.addDiscountPayload?.discount_percent,
            discount_valid: discount?.addDiscountPayload?.discount_valid,
            before_discount_value: el?.ask_price,
            ask_price: el?.ask_price - (el?.ask_price * discount?.addDiscountPayload?.discount_percent) / 100,
            original_ask_price: el?.original_ask_price - (el?.original_ask_price * discount?.addDiscountPayload?.discount_percent) / 100
          }
        }
      });

      setLoading(true);
      const res1 = await Patch("admin/updateMultipleContent", { content: discountedData });
      if (res1) {
        setLoading(false);
        getContentForDiscount();
        toast.success("Discount applied successfully");
        setDiscount({
          ...discount,
          open: false,
          addDiscountPayload: {}
        })
      }
    }
    catch (error) {
      // console.log(error);
      setLoading(false);
    }
  }


  // Add notification-
  const [notification, setNotification] = useState({
    open: false,
    title: "",
    body: "",
    receiver_id: []
  })

  const sendNotification = async () => {
    try {
      const receiverId = notification?.receiver_id?.map((el) => el?.value)
      if (notification.receiver_id.length == 0) return;
      setLoading(true);
      await Post("admin/sendNotification", { ...notification, receiver_id: receiverId });
      setNotification({
        open: false,
        title: "",
        body: "",
        receiver_id: []
      })
      toast.success("Promocode sent");
      setLoading(false);
    }
    catch (error) {
      setLoading(false);
    }
  }

  useEffect(() => {
    getVideo("videos");
    getFaq();
    uploadedDocs();
    getTestimonials();
    getPromocode();
    getContentForDiscount();
    getMediahouseList()
  }, []);

  useEffect(() => {
    getDate();
  }, []);

  // print  

  const handlePrint = () => {
    if (tableRef.current) {
      const printWindow = window.open('', '_blank');
      printWindow.document.open();
      printWindow.document.write(`
        <html>
          <head>
            <title>Print</title>
            <style>
              body {
                font-family: Arial, sans-serif;               
              }
              .print-table {
                width: 100%;
                border-collapse: collapse;
              }
              .print-table th, .print-table td {
                border: 1px solid black;
                padding: 8px;
              }
              table{
                width:100%;
              }
              td {
                padding-bottom: 20px;
            }
            </style>
          </head>
          <body>
            ${tableRef.current.outerHTML}
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };


  // print upload docs

  const tableRef1 = useRef(null);

  const handlePrint1 = () => {
    let printWindow = window.open('', '_blank');
    if (tableRef1.current) {
      printWindow.document.open();
      printWindow.document.write(`
      <html>
        <head>
          <title>Print</title>
          <style>
            body {
              font-family: Arial, sans-serif;               
            }
            .print-table {
              width: 100%;
              border-collapse: collapse;
            }
            .print-table th, .print-table td {
              border: 1px solid black;
              padding: 8px;
            }
            table {
              width: 100%;
            }
            td {
              padding-bottom: 20px;
            }
          </style>
        </head>
        <body>
          ${tableRef1.current.outerHTML}
        </body>
      </html>
    `);
      printWindow.document.close();
      printWindow.print();
      setTimeout(() => {
        printWindow.close();
      }, 100);
    }
  };



  return (
    <>
      {loading && <Loader />}
      <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
        <Flex className="cms_tabs_wrap" mb="25px" gap="25px">
          <Tabs>
            {/* tablist start  */}

            <TabList className="tabs_btns genrl_tbs_wrap catgr_tbs" w="375px">
              <Tab onClick={() => setActiveClass((pre) => ({
                ...pre,
                uploadedDoc: "active",
                privacyPolicy: "",
                legal: "",
                faq: "",
                tutorial: "",
                testimonial: "",
              }))} >
                <div className="cms_left_card w_100">
                  <div className="cms_items " >
                    <div className={`cms_link ${activeClass.uploadedDoc}`}>
                      <div className="hding">
                        <p>Upload docs</p>
                      </div>
                      <div className="bdy">
                        <span>
                          {updateDate && updateDate.uploadDocs && (
                            <span>
                              Updated on {moment(updateDate.uploadDocs).format("DD MMMM YYYY")}
                            </span>
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Tab>

              <Tab onClick={() => {
                setType("privacy_policy")
                setActiveClass((pre) => ({
                  ...pre,
                  uploadedDoc: "",
                  privacyPolicy: "active",
                  legal: "",
                  faq: "",
                  tutorial: "",
                  testimonial: ""
                }))

              }}>
                <div className="cms_left_card w_100">
                  <div className="cms_items">
                    <div className={`cms_link ${activeClass.privacyPolicy}`}>
                      <div className="hding">
                        <p>Privacy policy</p>
                      </div>
                      <div className="bdy">
                        <span>
                          {updateDate && updateDate.privacy_policy && (
                            <span>
                              Updated on {moment(updateDate.privacy_policy).format("DD MMMM YYYY")}
                            </span>
                          )}
                        </span>
                        {/* <span>
                      
                          {updateDate && updateDate.privacy_policy ? (
                            <span>
                              Updated on {moment(updateDate.privacy_policy).format("DD MMMM YYYY")}
                            </span>
                          ) : null}
                        </span> */}

                      </div>
                    </div>
                  </div>
                </div>
              </Tab>

              <Tab onClick={() => {
                setType("legal")
                setActiveClass((pre) => ({
                  ...pre,
                  uploadedDoc: "",
                  privacyPolicy: "",
                  legal: "active",
                  faq: "",
                  tutorial: "",
                  testimonial: "",
                }))
              }}>
                <div className="cms_left_card w_100">
                  <div className="cms_items">
                    <div className={`cms_link ${activeClass.legal}`}>
                      <div className="hding">
                        <p>Legal T&Cs</p>
                      </div>
                      <div className="bdy">

                        <span>
                          {updateDate && updateDate.legalTerms && (
                            <span>
                              Updated on {moment(updateDate.legalTerms).format("DD MMMM YYYY")}
                            </span>
                          )}
                        </span>

                        {/* <span>
                          Updated on{" "}
                          {moment(updateDate?.legalTerms).format(
                            "DD MMMM YYYY"
                          )}
                        </span> */}

                      </div>
                    </div>
                  </div>
                </div>
              </Tab>

              <Tab onClick={() => setActiveClass((pre) => ({
                ...pre,
                uploadedDoc: "",
                privacyPolicy: "",
                legal: "",
                faq: "",
                tutorial: "active",
                testimonial: "",
              }))} >
                <div className="cms_left_card w_100">
                  <div className="cms_items">
                    <div className={`cms_link ${activeClass.tutorial}`}>
                      <div className="hding">
                        <p>Tutorials</p>
                      </div>
                      <div className="bdy">
                        <span>
                          {video && video[video.length - 1]?.updatedAt && (
                            <span>
                              Updated on {moment(video[video.length - 1]?.updatedAt).format("DD MMMM YYYY")}
                            </span>
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Tab>

              <Tab
                onClick={() => setActiveClass((pre) => ({
                  ...pre,
                  uploadedDoc: "",
                  privacyPolicy: "",
                  legal: "",
                  faq: "active",
                  tutorial: "",
                  testimonial: "",
                }))}
              >
                <div className="cms_left_card w_100">
                  <div className="cms_items">
                    <div className={`cms_link ${activeClass.faq}`}>
                      <div className="hding">
                        <p>FAQs</p>
                      </div>
                      <div className="bdy">
                        <span>
                          {updateDate && updateDate.Faq && (
                            <span>
                              Updated on {moment(updateDate.Faq).format("DD MMMM YYYY")}
                            </span>
                          )}
                        </span>

                        {/* <span>
                          Updated on{" "}
                          {moment(updateDate?.Faq).format("DD MMMM YYYY")}
                        </span> */}
                      </div>
                    </div>
                  </div>
                </div>
              </Tab>

              <Tab
                onClick={() => setActiveClass((pre) => ({
                  ...pre,
                  uploadedDoc: "",
                  privacyPolicy: "",
                  legal: "",
                  Discount: "",
                  tutorial: "",
                  testimonial: "",
                  discount: "active"
                }))}
              >
                <div className="cms_left_card w_100">
                  <div className="cms_items">
                    <div className={`cms_link ${activeClass.discount}`}>
                      <div className="hding">
                        <p>Discount</p>
                      </div>
                      <div className="bdy">
                        <span>
                          {updateDate && updateDate.Faq && (
                            <span>
                              Updated on {moment(updateDate.Faq).format("DD MMMM YYYY")}
                            </span>
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Tab>

              <Tab
                onClick={() => setActiveClass((pre) => ({
                  ...pre,
                  uploadedDoc: "",
                  privacyPolicy: "",
                  legal: "",
                  faq: "active",
                  tutorial: "",
                  testimonial: "",
                }))}
              >
                <div className="cms_left_card w_100">
                  <div className="cms_items">
                    <div className={`cms_link ${activeClass.faq}`}>
                      <div className="hding">
                        <p>Promo Code</p>
                      </div>
                      <div className="bdy">
                        <span>
                          {updateDate && updateDate.Faq && (
                            <span>
                              Updated on {moment(updateDate.Faq).format("DD MMMM YYYY")}
                            </span>
                          )}
                        </span>

                        {/* <span>
                          Updated on{" "}
                          {moment(updateDate?.Faq).format("DD MMMM YYYY")}
                        </span> */}
                      </div>
                    </div>
                  </div>
                </div>
              </Tab>

              <Tab
                onClick={() => setActiveClass((pre) => ({
                  ...pre,
                  uploadedDoc: "",
                  privacyPolicy: "",
                  legal: "",
                  testimonial: "active",
                  tutorial: "",
                  faq: ""
                }))}
              >
                <div className="cms_left_card w_100">
                  <div className="cms_items">
                    <div className={`cms_link ${activeClass.testimonial}`}>
                      <div className="hding">
                        <p>Testimonials</p>
                      </div>
                      <div className="bdy">
                        <span>
                          {updateDate && updateDate.Testimonial && (
                            <span>
                              Updated on {moment(updateDate.Testimonial).format("DD MMMM YYYY")}
                            </span>
                          )}
                        </span>

                        {/* <span>
                          Updated on{" "}
                          {moment(updateDate?.Faq).format("DD MMMM YYYY")}
                        </span> */}
                      </div>
                    </div>
                  </div>
                </div>
              </Tab>
            </TabList>

            {/* tablist ends  */}

            <TabPanels className="cms_tabs_data catg_tbs_card">
              <TabPanel>
                {/* <Tablecard type={type} update={handleUpdate} /> */}
                {/* Uploaded docs start */}
                <Card
                  direction="column"
                  w="610px"
                  px="0px"
                  p="17px"
                  h="737px"
                  overflowX={{ sm: "scroll", lg: "hidden" }}
                >
                  <Flex
                    px="20px"
                    pe="37px"
                    justify="space-between"
                    mb="20px"
                    align="center"
                  >
                    <Text
                      className="crd_edit_hdng"
                      color={textColor}
                      fontSize="22px"
                      fontWeight="700"
                      lineHeight="100%"
                      fontFamily={"AirbnbBold"}
                    >
                      Upload docs
                      {/* <span className="updt_date">
                        Updated on{" "}
                        {moment(updateDate?.uploadDocs).format("DD MMMM YYYY")}
                      </span>{" "} */}
                      <span className="updt_date" >
                        {updateDate && updateDate.uploadDocs && (
                          <span>
                            Updated on {moment(updateDate.uploadDocs).format("DD MMMM YYYY")}
                          </span>
                        )}
                      </span>
                    </Text>

                    <div className="opt_icons_wrap cms_icns">
                      <img src={shareic} alt="print" />
                      <span onClick={() => handlePrint1()}>
                        <img src={printic} alt="print" />
                      </span>


                      <a
                        onClick={() => {
                          onOpen1();
                          setIsEdit1(false);
                          setDocType("")
                          uploadedDocs();

                        }}
                        className="txt_danger_mdm"
                      >
                        Add
                      </a>
                    </div>
                  </Flex>
                  <TableContainer className="fix_ht_table" ref={tableRef1}>
                    <Table
                      mx="20px"
                      w="93%"
                      variant="simple"
                      className="common_table"
                    >
                      <Thead>
                        <Tr>
                          <Th w="90%">Document name</Th>
                          <Th w="10%">Action</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {uploadedDoc &&
                          uploadedDoc.map((curr) => {
                            return (
                              <Tr>
                                <Td w="43.3%" className="contact_details">
                                  {curr?.document_name}
                                </Td>
                                <Td w="33.3%">
                                  <div className="catmang_icns">

                                    <a onClick={() => {
                                      uploadedDocsById(curr._id);
                                    }}
                                    >
                                      <img
                                        className="icn"
                                        src={writeic}
                                        alt="write"
                                      />
                                    </a>
                                    <AiOutlineDelete className="icn"
                                      onClick={() => deleteDocs(curr._id)}
                                    />
                                  </div>
                                </Td>
                              </Tr>
                            );
                          })}
                      </Tbody>
                    </Table>
                  </TableContainer>
                </Card>
                {/* Uploaded docs End */}
              </TabPanel>

              <TabPanel>
                <Tablecard type={type} update={handleUpdate} />
              </TabPanel>

              <TabPanel>
                <Tablecard type={type} update={handleUpdate} />
              </TabPanel>

              <TabPanel>
                <Card
                  className="rt_txt_edtr_wrap"
                  direction="column"
                  w="610px"
                  px="0px"
                  p="17px"
                  h="737px"
                  overflowX={{ sm: "scroll", lg: "hidden" }}
                >
                  <Flex
                    px="20px"
                    justify="space-between"
                    mb="27px"
                    align="center"
                  >
                    <Text
                      className="crd_edit_hdng"
                      color={textColor}
                      fontSize="22px"
                      fontWeight="700"
                      lineHeight="100%"
                      fontFamily={"AirbnbBold"}
                    >
                      Tutorials
                      {/* <span className="updt_date">
                        {moment(video[video.length - 1]?.updatedAt).format(
                          "DD MMMM YYYY"
                        )}
                        ,
                      </span> */}
                      <span className="updt_date">
                        {video && video[video.length - 1]?.updatedAt && (
                          <span>
                            Updated on {moment(video[video.length - 1]?.updatedAt).format("DD MMMM YYYY")}
                          </span>
                        )}
                      </span>
                    </Text>
                    <div className="opt_icons_wrap cms_icns">
                      <a
                        onClick={() => setShow(!show)}
                        className="txt_danger_mdm"
                      >
                        Add
                      </a>
                    </div>
                  </Flex>

                  <Container
                    className="inner_card_wrap tandc inner_cont_edit"
                    maxW="900px"
                    color="black"
                  >
                    <div className="ttrl_vds_wrap marketplacae">
                      {video &&
                        video.map((curr) => {
                          return (
                            <div className="ttr_vd position-relative">
                              <span class="dlt-iccn" onClick={() => deleteVideo(curr?._id)}>
                                <img src={dltIcn} />

                              </span>
                              <video
                                src={curr?.video}
                                controls
                                width="320"
                                height="240"
                              />
                              <div className="top"></div>
                              <div className="btm">
                                <Text
                                  className="desc"
                                  fontSize="14px"
                                  fontFamily="AirbnbBold"
                                >
                                  {curr?.description}
                                </Text>
                              </div>
                            </div>
                          );
                        })}

                      {show && (
                        <div className="ttr_vd upload_mrktpl">
                          <div className="close_upld" onClick={() => {
                            setShow(!show);
                            setVideoPreview(null);
                            setSelected(false);
                            setShowUpload(true);
                          }}>
                            <img src={closeic} alt="close" className="icn cursor-pointer" />
                          </div>
                          <div className="top">
                            <div className="dtl_wrap_img">
                              <div className="Admin_img" align="center">
                                <div className="edit_img_curr">
                                  {showUpload === true ? (
                                    <img
                                      src={AddPic}
                                      alt="Add icon"
                                      className="upld_icn"
                                    />
                                  ) : (
                                    ""
                                  )}
                                  {showUpload === true ? (
                                    <p>Upload video</p>
                                  ) : (
                                    ""
                                  )}

                                  <input
                                    type="file"
                                    id="admin_img_curr"
                                    name="profile_image"
                                  />
                                  <input
                                    accept="video/*"
                                    type="file"
                                    onChange={handleFileSelect}
                                    disabled={selected}
                                  />

                                  {videoPreview && (
                                    <video
                                      className="uplded_vd"
                                      src={videoPreview}
                                      controls
                                      width="320"
                                      height="240"
                                    />
                                  )}

                                  {videoUrl && (
                                    <video src={videoUrl} controls />
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="btm">
                            <input
                              className="desc"
                              fontSize="14px"
                              fontFamily="AirbnbMedium"
                              placeholder="Add a header up to 2 lines"
                              value={videoDescp}
                              name="videoDescp"
                              onChange={(e) => setVideoDescp(e.target.value)}
                            />
                          </div>
                          <div className="btm_inn">
                            <Button
                              className="theme_btn"
                              fontFamily="AirbnbBold"
                              fontSize="12px"
                              fontWeight="bold"
                              onClick={() => handleFileUpload("videos")}
                            >
                              Save
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </Container>
                </Card>
              </TabPanel>

              <TabPanel >
                <Card
                  className="rt_txt_edtr_wrap"
                  direction="column"
                  w="610px"
                  px="0px"
                  p="17px"
                  h="737px"
                  overflowX={{ sm: "scroll", lg: "hidden" }}
                >
                  <Flex
                    px="20px"
                    justify="space-between"
                    mb="27px"
                    align="center"
                  >
                    <Text
                      className="crd_edit_hdng"
                      color={textColor}
                      fontSize="22px"
                      lineHeight="100%"
                      fontFamily={"AirbnbBold"}
                    >
                      FAQs

                      <span className="updt_date">
                        {updateDate && updateDate.Faq && (
                          <span>
                            Updated on {moment(updateDate.Faq).format("DD MMMM YYYY")}
                          </span>
                        )}
                      </span>
                      {/* <span className="updt_date">
                        Updated on{" "}
                        {moment(updateDate?.Faq).format("DD MMMM YYYY")}
                      </span> */}
                    </Text>
                    <div className="opt_icons_wrap cms_icns">
                      <img src={shareic} alt="print" />
                      <span onClick={() => handlePrint()}>
                        <img src={printic} alt="print" />
                      </span>
                      <a
                        onClick={() => {
                          onOpen();
                          setIsEdit(false);
                          setFaq("");
                          getFaq();
                          setIsViewMore(false)
                        }}
                        className="txt_danger_mdm"
                      >
                        Add
                      </a>
                    </div>
                  </Flex>
                  <Container
                    className="inner_card_wrap tandc inner_cont_edit"
                    maxW="900px"
                    color="black"
                  >
                    <TableContainer className="fix_ht_table" ref={tableRef}>
                      <Table
                        mx="0px"
                        w={"fit-content"}
                        variant="simple"
                        className="common_table"
                      >
                        <Thead>
                          <Tr>
                            <Th w="43%">Question</Th>
                            <Th w="43%" className="">
                              Answer
                            </Th>
                            <Th w="14%">Action</Th>
                          </Tr>
                        </Thead>

                        <Tbody>
                          {faqData &&
                            faqData.map((curr) => {
                              return (
                                <Tr key={curr._id}>
                                  <Td className="">{curr?.ques}</Td>
                                  <Td className="">{curr?.ans}</Td>
                                  <Td>
                                    <div className="catmang_icns">
                                      <BsEye className="icn" onClick={() => viewMore(curr?._id)} />
                                      <a
                                        onClick={() => {
                                          getFAQById(curr._id);
                                        }}
                                      >
                                        <img
                                          className="icn"
                                          src={writeic}
                                          alt="write"
                                        />
                                      </a>
                                      {/* <AiOutlineDelete
                                        className="icn"
                                        onClick={() => deleteFaq(curr._id)}
                                      /> */}
                                      <PopupConfirm
                                        title="Confirmation"
                                        description="Are you sure you want to delete this faq?"
                                        onConfirm={() => deleteFaq(curr._id)}
                                        buttonTitle={"AiOutlineDelete"}
                                      />
                                    </div>
                                  </Td>
                                </Tr>
                              );
                            })}
                        </Tbody>
                      </Table>
                    </TableContainer>
                  </Container>
                </Card>
              </TabPanel>

              <TabPanel >
                <Card className="testimonail-card">
                  <div className="testimonaial-header">
                    <h2>Discount</h2>
                    <span>Updated on 15 January, 2023</span>
                  </div>
                  <div className="discount-container">
                    {
                      discount?.content?.map((el, i) => <div className="discount-wrapper" key={i}>
                        <Card className="discount-card">
                          <div className="position-relative cont_type_wrap">
                            <span className="icon-dis">
                              <div className="conttp">
                                <div className="cont_inner">
                                  <span>{el?.content?.length}</span>
                                  <img src={camera} alt="camera" />
                                </div>
                              </div>
                            </span>
                            <div className="discount-img">
                              <img src={el?.content?.[0]?.watermark} alt="discount" />
                            </div>
                            <span className="discount-checkbox">
                              <Checkbox
                                colorScheme="brandScheme"
                                me="10px"
                                isChecked={el?.isCheck ? true : false}
                                disabled={el?.isCheck && el?.sales_prefix}
                                onChange={(e) => handleDiscount("change", "isCheck", e.target.checked, i)}
                              />
                            </span>
                          </div>

                          <div className="discount-cnt">
                            <h2>{el?.heading}</h2>
                            {
                              el?.type == "exclusive" ?
                                <svg width="17" height="12" viewBox="0 0 17 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path fill-rule="evenodd" clip-rule="evenodd" d="M1.174 1.82737V8.23486C1.174 9.79831 2.66889 11.0745 4.50033 11.0745H12.327C14.3463 11.0745 15.6533 9.95867 15.6533 8.23486V1.82737C15.6533 1.66702 15.6298 1.57348 15.6064 1.52002C15.5437 1.54675 15.4498 1.6002 15.3168 1.71379L13.2897 3.44428C12.7731 3.88525 11.8652 3.88525 11.3565 3.44428L8.54671 1.04564C8.46844 0.978829 8.34321 0.978829 8.27277 1.04564L5.47083 3.43759C4.95427 3.87857 4.04638 3.87857 3.53765 3.43759L1.51054 1.70711C1.37749 1.59352 1.27574 1.54007 1.22096 1.51334C1.19748 1.56679 1.174 1.66702 1.174 1.82737Z" stroke="#505050" stroke-width="1.4" />
                                </svg>
                                :
                                <img src={shared} />
                            }
                          </div>
                          <div className="action-container">
                            <div className="action-wrap">
                              <div className="time">
                                <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <g opacity="0.8">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M0.625 6.375C0.625 3.41 3.035 1 6 1C8.965 1 11.375 3.41 11.375 6.375C11.375 9.34 8.965 11.75 6 11.75C3.035 11.75 0.625 9.34 0.625 6.375ZM1.375 6.375C1.375 8.925 3.45 11 6 11C8.55 11 10.625 8.925 10.625 6.375C10.625 3.825 8.55 1.75 6 1.75C3.45 1.75 1.375 3.825 1.375 6.375Z" fill="black" />
                                    <path d="M7.66531 8.28781L6.11531 7.36281C5.73031 7.13281 5.44531 6.62781 5.44531 6.18281V4.13281C5.44531 3.92781 5.61531 3.75781 5.82031 3.75781C6.02531 3.75781 6.19531 3.92781 6.19531 4.13281V6.18281C6.19531 6.36281 6.34531 6.62781 6.50031 6.71781L8.05031 7.64281C8.23031 7.74781 8.28531 7.97781 8.18031 8.15781C8.10531 8.27781 7.98031 8.34281 7.85531 8.34281C7.79031 8.34281 7.72531 8.32781 7.66531 8.28781Z" fill="black" />
                                  </g>
                                </svg>
                                {moment(el?.createdAt)?.format("hh:mm A")}
                              </div>
                              <div className="time">
                                <svg width="11" height="12" viewBox="0 0 11 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M2.44434 5.32812H3.66656V6.42813H2.44434V5.32812ZM2.44434 7.52813H3.66656V8.62813H2.44434V7.52813ZM4.88878 5.32812H6.111V6.42813H4.88878V5.32812ZM4.88878 7.52813H6.111V8.62813H4.88878V7.52813ZM7.33322 5.32812H8.55545V6.42813H7.33322V5.32812ZM7.33322 7.52813H8.55545V8.62813H7.33322V7.52813Z" fill="black" />
                                  <path d="M8.30556 1.475V1.725H8.55556H9.77778C10.3392 1.725 10.75 2.13055 10.75 2.575V10.275C10.75 10.7195 10.3392 11.125 9.77778 11.125H1.22222C0.66081 11.125 0.25 10.7195 0.25 10.275V2.575C0.25 2.13055 0.66081 1.725 1.22222 1.725H2.44444H2.69444V1.475V0.625H3.41667V1.475V1.725H3.66667H7.33333H7.58333V1.475V0.625H8.30556V1.475ZM10.0278 3.67498L10.0278 3.425H9.77778H1.22222H0.972222V3.675V10.275V10.525H1.22222H9.77839H10.0284L10.0284 10.275L10.0278 3.67498Z" stroke="black" stroke-width="0.5" />
                                </svg>
                                {moment(el?.createdAt)?.format("DD MMM YYYY")}
                              </div>
                            </div>
                            <div className="two-btns">
                              {
                                el?.before_discount_value && <span className="cancel-price">£{el?.before_discount_value}</span>
                              }
                              <div className="discount-btn">
                                <Button
                                  className="btn_bg"
                                >
                                  Published
                                  £{el?.ask_price}
                                </Button>
                              </div>
                            </div>
                          </div>
                        </Card>
                      </div>)
                    }
                  </div>
                  <div className="save_btn_wrap">
                    <Button
                      className="btn_bg"
                      onClick={() => {
                        discount?.content?.filter((el) => el?.isCheck && !el?.sales_prefix)?.length > 0
                          ? setDiscount({ ...discount, open: true })
                          : toast.success("Please select content")
                      }}
                    >
                      Add Discount
                    </Button>
                  </div>
                </Card>
              </TabPanel>

              <TabPanel >
                <Card className="testimonail-card">
                  <div className="testimonial-wrapper">
                    <div className="testimonaial-header">
                      <h2>Promo code</h2>
                      <span>Updated on 15 January, 2023</span>
                    </div>
                    <div className="promo-container">
                      <TableContainer>
                        <Table variant='simple'>
                          <Thead>
                            <Tr>
                              <Th>Promo name</Th>
                              <Th>Promo discount (%)</Th>
                              <Th isNumeric>Action</Th>
                            </Tr>
                          </Thead>
                          <Tbody>
                            {
                              promo?.promoList?.map((el, i) => <Tr key={i}>
                                <Td>{el?.code?.toUpperCase()}</Td>
                                <Td>{el?.percent_off}</Td>
                                <Td isNumeric>
                                  <div className="svg-flex">
                                    {/* <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M7.14254 2.72275L8.52499 1.20207C8.76044 0.943061 9.14221 0.943061 9.37765 1.20207L10.9367 2.917C11.1721 3.17601 11.1721 3.59593 10.9367 3.85494L9.55425 5.37563M7.14254 2.72275L1.28987 9.16068C1.17681 9.28504 1.11328 9.45376 1.11328 9.62964V11.3446C1.11328 11.7109 1.38322 12.0078 1.71621 12.0078H3.27525C3.43515 12.0078 3.58851 11.9379 3.70158 11.8136L9.55425 5.37563M7.14254 2.72275L9.55425 5.37563" stroke="black" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg> */}
                                    <Tooltip label="Share">
                                      <span><IoShareOutline className="p-cursor" onClick={() => setNotification({ ...notification, open: true })} /></span>
                                    </Tooltip>
                                    <PopupConfirm
                                      title="Confirmation"
                                      description="Are you sure you want to delete this promo code?"
                                      onConfirm={() => deletPromocode(el.coupon)}
                                      buttonTitle={"AiOutlineDelete"}
                                    />
                                  </div>

                                </Td>
                              </Tr>)
                            }
                          </Tbody>
                        </Table>
                      </TableContainer>
                      <div className="save_btn_wrap">
                        <Button
                          className="btn_bg"
                          onClick={() => {
                            setPromo({ ...promo, open: true })
                            getContentForPromocode()
                          }}
                        >
                          Add Promo Code
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </TabPanel>

              <TabPanel >
                <Card className="testimonail-card">
                  <div className="testimonial-wrapper">
                    <div className="testimonaial-header">
                      <h2>Testimonials</h2>
                      <span>Updated on 15 January, 2023</span>
                    </div>
                    <p>Posted </p>
                    <div className="testimonial-container">
                      {
                        testimonials?.map((el, i) => <div class="rting-container">
                          <div className="position-relative">
                            <div className="testi-img">
                              <img src={el?.user_id?.admin_detail?.admin_profile || TestiImg} />
                              <PopupConfirm
                                title="Confirmation"
                                description="Are you sure you want to restore this testimonial?"
                                onConfirm={() => deleteTestimonial({ testimonials: [el?._id] })}
                                buttonTitle={"Testimonial"}
                              />
                              <span className="checkbox">
                                <Checkbox
                                  colorScheme="brandScheme"
                                  me="10px"
                                  isChecked={el?.status == "approved" ? true : false}
                                  onChange={(e) => {
                                    updateTestimonial({ testimonial_id: el?._id, status: el?.status == "approved" ? "pending" : "approved" })
                                  }}
                                />
                              </span>
                            </div>
                            <div className="testi-content d-flex gap-2">
                              <div className="testi-logo">
                                <img src={el?.user_id?.profile_image} />
                              </div>
                              <div className="cont-wrap">
                                <h4>{el?.user_id?.company_name}</h4>
                                <p>{el?.user_id?.full_name || el?.user_id?.admin_detail?.full_name}</p>
                                <div className="testi-star-rating d-flex gap-2">
                                  {
                                    Array.from({ length: +(el?.rate) }, (_, i) => <img src={star} alt="star" />)
                                  }
                                  {hasDecimal(el?.rate) && <img src={FillStar} alt="half_star" />}
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* <div class="overlay-bottom-slide">
                            <div className="withText-testi">
                              <span>
                                Presshop Customer Review
                              </span>
                              <h3>
                                “{
                                  el?.features?.length > 1
                                    ? `Impressed by the level of ${el?.features?.slice(0, -1)?.join(', ')?.toLowerCase()} and ${el.features.slice(-1).join('')?.toLowerCase()} of content`
                                    : `Impressed by the level of ${el.features.slice(-1).join('')?.toLowerCase()} of content`
                                }
                              </h3>
                              <p>{el?.description}“</p>
                            </div>
                          </div> */}
                        </div>)
                      }
                    </div>
                    <div className="save_btn_wrap">
                      <Button
                        className="btn_bg"
                        onClick={() => toast.success("Updated successfully")}
                      >
                        Save
                      </Button>
                    </div>
                  </div>
                </Card>
              </TabPanel>
            </TabPanels>
          </Tabs >
        </Flex >
      </Box >

      <Modal
        className="action_modal_wrap"
        isOpen={isOpen}
        onClose={() => {
          onClose();
          setIsEdit(false);
        }}
      >
        <ModalOverlay />
        <ModalContent className="action_modal_cont add_faq_mdl">
          <ModalBody>
            <Text fontFamily="AirbnbBold" fontSize="22px" mb="43px">
              {!isViewMore && isEdit ? "Edit FAQ" : !isViewMore ? "Add FAQ" : "View FAQ"}

            </Text>
            <div className="action_modal_body">
              <div className="add_faq_wrap">
                <Flex gap="20px" direction="column" className="faq_inp">
                  <div className="mdl_inp" flex={1}>
                    <Text mb="6px" fontSize="13px" fontFamily="AirbnbMedium">
                      Question
                    </Text>
                    <Input
                      placeholder="Enter your question"
                      value={faq.ques}
                      name="ques"
                      disabled={isViewMore}
                      onChange={(e) => {
                        setFaq((pre) => ({ ...pre, ques: e.target.value }));
                      }}
                    />
                  </div>
                  <div className="mdl_inp" flex={1}>
                    <Text mb="6px" fontSize="13px" fontFamily="AirbnbMedium">
                      Answer
                    </Text>
                    <Textarea
                      placeholder="Enter your answer"
                      value={faq.ans}
                      name="ans"
                      disabled={isViewMore}
                      onChange={(e) => {
                        setFaq((pre) => ({ ...pre, ans: e.target.value }));
                      }}
                    />
                  </div>
                </Flex>
              </div>
              <div className="save_btn_wrap">
                {!isViewMore &&
                  <Button
                    className="btn_bg"
                    onClick={() => (isEdit ? editFAQ() : addFaq())}
                  >
                    Save
                  </Button>

                }

              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* document Upload Modal start */}
      <Modal
        className="action_modal_wrap"
        isOpen={isOpen1}
        onClose={() => {
          onClose1();
          setIsEdit1(false);
        }}
        show
      >
        <ModalOverlay />
        <ModalContent className="action_modal_cont catg_modal_cont">
          <ModalBody>
            <Text
              fontFamily="AirbnbBold"
              fontSize="22px"
              mb="43px"
              fontWeight="bold"
              ms="28px"
            >
              {isEdit1 ? "Edit" : "Add"} Docs
            </Text>
            <div className="action_modal_body">
              <div className="dtl_wrap mdl_itms">
                <Flex
                  className="edit_inputs_wrap"
                  px="0px"
                  justify="space-between"
                  gap="20px"
                  mb="0px"
                  align="center"
                >
                  <div className="mdl_inp">
                    <Text mb="6px" fontSize="13px" fontFamily="AirbnbMedium">
                      Document name
                    </Text>
                    <Input
                      placeholder="Enter category name"
                      value={docType.document_name}
                      onChange={(e) => setDocType((pre) => {
                        return (
                          { ...pre, document_name: e.target.value }
                        )
                      })}
                    />
                  </div>
                </Flex>
              </div>
              <div className="save_btn_wrap">
                <Button
                  className="btn_bg"
                  onClick={() => (isEdit1 ? editDocs() : addDocs())}
                >
                  Save
                </Button>
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
      {/* Document Upload Modal End */}

      {/* Add Promo Code */}

      <Modal className="action_modal_wrap" isOpen={promo.open} onClose={() => setPromo({ ...promo, open: false })}>
        <ModalOverlay />
        <ModalContent className="action_modal_cont">
          <ModalBody>
            <Text
              fontFamily='AirbnbBold'
              fontSize='35px'
              mb='43px'>
              Add Promo Code
            </Text>
            <div className="action_modal_body promo-modal">
              <div className="dtl_wrap mdl_itms">
                <Flex className="edit_inputs_wrap"
                  w="50%" px='0px' justify='space-between' gap='20px' mb="0px" align='center'>
                  <div className="mdl_inp">
                    <Text mb='6px'
                      fontSize='13px'
                      fontFamily='AirbnbMedium'>
                      Promo code name
                    </Text>
                    <Input
                      placeholder="Enter promo name"
                      onChange={(e) => setPromo({ ...promo, addPromoPayload: { ...promo.addPromoPayload, promo_name: e.target.value } })}
                      onKeyPress={(e) => {
                        if (e.key === ' ') {
                          e.preventDefault();
                        }
                      }}
                    />

                  </div>
                  <div className="mdl_inp">
                    <Text mb='6px'
                      fontSize='13px'
                      fontFamily='AirbnbMedium'>
                      Promo code discount
                    </Text>
                    <Input placeholder="Enter discount value" type="number" onChange={(e) => setPromo({ ...promo, addPromoPayload: { ...promo.addPromoPayload, promo_discount: e.target.value } })} />
                  </div>
                </Flex>
                <Flex className="edit_inputs_wrap"
                  w="50%" px='0px' justify='space-between' gap='20px' mb="0px" align='center'>
                  <div className="mdl_inp">
                    <Text mb='6px'
                      fontSize='13px'
                      fontFamily='AirbnbMedium'>
                      Promo code validity (date)
                    </Text>
                    <Input
                      type="date"
                      placeholder="DD/MM/YYYY"
                      onChange={(e) => setPromo({ ...promo, addPromoPayload: { ...promo.addPromoPayload, expire_date: e.target.value } })}
                      onKeyPress={(e) => {
                        if (e.key === ' ') {
                          e.preventDefault();
                        }
                      }}
                    />

                  </div>
                  <div className="mdl_inp">
                    <Text mb='6px'
                      fontSize='13px'
                      fontFamily='AirbnbMedium'>
                      Promo code validity (time)
                    </Text>
                    <Input type="time" placeholder="HH:MM" onChange={(e) => setPromo({ ...promo, addPromoPayload: { ...promo.addPromoPayload, expire_time: e.target.value } })} />
                  </div>
                </Flex>
              </div>
              <div className="save_btn_wrap">
                <Button className="btn_bg" onClick={() => addPromocode()}>Save</Button>
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Add discount */}
      <Modal className="action_modal_wrap" isOpen={discount.open} onClose={() => setDiscount({ ...discount, open: false })}>
        <ModalOverlay />
        <ModalContent className="action_modal_cont">
          <ModalBody>
            <Text
              fontFamily='AirbnbBold'
              fontSize='35px'
              mb='43px'>
              Add discount
            </Text>
            <div className="action_modal_body promo-modal">
              <div className="dtl_wrap mdl_itms">
                <Flex className="edit_inputs_wrap"
                  w="50%" px='0px' justify='space-between' gap='20px' mb="0px" align='center'>
                  <div className="mdl_inp">
                    <Text mb='6px'
                      fontSize='13px'
                      fontFamily='AirbnbMedium'>
                      Sales prefix
                    </Text>
                    <Input
                      placeholder="Enter promo name"
                      onChange={(e) => setDiscount({ ...discount, addDiscountPayload: { ...discount.addDiscountPayload, sales_prefix: e.target.value } })}
                    />

                  </div>
                  <div className="mdl_inp">
                    <Text mb='6px'
                      fontSize='13px'
                      fontFamily='AirbnbMedium'>
                      Discount percentage
                    </Text>
                    <Input placeholder="Enter discount value" type="number" onChange={(e) => setDiscount({ ...discount, addDiscountPayload: { ...discount.addDiscountPayload, discount_percent: e.target.value } })} />
                  </div>
                </Flex>
                {/* <Flex className="edit_inputs_wrap"
                  w="50%" px='0px' justify='space-between' gap='20px' mb="0px" align='center'>
                  <div className="mdl_inp">
                    <Text mb='6px'
                      fontSize='13px'
                      fontFamily='AirbnbMedium'>
                      Discount valid till
                    </Text>
                    <Input
                      placeholder="Enter promo name"
                      onChange={(e) => setPromo({ ...promo, addPromoPayload: { ...promo.addPromoPayload, promo_name: e.target.value } })}
                      onKeyPress={(e) => {
                        if (e.key === ' ') {
                          e.preventDefault();
                        }
                      }}
                    />

                  </div>
                  <div className="mdl_inp">
                    <Text mb='6px'
                      fontSize='13px'
                      fontFamily='AirbnbMedium'>
                      Promo discount
                    </Text>
                    <Input placeholder="Enter discount value" type="number" onChange={(e) => setPromo({ ...promo, addPromoPayload: { ...promo.addPromoPayload, promo_discount: e.target.value } })} />
                  </div>
                </Flex> */}
              </div>
              <div className="save_btn_wrap">
                <Button className="btn_bg" onClick={() => addDiscount()}>Save</Button>
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Send Notifcation */}
      <Modal isOpen={notification.open} onClose={() => setNotification({ ...notification, open: false })}>
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
                      value={notification.receiver_id}
                      onChange={(e) => setNotification({ ...notification, receiver_id: e })}
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
                    value={notification.title}
                    onChange={(e) => setNotification({ ...notification, title: e.target.value })}
                  />
                </div>
                <div className="ntf_itm_wrap">
                  <Text mb="6px" fontSize="15px" fontFamily="AirbnbMedium">
                    Notification Description
                  </Text>

                  <Textarea
                    placeholder="Enter description"
                    value={notification.body}
                    onChange={(e) => setNotification({ ...notification, body: e.target.value })}
                  />
                </div>
                <div className="btn_wrap text_center">
                  <Button
                    mt="20px"
                    w="200px"
                    fontFamily="AirbnbBold"
                    fontSize="15px"
                    className="theme_btn"
                    onClick={() => sendNotification()}
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
}