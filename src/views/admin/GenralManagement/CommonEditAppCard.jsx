import React, { useEffect, useState } from "react";
import {
    Box,
    Container,
    Select,
    Textarea,
    Flex,
    Text,
    useColorModeValue,
    Button,
} from "@chakra-ui/react";
import Card from "components/card/Card";
import { useHistory } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import printic from "assets/img/icons/print.png";
import shareic from "assets/img/icons/share.png";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Get } from "api/admin.services";
import { toast } from "react-toastify";
import { Patch } from "api/admin.services";
import moment from "moment/moment";
import Share from "components/share/Share";
import share from "assets/img/icons/share.png";

function Common(props) {
    const [priceTipCategory, setPriceTipCategory] = useState("");
    const textColor = useColorModeValue("#000", "white");
    const [responseData, setResponeData] = useState("");
    const [updateResponse, setUpdateResponse] = useState();
    const [updatedDate, setupdatedDate] = useState();
    const typeParam = props.type;
    const [tab, setTab] = useState([]);
    const path = props?.path;
    const [csv, setCsv] = useState("");
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(!show);
    };

    // Get Data
    const GetData = async (typeParam) => {
        try {
            await Get(`admin/genral/mgmt/app?type=${typeParam}`).then((res) => {
                setResponeData(res?.data?.status?.description);
                setupdatedDate(res?.data?.status.updatedAt);
            });
        } catch (error) { }
    };

    // Update data
    const update = async (typeParam) => {
        if (!updateResponse || updateResponse.trim() === "") {
            toast.error("required");
        } else {
            try {
                let obj = {
                    type: typeParam,
                    description: updateResponse,
                };
                if (typeParam === "price_tips") {
                    obj.category = priceTipCategory;
                }
                await Patch(`admin/update/genral/mgmt/app`, obj).then((res) => {
                    toast.success("Successfully updated");
                    GetData(typeParam);
                });
            } catch (error) { }
        }
    };

    // Get category
    const getCategory = async () => {
        try {
            await Get('admin/getCategory/priceTip').then((res) => {
                setTab(res.data.categories);
            });
        } catch (er) { }
    };

    useEffect(() => {
        GetData(typeParam);
        getCategory();
    }, [typeParam]);

    // Download data
    const handlePrint = () => {
        const printWindow = window.open('', '_blank');
        printWindow.document.open();
        printWindow.document.write(`
      <html>
        <head>
          <title>Print</title>
        </head>
        <body>
          <div>${responseData}</div>
        </body>
      </html>
    `);
        printWindow.document.close();
        printWindow.print();
    };

    return (
        <>
            {/* {console.log(props?.path, `,--------props?.path`)} */}

            <Card
                className="rt_txt_edtr_wrap"
                direction='column'
                w='615px'
                px='0px'
                p='17px'
                h='737px'
                overflowX={{ sm: "scroll", lg: "hidden" }}
            >
                <Flex px='20px' pe="20px" justify='space-between' mb='27px' align='center'>
                    <Text
                        className="crd_edit_hdng"
                        color={textColor}
                        fontSize='22px'
                        lineHeight='100%'
                        fontFamily={"AirbnbBold"}
                    >
                        {typeParam === "privacy_policy" ? "Privacy policy" :
                            typeParam === "legal" ? "Legal T&C" :
                                typeParam === "commision" ? "Commission structure" :
                                    typeParam === "selling_price" ? "Selling price" : "Price tips"
                        }
                        <span className="updt_date">Updated on {moment(updatedDate).format('DD MMMM YYYY')}</span>
                    </Text>
                    <div className="opt_icons_wrap cms_icns">
                        <a
                            onClick={() => {
                                setShow(true);
                                setCsv(path);
                            }}
                            className="txt_danger_mdm"
                        >
                            <img src={share} className="opt_icons" />
                        </a>
                        <span onClick={() => handlePrint()}><img src={printic} alt="print" /></span>
                        {typeParam === "price_tips" ?
                            <Select
                                className="sml_slct"
                                value={priceTipCategory}
                                name="priceTipCategory"
                                onChange={(e) => setPriceTipCategory(e.target.value)}
                            >
                                {tab && tab.map((curr) => (
                                    <option key={curr?.name} value={curr?.name}>{curr?.name}</option>
                                ))}
                            </Select>
                            : ""
                        }
                    </div>
                </Flex>
                <Container className="inner_card_wrap tandc inner_cont_edit" maxW='900px' color='black'>
                    <div className="dtl_wrap">
                        <div className="App">
                            <CKEditor
                                editor={ClassicEditor}
                                data={responseData ?? ""}
                                onReady={editor => {
                                    // console.log('Editor is ready to use!', editor);
                                }}
                                onChange={(event, editor) => {
                                    const data = editor.getData();
                                    // console.log({ event, editor, data });
                                    setUpdateResponse(data);
                                }}
                                onBlur={(event, editor) => {
                                    // console.log('Blur.', editor);
                                }}
                                onFocus={(event, editor) => {
                                    // console.log('Focus.', editor);
                                }}
                            />
                        </div>
                    </div>
                    <div className="save_btn_wrap" align="center">
                        <Button className="w_100 theme_btn" onClick={() => {
                            update(typeParam);
                            props.update();
                        }}>Save</Button>
                    </div>
                </Container>
            </Card>
            <Share show={show} csv={csv} update={handleClose} />
        </>
    );
}

export default Common;
