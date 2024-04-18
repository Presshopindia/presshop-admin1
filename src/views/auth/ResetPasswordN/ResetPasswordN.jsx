import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
// Chakra imports
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Show,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import axios from "axios";
import { toast } from "react-toastify";
import SignNHeader from "components/SignNHeader/SignNHeader";
import signimg from "assets/img/signimages/signimg3.svg";
import emailic from "assets/img/icons/email.svg";
import OtpInput from 'react-otp-input';
import timeleft from "assets/img/icons/timeleft.svg";
import { RiEyeCloseLine } from "react-icons/ri";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import lockic from "assets/img/icons/lock.svg";
import { Post } from "api/admin.services";


function ResetPasswordN() {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const [error, setError] = useState(undefined);
  // Chakra color mod
  const textColor = useColorModeValue("navy.700", "white");
  const textColorSecondary = "gray.400";
  const brandStars = useColorModeValue("brand.500", "brand.400");
  const history = useHistory()
  const localEmail = localStorage.getItem("Email")
  const [otp, setOtp] = useState(0)
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [visibility1, setVisibility1] = useState(false)
  const [visibility2, setVisibility2] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState(300);
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  const ResetPassword = async (e) => {
    e.preventDefault()
    const obj = {
      otp: otp,
      email: localEmail,
      password: password
    }

    if (password !== confirmPassword) {
      toast.error("The password doesn't match. Please try again")
    }
    else {
      const resp = await Post(`auth/admin/resetPassword`, obj)
      if (resp) {
        toast.success("Congrats. Your new password has been successfully updated")
        localStorage.clear()
        history.push("/sign-in")
      }
    }
  }

  const RenewOTP = async (e) => {
    e.preventDefault()
    const resp = await Post(`auth/admin/forgotPassword`, { email: localEmail })
    if (resp) {
      setTimeRemaining(300)
      toast.success("OTP sent successfully", {
        position: toast.POSITION.TOP_CENTER
      })
    }

  }

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(prevTime => prevTime - 1);
    }, 1000);

    if (timeRemaining === 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [timeRemaining]);

  useEffect(() => {
    if (timeRemaining === 0) {
      // toast.error("OTP expired!!")
    }
  }, [timeRemaining]);




  return (

    <>
      <SignNHeader />
      <div className="signn_wrap reset_opt_wrap">
        <Grid templateColumns='repeat(2, 1fr)' gap={0}>
          <GridItem className="grd_lft" w='100%' h='100%' >
            <Flex
              className="signleft"
              alignItems='start'
              justifyContent='center'
              flexDirection='column'>
              {error}
              <Box me='auto'>
                <Heading
                  color='#000'
                  fontSize='40px'
                  mb='60px'
                  fontFamily='AirbnbBold'>
                  Reset your password
                </Heading>
                <Text
                  mb='25px'
                  color='#000'
                  fontSize='15px'
                  textAlign='justify'>
                  Please enter the 5 digit OTP received on your registered email address <a className="link_danger">{localEmail}</a>
                </Text>
                <div className="reset_otp_inp_wrap">
                  <OtpInput
                    value={otp}
                    onChange={setOtp}
                    numInputs={5}
                    renderInput={(props) => <input {...props} />}
                  />
                </div>
                <Text
                  mt='23px'
                  mb='22px'
                  color='#000'
                  fontSize='12px'
                  textAlign='justify'>
                  {/* <img src={timeleft} alt="" className="timeleftic" /> */}
                  <p className="otp_time"><img src={timeleft} alt="timeout" className="timeleftic" /> The OTP will expire in {minutes}:{seconds < 10 ? `0${seconds}` : seconds} minutes</p>
                </Text>
                <Text
                  mt='23px'
                  mb='22px'
                  color='#000'
                  fontSize='15px'
                  lineHeight='24px'
                  textAlign='justify'>
                  If you haven't received an OTP, please <a className="link_danger" onClick={RenewOTP}>click here</a>for a fresh OTP. If you continue facing any problems, please <a className="link_danger">contact</a> our experienced team who will be happy to assist.
                </Text>
                <Text
                  mt='23px'
                  mb='45px'
                  color='#000'
                  fontSize='15px'
                  lineHeight='24px'
                  textAlign='justify'>
                  Please choose a memorable password that is strong, and you don't have to write it down anywhere. Always remember, that you wouldn't share your ATM pin, so why would you share your password!!
                </Text>
                <Flex
                  mt='0px'
                  zIndex='2'
                  direction='column'
                  w={{ base: "100%", md: "100%" }}
                  maxW='100%'
                  background='transparent'
                  borderRadius='15px'
                  mx={{ base: "auto", lg: "unset" }}
                  me='auto'
                  mb={{ base: "20px", md: "auto" }}>
                  <FormControl
                    className="sign_inputs"
                    w='568px'>
                    <Flex
                      direction='row'
                      w='568px'
                      gap='20px'
                      mb='25px'>
                      <div className="signinp1">
                        <div
                          marginBottom='0px'
                          className="sign_inner_inputs">
                          <img src={lockic} className="input_ic" alt="Email" />
                          <InputGroup size='md'>
                            <Input
                              ps="40px"
                              isRequired={true}
                              variant='auth'
                              fontSize='sm'
                              ms={{ base: "0px", md: "0px" }}
                              type={show ? "text" : "password"}
                              mb='0px'
                              fontWeight='500'
                              size='lg'
                              placeholder="Enter new password"
                              onChange={(event) => {
                                setPassword(event.target.value);
                                setError(undefined);
                              }}
                            />
                            <InputRightElement className="eye_hide_ic" display='flex' alignItems='center' mt='0px' top="5px">
                              <Icon
                                color={textColorSecondary}
                                _hover={{ cursor: "pointer" }}
                                as={Show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                              />
                            </InputRightElement>
                          </InputGroup>
                        </div>
                      </div>
                      <div className="signinp1">
                        <div
                          marginBottom='0px'
                          className="sign_inner_inputs">
                          <img src={lockic} className="input_ic" alt="Email" />
                          <InputGroup size='md'>
                            <Input
                              ps="40px"
                              isRequired={true}
                              variant='auth'
                              fontSize='sm'
                              ms={{ base: "0px", md: "0px" }}
                              type={show ? "text" : "password"}
                              mb='0px'
                              fontWeight='500'
                              size='lg'
                              placeholder="Confirm password"
                              onChange={(event) => {
                                setConfirmPassword(event.target.value);
                                setError(undefined);
                              }}
                            />
                            <InputRightElement className="eye_hide_ic" display='flex' alignItems='center' mt='0px' top="5px">
                              <Icon
                                color={textColorSecondary}
                                _hover={{ cursor: "pointer" }}
                                as={Show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                                onClick={handleClick}
                              />
                            </InputRightElement>
                          </InputGroup>
                        </div>
                      </div>
                    </Flex>
                    <Button
                      fontSize='sm'
                      variant='brand'
                      fontWeight='500'
                      w="100%"
                      h="42px"
                      mb="40px"
                      mt="40px"
                      borderRadius="8px"
                      fontFamily="AirbnbBold" onClick={ResetPassword}>
                      Submit
                    </Button>
                  </FormControl>
                </Flex>
              </Box>
            </Flex>
          </GridItem>
          <GridItem className="grd_rt" w='100%' h='100%'>
            <div className="tri"></div>
            <div className="circle"></div>
            <div className="sml_sqr"></div>
            <div className="big_circle"></div>
            <Flex
              className="signright"
              direction='column'
              w='100%'
              mx={{ base: "auto", lg: "0px" }}
              h='100%'
              alignItems='center'
              justifyContent='center'
              mb={{ base: "30px", md: "60px" }}
              px={{ base: "25px", md: "0px" }}
              mt={{ base: "40px", md: "14vh" }}>
              <img src={signimg} alt="" />
              <Text
                mt='30px'
                fontSize='40px'
                align='center'
                lineHeight='40px'>
                <span
                  className="txt_bold">
                  No worries</span>, we got you!
              </Text>
            </Flex>
          </GridItem>
        </Grid>
      </div>
    </>
  );
}

export default ResetPasswordN;