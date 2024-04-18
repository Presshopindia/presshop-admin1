// /* eslint-disable */
// import { Flex, Table, Tbody, Td, Text, Th, Thead, Tr, useColorModeValue, TableContainer, Checkbox, Textarea, Select, Button, } from "@chakra-ui/react";
// import Card from "components/card/Card";
// // import Menu from "components/menu/MainMenu";
// import React, { useMemo, useState } from "react";
// import { useGlobalFilter, usePagination, useSortBy, useTable, } from "react-table";
// import img1 from "assets/img/nfts/Nft4.png";
// import img2 from "assets/img/avatars/avatar2.png";
// import img3 from "assets/img/nfts/Nft2.png";
// import img4 from "assets/img/nfts/Nft3.png";
// import img5 from "assets/img/profile/publication1.svg";
// import img6 from "assets/img/profile/publication2.svg";
// import { useHistory } from "react-router-dom";
// import mobile from "assets/img/icons/mobile.svg";
// import watch from "assets/img/icons/watch.svg";
// import calendar from "assets/img/icons/calendar.svg";
// import phone from "assets/img/icons/phone.svg";
// import mail from "assets/img/icons/mail.svg";
// import pro from "assets/img/icons/pro.png";
// import amt from "assets/img/icons/amature.png";
// import celebrity from "assets/img/icons/celebrity.png";
// import camera from "assets/img/icons/camera.svg";
// import avt1 from "assets/img/avatars/avt1.png";
// import avt2 from "assets/img/avatars/avt2.png";
// import avt3 from "assets/img/avatars/avt3.png";
// import avt4 from "assets/img/avatars/avt4.png";
// import avt11 from "assets/img/avatars/avatar11.png";
// import avt12 from "assets/img/avatars/avatar12.png";
// import avt13 from "assets/img/avatars/avatar13.png";
// import { BsArrowRight } from "react-icons/bs";
// import { BsEye } from "react-icons/bs";
// import { MultiSelect } from "react-multi-select-component";
// import { Tooltip } from '@chakra-ui/react';
// import share from "assets/img/icons/share.png";
// import print from "assets/img/icons/print.png";

// export default function DevelopmentTable(props) {
//   const history = useHistory()
//   const { columnsData, tableData } = props;
//   const columns = useMemo(() => columnsData, [columnsData]);
//   const data = useMemo(() => tableData, [tableData]);

//   const [selectedOptions, setSelectedOptions] = useState([]);
//   const tableInstance = useTable(
//     {
//       columns,
//       data,
//     },
//     useGlobalFilter,
//     useSortBy,
//     usePagination
//   );
//   const {
//     initialState,
//   } = tableInstance;
//   initialState.pageSize = 11;

//   const textColor = useColorModeValue("#000", "white");
//   return (
//     <>
//       <Card
//         direction='column'
//         w='100%'
//         px='0px'
//         mb='24px'
//         overflowX={{ sm: "scroll", lg: "hidden" }}>
//         <Flex px='25px' justify='space-between' mb='10px' align='center'>
//           <Text
//             color={textColor}
//             fontSize='22px'
//             fontWeight='700'
//             lineHeight='100%'
//             fontFamily={"AirbnbBold"}>
//             Hopper Controls
//           </Text>
//           <div className="opt_icons_wrap">
//             <img src={share} className="opt_icons" />
//             <img src={print} className="opt_icons" />
//             <Select placeholder='Sort' className="opt_sort">
//               <option value='option2'>Daily</option>
//               <option value='option3'>Weekly</option>
//               <option value='option3'>Monthly</option>
//               <option value='option3'>Yearly</option>
//             </Select>
//             <a onClick={() => { history.push("/admin/hopper-add") }} className="txt_danger_mdm">
            
