

// Chakra imports
import {
     Box,
} from "@chakra-ui/react";
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
import { useHistory } from "react-router-dom";
import writeic from "assets/img/icons/write.svg";
import { AiOutlineDelete } from "react-icons/ai";
import { Post } from "api/admin.services";
import { Get } from "api/admin.services";
import { toast } from "react-toastify";
import { Delete } from "api/admin.services";
import { Patch } from "api/admin.services";


const TableCard = (props) => {
     const { isOpen, onOpen, onClose } = useDisclosure()
     const [isEdit, setisEdit] = useState(false)
     const history = useHistory()
     const type = props.types;
     const [data, setData] = useState({ role: "Hopper", name: "" })
     const [getRole, SetGetRole] = useState("Hopper");
     const [categoryName, setCategoryName] = useState([]);

     const textColor = useColorModeValue("#000", "white");
     //  Add category Api

     const ADD = async () => {
          try {
               await Post("admin/addCategory", { type, role: data.role, name: data.name });
               onClose();
               toast.success("Category is add sucessfully")
               getCategory()
          } catch (er) {
          }
     }

     const getCategory = async () => {
          try {
               await Get(`admin/getCategory/${getRole}/${type}`).then((res) => {
                    setCategoryName(res.data.categories)
               })
          } catch (er) {

          }
     }

     const getCategorybyId = async (type) => {
          try {
               await Get(`admin/getCategoryById/${type._id}`).then((res) => {
                    setData(res.data.category)
                    setisEdit(true)
                    onOpen(true)
               })
          } catch (er) {
          }
     }

     const editCategory = async () => {
          data.category_id = data._id
          try {
               await Patch(`admin/editCategory`, data).then((res)=>{
                    getCategory();
                    onClose();
                    toast.success("category is updated")
               })
          } catch (err) {
          }
     }

     const deleteCategory = async (category_id) => {
          try {
               await Delete(`admin/deleteCategory/${category_id}`).then((res) => {
                    toast.error("category deleted");
                    getCategory()
               })
          } catch (err) {
              if(err){
               // console.log(err,`<---------msgf`)
               toast.error(err.response.data
                    .errors.msg)
              }
          }
     }


     useEffect(() => {
          getCategory()
     }, [type, getRole])





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
                                        <Th>Category name</Th>
                                        <Th>Action</Th>
                                   </Tr>
                              </Thead>
                              <Tbody>
                                   {categoryName && categoryName.map((value) => {
                                        // console.log(value, `<-----------------values`)

                                        return (
                                             <Tr >
                                                  <Td
                                                       w='43.3%'
                                                       className="contact_details">{value.name}</Td>
                                                  <Td
                                                       w='33.3%' >
                                                       <div className="catmang_icns">
                                                            <a onClick={() => {
                                                                 getCategorybyId(value)
                                                            }}>
                                                                 <img className="icn" src={writeic} alt="write" />
                                                            </a>
                                                            <AiOutlineDelete className="icn" onClick={() => deleteCategory(value._id)} />

                                                       </div>
                                                  </Td>
                                             </Tr>)
                                   })}
                              </Tbody>
                         </Table>
                    </TableContainer>
               </Card>

               <Modal className="action_modal_wrap" isOpen={isOpen} onClose={() => {
                    onClose()
                    setisEdit(false)
               }} show>
                    <ModalOverlay />
                    <ModalContent className="action_modal_cont">
                         <ModalBody>
                              <Text
                                   fontFamily='AirbnbBold'
                                   fontSize='35px'
                                   mb='43px'>
                                   {isEdit ? "Edit" : "Add"} Category
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
                                                       <Select value={data.role} className="icon_left_side" placeholder='Role'
                                                            onChange={(e) => {
                                                                 setData({ ...data, role: e.target.value })
                                                                 // setRole(e.target.value
                                                                 // )
                                                            }}

                                                       >
                                                            <option value='Hopper'>Hopper</option>
                                                            <option value='MediaHouse'>Publication</option>
                                                            <option value='forAll'>For all</option>
                                                       </Select>
                                                  </div>
                                             </div>
                                             <div className="mdl_inp" flex={1}>
                                                  <Text mb='6px'
                                                       fontSize='13px'
                                                       fontFamily='AirbnbMedium'>
                                                       Category Name
                                                  </Text>
                                                  <Input placeholder="Enter category name" value={data.name} onChange={(e) => {
                                                       setData({ ...data, name: e.target.value })
                                                       // setName(e.target.value)
                                                  }} />
                                             </div>
                                        </Flex>
                                   </div>
                                   <div className="save_btn_wrap">
                                        {/* <Button className="btn_bg" onClick={onClose}>Save</Button> */}
                                        <Button className="btn_bg" onClick={() => isEdit ? editCategory() : ADD()}>Save</Button>
                                        {/* <Button className="btn_bg" onClick={{ }}>Save</Button> */}
                                   </div>
                              </div>
                         </ModalBody>
                    </ModalContent>
               </Modal>
          </>
     )
}

export default TableCard 