

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
import idimg from "assets/img/icons/id.svg";
import { BsEye, BsArrowLeft } from "react-icons/bs";
import { useHistory, useParams } from "react-router-dom";
import { Post } from "api/admin.services";
import moment from "moment";
import interview from "assets/img/icons/interview.svg";
import { Patch } from "api/admin.services";
import { toast } from "react-toastify";
import ReactPaginate from "react-paginate";
import Loader from "components/Loader";
import Share from "components/share/Share";
import SortFilterPublication from "components/sortfilters/SortFilterPublication";

export default function SourcedContentful() {
  const [params, setParams] = useState({ parameters: "", parametersName: "", parameters1: "", parametersName1: "" })
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0)
  const perPage = 5;
  const history = useHistory()
  const textColor = useColorModeValue("#000", "white");
  const [details, setDetails] = useState([])
  const [loading, setloading] = useState(false)
  const [company, setCompany] = useState("")
  const [path, setPath] = useState("");
  const [csv, setCsv] = useState("");
  const [show, setShow] = useState(false);
  const param = useParams()
  const id = JSON.parse(param.task_id)


  const getDetails = async (task_id, page, parametersName, parameters, parametersName1, parameters1) => {
    const offset = (page - 1) * perPage
    setloading(true)
    let obj = {
      task_id: task_id,
      offset: offset,
      limit: perPage,
      [parametersName]: parameters,
      [parametersName1]: parameters1

    }
    try {
      await Post(`admin/viewSourcedContent/SummeryPublication/viewdetails`, obj).then((res) => {
        setDetails(res?.data?.data)
        setPath(res?.data?.fullPath)
        const company = res?.data?.data?.[0]?.purchased_publication?.company_name ?? '';
        setCompany(company);
        setTotalPages(res?.data?.total_count / perPage)
        setloading(false)
      })
    } catch (error) { setloading(false) }
  }

  const Edit = async (index) => {
    try {
      const remarks = details[index].remarks;
      const mode = details[index].mode;
      if (!remarks || /^\s*$/.test(remarks) || mode === null || mode === undefined || /^\s+/.test(mode)) {
        toast.error("Remarks and mode are required");
        return;
      }
      let obj = {
        mode: mode,
        latestAdminRemark: remarks,
        content_id: details[index]?._id
      }
      await Patch(`admin/editSourcedPublicaation/viewDetails`, obj);
      toast.success("Updated");
      getDetails(id, currentPage);
    } catch (error) { setloading(false) }

  }
  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected + 1)
  }

  const DownloadCsv = async (task_id, page) => {
    const offset = (page - 1) * perPage;
    try {
      const response = await Post(`admin/viewSourcedContent/SummeryPublication/viewdetails`, { task_id, limit: perPage, offset });
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
    setShow(!show);
  };

  // sorting
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
    setParams((prev) => ({
      ...prev,
      parameters: order,
      parametersName: name

    }))
  }
  const collectSortParms1 = (name, order) => {
    setParams((prev) => ({
      ...prev,
      parameters1: order,
      parametersName1: name

    }))
  }

  const { parameters, parametersName, parameters1, parametersName1 } = params


  const handleApplySorting = () => {
    if (hideShow?.type === "sourcedContent") {
      getDetails(id, currentPage, parametersName, parameters, parametersName1, parameters1);
      setParams({
        parameters: "",
        parametersName: "",
        parameters1: "",
        parametersName1: ""
      })
      closeSort()
    }
  };

  // comma seprator
  const formatAmountInMillion = (amount) =>
    amount?.toLocaleString('en-US', {
      maximumFractionDigits: 2,
    });

  return (
    <>{loading && <Loader />}
      <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
        <div className="cstm_brand_txt">
          <Text className="brnd_txt">
            {param?.component}
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
          <Flex px='20px' justify='space-between' mb='10px' align='center'>
            <Text
              color={textColor}
              fontSize='22px'
              fontWeight='700'
              lineHeight='100%'
              fontFamily={"AirbnbBold"}>
              {company} (Sourced Content Summary)
            </Text>
            <div className="opt_icons_wrap">
              <a
                onClick={() => {
                  setShow(true)
                  setCsv(path)
                }}
                className="txt_danger_mdm"
              >
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
                    type: "sourcedContent"
                  }))}>Sort</span>
                </Text>
                {
                  hideShow.type === "sourcedContent" &&
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
                  <Th className="cntnt_srcd_th">Content sourced from tasks</Th>
                  <Th>Time & date</Th>
                  <Th>Task details</Th>
                  <Th>Type</Th>
                  {/* <Th>License</Th> */}
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
                  <Th>Employee details</Th>
                  <Th>CTA</Th>
                </Tr>
              </Thead>
              <Tbody>
                {details && details.map((curr, index) => {
                  return (

                    <Tr key={curr?._id}>
                      <Td className="">
                        <a onClick={() => {
                          history.push(
                            `/admin/live-uploaded-content/${curr?.hopper_id?._id}/${curr?.task_id?._id}/Sourced Content Summary`);
                        }}>

                          {curr?.type === "image" ? <img
                            src={curr?.videothubnail || process.env.REACT_APP_UPLOADED_CONTENT + curr?.imageAndVideo}
                            className="content_img"
                            alt="Content thumbnail"
                          />
                            : curr?.type === "video" ? <img src={curr?.videothubnail || process.env.REACT_APP_UPLOADED_CONTENT + curr?.videothubnail} className="content_img" />
                              : curr?.type === "audio" ? <img
                                src={interview}
                                className="content_img"
                                alt="Content thumbnail"
                              />
                                : null
                          }
                        </a>
                      </Td>
                      <Td className="timedate_wrap">
                        <p className="timedate"><img src={watch} className="icn_time" />{moment(curr?.createdAt).format(`hh:mm A`)}</p>
                        <p className="timedate"><img src={calendar} className="icn_time" />{moment(curr?.createdAt).format(`DD MMM, YYYY`)}</p>
                      </Td>
                      <Td className="description_td">
                        <Text className="desc_ht">
                          {curr?.task_id?.task_description}
                        </Text>
                      </Td>



                      <Td className="text_center">

                        {curr?.type === "image" ? <img src={camera} alt="Content thumbnail" className="icn m_auto" />
                          : curr?.type === "video" ? <img src={video} alt="Content thumbnail" className="icn m_auto" />
                            : curr?.type === "audio" ? <img src={interview} alt="Content thumbnail" className="icn m_auto" />
                              : ""}

                      </Td>

                      <Td className="text_center">

                        {
                          <Tooltip label={curr?.task_id?.category_id && curr?.task_id?.category_id?.name}>
                            <img src={curr?.task_id?.category_id && curr?.task_id?.category_id?.icon} className="icn m_auto" />
                          </Tooltip>
                        }
                      </Td>
                      <Td className="item_detail"><img src={process.env.REACT_APP_HOPPER_AVATAR + curr?.hopper_id?.avatar_id?.avatar} alt="Content thumbnail" />
                        <Text className="nameimg"><span className="txt_mdm">{`${curr?.hopper_id?.first_name} ${curr?.hopper_id?.last_name}`}
                        </span><br />
                          <span>({curr?.hopper_id?.user_name})</span></Text>
                      </Td>
                      <Td>&pound; {formatAmountInMillion(curr?.amount_paid || 0)}</Td>
                      <Td className="">
                        <span className="txt_success_mdm">
                          {curr?.paid_status === true ? "sold" : "unsold"}
                        </span>
                      </Td>
                      <Td>
                        &pound;{formatAmountInMillion(curr?.amount_paid || 0)}
                      </Td>
                      <Td>
                        &pound;{formatAmountInMillion(curr?.commition_to_payable || 0)}
                      </Td>
                      <Td>
                        &pound;{formatAmountInMillion(curr?.amount_paid_to_hopper || 0)}
                      </Td>
                      <Td>
                        &pound;{
                          formatAmountInMillion(curr?.amount_paid_to_hopper && curr?.amount_paid_to_hopper !== "0" ? "0" : curr?.amount_payable_to_hopper)

                        }
                      </Td>
                      <Td className="contact_details">{curr?.purchased_publication?.company_bank_details
                        ?.bank_name
                      }<br /> Sort Code - {curr?.purchased_publication?.company_bank_details
                        ?.sort_code}<br /> Account -{curr?.purchased_publication?.company_bank_details
                          ?.account_number} </Td>

                      <Td className="select_wrap">
                        <Select
                          value={curr?.mode}
                          onChange={(e) => {
                            curr.mode = e.target.value;
                            setDetails((prevItem) => {
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
                            setDetails((prevItem) => {
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
                        <p className="timedate"><img src={calendar} className="icn_time" />{moment(curr?.updatedAt).format(`DD MMM,YYYY`)}</p>
                        <a className="timedate" onClick={() => { history.push(`/admin/publication-sourced-content-detail-history/${curr?._id}`) }}>
                          <BsEye className="icn_time" />
                          View history
                        </a>
                      </Td>
                      <Td><Button className="theme_btn tbl_btn" onClick={() => Edit(index)}>Save</Button></Td>
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