//               Add
//             </a>
//             {/* <Menu /> */}
//           </div>
//         </Flex>
//         <TableContainer className="fix_ht_table">
//           <Table variant='simple' className="common_table">
//             <Thead>
//               <Tr>
//                 <Th>Hopper details</Th>
//                 <Th>Time & date</Th>
//                 <Th className="adr_dtl">Address</Th>
//                 <Th>Contact details</Th>
//                 <Th>Category</Th>
//                 <Th>Ratings</Th>
//                 <Th>Uploaded docs</Th>
//                 <Th>Banking details</Th>
//                 <Th>Legal T&C's signed</Th>
//                 <Th>Check & approve</Th>
//                 <Th>Mode</Th>
//                 <Th>Status</Th>
//                 <Th>Action</Th>
//                 <Th>Remarks</Th>
//                 <Th>User details</Th>
//                 <Th>CTA</Th>
//               </Tr>
//             </Thead>
//             <Tbody>
//               <Tr>
//                 <Td className="item_detail">
//                   <a onClick={() => { history.push("/admin/hopper-edit") }}>
//                     <img src={avt13} alt="Content thumbnail" />
//                     <Text className="nameimg"><span className="txt_mdm">Janet Morrison</span><br />
//                       <span >(pseudonyms)</span></Text>
//                   </a>
//                 </Td>
//                 <Td className="timedate_wrap">
//                   <p className="timedate"><img src={watch} className="icn_time" />10:25 AM</p>
//                   <p className="timedate"><img src={calendar} className="icn_time" />24 Feb, 2023</p>
//                 </Td>
//                 <Td className="address_wrap">5 Canada Square, <br /> Canary Wharf. <br /> London  <br /> E14 5AQ</Td>
//                 <Td className="contact_details">
//                   <div className="mobile detail_itm">
//                     <img src={mobile} className="icn" />
//                     <span>+41 &nbsp; 47323425</span>
//                   </div>
//                   <div className="mobile detail_itm">
//                     <img src={mail} className="icn" />
//                     <span>janet@gmail.com</span>
//                   </div>
//                 </Td>
//                 <Td><img src={amt} className="icn icn_catg m_auto" /></Td>
//                 <Td>4.1</Td>
//                 <Td className="contact_details">Government ID<br /> Photography Licence</Td>
//                 <Td className="contact_details">HSBC Bank<br /> Sort Code - 06 78 83<br /> Account - 9877 2941</Td>
//                 <Td className="check_td">
//                   <Checkbox
//                     colorScheme='brandScheme'
//                     me='10px'
//                   />
//                 </Td>
//                 <Td className="check_aprv_td">
//                   <Checkbox
//                     colorScheme='brandScheme'
//                     me='10px'
//                   />
//                 </Td>
//                 <Td className="select_wrap">
//                   <Select placeholder='Chat'>
//                     <option value='option2'>Call</option>
//                   </Select>
//                 </Td>
//                 <Td className="big_select_wrap">
//                   <Select placeholder='Onboarded'>
//                     <option value='option2'>Pending</option>
//                   </Select>
//                 </Td>
//                 <Td>
//                   <div className="check_wrap">
//                     <Checkbox
//                       colorScheme='brandScheme'
//                       me='10px'
//                     />
//                     <span>Remove</span>
//                   </div>
//                   <div className="check_wrap">
//                     <Checkbox
//                       colorScheme='brandScheme'
//                       me='10px'
//                     />
//                     <span>Blacklist</span>
//                   </div>
//                 </Td>
//                 <Td className="remarks_wrap">
//                   <Textarea placeholder='Enter remarks if any...' />
//                 </Td>
//                 <Td className="timedate_wrap">
//                   <p className="timedate">Rohit Sharma</p>
//                   <p className="timedate"><img src={watch} className="icn_time" />10:25 AM</p>
//                   <p className="timedate"><img src={calendar} className="icn_time" />24 Feb, 2023</p>
//                   <a href="" className="timedate"><BsEye className="icn_time" />View history</a>
//                 </Td>
//                 <Td><Button className="theme_btn">Save</Button></Td>
//               </Tr>
//               <Tr>
//                 <Td className="item_detail"><img src={avt11} alt="Content thumbnail" />
//                   <Text className="nameimg"><span className="txt_mdm"> Janet Morrison </span><br />
//                     <span >(pseudonyms)</span></Text>
//                 </Td>
//                 <Td className="timedate_wrap">
//                   <p className="timedate"><img src={watch} className="icn_time" />10:25 AM</p>
//                   <p className="timedate"><img src={calendar} className="icn_time" />24 Feb, 2023</p>
//                 </Td>
//                 <Td className="address_wrap">5 Canada Square, <br /> Canary Wharf. <br /> London  <br /> E14 5AQ</Td>
//                 <Td className="contact_details">
//                   <div className="mobile detail_itm">
//                     <img src={mobile} className="icn" />
//                     <span>+41 &nbsp; 47323425</span>
//                   </div>
//                   <div className="mobile detail_itm">
//                     <img src={phone} className="icn" />
//                     <span>+41&nbsp;47218425</span>
//                   </div>
//                   <div className="mobile detail_itm">
//                     <img src={mail} className="icn" />
//                     <span>janet@gmail.com</span>
//                   </div>
//                 </Td>
//                 <Td><img src={pro} className="icn icn_catg" /></Td>
//                 <Td>4.1</Td>
//                 <Td className="contact_details">Government ID<br /> Photography Licence</Td>
//                 <Td className="contact_details">HSBC Bank<br /> Sort Code - 06 78 83<br /> Account - 9877 2941</Td>
//                 <Td className="check_td">
//                   <Checkbox
//                     colorScheme='brandScheme'
//                     me='10px'
//                   />
//                 </Td>
//                 <Td className="check_aprv_td">
//                   <Checkbox
//                     colorScheme='brandScheme'
//                     me='10px'
//                   />
//                 </Td>
//                 <Td className="select_wrap">
//                   <Select placeholder='Chat'>
//                     <option value='option3'>Call</option>
//                   </Select>
//                 </Td>
//                 <Td className="big_select_wrap">
//                   <Select placeholder='Onboarded'>
//                     <option value='option2'>Pending</option>
//                   </Select>
//                 </Td>
//                 <Td>
//                   <div className="check_wrap">
//                     <Checkbox
//                       colorScheme='brandScheme'
//                       me='10px'
//                     />
//                     <span>Remove</span>
//                   </div>
//                   <div className="check_wrap">
//                     <Checkbox
//                       colorScheme='brandScheme'
//                       me='10px'
//                     />
//                     <span>Blacklist</span>
//                   </div>
//                 </Td>
//                 <Td className="remarks_wrap">
//                   <Textarea placeholder='Enter remarks if any...' />
//                 </Td>
//                 <Td className="timedate_wrap">
//                   <p className="timedate">Rohit Sharma</p>
//                   <p className="timedate"><img src={watch} className="icn_time" />10:25 AM</p>
//                   <p className="timedate"><img src={calendar} className="icn_time" />24 Feb, 2023</p>
//                   <a href="" className="timedate"><BsEye className="icn_time" />View history</a>
//                 </Td>
//                 <Td><Button className="theme_btn">Save</Button></Td>
//               </Tr>
//               <Tr>
//                 <Td className="item_detail"><img src={avt12} alt="Content thumbnail" />
//                   <Text className="nameimg"><span className="txt_mdm"> Janet Morrison</span> <br />
//                     <span >pseudonyms</span></Text>
//                 </Td>
//                 <Td className="timedate_wrap">
//                   <p className="timedate"><img src={watch} className="icn_time" />10:25 AM</p>
//                   <p className="timedate"><img src={calendar} className="icn_time" />24 Feb, 2023</p>
//                 </Td>
//                 <Td className="address_wrap">5 Canada Square, <br /> Canary Wharf. <br /> London  <br /> E14 5AQ</Td>
//                 <Td className="contact_details">
//                   <div className="mobile detail_itm">
//                     <img src={mobile} className="icn" />
//                     <span>+41 &nbsp; 47323425</span>
//                   </div>
//                   <div className="mobile detail_itm">
//                     <img src={phone} className="icn" />
//                     <span>+41&nbsp;47218425</span>
//                   </div>
//                   <div className="mobile detail_itm">
//                     <img src={mail} className="icn" />
//                     <span>janet@gmail.com</span>
//                   </div>
//                 </Td>
//                 <Td><img src={amt} className="icn icn_catg m_auto" /></Td>
//                 <Td>4.1</Td>
//                 <Td className="contact_details">Government ID<br /> Photography Licence</Td>
//                 <Td className="contact_details">HSBC Bank<br /> Sort Code - 06 78 83<br /> Account - 9877 2941</Td>
//                 <Td className="check_td">
//                   <Checkbox
//                     colorScheme='brandScheme'
//                     me='10px'
//                   />
//                 </Td>
//                 <Td className="check_aprv_td">
//                   <Checkbox
//                     colorScheme='brandScheme'
//                     me='10px'
//                   />
//                 </Td>
//                 <Td className="select_wrap">
//                   <Select placeholder='Chat'>
//                     <option value='option3'>Call</option>
//                   </Select>
//                 </Td>
//                 <Td className="big_select_wrap">
//                   <Select placeholder='Onboarded'>
//                     <option value='option2'>Pending</option>
//                   </Select>
//                 </Td>
//                 <Td>
//                   <div className="check_wrap">
//                     <Checkbox
//                       colorScheme='brandScheme'
//                       me='10px'
//                     />
//                     <span>Remove</span>
//                   </div>
//                   <div className="check_wrap">
//                     <Checkbox
//                       colorScheme='brandScheme'
//                       me='10px'
//                     />
//                     <span>Blacklist</span>
//                   </div>
//                 </Td>
//                 <Td className="remarks_wrap">
//                   <Textarea placeholder='Enter remarks if any...' />
//                 </Td>
//                 <Td className="timedate_wrap">
//                   <p className="timedate">Rohit Sharma</p>
//                   <p className="timedate"><img src={watch} className="icn_time" />10:25 AM</p>
//                   <p className="timedate"><img src={calendar} className="icn_time" />24 Feb, 2023</p>
//                   <a href="" className="timedate"><BsEye className="icn_time" />View history</a>
//                 </Td>
//                 <Td><Button className="theme_btn">Save</Button></Td>
//               </Tr>
//               <Tr>
//                 <Td className="item_detail"><img src={avt13} alt="Content thumbnail" />
//                   <Text className="nameimg"><span className="txt_mdm">Janet Morrison</span> <br />
//                     <span >pseudonyms</span></Text>
//                 </Td>
//                 <Td className="timedate_wrap">
//                   <p className="timedate"><img src={watch} className="icn_time" />10:25 AM</p>
//                   <p className="timedate"><img src={calendar} className="icn_time" />24 Feb, 2023</p>
//                 </Td>
//                 <Td className="address_wrap">5 Canada Square, <br /> Canary Wharf. <br /> London  <br /> E14 5AQ</Td>
//                 <Td className="contact_details">
//                   <div className="mobile detail_itm">
//                     <img src={mobile} className="icn" />
//                     <span>+41 &nbsp; 47323425</span>
//                   </div>
//                   <div className="mobile detail_itm">
//                     <img src={phone} className="icn" />
//                     <span>+41&nbsp;47218425</span>
//                   </div>
//                   <div className="mobile detail_itm">
//                     <img src={mail} className="icn" />
//                     <span>janet@gmail.com</span>
//                   </div>
//                 </Td>
//                 <Td><img src={pro} className="icn icn_catg m_auto" /></Td>
//                 <Td>4.1</Td>
//                 <Td className="contact_details">Government ID<br /> Photography Licence</Td>
//                 <Td className="contact_details">HSBC Bank<br /> Sort Code - 06 78 83<br /> Account - 9877 2941</Td>
//                 <Td className="check_td">
//                   <Checkbox
//                     colorScheme='brandScheme'
//                     me='10px'
//                   />
//                 </Td>
//                 <Td className="check_aprv_td">
//                   <Checkbox
//                     colorScheme='brandScheme'
//                     me='10px'
//                   />
//                 </Td>
//                 <Td className="select_wrap">
//                   <Select placeholder='Chat'>
//                     <option value='option3'>Call</option>
//                   </Select>
//                 </Td>
//                 <Td className="big_select_wrap">
//                   <Select placeholder='Onboarded'>
//                     <option value='option2'>Pending</option>
//                   </Select>
//                 </Td>
//                 <Td>
//                   <div className="check_wrap">
//                     <Checkbox
//                       colorScheme='brandScheme'
//                       me='10px'
//                     />
//                     <span>Remove</span>
//                   </div>
//                   <div className="check_wrap">
//                     <Checkbox
//                       colorScheme='brandScheme'
//                       me='10px'
//                     />
//                     <span>Blacklist</span>
//                   </div>
//                 </Td>
//                 <Td className="remarks_wrap">
//                   <Textarea placeholder='Enter remarks if any...' />
//                 </Td>
//                 <Td className="timedate_wrap">
//                   <p className="timedate">Rohit Sharma</p>
//                   <p className="timedate"><img src={watch} className="icn_time" />10:25 AM</p>
//                   <p className="timedate"><img src={calendar} className="icn_time" />24 Feb, 2023</p>
//                   <a href="" className="timedate"><BsEye className="icn_time" />View history</a>
//                 </Td>
//                 <Td><Button className="theme_btn">Save</Button></Td>
//               </Tr>
//             </Tbody>
//           </Table>
//         </TableContainer>
//       </Card>

