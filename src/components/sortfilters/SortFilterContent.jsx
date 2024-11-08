// Chakra imports
import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  // Box,
  Flex,
  Input,
  Text,
  Select
} from "@chakra-ui/react";
import closeic from "assets/img/sorticons/close.svg";
import newtoold from "assets/img/sorticons/new-to-old.svg";
import oldtonew from "assets/img/sorticons/old-to-new.svg";
import highestrated from "assets/img/sorticons/highest-rated.svg";
import lowestrated from "assets/img/sorticons/Lowest-rated.svg";
import highestrcvd from "assets/img/sorticons/highest-payment.svg";
import lowestrcvd from "assets/img/sorticons/lowest-payment.svg";
import soldic from "assets/img/sorticons/sold.svg";
import unsoldic from "assets/img/sorticons/unsold.svg";
import publishedic from "assets/img/sorticons/published-content.svg";
import pendingic from "assets/img/sorticons/pending-content.svg";
import rejectedic from "assets/img/sorticons/rejected-content.svg";
import paymentic from "assets/img/sorticons/payment.svg";
import srchic from "assets/img/sorticons/Search.svg";
import invoiceic from "assets/img/sorticons/invoice.svg";
import transactionic from "assets/img/sorticons/transaction.svg";
import actionic from "assets/img/sorticons/action.svg";
import hopperic from "assets/img/sorticons/user.svg";
import publicationic from "assets/img/sorticons/star.svg";
import employeeidic from "assets/img/sorticons/employee.svg";


import invic from "assets/img/sorticons/invoice.svg";
import trnsic from "assets/img/sorticons/transaction.svg";
import staric from "assets/img/sorticons/star.svg";
import calendaric from "assets/img/sorticons/date.svg";
import locationic from "assets/img/sorticons/location.svg";
import employeeic from "assets/img/sorticons/employee.svg";
import licenceic from "assets/img/sorticons/licence.svg";
import categoryic from "assets/img/sorticons/category.svg";
import typeic from "assets/img/sorticons/type.svg";
import { Get } from "api/admin.services";

