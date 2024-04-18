
// // Chakra imports
// import {
//   Box, Flex,
//   Table,
//   Tbody,
//   Td,
//   Text,
//   Th,
//   Thead,
//   Tr,
//   useColorModeValue,
//   Select,
//   Textarea,
//   TableContainer,
//   Checkbox,
//   Button,
//   Progress,
// } from "@chakra-ui/react";
// import React, { useContext, useEffect, useState } from "react";
// import Card from "components/card/Card";
// import { BsEye } from "react-icons/bs";
// import camera from "assets/img/icons/camera.svg";
// import crown from "assets/img/icons/crown.png";
// import share from "assets/img/icons/share.png";
// import video from "assets/img/icons/video.svg";
// import watch from "assets/img/icons/watch.svg";
// import calendar from "assets/img/icons/calendar.svg";
// import print from "assets/img/icons/print.png";
// import { useHistory, useParams } from "react-router-dom";
// import { Tooltip } from '@chakra-ui/react';
// import avt1 from "assets/img/avatars/avt1.png";
// import avt2 from "assets/img/avatars/avt2.png";
// import avt3 from "assets/img/avatars/avt3.png";
// import avt4 from "assets/img/avatars/avt4.png";
// import monitor from "assets/img/icons/monitor.svg";
// import mobile from "assets/img/icons/mobile.svg";
// import mail from "assets/img/icons/mail.svg";
// import pro from "assets/img/icons/pro.svg";
// import idic from "assets/img/icons/id.svg";
// import shared from "assets/img/icons/shared.svg";
// import img1 from "assets/img/nfts/Nft4.png";
// import img2 from "assets/img/avatars/avatar2.png";
// import img3 from "assets/img/nfts/Nft2.png";
// import docuploaded from "assets/img/icons/img-upld.svg";
// import write from "assets/img/icons/write.svg";
// import { BsArrowRight } from "react-icons/bs";
// import interview from "assets/img/icons/interview.svg";
// import amt from "assets/img/icons/ametuer.svg";
// import { Get } from "api/admin.services";
// import { toast } from "react-toastify";
// import { Patch } from "api/admin.services";
// import moment from "moment/moment";
// import { Post } from "api/admin.services";
// import dataContext from "../ContextFolder/Createcontext";
// import { async } from "@firebase/util";
// import { RiTextDirectionL } from "react-icons/ri";


// export default function AdminControls() {
//   const textColor = useColorModeValue("#000", "white");

//   const { id } = useParams();
//   const [EmployeeData, setEmployeeData] = useState([])

//   const GetEmployeeHistory = async () => {
//     try {
//       await Get(`admin/getemployeeHistory?employee_id=${id}`).then((res) => {
//         console.log(res?.data?.response, `<--------------response for employee data`)
//         setEmployeeData(res?.data?.response)


//       })


//     } catch (error) {

//     }
//   }
//   useEffect(() => {
//     GetEmployeeHistory(id)
//   }, [])

//   return (
//     <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>

//       {/* <> */}
//       <Card className="tab_card"
//         direction='column'
//         w='100%'
//         px='0px'
//         mb='24px'
//         overflowX={{ sm: "scroll", lg: "hidden" }}>
//         <div className="">
//           <Flex px='20px' justify='space-between' mb='10px' align='center'>
//             <Text
//               color={textColor}
//               fontSize='22px'
//               fontFamily={"AirbnbBold"}
//               lineHeight='100%'>
//               Employee control history
//             </Text>
//             <div className="opt_icons_wrap">
//               <img src={share} className="opt_icons" />
//               <img src={print} className="opt_icons" />
//               <Select placeholder='Sort' className="opt_sort">
//                 <option value='option2'>Daily</option>
//                 <option value='option3'>Weekly</option>
//                 <option value='option3'>Monthly</option>
//                 <option value='option3'>Yearly</option>
//               </Select>
//             </div>
//           </Flex>
//           <TableContainer className="fix_ht_table">
//             <Table mx='20px' variant='simple' className="common_table">
//               <Thead>
//                 <Tr>
//                   <Th>Time & date</Th>
//                   <Th>Employee name</Th>
//                   <Th>Employee ID</Th>
//                   <Th>Address</Th>
//                   <Th>Banking details</Th>
//                   <Th>Contract signed</Th>
//                   <Th>Legal T&C’s signed</Th>
//                   <Th>Check & approve</Th>
//                   <Th>Status</Th>
//                   <Th>Action taken</Th>
//                   <Th>Remarks</Th>
//                   {/* <Th>CTA</Th> */}
//                 </Tr>
//               </Thead>
//               <Tbody>

//                 {
//                   EmployeeData && EmployeeData.map((curr) => {

//                     return (
//                       <Tr>

//                         <Td className="timedate_wrap">
//                           <p className="timedate"><img src={watch} className="icn_time" />{moment(curr.createdAt).format('hh:mm A')}</p>
//                           <p className="timedate"><img src={calendar} className="icn_time" />{moment(curr.createdAt).format('DD MM YYYY')}</p>
//                         </Td>

//                         <Td>

//                           <span>{curr?.admin_id?.name}</span>
//                         </Td>

//                         <Td className="item_detail">
//                           <img src={idic} alt="id" className="icn" />

//                           <span>{curr._id}</span>
//                         </Td>

//                         <Td className="item_detail address_details">{curr?.employee_id
//                           ?.employee_address?.post_code} {curr?.employee_address?.city},{curr?.employee_address?.country}< br /> post-code {curr?.employee_address?.post_code}</Td>



//                         <Td className="contact_details">
//                           {curr?.employee_id.bank_details?.bank_name}<br />
//                           Sort Code-{curr?.employee_id.bank_details?.sort_code}<br />
//                           Account-{curr?.employee_id.bank_details?.account_number}
//                         </Td>
//                         <Td className="text_center">
//                           <Checkbox
//                             colorScheme='brandScheme'
//                             me='10px'
//                             isChecked={curr?.is_Contractsigned}
//                             disabled
//                           />
//                         </Td>
//                         <Td className="text_center">
//                           <Checkbox
//                             colorScheme='brandScheme'
//                             me='10px'
//                             isChecked={curr?.is_Legal}
//                             disabled
//                           />
//                         </Td>
//                         <Td className="text_center">
//                           <Checkbox
//                             colorScheme='brandScheme'
//                             me='10px'
//                             isChecked={curr?.is_Checkandapprove}
//                             disabled
//                           />
//                         </Td>
//                         <Td className="big_select_wrap">
//                           <Select value={curr?.status}>
//                             <option value='onbord'>Onboarded</option>
//                             <option value='pending'>Pending</option>
//                             disabled

//                           </Select>
//                         </Td>

//                         <Td className="item_detail">
//                           {/* <div className="check_wrap">
//                             {curr?.isTempBlocked === true && (
//                               <Checkbox
//                                 colorScheme="brandScheme"
//                                 me="10px"
//                                 isChecked={curr?.isTempBlocked}
//                                 disabled
//                               />
//                             )}
//                           </div> */}

//                           <span>
//                             {curr?.isTempBlocked === true ? "Temporary Block" : "No Action Taken"}

//                           </span>
//                         </Td>


//                         <Td className="conversation-td">
//                           <div className="conversation-details">
//                             <p>{curr.remarks}                          </p>
//                           </div>
//                         </Td>
//                       </Tr>

//                     )
//                   })
//                 }
//               </Tbody>
//             </Table>
//           </TableContainer>
//         </div>
//       </Card>
//       {/* </> */}
//     </Box>
//   );
// }
