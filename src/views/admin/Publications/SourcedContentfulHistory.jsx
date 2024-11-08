

// Chakra imports
import { Box, Flex, Table, Tbody, Td, Text, Th, Thead, Tr, useColorModeValue, TableContainer, Textarea, Select, Button, Tooltip, } from "@chakra-ui/react";
import Card from "components/card/Card";
import share from "assets/img/icons/share.png";
import print from "assets/img/icons/print.png";
import React, { useEffect, useState } from "react";
import watch from "assets/img/icons/watch.svg";
import calendar from "assets/img/icons/calendar.svg";
import camera from "assets/img/icons/camera.svg";
import video from "assets/img/icons/video.svg";
import shared from "assets/img/icons/shared.svg";
import content1 from "assets/img/nfts/NftBanner1.png";
import content2 from "assets/img/nfts/Nft1.png";
import content3 from "assets/img/nfts/Nft2.png";
import idimg from "assets/img/icons/id.svg";
import { BsEye, BsArrowLeft } from "react-icons/bs";
import { useHistory, useParams } from "react-router-dom";
import exclusive from "assets/img/icons/crown.png";
import crime from "assets/img/icons/crime.svg";
import political from "assets/img/icons/political.svg";
import business from "assets/img/icons/business.svg";
import fashion from "assets/img/icons/Fashion.svg";
import avt1 from "assets/img/avatars/avt1.png";
import avt2 from "assets/img/avatars/avt2.png";
import { Post } from "api/admin.services";
import moment from "moment";
import interview from "assets/img/icons/interview.svg";
import { Patch } from "api/admin.services";
import { toast } from "react-toastify";
import ReactPaginate from "react-paginate";
import { Get } from "api/admin.services";
import Loader from "components/Loader";
import Share from "components/share/Share";
import SortFilterPublication from "components/sortfilters/SortFilterPublication";
// import camera from "assets/img/icons/camera.svg";
export default function SourcedContentful() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0)
  const perPage = 5;
  const [company, setCompany] = useState("")
  const [loading, setloading] = useState(false)
  const history = useHistory()
  const textColor = useColorModeValue("#000", "white");
  const [details, setDetails] = useState([])
  const [path, setpath] = useState("")
  const [show, setShow] = useState(false)
  const [csv, setCsv] = useState("")
  const { id } = useParams()

  const getDetails = async (id, page, parametersName, parameters) => {
    const offset = (page - 1) * perPage
    setloading(true)
    try {
      await Get(`admin/viewSourcedContent/SummeryPublication/viewdetailsHistory?content_id=${id}&limit=${perPage}&offset=${offset}&${parametersName}=${parameters}`).then((res) => {
        // console.log(res, `<----ress`)
        setDetails(res?.data?.data);
        const company = res?.data?.data?.[0]?.content_id?.purchased_publication?.company_name ?? '';
        setCompany(company);
        setpath(res?.data?.fullPath)
        setTotalPages(res?.data?.total_count / perPage)
        setloading(false)
      })
    } catch (error) {
      setloading(false)
    }
  }
  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected + 1)
  }
  const DownloadCsv = async (id, page) => {
    const offset = (page - 1) * perPage;
    try {
      const response = await Get(`admin/viewSourcedContent/SummeryPublication/viewdetailsHistory?content_id=${id}&limit=${perPage}&offset=${offset}`,);
      if (response) {
        const onboardinPrint = response?.data?.fullPath;
        window.open(onboardinPrint);
      }
    } catch (err) {
      // console.log("<---Have an error ->", err);
      setloading(false);
    }
  }

  useEffect(() => {
    getDetails(id, currentPage)
  }, [currentPage])


  const handleClose = () => {
    setShow(!show)
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
    if (hideShow?.type === "sourcedContentHistory") {
      getDetails(id, currentPage, parametersName, parameters);
      setParameters('')
      setParametersName('')
    }
    closeSort()
  };

  return (
    <>
      {loading && <Loader />}


      <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
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
          <Flex px='20px' justify='space-between' mb='10px' align='center'>
            <Text
              color={textColor}
              fontSize='22px'
              fontWeight='700'
              lineHeight='100%'
              fontFamily={"AirbnbBold"}>
              {company} Sourced Content Summary / History
            </Text>
            <div className="opt_icons_wrap">
              <a onClick={() => {
                setShow(true)
                setCsv(path)
              }}
                className="txt_danger_mdm"
              >
                <img src={share} className="opt_icons" />
              </a>              <span onClick={() => DownloadCsv(id, currentPage)}>
                <img src={print} className="opt_icons" />

              </span>
              <div className="fltr_btn">
                <Text fontSize={"15px"}>
                  <span onClick={() => setHideShow((prevHideShow) => ({
                    ...prevHideShow,
                    status: true,
                    type: "sourcedContentHistory"
                  }))}>Sort</span>
                </Text>
                {
                  hideShow.type === "sourcedContentHistory" &&
                  <SortFilterPublication hideShow={hideShow}
                    closeSort={closeSort}
                    sendDataToParent={collectSortParms}
                    handleApplySorting={handleApplySorting}
                  />
                }
              </div>
            </div>
          </Flex>
          <TableContainer>
            <Table mx="20px" variant='simple' className="common_table">
              <Thead>
                <Tr>
                  <Th>Time & date</Th>
                  <Th>Employee name</Th>
                  <Th className="cntnt_srcd_th">Content sourced from tasks</Th>
                  <Th>Task details</Th>
                  <Th>Type</Th>
                  <Th>Category</Th>
                  <Th>Published by</Th>
                  <Th>Sale price</Th>
                  <Th>Sale status</Th>
                  <Th>Amount received</Th>
                  <Th>Presshop commission</Th>
                  <Th>Amount paid</Th>
                  <Th>Amount payable</Th>
                  <Th>Received from</Th>
                  {/* <Th>Payment received details</Th> */}
                  <Th>Mode</Th>
                  <Th>Remarks</Th>
                </Tr>
              </Thead>
              <Tbody>
                {details && details.map((curr) => {
                  return (
                    <Tr key={curr?._id}>
                      <Td className="timedate_wrap">
                        <p className="timedate"><img src={watch} className="icn_time" />{moment(curr?.createdAt).format(`hh:mm A`)}</p>
                        <p className="timedate"><img src={calendar} className="icn_time" />{moment(curr?.createdAt).format(`DD MMMM, YYYY`)}</p>
                      </Td>
                      <Td >{curr?.admin_id?.name}</Td>
                      <Td className="">
                        <a onClick={() => {
                          history.push(
                            `/admin/live-uploaded-content/${curr?.content_id?.hopper_id?._id}/${curr?.content_id?.task_id?._id}/Dashboard`);
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
                        {curr?.content_id?.task_id?.task_description}
                      </Td>
                      <Td className="text_center">
                        {curr?.content_id?.type === "image" ? <img src={camera} alt="Content thumbnail" className="icn m_auto" />
                          : curr?.content_id?.type === "video" ? <img src={video} alt="Content thumbnail" className="icn m_auto" />
                            : curr?.content_id?.type === "audio" ? <img src={interview} alt="Content thumbnail" className="icn m_auto" />
                              : ""}
                      </Td>
                      <Td className="text_center">
                        {
                          <Tooltip label={curr?.content_id?.task_id?.category_id?.name}>
                            <img src={curr?.content_id?.task_id?.category_id?.icon} className="icn m_auto" />
                          </Tooltip>
                        }
                      </Td>
                      <Td className="item_detail"><img src={process.env.REACT_APP_HOPPER_AVATAR + curr?.content_id?.hopper_id?.avatar_id?.avatar} alt="Content thumbnail" />
                        <Text className="nameimg"><span className="txt_mdm">{`${curr?.content_id?.hopper_id?.first_name} ${curr?.content_id?.hopper_id?.last_name}`}
                        </span><br />
                          <span>({curr?.content_id?.hopper_id?.user_name})</span></Text>
                      </Td>
                      <Td>&pound; {curr?.content_id?.amount_paid}</Td>
                      <Td className="">
                        <span className="txt_success_mdm">
                          {curr?.content_id?.paid_status === true ? "sold" : "unsold"}
                        </span>
                      </Td>
                      <Td>
                        &pound; {curr?.content_id?.amount_paid}
                      </Td>
                      <Td>
                        &pound; {curr?.content_id?.commition_to_payable}
                      </Td>
                      <Td>
                        &pound; {curr?.content_id?.amount_paid_to_hopper}
                      </Td>
                      <Td>
                        &pound; {curr?.content_id?.amount_paid && curr?.content_id?.amount_paid !== "0" ? "0" : curr?.content_id?.amount_payable_to_hopper}
                      </Td>

                      <Td className="contact_details">{curr?.content_id?.purchased_publication?.company_bank_details?.bank_name}<br /> Sort Code - {curr?.content_id?.purchased_publication?.company_bank_details?.sort_code}<br /> Account - {curr?.content_id?.purchased_publication?.company_bank_details?.account_number}</Td>
                      {/* <Td className="timedate_wrap">
                        <p className="timedate"><img src={idimg} className="icn_time" />ID- 782319</p>
                        <p className="timedate"><img src={calendar} className="icn_time" />INV- 628192</p>
                        <p className="timedate"><img src={watch} className="icn_time" />10:25 AM</p>
                        <a href="" className="timedate"><BsEye className="icn_time" />View</a>
                      </Td> */}
                      <Td className="select_wrap">
                        <Select defaultValue={curr?.mode}
                        >
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
