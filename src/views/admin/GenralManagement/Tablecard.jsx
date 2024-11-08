import React, { useEffect, useState } from 'react';
import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
  Container,
  Flex,
  Text,
  useColorModeValue,
  Button,
} from "@chakra-ui/react";
import Card from "components/card/Card";
import printic from "assets/img/icons/print.png";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Patch, Get } from 'api/admin.services';
import { toast } from 'react-toastify';
import moment from 'moment';

function TableCard(props) {
  const { type, update } = props;
  const textColor = useColorModeValue("#000", "white");
  const [description, setDescription] = useState("");
  const [data, setData] = useState("");
  const [updatedDate, setUpdatedDate] = useState("");

  const handleUpdate = async (type) => {
    if (!description || description.trim() === "") {
      toast.error("required")
    } else {
      try {
        const obj = {
          type: type,
          description: description
        };

        await Patch("admin/update/genral/mgmt", obj).then((res) => {
          if (res) {
            toast.success("Successfully updated");
            getData(type);
          }
        });
      } catch (error) {
        // console.log(error);
      }
    }

  };

  const getData = async (type) => {
    await Get(`admin/genral/mgmt?${type}=${type}`).then((res) => {
      const { status } = res?.data;
      setData(status?.description);
      setUpdatedDate(status?.updatedAt);
    });
  };

  useEffect(() => {
    getData(type);
  }, [type]);

  // print
  // download data
  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    printWindow.document.open();
    printWindow.document.write(`
      <html>
        <head>
          <title>Print</title>
        </head>
        <body>
          <div>${data}</div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();

    // Close the print window after a short delay (e.g., 1 second)
    setTimeout(() => {
      printWindow.close();
    }, 100);
  };


  return (
    <Card
      className="rt_txt_edtr_wrap"
      direction='column'
      w='610px'
      px='0px'
      p='17px'
      h='737px'
      overflowX={{ sm: "scroll", lg: "hidden" }}>
      <Flex px='20px' pe="20px" justify='space-between' mb='27px' align='center'>
        <Text
          className="crd_edit_hdng"
          color={textColor}
          fontSize='22px'
          fontWeight='700'
          lineHeight='100%'
          fontFamily="AirbnbBold">
          {type === "privacy_policy" ? "Privacy policy" : type === "legal" ? "Legal T&Cs " : ""}
          <span className="updt_date">
            updated on {moment(updatedDate).format('DD MMMM YY')}
          </span>
        </Text>
        <div className="opt_icons_wrap cms_icns">
          <span onClick={() => handlePrint()}><img src={printic} alt="print" /></span>
        </div>
      </Flex>
      <Container className="inner_card_wrap tandc inner_cont_edit" maxW='900px' color='black'>
        <div className="dtl_wrap">
          <div className="App">
            <CKEditor
              editor={ClassicEditor}
              data={data}
              onReady={editor => { }}
              onChange={(event, editor) => {
                const data = editor.getData();
                setDescription(data);
              }}
              onBlur={(event, editor) => { }}
              onFocus={(event, editor) => { }}
            />
          </div>
        </div>
        <div className="save_btn_wrap" align="center">
          <Button className="w_100 theme_btn" onClick={() => {
            handleUpdate(type);
            update();
          }}>Save</Button>
        </div>
      </Container>
    </Card>
  );
}

export default TableCard;
