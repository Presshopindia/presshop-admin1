// Chakra imports
import {
  Box,
  Flex,
  Text,
  SimpleGrid,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  useColorModeValue,
  Select,
  Textarea,
  Button,
} from "@chakra-ui/react";
import Card from "components/card/Card";
import React from "react";
import { MdError } from "react-icons/md";
import img2 from "assets/img/avatars/avatar2.png";
import img3 from "assets/img/nfts/Nft2.png";
import avt11 from "assets/img/avatars/avatar11.png";
import avt12 from "assets/img/avatars/avatar12.png";
import avt13 from "assets/img/avatars/avatar13.png";
import watch from "assets/img/icons/watch.svg";
import calendar from "assets/img/icons/calendar.svg";
import { BsEye } from "react-icons/bs";
import celebrity from "assets/img/icons/celebrity.png";
import camera from "assets/img/icons/camera.svg";
import video from "assets/img/icons/video.svg";
import shared from "assets/img/icons/shared.svg";
import idimg from "assets/img/icons/id.svg";
import content1 from "assets/img/nfts/NftBanner1.png";
import content2 from "assets/img/nfts/Nft1.png";
import content3 from "assets/img/nfts/Nft2.png";
import share from "assets/img/icons/share.png";
import print from "assets/img/icons/print.png";
import publication1 from "assets/img/profile/publication1.svg";
import publication2 from "assets/img/profile/publication2.svg";
import publication3 from "assets/img/profile/publication3.svg";
import { BsArrowUp } from "react-icons/bs";
import { BsArrowRight } from "react-icons/bs";
import { Tooltip } from "@chakra-ui/react";
import avt1 from "assets/img/avatars/avt1.png";
import avt2 from "assets/img/avatars/avt2.png";
import avt3 from "assets/img/avatars/avt3.png";
import avt4 from "assets/img/avatars/avt4.png";
import { useHistory } from "react-router-dom";
import write from "assets/img/icons/write.svg";
import recic from "assets/img/icons/recording.svg";
import exclusive from "assets/img/icons/crown.png";
import crime from "assets/img/icons/crime.svg";
import political from "assets/img/icons/political.svg";
import interview from "assets/img/icons/interview.svg";
import fashion from "assets/img/icons/Fashion.svg";
// new imports end

