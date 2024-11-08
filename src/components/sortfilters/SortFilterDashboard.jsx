// Chakra imports
import React, { useEffect, useState } from "react";
import { Button, Flex, Text, Select, Input } from "@chakra-ui/react";
import closeic from "../../assets/img/sorticons/close.svg";
import newtoold from "../../assets/img/sorticons/new-to-old.svg";
import oldtonew from "../../assets/img/sorticons/old-to-new.svg";
import highestrated from "../../assets/img/sorticons/highest-rated.svg";
import lowestrated from "../../assets/img/sorticons/Lowest-rated.svg";
import highestrcvd from "../../assets/img/sorticons/highest-payment.svg";
import lowestrcvd from "../../assets/img/sorticons/lowest-payment.svg";
import soldic from "../../assets/img/sorticons/sold.svg";
import unsoldic from "../../assets/img/sorticons/unsold.svg";
import publishedic from "../../assets/img/sorticons/published-content.svg";
import pendingic from "../../assets/img/sorticons/pending-content.svg";
import rejectedic from "../../assets/img/sorticons/rejected-content.svg";
import paymentic from "../../assets/img/sorticons/payment.svg";
import invic from "../../assets/img/sorticons/invoice.svg";
import srchic from "../../assets/img/sorticons/Search.svg";
import trnsic from "../../assets/img/sorticons/transaction.svg";
import hopperic from "../../assets/img/sorticons/user.svg";
import staric from "../../assets/img/sorticons/star.svg";
import calendaric from "../../assets/img/sorticons/date.svg";
import locationic from "../../assets/img/sorticons/location.svg";
import employeeic from "../../assets/img/sorticons/employee.svg";
import licenceic from "../../assets/img/sorticons/licence.svg";
import categoryic from "../../assets/img/sorticons/category.svg";
import typeic from "../../assets/img/sorticons/type.svg";
import actionic from "../../assets/img/sorticons/action.svg";
import pendingdocic from "../../assets/img/sorticons/penidng-doc.svg";

