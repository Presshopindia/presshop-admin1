

// Chakra imports
import { InputGroup } from "@chakra-ui/react";
import { React, useEffect, useState } from "react";
import {
     Flex,
     Text,
     useColorModeValue,
     Button,
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
     Select
} from "@chakra-ui/react";
import Card from "components/card/Card";
// import { useHistory } from "react-router-dom";
import writeic from "assets/img/icons/write.svg";
import { AiOutlineDelete } from "react-icons/ai";
// import { Post } from "api/admin.services";
import { Get } from "api/admin.services";
// import { toast } from "react-toastify";
// import { Delete } from "api/admin.services";
// import { Patch } from "api/admin.services";
import crimeic from "assets/img/icons/crime.svg";
import celebrityic from "assets/img/icons/celebrity.svg";
import politicalic from "assets/img/icons/political.svg";
import fashionic from "assets/img/icons/Fashion.svg";
import businessic from "assets/img/icons/business.svg";
import { GrAttachment } from "react-icons/gr";


const TableCard = (props) => {
     
     const { isOpen, onOpen, onClose } = useDisclosure()
     // const [isEdit, setisEdit] = useState(false)
     // const history = useHistory()
     const type = props.types;
     // const [data, setData] = useState({ role: "Hopper", name: "" })
     const [getRole, SetGetRole] = useState("Hopper");
     // const [categoryName, setCategoryName] = useState([]);

     const textColor = useColorModeValue("#000", "white");

     return (
          <>
               <Card
                    direction='column'
                    w='699px'
                    px='0px'
                    overflowX={{ sm: "scroll", lg: "hidden" }}>
                    <Flex px='20px' justify='space-between' mb='20px' align='center'>
                         <Text
                              color={textColor}
                              fontSize='22px'
                              fontWeight='700'
                              lineHeight='100%'
                              fontFamily={"AirbnbBold"}>
                              {type.toUpperCase()}
                         </Text>
                         <div className="opt_icons_wrap" >
                              <Select placeholder='Role' className="opt_sort" onChange={(e) => {
                                   SetGetRole(e.target.value)
                              }}>
                                   <option value='Hopper'>Hopper</option>
                                   <option value='MediaHouse'>Publication</option>
                                   <option value='forAll'>For all</option>
                              </Select>
                              <a onClick={onOpen} className="txt_danger_mdm">
                                   Add
                              </a>
                         </div>
                    </Flex>
                    <TableContainer className="fix_ht_table">
                         <Table variant='simple' className="common_table">
                              <Thead>
                                   <Tr>
                                        <Th>Category image</Th>
                                        <Th>Category name</Th>
                                        <Th>Action</Th>
                                   </Tr>
                              </Thead>
                              <Tbody>
                                   <Tr>
                                        <Td
                                             w='23.3%' className="text_center"><img src={crimeic} alt="crime" className="icn" /></Td>
                                        <Td
                                             w='43.3%'
                                             className="contact_details">Crime</Td>
                                        <Td
                                             w='33.3%' >
                                             <div className="catmang_icns">
                                                  <a onClick={onOpen}>
                                                       <img className="icn" src={writeic} alt="write" />
                                                  </a>
                                                  <AiOutlineDelete className="icn" />
                                             </div>
                                        </Td>
                                   </Tr>
                                   <Tr>
                                        <Td
                                             w='23.3%' className="text_center"><img src={celebrityic} alt="crime" className="icn" /></Td>
                                        <Td
                                             w='43.3%'
                                             className="contact_details">Celebrity</Td>
                                        <Td
                                             w='33.3%' >
                                             <div className="catmang_icns">
                                                  <a onClick={onOpen}>
                                                       <img className="icn" src={writeic} alt="write" />
                                                  </a>
                                                  <AiOutlineDelete className="icn" />
                                             </div>
                                        </Td>
                                   </Tr>
                                   <Tr>
                                        <Td
                                             w='23.3%' className="text_center"><img src={politicalic} alt="political" className="icn" /></Td>
                                        <Td
                                             w='43.3%'
                                             className="contact_details">Political</Td>
                                        <Td
                                             w='33.3%' >
                                             <div className="catmang_icns">
                                                  <a onClick={onOpen}>
                                                       <img className="icn" src={writeic} alt="write" />
                                                  </a>
                                                  <AiOutlineDelete className="icn" />
                                             </div>
                                        </Td>
                                   </Tr>
                                   <Tr>
                                        <Td
                                             w='23.3%' className="text_center"><img src={fashionic} alt="fashion" className="icn" /></Td>
                                        <Td
                                             w='43.3%'
                                             className="contact_details">Fashion</Td>
                                        <Td
                                             w='33.3%' >
                                             <div className="catmang_icns">
                                                  <a onClick={onOpen}>
                                                       <img className="icn" src={writeic} alt="write" />
                                                  </a>
                                                  <AiOutlineDelete className="icn" />
                                             </div>
                                        </Td>
                                   </Tr>
                                   <Tr>
                                        <Td
                                             w='23.3%' className="text_center"><img src={businessic} alt="business" className="icn" /></Td>
                                        <Td
                                             w='43.3%'
                                             className="contact_details">Business</Td>
                                        <Td
                                             w='33.3%' >
                                             <div className="catmang_icns">
                                                  <a onClick={onOpen}>
                                                       <img className="icn" src={writeic} alt="write" />
                                                  </a>
                                                  <AiOutlineDelete className="icn" />
                                             </div>
                                        </Td>
                                   </Tr>
                                   <Tr>
                                        <Td
                                             w='23.3%' className="text_center"><img src={crimeic} alt="crime" className="icn" /></Td>
                                        <Td
                                             w='43.3%'
                                             className="contact_details">Crime</Td>
                                        <Td
                                             w='33.3%' >
                                             <div className="catmang_icns">
                                                  <a onClick={onOpen}>
                                                       <img className="icn" src={writeic} alt="write" />
                                                  </a>
                                                  <AiOutlineDelete className="icn" />
                                             </div>
                                        </Td>
                                   </Tr>
                                   <Tr>
                                        <Td
                                             w='23.3%' className="text_center"><img src={celebrityic} alt="crime" className="icn" /></Td>
                                        <Td
                                             w='43.3%'
                                             className="contact_details">Celebrity</Td>
                                        <Td
                                             w='33.3%' >
                                             <div className="catmang_icns">
                                                  <a onClick={onOpen}>
                                                       <img className="icn" src={writeic} alt="write" />
                                                  </a>
                                                  <AiOutlineDelete className="icn" />
                                             </div>
                                        </Td>
                                   </Tr>
                                   <Tr>
                                        <Td
                                             w='23.3%' className="text_center"><img src={politicalic} alt="political" className="icn" /></Td>
                                        <Td
                                             w='43.3%'
                                             className="contact_details">Political</Td>
                                        <Td
                                             w='33.3%' >
                                             <div className="catmang_icns">
                                                  <a onClick={onOpen}>
                                                       <img className="icn" src={writeic} alt="write" />
                                                  </a>
                                                  <AiOutlineDelete className="icn" />
                                             </div>
                                        </Td>
                                   </Tr>
                                   <Tr>
                                        <Td
                                             w='23.3%' className="text_center"><img src={fashionic} alt="fashion" className="icn" /></Td>
                                        <Td
                                             w='33.3%'
                                             className="contact_details">Fashion</Td>
                                        <Td
                                             w='33.3%' >
                                             <div className="catmang_icns">
                                                  <a onClick={onOpen}>
                                                       <img className="icn" src={writeic} alt="write" />
                                                  </a>
                                                  <AiOutlineDelete className="icn" />
                                             </div>
                                        </Td>
                                   </Tr>
                                   <Tr>
                                        <Td
                                             w='23.3%' className="text_center"><img src={businessic} alt="business" className="icn" /></Td>
                                        <Td
                                             w='43.3%'
                                             className="contact_details">Business</Td>
                                        <Td
                                             w='33.3%' >
                                             <div className="catmang_icns">
                                                  <a onClick={onOpen}>
                                                       <img className="icn" src={writeic} alt="write" />
                                                  </a>
                                                  <AiOutlineDelete className="icn" />
                                             </div>
                                        </Td>
                                   </Tr>
                              </Tbody>
                         </Table>
                    </TableContainer>
               </Card>

               <Modal className="action_modal_wrap" isOpen={isOpen} onClose={onClose} show>
                    <ModalOverlay />
                    <ModalContent className="action_modal_cont">
                         <ModalBody>
                              <Text
                                   fontFamily='AirbnbBold'
                                   fontSize='35px'
                                   mb='43px'>
                                   Add Category
                              </Text>
                              <div className="action_modal_body">
                                   <div className="dtl_wrap mdl_itms">
                                        <Flex className="edit_inputs_wrap" px='0px' justify='space-between' gap='20px' mb="0px" align='center'>
                                             <div className="mdl_inp" flex={1}>
                                                  <Text mb='6px'
                                                       fontSize='13px'
                                                       fontFamily='AirbnbMedium'>
                                                       Category Role
                                                  </Text>
                                                  <div className="select_wrapper">
                                                       <Select className="icon_left_side" placeholder='Role' >
                                                            <option value='A'>Hopper</option>
                                                            <option value='B'>Publication</option>
                                                            <option value='C'>For all</option>
                                                       </Select>
                                                  </div>
                                             </div>
                                             <div className="mdl_inp" flex={1}>
                                                  <Text mb='6px'
                                                       fontSize='13px'
                                                       fontFamily='AirbnbMedium'>
                                                       Category Image
                                                  </Text>
                                                  <InputGroup className="addcatic_wrap">
                                                       <label htmlFor="upcataicn" className="atch_label">
                                                            <GrAttachment className="atch_icn" />
                                                       </label>
                                                       <span>
                                                            Upload category image
                                                       </span>
                                                       <Input type="file" id="upcataicn" placeholder='Upload category image'
                                                       />
                                                  </InputGroup>
                                             </div>
                                        </Flex>
                                        <Flex className="edit_inputs_wrap"
                                        w="50%" px='0px' justify='space-between' gap='20px' mb="0px" align='center'>
                                             <div className="mdl_inp">
                                                  <Text mb='6px'
                                                       fontSize='13px'
                                                       fontFamily='AirbnbMedium'>
                                                       Category Name
                                                  </Text>
                                                  <Input placeholder="Enter category name" />
                                             </div>
                                        </Flex>
                                   </div>
                                   <div className="save_btn_wrap">
                                        <Button className="btn_bg" onClick={onClose}>Save</Button>
                                   </div>
                              </div>
                         </ModalBody>
                    </ModalContent>
               </Modal>

          </>

     )
}

export default TableCard 