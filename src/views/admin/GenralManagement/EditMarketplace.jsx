import React, { useEffect, useState, useRef } from "react";
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
} from "@chakra-ui/react";
import Card from "components/card/Card";
import { useHistory } from "react-router-dom";
import printic from "assets/img/icons/print.png";
import shareic from "assets/img/icons/share.png";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Get, Patch, Post } from "api/admin.services";
import moment from "moment";
import { BsEye } from "react-icons/bs";

import videoic from "assets/img/icons/video.svg";
import writeic from "assets/img/icons/write.svg";
import { AiOutlineDelete } from "react-icons/ai";
import Tablecard from "./Tablecard";
import { toast } from "react-toastify";
import AddPic from "assets/img/icons/AddPic.svg";
import "moment/locale/en-gb";
import Loader from "components/Loader";
import closeic from "assets/img/sorticons/close.svg";
import dltIcn from "assets/img/icons/dlt.svg"


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
  const [updateDate, setUpdateDate] = useState({ uploadDocs: "", privacy_policy: "", legalTerms: "", Faq: "", });
  const [activeClass, setActiveClass] = useState({
    uploadedDoc: "active",
    privacyPolicy: "",
    legal: "",
    faq: ""
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
      console.log(error);
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
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
    setShowUpload(false);
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
          toast.success("New Video successfully uploaded")
          getVideo("videos");
          setVideoDescp("");
          setVideoPreview("");
          setSelected(false);
          setLoading(false)
        }
      } catch (error) {
        console.log(error);
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
      console.log(error);
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
      } catch (error) {
        console.log(error);
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
    } catch (error) {
      console.log(error);
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
    } catch (error) {
      console.log(error);
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
    } catch (error) {
      console.log(error);
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
      await Patch("admin/update/genral/mgmt", obj);
      onClose();
      toast.success("Successfully updated");
      await getFaq();
    } catch (error) {
      console.log(error);
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
    } catch (error) {
      console.log(error);
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
        console.log(error);
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
      console.log(error);
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
      console.log(error);
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
        console.log(err);
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
      console.log(error);
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

  useEffect(() => {
    getVideo("videos");
    getFaq();
    uploadedDocs();
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
                tutorial: ""

              }))} >
                <div className="cms_left_card w_100">
                  {console.log(activeClass, `,-----1234`)}
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
                  tutorial: ""

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
                tutorial: "active"

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
                  tutorial: ""
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
                          <div className="close_upld" onClick={() => setShow(!show)}>
                            <img src={closeic} alt="close" className="icn" />
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
              {/* Tutorials End */}

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
                                      <AiOutlineDelete
                                        className="icn"
                                        onClick={() => deleteFaq(curr._id)}
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
            </TabPanels>
          </Tabs>
        </Flex>
      </Box>

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
    </>
  );
}
