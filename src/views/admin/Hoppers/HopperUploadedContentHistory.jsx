// Chakra imports
import { Box, Flex, Table, Tbody, Td, Text, Th, Thead, Tr, useColorModeValue, TableContainer, Checkbox, Textarea, Select, Button, } from "@chakra-ui/react";
import Card from "components/card/Card";
import { React, useEffect, useState } from "react";
import watch from "assets/img/icons/watch.svg";
import calendar from "assets/img/icons/calendar.svg";
import share from "assets/img/icons/share.png";
import print from "assets/img/icons/print.png";
import avt1 from "assets/img/avatars/avt1.png";
import { useParams } from "react-router-dom";
import { Get } from "api/admin.services";
import moment from "moment";
import ReactPaginate from "react-paginate";
import Share from "components/share/Share";
import SortFilterHopper from "components/sortfilters/SortFilterHopper";
import { BsArrowLeft } from "react-icons/bs";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function HopperUploadedContentHistory() {
  const [currentPage, setCurrentPage] = useState(1);
  const history = useHistory();
  const [totalPages, setTotalPages] = useState(0);
  const perPage = 5;

  const [path, setPath] = useState("");
  const [csv, setCsv] = useState("");
  const [show, setShow] = useState(false);

  const { id, component } = useParams();
  const textColor = useColorModeValue("#000", "white");
  const [uploadContentHistory, setUploadContentHistory] = useState([]);

  const GetHistory = async (id, page, parametersName, parameters) => {
    const offset = (page - 1) * perPage;
    try {
      await Get(`admin/view/uploaded/content/summery/hopper/history?hopper_id=${id}&offset=${offset}&limit=${perPage}&${parametersName}=${parameters}`).then((res) => {
        setPath(res.data?.fullPath)
        setUploadContentHistory(res.data?.data);
        setTotalPages(Math.ceil(res?.data.total_count / perPage));
      });
    } catch (error) {
      // Handle error
    }
  };

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected + 1);
  };


  // Download the csv file
  const downloadCsv = async (id, page) => {
    const offset = (page - 1) * perPage;
    try {
      const response = await Get(`admin/view/uploaded/content/summery/hopper/history?hopper_id=${id}&offset=${offset}&limit=${perPage}`);
      if (response) {
        const onboardinPrint = response?.data?.fullPath;
        window.open(onboardinPrint);
      }
    } catch (err) {
      console.log("<---Have an error ->", err);
    }
  }

  const handleClose = () => {
    setShow(!show);
  };

  useEffect(() => {
    GetHistory(id, currentPage);
  }, [currentPage]);


  // sorting
  const [parameters, setParameters] = useState('')
  const [parametersName, setParametersName] = useState('')
  const [hideShow, setHideShow] = useState({
    status: false,
    type: ""
  })

  const closeSort = () => {
    setHideShow((prevHideShow) => ({
      ...prevHideShow,
      status: false,
      type: ""
    }));
  };

  const collectSortParms = (name, order) => {
    setParameters(order)
    setParametersName(name)
  }

  const handleApplySorting = () => {
    GetHistory(id, currentPage, parametersName, parameters);
    setParameters('')
    setParametersName('')
    closeSort()

  };




  return (
    <>

      <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
        <div className="cstm_brand_txt">
          <Text className="brnd_txt">
            {component}
          </Text>
        </div>



        <div className="back_link">
          <a onClick={() => { window.history.back() }}>
            <BsArrowLeft />
            <span>Back</span>
          </a>
        </div>
        <Card
          direction='column'
          w='100%'
          px='0px'
          mb='24px'
          overflowX={{ sm: "scroll", lg: "hidden" }}>
          <Flex px='25px' justify='space-between' mb='10px' align='center'>
            <Text
              color={textColor}
              fontSize='22px'
              fontWeight='700'
              lineHeight='100%'
              fontFamily={"AirbnbBold"}>
              Uploaded Content Summary / History
            </Text>
            <div className="opt_icons_wrap">
              {/* <RxUpload />
            <TfiPrinter /> */}
              <a
                onClick={() => {
                  setShow(true)
                  setCsv(path)
                }}
                className="txt_danger_mdm"
              >
                <img src={share} className="opt_icons" />
              </a>
              <span onClick={() => downloadCsv(id, currentPage)}><img src={print} className="opt_icons" /></span>
              <div className="fltr_btn">
                <Text fontSize={"15px"}>
                  <span onClick={() => setHideShow((prevHideShow) => ({
                    ...prevHideShow,
                    status: true,
                    type: "uploadedContentSummary"
                  }))}>Sort</span>
                </Text>

                {
                  hideShow.type === "uploadedContentSummary" &&
                  <SortFilterHopper hideShow={hideShow}
                    closeSort={closeSort}
                    sendDataToParent={collectSortParms}
                    handleApplySorting={handleApplySorting}
                  />
                }
                {/* <SortFilterDashboard /> */}
              </div>
              {/* <Menu /> */}
            </div>
          </Flex>
          <TableContainer className="fix_ht_table">
            <Table variant='simple' className="common_table" mx="20px">
              <Thead>
                <Tr>
                  <Th>Time & date</Th>
                  <Th>Employee name</Th>
                  <Th>Hopper details</Th>
                  <Th>Tasks accepted</Th>
                  <Th >Uploaded content (Qty)</Th>
                  <Th>Uploaded content (Value)</Th>
                  <Th>Total amount Paid</Th>
                  <Th>Total amount payable</Th>
                  {/* <Th>Payment due date</Th> */}
                  <Th>Presshop commission</Th>
                  <Th>Mode</Th>
                  <Th>Remarks</Th>
                </Tr>
              </Thead>
              <Tbody>
                {
                  uploadContentHistory && uploadContentHistory.map((curr) => {
                    return (
                      <Tr>
                        <Td className="timedate_wrap">
                          <p className="timedate"><img src={watch} className="icn_time" /> {moment(curr?.latestAdminUpdated).format('hh:mm:A')}</p>
                          <p className="timedate"><img src={calendar} className="icn_time" />{moment(curr?.latestAdminUpdated).format('DD MMMM YYYY')}</p>
                        </Td>
                        <Td>{curr?.admin_id?.name}</Td>
                        <Td className="item_detail"><img src={process.env.REACT_APP_HOPPER_AVATAR + curr?.hopper_id?.avatar_id?.avatar} alt="Content thumbnail" />
                          <Text className="nameimg"><span className="txt_mdm">{`${curr?.hopper_id?.first_name} ${curr?.hopper_id?.last_name}`}</span><br />
                            <span >({curr?.hopper_id?.user_name})</span></Text>
                        </Td>
                        <Td>
                          {curr?.Tasksaccepted}
                        </Td>
                        <Td>
                          {curr?.UploadedcontentQty}
                        </Td>
                        <Td>&pound; {curr?.UploadedcontentValue}</Td>
                        <Td className="">
                          &pound; 9,20
                        </Td>
                        <Td>
                          &pound; 0
                        </Td>
                        <Td className="txt_wrap">
                          &pound; 2,300
                        </Td>

                        <Td className="select_wrap">
                          <Select placeholder='Chat' value={curr?.mode}>
                            <option value='chat'>Chat</option>
                            <option value='call'>Call</option>

                          </Select>
                        </Td>
                        <Td className="conversation-td">
                          <div className="conversation-details">
                            <p>{curr?.remarks}                    </p>
                          </div>
                        </Td>
                      </Tr>
                    )
                  })
                }

              </Tbody>
            </Table>
          </TableContainer>
          <ReactPaginate

            className="paginated"
            breakLabel="..."
            nextLabel=">"
            onPageChange={handlePageChange}
            pageRangeDisplayed={5}
            pageCount={totalPages}
            previousLabel="<"
            renderOnZeroPageCount={null}



          />
        </Card>
      </Box>
      <Share show={show} csv={csv} update={handleClose} />
    </>

  );
}