//       <Card
//         direction='column'
//         w='100%'
//         px='0px'
//         mb='24px'
//         overflowX={{ sm: "scroll", lg: "hidden" }}>
//         <Flex px='25px' justify='space-between' mb='10px' align='center'>
//           <Text
//             color={textColor}
//             fontSize='22px'
//             fontWeight='700'
//             lineHeight='100%'
//             fontFamily={"AirbnbBold"}>
//             Task Controls
//           </Text>
//           <div className="opt_icons_wrap">
//             {/* <RxUpload />
//             <TfiPrinter /> */}
//             <img src={share} className="opt_icons" />
//             <img src={print} className="opt_icons" />
//             <Select placeholder='Sort' className="opt_sort">
//               <option value='option2'>Daily</option>
//               <option value='option3'>Weekly</option>
//               <option value='option3'>Monthly</option>
//               <option value='option3'>Yearly</option>
//             </Select>
//             {/* <Menu /> */}
//           </div>
//         </Flex>
//         <TableContainer className="fix_ht_table">
//           <Table variant='simple' className="common_table">
//             <Thead>
//               <Tr>
//                 <Th>Broadcasted by</Th>
//                 <Th>Time & date</Th>
//                 <Th className="adr_dtl">Task details</Th>
//                 <Th>Type</Th>
//                 <Th>Category</Th>
//                 <Th>Accepted by</Th>
//                 <Th>Uploaded content</Th>
//                 <Th>Deadline & time left</Th>
//                 <Th>Assign more hoppers</Th>
//                 <Th>Mode</Th>
//                 <Th>Remarks</Th>
//                 <Th>User details</Th>
//                 <Th>CTA</Th>
//               </Tr>
//             </Thead>
//             <Tbody>
//               <Tr>
//                 <Td className="item_detail"><img src={img5} alt="Content thumbnail" />
//                   <Text className="nameimg"><span className="txt_mdm">Reuters Media</span></Text>
//                 </Td>
//                 <Td className="timedate_wrap">
//                   <p className="timedate"><img src={watch} className="icn_time" />10:25 AM</p>
//                   <p className="timedate"><img src={calendar} className="icn_time" />24 Feb, 2023</p>
//                 </Td>
//                 <Td className="contact_details">lorem ipsum details text lorem ipsum details text</Td>
//                 <Td className="">
//                   <img src={camera} className="icn m_auto" />
//                 </Td>
//                 <Td><img src={celebrity} className="icn icn_catg m_auto" /></Td>
//                 <Td className="avatars_wrap">
//                   <div className="overlay_imgs">
//                     <div className="img_row1 top_row">
//                       <Tooltip label='Janet Morrison' placement='top'>
//                         <img src={avt1} className="ovrl1" />
//                       </Tooltip>
//                       <Tooltip label='Sally Smith' placement='top'>
//                         <img src={avt2} className="ovrl2" />
//                       </Tooltip>
//                       <Tooltip label='Amanda Doe' placement='top'>
//                         <img src={avt3} className="ovrl3" />
//                       </Tooltip>
//                     </div>
//                     <div className="img_row1 top_row">
//                       <Tooltip label='Sally Smith' placement='top'>
//                         <img src={avt3} className="ovrl1" />
//                       </Tooltip>
//                       <Tooltip label='Amanda Doe' placement='top'>
//                         <img src={avt4} className="ovrl2" />
//                       </Tooltip>
//                     </div>
//                   </div>
//                 </Td>
//                 <Td className="content_wrap">
//                   <div className="content_imgs_wrap">
//                     <div className="content_imgs">
//                       <img src={img1} />
//                       <img src={img2} />
//                       <img src={img3} />
//                     </div>
//                     <div className="content_imgs">
//                       <img src={img1} />
//                       <img src={img2} />
//                       <span className="arrow_span"><BsArrowRight /></span>
//                     </div>
//                   </div>
//                 </Td>
//                 <Td className="timedate_wrap">
//                   <p className="timedate"><img src={watch} className="icn_time" />10:25 AM</p>
//                   {/* <p className="timedate"><MdOutlineWatchLater className="icn_size" />10:25 AM</p> */}
//                   <p className="timedate"><img src={calendar} className="icn_time" />24 Feb, 2023</p>
//                   <span className="time_left danger">36m delayed</span>
//                 </Td>
//                 <Td className="multiselect_wrap">
//                   {/* multiselect Start */}
//                   <MultiSelect
//                     options={[
//                       { value: 'option1', label: 'Janet Morrison (0.1m away)' },
//                       { value: 'option2', label: 'Vishal Mehta (0.2m away)' },
//                       { value: 'option3', label: 'James Argent (0.3m away)' },
//                     ]}
//                     value={selectedOptions}
//                     onChange={setSelectedOptions}
//                   />
//                   {/* multiselect End */}
//                 </Td>
//                 <Td className="select_wrap">
//                   <Select placeholder='Chat'>
//                     <option value='option2'>Call</option>
//                   </Select>
//                 </Td>
//                 <Td className="remarks_wrap">
//                   <Textarea placeholder='Enter remarks if any...' />
//                 </Td>
//                 <Td className="timedate_wrap">
//                   <p className="timedate">Rohit Sharma</p>
//                   <p className="timedate"><img src={watch} className="icn_time" />10:25 AM</p>
//                   <p className="timedate"><img src={calendar} className="icn_time" />24 Feb, 2023</p>
//                   <a href="" className="timedate"><BsEye className="icn_time" />View history</a>
//                 </Td>
//                 <Td><Button className="theme_btn">Save</Button></Td>
//               </Tr>
//               <Tr>
//                 <Td className="item_detail"><img src={img6} alt="Content thumbnail" />
//                   <Text className="nameimg"><span className="txt_mdm"> Daily Mail</span></Text>
//                 </Td>
//                 <Td className="timedate_wrap">
//                   <p className="timedate"><img src={watch} className="icn_time" />10:25 AM</p>
//                   <p className="timedate"><img src={calendar} className="icn_time" />24 Feb, 2023</p>
//                 </Td>
//                 <Td className="contact_details">lorem ipsum details text lorem ipsum details text</Td>
//                 <Td className="">
//                   <img src={camera} className="icn m_auto" />
//                 </Td>
//                 <Td><img src={celebrity} className="icn icn_catg m_auto" /></Td>
//                 <Td className="avatars_wrap">
//                   <div className="overlay_imgs">
//                     <div className="img_row1 top_row">
//                       <Tooltip label='Janet Morrison' placement='top'>
//                         <img src={avt1} className="ovrl1" />
//                       </Tooltip>
//                       <Tooltip label='Sally Smith' placement='top'>
//                         <img src={avt2} className="ovrl2" />
//                       </Tooltip>
//                       <Tooltip label='Amanda Doe' placement='top'>
//                         <img src={avt3} className="ovrl3" />
//                       </Tooltip>
//                     </div>
//                     <div className="img_row1 top_row">
//                       <Tooltip label='Sally Smith' placement='top'>
//                         <img src={avt3} className="ovrl1" />
//                       </Tooltip>
//                       <Tooltip label='Amanda Doe' placement='top'>
//                         <img src={avt4} className="ovrl2" />
//                       </Tooltip>
//                     </div>
//                   </div>
//                 </Td>
//                 <Td className="content_wrap">
//                   <div className="content_imgs_wrap">
//                     <div className="content_imgs">
//                       <img src={img1} />
//                       <img src={img2} />
//                       <img src={img3} />
//                     </div>
//                     <div className="content_imgs">
//                       <img src={img1} />
//                       <img src={img2} />
//                       <span className="arrow_span"><BsArrowRight /></span>
//                     </div>
//                   </div>
//                 </Td>
//                 <Td className="timedate_wrap">
//                   <p className="timedate"><img src={watch} className="icn_time" />10:25 AM</p>
//                   <p className="timedate"><img src={calendar} className="icn_time" />24 Feb, 2023</p>
//                   <span className="time_left success">1h:36m left</span>
//                 </Td>
//                 <Td className="multiselect_wrap">
//                   {/* multiselect Start */}
//                   <MultiSelect
//                     options={[
//                       { value: 'option1', label: 'Janet Morrison (0.1m away)' },
//                       { value: 'option2', label: 'Vishal Mehta (0.2m away)' },
//                       { value: 'option3', label: 'James Argent (0.3m away)' },
//                     ]}
//                     value={selectedOptions}
//                     onChange={setSelectedOptions}
//                   />
//                   {/* multiselect End */}
//                 </Td>
//                 <Td className="select_wrap">
//                   <Select placeholder='Chat'>
//                     <option value='option2'>Call</option>
//                   </Select>
//                 </Td>
//                 <Td className="remarks_wrap">
//                   <Textarea placeholder='Enter remarks if any...' />
//                 </Td>
//                 <Td className="timedate_wrap">
//                   <p className="timedate">Rohit Sharma</p>
//                   <p className="timedate"><img src={watch} className="icn_time" />10:25 AM</p>
//                   <p className="timedate"><img src={calendar} className="icn_time" />24 Feb, 2023</p>
//                   <a href="" className="timedate"><BsEye className="icn_time" />View history</a>
//                 </Td>
//                 <Td><Button className="theme_btn">Save</Button></Td>
//               </Tr>
//               <Tr>
//                 <Td className="item_detail"><img src={img5} alt="Content thumbnail" />
//                   <Text className="nameimg"><span className="txt_mdm"> Reuters Media</span></Text>
//                 </Td>
//                 <Td className="timedate_wrap">
//                   <p className="timedate"><img src={watch} className="icn_time" />10:25 AM</p>
//                   <p className="timedate"><img src={calendar} className="icn_time" />24 Feb, 2023</p>
//                 </Td>
//                 <Td className="contact_details">lorem ipsum details text lorem ipsum details text</Td>
//                 <Td className="">
//                   <img src={camera} className="icn m_auto" />
//                 </Td>
//                 <Td><img src={celebrity} className="icn icn_catg m_auto" /></Td>
//                 <Td className="avatars_wrap">
//                   <div className="overlay_imgs">
//                     <div className="img_row1 top_row">
//                       <Tooltip label='Janet Morrison' placement='top'>
//                         <img src={avt1} className="ovrl1" />
//                       </Tooltip>
//                       <Tooltip label='Sally Smith' placement='top'>
//                         <img src={avt2} className="ovrl2" />
//                       </Tooltip>
//                       <Tooltip label='Amanda Doe' placement='top'>
//                         <img src={avt3} className="ovrl3" />
//                       </Tooltip>
//                     </div>
//                     <div className="img_row1 top_row">
//                       <Tooltip label='Sally Smith' placement='top'>
//                         <img src={avt3} className="ovrl1" />
//                       </Tooltip>
//                       <Tooltip label='Amanda Doe' placement='top'>
//                         <img src={avt4} className="ovrl2" />
//                       </Tooltip>
//                     </div>
//                   </div>
//                 </Td>
//                 <Td className="content_wrap">
//                   <div className="content_imgs_wrap">
//                     <div className="content_imgs">
//                       <img src={img1} />
//                       <img src={img2} />
//                       <img src={img3} />
//                     </div>
//                     <div className="content_imgs">
//                       <img src={img1} />
//                       <img src={img2} />
//                       <span className="arrow_span"><BsArrowRight /></span>
//                     </div>
//                   </div>
//                 </Td>
//                 <Td className="timedate_wrap">
//                   <p className="timedate"><img src={watch} className="icn_time" />10:25 AM</p>
//                   <p className="timedate"><img src={calendar} className="icn_time" />24 Feb, 2023</p>
//                   <span className="time_left danger">36m delayed</span>
//                 </Td>
//                 <Td className="multiselect_wrap">
//                   {/* multiselect Start */}
//                   <MultiSelect
//                     options={[
//                       { value: 'option1', label: 'Janet Morrison (0.1m away)' },
//                       { value: 'option2', label: 'Vishal Mehta (0.2m away)' },
//                       { value: 'option3', label: 'James Argent (0.3m away)' },
//                     ]}
//                     value={selectedOptions}
//                     onChange={setSelectedOptions}
//                   />
//                   {/* multiselect End */}
//                 </Td>
//                 <Td className="select_wrap">
//                   <Select placeholder='Chat'>
//                     <option value='option2'>Call</option>
//                   </Select>
//                 </Td>
//                 <Td className="remarks_wrap">
//                   <Textarea placeholder='Enter remarks if any...' />
//                 </Td>
//                 <Td className="timedate_wrap">
//                   <p className="timedate">Rohit Sharma</p>
//                   <p className="timedate"><img src={watch} className="icn_time" />10:25 AM</p>
//                   <p className="timedate"><img src={calendar} className="icn_time" />24 Feb, 2023</p>
//                   <a href="" className="timedate"><BsEye className="icn_time" />View history</a>
//                 </Td>
//                 <Td><Button className="theme_btn">Save</Button></Td>
//               </Tr>
//               <Tr>
//                 <Td className="item_detail"><img src={img6} alt="Content thumbnail" />
//                   <Text className="nameimg"><span className="txt_mdm"> Daily Mail</span></Text>
//                 </Td>
//                 <Td className="timedate_wrap">
//                   <p className="timedate"><img src={watch} className="icn_time" />10:25 AM</p>
//                   <p className="timedate"><img src={calendar} className="icn_time" />24 Feb, 2023</p>
//                 </Td>
//                 <Td className="contact_details">lorem ipsum details text lorem ipsum details text</Td>
//                 <Td className="">
//                   <img src={camera} className="icn m_auto" />
//                 </Td>
//                 <Td><img src={celebrity} className="icn icn_catg m_auto" /></Td>
//                 <Td className="avatars_wrap">
//                   <div className="overlay_imgs">
//                     <div className="img_row1 top_row">
//                       <Tooltip label='Janet Morrison' placement='top'>
//                         <img src={avt1} className="ovrl1" />
//                       </Tooltip>
//                       <Tooltip label='Sally Smith' placement='top'>
//                         <img src={avt2} className="ovrl2" />
//                       </Tooltip>
//                       <Tooltip label='Amanda Doe' placement='top'>
//                         <img src={avt3} className="ovrl3" />
//                       </Tooltip>
//                     </div>
//                     <div className="img_row1 top_row">
//                       <Tooltip label='Sally Smith' placement='top'>
//                         <img src={avt3} className="ovrl1" />
//                       </Tooltip>
//                       <Tooltip label='Amanda Doe' placement='top'>
//                         <img src={avt4} className="ovrl2" />
//                       </Tooltip>
//                     </div>
//                   </div>
//                 </Td>
//                 <Td className="content_wrap">
//                   <div className="content_imgs_wrap">
//                     <div className="content_imgs">
//                       <img src={img1} />
//                       <img src={img2} />
//                       <img src={img3} />
//                     </div>
//                     <div className="content_imgs">
//                       <img src={img1} />
//                       <img src={img2} />
//                       <span className="arrow_span"><BsArrowRight /></span>
//                     </div>
//                   </div>
//                 </Td>
//                 <Td className="timedate_wrap">
//                   <p className="timedate"><img src={watch} className="icn_time" />10:25 AM</p>
//                   <p className="timedate"><img src={calendar} className="icn_time" />24 Feb, 2023</p>
//                   <span className="time_left success">1h:36m left</span>
//                 </Td>
//                 <Td className="multiselect_wrap">
//                   {/* multiselect Start */}
//                   <MultiSelect
//                     options={[
//                       { value: 'option1', label: 'Janet Morrison (0.1m away)' },
//                       { value: 'option2', label: 'Vishal Mehta (0.2m away)' },
//                       { value: 'option3', label: 'James Argent (0.3m away)' },
//                     ]}
//                     value={selectedOptions}
//                     onChange={setSelectedOptions}
//                   />
//                   {/* multiselect End */}
//                 </Td>
//                 <Td className="select_wrap">
//                   <Select placeholder='Chat'>
//                     <option value='option2'>Call</option>
//                   </Select>
//                 </Td>
//                 <Td className="remarks_wrap">
//                   <Textarea placeholder='Enter remarks if any...' />
//                 </Td>
//                 <Td className="timedate_wrap">
//                   <p className="timedate">Rohit Sharma</p>
//                   <p className="timedate"><img src={watch} className="icn_time" />10:25 AM</p>
//                   <p className="timedate"><img src={calendar} className="icn_time" />24 Feb, 2023</p>
//                   <a href="" className="timedate"><BsEye className="icn_time" />View history</a>
//                 </Td>
//                 <Td><Button className="theme_btn">Save</Button></Td>
//               </Tr>
//             </Tbody>
//           </Table>
//         </TableContainer>
//       </Card>

