// Chakra imports
import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Text,
  useColorModeValue,
  Button,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
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
  Select,
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import { Post, Get, Patch, Delete } from "api/admin.services";
import { toast } from "react-toastify";
import moment from "moment";
import writeic from "assets/img/icons/write.svg";
import { GrAttachment } from "react-icons/gr";

import Card from "components/card/Card";
import CommonCard from "./CommonCard";
import Loader from "components/Loader";

export default function CategoryManagement() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isEdit, setIsEdit] = useState(false);
  const textColor = useColorModeValue("#000", "white");
  const [modify, setModify] = useState(false);
  const [categoryName, setCategoryName] = useState([]);
  const [type, setType] = useState("FAQ");
  const [TypeCont, setTypeCont] = useState("content");
  const [data, setData] = useState({ type: TypeCont, name: "", icon: "" });
  const [loading, setLoading] = useState(false)
  const [activeClass, setActiveClass] = useState({
    faq: "active",
    priceTip: "",
    tutorial: "",
    commission: "",
    content: "",
    department: "",
    designation: ""
  })

  const handleUpdate = () => setModify(!modify);

  const handleFileSelect = async (event) => {
    const formData = new FormData();
    formData.append("images", event.target.files[0]);
    formData.append("path", "contentIcons");

    try {
      const res = await Post("admin/upload/data", formData);
      console.log(res, `uploding files`)
      setData((prev) => ({ ...prev, icon: res.data.imgs[0] }));
    } catch (error) {
    }
  };

  const ADD = async () => {
    const formData = new FormData();
    formData.append("type", TypeCont);
    formData.append("name", data.name);
    formData.append("icon", data.icon);

    if (data.icon === undefined) {
      toast.error("Icon is not selected");
    } else if (!data.name || data.name.trim() === "") {
      toast.error("Category name is required");
    } else {
      try {
        await Post("admin/addCategory", formData);
        onClose();
        toast.success("New category successfully added");
        getCategory();
      } catch (error) {
        toast.error(
          error?.response?.data?.errors?.msg ===
            "This Category is Already Added"
            ? "Category already added"
            : ""
        );
      }
    }
  };

  const getCategory = async () => {
    setLoading(true)
    try {
      const res = await Get(`admin/getCategory/${TypeCont}`);
      if (res) {
        setCategoryName(res.data.categories);
        setLoading(false)
      }
    } catch (error) {
      console.log(error);
      setLoading(false)

    }
  };

  const editCategory = async () => {
    data.category_id = data._id;
    try {
      if (!data.name || data.name.trim() === "") {
        toast.error("Category name is required");
      } else {
        await Patch("admin/editCategory", data);
        onClose();
        toast.success("Category is updated");
        getCategory();
      }
    } catch (error) {
      console.log(error, "<-----error");
      setLoading(false)

    }
  };

  const getCategoryById = async (id) => {
    try {
      const res = await Get(`admin/getCategoryById/${id}`);
      setData(res.data.category);
      setIsEdit(true);
      onOpen(true);
    } catch (error) {
      console.log(error);
      setLoading(false)

    }
  };

  const deleteCategory = async (category_id) => {
    try {
      const res = await Delete(`admin/deleteCategory/${category_id}`);
      if (res) {
        toast.error(" Category deleted");
        getCategory();
        handleUpdate();
      }
    } catch (error) {
      toast.error(error?.response?.data?.errors?.msg);
      setLoading(false)

    }
  };

  useEffect(() => {
    getCategory();
  }, [TypeCont]);

  const [updateTime, setUpdateTime] = useState({
    Faq: "",
    priceTip: "",
    tutorial: "",
    content: "",
    department: "",
    designation: "",
  });

  const commonGetFunctionDate = async (type) => {
    const DateData = await Get(`admin/getCategory/${type}`);
    const length = DateData.data.categories.length;
    return DateData.data.categories[0];
  };

  useEffect(() => {
    const fetchData = async () => {
      const Faq = await commonGetFunctionDate("FAQ");
      setUpdateTime((prev) => ({ ...prev, Faq }));

      const priceTip = await commonGetFunctionDate("priceTip");
      setUpdateTime((prev) => ({ ...prev, priceTip }));

      const tutorial = await commonGetFunctionDate("tutorial");
      setUpdateTime((prev) => ({ ...prev, tutorial }));

      const content = await commonGetFunctionDate("content");
      setUpdateTime((prev) => ({ ...prev, content }));

      const department = await commonGetFunctionDate("department");
      setUpdateTime((prev) => ({ ...prev, department }));

      const designation = await commonGetFunctionDate("designation");
      setUpdateTime((prev) => ({ ...prev, designation }));
    };

    fetchData();
  }, [modify]);
  return (
    <>
      {console.log(data.icon, `,------------split`)}
      {loading && <Loader />}

      <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
        <Flex className="cms_tabs_wrap" mb="25px" gap="25px">
          <Tabs>
            <TabList className="tabs_btns genrl_tbs_wrap catgr_tbs" w="375px">
              <Tab
                onClick={() => {
                  setType("FAQ");
                  setActiveClass((pre) => ({
                    faq: "active",
                    priceTip: "",
                    tutorial: "",
                    commission: "",
                    content: "",
                    department: "",
                    designation: ""

                  }))
                }}
              >
                <div className="cms_left_card w_100">
                  <div className="cms_items">
                    <div className={`cms_link ${activeClass.faq}`}>
                      <div className="hding">
                        <p>FAQ tabs</p>
                      </div>
                      <div className="bdy">
                        <span>
                          Updated on{" "}
                          {moment(updateTime?.Faq?.updatedAt).format(
                            "DD MMMM YYYY"
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Tab>
              <Tab
                onClick={() => {
                  setType("priceTip");
                  setActiveClass((pre) => ({
                    faq: "",
                    priceTip: "active",
                    tutorial: "",
                    commission: "",
                    content: "",
                    department: "",
                    designation: ""

                  }))
                }}
              >
                <div className="cms_left_card w_100">
                  <div className="cms_items">
                    <div className={`cms_link ${activeClass.priceTip}`}>
                      <div className="hding">
                        <p>Price tips’ tabs</p>
                      </div>
                      <div className="bdy">
                        <span>
                          Updated on{" "}
                          {moment(updateTime?.priceTip?.updatedAt).format(
                            "DD MMMM YYYY"
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Tab>
              <Tab
                onClick={() => {
                  setType("tutorial")
                  setActiveClass((pre) => ({
                    faq: "",
                    priceTip: "",
                    tutorial: "active",
                    commission: "",
                    content: "",
                    department: "",
                    designation: ""

                  }))

                }}
              >
                <div className="cms_left_card w_100">
                  <div className="cms_items">
                    <div className={`cms_link ${activeClass.tutorial}`}>
                      <div className="hding">
                        <p>Tutorial tabs</p>
                      </div>
                      <div className="bdy">
                        <span>
                          Updated on{" "}
                          {moment(updateTime?.tutorial?.updatedAt).format(
                            "DD MMMM YYYY"
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Tab>
              <Tab
                onClick={() => {
                  setType("commissionstructure")
                  setActiveClass((pre) => ({
                    faq: "",
                    priceTip: "",
                    tutorial: "",
                    commission: "active",
                    content: "",
                    department: "",
                    designation: ""

                  }))

                }}
              >
                <div className="cms_left_card w_100">
                  <div className="cms_items">
                    <div className={`cms_link ${activeClass.commission}`}>
                      <div className="hding">
                        <p>Commission structure tabs</p>
                      </div>
                      <div className="bdy">
                        <span>
                          Updated on{" "}
                          {moment(updateTime?.commissionstructure?.updatedAt).format(
                            "DD MMMM YYYY"
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Tab>
              <Tab
                onClick={() => {
                  setTypeCont("content")
                  setActiveClass((pre) => ({
                    faq: "",
                    priceTip: "",
                    tutorial: "",
                    commission: "",
                    content: "active",
                    department: "",
                    designation: ""

                  }))

                }}
              >
                <div className="cms_left_card w_100">
                  <div className="cms_items">
                    <div className={`cms_link ${activeClass.content}`}>
                      <div className="hding">
                        <p>Content categories</p>
                      </div>
                      <div className="bdy">
                        <span>
                          Updated on{" "}
                          {moment(updateTime?.content?.updatedAt).format(
                            "DD MMMM YYYY"
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Tab>
              <Tab
                onClick={() => {
                  setType("department")

                  setActiveClass((pre) => ({
                    faq: "",
                    priceTip: "",
                    tutorial: "",
                    commission: "",
                    content: "",
                    department: "active",
                    designation: ""
                  }))

                }}
              >
                <div className="cms_left_card w_100">
                  <div className="cms_items">
                    <div className={`cms_link ${activeClass.department}`}>
                      <div className="hding">
                        <p>Departmental categories</p>
                      </div>
                      <div className="bdy">
                        <span>
                          Updated on{" "}
                          {moment(updateTime?.department?.updatedAt).format(
                            "DD MMMM YYYY"
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Tab>
              <Tab
                onClick={() => {
                  setType("designation")
                  setActiveClass((pre) => ({
                    faq: "",
                    priceTip: "",
                    tutorial: "",
                    commission: "",
                    content: "",
                    department: "",
                    designation: "active"
                  }))

                }}
              >
                <div className="cms_left_card w_100">
                  <div className="cms_items">
                    <div className={`cms_link ${activeClass.designation}`}>
                      <div className="hding">
                        <p>Designation categories</p>
                      </div>
                      <div className="bdy">
                        <span>
                          Updated on{" "}
                          {moment(updateTime?.designation?.updatedAt).format(
                            "DD MMMM YYYY"
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Tab>
            </TabList>

            <TabPanels className="cms_tabs_data catg_tbs_card">
              <TabPanel>
                {type && type === "FAQ" && (
                  <CommonCard type={type} update={handleUpdate} />
                )}
              </TabPanel>

              <TabPanel>
                {type && type === "priceTip" && (
                  <CommonCard type={type} update={handleUpdate} />
                )}
              </TabPanel>

              <TabPanel>
                {type && type === "tutorial" && (
                  <CommonCard type={type} update={handleUpdate} />
                )}
              </TabPanel>
              <TabPanel>
                {type && type === "commissionstructure" && (
                  <CommonCard type={type} update={handleUpdate} />
                )}
              </TabPanel>

              {/* Content Categories Start */}
              <TabPanel>
                <Card
                  direction="column"
                  w="625px"
                  px="0px"
                  p="17px"
                  h="737px"
                  overflowX={{ sm: "scroll", lg: "hidden" }}
                >
                  <Flex
                    px="20px"
                    pe="37px"
                    justify="space-between"
                    mb="20px"
                    align="center"
                  >
                    <Text
                      color={textColor}
                      fontSize="22px"
                      // fontWeight='700'
                      lineHeight="100%"
                      fontFamily={"AirbnbBold"}
                    >
                      Content categories (Marketplace)
                    </Text>
                    <div className="opt_icons_wrap">
                      <a
                        onClick={() => {
                          onOpen();
                          setIsEdit(false);
                          setData("");
                          handleUpdate();
                        }}
                        className="txt_danger_mdm"
                      >
                        Add
                      </a>
                    </div>
                  </Flex>
                  <TableContainer className="fix_ht_table">
                    <Table mx="20px" variant="simple" className="common_table">
                      <Thead>
                        <Tr>
                          <Th w="23%">Category icon</Th>
                          <Th w="62%" className="text_center">
                            Category name
                          </Th>
                          <Th w="15%">Action</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {categoryName &&
                          categoryName.map((curr) => {
                            return (
                              <Tr key={curr._id}>
                                <Td className="text_center">
                                  <img
                                    src={curr?.icon}
                                    alt="crime"
                                    className="icn"
                                  />
                                </Td>
                                <Td className="contact_details text_center">
                                  {curr?.name}
                                </Td>
                                <Td w="33.3%">
                                  <div className="catmang_icns">
                                    <a
                                      onClick={() => {
                                        getCategoryById(curr._id);
                                      }}
                                    >
                                      <img
                                        className="icn"
                                        src={writeic}
                                        alt="write"
                                      />
                                    </a>
                                    <AiOutlineDelete
                                      className="icn"
                                      onClick={() => deleteCategory(curr?._id)}
                                    />
                                  </div>
                                </Td>
                              </Tr>
                            );
                          })}
                      </Tbody>
                    </Table>
                  </TableContainer>
                </Card>
              </TabPanel>
              {/* Content Categories End */}

              <TabPanel>
                {type && type === "department" && (
                  <CommonCard type={type} update={handleUpdate} />
                )}
              </TabPanel>

              <TabPanel>
                {type && type === "designation" && (
                  <CommonCard type={type} update={handleUpdate} />
                )}
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Flex>
      </Box>

      <Modal
        className="action_modal_wrap"
        isOpen={isOpen}
        onClose={() => {
          onClose();
          setIsEdit(false);
        }}
        show
      >
        <ModalOverlay />
        <ModalContent className="action_modal_cont catg_modal_cont cont_ctgr_mdl">
          <ModalBody>
            <Text fontFamily="AirbnbBold" fontSize="22px" mb="43px" ms="28px">
              {isEdit ? "Edit" : "Add"} Category
            </Text>
            <div className="action_modal_body">
              <div className="dtl_wrap mdl_itms">
                <Flex
                  className="edit_inputs_wrap"
                  px="0px"
                  justify="space-between"
                  gap="20px"
                  mb="0px"
                  align="center"
                >
                  <div className="mdl_inp">
                    <Text mb="6px" fontSize="13px" fontFamily="AirbnbMedium">
                      Category Icon
                    </Text>
                    <div className="catg_icn_inp">
                      <span className="catg_icn_txt">

                        {data?.icon === undefined || data?.icon === null
                          ? "Upload category icon"
                          : data.icon.split("/").pop()}


                      </span>

                      <Input
                        id="icn_inp"
                        type="file"
                        Value={data?.icon}
                        accept="image/*"
                        onChange={handleFileSelect}
                      />

                      <label htmlFor="icn_inp">
                        <GrAttachment />
                      </label>
                    </div>
                  </div>

                  <div className="mdl_inp">
                    <Text mb="6px" fontSize="13px" fontFamily="AirbnbMedium">
                      Category Name
                    </Text>
                    <Input
                      placeholder="Enter category name"
                      value={data?.name}
                      onChange={(e) => {
                        setData({ ...data, name: e.target.value });
                      }}
                    />
                  </div>
                </Flex>
              </div>
              <div className="save_btn_wrap">
                <Button
                  className="btn_bg"
                  onClick={() => {
                    handleUpdate();
                    isEdit ? editCategory() : ADD();
                  }}
                >
                  Save
                </Button>
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
