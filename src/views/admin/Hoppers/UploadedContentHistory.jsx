
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
import exclusive from "assets/img/icons/crown.png";
import crime from "assets/img/icons/crime.svg";
import business from "assets/img/icons/business.svg";
import political from "assets/img/icons/political.svg";
// import video from "assets/img/icons/video.svg";
import { BsEye, BsArrowLeft } from "react-icons/bs";
import { Tooltip } from "@chakra-ui/react";
import ReactPaginate from "react-paginate";
import Share from "components/share/Share";


import interview from "assets/img/icons/interview.svg";


import { useHistory, useParams } from "react-router-dom";
import { Get } from "api/admin.services";
import moment from "moment";
import Loader from "components/Loader";
import SortFilterHopper from "components/sortfilters/SortFilterHopper";
export default function UploadedContentHistory() {
  const history = useHistory()
  const textColor = useColorModeValue("#000", "white");
  const { id, component } = useParams();
  const [details, setDetails] = useState([])
  const [currentPage, setCurrentpage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const perPage = 5;
  const [hopperName, setHopperName] = useState("")
  const [loading, setloading] = useState(false)
  const [path, setPath] = useState("");
  const [csv, setCsv] = useState("");
  const [show, setShow] = useState(false);

  const getHistory = async (content_id, page, parametersName, parameters) => {
    const offset = (page - 1) * perPage
    setloading(true)
    try {
      await Get(`admin/viewUploadedContent/SummeryHopperHistory/viewdetails?content_id=${content_id}&limit=${perPage}&offset=${offset}&${parametersName}=${parameters}`).then((res) => {
        setDetails(res?.data?.data)
        setTotalPages(res?.data?.total_count / perPage)
        setPath(res?.data?.fullPath)
        const hopper = res?.data?.data[0]?.content_id?.hopper_id
        setHopperName(hopper)
        setloading(false)
      })

    } catch (error) {
      // console.log(error, `<------errro`)
      setloading(false)
    }
  }

  const handlePageChange = (selectedPage) => {
    setCurrentpage(selectedPage.selected + 1)
  }

  useEffect(() => {
    getHistory(id, currentPage)
  }, [currentPage])


  const handleClose = () => {
    setShow(!show);
  };


  // download csv
  const DownloadCsv = async (content_id, page) => {
    const offset = (page - 1) * perPage;
    try {

      const response = await Get(`admin/viewUploadedContent/SummeryHopperHistory/viewdetails?content_id=${content_id}&limit=${perPage}&offset=${offset}`);
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
    if (hideShow?.type === "uploadDetailContentHistory") {
      getHistory(id, currentPage, parametersName, parameters);
      setParameters('')
      setParametersName('')
      closeSort()

    }
  };




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
              {/* ritesh Shah (Silverfox) Uploaded Content Summary Details / History */}
              {`${hopperName?.first_name} ${hopperName?.last_name}`} ({hopperName?.user_name}) Uploaded Content Summary Details / History
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
              <span onClick={() => DownloadCsv(id, currentPage)}>
                <img src={print} className="opt_icons" />
              </span>

              <div className="fltr_btn">
                <Text fontSize={"15px"}>
                  <span onClick={() => setHideShow((prevHideShow) => ({
                    ...prevHideShow,
                    status: true,
                    type: "uploadDetailContentHistory"
                  }))}>Sort</span>
                </Text>
                {
                  hideShow.type === "uploadDetailContentHistory" &&
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
                  <Th>Time & date</Th>
                  <Th>Employee name</Th>
                  <Th>Uploaded Content</Th>
                  <Th>Description</Th>
                  <Th>Type</Th>
                  {/* <Th>License</Th> */}
                  <Th>Category</Th>
                  <Th>Purchased by</Th>
                  <Th>Sale price</Th>
                  <Th>Sale status</Th>
                  <Th>Amount Received</Th>
                  <Th>Presshop commission</Th>
                  <Th>Amount paid</Th>
                  <Th>Amount payable</Th>
                  <Th>Received from</Th>
                  <Th>Mode</Th>
                  <Th>Remarks</Th>
                </Tr>
              </Thead>
              <Tbody>

                {
                  details && details.map((curr) => {
                    return (
                      <Tr>
                        <Td className="timedate_wrap">
                          <p className="timedate"><img src={watch} className="icn_time" />{moment(curr?.updatedAt).format(`hh:mm A`)}</p>
                          <p className="timedate"><img src={calendar} className="icn_time" />{moment(curr?.updatedAt).format(`DD MMMM YYYY`)}</p>
                        </Td>
                        <Td >
                          {curr?.admin_id?.name}
                        </Td>
                        <Td className="">
                          <a onClick={() => {
                            history.push(
                              `/admin/live-uploaded-content/${curr?.content_id?.hopper_id?._id}/${curr?.task_id?._id}/Dashboard`);
                          }}>

                            {curr?.content_id?.type === "image" ? <img
                              src={process.env.REACT_APP_UPLOADED_CONTENT + curr?.content_id?.imageAndVideo}
                              className="content_img"
                              alt="Content thumbnail"
                            />
                              : curr?.content_id?.type === "video" ? <img src={process.env.REACT_APP_UPLOADED_CONTENT + curr?.content_id?.videothubnail} className="content_img" />
                                : curr?.content_id?.type === "audio" ? "audio"
                                  : ""}
                          </a>
                        </Td>
                        <Td className="description_td">
                          <Text className="desc_ht">
                            {curr?.task_id?.task_description}
                          </Text>
                        </Td>
                        <Td className="text_center">
                          {curr?.content_id?.type === "image" ? <img src={camera} alt="Content thumbnail" className="icn m_auto" />
                            : curr?.content_id?.type === "video" ? <img src={video} alt="Content thumbnail" className="icn m_auto" />
                              : curr?.content_id?.type === "audio" ? <img src={interview} alt="Content thumbnail" className="icn m_auto" />
                                : ""}
                        </Td>

                        <Td className="text_center">
                          {<Tooltip label={curr?.task_id?.category_id && curr?.task_id?.category_id?.name}>
                            <img src={curr?.task_id?.category_id && curr?.task_id?.category_id?.icon} className="icn m_auto" />
                          </Tooltip>}
                        </Td>
                        <Td className="item_detail"><img src={curr?.task_id?.mediahouse_id?.profile_image} alt="Content thumbnail" />
                          <Text className="nameimg"><span className="txt_mdm">{curr?.task_id?.mediahouse_id?.company_name}</span></Text>
                        </Td>
                        <Td>&pound; {curr?.content_id.amount_paid}</Td>
                        <Td className="">
                          {curr?.content_id.paid_status === true ? <span className="txt_success_mdm">
                            Sold
                          </span> : <span className="txt_danger_mdm">
                            unsold
                          </span>}

                        </Td>
                        <Td>
                          &pound;{curr?.content_id?.amount_paid}
                        </Td>
                        <Td>
                          &pound;{curr?.content_id?.commition_to_payable}
                        </Td>
                        <Td className="txt_wrap">
                          &pound;{curr?.content_id?.amount_paid_to_hopper}
                        </Td>
                        <Td className="txt_wrap">
                          &pound;{curr?.content_id.amount_paid_to_hopper && curr?.amount_paid_to_hopper !== "0" ? "0" : curr?.amount_payable_to_hopper}
                        </Td>

                        <Td className="contact_details">{curr?.content_id.purchased_publication?.company_bank_details
                          ?.bank_name}<br /> Sort Code - {curr?.content_id.purchased_publication?.company_bank_details
                            ?.sort_code}<br /> Account - {curr?.content_id.purchased_publication?.company_bank_details
                              ?.account_number}</Td>
                        <Td className="select_wrap">
                          <Select defaultValue={curr?.mode} disabled>
                            <option value='call'>Call</option>
                            <option value='chat'>Chat</option>
                            <option value='email'>Email</option>
                          </Select>
                        </Td>
                        <Td className="conversation-td">
                          <div className="conversation-details">
                            <p>{curr?.remarks}
                            </p>
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