export default function UserReports() {
  const history = useHistory();
  // Chakra Color Mode
  const textColor = useColorModeValue("#000", "black");
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 4, "2xl": 6 }}
        gap="20px"
        mb="20px"
      >
        {/* Top cards start */}
        <div className="card dash-top-cards">
          <div className="cardcontent dash-c-body">
            <div className="cardCustomHead">
              <Text variant="body2" className="card-head-txt hd_txt mb-2">
                169
              </Text>
            </div>
            <Text sx={{ fontSize: 14 }} className="cardcontent_head">
              Live Published Content
            </Text>
            <Flex align="center" className="card_grth">
              <Text color="green.500" me="5px">
                <BsArrowUp /> 5%
              </Text>
              <Text color="black" fontSize="15px" fontWeight="300">
                since last month
              </Text>
            </Flex>
          </div>
          <div className="dash-c-foot">
            <div className="card-imgs-wrap">
              <img className="card-img" src={img3} alt="1" />
              <img className="card-img" src={img3} alt="2" />
              <img className="card-img" src={img2} alt="3" />
              <span>
                <BsArrowRight />
              </span>
            </div>
          </div>
        </div>
        <div className="card dash-top-cards">
          <div className="cardcontent dash-c-body">
            <div className="cardCustomHead">
              <Text variant="body2" className="card-head-txt hd_txt mb-2">
                24
              </Text>
            </div>
            <Text sx={{ fontSize: 14 }} className="cardcontent_head">
              Live Uploaded Content
            </Text>
            <Flex align="center" className="card_grth">
              <Text color="green.500" me="5px">
                <BsArrowUp /> 5%
              </Text>
              <Text color="black" fontSize="15px" fontWeight="300">
                since last month
              </Text>
            </Flex>
          </div>
          <div className="dash-c-foot">
            <div className="card-imgs-wrap">
              <img className="card-img" src={img3} alt="1" />
              <img className="card-img" src={img3} alt="2" />
              <img className="card-img" src={img2} alt="3" />
              <span>
                <BsArrowRight />
              </span>
            </div>
          </div>
        </div>
        <div className="card dash-top-cards">
          <div className="cardcontent dash-c-body">
            <div className="cardCustomHead">
              <Text variant="body2" className="card-head-txt hd_txt mb-2">
                &pound; 15,935
              </Text>
            </div>
            <Text sx={{ fontSize: 14 }} className="cardcontent_head">
              Total Content GMV
            </Text>
            <Flex align="center" className="card_grth">
              <Text color="green.500" me="5px">
                <BsArrowUp /> 5%
              </Text>
              <Text color="black" fontSize="15px" fontWeight="300">
                since last month
              </Text>
            </Flex>
          </div>
          <div className="dash-c-foot">
            <div className="card-imgs-wrap">
              <img className="card-img" src={img3} alt="1" />
              <img className="card-img" src={img3} alt="2" />
              <img className="card-img" src={img2} alt="3" />
              <span>
                <BsArrowRight />
              </span>
            </div>
          </div>
        </div>
        <div className="card dash-top-cards">
          <div className="cardcontent dash-c-body">
            <div className="cardCustomHead">
              <Text variant="body2" className="card-head-txt hd_txt mb-2">
                5
              </Text>
            </div>
            <Text sx={{ fontSize: 14 }} className="cardcontent_head">
              Ongoing Chats
            </Text>
            <Flex align="center" className="card_grth">
              <Text color="green.500" me="5px">
                <BsArrowUp /> 5%
              </Text>
              <Text color="black" fontSize="15px" fontWeight="300">
                since last month
              </Text>
            </Flex>
          </div>
          <div className="dash-c-foot">
            <div className="card-imgs-wrap">
              <img className="card-img" src={img3} alt="1" />
              <img className="card-img" src={img3} alt="2" />
              <img className="card-img" src={img2} alt="3" />
              <span>
                <BsArrowRight />
              </span>
            </div>
          </div>
        </div>
        <div className="card dash-top-cards">
          <div className="cardcontent dash-c-body">
            <div className="cardCustomHead">
              <Text variant="body2" className="card-head-txt hd_txt mb-2">
                11
              </Text>
            </div>
            <Text sx={{ fontSize: 14 }} className="cardcontent_head">
              Live Tasks
            </Text>
            <Flex align="center" className="card_grth">
              <Text color="green.500" me="5px">
                <BsArrowUp /> 5%
              </Text>
              <Text color="black" fontSize="15px" fontWeight="300">
                since last month
              </Text>
            </Flex>
          </div>
          <div className="dash-c-foot">
            <div className="card-imgs-wrap">
              <img className="card-img" src={img3} alt="1" />
              <img className="card-img" src={img3} alt="2" />
              <img className="card-img" src={img2} alt="3" />
              <span>
                <BsArrowRight />
              </span>
            </div>
          </div>
        </div>
        <div className="card dash-top-cards">
          <div className="cardcontent dash-c-body">
            <div className="cardCustomHead">
              <Text variant="body2" className="card-head-txt hd_txt mb-2">
                &pound; 950
              </Text>
            </div>
            <Text sx={{ fontSize: 14 }} className="cardcontent_head">
              Total Tasks GMV
            </Text>
            <Flex align="center" className="card_grth">
              <Text color="green.500" me="5px">
                <BsArrowUp /> 5%
              </Text>
              <Text color="black" fontSize="15px" fontWeight="300">
                since last month
              </Text>
            </Flex>
          </div>
          <div className="dash-c-foot">
            <div className="card-imgs-wrap">
              <img className="card-img" src={img3} alt="1" />
              <img className="card-img" src={img3} alt="2" />
              <img className="card-img" src={img2} alt="3" />
              <span>
                <BsArrowRight />
              </span>
            </div>
          </div>
        </div>
        <div className="card dash-top-cards">
          <div className="cardcontent dash-c-body">
            <div className="cardCustomHead">
              <Text variant="body2" className="card-head-txt hd_txt mb-2">
                1,000
              </Text>
            </div>
            <Text sx={{ fontSize: 14 }} className="cardcontent_head">
              Total Publications
            </Text>
            <Flex align="center" className="card_grth">
              <Text color="green.500" me="5px">
                <BsArrowUp /> 5%
              </Text>
              <Text color="black" fontSize="15px" fontWeight="300">
                since last month
              </Text>
            </Flex>
          </div>
          <div className="dash-c-foot">
            <div className="card-imgs-wrap">
              <img className="card-img" src={img3} alt="1" />
              <img className="card-img" src={img3} alt="2" />
              <img className="card-img" src={img2} alt="3" />
              <span>
                <BsArrowRight />
              </span>
            </div>
          </div>
        </div>
        <div className="card dash-top-cards">
          <div className="cardcontent dash-c-body">
            <div className="cardCustomHead">
              <Text variant="body2" className="card-head-txt hd_txt mb-2">
                1,200
              </Text>
            </div>
            <Text sx={{ fontSize: 14 }} className="cardcontent_head">
              Total Hoppers
            </Text>
            <Flex align="center" className="card_grth">
              <Text color="green.500" me="5px">
                <BsArrowUp /> 5%
              </Text>
              <Text color="black" fontSize="15px" fontWeight="300">
                since last month
              </Text>
            </Flex>
          </div>
          <div className="dash-c-foot">
            <div className="card-imgs-wrap">
              <img className="card-img" src={img3} alt="1" />
              <img className="card-img" src={img3} alt="2" />
              <img className="card-img" src={img2} alt="3" />
              <span>
                <BsArrowRight />
              </span>
            </div>
          </div>
        </div>
        {/* Top cards end */}
      </SimpleGrid>
      <Card
        className="tab_card"
        direction="column"
        w="100%"
        px="0px"
        mb="24px"
        overflowX={{ sm: "scroll", lg: "hidden" }}
      >
        <div className="">
          <Flex px="25px" justify="space-between" mb="10px" align="center">
            <Text
              color={textColor}
              fontSize="22px"
              fontFamily={"AirbnbBold"}
              lineHeight="100%"
            >
              Live Published Content
            </Text>
            <div className="opt_icons_wrap">
              <img src={share} className="opt_icons" />
              <img src={print} className="opt_icons" />
              <Select placeholder="Sort" className="opt_sort">
                <option value="option2">Daily</option>
                <option value="option3">Weekly</option>
                <option value="option3">Monthly</option>
                <option value="option3">Yearly</option>
              </Select>
              {/* <Menu /> */}
            </div>
          </Flex>
          <TableContainer className="fix_ht_table">
            <Table variant="simple" className="common_table">
              <Thead>
                <Tr>
                  <Th>Published Content</Th>
                  <Th>Time & date</Th>
                  <Th>Location</Th>
                  <Th>Heading</Th>
                  <Th>Description</Th>
                  <Th>Voice note</Th>
                  <Th>Type</Th>
                  <Th>License</Th>
                  <Th>Category</Th>
                  <Th>Volume</Th>
                  <Th>Asking price</Th>
                  <Th>Sale price</Th>
                  <Th>Published by</Th>
                  <Th>Sale status</Th>
                  <Th>Payment pending</Th>
                  <Th>Presshop commission</Th>
                  <Th>Payment details</Th>
                  <Th>Mode</Th>
                  <Th>Remarks</Th>
                  <Th>Employee details</Th>
                  <Th>CTA</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td className="content_img_td">
                    <a
                      onClick={() => {
                        history.push("/admin/live-published-content");
                      }}
                    >
                      <div className="content_amnt">
                        <img src={content1} className="content_img" />
                      </div>
                    </a>
                  </Td>
                  <Td className="timedate_wrap">
                    <p className="timedate">
                      <img src={watch} className="icn_time" />
                      10:25 AM
                    </p>
                    <p className="timedate">
                      <img src={calendar} className="icn_time" />
                      24 Feb, 2023
                    </p>
                  </Td>
                  <Td className="address_wrap">
                    5 Canada Square, <br /> Canary Wharf. <br /> London <br />{" "}
                    E14 5AQ
                  </Td>
                  <Td className="remarks_wrap remarks_wrap_edit">
                    <Textarea
                      className="desc_txtarea"
                      placeholder="Enter heading..."
                    />
                    <img className="icn_edit" src={write} />
                  </Td>
                  <Td className="description_td">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Provident, facilis!
                  </Td>
                  <Td className="timedate_wrap vcnote_td">
                    <div className="dir_col">
                      <p className="timedate">
                        <img src={watch} className="icn_time" />
                        01:15 mins
                      </p>
                      <p className="timedate">
                        <img src={recic} className="icn_time" />
                        09.12.2022.mp3
                      </p>
                    </div>
                  </Td>
                  <Td className="text_center">
                    <img src={camera} className="icn m_auto" />
                  </Td>
                  <Td className="text_center">
                    <img src={shared} className="icn m_auto" />
                  </Td>
                  <Td className="text_center">
                    <img src={celebrity} className="icn m_auto" />
                  </Td>
                  <Td className="text_center">1</Td>
                  <Td>&pound; 80</Td>
                  <Td>&pound; 80</Td>
                  <Td className="item_detail">
                    <img src={avt13} alt="Content thumbnail" />
                    <Text className="nameimg">
                      <span className="txt_mdm">Janet Morrison</span>
                      <br />
                      <span>(pseudonyms)</span>
                    </Text>
                  </Td>
                  <Td className="">
                    <span className="txt_success_mdm">Sold</span>
                  </Td>
                  <Td>£ 0</Td>
                  <Td>£ 16</Td>
                  <Td className="timedate_wrap">
                    <p className="timedate">
                      <img src={idimg} className="icn_time" />
                      ID- 782319
                    </p>
                    <p className="timedate">
                      <img src={calendar} className="icn_time" />
                      INV- 628192
                    </p>
                    <p className="timedate">
                      <img src={watch} className="icn_time" />
                      10:25 AM
                    </p>
                  </Td>
                  <Td className="select_wrap">
                    <Select placeholder="Chat">
                      <option value="option2">Call</option>
                      <option value="option2">Email</option>
                    </Select>
                  </Td>
                  <Td className="remarks_wrap">
                    <Textarea placeholder="Enter remarks if any..." />
                  </Td>
                  <Td className="timedate_wrap">
                    <p className="timedate">Rohit Sharma</p>
                    <p className="timedate">
                      <img src={watch} className="icn_time" />
                      10:25 AM
                    </p>
                    <p className="timedate">
                      <img src={calendar} className="icn_time" />
                      24 Feb, 2023
                    </p>
                    <a href="" className="timedate">
                      <BsEye className="icn_time" />
                      View history
                    </a>
                  </Td>
                  <Td>
                    <Button className="theme_btn tbl_btn">Save</Button>
                  </Td>
                </Tr>
                <Tr>
                  <Td className="content_wrap new_content_wrap">
                    <a
                      onClick={() => {
                        history.push("/admin/live-uploaded-content");
                      }}
                    >
                      <div className="content_imgs_wrap">
                        <div className="content_imgs">
                          <img src={content1} />
                          <img src={content2} />
                        </div>
                        <div className="content_imgs">
                          <img src={content3} />
                          <span className="arrow_span">
                            <BsArrowRight />
                          </span>
                        </div>
                      </div>
                    </a>
                  </Td>
                  <Td className="timedate_wrap">
                    <p className="timedate">
                      <img src={watch} className="icn_time" />
                      10:25 AM
                    </p>
                    <p className="timedate">
                      <img src={calendar} className="icn_time" />
                      24 Feb, 2023
                    </p>
                  </Td>
                  <Td className="address_wrap">
                    5 Canada Square, <br /> Canary Wharf. <br /> London <br />{" "}
                    E14 5AQ
                  </Td>
                  <Td className="remarks_wrap remarks_wrap_edit">
                    <Textarea
                      className="desc_txtarea"
                      placeholder="Enter heading..."
                    />
                    <img className="icn_edit" src={write} />
                  </Td>
                  <Td className="description_td">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Provident, facilis!
                  </Td>
                  <Td className="timedate_wrap vcnote_td">
                    <div className="dir_col">
                      <p className="timedate">
                        <img src={watch} className="icn_time" />
                        01:15 mins
                      </p>
                      <p className="timedate">
                        <img src={recic} className="icn_time" />
                        09.12.2022.mp3
                      </p>
                    </div>
                  </Td>
                  <Td className="text_center">
                    <div className="dir_col text_center">
                      <img
                        src={camera}
                        alt="Content thumbnail"
                        className="icn m_auto"
                      />
                      <img
                        src={video}
                        alt="Content thumbnail"
                        className="icn m_auto"
                      />
                    </div>
                  </Td>
                  <Td className="text_center">
                    <img src={exclusive} className="icn m_auto" />
                  </Td>
                  <Td className="text_center">
                    <img src={crime} className="icn m_auto" />
                  </Td>
                  <Td className="text_center">
                    <div className="dir_col text_center">
                      <p className="text_center">5</p>
                      <p className="text_center">1</p>
                    </div>
                  </Td>
                  <Td>£ 800</Td>
                  <Td>£ 800</Td>
                  <Td className="item_detail">
                    <img src={avt12} alt="Content thumbnail" />
                    <Text className="nameimg">
                      <span className="txt_mdm">Janet Morrison</span>
                      <br />
                      <span>(pseudonyms)</span>
                    </Text>
                  </Td>
                  <Td className="">
                    <span className="txt_success_mdm">Sold</span>
                  </Td>
                  <Td className="">
                    <span className="link_danger">£ 3,000</span>
                  </Td>
                  <Td className="">£ 160</Td>
                  <Td className="timedate_wrap">
                    <p className="timedate">
                      <img src={idimg} className="icn_time" />
                      ID- 782319
                    </p>
                    <p className="timedate">
                      <img src={calendar} className="icn_time" />
                      INV- 628192
                    </p>
                    <p className="timedate">
                      <img src={watch} className="icn_time" />
                      10:25 AM
                    </p>
                  </Td>
                  <Td className="select_wrap">
                    <Select placeholder="Chat">
                      <option value="option2">Call</option>
                      <option value="option2">Email</option>
                    </Select>
                  </Td>
                  <Td className="remarks_wrap">
                    <Textarea placeholder="Enter remarks if any..." />
                  </Td>
                  <Td className="timedate_wrap">
                    <p className="timedate">Rohit Sharma</p>
                    <p className="timedate">
                      <img src={watch} className="icn_time" />
                      10:25 AM
                    </p>
                    <p className="timedate">
                      <img src={calendar} className="icn_time" />
                      24 Feb, 2023
                    </p>
                    <a href="" className="timedate">
                      <BsEye className="icn_time" />
                      View history
                    </a>
                  </Td>
                  <Td>
                    <Button className="theme_btn tbl_btn">Save</Button>
                  </Td>
                </Tr>
                <Tr>
                  <Td className="content_wrap new_content_wrap">
                    <a
                      onClick={() => {
                        history.push("/admin/live-uploaded-content");
                      }}
                    >
                      <div className="content_imgs_wrap">
                        <div className="content_imgs">
                          <img src={content1} />
                          <img src={content2} />
                        </div>
                        <div className="content_imgs">
                          <img src={content3} />
                          <span className="arrow_span">
                            <BsArrowRight />
                          </span>
                        </div>
                      </div>
                    </a>
                  </Td>
                  <Td className="timedate_wrap">
                    <p className="timedate">
                      <img src={watch} className="icn_time" />
                      10:25 AM
                    </p>
                    <p className="timedate">
                      <img src={calendar} className="icn_time" />
                      24 Feb, 2023
                    </p>
                  </Td>
                  <Td className="address_wrap">
                    5 Canada Square, <br /> Canary Wharf. <br /> London <br />{" "}
                    E14 5AQ
                  </Td>
                  <Td className="remarks_wrap remarks_wrap_edit">
                    <Textarea
                      className="desc_txtarea"
                      placeholder="Enter heading..."
                    />
                    <img className="icn_edit" src={write} />
                  </Td>
                  <Td className="description_td">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Provident, facilis!
                  </Td>

                  <Td className="">NA</Td>
                  <Td className="text_center">
                    <img src={video} className="icn m_auto" />
                  </Td>
                  <Td className="text_center">
                    <img src={shared} className="icn m_auto" />
                  </Td>
                  <Td className="text_center">
                    <img src={political} className="icn m_auto" />
                  </Td>
                  <Td className="text_center">
                    <div className="dir_col text_center">
                      <p className="text_center">2</p>
                    </div>
                  </Td>
                  <Td>£ 80</Td>
                  <Td>£ 80</Td>
                  <Td className="item_detail">
                    <img src={avt11} alt="Content thumbnail" />
                    <Text className="nameimg">
                      <span className="txt_mdm">Janet Morrison</span>
                      <br />
                      <span>(pseudonyms)</span>
                    </Text>
                  </Td>
                  <Td>
                    <span className="link_danger">Unsold</span>
                  </Td>
                  <Td>£ 0</Td>
                  <Td>£ 0</Td>
                  <Td className="timedate_wrap">
                    <p className="timedate">
                      <img src={idimg} className="icn_time" />
                      ID- 782319
                    </p>
                    <p className="timedate">
                      <img src={calendar} className="icn_time" />
                      INV- 628192
                    </p>
                    <p className="timedate">
                      <img src={watch} className="icn_time" />
                      10:25 AM
                    </p>
                  </Td>
                  <Td className="select_wrap">
                    <Select placeholder="Call">
                      <option value="option2">Chat</option>
                      <option value="option2">Email</option>
                    </Select>
                  </Td>
                  <Td className="remarks_wrap">
                    <Textarea placeholder="Enter remarks if any..." />
                  </Td>
                  <Td className="timedate_wrap">
                    <p className="timedate">Rohit Sharma</p>
                    <p className="timedate">
                      <img src={watch} className="icn_time" />
                      10:25 AM
                    </p>
                    <p className="timedate">
                      <img src={calendar} className="icn_time" />
                      24 Feb, 2023
                    </p>
                    <a href="" className="timedate">
                      <BsEye className="icn_time" />
                      View history
                    </a>
                  </Td>
                  <Td>
                    <Button className="theme_btn tbl_btn">Save</Button>
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </div>
      </Card>

      <Card
        className="tab_card"
        direction="column"
        w="100%"
        px="0px"
        mb="24px"
        overflowX={{ sm: "scroll", lg: "hidden" }}
      >
        <div className="">
          <Flex px="20px" justify="space-between" mb="10px" align="center">
            <Text
              color={textColor}
              fontSize="22px"
              fontFamily={"AirbnbBold"}
              lineHeight="100%"
            >
              Live Uploaded Content
            </Text>
            <div className="opt_icons_wrap">
              <img src={share} className="opt_icons" />
              <img src={print} className="opt_icons" />
              <Select placeholder="Sort" className="opt_sort">
                <option value="option2">Daily</option>
                <option value="option3">Weekly</option>
                <option value="option3">Monthly</option>
                <option value="option3">Yearly</option>
              </Select>
            </div>
          </Flex>
          <TableContainer className="fix_ht_table">
            <Table variant="simple" className="common_table">
              <Thead>
                <Tr>
                  <Th>Uploaded content</Th>
                  <Th>Time & date</Th>
                  <Th>Location</Th>
                  <Th>Task broadcasted by</Th>
                  <Th>Task details</Th>
                  <Th>Type</Th>
                  <Th>Category</Th>
                  <Th>Volume</Th>
                  <Th>Total price</Th>
                  <Th>Sale status</Th>
                  <Th>Payment pending</Th>
                  <Th>Presshop commission</Th>
                  <Th>Uploaded by</Th>
                  <Th>Payment details</Th>
                  <Th>Mode</Th>
                  <Th>Remarks</Th>
                  <Th>Employee details</Th>
                  <Th>CTA</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td className="content_wrap new_content_wrap">
                    <a
                      onClick={() => {
                        history.push("/admin/live-uploaded-content");
                      }}
                    >
                      <div className="content_imgs_wrap">
                        <div className="content_imgs">
                          <img src={content1} />
                          <img src={content2} />
                        </div>
                        <div className="content_imgs">
                          <img src={content3} />
                          <span className="arrow_span">
                            <BsArrowRight />
                          </span>
                        </div>
                      </div>
                    </a>
                  </Td>
                  <Td className="timedate_wrap">
                    <p className="timedate">
                      <img src={watch} className="icn_time" />
                      10:25 AM
                    </p>
                    <p className="timedate">
                      <img src={calendar} className="icn_time" />
                      24 Feb, 2023
                    </p>
                  </Td>
                  <Td className="address_wrap">
                    5 Canada Square, <br /> Canary Wharf. <br /> London <br />{" "}
                    E14 5AQ
                  </Td>
                  <Td className="item_detail">
                    <img src={publication1} alt="Content thumbnail" />
                    <Text className="nameimg">
                      <span className="txt_mdm">Reuters Media</span>
                    </Text>
                  </Td>
                  <Td className="description_td">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Provident, facilis!
                  </Td>
                  <Td className="text_center">
                    <div className="dir_col text_center">
                      <img
                        src={camera}
                        alt="Content thumbnail"
                        className="icn m_auto"
                      />
                      <img
                        src={interview}
                        alt="Content thumbnail"
                        className="icn m_auto"
                      />
                    </div>
                  </Td>
                  <Td className="text_center">
                    <img src={celebrity} className="icn m_auto" />
                  </Td>
                  <Td className="text_center">
                    <div className="dir_col text_center">
                      <p className="text_center">4</p>
                      <p className="text_center">1</p>
                    </div>
                  </Td>
                  <Td className="text_center">
                    <div className="dir_col">
                      <p>£ 400</p>
                      <p>£ 200</p>
                    </div>
                  </Td>
                  <Td className="">
                    <span className="txt_success_mdm">Sold</span>
                  </Td>
                  <Td>£ 0</Td>
                  <Td>£ 120</Td>
                  <Td className="item_detail">
                    <img src={avt12} alt="Content thumbnail" />
                    <Text className="nameimg">
                      <span className="txt_mdm">Janet Morrison</span>
                      <br />
                      <span>(pseudonyms)</span>
                    </Text>
                  </Td>
                  <Td className="timedate_wrap">
                    <p className="timedate">
                      <img src={idimg} className="icn_time" />
                      ID- 782319
                    </p>
                    <p className="timedate">
                      <img src={calendar} className="icn_time" />
                      INV- 628192
                    </p>
                    <p className="timedate">
                      <img src={watch} className="icn_time" />
                      10:25 AM
                    </p>
                  </Td>
                  <Td className="select_wrap">
                    <Select placeholder="Chat">
                      <option value="option2">Call</option>
                    </Select>
                  </Td>
                  <Td className="remarks_wrap">
                    <Textarea placeholder="Enter remarks if any..." />
                  </Td>
                  <Td className="timedate_wrap">
                    <p className="timedate">Rohit Sharma</p>
                    <p className="timedate">
                      <img src={watch} className="icn_time" />
                      10:25 AM
                    </p>
                    <p className="timedate">
                      <img src={calendar} className="icn_time" />
                      24 Feb, 2023
                    </p>
                    <a href="" className="timedate">
                      <BsEye className="icn_time" />
                      View history
                    </a>
                  </Td>
                  <Td>
                    <Button className="theme_btn tbl_btn">Save</Button>
                  </Td>
                </Tr>
                <Tr>
                  <Td className="content_wrap new_content_wrap">
                    <a
                      onClick={() => {
                        history.push("/admin/live-uploaded-content");
                      }}
                    >
                      <div className="content_imgs_wrap">
                        <div className="content_imgs">
                          <img src={content1} />
                          <img src={content2} />
                        </div>
                        <div className="content_imgs">
                          <img src={content3} />
                          <span className="arrow_span">
                            <BsArrowRight />
                          </span>
                        </div>
                      </div>
                    </a>
                  </Td>
                  <Td className="timedate_wrap">
                    <p className="timedate">
                      <img src={watch} className="icn_time" />
                      10:25 AM
                    </p>
                    <p className="timedate">
                      <img src={calendar} className="icn_time" />
                      24 Feb, 2023
                    </p>
                  </Td>
                  <Td className="address_wrap">
                    5 Canada Square, <br /> Canary Wharf. <br /> London <br />{" "}
                    E14 5AQ
                  </Td>
                  <Td className="item_detail">
                    <img src={publication2} alt="Content thumbnail" />
                    <Text className="nameimg">
                      <span className="txt_mdm">Daily Mail</span>
                    </Text>
                  </Td>
                  <Td className="description_td">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Provident, facilis!
                  </Td>
                  <Td className="text_center">
                    <img src={camera} className="icn m_auto" />
                  </Td>
                  <Td className="text_center">
                    <img src={political} className="icn m_auto" />
                  </Td>
                  <Td className="text_center">
                    <div className="dir_col text_center">
                      <p className="text_center">5</p>
                    </div>
                  </Td>
                  <Td className="text_center">
                    <div className="dir_col">
                      <p>£ 250</p>
                    </div>
                  </Td>
                  <Td className="">
                    <span className="txt_success_mdm">Sold</span>
                  </Td>
                  <Td>£ 0</Td>
                  <Td>£ 50</Td>
                  <Td className="item_detail">
                    <img src={avt11} alt="Content thumbnail" />
                    <Text className="nameimg">
                      <span className="txt_mdm">Janet Morrison</span>
                      <br />
                      <span>(pseudonyms)</span>
                    </Text>
                  </Td>
                  <Td className="timedate_wrap">
                    <p className="timedate">
                      <img src={idimg} className="icn_time" />
                      ID- 782319
                    </p>
                    <p className="timedate">
                      <img src={calendar} className="icn_time" />
                      INV- 628192
                    </p>
                    <p className="timedate">
                      <img src={watch} className="icn_time" />
                      10:25 AM
                    </p>
                  </Td>
                  <Td className="select_wrap">
                    <Select placeholder="Call">
                      <option value="option2">Chat</option>
                      <option value="option2">Email</option>
                    </Select>
                  </Td>
                  <Td className="remarks_wrap">
                    <Textarea placeholder="Enter remarks if any..." />
                  </Td>
                  <Td className="timedate_wrap">
                    <p className="timedate">Rohit Sharma</p>
                    <p className="timedate">
                      <img src={watch} className="icn_time" />
                      10:25 AM
                    </p>
                    <p className="timedate">
                      <img src={calendar} className="icn_time" />
                      24 Feb, 2023
                    </p>
                    <a href="" className="timedate">
                      <BsEye className="icn_time" />
                      View history
                    </a>
                  </Td>
                  <Td>
                    <Button className="theme_btn tbl_btn">Save</Button>
                  </Td>
                </Tr>
                <Tr>
                  <Td className="content_wrap new_content_wrap">
                    <a
                      onClick={() => {
                        history.push("/admin/live-uploaded-content");
                      }}
                    >
                      <div className="content_imgs_wrap">
                        <div className="content_imgs">
                          <img src={content1} />
                          <img src={content2} />
                        </div>
                        <div className="content_imgs">
                          <img src={content3} />
                          <span className="arrow_span">
                            <BsArrowRight />
                          </span>
                        </div>
                      </div>
                    </a>
                  </Td>
                  <Td className="timedate_wrap">
                    <p className="timedate">
                      <img src={watch} className="icn_time" />
                      10:25 AM
                    </p>
                    <p className="timedate">
                      <img src={calendar} className="icn_time" />
                      24 Feb, 2023
                    </p>
                  </Td>
                  <Td className="address_wrap">
                    5 Canada Square, <br /> Canary Wharf. <br /> London <br />{" "}
                    E14 5AQ
                  </Td>
                  <Td className="item_detail">
                    <img src={publication1} alt="Content thumbnail" />
                    <Text className="nameimg">
                      <span className="txt_mdm">Reuters Media</span>
                    </Text>
                  </Td>
                  <Td className="description_td">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Provident, facilis!
                  </Td>
                  <Td className="text_center">
                    <div className="dir_col text_center">
                      <img
                        src={camera}
                        alt="Content thumbnail"
                        className="icn m_auto"
                      />
                      <img
                        src={interview}
                        alt="Content thumbnail"
                        className="icn m_auto"
                      />
                      <img
                        src={video}
                        alt="Content thumbnail"
                        className="icn m_auto"
                      />
                    </div>
                  </Td>
                  <Td className="text_center">
                    <img src={celebrity} className="icn m_auto" />
                  </Td>
                  <Td className="text_center">
                    <div className="dir_col text_center">
                      <p className="text_center">4</p>
                      <p className="text_center">2</p>
                      <p className="text_center">1</p>
                    </div>
                  </Td>
                  <Td className="text_center">
                    <div className="dir_col">
                      <p>£ 200</p>
                      <p>£ 200</p>
                      <p>£ 300</p>
                    </div>
                  </Td>

                  <Td className="">
                    <span className="link_danger">Unsold</span>
                  </Td>
                  <Td>£ 0</Td>
                  <Td>£ 0</Td>
                  <Td className="item_detail">
                    <img src={avt13} alt="Content thumbnail" />
                    <Text className="nameimg">
                      <span className="txt_mdm">Janet Morrison</span>
                      <br />
                      <span>(pseudonyms)</span>
                    </Text>
                  </Td>
                  <Td className="timedate_wrap">NA</Td>
                  <Td className="select_wrap">
                    <Select placeholder="Call">
                      <option value="option2">Chat</option>
                      <option value="option2">Email</option>
                    </Select>
                  </Td>
                  <Td className="remarks_wrap">
                    <Textarea placeholder="Enter remarks if any..." />
                  </Td>
                  <Td className="timedate_wrap">
                    <p className="timedate">Rohit Sharma</p>
                    <p className="timedate">
                      <img src={watch} className="icn_time" />
                      10:25 AM
                    </p>
                    <p className="timedate">
                      <img src={calendar} className="icn_time" />
                      24 Feb, 2023
                    </p>
                    <a href="" className="timedate">
                      <BsEye className="icn_time" />
                      View history
                    </a>
                  </Td>
                  <Td>
                    <Button className="theme_btn tbl_btn">Save</Button>
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </div>
      </Card>

      <Card
        className="tab_card"
        direction="column"
        w="100%"
        px="0px"
        mb="24px"
        overflowX={{ sm: "scroll", lg: "hidden" }}
      >
        <div className="">
          <Flex px="20px" justify="space-between" mb="10px" align="center">
            <Text
              color={textColor}
              fontSize="22px"
              fontFamily={"AirbnbBold"}
              lineHeight="100%"
            >
              Live tasks
            </Text>
            <div className="opt_icons_wrap">
              <img src={share} className="opt_icons" />
              <img src={print} className="opt_icons" />
              <Select placeholder="Sort" className="opt_sort">
                <option value="option2">Daily</option>
                <option value="option3">Weekly</option>
                <option value="option3">Monthly</option>
                <option value="option3">Yearly</option>
              </Select>
              {/* <Menu /> */}
            </div>
          </Flex>
          <TableContainer className="fix_ht_table">
            <Table variant="simple" className="common_table">
              <Thead>
                <Tr>
                  <Th>Uploaded Content</Th>
                  <Th>Time & date</Th>
                  <Th>Location</Th>
                  <Th>Task broadcasted by</Th>
                  <Th>Task details</Th>
                  <Th>Type</Th>
                  <Th>Category</Th>
                  <Th>Volume</Th>
                  <Th>Total price</Th>
                  <Th>Accepted by</Th>
                  <Th>Time & date</Th>
                  <Th>Deadline & time left</Th>
                  <Th>Assign more Hoppers</Th>
                  <Th>Payment details</Th>
                  <Th>Mode</Th>
                  <Th>Remarks</Th>
                  <Th>Employee details</Th>
                  <Th>CTA</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td className="content_wrap new_content_wrap">
                    <a
                      onClick={() => {
                        history.push("/admin//live-tasks");
                      }}
                    >
                      <div className="content_imgs_wrap">
                        <div className="content_imgs">
                          <img src={content1} />
                          <img src={content2} />
                        </div>
                        <div className="content_imgs">
                          <img src={content3} />
                          <span className="arrow_span">
                            <BsArrowRight />
                          </span>
                        </div>
                      </div>
                    </a>
                  </Td>
                  <Td className="timedate_wrap">
                    <p className="timedate">
                      <img src={watch} className="icn_time" />
                      10:25 AM
                    </p>
                    <p className="timedate">
                      <img src={calendar} className="icn_time" />
                      24 Feb, 2023
                    </p>
                  </Td>
                  <Td className="address_wrap">
                    5 Canada Square, <br /> Canary Wharf. <br /> London <br />{" "}
                    E14 5AQ
                  </Td>
                  <Td className="item_detail">
                    <img src={publication1} alt="Content thumbnail" />
                    <Text className="nameimg">
                      <span className="txt_mdm">Reuters Media</span>
                    </Text>
                  </Td>
                  <Td className="description_td">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Provident, facilis!
                  </Td>
                  <Td className="text_center">
                    <div className="dir_col text_center">
                      <img
                        src={camera}
                        alt="Content thumbnail"
                        className="icn m_auto"
                      />
                      <img
                        src={interview}
                        alt="Content thumbnail"
                        className="icn m_auto"
                      />
                    </div>
                  </Td>
                  <Td className="text_center">
                    <img src={celebrity} className="icn m_auto" />
                  </Td>
                  <Td className="text_center">
                    <div className="dir_col text_center">
                      <p className="text_center">4</p>
                      <p className="text_center">1</p>
                    </div>
                  </Td>
                  <Td className="text_center">
                    <div className="dir_col">
                      <p>£ 400</p>
                      <p>£ 200</p>
                    </div>
                  </Td>
                  <Td className="avatars_wrap">
                    <div className="overlay_imgs">
                      <div className="img_row1 top_row">
                        <Tooltip label="Janet Morrison" placement="top">
                          <img src={avt1} className="ovrl1" />
                        </Tooltip>
                        <Tooltip label="Sally Smith" placement="top">
                          <img src={avt2} className="ovrl2" />
                        </Tooltip>
                        <Tooltip label="Amanda Doe" placement="top">
                          <img src={avt3} className="ovrl3" />
                        </Tooltip>
                      </div>
                      <div className="img_row2 bottom_row">
                        <Tooltip label="Sally Smith" placement="top">
                          <img src={avt3} className="ovrl1" />
                        </Tooltip>
                        <Tooltip label="Amanda Doe" placement="top">
                          <img src={avt4} className="ovrl2" />
                        </Tooltip>
                      </div>
                    </div>
                  </Td>
                  <Td className="timedate_wrap">
                    <p className="timedate">
                      <img src={watch} className="icn_time" />
                      10:25 AM
                    </p>
                    <p className="timedate">
                      <img src={calendar} className="icn_time" />
                      24 Feb, 2023
                    </p>
                  </Td>
                  <Td className="timedate_wrap">
                    <p className="timedate">
                      <img src={watch} className="icn_time" />
                      10:25 AM
                    </p>
                    <p className="timedate">
                      <img src={calendar} className="icn_time" />
                      24 Feb, 2023
                    </p>
                    <span className="time_left danger">36m delayed</span>
                  </Td>
                  <Td className="asign_wrap">
                    <div className="slct">
                      <div className="sl_itm">
                        <p>Janet Morrison</p>
                        <span className="sml_txt">(0.1 m away)</span>
                      </div>
                      <div className="sl_itm active">
                        <p>Vishal Mehta</p>
                        <span className="sml_txt">(0.2 m away)</span>
                      </div>
                      <div className="sl_itm">
                        <p>James Argent</p>
                        <span className="sml_txt">(0.3 m away)</span>
                      </div>
                    </div>
                  </Td>
                  <Td className="timedate_wrap">
                    <p className="timedate">
                      <img src={idimg} className="icn_time" />
                      ID- 782319
                    </p>
                    <p className="timedate">
                      <img src={calendar} className="icn_time" />
                      INV- 628192
                    </p>
                    <p className="timedate">
                      <img src={watch} className="icn_time" />
                      10:25 AM
                    </p>
                  </Td>
                  <Td className="select_wrap">
                    <Select placeholder="Chat">
                      <option value="option2">Call</option>
                    </Select>
                  </Td>
                  <Td className="remarks_wrap">
                    <Textarea placeholder="Enter remarks if any..." />
                  </Td>
                  <Td className="timedate_wrap">
                    <p className="timedate">Rohit Sharma</p>
                    <p className="timedate">
                      <img src={watch} className="icn_time" />
                      10:25 AM
                    </p>
                    <p className="timedate">
                      <img src={calendar} className="icn_time" />
                      24 Feb, 2023
                    </p>
                    <a href="" className="timedate">
                      <BsEye className="icn_time" />
                      View history
                    </a>
                  </Td>
                  <Td>
                    <Button className="theme_btn tbl_btn">Save</Button>
                  </Td>
                </Tr>
                <Tr>
                  <Td className="content_wrap new_content_wrap">
                    <a
                      onClick={() => {
                        history.push("/admin/live-tasks");
                      }}
                    >
                      <div className="content_imgs_wrap">
                        <div className="content_imgs">
                          <img src={content1} />
                          <img src={content2} />
                        </div>
                        <div className="content_imgs">
                          <img src={content3} />
                          <span className="arrow_span">
                            <BsArrowRight />
                          </span>
                        </div>
                      </div>
                    </a>
                  </Td>
                  <Td className="timedate_wrap">
                    <p className="timedate">
                      <img src={watch} className="icn_time" />
                      10:25 AM
                    </p>
                    <p className="timedate">
                      <img src={calendar} className="icn_time" />
                      24 Feb, 2023
                    </p>
                  </Td>
                  <Td className="address_wrap">
                    5 Canada Square, <br /> Canary Wharf. <br /> London <br />{" "}
                    E14 5AQ
                  </Td>
                  <Td className="item_detail">
                    <img src={publication2} alt="Content thumbnail" />
                    <Text className="nameimg">
                      <span className="txt_mdm">Daily Mail</span>
                    </Text>
                  </Td>
                  <Td className="description_td">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Provident, facilis!
                  </Td>
                  <Td className="text_center">
                    <div className="dir_col text_center">
                      <img
                        src={camera}
                        alt="Content thumbnail"
                        className="icn m_auto"
                      />
                    </div>
                  </Td>
                  <Td className="text_center">
                    <img src={crime} className="icn m_auto" />
                  </Td>
                  <Td className="text_center">
                    <div className="dir_col text_center">
                      <p className="text_center">5</p>
                    </div>
                  </Td>
                  <Td className="text_center">
                    <div className="dir_col">
                      <p>£ 250</p>
                    </div>
                  </Td>
                  <Td className="avatars_wrap">
                    <div className="overlay_imgs">
                      <div className="img_row1 top_row">
                        <Tooltip label="Janet Morrison" placement="top">
                          <img src={avt1} className="ovrl1" />
                        </Tooltip>
                        <Tooltip label="Sally Smith" placement="top">
                          <img src={avt2} className="ovrl2" />
                        </Tooltip>
                        <Tooltip label="Amanda Doe" placement="top">
                          <img src={avt3} className="ovrl3" />
                        </Tooltip>
                      </div>
                    </div>
                  </Td>
                  <Td className="timedate_wrap">
                    <p className="timedate">
                      <img src={watch} className="icn_time" />
                      10:25 AM
                    </p>
                    <p className="timedate">
                      <img src={calendar} className="icn_time" />
                      24 Feb, 2023
                    </p>
                  </Td>
                  <Td className="timedate_wrap">
                    <p className="timedate">
                      <img src={watch} className="icn_time" />
                      10:25 AM
                    </p>
                    <p className="timedate">
                      <img src={calendar} className="icn_time" />
                      24 Feb, 2023
                    </p>
                    <span className="time_left success">36m left</span>
                  </Td>
                  <Td className="asign_wrap">
                    <div className="slct">
                      <div className="sl_itm">
                        <p>Janet Morrison</p>
                        <span className="sml_txt">(0.1 m away)</span>
                      </div>
                      <div className="sl_itm active">
                        <p>Vishal Mehta</p>
                        <span className="sml_txt">(0.2 m away)</span>
                      </div>
                      <div className="sl_itm">
                        <p>James Argent</p>
                        <span className="sml_txt">(0.3 m away)</span>
                      </div>
                    </div>
                  </Td>
                  <Td className="timedate_wrap">
                    <p className="timedate">
                      <img src={idimg} className="icn_time" />
                      ID- 782319
                    </p>
                    <p className="timedate">
                      <img src={calendar} className="icn_time" />
                      INV- 628192
                    </p>
                    <p className="timedate">
                      <img src={watch} className="icn_time" />
                      10:25 AM
                    </p>
                  </Td>
                  <Td className="select_wrap">
                    <Select placeholder="Call">
                      <option value="option2">Chat</option>
                      <option value="option2">Email</option>
                    </Select>
                  </Td>
                  <Td className="remarks_wrap">
                    <Textarea placeholder="Enter remarks if any..." />
                  </Td>
                  <Td className="timedate_wrap">
                    <p className="timedate">Rohit Sharma</p>
                    <p className="timedate">
                      <img src={watch} className="icn_time" />
                      10:25 AM
                    </p>
                    <p className="timedate">
                      <img src={calendar} className="icn_time" />
                      24 Feb, 2023
                    </p>
                    <a href="" className="timedate">
                      <BsEye className="icn_time" />
                      View history
                    </a>
                  </Td>
                  <Td>
                    <Button className="theme_btn tbl_btn">Save</Button>
                  </Td>
                </Tr>
                <Tr>
                  <Td className="content_wrap new_content_wrap">
                    <a
                      onClick={() => {
                        history.push("/admin/live-tasks");
                      }}
                    >
                      <div className="content_imgs_wrap">
                        <div className="content_imgs">
                          <img src={content1} />
                          <img src={content2} />
                        </div>
                        <div className="content_imgs">
                          <img src={content3} />
                          <span className="arrow_span">
                            <BsArrowRight />
                          </span>
                        </div>
                      </div>
                    </a>
                  </Td>
                  <Td className="timedate_wrap">
                    <p className="timedate">
                      <img src={watch} className="icn_time" />
                      10:25 AM
                    </p>
                    <p className="timedate">
                      <img src={calendar} className="icn_time" />
                      24 Feb, 2023
                    </p>
                  </Td>
                  <Td className="address_wrap">
                    5 Canada Square, <br /> Canary Wharf. <br /> London <br />{" "}
                    E14 5AQ
                  </Td>
                  <Td className="item_detail">
                    <img src={publication3} alt="Content thumbnail" />
                    <Text className="nameimg">
                      <span className="txt_mdm">The Sun</span>
                    </Text>
                  </Td>
                  <Td className="description_td">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Provident, facilis!
                  </Td>
                  <Td className="text_center">
                    <div className="dir_col text_center">
                      <img
                        src={camera}
                        alt="Content thumbnail"
                        className="icn m_auto"
                      />
                      <img
                        src={interview}
                        alt="Content thumbnail"
                        className="icn m_auto"
                      />
                      <img
                        src={video}
                        alt="Content thumbnail"
                        className="icn m_auto"
                      />
                    </div>
                  </Td>
                  <Td className="text_center">
                    <img src={fashion} className="icn m_auto" />
                  </Td>
                  <Td className="text_center">
                    <div className="dir_col text_center">
                      <p className="text_center">4</p>
                      <p className="text_center">2</p>
                      <p className="text_center">1</p>
                    </div>
                  </Td>
                  <Td className="text_center">
                    <div className="dir_col">
                      <p>£ 200</p>
                      <p>£ 200</p>
                      <p>£ 300</p>
                    </div>
                  </Td>
                  <Td className="avatars_wrap">
                    <div className="overlay_imgs">
                      <div className="img_row1 top_row">
                        <Tooltip label="Janet Morrison" placement="top">
                          <img src={avt1} className="ovrl1" />
                        </Tooltip>
                        <Tooltip label="Sally Smith" placement="top">
                          <img src={avt2} className="ovrl2" />
                        </Tooltip>
                        <Tooltip label="Amanda Doe" placement="top">
                          <img src={avt3} className="ovrl3" />
                        </Tooltip>
                      </div>
                      <div className="img_row2 bottom_row">
                        <Tooltip label="Sally Smith" placement="top">
                          <img src={avt3} className="ovrl1" />
                        </Tooltip>
                        <Tooltip label="Amanda Doe" placement="top">
                          <img src={avt4} className="ovrl2" />
                        </Tooltip>
                      </div>
                    </div>
                  </Td>
                  <Td className="timedate_wrap">
                    <p className="timedate">
                      <img src={watch} className="icn_time" />
                      10:25 AM
                    </p>
                    <p className="timedate">
                      <img src={calendar} className="icn_time" />
                      24 Feb, 2023
                    </p>
                  </Td>
                  <Td className="timedate_wrap">
                    <p className="timedate">
                      <img src={watch} className="icn_time" />
                      10:25 AM
                    </p>
                    <p className="timedate">
                      <img src={calendar} className="icn_time" />
                      24 Feb, 2023
                    </p>
                    <span className="time_left success">2h:36m left</span>
                  </Td>
                  <Td className="asign_wrap">
                    <div className="slct">
                      <div className="sl_itm">
                        <p>Janet Morrison</p>
                        <span className="sml_txt">(0.1 m away)</span>
                      </div>
                      <div className="sl_itm active">
                        <p>Vishal Mehta</p>
                        <span className="sml_txt">(0.2 m away)</span>
                      </div>
                      <div className="sl_itm">
                        <p>James Argent</p>
                        <span className="sml_txt">(0.3 m away)</span>
                      </div>
                    </div>
                  </Td>
                  <Td className="timedate_wrap">
                    <p className="timedate">
                      <img src={idimg} className="icn_time" />
                      ID- 782319
                    </p>
                    <p className="timedate">
                      <img src={calendar} className="icn_time" />
                      INV- 628192
                    </p>
                    <p className="timedate">
                      <img src={watch} className="icn_time" />
                      10:25 AM
                    </p>
                  </Td>
                  <Td className="select_wrap">
                    <Select placeholder="Call">
                      <option value="option2">Chat</option>
                      <option value="option2">Email</option>
                    </Select>
                  </Td>
                  <Td className="remarks_wrap">
                    <Textarea placeholder="Enter remarks if any..." />
                  </Td>
                  <Td className="timedate_wrap">
                    <p className="timedate">Rohit Sharma</p>
                    <p className="timedate">
                      <img src={watch} className="icn_time" />
                      10:25 AM
                    </p>
                    <p className="timedate">
                      <img src={calendar} className="icn_time" />
                      24 Feb, 2023
                    </p>
                    <a href="" className="timedate">
                      <BsEye className="icn_time" />
                      View history
                    </a>
                  </Td>
                  <Td>
                    <Button className="theme_btn tbl_btn">Save</Button>
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </div>
      </Card>
    </Box>
  );
}
