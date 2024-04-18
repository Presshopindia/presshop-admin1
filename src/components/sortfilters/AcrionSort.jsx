// Chakra imports
import React, { useState } from "react";
import { Button, Flex, Text, Select, Input } from "@chakra-ui/react";
import closeic from "../../assets/img/sorticons/close.svg";
import dailyic from "assets/img/sorticons/day-calendar.svg";
import weeklyic from "assets/img/sorticons/week-calendar.svg";
import monthlyic from "assets/img/sorticons/month-calendar.svg";
import yearlyic from "assets/img/sorticons/date.svg";

export default function ActionSort(props) {
  const [active, setActive] = useState()

  const handleSortClick = (value, value2) => {
    setActive(value)
    props.sendDataToParent(value, value2)
  };

  const handleApplyClick = () => {
    props?.handleApplySorting();
  };

  return (
    <>
      {props?.hideShow?.status === true &&
        <div className="sort_filter_wrap top_srt">
          <Flex
            alignItems={"center"}
            className="sort_hdng"
            mb={"30px"}
          >
            <span onClick={props?.closeSort} >
              <img src={closeic} alt="close" className="icn" />
            </span>
            <Text w="100%" textAlign="center" pr="15px" fontSize={"20px"} mb={"0px"} fontFamily={"AirbnbBold"}>
              Sort
            </Text>
          </Flex>
          <Flex mb={"30px"} direction={"column"} gap={"10px"}>
            {/* <Text fontSize={"20px"} fontFamily={"AirbnbMedium"}>
              Sort
            </Text> */}
            <Flex
             className={`fltr_itm ${active === "daily" ? "active" : ""}`} 
             p={"6px 9px"}
              gap={"15px"}
              alignItems={"center"}
            >
              <img src={dailyic} alt="new to old" className="icn" />
              <Text className="fltr_txt " mb={"0px"} fontFamily={"Airbnb"}
                onClick={() => {
                  handleSortClick("daily", "daily")
                }}
              >
                View daily
              </Text>
            </Flex>
            <Flex
             className={`fltr_itm ${active === "weekly" ? "active" : ""}`} 
             p={"6px 9px"}
              gap={"15px"}
              alignItems={"center"}
            >
              <img src={weeklyic} alt="new to old" className="icn" />
              <Text className="fltr_txt" mb={"0px"} fontFamily={"Airbnb"}
                onClick={() => {
                  handleSortClick("weekly", "weekly")
                 
                }

                }
              >
                View weekly
              </Text>
            </Flex>
            <Flex
             className={`fltr_itm ${active === "monthly" ? "active" : ""}`} 
             p={"6px 9px"}
              gap={"15px"}
              alignItems={"center"}>
              <img src={monthlyic} alt="new to old" className="icn" />
              <Text className="fltr_txt" mb={"0px"} fontFamily={"Airbnb"}
                onClick={() => {
                  handleSortClick("monthly", "monthly")
                 
                }}>
                View monthly
              </Text>
            </Flex>
            <Flex
             className={`fltr_itm ${active === "yearly" ? "active" : ""}`} 
             p={"6px 9px"}
              gap={"15px"}
              alignItems={"center"}
            >
              <img src={yearlyic} alt="new to old" className="icn" />
              <Text className="fltr_txt" mb={"0px"} fontFamily={"Airbnb"}
                onClick={() => {
                  handleSortClick("yearly", "yearly")
                  
                }}>
                View yearly
              </Text>
            </Flex>
            <Button className="theme_btn filter_btn" mt="20px" onClick={handleApplyClick}>
              Apply
            </Button>
          </Flex>
        </div>
      }
    </>
  );
}