//       <Card
//         direction='column'
//         w='100%'
//         px='0px'
//         mb='24px'
//         overflowX={{ sm: "scroll", lg: "hidden" }}>
//         <Flex px='25px' justify='space-between' mb='10px' align='center'>
//           <Text
//             color={textColor}
//             fontSize='22px'
//             fontWeight='700'
//             lineHeight='100%'
//             fontFamily={"AirbnbBold"}>
//             Published Content Summary
//           </Text>
//           <div className="opt_icons_wrap">
//             {/* <RxUpload />
//             <TfiPrinter /> */}
//             <img src={share} className="opt_icons" />
//             <img src={print} className="opt_icons" />
//             <Select placeholder='Sort' className="opt_sort">
//               <option value='option2'>Daily</option>
//               <option value='option3'>Weekly</option>
//               <option value='option3'>Monthly</option>
//               <option value='option3'>Yearly</option>
//             </Select>
//             {/* <Menu /> */}
//           </div>
//         </Flex>
//         <TableContainer className="fix_ht_table">
//           <Table variant='simple' className="common_table">
//             <Thead>
//               <Tr>
//                 <Th>Hopper details</Th>
//                 <Th>Published content (Qty)</Th>
//                 <Th >Published content (Value)</Th>
//                 <Th>Total payment earned</Th>
//                 <Th>Payment pending</Th>
//                 <Th>Payment due date</Th>
//                 <Th>Presshop commission</Th>
//                 <Th>Mode</Th>
//                 <Th>Remarks</Th>
//                 <Th>User details</Th>
//                 <Th>CTA</Th>
//               </Tr>
//             </Thead>
//             <Tbody>
//               <Tr>
//                 <Td className="item_detail">
//                   <a onClick={() => { history.push("/admin/published-content") }}>
//                     <img src={avt1} alt="Content thumbnail" />
//                     <Text className="nameimg"><span className="txt_mdm">Janet Morrison</span><br />
//                       <span >(pseudonyms)</span></Text>
//                   </a>
//                 </Td>
//                 <Td>
//                   34
//                 </Td>
//                 <Td>&pound; 11,500</Td>
//                 <Td className="">
//                   &pound; 9,200
//                 </Td>
//                 <Td>
//                   &pound; 0
//                 </Td>
//                 <Td className="timedate_wrap">
//                   Payment made
//                 </Td>
//                 <Td className="txt_wrap">
//                   &pound; 2,300
//                 </Td>
//                 <Td className="select_wrap">
//                   <Select placeholder='Chat'>
//                     <option value='option2'>Call</option>
//                   </Select>
//                 </Td>
//                 <Td className="remarks_wrap">
//                   <Textarea placeholder='Enter remarks if any...' />
//                 </Td>
//                 <Td className="timedate_wrap">
//                   <p className="timedate">Rohit Sharma</p>
//                   <p className="timedate"><img src={watch} className="icn_time" />10:25 AM</p>
//                   <p className="timedate"><img src={calendar} className="icn_time" />24 Feb, 2023</p>
//                   <a href="" className="timedate"><BsEye className="icn_time" />View history</a>
//                 </Td>
//                 <Td><Button className="theme_btn">Save</Button></Td>
//               </Tr>
//               <Tr>
//                 <Td className="item_detail"><img src={avt11} alt="Content thumbnail" />
//                   <Text className="nameimg"><span className="txt_mdm">Sam Robert</span><br />
//                     <span >(Strongsilver)</span></Text>
//                 </Td>
//                 <Td>
//                   34
//                 </Td>
//                 <Td>&pound; 11,500</Td>
//                 <Td className="">
//                   &pound; 9,200
//                 </Td>
//                 <Td>
//                   &pound; 0
//                 </Td>
//                 <Td className="timedate_wrap">
//                   <p className="timedate"><img src={calendar} className="icn_time" />24 Feb, 2023</p>
//                 </Td>
//                 <Td className="txt_wrap">
//                   <p>&pound; 680</p>
//                   <p className="link_danger">&pound; 600</p>
//                 </Td>
//                 <Td className="select_wrap">
//                   <Select placeholder='Chat'>
//                     <option value='option2'>Call</option>
//                   </Select>
//                 </Td>
//                 <Td className="remarks_wrap">
//                   <Textarea placeholder='Enter remarks if any...' />
//                 </Td>
//                 <Td className="timedate_wrap">
//                   <p className="timedate">Rohit Sharma</p>
//                   <p className="timedate"><img src={watch} className="icn_time" />10:25 AM</p>
//                   <p className="timedate"><img src={calendar} className="icn_time" />24 Feb, 2023</p>
//                   <a href="" className="timedate"><BsEye className="icn_time" />View history</a>
//                 </Td>
//                 <Td><Button className="theme_btn">Save</Button></Td>
//               </Tr>
//               <Tr>
//                 <Td className="item_detail"><img src={avt12} alt="Content thumbnail" />
//                   <Text className="nameimg"><span className="txt_mdm">Sam Robert</span><br />
//                     <span >(Strongsilver)</span></Text>
//                 </Td>
//                 <Td>
//                   34
//                 </Td>
//                 <Td>&pound; 11,500</Td>
//                 <Td className="">
//                   &pound; 9,200
//                 </Td>
//                 <Td>
//                   &pound; 0
//                 </Td>
//                 <Td className="timedate_wrap">
//                   <p className="timedate"><img src={calendar} className="icn_time" />24 Feb, 2023</p>
//                 </Td>
//                 <Td className="txt_wrap">
//                   <p>&pound; 680</p>
//                   <p className="link_danger">&pound; 600</p>
//                 </Td>
//                 <Td className="select_wrap">
//                   <Select placeholder='Chat'>
//                     <option value='option2'>Call</option>
//                   </Select>
//                 </Td>
//                 <Td className="remarks_wrap">
//                   <Textarea placeholder='Enter remarks if any...' />
//                 </Td>
//                 <Td className="timedate_wrap">
//                   <p className="timedate">Rohit Sharma</p>
//                   <p className="timedate"><img src={watch} className="icn_time" />10:25 AM</p>
//                   <p className="timedate"><img src={calendar} className="icn_time" />24 Feb, 2023</p>
//                   <a href="" className="timedate"><BsEye className="icn_time" />View history</a>
//                 </Td>
//                 <Td><Button className="theme_btn">Save</Button></Td>
//               </Tr>
//             </Tbody>
//           </Table>
//         </TableContainer>
//       </Card>

