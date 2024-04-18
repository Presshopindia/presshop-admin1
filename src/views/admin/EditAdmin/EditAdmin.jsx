

// Chakra imports
import {
  Box,
  Checkbox,
  //  SimpleGrid
} from "@chakra-ui/react";
import { React, useState } from "react";
import { Flex, Text, Select, useColorModeValue, Icon, Button, ButtonGroup } from "@chakra-ui/react";
import Card from "components/card/Card";
import { Container } from '@chakra-ui/react';
import { Input, InputLeftElement, InputRightElement, InputGroup } from '@chakra-ui/react';
import { useHistory } from "react-router-dom";
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
//New Imports//
import eye from "assets/img/icons/eye.svg";
import CmpIcon from "assets/img/icons/company.svg";
import HashTag from "assets/img/icons/Ahash.svg";
import vat from "assets/img/icons/vat.svg"
import AddPic from "assets/img/icons/AddPic.svg";
import Globe from "assets/img/icons/globe.svg";
import lock from "assets/img/icons/lock.svg";
import offCup from "assets/img/icons/cup.svg";
import location from "assets/img/icons/location.svg";
import hopper from "assets/img/icons/hopper.png";
import Emailicon from "assets/img/icons/email.svg";
import chair from "assets/img/icons/chair.svg";


