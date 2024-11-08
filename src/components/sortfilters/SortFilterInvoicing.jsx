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
import actionic from "../../assets/img/sorticons/action.svg";
import hopperic from "../../assets/img/sorticons/user.svg";
import staric from "../../assets/img/sorticons/star.svg";
import calendaric from "../../assets/img/sorticons/date.svg";
import locationic from "../../assets/img/sorticons/location.svg";
import employeeic from "../../assets/img/sorticons/employee.svg";
import licenceic from "../../assets/img/sorticons/licence.svg";
import categoryic from "../../assets/img/sorticons/category.svg";
import typeic from "../../assets/img/sorticons/type.svg";
import { Get } from "api/admin.services";

export default function SortFilterInvoicing(props) {
  const [categoryName, setCategoryName] = useState([])
  const [active, setActive] = useState()
  const [active1, setActive1] = useState()

  const handleSortClick = (value, value2) => {
    setActive(value)
    setActive1(value2)
    props.sendDataToParent(value, value2)
  };

  const handleSortClick1 = (value1, value2) => {
    props.sendDataToParent1(value1, value2)
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
            <a className="link">Clear all</a>
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
              onClick={() => { handleSortClick('NewtoOld', 'NewtoOld') }}
            >
              <img src={newtoold} alt="new to old" className="icn" />
              <Text className="fltr_txt" mb={"0px"} fontFamily={"Airbnb"}
              >
                New to old
              </Text>
            </Flex>
            <Flex
              className={`fltr_itm ${active === "OldtoNew" ? "active" : ""}`}
              p={"6px 9px"}
              gap={"15px"}
              alignItems={"center"}
              onClick={() => { handleSortClick('OldtoNew', 'OldtoNew') }}
            >
              <img src={oldtonew} alt="new to old" className="icn" />
              <Text className="fltr_txt" mb={"0px"} fontFamily={"Airbnb"}>
                Old to new
              </Text>
            </Flex>

            <Flex
              className={`fltr_itm ${active === "HighestPaymentReceived" ? "active" : ""}`}
              p={"6px 9px"}
              gap={"15px"}
              alignItems={"center"}
              onClick={() => { handleSortClick('HighestPaymentReceived', 'HighestPaymentReceived') }}

            >
              <img src={highestrcvd} alt="new to old" className="icn" />
              <Text className="fltr_txt" mb={"0px"} fontFamily={"Airbnb"}>
                Highest payment received
              </Text>
            </Flex>
            <Flex
              className={`fltr_itm ${active === "LowestPaymentReceived" ? "active" : ""}`}
              p={"6px 9px"}
              gap={"15px"}
              alignItems={"center"}
              onClick={() => { handleSortClick('LowestPaymentReceived', 'LowestPaymentReceived') }}

            >
              <img src={lowestrcvd} alt="new to old" className="icn" />
              <Text className="fltr_txt" mb={"0px"} fontFamily={"Airbnb"}>
                Lowest payment received
              </Text>
            </Flex>

            <Flex
              className={`fltr_itm ${active === "Highestpricedcontent" ? "active" : ""}`}
              p={"6px 9px"}
              gap={"15px"}
              alignItems={"center"}
              onClick={() => { handleSortClick('Highestpricedcontent', 'Highestpricedcontent') }}

            >
              <img src={highestrated} alt="new to old" className="icn" />
              <Text className="fltr_txt" mb={"0px"} fontFamily={"Airbnb"}>
                Highest priced content
              </Text>
            </Flex>
            <Flex
              className={`fltr_itm ${active === "Lowestpricedcontent" ? "active" : ""}`}
              p={"6px 9px"}
              gap={"15px"}
              alignItems={"center"}
              onClick={() => { handleSortClick('Lowestpricedcontent', 'Lowestpricedcontent') }}

            >
              <img src={lowestrated} alt="new to old" className="icn" />
              <Text className="fltr_txt" mb={"0px"} fontFamily={"Airbnb"}>
                Lowest priced content
              </Text>
            </Flex>

            <Flex
              className={`fltr_itm ${active === "HighestPaymentReceived" ? "active" : ""}`}
              p={"6px 9px"}
              gap={"15px"}
              alignItems={"center"}
              onClick={() => handleSortClick('HighestPaymentReceived', "HighestPaymentReceived")}

            >
              <img src={highestrated} alt="new to old" className="icn" />
              <Text className="fltr_txt" mb={"0px"} fontFamily={"Airbnb"}>
                Highest priced task
              </Text>
            </Flex>
            <Flex
              className={`fltr_itm ${active === "LowestpriceTask" ? "active" : ""}`}
              p={"6px 9px"}
              gap={"15px"}
              alignItems={"center"}

            >
              <img src={lowestrated} alt="new to old" className="icn" />
              <Text className="fltr_txt" mb={"0px"} fontFamily={"Airbnb"} 
                onClick={() => handleSortClick('LowestpriceTask', "LowestpriceTask")}
              >
                Lowest priced task
              </Text>
            </Flex>

            <Flex
              className={`fltr_itm ${active === "LatestInvoice" ? "active" : ""}`}
              p={"6px 9px"}
              gap={"15px"}
              alignItems={"center"}
            >
              <img src={highestrcvd} alt="new to old" className="icn" />
              <Text className="fltr_txt" mb={"0px"} fontFamily={"Airbnb"} 
                onClick={() => handleSortClick('LatestInvoice', "LatestInvoice")}
              >
                Latest invoice date
              </Text>
            </Flex>
            <Flex
              className={`fltr_itm ${active === "OldInvoice" ? "active" : ""}`}
              p={"6px 9px"}
              gap={"15px"}
              alignItems={"center"}
            >
              <img src={lowestrcvd} alt="new to old" className="icn" />
              <Text className="fltr_txt" mb={"0px"} fontFamily={"Airbnb"} 
                onClick={() => handleSortClick('OldInvoice', "OldInvoice")}
              >
                Oldest invoice date
              </Text>
            </Flex>
          </Flex>

          <Flex mb={"10px"} direction={"column"} gap={"10px"}>
            <Text fontSize={"20px"} fontFamily={"AirbnbMedium"}>
              Filter
            </Text>
            <Flex
              className={`fltr_itm ${active1 === "sold" ? "active" : ""}`}
              p={"6px 9px"}
              gap={"15px"}
              alignItems={"center"}
              onClick={() => handleSortClick('sale_status', "sold")}

            >
              <img src={soldic} alt="Sold content" className="icn" />
              <Text className="fltr_txt" mb={"0px"} fontFamily={"Airbnb"}>
                Sold content
              </Text>
            </Flex>
            <Flex
              className={`fltr_itm ${active1 === "unsold" ? "active" : ""}`}
              p={"6px 9px"}
              gap={"15px"}
              alignItems={"center"}
              onClick={() => handleSortClick('sale_status', "unsold")}

            >
              <img src={unsoldic} alt="Unsold" className="icn" />
              <Text className="fltr_txt" mb={"0px"} fontFamily={"Airbnb"}>
                Unsold content
              </Text>
            </Flex>
            <Flex
              className={`fltr_itm ${active === "PublishContent" ? "active" : ""}`}
              p={"6px 9px"}
              gap={"15px"}
              alignItems={"center"}
            >
              <img src={publishedic} alt="Published content" className="icn" />
              <Text className="fltr_txt" mb={"0px"} fontFamily={"Airbnb"}
                onClick={() => { handleSortClick('PublishContent', 'PublishContent') }}
              >
                Published content
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
              <Text className="fltr_txt" mb={"0px"} fontFamily={"Airbnb"}>
                Payment received
              </Text>
            </Flex>

            <Flex
              className={`fltr_itm ${active === "paymentPaid" ? "active" : ""}`}
              p={"6px 9px"}
              gap={"15px"}
              alignItems={"center"}
              onClick={() => { handleSortClick('paymentPaid', 'paymentPaid') }}
            >
              <img src={paymentic} alt="Payment paid" className="icn" />
              <Text className="fltr_txt" mb={"0px"} fontFamily={"Airbnb"}>
                Payment paid
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
              <Text className="fltr_txt" mb={"0px"} fontFamily={"Airbnb"}>
                Payment payable
              </Text>
            </Flex>

            <Flex
              className="srch_fltr_wrap fltr_itm"
              w="100%"
              p={"6px 9px"}
              justifyContent="space-between"
              alignItems="center"
            >
              <Flex gap={"15px"} alignItems={"center"}>
                <img src={invic} alt="Rejected content" className="icn" />
                <Text className="fltr_txt" mb={"0px"} fontFamily={"Airbnb"}>
                  Invoice number
                </Text>
              </Flex>
              <div className="fltr_srch">
                <img src={srchic} className="srch_icn" alt="" />
                <input type="text" placeholder="Search" className="srch_inp" />
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
                <img src={trnsic} alt="Rejected content" className="icn" />
                <Text className="fltr_txt" mb={"0px"} fontFamily={"Airbnb"}>
                  Transaction ID
                </Text>
              </Flex>
              <div className="fltr_srch">
                <img src={srchic} className="srch_icn" alt="" />
                <input type="text" placeholder="Search" className="srch_inp" />
              </div>
            </Flex>
            <Flex
              className="action_fltr_wrap fltr_itm"
              w="100%"
              p={"6px 9px"}
              justifyContent="space-between"
              alignItems="start"
            >
              <Flex gap={"15px"} alignItems={"center"}>
                <img src={actionic} alt="Rejected content" className="icn" />
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
                  <Text>Reminder sent</Text>
                  <img src={closeic} alt="cross" />
                </div>
                <div className="fltr_actn active">
                  <Text>Statement sent</Text>
                  <img src={closeic} alt="cross" />
                </div>
                <div className="fltr_actn active">
                  <Text>Removed</Text>
                  <img src={closeic} alt="cross" />
                </div>
                <div className="fltr_actn active">
                  <Text>Blocked access</Text>
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
                <img src={hopperic} alt="Rejected content" className="icn" />
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
                <img src={staric} alt="Rejected content" className="icn" />
                <Text className="fltr_txt" mb={"0px"} fontFamily={"Airbnb"}>
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
            <Flex
              className="price_fltr_wrap fltr_itm"
              w="100%"
              p={"6px 9px"}
              justifyContent="space-between"
              alignItems="center"
            >
              <Flex gap={"15px"} alignItems={"center"}>
                <img src={paymentic} alt="Rejected content" className="icn" />
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
                <img src={calendaric} alt="Rejected content" className="icn" />
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
                    onChange={(e) => { handleSortClick('startdate', e.target.value) }}

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
                    onChange={(e) => { handleSortClick1('endDate', e.target.value) }}

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
                <img src={locationic} alt="Rejected content" className="icn" />
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
                <img src={employeeic} alt="Rejected content" className="icn" />
                <Text className="fltr_txt" mb={"0px"} fontFamily={"Airbnb"}>
                  employee
                </Text>
              </Flex>
              <div className="fltr_srch">
                <img src={srchic} className="srch_icn" alt="" />
                <input type="text" placeholder="Search" className="srch_inp"
                  onChange={(e) => { handleSortClick('Employee_search', e.target.value) }}
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
                <div className="fltr_actn">
                  <Text
                    onClick={(e) => { handleSortClick('license_search', "Exclusive") }}
                  >Exclusive</Text>
                  <img src={closeic} alt="cross" />
                </div>
                <div className="fltr_actn active">
                  <Text
                    onClick={(e) => { handleSortClick('license_search', "Shared") }}
                  >Shared</Text>
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
                        <Text onClick={() => handleSortClick(curr?.name, curr?.name)}>{curr?.name}</Text>
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
                <div className="fltr_actn active">
                  <Text
                    onClick={(e) => { handleSortClick('Interviews', 'Interviews') }}
                  >Interviews</Text>
                  <img src={closeic} alt="cross" />
                </div>
              </Flex>

            </Flex>
            <Button className="filter_btn" onClick={handleApplyClick}>Apply</Button>
          </Flex>
        </div>}
    </>
  );
}