//       <Card
//         direction='column'
//         w='100%'
//         px='0px'
//         mb='24px'
//         overflowX={{ sm: "scroll", lg: "hidden" }}>
//         <Flex px='25px' justify='space-between' mb='10px' align='center'>
//           <Text
//             color={textColor}
//             fontSize='22px'
//             fontWeight='700'
//             lineHeight='100%'
//             fontFamily={"AirbnbBold"}>
//             Uploaded Content Summary
//           </Text>
//           <div className="opt_icons_wrap">
//             {/* <RxUpload />
//             <TfiPrinter /> */}
//             <img src={share} className="opt_icons" />
//             <img src={print} className="opt_icons" />
//             <Select placeholder='Sort' className="opt_sort">
//               <option value='option2'>Daily</option>
//               <option value='option3'>Weekly</option>
//               <option value='option3'>Monthly</option>
//               <option value='option3'>Yearly</option>
//             </Select>
//             {/* <Menu /> */}
//           </div>
//         </Flex>
//         <TableContainer className="fix_ht_table">
//           <Table variant='simple' className="common_table">
//             <Thead>
//               <Tr>
//                 <Th>Hopper details</Th>
//                 <Th>Tasks accepted</Th>
//                 <Th >Uploaded content (Qty)</Th>
//                 <Th>Uploaded content (Value)</Th>
//                 <Th>Total payment earned</Th>
//                 <Th>Payment pending</Th>
//                 <Th>Payment due date</Th>
//                 <Th>Presshop commission</Th>
//                 <Th>Mode</Th>
//                 <Th>Remarks</Th>
//                 <Th>User details</Th>
//                 <Th>CTA</Th>
//               </Tr>
//             </Thead>
//             <Tbody>
//               <Tr>
//                 <Td className="item_detail"><img src={avt1} alt="Content thumbnail" />
//                   <Text className="nameimg"><span className="txt_mdm">Janet Morrison</span><br />
//                     <span >(pseudonyms)</span></Text>
//                 </Td>
//                 <Td>
//                   34
//                 </Td>
//                 <Td>
//                   43
//                 </Td>
//                 <Td>&pound; 11,500</Td>
//                 <Td className="">
//                   &pound; 9,200
//                 </Td>
//                 <Td>
//                   &pound; 0
//                 </Td>
//                 <Td className="timedate_wrap">
//                   Payment made
//                 </Td>
//                 <Td className="txt_wrap">
//                   &pound; 2,300
//                 </Td>
//                 <Td className="select_wrap">
//                   <Select placeholder='Chat'>
//                     <option value='option2'>Call</option>
//                   </Select>
//                 </Td>
//                 <Td className="remarks_wrap">
//                   <Textarea placeholder='Enter remarks if any...' />
//                 </Td>
//                 <Td className="timedate_wrap">
//                   <p className="timedate">Rohit Sharma</p>
//                   <p className="timedate"><img src={watch} className="icn_time" />10:25 AM</p>
//                   <p className="timedate"><img src={calendar} className="icn_time" />24 Feb, 2023</p>
//                   <a href="" className="timedate"><BsEye className="icn_time" />View history</a>
//                 </Td>
//                 <Td><Button className="theme_btn">Save</Button></Td>
//               </Tr>
//               <Tr>
//                 <Td className="item_detail"><img src={avt11} alt="Content thumbnail" />
//                   <Text className="nameimg"><span className="txt_mdm">Sam Robert</span><br />
//                     <span >(Strongsilver)</span></Text>
//                 </Td>
//                 <Td>
//                   21
//                 </Td>
//                 <Td>
//                   63
//                 </Td>
//                 <Td>&pound; 11,500</Td>
//                 <Td className="">
//                   &pound; 9,200
//                 </Td>
//                 <Td>
//                   &pound; 0
//                 </Td>
//                 <Td className="timedate_wrap">
//                   <p className="timedate"><img src={calendar} className="icn_time" />24 Feb, 2023</p>
//                 </Td>
//                 <Td className="txt_wrap">
//                   <p>&pound; 680</p>
//                   <p className="link_danger">&pound; 600</p>
//                 </Td>
//                 <Td className="select_wrap">
//                   <Select placeholder='Chat'>
//                     <option value='option2'>Call</option>
//                   </Select>
//                 </Td>
//                 <Td className="remarks_wrap">
//                   <Textarea placeholder='Enter remarks if any...' />
//                 </Td>
//                 <Td className="timedate_wrap">
//                   <p className="timedate">Rohit Sharma</p>
//                   <p className="timedate"><img src={watch} className="icn_time" />10:25 AM</p>
//                   <p className="timedate"><img src={calendar} className="icn_time" />24 Feb, 2023</p>
//                   <a href="" className="timedate"><BsEye className="icn_time" />View history</a>
//                 </Td>
//                 <Td><Button className="theme_btn">Save</Button></Td>
//               </Tr>
//               <Tr>
//                 <Td className="item_detail"><img src={avt12} alt="Content thumbnail" />
//                   <Text className="nameimg"><span className="txt_mdm">Sam Robert</span><br />
//                     <span >(Strongsilver)</span></Text>
//                 </Td>
//                 <Td>
//                   62
//                 </Td>
//                 <Td>
//                   49
//                 </Td>
//                 <Td>&pound; 11,500</Td>
//                 <Td className="">
//                   &pound; 9,200
//                 </Td>
//                 <Td>
//                   &pound; 0
//                 </Td>
//                 <Td className="timedate_wrap">
//                   <p className="timedate"><img src={calendar} className="icn_time" />24 Feb, 2023</p>
//                 </Td>
//                 <Td className="txt_wrap">
//                   <p>&pound; 680</p>
//                   <p className="link_danger">&pound; 600</p>
//                 </Td>
//                 <Td className="select_wrap">
//                   <Select placeholder='Chat'>
//                     <option value='option2'>Call</option>
//                   </Select>
//                 </Td>
//                 <Td className="remarks_wrap">
//                   <Textarea placeholder='Enter remarks if any...' />
//                 </Td>
//                 <Td className="timedate_wrap">
//                   <p className="timedate">Rohit Sharma</p>
//                   <p className="timedate"><img src={watch} className="icn_time" />10:25 AM</p>
//                   <p className="timedate"><img src={calendar} className="icn_time" />24 Feb, 2023</p>
//                   <a href="" className="timedate"><BsEye className="icn_time" />View history</a>
//                 </Td>
//                 <Td><Button className="theme_btn">Save</Button></Td>
//               </Tr>
//             </Tbody>
//           </Table>
//         </TableContainer>
//       </Card>

