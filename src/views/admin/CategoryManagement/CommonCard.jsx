import { Box } from "@chakra-ui/react";
import { React, useState, useEffect } from "react";
import {
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
import Card from "components/card/Card";
import { useHistory } from "react-router-dom";
import writeic from "assets/img/icons/write.svg";
import { AiOutlineDelete } from "react-icons/ai";
import { Post, Get, Patch, Delete } from "api/admin.services";
import { toast } from "react-toastify";
import Loader from "components/Loader";

export default function CommonCard(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isEdit, setIsEdit] = useState(false);
  const history = useHistory();
  const type = props.type;
  const [data, setData] = useState({ type, name: "" });
  const [categoryName, setCategoryName] = useState([]);
  const textColor = useColorModeValue("#000", "white");
  const [loading, setLoading] = useState(false)

  const ADD = async () => {
    if (!data?.name || data?.name.trim() === "") {
      toast.error("Category name is required");
    } else {
      try {
        await Post("admin/addCategory", { type, name: data.name });
        onClose();
        toast.success("Category is added successfully");
        getCategory();
      } catch (error) {
        toast.error(
          error?.response?.data?.errors?.msg === "This Category is Already Added"
            ? "Category Already Added"
            : ""
        );
      }
    }
  };

  const getCategory = async () => {
    setLoading(true)
    try {
      const res = await Get(`admin/getCategory/${type}`);
      setCategoryName(res.data.categories);
      setLoading(false)
    } catch (er) {
      setLoading(false)

    }
  };

  const getCategoryById = async (type) => {
    try {
      const res = await Get(`admin/getCategoryById/${type._id}`);
      setData(res.data.category);
      setIsEdit(true);
      onOpen(true);
    } catch (er) {
      setLoading(false)

    }
  };

  const editCategory = async () => {
    data.category_id = data._id;
    if (!data?.name || data?.name.trim() === "") {
      toast.error("Required");
    } else {
      try {
        await Patch(`admin/editCategory`, data);
        toast.success("Category is edited");
        onClose();
        getCategory();
      } catch (err) {
        toast.error(err?.response?.data?.errors?.msg)
        setLoading(false)
      }
    }
  };

  const deleteCategory = async (category_id) => {
    try {
      await Delete(`admin/deleteCategory/${category_id}`);
      toast.error("Category deleted");
      getCategory();
      props.update();
    } catch (err) {

      toast.error(
        err?.response?.data?.errors?.msg === "This Avatar is taken by some users"
          ? "Already Taken"
          : ""
      );
      setLoading(false)
    }
  };

  useEffect(() => {
    getCategory();
  }, [type]);


  return (
    <>
      {loading && <Loader />}
      <Flex className="cms_tabs_wrap" mb="25px" gap="25px">
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
              fontFamily="AirbnbBold"
            >
              {type === "FAQ"
                ? "FAQ tabs (App)"
                : type === "priceTip"
                  ? "Price tip's tabs"
                  : type === "tutorial"
                    ? "Tutorial tabs (App)"
                    : type === "commissionstructure"
                      ? "Commission structure tabs"
                      : type === "content"
                        ? "Content Categories"
                        : type === "department"
                          ? "Departmental categories (Marketplace)"
                          : "Designation categories (Marketplace)"}
            </Text>

            <div className="opt_icons_wrap">
              <a
                onClick={() => {
                  onOpen();
                  setIsEdit(false);
                  setData("");
                  props.update();
                }}
                className="txt_danger_mdm">
                Add
              </a>
            </div>
          </Flex>

          <TableContainer className="fix_ht_table">
            <Table mx="20px" w="93%" variant="simple" className="common_table">
              <Thead>
                <Tr>
                  <Th w="90%">Tab name</Th>
                  <Th w="10%">Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {categoryName &&
                  categoryName.map((value) => (
                    <Tr key={value._id}>
                      <Td w="43.3%" className="contact_details">
                        {value.name}
                      </Td>
                      <Td w="33.3%">
                        <div className="catmang_icns">
                          <a
                            onClick={() => {
                              getCategoryById(value);
                            }}
                          >
                            <img className="icn" src={writeic} alt="write" />
                          </a>
                          <AiOutlineDelete
                            className="icn"
                            onClick={() => deleteCategory(value._id)}
                          />
                        </div>
                      </Td>
                    </Tr>
                  ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Card>
      </Flex>


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
        <ModalContent className="action_modal_cont catg_modal_cont">
          <ModalBody>
            <Text
              fontFamily="AirbnbBold"
              fontSize="22px"
              mb="43px"
              fontWeight="bold"
              ms="28px"
            >
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
                      Category Name
                    </Text>
                    <Input
                      placeholder="Enter category name"
                      value={data.name}
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
                    props.update();
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
