

// Chakra imports
import { Box, Flex, Table, Tbody, Td, Text, Th, Thead, Tr, useColorModeValue, TableContainer, Textarea, Select, Button, } from "@chakra-ui/react";
import Card from "components/card/Card";
import share from "assets/img/icons/share.png";
import print from "assets/img/icons/print.png";
import React, { useEffect, useState } from "react";
import publication1 from "assets/img/profile/publication1.svg";
import publication2 from "assets/img/profile/publication2.svg";
import publication3 from "assets/img/profile/publication3.svg";
import watch from "assets/img/icons/watch.svg";
import calendar from "assets/img/icons/calendar.svg";
import celebrity from "assets/img/icons/celebrity.png";
import camera from "assets/img/icons/camera.svg";
import video from "assets/img/icons/video.svg";
import shared from "assets/img/icons/shared.svg";
import content1 from "assets/img/nfts/NftBanner1.png";
import content2 from "assets/img/nfts/Nft1.png";
import content3 from "assets/img/nfts/Nft2.png";
import idimg from "assets/img/icons/id.svg";
import { BsEye, BsArrowLeft } from "react-icons/bs";
import { Get } from "api/admin.services";
import interview from "assets/img/icons/interview.svg";
import { Tooltip } from "@chakra-ui/react";
import { toast } from "react-toastify";
import { useHistory, useParams } from "react-router-dom";
import { Post } from "api/admin.services";
import moment from "moment";
import { Patch } from "api/admin.services";
import ReactPaginate from "react-paginate";
import Loader from "components/Loader";
import Share from "components/share/Share";
import SortFilterHopper from "components/sortfilters/SortFilterHopper";