//       {/* <Card
//         direction='column'
//         w='100%'
//         px='0px'
//         mb='24px'
//         overflowX={{ sm: "scroll", lg: "hidden" }}>
//         <Flex px='25px' justify='space-between' mb='10px' align='center'>
//           <Text
//             color={textColor}
//             fontSize='22px'
//             fontWeight='700'
//             lineHeight='100%'>
//             Published Content
//           </Text>
//           <Menu />
//         </Flex>
//         <TableContainer>
//           <Table variant='simple' className="common_table">
//             <Thead>
//               <Tr>
//                 <Th>Publication</Th>
//                 <Th>Total Content Purchased</Th>
//                 <Th>Total Payment Made</Th>
//                 <Th>Total Payment Pending</Th>
//               </Tr>
//             </Thead>
//             <Tbody>
//               <Tr>
//                 <Td>John Doe</Td>
//                 <Td>34</Td>
//                 <Td>46</Td>
//                 <Td>26</Td>
//               </Tr>
//               <Tr>
//                 <Td>Strong Doe</Td>
//                 <Td>34</Td>
//                 <Td>46</Td>
//                 <Td>62</Td>
//               </Tr>
//               <Tr>
//                 <Td>Mighty Doe</Td>
//                 <Td>2</Td>
//                 <Td>46</Td>
//                 <Td>25</Td>
//               </Tr>
//               <Tr>
//                 <Td>John Doe</Td>
//                 <Td>6</Td>
//                 <Td>46</Td>
//                 <Td>12</Td>
//               </Tr>
//             </Tbody>
//           </Table>
//         </TableContainer>
//       </Card> */}

