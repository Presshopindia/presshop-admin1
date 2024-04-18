// Chakra imports
import { Box, Container, FormLabel, Textarea } from "@chakra-ui/react";
import { React, useEffect, useMemo, useState, useRef } from "react";
import {
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
import Loader from "components/Loader";
import share from "assets/img/icons/share.png";
import Card from "components/card/Card";
import { useHistory } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import printic from "assets/img/icons/print.png";
import shareic from "assets/img/icons/share.png";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Get } from "api/admin.services";
import { toast } from "react-toastify";
import { Patch, Post } from "api/admin.services";
import content1 from "assets/img/contentimages/content5.svg";
import timeic from "assets/img/icons/watch.svg";
import dateic from "assets/img/icons/calendar.svg";
import videoic from "assets/img/icons/video.svg";
import AddPic from "assets/img/icons/AddPic.svg";
import writeic from "assets/img/icons/write.svg";
import Common from "./CommonEditAppCard";
import moment, { duration } from "moment/moment";
import { async } from "@firebase/util";
import { BsEye } from "react-icons/bs";
import Share from "components/share/Share";
import closeic from "assets/img/sorticons/close.svg";
export default function EditApp() {

  // date section
  const [date, setDate] = useState({
    doc: "",
    privacy_policy: "",
    legal: "",
    commision: "",
    selling_price: "",
    price_tips: "",
    faqs: "",
    tutorial: "",
  });
  const textColor = useColorModeValue("#000", "white");
  const history = useHistory();
  // used for props
  const [param, setParam] = useState("doc");
  // commision category
  const [CommissionCategory, setCommissionCategory] = useState([])
  const [showUpload, setShowUpload] = useState(true);
  const [videoPreview, setVideoPreview] = useState(null);
  const [videoDescp, setVideoDescp] = useState("");
  const [videoUrl, setvideoUrl] = useState("");
  const [video, setVideo] = useState([]);
  const [show, setShow] = useState(false);
  const [previedShow, SetPreviewedShow] = useState(true);
  const [videoCategory, setVideoCategory] = useState("");
  const [update, setUpdate] = useState(false);
  const [tutoriaTab, setTutorialTab] = useState([]);
  // docs section state
  const { isOpen: isOpen1, onOpen: onOpen1, onClose: onClose1, } = useDisclosure();
  const [docType, setDocType] = useState({ document_name: "" });
  const [uploadedDoc, setUploadedDoc] = useState([]);
  const [updateDate, setUpdateDate] = useState({ uploadDocs: "", });
  const [isEdit1, setIsEdit1] = useState(false);
  // faq 
  const [faq, setFaqs] = useState({ ques: "", ans: "" });
  const [faqTab, setFaqTab] = useState([]);
  const [faqCategory, setFaqCategory] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [faqData, setFaqData] = useState([]);
  const [isEdit, setisEdit] = useState(false);
  // states for PriceTips
  const [categoryForPriceTab, setCategoryForPriceTab] = useState([])
  const [priceTipsDetails, setPriceTipsDetails] = useState({ ques: "", ans: "" });
  const [categoryForPrice, setCategoryForPrice] = useState("")
  const { isOpen: isOpenPrice, onOpen: onOpenPrice, onClose: onClosePrice, } = useDisclosure();
  const [getPriceTipsDeatails, setGetpriceTipsDetails] = useState([])
  const [isEditPrice, setisEditPrice] = useState(false);
  const [priceTipData, setPriceTipData] = useState()
  const [isViewMore, setIsViewMore] = useState(false)
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(false)
  const [path1, setPath1] = useState("")
  const [csv, setCsv] = useState("")
  const [show1, setShow1] = useState(false)
  const [thumbnailURL, setThumbnailURL] = useState('');
  const [activeClass, setActiveClass] = useState({
    uploadedDoc: "active",
    privacyPolicy: "",
    legal: "",
    comission: "",
    sellingPrice: "",
    tutorial: "",
    priceTips: "",
    faq: ""
  })



  const handleClose = () => {
    setShow1(!show1)
  }
  // add share functionality
  const getPath = async (type) => {
    try {
      await Post(`admin/download/cms`, { type }).then((res) => {
        console.log(res, `<----there are path`)
        setPath1(res?.data?.path)
      })
    } catch (err) {
    }
  }


  // get tab
  const getCategoryFAQ = async () => {
    try {
      await Get(`admin/getCategory/FAQ`).then((res) => {
        setFaqTab(res.data.categories);
      });
    } catch (er) {

      setLoading(false)
    }
  };

  const getCategoryTUTorial = async () => {
    setLoading(true)
    try {

      await Get(`admin/getCategory/tutorial`).then((res) => {
        setTutorialTab(res.data.categories);
        setLoading(false)
      });
    } catch (er) {
      setLoading(false)
    }
  };

  const handleUpdate = () => {
    setUpdate(!update);
  };

  // create Faq

  const AddFaq = async () => {
    if (!faqCategory || faqCategory.trim() === "") {
      toast.error("Category not selected")
    } else if (!faq.ques || faq.ques.trim() === "") {
      toast.error("Both fields are required")
    } else if (!faq.ans || faq.ans.trim() === "") {
      toast.error("Both fields are required")
    } else {
      try {
        let obj = {
          category: faqCategory,
          for: "app",
          ques: faq.ques,
          ans: faq.ans,
        };

        await Post(`admin/create/faq`, obj);
        onClose();
        toast.success("Successfully added");
        getFaq();
      } catch (error) {
        setLoading(false)
      }
    }
  };

  // get data for Faq

  const getFaq = () => {
    setLoading(true)

    try {
      Get(`admin/get/faq?for=app&${faqCategory && "category"}=${faqCategory && faqCategory}`).then((res) => {
        setFaqData(res?.data?.faq);
        setDate((prev) => ({ ...prev, faqs: res?.data?.faq[0]?.updatedAt }));
      });
      setLoading(false)

    } catch (err) {
      console.log(err, `Faq errrors`);
      setLoading(false)

    }
  };

  // get faq by id

  const getFAQById = async (id) => {
    try {
      await Get(`admin/get/faq?faq_id=${id}`).then((res) => {
        setFaqs(res.data.faq);
        onOpen();
        setisEdit(true);
        setIsViewMore(false)
      });
    } catch (error) {
      setLoading(false)
    }
  };
  // view more
  const viewMore = async (id) => {
    try {
      await Get(`admin/get/faq?faq_id=${id}`).then((res) => {
        setFaqs(res.data.faq);
        onOpen();
        setIsViewMore(true)
      });
    } catch (error) {
      setLoading(false)
    }
  };


  // edit

  const EditFAQ = async () => {
    try {
      let obj = {
        type: "faq",
        id: faq._id,
        ques: faq.ques,
        ans: faq.ans,
      };
      await Patch(`admin/update/genral/mgmt`, obj).then((res) => {
        onClose();
        toast.success("Successfully updated");
        getFaq();
      });
    } catch (err) {
      setLoading(false)
    }
  };
  // delete faq

  const deleteFaq = (_id) => {
    try {
      let obj = {
        id: _id,
      };
      Post(`admin/delete/faq`, obj).then((res) => {
        toast.error("Deleted");
        getFaq();
      });
    } catch (err) {
      setLoading(false)
    }
  };
  // Price tips
  const getCategoryPriceTip = async () => {
    setLoading(true)
    try {
      await Get(`admin/getCategory/priceTip`).then((res) => {
        setCategoryForPriceTab(res.data.categories);
        setLoading(false)
      });
    } catch (er) {
      setLoading(false)
    }
  };

  // /create priceTips

  const AddPriceTips = async () => {
    if (!categoryForPrice || categoryForPrice.trim() === "") {
      toast.error("Category not selected")
    } else if (!priceTipsDetails.ques || priceTipsDetails.ques.trim() === "") {
      toast.error("Both fields are required")
    } else if (!priceTipsDetails.ans || priceTipsDetails.ans.trim() === "") {
      toast.error("Both fields are required")
    } else {
      try {
        let obj = {
          category: categoryForPrice,
          for: "app",
          ques: priceTipsDetails.ques,
          ans: priceTipsDetails.ans,
        };

        await Post(`admin/createpriceTipforQuestion`, obj);
        onClosePrice();
        toast.success("Successfully added");
        getPriceTips()
      } catch (error) {
        setLoading(false)
      }
    }
  };

  // get Price tips
  const getPriceTips = () => {
    setLoading(true)
    try {
      Get(`admin/getpriceTipforQuestion?for=app&${categoryForPrice && "category"}=${categoryForPrice && categoryForPrice}`).then((res) => {
        setGetpriceTipsDetails(res?.data?.price_tips);
        setDate((prev) => ({ ...prev, price_tips: res?.data?.price_tips[0]?.updatedAt }));
        setLoading(false)
      });
    } catch (err) {
      console.log(err, `Faq errrors`);
      setLoading(false)
    }
  }


  // get priceTips by id

  const getPriceTipsById = async (id) => {
    try {
      await Get(`admin/getpriceTipforQuestion?pricetip_id=${id}`).then((res) => {
        setPriceTipsDetails(res?.data?.price_tips);
        onOpenPrice();
        setisEditPrice(true);
        setIsViewMore(false)
      });
    } catch (error) {
      setLoading(false)
    }
  };

  // view more 
  const viewMorePriceTip = async (id) => {
    try {
      await Get(`admin/getpriceTipforQuestion?pricetip_id=${id}`).then((res) => {
        setPriceTipsDetails(res?.data?.price_tips);
        onOpenPrice();
        setIsViewMore(true)

      });
    } catch (error) {
      setLoading(false)
    }
  };



  const EditPriceTips = async () => {
    try {
      let obj = {
        type: "price_tips",
        price_tips_id: priceTipsDetails._id,
        category: categoryForPrice,
        ques: priceTipsDetails.ques,
        ans: priceTipsDetails.ans,
      };
      await Patch(`admin/update/genral/mgmt/app`, obj).then((res) => {
        onClosePrice();
        toast.success("Successfully updated ");
        getPriceTips()
      });
    } catch (err) {
      setLoading(false)
    }

  }

  // delete Price tips
  const deletePriceTips = (_id) => {
    try {
      let obj = {
        id: _id,
      };
      Post(`admin/delete/price_tip`, obj).then((res) => {
        toast.error("Deleted");
        getPriceTips();
      });
    } catch (err) {
      setLoading(false)
    }
  };


  useEffect(() => {
    getCategoryPriceTip()
    getPriceTips()
  }, [categoryForPrice])

  // video section start
  const [selected, setSelected] = useState(false)
  const handleFileSelect = async (event) => {
    try{
      const file = event.target.files[0];
      if (file) {
        setSelected(true)
        generateVideoThumbnail(file)
          .then((generatedURL) => {
            setThumbnailURL(generatedURL);
          })
        const formdata = new FormData();
        formdata.append("images", file);
        formdata.append("path", "appTutorials");
        setLoading(true);
        await Post(`admin/upload/data`, formdata).then((res) => {
          setVideoPreview(res.data.imgs[0]);
        });
        setShowUpload(false);
        setLoading(false);
      }
    }
    catch(error){
      console.log(error);
      setLoading(false);
    }
  };

  // const handleFileSelect = async (event) => {
  //   const file = event.target.files[0];

  //   if (file) {
  //     try {
  //       const thumbnailU = await generateVideoThumbnail(file);
  //       const formdata = new FormData();
  //       formdata.append("images", file);
  //       formdata.append("path", "appTutorials");
  //       formdata.append("thumbnail", thumbnailU);
  //       const response = await Post(`admin/upload/data`, formdata);
  //       console.log(response,`,----`)
  //       setVideoPreview(response.data.imgs[0]);
  //       setShowUpload(false);
  //     } catch (error) {
  //       // Handle any errors here
  //       console.error("Error:", error);
  //     }
  //   }
  // };


  // genrate the thumbnail
  const generateVideoThumbnail = (file) => {
    return new Promise((resolve, reject) => {
      const video = document.createElement('video');
      video.autoplay = true;
      video.muted = true;
      const reader = new FileReader();
      reader.onload = () => {
        video.src = reader.result;
        video.onloadeddata = () => {
          const canvas = document.createElement('canvas');
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

          canvas.toBlob((blob) => {
            const thumbnailURL = URL.createObjectURL(blob);
            resolve(thumbnailURL);
          }, 'image/jpeg');
        };
      };

      reader.readAsDataURL(file);
    });
  };

  const videoEl = useRef(null);
  const [duration, setDuration] = useState()

  const handleLoadedMetadata = () => {
    const video = videoEl.current;
    if (!video) return;
    setDuration(video.duration)
  };



  const handleFileUpload = async (type) => {
    if (!videoPreview || videoPreview.trim() === "") {
      toast.error("Please add a video")
    } else if (!videoDescp || videoDescp.trim() === "") {
      toast.error(" Please add a brief description")
    }
    else if (!videoCategory || videoCategory.trim() === "") {
      toast.error("Category not selected")
    }
    else {
      try {
        setLoading(true);
        let obj = {
          for: "app",
          type: type,
          video: videoPreview,
          description: videoDescp,
          category: videoCategory,
          thumbnail: thumbnailURL,
          duration: duration,
        };

        await Patch(`admin/update/genral/mgmt/app`, obj).then((res) => {
          if (res) {
            getVideo("videos");
            setVideoDescp("");
            setVideoPreview("");
            setThumbnailURL("");
            setShowUpload(true);
            setLoading(false);
            setSelected(false)
          }
        });

      } catch (error) {
        setLoading(false)
      }
    }
  };


  const getVideo = async (type) => {
    setLoading(true)
    try {
      await Get(`admin/genral/mgmt/app?type=${type}&${videoCategory && "category"}=${videoCategory && videoCategory}`).then((res) => {
        setVideo(res.data.status);
        setDate((prev) => ({
          ...prev,
          tutorial: res?.data?.status[res.data.status.length - 1]?.updatedAt,
        }));

      });
      setLoading(false)
    } catch (err) {
      setLoading(false)
    }
  };

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

  const GetData = async () => {
    try {
      // const resp1 = await Get(`admin/genral/mgmt/app?type=doc`);
      // setDate((prev) => ({ ...prev, doc: resp1?.data?.status?.updatedAt }));

      const resp2 = await Get(`admin/genral/mgmt/app?type=privacy_policy`);
      setDate((prev) => ({
        ...prev,
        privacy_policy: resp2.data?.status?.updatedAt,
      }));

      const resp3 = await Get(`admin/genral/mgmt/app?type=legal`);
      setDate((prev) => ({ ...prev, legal: resp3?.data?.status?.updatedAt }));

      // const resp4 = await Get(`admin/genral/mgmt/app?type=commissionstructure`);
      // setDate((prev) => ({ ...prev, commision: resp4.data.status.updatedAt }));

      const resp5 = await Get(`admin/genral/mgmt/app?type=selling_price`);
      setDate((prev) => ({
        ...prev,
        selling_price: resp5.data?.status?.updatedAt,
      }));

      // const resp6 = await Get(`admin/genral/mgmt/app?type=price_tips`);
      // setDate((prev) => ({ ...prev, price_tips: resp6?.data?.status?.updatedAt }));
    } catch (error) {
      console.log(error, "<--------error");
      setLoading(false)
    }
  };

  // const get_Tut_FAQ = async () => {
  //   const resp = await Get();
  // };

  // Docs section
  const addDocs = async () => {
    if (!docType.document_name || docType.document_name.trim() === "") {
      toast.error("Document name is required");
    } else {
      try {
        const obj = {
          type: "app",
          document_name: docType.document_name,
        };
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
      const res = await Get("admin/get/docs?type=app");
      setUploadedDoc(res.data.data);
      setUpdateDate((prev) => ({
        ...prev,
        uploadDocs: res?.data?.data[res?.data?.data.length - 1]?.updatedAt,
      }));
      setLoading(false)

    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  };
  const uploadedDocsById = async (id) => {
    try {
      await Get(`admin/get/docs?doc_id=${id}&type=app`).then((res) => {
        setDocType(res.data.data);
        onOpen1();
        setIsEdit1(true);
      });
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

  // comission module
  const [percentage, setPercentage] = useState('');
  const [category, setCategory] = useState('')

  // get category for Commission structure

  const getCategory = async () => {
    await Get(`admin/getCategory/commissionstructure`).then((res) => {
      setCommissionCategory(res?.data?.categories)
    })
  }
  // get commision

  const getCommission = async () => {
    setLoading(true)
    try {
      await Get(`admin/genral/mgmt/app?type=commissionstructure&category_id=${category}`).then((res) => {
        setPercentage(res?.data?.status?.percentage)
        setLoading(false)
      })

    } catch (error) {
      setLoading(false)
    }
  }
  useEffect(() => {
    getPath("app")
  }, [])

  // print faq

  const tableRef = useRef(null);
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

  // print tableRefPrice

  const tableRefPrice = useRef(null);

  const handlePrintPrice = () => {
    if (tableRefPrice.current) {
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
            ${tableRefPrice.current.outerHTML}
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  // print tableRefPrice

  const tableRefSelling_price = useRef(null);

  const handlePrintSelling_price = () => {
    if (tableRefSelling_price.current) {
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
            ${tableRefSelling_price.current.outerHTML}
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  // Edit Comision
  const EditComission = async () => {
    if (!percentage || percentage.trim() === "") {
      toast.error("  required")
    } else if (!category || category.trim() === "") {
      toast.error("Category not selected")
    } else {

      try {
        let obj = {
          type: "commissionstructure",
          category_id: category,
          percentage: percentage
        }
        await Patch(`admin/update/genral/mgmt/app`, obj);
        toast.success("Successfully updated")


      } catch (error) {
        console.log(error)

      }
    }
  }

  // get selling price
  const [sellingPrice, setSellingPrice] = useState("")
  const getSellingPrice = async () => {
    try {
      await Get(`admin/genral/mgmt/app?type=selling_price`).then((res) => {
        setSellingPrice(res?.data?.status)
      })
    } catch (error) {
    }
  }

  // edit selling price

  const editSelling = async () => {
    let obj = {
      type: "selling_price",
      exclusive: sellingPrice
    };

    if (!obj?.exclusive || (typeof obj.exclusive !== 'string') || obj.exclusive.trim() === "") {
      toast.error("Need To Change The value");
    } else {
      try {
        const response = await Patch(`admin/update/genral/mgmt/app`, obj);

        if (response.status === 200) {
          toast.success("Successfully updated ");
          getSellingPrice();
        } else {
          toast.error("Failed to update");
        }
      } catch (error) {
        console.error("API Error:", error);
        toast.error("An error occurred while updating");
      }
    }
  };

  const editSelling1 = async () => {
    let obj = {
      type: "selling_price",
      shared: sellingPrice
    };

    if (!obj?.shared || (typeof obj.shared !== 'string') || obj.shared.trim() === "") {
      toast.error("Need To Change The value");
    } else {
      try {
        const response = await Patch(`admin/update/genral/mgmt/app`, obj);
        console.log("API Response:", response);

        if (response.status === 200) {
          toast.success("Successfully updated ");
          getSellingPrice();
        } else {
          toast.error("Failed to update");
        }
      } catch (error) {
        console.error("API Error:", error);
        toast.error("An error occurred while updating");
      }
    }
  };



  useEffect(() => {
    getCategory()
    getCommission()
    getSellingPrice()

  }, [category])

  useMemo(() => {
    GetData();
  }, [update]);

  useEffect(() => {
    GetData();
    getFaq();
    getVideo("videos");
    uploadedDocs()
  }, [faqCategory, videoCategory]);
  useEffect(() => {
    getCategoryFAQ();
    getCategoryTUTorial();
  }, [faqCategory, videoCategory]);


  return (
    <>
      {loading && <Loader />}
      <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
        <Flex className="cms_tabs_wrap" mb="25px" gap="25px">
          <Tabs>
            <TabList className="tabs_btns genrl_tbs_wrap catgr_tbs" w="375px">
              <Tab onClick={() =>

                setActiveClass((pre) => ({
                  ...pre,
                  uploadedDoc: "active",
                  privacyPolicy: "",
                  legal: "",
                  comission: "",
                  sellingPrice: "",
                  tutorial: "",
                  priceTips: "",
                  faq: ""
                }))} >
                <div className="cms_left_card w_100" onClick={() => getPath("app")}>
                  <div className="cms_items">
                    <div className={`cms_link ${activeClass.uploadedDoc}`} >
                      <div className="hding">
                        <p>Upload docs</p>
                      </div>
                      <div className="bdy">
                        <span className="updt_date">
                          {updateDate && updateDate.uploadDocs && (
                            <span>
                              Updated on {moment(updateDate?.uploadDocs).format("DD MMMM YYYY")}
                            </span>
                          )}
                        </span>
                        {/* <span>
                          Updated on {moment(updateDate?.uploadDocs).format("DD MMMM YYYY")}
                        </span> */}

                      </div>
                    </div>
                  </div>
                </div>
              </Tab>
              <Tab onClick={() => {
                setParam("privacy_policy")
                setActiveClass((pre) => ({
                  ...pre,
                  uploadedDoc: "",
                  privacyPolicy: "active",
                  legal: "",
                  comission: "",
                  sellingPrice: "",
                  tutorial: "",
                  priceTips: "",
                  faq: ""
                }))

              }} >
                <div className="cms_left_card w_100" onClick={() => getPath("privacy_policy")}>
                  <div className="cms_items">
                    <div className={`cms_link ${activeClass.privacyPolicy}`} >
                      <div className="hding">
                        <p>Privacy policy</p>
                      </div>
                      <div className="bdy">
                        <span>
                          {date && date.privacy_policy && (
                            <span>
                              Updated on {moment(date?.privacy_policy).format("DD MMMM,YY")}
                            </span>
                          )}
                        </span>

                        {/* <span>
                          Updated on{" "}
                          {moment(date.privacy_policy).format("DD MMMM,YY")}
                        </span> */}
                      </div>
                    </div>
                  </div>
                </div>
              </Tab>
              <Tab onClick={() => {
                setParam("legal")
                setActiveClass((pre) => ({
                  ...pre,
                  uploadedDoc: "",
                  privacyPolicy: "",
                  legal: "active",
                  comission: "",
                  sellingPrice: "",
                  tutorial: "",
                  priceTips: "",
                  faq: ""
                }))

              }}>
                <div className="cms_left_card w_100" onClick={() => getPath("legal")}>
                  <div className="cms_items">
                    <div className={`cms_link ${activeClass.legal}`}>
                      <div className="hding">
                        <p>Legal T&Cs</p>
                      </div>
                      <div className="bdy">

                        <span>
                          {date && date.legal && (
                            <span>
                              Updated on {moment(date.legal).format("DD MMMM,YY")}
                            </span>
                          )}
                        </span>


                        {/* <span>
                          Updated on {moment(date.legal).format("DD MMMM,YY")}
                        </span> */}

                      </div>
                    </div>
                  </div>
                </div>
              </Tab>
              <Tab onClick={() => {
                setParam("commision")
                setActiveClass((pre) => ({
                  ...pre,
                  uploadedDoc: "",
                  privacyPolicy: "",
                  legal: "",
                  comission: "active",
                  sellingPrice: "",
                  tutorial: "",
                  priceTips: "",
                  faq: ""
                }))
              }}>
                <div className="cms_left_card w_100">
                  <div className="cms_items">
                    <div className={`cms_link ${activeClass.comission}`}>
                      <div className="hding">
                        <p>Commission structure</p>
                      </div>
                      <div className="bdy">
                        <span>
                          Updated on{" "}
                          {moment(category?.updatedAt).format("DD MMMM,YY")}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Tab>
              <Tab onClick={() => {
                getPath("selling_price")
                setParam("selling_price")
                setActiveClass((pre) => ({
                  ...pre,
                  uploadedDoc: "",
                  privacyPolicy: "",
                  legal: "",
                  comission: "",
                  sellingPrice: "active",
                  tutorial: "",
                  priceTips: "",
                  faq: ""
                }))
              }}>
                <div className="cms_left_card w_100">
                  <div className={"cms_items"}>
                    <div className={`cms_link ${activeClass.sellingPrice}`}>
                      <div className="hding">
                        <p>Selling price</p>
                      </div>
                      <div className="bdy">
                        <span>
                          {date && date?.selling_price && (
                            <span>
                              Updated on {moment(date?.selling_price).format("DD MMMM,YY")}
                            </span>
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Tab>
              <Tab onClick={() => {
                setActiveClass((pre) => ({
                  ...pre,
                  uploadedDoc: "",
                  privacyPolicy: "",
                  legal: "",
                  comission: "",
                  sellingPrice: "",
                  tutorial: "active",
                  priceTips: "",
                  faq: ""
                }))
              }}>
                <div className="cms_left_card w_100">
                  <div className={`cms_items`}>
                    <div className={`cms_link ${activeClass.tutorial}`}>
                      <div className="hding">
                        <p>Tutorials</p>
                      </div>
                      <div className="bdy">
                        <span>
                          {date && date?.tutorial && (
                            <span>
                              Updated on {moment(date?.tutorial).format("DD MMMM,YY")}
                            </span>
                          )}
                        </span>

                        {/* <span>
                          Updated on{" "}
                          {moment(date.tutorial).format("DD MMMM,YY")}
                        </span>
                         */}
                      </div>
                    </div>
                  </div>
                </div>
              </Tab>
              <Tab onClick={() => {
                getPath("price_tips")
                setActiveClass((pre) => ({
                  ...pre,
                  uploadedDoc: "",
                  privacyPolicy: "",
                  legal: "",
                  comission: "",
                  sellingPrice: "",
                  tutorial: "",
                  priceTips: "active",
                  faq: ""
                }))
              }}>
                <div className="cms_left_card w_100">
                  <div className={`cms_items `}>
                    <div className={`cms_link ${activeClass.priceTips}`}>
                      <div className="hding">
                        <p>Price tips</p>
                      </div>
                      <div className="bdy">
                        <span>
                          {date && date?.price_tips && (
                            <span>
                              Updated on {moment(date?.price_tips).format("DD MMMM,YY")}
                            </span>
                          )}
                        </span>
                        {/* <span>
                          Updated on{" "}
                          {moment(date.price_tips).format("DD MMMM,YY")}
                        </span> */}
                      </div>
                    </div>
                  </div>
                </div>
              </Tab>
              <Tab onClick={() => {
                getPath("faq")
                setActiveClass((pre) => ({
                  ...pre,
                  uploadedDoc: "",
                  privacyPolicy: "",
                  legal: "",
                  comission: "",
                  sellingPrice: "",
                  tutorial: "",
                  priceTips: "",
                  faq: "active"
                }))


              }}>
                <div className="cms_left_card w_100">
                  <div className="cms_items">
                    <div className={`cms_link ${activeClass.faq}`}>
                      <div className="hding">
                        <p>FAQs</p>
                      </div>
                      <div className="bdy">
                        <span>
                          {date && date?.faqs && (
                            <span>
                              Updated on {moment(date?.faqs).format("DD MMMM,YY")}
                            </span>
                          )}
                        </span>
                        {/* <span>
                          Updated on {moment(date.faqs).format("DD MMMM YY")}
                        </span> */}
                      </div>
                    </div>
                  </div>
                </div>
              </Tab>
            </TabList>

            <TabPanels className="cms_tabs_data catg_tbs_card">
              <TabPanel>
                <Card
                  direction="column"
                  w="615px"
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
                      <span className="updt_date">
                        {updateDate && updateDate.uploadDocs && (
                          <span>
                            Updated on {moment(updateDate?.uploadDocs).format("DD MMMM YYYY")}
                          </span>
                        )}
                      </span>
                    </Text>

                    <div className="opt_icons_wrap">
                      <a
                        onClick={() => {
                          setShow1(true)
                          setCsv(path1)
                        }}
                        className="txt_danger_mdm"
                      >
                        <img src={share} className="opt_icons" />
                      </a>

                      <a
                        onClick={() => {
                          onOpen1();
                          setIsEdit1(false);
                          setDocType("");
                          uploadedDocs();
                        }}
                        className="txt_danger_mdm"
                      >
                        Add
                      </a>
                    </div>
                  </Flex>
                  <TableContainer className="fix_ht_table">
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
                                    <a
                                      onClick={() => {
                                        uploadedDocsById(curr._id);
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
                {param && param === "privacy_policy" && (
                  <Common type={param} path={path1} update={handleUpdate} />
                )}
              </TabPanel>
              <TabPanel>
                {param && param === "legal" && (
                  <Common type={param} path={path1} update={handleUpdate} />
                )}
              </TabPanel>
              <TabPanel>


                <Card
                  className="rt_txt_edtr_wrap"
                  direction='column'
                  w='615px'
                  px='0px'
                  p='17px'
                  h='737px'
                  overflowX={{ sm: "scroll", lg: "hidden" }}>
                  <Flex px='20px' pe="20px" justify='space-between' mb='27px' align='center'>
                    <Text
                      className="crd_edit_hdng"
                      color={textColor}
                      fontSize='22px'
                      lineHeight='100%'
                      fontFamily={"AirbnbBold"}>
                      Commission structure
                      <span className="updt_date">
                        {/* {category && category?.updatedAt && (
                          <span>
                            Updated on {moment(category?.updatedAt).format("DD MMMM,YY")}
                          </span>
                        )} */}
                        Updated on {moment(category?.updatedAt).format(`DD MMMM YYYY`)}

                      </span>
                    </Text>
                    <div className="opt_icons_wrap cms_icns">

                      <Select
                        className="sml_slct"
                        value={category}
                        name="priceTipCategory"
                        placeholder="select"
                        onChange={e => setCategory(e.target.value)}
                      >
                        {CommissionCategory && CommissionCategory.map((curr) => {
                          return (
                            <option value={curr?._id}>{curr?.name}</option>

                          )

                        })}

                      </Select>
                    </div>
                  </Flex>
                  <Container className="inner_card_wrap tandc inner_cont_edit" maxW='900px' color='black'>
                    <div className="dtl_wrap">
                      <div className="App cmsn_strctr">
                        <div className="inp_wrp">
                          <Input placeholder="Enter commission"
                            value={percentage}
                            onChange={e => setPercentage(e.target.value)}

                          />
                        </div>
                      </div>
                    </div>
                    <div className="save_btn_wrap" align="center">
                      <Button className="w_100 theme_btn" onClick={() => EditComission()}>Save</Button>
                    </div>
                  </Container>
                </Card>


              </TabPanel>

              <TabPanel>
                <Card
                  className="rt_txt_edtr_wrap"
                  direction='column'
                  w='615px'
                  px='0px'
                  p='17px'
                  h='737px'
                  overflowX={{ sm: "scroll", lg: "hidden" }}>
                  <Flex px='20px' pe="20px" justify='space-between' mb='27px' align='center'>
                    <Text
                      className="crd_edit_hdng"
                      color={textColor}
                      fontSize='22px'
                      lineHeight='100%'
                      fontFamily={"AirbnbBold"}>
                      Selling price
                      <span className="updt_date">
                        {/* {category && category?.updatedAt && (
                          <span>
                            Updated on {moment(category?.updatedAt).format("DD MMMM,YY")}
                          </span>
                        )} */}
                        Updated on {moment(category?.updatedAt).format(`DD MMMM YYYY`)}
                      </span>
                    </Text>
                    <div className="opt_icons_wrap cms_icns">
                      <a
                        onClick={() => {
                          setShow1(true)
                          setCsv(path1)
                        }}
                        className="txt_danger_mdm"
                      >
                        <img src={share} className="opt_icons" />
                      </a>
                      <span onClick={() => handlePrintSelling_price()}><img src={printic} alt="print" /></span>
                    </div>
                  </Flex>

                  <Container className="inner_card_wrap tandc inner_cont_edit" maxW='900px' color='black' ref={tableRefSelling_price}>
                    <div className="dtl_wrap">
                      <div className="App cmsn_strctr">
                        <div className="inp_wrp">
                          <FormLabel fontFamily="AirbnbMedium" fontSize="15px">
                            Exclusive selling price
                          </FormLabel>
                          <div className="slng_prc">
                            <Input placeholder="Enter exclusive selling price" value={sellingPrice?.exclusive}
                              onChange={(e) => setSellingPrice(e.target.value)}
                            />
                            <div className="m-20" align="center">
                              <Button className="w_100 theme_btn" onClick={editSelling}>Save</Button>
                            </div>
                          </div >
                        </div >
                      </div >
                    </div >

                    <div className="dtl_wrap">
                      <div className="App cmsn_strctr">

                        <div className="inp_wrp">
                          <FormLabel fontFamily="AirbnbMedium" fontSize="15px">
                            Shared selling price
                          </FormLabel>
                          <div className="slng_prc">
                            <Input placeholder="Enter shared selling price"
                              value={sellingPrice?.shared}
                              onChange={(e) => setSellingPrice(e.target.value)}
                            />
                            <div className="m-20" align="center">
                              <Button className="w_100 theme_btn" onClick={editSelling1}>Save</Button>
                            </div>
                          </div >
                        </div >
                      </div >
                    </div >

                  </Container >
                </Card >
                {/* new Selling price end */}

              </TabPanel >

              {/* Tutorials Start */}
              < TabPanel >
                <Card
                  className="rt_txt_edtr_wrap"
                  direction="column"
                  w="615px"
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
                    </Text>
                    <div className="opt_icons_wrap cms_icns">
                      <a onClick={() => setShow(!show)}
                        className="txt_danger_mdm">
                        Add
                      </a>
                      <Select
                        className="sml_slct"
                        value={videoCategory}
                        name="videoCategory"
                        placeholder="select category"
                        onChange={(e) => setVideoCategory(e.target.value)}>
                        {tutoriaTab &&
                          tutoriaTab.map((curr) => {
                            return (
                              <option value={curr?.name}>{curr?.name}</option>
                            );
                          })}
                      </Select>
                    </div>
                  </Flex>

                  <Container
                    className="inner_card_wrap tandc inner_cont_edit"
                    maxW="900px"
                    color="black">
                    <div className="ttrl_vds_wrap">
                      {video &&
                        video.map((curr) => {
                          return (
                            <div className="ttr_vd lst">
                              <div className="top">
                                <video
                                  // ref={videoRef}
                                  src={curr?.video}
                                  controls
                                  width="320"
                                  height="240"
                                />
                                <div className="cont_type">
                                  <img src={videoic} alt="" />
                                </div>
                              </div>
                              <div className="btm">
                                <Text
                                  className="desc"
                                  fontSize="14px"
                                  fontFamily="AirbnbBold"
                                >
                                  {curr?.description}
                                </Text>
                                <div className="btm_inn">
                                  <div className="time_wrap">
                                    <Text>
                                      <img src={timeic} alt="Time" />
                                      {moment(curr?.createdAt).format(
                                        "hh:mm:A"
                                      )}
                                    </Text>
                                    <Text>
                                      <img src={dateic} alt="Date" />
                                      {moment(curr?.createdAt).format(
                                        "DD MMMM YYYY"
                                      )}
                                    </Text>
                                  </div>
                                  <AiOutlineDelete
                                    onClick={() => deleteVideo(curr?._id)}
                                  />
                                </div>
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
                                      ref={videoEl}
                                      onLoadedMetadata={handleLoadedMetadata}
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
                              placeholder="Add a header upto 2 lines"
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
              </TabPanel >

              {/* Tutorials End */}
              {/* Price tips */}

              <TabPanel>
                <Card
                  className="rt_txt_edtr_wrap"
                  direction="column"
                  w="615px"
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
                    pe="37px"
                  >
                    <Text
                      className="crd_edit_hdng"
                      color={textColor}
                      fontSize="22px"
                      lineHeight="100%"
                      fontFamily={"AirbnbBold"}
                    >
                      Price tips
                      <span className="updt_date">

                        {date && date.price_tips && (
                          <span>
                            Updated on {moment(date.price_tips).format("DD MMMM,YY")}
                          </span>
                        )}


                        {/* Updated on {moment(date.price_tips).format("DD MMMM YY")} */}

                      </span>
                    </Text>
                    <div className="opt_icons_wrap cms_icns">
                      <a
                        onClick={() => {
                          setShow1(true)
                          setCsv(path1)
                        }}
                        className="txt_danger_mdm"
                      >
                        <img src={share} className="opt_icons" />
                      </a>
                      <span onClick={() => handlePrintPrice()}>
                        <img src={printic} alt="print" />
                      </span>
                      <Select
                        className="sml_slct"
                        value={categoryForPrice}
                        name="categoryForPrice"
                        placeholder="select category"
                        onChange={(e) => setCategoryForPrice(e.target.value)}>
                        {categoryForPriceTab &&
                          categoryForPriceTab.map((curr) => {
                            return (
                              <option value={curr?.name}>{curr?.name}</option>
                            );
                          })}
                      </Select>
                      <a
                        onClick={() => {
                          onOpenPrice();
                          setisEditPrice(false);
                          setPriceTipsDetails("");
                          getPriceTips();
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
                    <TableContainer className="fix_ht_table" ref={tableRefPrice}>
                      <Table mx="0px" w="fit-content" variant="simple" className="common_table">
                        <Thead>
                          <Tr>
                            <Th w="43%">Question</Th>
                            <Th w="43%">Answer</Th>
                            <Th w="14%">Action</Th>
                          </Tr>
                        </Thead>
                        <Tbody >
                          {getPriceTipsDeatails &&
                            getPriceTipsDeatails.map((curr) => (
                              <Tr key={curr._id}>
                                <Td w="50%">
                                  <Text className="tbl_faq_itm">{curr?.ques}</Text>
                                </Td>
                                <Td w="50%">
                                  <Text className="tbl_faq_itm">{curr?.ans}</Text>
                                </Td>
                                <Td w="30%">
                                  <div className="catmang_icns" >
                                    <BsEye className="icn" onClick={() => viewMorePriceTip(curr?._id)} />
                                    <a onClick={() => getPriceTipsById(curr._id)}>
                                      <img className="icn" src={writeic} alt="write" />
                                    </a>
                                    <AiOutlineDelete className="icn" onClick={() => deletePriceTips(curr._id)} />
                                  </div>
                                </Td>
                              </Tr>
                            ))}
                        </Tbody>
                      </Table>
                    </TableContainer>
                  </Container>
                </Card>
              </TabPanel>


              {/* faq start  */}
              <TabPanel>
                <Card
                  className="rt_txt_edtr_wrap"
                  direction="column"
                  w="615px"
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
                    pe="37px"
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

                        {date && date.faqs && (
                          <span>
                            Updated on {moment(date.faqs).format("DD MMMM,YY")}
                          </span>
                        )}


                        {/* Updated on {moment(date.faqs).format("DD MMMM YY")} */}

                      </span>
                    </Text>
                    <div className="opt_icons_wrap cms_icns">
                      <a onClick={() => {
                        setShow1(true)
                        setCsv(path1)
                      }}
                        className="txt_danger_mdm"
                      >
                        <img src={share} className="opt_icons" />
                      </a>
                      <span onClick={() => handlePrint()}>
                        <img src={printic} alt="print" />
                      </span>
                      <Select
                        className="sml_slct"
                        value={faqCategory}
                        name="faqCategory"
                        placeholder="select category"
                        onChange={(e) => setFaqCategory(e.target.value)}
                      >
                        {faqTab &&
                          faqTab.map((curr) => {
                            return (
                              <option value={curr?.name}>{curr?.name}</option>
                            );
                          })}
                      </Select>

                      <a
                        onClick={() => {
                          onOpen();
                          setisEdit(false);
                          setFaqs("");
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
                      <Table mx="0px" w="fit-content" variant="simple" className="common_table">
                        <Thead>
                          <Tr>
                            <Th w="43%">Question</Th>
                            <Th w="43%">Answer</Th>
                            <Th w="14%">Action</Th>
                          </Tr>
                        </Thead>
                        <Tbody >
                          {faqData &&
                            faqData.map((curr) => (
                              <Tr key={curr._id}>
                                <Td w="50%">
                                  <Text className="tbl_faq_itm">{curr?.ques}</Text>
                                </Td>
                                <Td w="50%">
                                  <Text className="tbl_faq_itm">{curr?.ans}</Text>
                                </Td>
                                <Td w="30%">
                                  <div className="catmang_icns">
                                    <BsEye className="icn" onClick={() => viewMore(curr?._id)} />
                                    <a onClick={() => getFAQById(curr._id)}>
                                      <img className="icn" src={writeic} alt="write" />
                                    </a>
                                    <AiOutlineDelete className="icn" onClick={() => deleteFaq(curr._id)} />
                                  </div>
                                </Td>
                              </Tr>
                            ))}
                        </Tbody>
                      </Table>
                    </TableContainer>
                  </Container>
                </Card>
              </TabPanel>
              {/* faq end  */}

            </TabPanels >
          </Tabs >
        </Flex >
      </Box >




      <Modal
        className="action_modal_wrap"
        isOpen={isOpen}
        onClose={() => {
          onClose();
          setisEdit(false);
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
                        setFaqs((pre) => ({ ...pre, ques: e.target.value }));
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
                      disabled={isViewMore}
                      name="ans"
                      onChange={(e) => {
                        setFaqs((pre) => ({ ...pre, ans: e.target.value }));
                      }}
                    />
                  </div>
                </Flex>
              </div>
              <div className="save_btn_wrap">
                {!isViewMore && <Button
                  className="btn_bg"
                  onClick={() => (isEdit ? EditFAQ() : AddFaq())} >
                  Save
                </Button>}
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
                      onChange={(e) =>
                        setDocType((pre) => {
                          return { ...pre, document_name: e.target.value };
                        })
                      }
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

      {/* Price tips modal */}
      <Modal
        className="action_modal_wrap"
        isOpen={isOpenPrice}
        onClose={() => {
          onClosePrice();
          setisEditPrice(false);
        }}
      >
        <ModalOverlay />
        <ModalContent className="action_modal_cont add_faq_mdl">
          <ModalBody>
            <Text fontFamily="AirbnbBold" fontSize="22px" mb="43px">
              {!isViewMore && isEdit ? "Edit PriceTips" : !isViewMore ? "Add PriceTips" : "View PriceTips"}

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
                      value={priceTipsDetails.ques}
                      name="ques"
                      disabled={isViewMore}
                      onChange={(e) => {
                        setPriceTipsDetails((pre) => ({ ...pre, ques: e.target.value }));
                      }}
                    />
                  </div>
                  <div className="mdl_inp" flex={1}>
                    <Text mb="6px" fontSize="13px" fontFamily="AirbnbMedium">
                      Answer
                    </Text>
                    <Textarea
                      placeholder="Enter your answer"
                      value={priceTipsDetails.ans}
                      name="ans"
                      disabled={isViewMore}
                      onChange={(e) => {
                        setPriceTipsDetails((pre) => ({ ...pre, ans: e.target.value }));
                      }}
                    />
                  </div>
                </Flex>
              </div>
              <div className="save_btn_wrap">
                {!isViewMore &&
                  <Button
                    className="btn_bg"
                    onClick={() => (isEditPrice ? EditPriceTips()
                      : AddPriceTips())}
                  >
                    Save
                  </Button>
                }
              </div>
            </div>
          </ModalBody>
        </ModalContent>

      </Modal>


      <Share show={show1} csv={csv} update={handleClose} />

    </>
  );
}