export default function SortFilterContent(props) {
  const [categoryName, setCategoryName] = useState([]);
  const [active, setActive] = useState()
  const [active1, setActive1] = useState()

  const handleSortClick = (value, value2) => {
    setActive(value)
    setActive1(value2)
    props.sendDataToParent(value, value2)
  };
  const handleSortClick1 = (value, value2) => {
    props.sendDataToParent1(value, value2)
  };


  const handleApplyClick = () => {
    props?.handleApplySorting();
  };

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


  return (
    <>
      {/* {console.log(props, `<--these are props`)} */}
      {props?.hideShow.status === true &&
        <div className="sort_filter_wrap">
          <Flex
            alignItems={"center"}
            justify={"space-between"}
            className="sort_hdng"
            mb={"30px"}>
            <sapn onClick={props?.closeSort}>

              <img src={closeic} alt="close" className="icn" />
            </sapn>

            <Text fontSize={"20px"} mb={"0px"} fontFamily={"AirbnbBold"}>
              Sort and Filter
            </Text>
            <a className="link">Clear all</a>
          </Flex>
          <Flex mb={"30px"} direction={"column"} gap={"10px"}>
            <Text fontSize={"20px"} fontFamily={"AirbnbMedium"}>
              Sort
            </Text>
            <Flex
              className={`fltr_itm ${active === "NewtoOld" ? "active" : ""}`}
              p={"6px 9px"} gap={"15px"} alignItems={"center"} onClick={() => { handleSortClick('NewtoOld', 'NewtoOld') }}>
              <img src={newtoold} alt="new to old" className="icn" />
              <Text fontSize={"15px"} mb={"0px"} fontFamily={"Airbnb"}>
                New to old
              </Text>
            </Flex>
            <Flex
              className={`fltr_itm ${active === "OldtoNew" ? "active" : ""}`}
              p={"6px 9px"} gap={"15px"} alignItems={"center"} onClick={() => { handleSortClick('OldtoNew', 'OldtoNew') }}>
              <img src={oldtonew} alt="new to old" className="icn" />
              <Text fontSize={"15px"} mb={"0px"} fontFamily={"Airbnb"}>
                Old to new
              </Text>
            </Flex>

            <Flex
              className={`fltr_itm ${active === "Highest rated" ? "active" : ""}`}
              p={"6px 9px"} gap={"15px"} alignItems={"center"} onClick={() => handleSortClick('Highest rated')}>
              <img src={highestrated} alt="new to old" className="icn" />
              <Text fontSize={"15px"} mb={"0px"} fontFamily={"Airbnb"}>
                Highest rated
              </Text>
            </Flex>
            <Flex
              className={`fltr_itm ${active === "Lowest rated" ? "active" : ""}`}
              p={"6px 9px"} gap={"15px"} alignItems={"center"} onClick={() => handleSortClick('Lowest rated')}>
              <img src={lowestrated} alt="new to old" className="icn" />
              <Text fontSize={"15px"} mb={"0px"} fontFamily={"Airbnb"}>
                Lowest rated
              </Text>
            </Flex>
            <Flex
              className={`fltr_itm ${active === "highpaymentrecived" ? "active" : ""}`}
              p={"6px 9px"} gap={"15px"} alignItems={"center"} onClick={() => handleSortClick('highpaymentrecived', 'highpaymentrecived')}>
              <img src={highestrcvd} alt="new to old" className="icn" />
              <Text fontSize={"15px"} mb={"0px"} fontFamily={"Airbnb"}>
                Highest payment received
              </Text>
            </Flex>
            <Flex
              className={`fltr_itm ${active === "lowpaymentrecived" ? "active" : ""}`}
              p={"6px 9px"} gap={"15px"} alignItems={"center"} onClick={() => handleSortClick('lowpaymentrecived', 'lowpaymentrecived')}>
              <img src={lowestrcvd} alt="new to old" className="icn" />
              <Text fontSize={"15px"} mb={"0px"} fontFamily={"Airbnb"}>
                Lowest payment received
              </Text>
            </Flex>
            <Flex
              className={`fltr_itm ${active === "Highestpricedcontent" ? "active" : ""}`}
              p={"6px 9px"} gap={"15px"} alignItems={"center"} onClick={() => handleSortClick('Highestpricedcontent', 'Highestpricedcontent')}>
              <img src={highestrated} alt="new to old" className="icn" />
              <Text fontSize={"15px"} mb={"0px"} fontFamily={"Airbnb"}>
                Highest priced content
              </Text>
            </Flex>
            <Flex
              className={`fltr_itm ${active === "Lowestpricedcontent" ? "active" : ""}`}
              p={"6px 9px"} gap={"15px"} alignItems={"center"} onClick={() => handleSortClick('Lowestpricedcontent', 'Lowestpricedcontent')}>
              <img src={lowestrated} alt="new to old" className="icn" />
              <Text fontSize={"15px"} mb={"0px"} fontFamily={"Airbnb"}>
                Lowest priced content
              </Text>
            </Flex>
            <Flex
              className={`fltr_itm ${active === "Latest task" ? "active" : ""}`}
              p={"6px 9px"} gap={"15px"} alignItems={"center"} onClick={() => handleSortClick('Latest task')}>
              <img src={highestrcvd} alt="new to old" className="icn" />
              <Text fontSize={"15px"} mb={"0px"} fontFamily={"Airbnb"}>
                Latest task
              </Text>
            </Flex>
            <Flex
              className={`fltr_itm ${active === "Oldest task" ? "active" : ""}`}
              p={"6px 9px"} gap={"15px"} alignItems={"center"} onClick={() => handleSortClick('Oldest task')}>
              <img src={lowestrcvd} alt="new to old" className="icn" />
              <Text fontSize={"15px"} mb={"0px"} fontFamily={"Airbnb"}>
                Oldest task
              </Text>
            </Flex>
            <Flex
              className={`fltr_itm ${active === "Highest priced task" ? "active" : ""}`}
              p={"6px 9px"} gap={"15px"} alignItems={"center"} onClick={() => handleSortClick('Highest priced task')}>
              <img src={highestrated} alt="new to old" className="icn" />
              <Text fontSize={"15px"} mb={"0px"} fontFamily={"Airbnb"}>
                Highest priced task
              </Text>
            </Flex>
            <Flex
              className={`fltr_itm ${active === "Lowest priced task" ? "active" : ""}`}
              p={"6px 9px"} gap={"15px"} alignItems={"center"} onClick={() => handleSortClick('Lowest priced task')}>
              <img src={lowestrated} alt="new to old" className="icn" />
              <Text fontSize={"15px"} mb={"0px"} fontFamily={"Airbnb"}>
                Lowest priced task
              </Text>
            </Flex>
          </Flex>

          <Flex mb={"30px"} direction={"column"} gap={"10px"}>
            <Text fontSize={"20px"} fontFamily={"AirbnbMedium"}>
              Filter
            </Text>
            <Flex
              className={`fltr_itm ${active1 === "sold" ? "active" : ""}`}
              p={"6px 9px"} gap={"15px"} alignItems={"center"} onClick={() => handleSortClick('sale_status', "sold")}>
              <img src={soldic} alt="Sold content" className="icn" />
              <Text fontSize={"15px"} mb={"0px"} fontFamily={"Airbnb"}

              >
                Sold content
              </Text>
            </Flex>
            <Flex
              className={`fltr_itm ${active1 === "unsold" ? "active" : ""}`}
              p={"6px 9px"} gap={"15px"} alignItems={"center"} onClick={() => handleSortClick('sale_status', 'unsold')}>
              <img src={unsoldic} alt="Unsold" className="icn" />
              <Text fontSize={"15px"} mb={"0px"} fontFamily={"Airbnb"}>
                Unsold content
              </Text>
            </Flex>
            <Flex
              className={`fltr_itm ${active === "Publishedcontent" ? "active" : ""}`}
              p={"6px 9px"} gap={"15px"} alignItems={"center"}
              onClick={() => handleSortClick('Publishedcontent', 'Publishedcontent')}
            >
              <img src={publishedic} alt="Published content" className="icn" />
              <Text fontSize={"15px"} mb={"0px"} fontFamily={"Airbnb"}>
                Published content
              </Text>
            </Flex>

            <Flex
              className={`fltr_itm ${active === "PendingContent" ? "active" : ""}`}
              p={"6px 9px"}
              gap={"15px"}
              alignItems={"center"}
              onClick={() => handleSortClick('PendingContent', 'PendingContent')}
            >
              <img src={pendingic} alt="Pending content" className="icn" />
              <Text className="fltr_txt" mb={"0px"} fontFamily={"Airbnb"}
              // onClick={() => handleSortClick("PendingContent", "PendingContent")}
              >
                Pending content
              </Text>
            </Flex>
            <Flex
              className={`fltr_itm ${active === "rejected" ? "active" : ""}`}
              p={"6px 9px"}
              gap={"15px"}
              alignItems={"center"}
              onClick={() => handleSortClick("status", "rejected")}

            >
              <img src={rejectedic} alt="Rejected content" className="icn" />
              <Text className="fltr_txt" mb={"0px"} fontFamily={"Airbnb"}
              >
                Rejected content
              </Text>
            </Flex>
            <Flex
              className={`fltr_itm ${active === "Paymentreceived" ? "active" : ""}`}
              p={"6px 9px"}
              gap={"15px"}
              alignItems={"center"}
              onClick={() => { handleSortClick('Paymentreceived', 'Paymentreceived') }}
            >
              <img src={soldic} alt="Payment received" className="icn" />
              <Text className="fltr_txt" mb={"0px"} fontFamily={"Airbnb"}
              >
                Payment received
              </Text>
            </Flex>
            <Flex
              className={`fltr_itm ${active === "paymentPayable" ? "active" : ""}`}
              p={"6px 9px"}
              gap={"15px"}
              alignItems={"center"}
              onClick={() => { handleSortClick('paymentPayable', 'paymentPayable') }}
            >
              <img src={paymentic} alt="Payment payable" className="icn" />
              <Text className="fltr_txt" mb={"0px"} fontFamily={"Airbnb"}
              >
                Payment payable
              </Text>
            </Flex>
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
                <div className="fltr_actn">
                  <Text>1st level check</Text>
                  <img src={closeic} alt="cross" />
                </div>
                <div className="fltr_actn active">
                  <Text>2nd level check</Text>
                  <img src={closeic} alt="cross" />
                </div>
              </Flex>
            </Flex>

            <Flex
              className="srch_fltr_wrap fltr_itm"
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
                  onChange={(e) => handleSortClick("Hoppers", e.target.value)}

                />
              </div>
            </Flex>
            <Flex
              className="srch_fltr_wrap fltr_itm"
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
            </Flex>
            <Flex
              className="price_fltr_wrap fltr_itm"
              w="100%"
              p={"6px 9px"}
              justifyContent="space-between"
              alignItems="center"
            >
              <Flex gap={"15px"} alignItems={"center"}>
                <img src={paymentic} alt="Price" className="icn" />
                <Text
                  className="fltr_txt"
                  mb={"0px"}
                  fontSize="15px"
                  fontFamily={"Airbnb"}
                >
                  Price
                </Text>
              </Flex>
              <Flex gap="8px">
                <div className="select_wrap">
                  <Select placeholder="Sort">
                    <option value="option2" selected>
                      From
                    </option>
                  </Select>
                </div>
                <div className="select_wrap">
                  <Select placeholder="Sort">
                    <option value="option2" selected>
                      To
                    </option>
                  </Select>
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
                    fontSize="10px"
                    padding="0px 5px"
                    height="28px"
                    width="90px"
                    placeholder="From"
                    onChange={(e) => handleSortClick("startdate", e.target.value)}
                  />
                </div>
                <div className="">
                  <Input
                    type="date"
                    fontSize="10px"
                    padding="0px 5px"
                    height="28px"
                    width="90px"
                    placeholder="To"
                    onChange={(e) => handleSortClick1("endDate", e.target.value)}
                  />
                </div>
              </Flex>
            </Flex>
            <Flex
              className="srch_fltr_wrap fltr_itm"
              w="100%"
              p={"6px 9px"}
              justifyContent="space-between"
              alignItems="center"
            >
              <Flex gap={"15px"} alignItems={"center"}>
                <img src={locationic} alt="Location" className="icn" />
                <Text className="fltr_txt" mb={"0px"} fontFamily={"Airbnb"}>
                  Location
                </Text>
              </Flex>
              <div className="fltr_srch">
                <img src={srchic} className="srch_icn" alt="" />
                <input type="text" placeholder="Search" className="srch_inp"
                  onChange={(e) => { handleSortClick1('location_search', e.target.value) }}

                />
              </div>
            </Flex>
            <Flex
              className="srch_fltr_wrap fltr_itm"
              w="100%"
              p={"6px 9px"}
              justifyContent="space-between"
              alignItems="center"
            >
              <Flex gap={"15px"} alignItems={"center"}>
                <img src={employeeic} alt="employee" className="icn" />
                <Text className="fltr_txt" mb={"0px"} fontFamily={"Airbnb"}>
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
                <div className="fltr_actn"
                  onClick={() => handleSortClick('Licence_search', 'Exclusive')}
                >
                  <Text>Exclusive</Text>
                  <img src={closeic} alt="cross" />
                </div>
                <div className="fltr_actn active"
                  onClick={() => handleSortClick('Licence_search', 'Shared')}
                >
                  <Text>Shared</Text>
                  <img src={closeic} alt="cross" />
                </div>
              </Flex>
            </Flex>
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
                      <div className="fltr_actn" key={curr?._id}>
                        <Text onClick={() => handleSortClick("category_id", curr?._id)}>{curr?.name}</Text>
                      </div>
                    )
                  })
                }
              </Flex>
            </Flex>
            <Flex
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
                <div className="fltr_actn">
                  <Text
                    onClick={(e) => { handleSortClick('Images', 'Images') }}

                  >Images</Text>
                  <img src={closeic} alt="cross" />
                </div>
                <div className="fltr_actn active">
                  <Text
                    onClick={(e) => { handleSortClick('Videos', 'Videos') }}
                  >Videos</Text>
                  <img src={closeic} alt="cross" />
                </div>
                {/* <div className="fltr_actn active">
                  <Text>Scans</Text>
                  <img src={closeic} alt="cross" />
                </div> */}
                <div className="fltr_actn active">
                  <Text
                    onClick={(e) => { handleSortClick('Interviews', 'Interviews') }}
                  >Interviews</Text>
                  <img src={closeic} alt="cross" />
                </div>
                {/* <div className="fltr_actn active">
                  <Text>Recordings</Text>
                  <img src={closeic} alt="cross" />
                </div> */}
              </Flex>
            </Flex>
            <Button className="theme_btn filter_btn" onClick={handleApplyClick}>
              Apply
            </Button>
          </Flex>
        </div>}
    </>
  );
}