//       {/* <Card
//         direction='column'
//         w='100%'
//         px='0px'
//         mb='24px'
//         overflowX={{ sm: "scroll", lg: "hidden" }}>
//         <Flex px='25px' justify='space-between' mb='10px' align='center'>
//           <Text
//             color={textColor}
//             fontSize='22px'
//             fontWeight='700'
//             lineHeight='100%'>
//             Content Sourced Summary
//           </Text>
//           <Menu />
//         </Flex>
//         <TableContainer>
//           <Table variant='simple' className="common_table">
//             <Thead>
//               <Tr>
//                 <Th>Publication</Th>
//                 <Th>Total Tasks Broadcasted</Th>
//                 <Th>Content Purchased</Th>
//                 <Th>Total Payment Made</Th>
//               </Tr>
//             </Thead>
//             <Tbody>
//               <Tr>
//                 <Td>John Doe</Td>
//                 <Td>34</Td>
//                 <Td>46</Td>
//                 <Td>26</Td>
//               </Tr>
//               <Tr>
//                 <Td>Strong Doe</Td>
//                 <Td>34</Td>
//                 <Td>46</Td>
//                 <Td>62</Td>
//               </Tr>
//               <Tr>
//                 <Td>Mighty Doe</Td>
//                 <Td>2</Td>
//                 <Td>46</Td>
//                 <Td>25</Td>
//               </Tr>
//               <Tr>
//                 <Td>John Doe</Td>
//                 <Td>6</Td>
//                 <Td>46</Td>
//                 <Td>12</Td>
//               </Tr>
//             </Tbody>
//           </Table>
//         </TableContainer>
//       </Card> */}

