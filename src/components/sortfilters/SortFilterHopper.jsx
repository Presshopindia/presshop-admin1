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
import Pendingdocic from "../../assets/img/sorticons/penidng-doc.svg";
import classic from "../../assets/img/sorticons/class.svg";
import { Get } from "api/admin.services";

export default function SortFilterHopper(props) {
  const [categoryName, setCategoryName] = useState([])

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
      // console.log(error)
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

            <Flex className={`fltr_itm ${active === "NewtoOld" ? "active" : ""}`} p={"6px 9px"} gap={"15px"} alignItems={"center"}
              onClick={() => { handleSortClick('NewtoOld', 'NewtoOld') }}
            >
              <img src={newtoold} alt="new to old" className="icn" />
              <Text className="fltr_txt" mb={"0px"} fontFamily={"Airbnb"}>
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
              className={`fltr_itm ${active === "HighestRated" ? "active" : ""}`}
              p={"6px 9px"}
              gap={"15px"}
              alignItems={"center"}
              onClick={() => { handleSortClick('HighestRated', 'HighestRated') }}>
              <img src={highestrated} alt="new to old" className="icn" />
              <Text className="fltr_txt" mb={"0px"} fontFamily={"Airbnb"}>
                Highest rated
              </Text>
            </Flex>
            <Flex
              className={`fltr_itm ${active === "LowestRated" ? "active" : ""}`}
              p={"6px 9px"}
              gap={"15px"}
              alignItems={"center"}
              onClick={() => { handleSortClick('LowestRated', 'LowestRated') }}
            >
              <img src={lowestrated} alt="new to old" className="icn" />
              <Text className="fltr_txt" mb={"0px"} fontFamily={"Airbnb"}>
                Lowest rated
              </Text>
            </Flex>

            <Flex
              className={`fltr_itm ${active === "Highestpricedcontent" ? "active" : ""}`}
              p={"6px 9px"}
              gap={"15px"}
              alignItems={"center"}
            >
              <img src={highestrated} alt="new to old" className="icn" />
              <Text className="fltr_txt" mb={"0px"} fontFamily={"Airbnb"}
                onClick={() => handleSortClick('Highestpricedcontent', " Highestpricedcontent")}
              >
                Highest priced content
              </Text>
            </Flex>
            <Flex
              className={`fltr_itm ${active === "Lowestpricedcontent" ? "active" : ""}`}
              p={"6px 9px"}
              gap={"15px"}
              alignItems={"center"}
            >
              <img src={lowestrated} alt="new to old" className="icn" />
              <Text className="fltr_txt" mb={"0px"} fontFamily={"Airbnb"}
                onClick={() => handleSortClick('Lowestpricedcontent', " Lowestpricedcontent")}
              >
                Lowest priced content
              </Text>
            </Flex>

            <Flex
              className={`fltr_itm ${active === "HighestPaymentReceived" ? "active" : ""}`}
              p={"6px 9px"}
              gap={"15px"}
              alignItems={"center"}
            >
              <img src={highestrcvd} alt="new to old" className="icn" />
              <Text className="fltr_txt" mb={"0px"} fontFamily={"Airbnb"}
                onClick={() => handleSortClick('HighestPaymentReceived', "HighestPaymentReceived")}
              >
                Highest payment received
              </Text>
            </Flex>
            <Flex
              className={`fltr_itm ${active === "LowestPaymentReceived" ? "active" : ""}`}
              p={"6px 9px"}
              gap={"15px"}
              alignItems={"center"}
              onClick={() => handleSortClick('LowestPaymentReceived', "LowestPaymentReceived")}

            >
              <img src={lowestrcvd} alt="new to old" className="icn" />
              <Text className="fltr_txt" mb={"0px"} fontFamily={"Airbnb"}>
                Lowest payment received
              </Text>
            </Flex>

            <Flex
              className={`fltr_itm ${active === "LatestTask" ? "active" : ""}`}
              p={"6px 9px"}
              gap={"15px"}
              alignItems={"center"}
              onClick={() => handleSortClick('LatestTask', "LatestTask")}


            >
              <img src={highestrcvd} alt="new to old" className="icn" />
              <Text className="fltr_txt" mb={"0px"} fontFamily={"Airbnb"}>
                Latest task
              </Text>
            </Flex>
            <Flex
              className={`fltr_itm ${active === "oldestTask" ? "active" : ""}`}
              p={"6px 9px"}
              gap={"15px"}
              alignItems={"center"}
              onClick={() => handleSortClick('oldestTask', "oldestTask")}


            >
              <img src={lowestrcvd} alt="new to old" className="icn" />
              <Text className="fltr_txt" mb={"0px"} fontFamily={"Airbnb"}>
                Oldest task
              </Text>
            </Flex>
            <Flex
              className={`fltr_itm ${active === "highPricedTask" ? "active" : ""}`}
              p={"6px 9px"}
              gap={"15px"}
              alignItems={"center"}
              onClick={() => handleSortClick('highPricedTask', "highPricedTask")}


            >
              <img src={highestrated} alt="new to old" className="icn" />
              <Text className="fltr_txt" mb={"0px"} fontFamily={"Airbnb"}>
                Highest priced task
              </Text>
            </Flex>
            <Flex
              className={`fltr_itm ${active === "lowestPricedTask" ? "active" : ""}`}
              p={"6px 9px"}
              gap={"15px"}
              alignItems={"center"}
              onClick={() => handleSortClick('lowestPricedTask', "lowestPricedTask")}

            >
              <img src={lowestrated} alt="new to old" className="icn" />
              <Text className="fltr_txt" mb={"0px"} fontFamily={"Airbnb"}>
                Lowest priced task
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
              className={`fltr_itm ${active === "publishedContent" ? "active" : ""}`}
              p={"6px 9px"}
              gap={"15px"}
              alignItems={"center"}
              onClick={() => handleSortClick('publishedContent', "publishedContent")}


            >
              <img src={publishedic} alt="Published content" className="icn" />
              <Text className="fltr_txt" mb={"0px"} fontFamily={"Airbnb"}>
                Published content
              </Text>
            </Flex>

            <Flex
              className={`fltr_itm ${active === "uploadedContent" ? "active" : ""}`}
              p={"6px 9px"}
              gap={"15px"}
              alignItems={"center"}
              onClick={() => handleSortClick('uploadedContent', "uploadedContent")}

            >
              <img src={publishedic} alt="Uploaded content" className="icn" />
              <Text className="fltr_txt" mb={"0px"} fontFamily={"Airbnb"}>
                Uploaded content
              </Text>
            </Flex>

            <Flex
              className={`fltr_itm ${active === "onboardHoppers" ? "active" : ""}`}
              p={"6px 9px"}
              gap={"15px"}
              alignItems={"center"}
              onClick={() => handleSortClick('onboardHoppers', "onboardHoppers")}


            >
              <img src={publishedic} alt="Onboarded Hoppers" className="icn" />
              <Text className="fltr_txt" mb={"0px"} fontFamily={"Airbnb"}>
                Onboarded Hoppers
              </Text>
            </Flex>

            <Flex
              className={`fltr_itm ${active === "pendingHoppers" ? "active" : ""}`}
              p={"6px 9px"}
              gap={"15px"}
              alignItems={"center"}
              onClick={() => handleSortClick('pendingHoppers', "pendingHoppers")}

            >
              <img src={pendingic} alt="Pending content" className="icn" />
              <Text className="fltr_txt" mb={"0px"} fontFamily={"Airbnb"}>
                Pending Hoppers
              </Text>
            </Flex>

            <Flex
              className={`fltr_itm ${active === "pendingDoc" ? "active" : ""}`}
              p={"6px 9px"}
              gap={"15px"}
              alignItems={"center"}
            >
              <img src={Pendingdocic} alt="Pending content" className="icn" />
              <Text className="fltr_txt" mb={"0px"} fontFamily={"Airbnb"}
                onClick={() => handleSortClick('pendingDoc', "pendingDoc")}
              >
                Pending documents
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
                  <Text onClick={() => handleSortClick('Action', "TemproryBlock")}>Temporary blocked</Text>
                  <img src={closeic} alt="cross" />
                </div>
                <div className="fltr_actn active">
                  <Text onClick={() => handleSortClick('Action', "PermanentBlock")}>Permanent blocked</Text>
                  <img src={closeic} alt="cross" />
                </div>
              </Flex>
            </Flex>

            <Flex
              className={`fltr_itm ${active === "Paymentreceived" ? "active" : ""}`}
              p={"6px 9px"}
              gap={"15px"}
              alignItems={"center"}


            >
              <img src={soldic} alt="Payment received" className="icn" />
              <Text className="fltr_txt" mb={"0px"} fontFamily={"Airbnb"}
                onClick={() => handleSortClick('Paymentreceived', "Paymentreceived")}

              >
                Payment received
              </Text>
            </Flex>
            <Flex
              className={`fltr_itm ${active === "Paymentreceivable" ? "active" : ""}`}
              p={"6px 9px"}
              gap={"15px"}
              alignItems={"center"}
            >
              <img src={paymentic} alt="Payment receivable" className="icn" />
              <Text className="fltr_txt" mb={"0px"} fontFamily={"Airbnb"}
                onClick={() => handleSortClick('Paymentreceivable', "Paymentreceivable")}
              >
                Payment receivable
              </Text>
            </Flex>

            <Flex
              className={`fltr_itm ${active === "paymentPaid" ? "active" : ""}`}
              p={"6px 9px"}
              gap={"15px"}
              alignItems={"center"}

            >
              <img src={soldic} alt="Payment paid" className="icn" />
              <Text className="fltr_txt" mb={"0px"} fontFamily={"Airbnb"}
                onClick={() => handleSortClick('paymentPaid', "paymentPaid")}

              >
                Payment paid
              </Text>
            </Flex>
            <Flex
              className={`fltr_itm ${active === "paymentPayable" ? "active" : ""}`}
              p={"6px 9px"}
              gap={"15px"}
              alignItems={"center"}
            >
              <img src={paymentic} alt="Payment payable" className="icn" />
              <Text className="fltr_txt" mb={"0px"} fontFamily={"Airbnb"}
                onClick={() => handleSortClick('paymentPayable', "paymentPayable")}
              >
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
                <img src={hopperic} alt="Hopper" className="icn" />
                <Text className="fltr_txt" mb={"0px"} fontFamily={"Airbnb"}>
                  Hopper
                </Text>
              </Flex>
              <div className="fltr_srch">
                <img src={srchic} className="srch_icn" alt="" />
                <input type="text" placeholder="Search" className="srch_inp"
                  onChange={(e) => handleSortClick('Hoppers', e.target.value)}
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
                  onChange={(e) => handleSortClick('Publication_search', e.target.value)}
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
                <img src={locationic} alt="Location" className="icn" />
                <Text className="fltr_txt" mb={"0px"} fontFamily={"Airbnb"}>
                  Location
                </Text>
              </Flex>
              <div className="fltr_srch">
                <img src={srchic} className="srch_icn" alt="" />
                <input type="text" placeholder="Search" className="srch_inp"
                  onChange={(e) => handleSortClick('location_search', e.target.value)}

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
                  onChange={(e) => handleSortClick('Employee_search', e.target.value)}

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
                <img src={classic} alt="Class" className="icn" />
                <Text
                  className="fltr_txt"
                  mb={"0px"}
                  fontSize="15px"
                  fontFamily={"Airbnb"}
                >
                  Class
                </Text>
              </Flex>
              <Flex gap="8px">
                <div className="fltr_actn">
                  <Text
                    onClick={() => handleSortClick('class', "Pro")}

                  >Pro</Text>
                  <img src={closeic} alt="cross" />
                </div>
                <div className="fltr_actn active">
                  <Text
                    onClick={() => handleSortClick('class', "Amateur")}

                  >Amateur</Text>
                  <img src={closeic} alt="cross" />
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
                    onClick={() => handleSortClick('Licence_search', "Exclusive")}

                  >Exclusive</Text>
                  <img src={closeic} alt="cross" />
                </div>
                <div className="fltr_actn active">
                  <Text
                    onClick={() => handleSortClick('Licence_search', "Shared")}

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
                  <Text
                  
                  >Recordings</Text>
                  <img src={closeic} alt="cross" />
                </div> */}
              </Flex>
            </Flex>

            <Button className="theme_btn filter_btn" onClick={handleApplyClick}>
              Apply
            </Button>

          </Flex>
        </div>}
      {/* Loader end */}
    </>
  );
}