export default function HopperUploadedContent() {
  const [loading, setloading] = useState(false)
  const history = useHistory()
  const textColor = useColorModeValue("#000", "white");
  const [summary, setSummary] = useState([])
  const [hopperName, setHopperName] = useState("")
  const param = useParams()
  const task_id = JSON.parse(param.task_id)
  const { hopper_id, component } = param
  const [currentPage, setCurrentpage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const perPage = 5;

  const [path, setPath] = useState("");
  const [csv, setCsv] = useState("");
  const [show, setShow] = useState(false);




  // get the details
  const getDetails = async (hopper_id, task_id, page, parametersName, parameters) => {
    const offset = (page - 1) * perPage
    setloading(true)
    try {

      let obj = {
        hopper_id,
        task_id,
        limit: perPage,
        offset: offset,
        [parametersName]: parameters
      }
      await Post(`admin/viewUploadedContent/SummeryHopper/viewdetails`, obj).then((res) => {
        // console.log(res?.data?.data, `response of details`)
        setSummary(res?.data?.data)
        setPath(res?.data?.fullPath)
        const hopper = res?.data?.data[0]?.hopper_id
        setHopperName(hopper)
        setTotalPages(res?.data?.total_count / perPage)
        setloading(false)

      })
    } catch (error) {
      setloading(false)

    }
  }

  const editDetails = async (index) => {
    try {
      const remarks = summary[index].remarks;
      const mode = summary[index].mode;
      if (!remarks || /^\s*$/.test(remarks) || mode === null || mode === undefined || /^\s+/.test(mode)) {
        toast.error("Remarks and mode are required");
        return;
      }
      let obj = {
        mode: mode,
        latestAdminRemark: remarks,
        content_id: summary[index]?._id,
        task_id: summary[index].task_id?._id

      }
      await Patch(`admin/edithopperviewDetailsHistory`, obj);
      toast.success("Updated");
      getDetails(hopper_id, task_id, currentPage);
      setloading(false)

    } catch (error) {
      setloading(false)
    }
  }


  // page change 
  const handlePageChange = (selectedPage) => {
    setCurrentpage(selectedPage.selected + 1)
  }
  useEffect(() => {
    getDetails(hopper_id, task_id, currentPage)

  }, [currentPage])


  const handleClose = () => {
    setShow(!show);
  };


  // download csv
  const DownloadCsv = async (hopper_id, task_id, page) => {
    const offset = (page - 1) * perPage;
    try {

      let obj = {
        hopper_id,
        task_id,
        limit: perPage,
        offset: offset,
      }
      const response = await Post(`admin/viewUploadedContent/SummeryHopper/viewdetails`, obj);
      if (response) {
        const onboardinPrint = response?.data?.fullPath;
        window.open(onboardinPrint);
      }
    } catch (err) {
      // console.log("<---Have an error ->", err);
      setloading(false);
    }
  }

  // sorting
  const [hideShow, setHideShow] = useState({
    status: false,
    type: ""
  })

  const [parameters, setParameters] = useState('')
  const [parametersName, setParametersName] = useState('')

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
    if (hideShow?.type === "uploadContentSummaryDetail") {
      getDetails(hopper_id, task_id, currentPage, parametersName, parameters);
      setParameters('')
      setParametersName('')
      closeSort()

    }
  };

  // Chakra Color Mode
  return (
    <>
      <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
        {loading && <Loader />}
        <div className="back_link">
          <a onClick={() => { window.history.back() }}>
            <BsArrowLeft />
            <span>Back</span>
          </a>
        </div>
        <div className="cstm_brand_txt">
          <Text className="brnd_txt">
            {component}
          </Text>
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
              {`${hopperName?.first_name} ${hopperName?.last_name}`}  ({hopperName?.user_name}) Uploaded content summary detail
            </Text>
            <div className="opt_icons_wrap">
              {/* <RxUpload />
            <TfiPrinter /> */}
              <a
                onClick={() => {
                  setShow(true)
                  setCsv(path)

                }} className="txt_danger_mdm"  >
                <img src={share} className="opt_icons" />
              </a>
              <span onClick={() => DownloadCsv(hopper_id, task_id, currentPage)}>
                <img src={print} className="opt_icons" />
              </span>
              <div className="fltr_btn">
                <Text fontSize={"15px"}>
                  <span onClick={() => setHideShow((prevHideShow) => ({
                    ...prevHideShow,
                    status: true,
                    type: "uploadContentSummaryDetail"
                  }))}>Sort</span>
                </Text>
                {
                  hideShow.type === "uploadContentSummaryDetail" &&
                  <SortFilterHopper hideShow={hideShow}
                    closeSort={closeSort}
                    sendDataToParent={collectSortParms}
                    handleApplySorting={handleApplySorting}
                  />
                }
              </div>
            </div>
          </Flex>
          <TableContainer className="">
            <Table mx="20px" variant='simple' className="common_table">
              <Thead>
                <Tr>
                  <Th>Uploaded content</Th>
                  <Th>Time & date</Th>
                  <Th>Task details</Th>
                  <Th>Type</Th>
                  {/* <Th>License</Th> */}
                  <Th>Category</Th>
                  <Th>Sourced by</Th>
                  <Th>Sale price</Th>
                  <Th>Sale status</Th>
                  <Th>Amount received</Th>
                  <Th>Presshop commission</Th>
                  <Th>Amount paid</Th>
                  <Th>Amount payable</Th>
                  <Th>Received from</Th>


                  {/* <Th>Payment received</Th>
                  <Th>Presshop commission</Th>
                  <Th>Payment made</Th>
                  <Th>Paid to</Th>
                  <Th>Payment made details</Th>
                  <Th>Payment pending</Th>
                  <Th>Payment due date</Th> */}

                  <Th>Mode</Th>
                  <Th>Remarks</Th>
                  <Th>Employee details</Th>
                  <Th>CTA</Th>
                </Tr>
              </Thead>
              <Tbody>

                {
                  summary && summary.map((curr, index) => {
                    return (

                      <Tr key={curr?._id}>
                        <Td className="">
                          <a onClick={() => {
                            history.push(
                              `/admin/live-uploaded-content/${curr?.hopper_id?._id}/${curr?.task_id?._id}/Dashboard`);
                          }}>
                            {curr?.type === "image" ? <img
                              src={process.env.REACT_APP_UPLOADED_CONTENT + curr?.imageAndVideo}
                              className="content_img"
                              alt="Content thumbnail"
                            />
                              : curr?.type === "video" ? <img src={process.env.REACT_APP_UPLOADED_CONTENT + curr?.videothubnail} className="content_img" />
                                : curr?.type === "audio" ? "audio"
                                  : ""}
                          </a>
                        </Td>
                        <Td className="timedate_wrap">
                          <p className="timedate"><img src={watch} className="icn_time" />{moment(curr?.task_id?.createdAt).format(`hh:mm A`)}</p>
                          <p className="timedate"><img src={calendar} className="icn_time" />{moment(curr?.task_id?.createdAt).format(`DD MMMM, YYYY`)}</p>
                        </Td>
                        <Td className="description_td">
                          <Text className="desc_ht" >
                            {curr?.task_id?.task_description}
                          </Text>
                        </Td>
                        <Td className="text_center">
                          {curr?.type === "image" ? <Tooltip label={"Photo"}><img src={camera} alt="Content thumbnail" className="icn m_auto" /></Tooltip>
                            : curr?.type === "video" ? <Tooltip label={"Video"}><img src={video} alt="Content thumbnail" className="icn m_auto" /></Tooltip>
                              : curr?.type === "audio" ? <Tooltip label={"Interview"}><img src={interview} alt="Content thumbnail" className="icn m_auto" /></Tooltip>
                                : ""}
                        </Td>

                        {/* <Td className="">
                          <img src={shared} className="icn m_auto" />
                        </Td>  */}



                        <Td className="text_center">

                          {
                            <Tooltip label={curr?.task_id?.category_id && curr?.task_id?.category_id?.name}>
                              <img src={curr?.task_id?.category_id && curr?.task_id?.category_id?.icon} className="icn m_auto" />
                            </Tooltip>
                          }
                        </Td>
                        <Td className="item_detail"><img src={curr?.task_id?.mediahouse_id?.profile_image} alt="Content thumbnail" />
                          <Text className="nameimg"><span className="txt_mdm">{curr?.task_id?.mediahouse_id?.company_name}</span></Text>
                        </Td>
                        <Td>&pound; {curr?.amount_paid}</Td>
                        <Td className="">
                          {curr?.paid_status === true ? <span className="txt_success_mdm">
                            Sold
                          </span> : <span className="txt_danger_mdm">
                            unsold
                          </span>}

                        </Td>
                        <Td>
                          &pound;{curr?.amount_paid}
                        </Td>
                        <Td>
                          &pound;{curr?.commition_to_payable}
                        </Td>
                        <Td className="txt_wrap">
                          &pound;{curr?.amount_paid_to_hopper}
                        </Td>
                        <Td className="txt_wrap">
                          &pound;{curr?.amount_paid_to_hopper && curr?.amount_paid_to_hopper !== "0" ? "0" : curr?.amount_payable_to_hopper}
                        </Td>

                        <Td className="contact_details">{curr?.purchased_publication?.company_bank_details
                          ?.bank_name}<br /> Sort Code - {curr?.purchased_publication?.company_bank_details
                            ?.sort_code}<br /> Account - {curr?.purchased_publication?.company_bank_details
                              ?.account_number}</Td>

                        <Td className="select_wrap">
                          <Select
                            value={curr?.mode}
                            onChange={(e) => {
                              curr.mode = e.target.value;
                              setSummary((prevItem) => {
                                const UpdatedItem = [...prevItem];
                                UpdatedItem[index] = curr;
                                return UpdatedItem;
                              });
                            }}
                          >
                            <option value='call'>Call</option>
                            <option value='chat'>Chat</option>
                            <option value='email'>Email</option>



                          </Select>
                        </Td>
                        <Td className="remarks_wrap">
                          <Textarea placeholder='Enter remarks if any...'
                            value={curr?.remarks ?? ""}
                            onChange={(e) => {
                              curr.remarks = e.target.value;
                              setSummary((prevItem) => {
                                const UpdatedItem = [...prevItem];
                                UpdatedItem[index] = curr;
                                return UpdatedItem;
                              });
                            }}
                          />
                        </Td>
                        <Td className="timedate_wrap">
                          <p className="timedate">{curr?.admin_id?.name ?? "no remarks"}</p>
                          <p className="timedate"><img src={watch} className="icn_time" />{moment(curr?.updatedAt).format(`hh:mm A`)}</p>
                          <p className="timedate"><img src={calendar} className="icn_time" />{moment(curr?.updatedAt).format(`DD MMM, YYYY`)}</p>
                          <a onClick={() => { history.push(`/admin/uploaded-content-history/${curr?._id}/Manage hoppers`) }} className="timedate"><BsEye className="icn_time" />View history</a>
                        </Td>
                        <Td><Button className="theme_btn tbl_btn" onClick={() => editDetails(index)}>Save</Button></Td>
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