//       {/* <Card
//         direction='column'
//         w='100%'
//         px='0px'
//         mb='24px'
//         overflowX={{ sm: "scroll", lg: "hidden" }}>
//         <Flex px='25px' justify='space-between' mb='10px' align='center'>
//           <Text
//             color={textColor}
//             fontSize='22px'
//             fontWeight='700'
//             lineHeight='100%'>
//             Payment Summary
//           </Text>
//           <Menu />
//         </Flex>
//         <TableContainer>
//           <Table variant='simple' className="common_table">
//             <Thead>
//               <Tr>
//                 <Th>Publication</Th>
//                 <Th>Total Content Purchased</Th>
//                 <Th>Total Payment Made</Th>
//                 <Th>Payment Pending if any</Th>
//                 <Th>Reasons</Th>
//                 <Th>Action Plan</Th>
//               </Tr>
//             </Thead>
//             <Tbody>
//               <Tr>
//                 <Td>John Doe</Td>
//                 <Td>34</Td>
//                 <Td>46</Td>
//                 <Td>26</Td>
//                 <Td>lorem5</Td>
//                 <Td>26</Td>
//               </Tr>
//               <Tr>
//                 <Td>Strong Doe</Td>
//                 <Td>34</Td>
//                 <Td>46</Td>
//                 <Td>62</Td>
//               </Tr>
//               <Tr>
//                 <Td>Mighty Doe</Td>
//                 <Td>2</Td>
//                 <Td>46</Td>
//                 <Td>25</Td>
//               </Tr>
//               <Tr>
//                 <Td>John Doe</Td>
//                 <Td>6</Td>
//                 <Td>46</Td>
//                 <Td>12</Td>
//               </Tr>
//             </Tbody>
//           </Table>
//         </TableContainer>
//       </Card> */}
//     </>
//   );
// }