import { Get } from "api/admin.services";
export default function SortFilterDashboard(props) {
  const [categoryName, setCategoryName] = useState([])
  const [active, setActive] = useState()
  // console.log("🚀 ~ SortFilterDashboard ~ active:", active)
  const [active1, setActive1] = useState(null)
  const   [ query2 , setQuery2] = useState({
    key : "",
    value :""
  })

  const handleSortClick = (value, value2) => {
    // console.log(value , value2)
    setActive(value)
    setActive1(value2)
    props.sendDataToParent(value, value2)
  };
  const handleSortClick1 = (value, value2) => {
      setQuery2({
        key: value,
        value :value2
      })
    props.sendDataToParent1(value, value2)
  };


  const handleApplyClick = () => {
    props?.handleApplySorting();
  };

  const handleClear = ()=>{
    // console.log("clear")
    setQuery2({
      key : "",
      value :""
    })
    setActive("")
    setActive1(null)
    props.sendDataToParent("", "")
    props.sendDataToParent1("", "")

  }


  const getCategory = async () => {
    try {
      const res = await Get(`admin/getCategory/content`);
      if (res) {
        setCategoryName(res.data.categories);

      }
    } catch (error) {
      // console.log(error);
    }
  };

  useEffect(() => {
    getCategory()

  }, [])


  //filters will be hide for these listing accordingly
  const highestRated = ["Live tasks","Live published content", "Live uploaded content","contentOnboarding"]
  const lowestRated = ["Live tasks","Live published content", "Live uploaded content","contentOnboarding"]

  const highestPayment = ["Live published content", "Live uploaded content"  ,"Live tasks" ,"contentOnboarding" ]
  const lowestPayment = ["Live published content", "Live uploaded content" ,"Live tasks" ,"contentOnboarding"]

  const highestPriceContent = ["Live tasks"]
  const lowestPriceContent = ["Live tasks"]

  const highestPriceTask = ["Live published content" , "Live uploaded content","contentOnboarding","publicationControl"]
  const lowestPriceTask = ["Live published content" ,"Live uploaded content","contentOnboarding","publicationControl"]

  const latestInvoice = ["Live published content" ,"Live uploaded content" ,"Live tasks","contentOnboarding","publicationControl"]
  const oldestInvoice = ["Live published content" ,"Live uploaded content","Live tasks","contentOnboarding","publicationControl"]

  const publishedContent = ["Live published content", "Live uploaded content" ,"Live tasks","contentOnboarding","publicationControl"]
  const uploadedContent = ["Live published content","Live uploaded content","Live tasks","contentOnboarding","publicationControl"]
  const pendingContent = ["Live published content","Live uploaded content" ,"Live tasks","contentOnboarding","publicationControl"]
  const rejectedContent = ["Live published content","Live uploaded content","Live tasks","contentOnboarding","publicationControl"]

  const paymentReceived = ["Live published content","Live uploaded content","Live tasks","contentOnboarding"]
  const PaymentReceivable = ["Live published content","Live uploaded content" ,"Live tasks","contentOnboarding"]
 const paymentPaid = ["Live published content","Live uploaded content","Live tasks","contentOnboarding"]
 const paymentPayable = ["Live published content","Live uploaded content" ,"Live tasks","contentOnboarding"]

 const invoiceNumber = ["Live published content" , "Live uploaded content" ,"Live tasks","contentOnboarding","publicationControl"]
 const transactionId = ["Live published content" ,"Live uploaded content","Live tasks","contentOnboarding","publicationControl"]

 const location = []
 const employee  = ["Live published content" ,"Live uploaded content","Live tasks","contentOnboarding","publicationControl"]
 const licence = ["Live tasks","Live uploaded content","publicationControl"]

const soldContent = ["Live tasks","contentOnboarding","publicationControl"]
const unSoldContent = ["Live tasks","contentOnboarding","publicationControl"]

const hopper = ["Live tasks","publicationControl"]
const publication = ["Live published content" ,"Live uploaded content","Live tasks","contentOnboarding"]
const action = ["Live published content" ,"Live uploaded content","Live tasks","contentOnboarding"]

const pendingDocument = ["Live published content" ,"Live uploaded content","Live tasks","contentOnboarding"]

const category = ["publicationControl"]

return (
    <>
      {props?.hideShow?.status === true &&
        <div className="sort_filter_wrap">
          <Flex
            alignItems={"center"}
            justify={"space-between"}
            className="sort_hdng"
            mb={"30px"}
          >
            <span onClick={props?.closeSort}>
              <img src={closeic} alt="close" className="icn" />
            </span>

            <Text fontSize={"20px"} mb={"0px"} fontFamily={"AirbnbBold"}>
              Sort and Filter
            </Text>
            <a className="link" onClick={handleClear}>Clear all</a>
          </Flex>
          <Flex mb={"30px"} direction={"column"} gap={"10px"}>
            <Text fontSize={"20px"} fontFamily={"AirbnbMedium"}>
              Sort
            </Text>
            <Flex
              className={`fltr_itm ${active === "NewtoOld" ? "active" : ""}`}
              p={"6px 9px"}
              gap={"15px"}
              alignItems={"center"}
            >
              <img src={newtoold} alt="new to old" className="icn" />
              <Text className="fltr_txt" mb={"0px"} fontFamily={"Airbnb"}
                onClick={() => { handleSortClick('NewtoOld', 'NewtoOld') }}
              >
                New to old
              </Text>
            </Flex>
            <Flex
              className={`fltr_itm ${active === "OldtoNew" ? "active" : ""}`}
              p={"6px 9px"}
              gap={"15px"}
              alignItems={"center"}
            >
              <img src={oldtonew} alt="new to old" className="icn" />
              <Text className="fltr_txt" mb={"0px"} fontFamily={"Airbnb"}
                onClick={() => { handleSortClick('OldtoNew', 'OldtoNew') }}
              >
                Old to new
              </Text>
            </Flex>
            {
                !highestRated.includes(props?.hideShow?.type) &&
            <Flex
              className={`fltr_itm ${active === "HighestRated" ? "active" : ""}`}
              p={"6px 9px"}
              gap={"15px"}
              alignItems={"center"}
            >
              <img src={highestrated} alt="new to old" className="icn" />
              <Text className="fltr_txt" mb={"0px"} fontFamily={"Airbnb"}
                onClick={() => { handleSortClick('HighestRated', 'HighestRated') }}
              >
                Highest rated
              </Text>
            </Flex>
            }

            {
              !lowestRated.includes(props?.hideShow?.type) &&

            <Flex
              className={`fltr_itm ${active === "LowestRated" ? "active" : ""}`}
              p={"6px 9px"}
              gap={"15px"}
              alignItems={"center"}
            >
              <img src={lowestrated} alt="new to old" className="icn" />
              <Text className="fltr_txt" mb={"0px"} fontFamily={"Airbnb"}
                onClick={() => { handleSortClick('LowestRated', 'LowestRated') }}
              >
                Lowest rated
              </Text>
            </Flex>
            }

{
  !highestPayment.includes(props?.hideShow?.type) &&
  <Flex
              className={`fltr_itm ${active === "HighestPaymentReceived" ? "active" : ""}`}
              p={"6px 9px"}
              gap={"15px"}
              alignItems={"center"}
            >
              <img src={highestrcvd} alt="new to old" className="icn" />
              <Text className="fltr_txt" mb={"0px"} fontFamily={"Airbnb"}
                onClick={() => { handleSortClick('HighestPaymentReceived', 'HighestPaymentReceived') }}
              >
                Highest payment received
              </Text>
            </Flex>
}
           
{
  !lowestPayment.includes(props?.hideShow?.type) &&
  <Flex
              className={`fltr_itm ${active === "LowestPaymentReceived" ? "active" : ""}`}
              p={"6px 9px"}
              gap={"15px"}
              alignItems={"center"}>
              <img src={lowestrcvd} alt="new to old" className="icn" />
              <Text className="fltr_txt" mb={"0px"} fontFamily={"Airbnb"}
                onClick={() => { handleSortClick('LowestPaymentReceived', 'LowestPaymentReceived') }}
              >
                Lowest payment received
              </Text>
            </Flex>
}
            
       
       {
        !highestPriceContent.includes(props?.hideShow?.type) &&

            <Flex
              className={`fltr_itm ${active === "Highestpricedcontent" ? "active" : ""}`}
              p={"6px 9px"}
              gap={"15px"}
              alignItems={"center"}
            >
              <img src={highestrated} alt="new to old" className="icn" />
              <Text className="fltr_txt" mb={"0px"} fontFamily={"Airbnb"}
                onClick={() => { handleSortClick('Highestpricedcontent', 'Highestpricedcontent') }}
              >
                Highest priced content
              </Text>
            </Flex>
       }

       {
  !lowestPriceContent.includes(props?.hideShow?.type) &&

            <Flex
              className={`fltr_itm ${active === "Lowestpricedcontent" ? "active" : ""}`}
              p={"6px 9px"}
              gap={"15px"}
              alignItems={"center"}
            >
              <img src={lowestrated} alt="new to old" className="icn" />
              <Text className="fltr_txt" mb={"0px"} fontFamily={"Airbnb"}
                onClick={() => { handleSortClick('Lowestpricedcontent', 'Lowestpricedcontent') }}
              >
                Lowest priced content
              </Text>
            </Flex>
       }

{
  !highestPriceTask.includes(props?.hideShow?.type) &&
            <Flex
              className={`fltr_itm ${active === "HighestpricedTask" ? "active" : ""}`}
              p={"6px 9px"}
              gap={"15px"}
              alignItems={"center"}
            >
              <img src={highestrated} alt="new to old" className="icn" />
              <Text className="fltr_txt" mb={"0px"} fontFamily={"Airbnb"}
               onClick={() => { handleSortClick('HighestpricedTask', 'HighestpricedTask') }}
              >
                Highest priced task
              </Text>
            </Flex>
}

{
  !lowestPriceTask.includes(props?.hideShow?.type) &&

            <Flex
              className={`fltr_itm ${active === "LowestpricedTask" ? "active" : ""}`}
              p={"6px 9px"}
              gap={"15px"}
              alignItems={"center"}
            >
              <img src={lowestrated} alt="new to old" className="icn" />
              <Text className="fltr_txt" mb={"0px"} fontFamily={"Airbnb"}
               onClick={() => { handleSortClick('LowestpricedTask', 'LowestpricedTask') }}
              >
                Lowest priced task
              </Text>
            </Flex>
}

 {/* *******************LATEST AND OLDEST INVOICE ********************** */}
{
  !latestInvoice.includes(props?.hideShow?.type) &&
            <Flex
              className="fltr_itm"
              p={"6px 9px"}
              gap={"15px"}
              alignItems={"center"}
            >
              <img src={highestrcvd} alt="Latest invoice date" className="icn" />
              <Text className="fltr_txt" mb={"0px"} fontFamily={"Airbnb"}>
                Latest invoice date
              </Text>
            </Flex>
      }

{
  !oldestInvoice.includes(props?.hideShow?.type) &&
            <Flex
              className="fltr_itm"
              p={"6px 9px"}
              gap={"15px"}
              alignItems={"center"}
            >
              <img src={lowestrcvd} alt="Oldest invoice date" className="icn" />
              <Text className="fltr_txt" mb={"0px"} fontFamily={"Airbnb"}>
                Oldest invoice date
              </Text>
            </Flex>
}
          </Flex>

{/* ************************* FILTERS START HERE ****************************** */}
          <Flex mb={"10px"} direction={"column"} gap={"10px"}>
            <Text fontSize={"20px"} fontFamily={"AirbnbMedium"}>
              Filter
            </Text>

            {
              !soldContent.includes(props?.hideShow?.type) &&
            <Flex
              className={`fltr_itm ${active1 === "sold" ? "active" : ""}`}
              p={"6px 9px"}
              gap={"15px"}
              alignItems={"center"}
            >
              <img src={soldic} alt="Sold content" className="icn" />
              <Text className="fltr_txt" mb={"0px"} fontFamily={"Airbnb"}
                onClick={() => handleSortClick("sale_status", "sold")}

              >
                Sold content
              </Text>
            </Flex>
            }

            {
              !unSoldContent.includes(props?.hideShow?.type) &&
            <Flex
              className={`fltr_itm ${active1 === "unsold" ? "active" : ""}`}
              p={"6px 9px"}
              gap={"15px"}
              alignItems={"center"}
            >
              <img src={unsoldic} alt="Unsold" className="icn" />
              <Text className="fltr_txt" mb={"0px"} fontFamily={"Airbnb"}
                onClick={() => handleSortClick("sale_status", "unsold")}
              >
                Unsold content
              </Text>
            </Flex>
            }

{
  !publishedContent.includes(props?.hideShow?.type) && 
            <Flex
              className={`fltr_itm ${active === "publishedContent" ? "active" : ""}`}
              p={"6px 9px"}
              gap={"15px"}
              alignItems={"center"}
            >
              <img src={publishedic} alt="Published content" className="icn" />
              <Text className="fltr_txt" mb={"0px"} fontFamily={"Airbnb"}
                onClick={() => handleSortClick("publishedContent", "publishedContent")}
              >
                Published content
              </Text>
            </Flex>
}

{
  !uploadedContent.includes(props?.hideShow?.type) && 
            <Flex
              className={`fltr_itm ${active === "UploadedContent" ? "active" : ""}`}
              p={"6px 9px"}
              gap={"15px"}
              alignItems={"center"}
            >
              <img src={publishedic} alt="Uploaded content" className="icn" />
              <Text className="fltr_txt" mb={"0px"} fontFamily={"Airbnb"}
                onClick={() => handleSortClick("UploadedContent", "UploadedContent")}
              >
                Uploaded content
              </Text>
            </Flex>
}

{
  !pendingContent.includes(props?.hideShow?.type) && 
            <Flex
              className={`fltr_itm ${active === "PendingContent" ? "active" : ""}`}
              p={"6px 9px"}
              gap={"15px"}
              alignItems={"center"}
            >
              <img src={pendingic} alt="Pending content" className="icn" />
              <Text className="fltr_txt" mb={"0px"} fontFamily={"Airbnb"}
                onClick={() => handleSortClick("PendingContent", "PendingContent")}
              >
                Pending content
              </Text>
            </Flex>
}

{
  !rejectedContent.includes(props?.hideShow?.type) && 
            <Flex
              className={`fltr_itm ${active === "RejectedContent" ? "active" : ""}`}
              p={"6px 9px"}
              gap={"15px"}
              alignItems={"center"}
            >
              <img src={rejectedic} alt="Rejected content" className="icn" />
              <Text className="fltr_txt" mb={"0px"} fontFamily={"Airbnb"}
                onClick={() => handleSortClick("RejectedContent", "RejectedContent")}
              >
                Rejected content
              </Text>
            </Flex>
}

        {
  !paymentReceived.includes(props?.hideShow?.type) && 

            <Flex
              className={`fltr_itm ${active === "Paymentreceived" ? "active" : ""}`}
              p={"6px 9px"}
              gap={"15px"}
              alignItems={"center"}
            >
              <img src={soldic} alt="Payment received" className="icn" />
              <Text className="fltr_txt" mb={"0px"} fontFamily={"Airbnb"}
                onClick={() => { handleSortClick('Paymentreceived', 'Paymentreceived') }}
              >
                Payment received
              </Text>
            </Flex>
        }

      
      {
  !PaymentReceivable.includes(props?.hideShow?.type) && 

            <Flex
              className={`fltr_itm ${active === "Paymentreceivable" ? "active" : ""}`}
              p={"6px 9px"}
              gap={"15px"}
              alignItems={"center"}
            >
              <img src={paymentic} alt="Payment payable" className="icn" />
              <Text className="fltr_txt" mb={"0px"} fontFamily={"Airbnb"}
                onClick={() => { handleSortClick('Paymentreceivable', 'Paymentreceivable') }}
              >
                Payment receivable
              </Text>
            </Flex>
      }
      {  !pendingDocument.includes(props?.hideShow?.type) && 
        <Flex
              className={`fltr_itm ${active === "n" ? active : ""}`}
              p={"6px 9px"}
              gap={"15px"}
              alignItems={"center"}
            >
              <img src={pendingdocic} alt="Pending documents" className="icn" />
              <Text className="fltr_txt" mb={"0px"} fontFamily={"Airbnb"}
                onClick={() => handleSortClick('PedingDocuments', " PedingDocuments")}>
                Pending documents
              </Text>
            </Flex>
      }

         {
          !paymentPaid.includes(props?.hideShow?.type) && 
            <Flex
              className={`fltr_itm ${active === "paymentPaid" ? "active" : ""}`}
              p={"6px 9px"}
              gap={"15px"}
              alignItems={"center"}
            >
              <img src={soldic} alt="Payment paid" className="icn" />
              <Text className="fltr_txt" mb={"0px"} fontFamily={"Airbnb"}
                onClick={() => { handleSortClick('paymentPaid', 'paymentPaid') }}
              >
                Payment paid
              </Text>
            </Flex>
         }

         {
          !paymentPayable.includes(props?.hideShow?.type) && 
            <Flex
              className={`fltr_itm ${active === "paymentPayable" ? "active" : ""}`}
              p={"6px 9px"}
              gap={"15px"}
              alignItems={"center"}
            >
              <img src={paymentic} alt="Payment payable" className="icn" />
              <Text className="fltr_txt" mb={"0px"} fontFamily={"Airbnb"}
                onClick={() => { handleSortClick('paymentPayable', 'paymentPayable') }}
              >
                Payment payable
              </Text>
            </Flex>
         }

{
  !invoiceNumber.includes(props?.hideShow?.type) && 
            <Flex
              className="srch_fltr_wrap fltr_itm"
              w="100%"
              p={"6px 9px"}
              justifyContent="space-between"
              alignItems="center"
            >
              <Flex gap={"15px"} alignItems={"center"}>
                <img src={invic} alt="Invoice number" className="icn" />
                <Text className="fltr_txt" mb={"0px"} fontFamily={"Airbnb"}>
                  Invoice number
                </Text>
              </Flex>
              <div className="fltr_srch">
                <img src={srchic} className="srch_icn" alt="" />
                <input type="text" placeholder="Search" className="srch_inp" />
              </div>
            </Flex>
}

{
  !transactionId.includes(props?.hideShow?.type) && 
            <Flex
              className="srch_fltr_wrap fltr_itm"
              w="100%"
              p={"6px 9px"}
              justifyContent="space-between"
              alignItems="center"
            >
              <Flex gap={"15px"} alignItems={"center"}>
                <img src={trnsic} alt="Transaction ID" className="icn" />
                <Text className="fltr_txt" mb={"0px"} fontFamily={"Airbnb"}>
                  Transaction ID
                </Text>
              </Flex>
              <div className="fltr_srch">
                <img src={srchic} className="srch_icn" alt="" />
                <input type="text" placeholder="Search" className="srch_inp" />
              </div>
            </Flex>
}

{
  !hopper.includes(props?.hideShow?.type) && 
   
            <Flex
              className={`srch_fltr_wrap fltr_itm ${active1 === "Hoppers" ? "active" : ""}`}
              w="100%"
              p={"6px 9px"}
              justifyContent="space-between"
              alignItems="center"
            >
              <Flex gap={"15px"} alignItems={"center"}>
                <img src={hopperic} alt="Hopper" className="icn" />
                <Text className="fltr_txt" mb={"0px"} fontFamily={"Airbnb"}>
                  Hopper
                </Text>
              </Flex>
              <div className="fltr_srch">
                <img src={srchic} className="srch_icn" alt="" />
                <input type="text" placeholder="Search" className="srch_inp"
                value = {active === "Hoppers" ? active1 : ""}
                  onChange={(e) => handleSortClick("Hoppers", e.target.value)}
                />
              </div>
            </Flex>
}

{
  !publication.includes(props?.hideShow?.type) && 
      <Flex
              className="srch_fltr_wrap fltr_itm"
              w="100%"
              p={"6px 9px"}
              justifyContent="space-between"
              alignItems="center"
            >
              <Flex gap={"15px"} alignItems={"center"}>
                <img src={staric} alt="Publication" className="icn" />

                <Text className="fltr_txt" mb={"0px"} fontFamily={"Airbnb"}
                
                >
                  Publication
                </Text>

              </Flex>
              <div className="fltr_srch">
                <img src={srchic} className="srch_icn" alt="" />
                <input type="text" placeholder="Search" className="srch_inp"
                  onChange={(e) => { handleSortClick('Publication_search', e.target.value) }}
                />
              </div>
            </Flex>
}

{
  !action.includes(props?.hideShow?.type) && 
  <Flex
              className="action_fltr_wrap fltr_itm"
              w="100%"
              p={"6px 9px"}
              justifyContent="space-between"
              alignItems="start"
            >
              <Flex gap={"15px"} alignItems={"center"}>
                <img src={actionic} alt="Action" className="icn" />
                <Text
                  className="fltr_txt"
                  mb={"0px"}
                  fontSize="15px"
                  fontFamily={"Airbnb"}
                >
                  Action
                </Text>
              </Flex>
              <Flex gap="8px" flexWrap="wrap" flex="2" justifyContent="end">
                <div className="fltr_actn"
                  onClick={() => handleSortClick('Action', "Temporaryblocked")}
                >
                  <Text>Temporary blocked</Text>
                  <img src={closeic} alt="cross" />
                </div>
                <div className="fltr_actn active"
                  onClick={() => handleSortClick('Action', "Permanentblocked")}
                >
                  <Text>Permanent blocked</Text>
                  <img src={closeic} alt="cross" />
                </div>
              </Flex>
            </Flex>
}
            {/* <Flex
              className={`srch_fltr_wrap fltr_itm ${active1 === "Publication_search" ? "active" : ""}`}
              w="100%"
              p={"6px 9px"}
              justifyContent="space-between"
              alignItems="center"
            >
              <Flex gap={"15px"} alignItems={"center"}>
                <img src={staric} alt="Publication" className="icn" />
                <Text className="fltr_txt" mb={"0px"} fontFamily={"Airbnb"}>
                  Publication
                </Text>
              </Flex>
              <div className="fltr_srch">
                <img src={srchic} className="srch_icn" alt="" />
                <input type="text" placeholder="Search" className="srch_inp"
                  onChange={(e) => handleSortClick("Publication_search", e.target.value)}
                />
              </div>
            </Flex> */}

            <Flex
              className="price_fltr_wrap fltr_itm"
              w="100%"
              p={"6px 9px"}
              justifyContent="space-between"
              alignItems="center"
            >
              {/* <Flex gap={"15px"} alignItems={"center"}>
                <img src={paymentic} alt="Price" className="icn" />
                <Text
                  className="fltr_txt"
                  mb={"0px"}
                  fontSize="15px"
                  fontFamily={"Airbnb"}
                >
                  Price
                </Text>
              </Flex> */}

              <Flex gap="8px">
                <div className="select_wrap">
                  {/* <Select placeholder="Sort">
                    <option value="option2" selected>
                      From
                    </option>
                  </Select> */}
                </div>
                <div className="select_wrap">
                  {/* <Select placeholder="Sort">
                    <option value="option2" selected>
                      To
                    </option>
                  </Select> */}

                </div>
              </Flex>
            </Flex>
            <Flex
              className="action_fltr_wrap fltr_itm"
              w="100%"
              p={"6px 9px"}
              justifyContent="space-between"
              alignItems="center"
            >
              <Flex gap={"15px"} alignItems={"center"}>
                <img src={calendaric} alt="Date" className="icn" />
                <Text
                  className="fltr_txt"
                  mb={"0px"}
                  fontSize="15px"
                  fontFamily={"Airbnb"}
                >
                  Date
                </Text>
              </Flex>
              <Flex gap="8px">
                <div className="">
                  <Input
                    type="date"
                    value= {active === "startdate" ? active1 : ""}
                    fontSize="10px"
                    padding="0px 5px"
                    height="28px"
                    width="90px"
                    placeholder="From"
                    onChange={(e) => { handleSortClick('startdate', e.target.value )}}
                    // onChange={(e) => { handleSortClick('startdate', new Date(e.target.value).toISOString()) }}

                  />
                </div>
                <div className="">
                  <Input
                    type="date"
                    value= { query2?.key === "endDate" ? query2?.value  : ""}
                    fontSize="10px"
                    padding="0px 5px"
                    height="28px"
                    width="90px"
                    placeholder="From"
                    // onChange={(e) => { handleSortClick1('endDate', new Date(e.target.value).toISOString()) }}
                    onChange={(e) => { handleSortClick1('endDate',  e.target.value) }}

                  />
                </div>
              </Flex>
            </Flex>
            {
              !location.includes(props?.hideShow?.type) && 
            <Flex
              className="srch_fltr_wrap fltr_itm"
              w="100%"
              p={"6px 9px"}
              justifyContent="space-between"
              alignItems="center"
            >
              <Flex gap={"15px"} alignItems={"center"} className="fil">
                <img src={locationic} alt="Location" className="icn" />
                <Text className="fltr_txt " mb={"0px"} fontFamily={"Airbnb"}>
                  Location
                </Text>
              </Flex>
              <div className="fltr_srch">
                <img src={srchic} className="srch_icn" alt="" />
                <input type="text" placeholder="Search" className="srch_inp"
                value = {query2?.key === "search" ? query2?.value : ""}
                  onChange={(e) => { handleSortClick1('search', e.target.value) }}
                />
              </div>
            </Flex>
            }

            {
              !employee.includes(props?.hideShow?.type) && 
            <Flex
              className="srch_fltr_wrap fltr_itm"
              w="100%"
              p={"6px 9px"}
              justifyContent="space-between"
              alignItems="center"
            >
              <Flex gap={"15px"} alignItems={"center"}>
                <img src={employeeic} alt="employee" className="icn" />
                <Text className="fltr_txt" mb={"0px"} fontFamily={"Airbnb"}                >
                  employee
                </Text>
              </Flex>
              <div className="fltr_srch">
                <img src={srchic} className="srch_icn" alt="" />
                <input type="text" placeholder="Search" className="srch_inp"
                  onChange={(e) => handleSortClick("Employee_search", e.target.value)}

                />
              </div>
            </Flex>
            }

{
  !licence.includes(props?.hideShow?.type) && 
            <Flex
              className="action_fltr_wrap fltr_itm"
              w="100%"
              p={"6px 9px"}
              justifyContent="space-between"
              alignItems="center"
            >
              <Flex gap={"15px"} alignItems={"center"}>
                <img src={licenceic} alt="Licence" className="icn" />
                <Text
                  className="fltr_txt"
                  mb={"0px"}
                  fontSize="15px"
                  fontFamily={"Airbnb"}
                >
                  Licence
                </Text>
              </Flex>
              <Flex gap="8px">
                <div className={`fltr_actn ${active1 === "exclusive" ? "active" : ""}`}>
                  <Text
                    onClick={(e) => { handleSortClick('type', 'exclusive') }}
                  >Exclusive</Text>
                  {/* <img src={closeic} alt="cross" /> */}
                </div>
                <div className={`fltr_actn ${active1 === "shared" ? "active" : ""}`}>
                  <Text
                    onClick={(e) => { handleSortClick('type', 'shared') }}
                  >Shared</Text>
                  {/* <img src={closeic} alt="cross" /> */}
                </div>
              </Flex>
            </Flex>
}

{
  !category.includes(props?.hideShow?.type) && 
            <Flex
              className="action_fltr_wrap fltr_itm"
              w="100%"
              p={"6px 9px"}
              justifyContent="space-between"
              alignItems="start"
            >
              <Flex gap={"15px"} alignItems={"center"}>
                <img src={categoryic} alt="Licence" className="icn" />
                <Text
                  className="fltr_txt"
                  mb={"0px"}
                  fontSize="15px"
                  fontFamily={"Airbnb"}
                >
                  Category
                </Text>
              </Flex>
              <Flex gap="8px" flexWrap="wrap" flex="2" justifyContent="end">
                {
                  categoryName && categoryName.map((curr) => {
                    return (
                      <div className={`fltr_actn ${active1 === curr?._id ? "active" : ""}`} key={curr?._id}>
                        <Text onClick={() => handleSortClick("category", curr?._id)}>{curr?.name}</Text>
                      </div>
                    )
                  })
                }
              </Flex>
            </Flex>
}

            {/* <Flex
              className="action_fltr_wrap fltr_itm"
              w="100%"
              p={"6px 9px"}
              justifyContent="space-between"
              alignItems="start"
            >
              <Flex gap={"15px"} alignItems={"center"}>
                <img src={typeic} alt="Type" className="icn" />
                <Text
                  className="fltr_txt"
                  mb={"0px"}
                  fontSize="15px"
                  fontFamily={"Airbnb"}
                >
                  Type
                </Text>
              </Flex>

              <Flex gap="8px" flexWrap="wrap" flex="2" justifyContent="end">
                <div className={`fltr_actn ${active === "Images" ? "active" : ""}`}>
                  <Text
                    onClick={(e) => { handleSortClick('Images', 'Images') }}
                  >Images</Text>
                  <img src={closeic} alt="cross" />
                </div>
                <div className={`fltr_actn ${active === "Videos" ? "active" : ""}`}>
                  <Text
                    onClick={(e) => { handleSortClick('Videos', 'Videos') }}
                  >Videos</Text>
                  <img src={closeic} alt="cross" />
                </div>
                <div className={`fltr_actn ${active === "Interviews" ? "active" : ""}`}>
                  <Text
                    onClick={(e) => { handleSortClick('Interviews', 'Interviews') }}
                  >Interviews</Text>
                  <img src={closeic} alt="cross" />
                </div>
              </Flex>

            </Flex> */}
            
            <Button className="theme_btn filter_btn" onClick={handleApplyClick}>
              Apply
            </Button>
          </Flex>
        </div>}
    </>
  );
}