export default function EditAdmin() {

  const [value, setValue] = useState()

  const textColor = useColorModeValue("#000", "white");
  const history = useHistory()
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <Card className="add_hopper admin_reg"
        direction='column'
        w='100%'
        px='0px'
        mb='24px'
        overflowX={{ sm: "scroll", lg: "hidden" }}>

        <Container className="inner_card_wrap" maxW='1000px' color='black'>
          <Flex justify='space-between' mb='20px' align='center'>
            <Text
              color={textColor}
              fontSize='22px'
              fontWeight='700'
              lineHeight='100%'
              fontFamily={"AirbnbBold"}>
              Company details
            </Text>
          </Flex>
          <div className="dtl_wrap">
            <Flex className="edit_inputs_wrap" px='0px' justify='space-between' mb="20px" align='center'>
              <InputGroup flex={1}>
                <InputLeftElement
                  pointerEvents='none'>
                  <img src={CmpIcon} alt="" />
                </InputLeftElement>
                <Input type='text' placeholder='Company name *'
                />
              </InputGroup>
              <InputGroup flex={1}>
                <InputLeftElement
                  pointerEvents='none'>
                  <img src={HashTag} alt="" />
                </InputLeftElement>
                <Input placeholder="Company no *" />
              </InputGroup>
              <InputGroup flex={1}>
                <InputLeftElement
                  pointerEvents='none'>
                  <img src={vat} alt="" />
                </InputLeftElement>
                <Input placeholder='Company VAT *'
                />
              </InputGroup>
            </Flex>
          </div>
          <Flex justify='space-between' align='center'>
            <Text
              color={textColor}
              fontSize='22px'
              fontWeight='700'
              lineHeight='100%'
              fontFamily={"AirbnbBold"}>
              Office details
            </Text>
          </Flex>
          <div className="dtl_wrap">
            <Flex className="edit_inputs_wrap" px='0px' justify='space-between' mb="20px" align='center'>
              <InputGroup flex={1} maxW="307px">
                <InputLeftElement
                  pointerEvents='none'>
                  <img src={offCup} alt="" />
                </InputLeftElement>
                <Input placeholder='Enter office name *'
                />
              </InputGroup>
            </Flex>
            <Flex className="edit_inputs_wrap" px='0px' justify='space-between' mb="20px" align='center'>
              <InputGroup flex={1}>
                <InputLeftElement
                  pointerEvents='none'>
                  <img className="location" src={location} alt="" />
                </InputLeftElement>
                <Input placeholder='Address *'
                />
              </InputGroup>
              <InputGroup flex={0.3}>
                <InputLeftElement
                  pointerEvents='none'>
                  <img className="location" src={location} alt="" />
                </InputLeftElement>
                <Input placeholder="Post code *" />
              </InputGroup>

              <div className="select_wrapper" flex={0.4}>
                <img className="location-icon" src={location} alt="" />
                <Select className="icon_left_side" placeholder='City' >
                  <option value='A'>City A</option>
                  <option value='B'>City B</option>
                  <option value='C'>City C</option>
                </Select>
              </div>

              <div className="select_wrapper" flex={0.4}>
                <img className="location-icon " src={location} alt="" />
                <Select className="icon_left_side" placeholder='Country' >
                  <option value='A'>Country A</option>
                  <option value='B'>Country B</option>
                  <option value='C'>Country C</option>
                </Select>
              </div>
            </Flex>
            <Flex className="edit_inputs_wrap" px='0px' justify='space-between' align='center'>
              <PhoneInput
                className="phone_inp"
                placeholder="Company tel number *"
                international
                countryCallingCodeEditable={false}
                defaultCountry="RU"
                value={value}
                onChange={setValue} />
              <InputGroup flex={1}>
                <InputLeftElement
                  pointerEvents='none'>
                  <img src={Emailicon} alt="" />
                </InputLeftElement>
                <Input placeholder="General email id *" />
              </InputGroup>
              <InputGroup flex={1}>
                <InputLeftElement
                  pointerEvents='none'>
                  <img src={Globe} alt="" />
                </InputLeftElement>
                <Input placeholder='Website *'
                />
              </InputGroup>
            </Flex>
          </div>
          <Flex justify='space-between' mb='20px' flexDirection="column" align='start'>
            <Text
              color="#EC4E54"
              fontSize='14px'
              lineHeight='100%'
              fontFamily={"AirbnbMedium"}
              mb="10px">
              Add another phone number
            </Text>
            <div className="check_wrap check_wrapper">
              <Checkbox
                colorScheme='brandScheme'
                me='10px'
              />
              <span>Onboard another office</span>
            </div>
          </Flex>
          <Flex justify='space-between' mb='20px' align='center'>
            <Text
              color={textColor}
              fontSize='22px'
              fontWeight='700'
              lineHeight='100%'
              fontFamily={"AirbnbBold"}>
              Administrator Details
            </Text>
          </Flex>
          <Flex gap='25px' mb='20px' align='start'>
            <div className="dtl_wrap admn_details">
              <Flex className="edit_inputs_wrap" justify='space-between' mb='20px' align='start'>
                <InputGroup flex={1}>
                  <InputLeftElement
                    pointerEvents='none'>
                    <img src={hopper} alt="" />
                  </InputLeftElement>
                  <Input placeholder='Enter full name *'
                  />
                </InputGroup>
                <InputGroup flex={1}>
                  <InputLeftElement
                    pointerEvents='none'>
                    <img src={chair} alt="" />
                  </InputLeftElement>
                  <Input placeholder="Designation *" />
                </InputGroup>
                <div className="select_wrapper">
                  <img className="location-icon " src={chair} alt="" />
                  <Select className="icon_left_side" placeholder='Select department *' >
                    <option value='A'>Department A</option>
                    <option value='B'>Department B</option>
                    <option value='C'>Department C</option>
                  </Select>
                </div>
              </Flex>
              <Flex className="edit_inputs_wrap" justify='start' mb='20px' align='start '>
                <InputGroup flex={1}>
                  <InputLeftElement
                    pointerEvents='none'>
                    <img src={Emailicon} alt="" />
                  </InputLeftElement>
                  <Input placeholder='Official email id *'
                  />
                </InputGroup>
                <PhoneInput flex={1}
                  className="phone_inp"
                  placeholder="Company tel number *"
                  international
                  countryCallingCodeEditable={false}
                  defaultCountry="RU"
                  value={value}
                  onChange={setValue} />
                <div className="select_wrapper" >
                  <img src={chair} className="location-icon" alt="" />
                  <Select className="icon_left_side" placeholder='Select office name *' >
                    <option value='A'>Office A</option>
                    <option value='B'>Office B</option>
                    <option value='C'>Office C</option>
                  </Select>
                </div>
              </Flex>
              <Flex className="edit_inputs_wrap" justify='start' mb='20px' align='center'>
                <InputGroup flex={1} maxW="255px" className="chkra_password_grp">
                  <InputLeftElement
                    pointerEvents='none'>
                    <img src={lock} alt="" />
                  </InputLeftElement>
                  <Input type='password' placeholder='Choose password *'
                    className="chkra_inpu_pass"
                  />
                  <InputRightElement
                    pointerEvents='none'>
                    <img src={eye} alt="" />
                  </InputRightElement>
                </InputGroup>
                <InputGroup flex={1} maxW="260px" className="chkra_password_grp">
                  <InputLeftElement
                    pointerEvents='none'>
                    <img src={lock} alt="" />
                  </InputLeftElement>
                  <Input type='password' placeholder="Confirm password *"
                    className="chkra_inpu_pass" />
                  <InputRightElement
                    pointerEvents='none'>
                    <img src={eye} alt="" />
                  </InputRightElement>
                </InputGroup>
              </Flex>
            </div>
            <div className="dtl_wrap_img">
              <div className="Admin_img" align='center' >
                <div className="edit_img_curr">
                  <img src={AddPic} alt=" admin avatar" />
                  {/* <label htmlFor="admin_img_curr">
                  </label> */}
                  <p>Add current photo</p>
                  <input type="file" id="admin_img_curr" />
                </div>
              </div>
            </div>
          </Flex>
          <Flex justify='space-between' mb='20px' align='center'>
            <Text
              color={textColor}
              fontSize='22px'
              fontWeight='700'
              lineHeight='100%'
              fontFamily={"AirbnbBold"}>
              Administrator Rights
            </Text>
          </Flex>
          <Flex justify='space-between' mb='10px' align='center'>

            <div className="check_wrap check_wrapper">
              <Checkbox
                colorScheme='brandScheme'
                me='10px'
              />
              <span>Allowed to onboard  users</span>
            </div>
            <div className="check_wrap check_wrapper">
              <Checkbox
                colorScheme='brandScheme'
                me='10px'
              />
              <span>Allowed to de-register users </span>
            </div>
            <div className="check_wrap check_wrapper">
              <Checkbox
                colorScheme='brandScheme'
                me='10px'
              />
              <span>Allowed to assign user rights</span>
            </div>
            <div className="check_wrap check_wrapper">
              <Checkbox
                colorScheme='brandScheme'
                me='10px'
              />
              <span>Allowed complete access</span>
            </div>
          </Flex>
          <Flex justify='start' mb='20px' align='start'>
            <Text
              color={textColor}>
              As the administrator, we are giving you important & exclusive privileges across the PRESSHOP platform. Please check the boxes below, and confirm that you are responsible for the following actions across all the Presshop offices
            </Text>
          </Flex>
          <Flex justify='start' flexDirection="column" mb='20px' gap='20px' align='start'>
            <div className="check_wrap check_wrapper" mb="10px">
              <Checkbox
                colorScheme='brandScheme'
                me='10px'
              />
              <span>I am responsible for allowing user rights for all our official employees and associates</span>
            </div>
            <div className="check_wrap check_wrapper">
              <Checkbox
                colorScheme='brandScheme'
                me='10px'
              />
              <span>I confirm that I will not share, or transfer the administrator password to anybody else without informing, and requesting permission from the directors of PRESSHOP</span>
            </div>
          </Flex>
          <Flex justify='center' mb='20px' align='center'>
            <Button className="admin_dtl_save" >
              Save
            </Button>
          </Flex>

        </Container>
      </Card>
    </Box>
  );
}
