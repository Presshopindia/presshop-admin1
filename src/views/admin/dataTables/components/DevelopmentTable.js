// /* eslint-disable */
// import {
//   Flex,
//   Progress,
//   Table,
//   Tbody,
//   Td,
//   Text,
//   Th,
//   Thead,
//   Tr,
//   useColorModeValue,
//   Tfoot,
//   TableContainer,
// } from "@chakra-ui/react";
// // Custom components
// import Card from "components/card/Card";
// import { AndroidLogo, AppleLogo, WindowsLogo } from "components/icons/Icons";
// import Menu from "components/menu/MainMenu";
// import React, { useMemo } from "react";
// import {
//   useGlobalFilter,
//   usePagination,
//   useSortBy,
//   useTable,
// } from "react-table";
// import img1 from "../../../../assets/img/nfts/Nft4.png";
// import img2 from "../../../../assets/img/avatars/avatar2.png";
// import img3 from "../../../../assets/img/nfts/Nft2.png";
// import img4 from "../../../../assets/img/nfts/Nft3.png";

// export default function DevelopmentTable(props) {
//   const { columnsData, tableData } = props;

//   const columns = useMemo(() => columnsData, [columnsData]);
//   const data = useMemo(() => tableData, [tableData]);

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
//     getTableProps,
//     getTableBodyProps,
//     headerGroups,
//     page,
//     prepareRow,
//     initialState,
//   } = tableInstance;
//   initialState.pageSize = 11;

//   const textColor = useColorModeValue("#000", "white");
//   const iconColor = useColorModeValue("secondaryGray.500", "white");
//   const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
//   return (
//     <>
//     <Card
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
//             Content Onboarding
//           </Text>
//           <Menu />
//         </Flex>
//         <TableContainer>
//           <Table variant='simple' className="common_table">
//             <Thead>
//               <Tr>
//                 <Th>Published content</Th>
//                 <Th>Time & date</Th>
//                 <Th>Description</Th>
//                 <Th>Type</Th>
//                 <Th>Licence</Th>
//                 <Th>Category</Th>
//                 <Th>Location</Th>
//                 <Th>Published by</Th>
//                 <Th>Price</Th>
//                 <Th>1st level check</Th>
//                 <Th>2nd level check</Th>
//                 <Th>Check and approve</Th>
//                 <Th>Mode</Th>
//                 <Th>Status</Th>
//                 <Th>Remarks</Th>
//                 <Th>User details</Th>
//                 <Th>CTA</Th>
//               </Tr>
//             </Thead>
//             <Tbody>
//               <Tr>
//               <Td><img src={img1} alt="Content thumbnail" /></Td>
//                 <Td>34</Td>
//                 <Td>46</Td>
//                 <Td>26</Td>
//                 <Td>34</Td>
//                 <Td>46</Td>
//                 <Td>14</Td>
//                 <Td>34</Td>
//                 <Td>46</Td>
//                 <Td>26</Td>
//               </Tr>
//               <Tr>
//               <Td><img src={img2} alt="Content thumbnail" /></Td>
//                 <Td>Strong Doe</Td>
//                 <Td>34</Td>
//                 <Td>46</Td>
//                 <Td>62</Td>
//                 <Td>34</Td>
//                 <Td>46</Td>
//                 <Td>62</Td>
//                 <Td>34</Td>
//                 <Td>46</Td>
//                 <Td>62</Td>
//               </Tr>
//               <Tr>
//               <Td><img src={img3} alt="Content thumbnail" /></Td>
//                 <Td>Mighty Doe</Td>
//                 <Td>2</Td>
//                 <Td>46</Td>
//                 <Td>25</Td>
//                 <Td>5</Td>
//                 <Td>46</Td>
//                 <Td>8</Td>
//                 <Td>2</Td>
//                 <Td>46</Td>
//                 <Td>25</Td>
//               </Tr>
//               <Tr>
//               <Td><img src={img4} alt="Content thumbnail" /></Td>
//                 <Td>John Doe</Td>
//                 <Td>6</Td>
//                 <Td>46</Td>
//                 <Td>12</Td>
//                 <Td>6</Td>
//                 <Td>35</Td>
//                 <Td>41</Td>
//                 <Td>6</Td>
//                 <Td>46</Td>
//                 <Td>12</Td>
//               </Tr>
//             </Tbody>
//           </Table>
//         </TableContainer>
//       </Card>

//     <Card
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
//             Content  Purchase Summary
//           </Text>
//           <Menu />
//         </Flex>
//         <TableContainer>
//           <Table variant='simple' className="common_table">
//             <Thead>
//               <Tr>
//                 <Th>Publication</Th>
//                 <Th>Total content purchased</Th>
//                 <Th>Total payment made</Th>
//                 <Th>Total payment pending</Th>
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
//       </Card>

//     <Card
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
//             Content sourced summary
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
//       </Card>

//     <Card
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
//             Payment summary
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
//       </Card>
//      </>
//   );
// }
