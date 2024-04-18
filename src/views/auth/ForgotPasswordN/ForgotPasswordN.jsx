import React, { useState } from "react";
import { useHistory } from "react-router-dom";
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

  Input,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
// import DefaultAuth from "layouts/auth/Default";
// Assets
// import illustration from "assets/img/auth/auth.png";
import axios from "axios";
import { toast } from "react-toastify";
import SignNHeader from "components/SignNHeader/SignNHeader";
import signimg from "assets/img/signimages/signimg2.svg";
import emailic from "assets/img/icons/email.svg";
import { Post } from "api/admin.services";

function ForgotPasswordN() {
  const textColor = useColorModeValue("navy.700", "white");
  const textColorSecondary = "gray.400";
  const brandStars = useColorModeValue("brand.500", "brand.400");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("")
  const history = useHistory()

  const forgetButton = async (event) => {
    if (event) {
      event.preventDefault();
    }
    if (email === "") {
      return setError("You must enter your email.");
    }
    try {
      await Post(`admin/forgotPassword`, { email }).then(response => {
        if (response) {

          toast.success("A 5 digit OTP has been sent to your registered email id", {
            position: toast.POSITION.TOP_CENTER
          })
          localStorage.setItem("Email", email)
          history.push("/auth/reset-password")
        }
        // history.push("/sign-in");
      })
    } catch (error) {
      toast.error(error.response.data.errors.msg, {
        position: toast.POSITION.TOP_CENTER
      })

      if (error) {
        toast.error(error.response.data.errors.msg[0].msg, {
          position: toast.POSITION.TOP_CENTER
        })
      }
    }
  }
  return (

    <>
      <SignNHeader />
      <div className="signn_wrap">
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
                  Forgot your password?
                </Heading>
                <Text
                  mb='25px'
                  color='#000'
                  fontSize='15px'
                  textAlign='justify'>
                  Please enter your registered email address below, and we will send you a link to reset your password.
                </Text>
                <Text
                  mb='25px'
                  color='#000'
                  fontSize='15px'
                  textAlign='justify'>
                  If you haven't forgotten your password, you don't have to do anything. Simply <a onClick={() => { history.push('/auth//sign-in') }} className="link_danger">click here</a> to go home. Always remember, that your password is like your toothbrush. Never share it with anyone!
                </Text>
                <Flex
                  // mt='40px'
                  mt='120px'
                  zIndex='2'
                  direction='column'
                  w={{ base: "100%", md: "100%" }}
                  maxW='100%'
                  background='transparent'
                  borderRadius='15px'
                  mx={{ base: "auto", lg: "unset" }}
                  me='auto'
                  mb={{ base: "20px", md: "auto" }}>
                  <FormControl>
                    {/* <FormLabel
                      display='flex'
                      ms='4px'
                      fontSize='sm'
                      fontWeight='500'
                      color='#000'
                      mb='8px'>
                      Email<Text color={brandStars}>*</Text>
                    </FormLabel> */}
                    <div className="frgt_inp_wrap">
                      <img src={emailic} className="input_ic" alt="Email" />
                      <Input
                        h='40px'
                        w='300px'
                        borderRadius='8px'
                        paddingLeft='40px'
                        isRequired={true}
                        borderColor='#858585'
                        variant='auth'
                        fontSize='sm'
                        ms={{ base: "0px", md: "0px" }}
                        type='email'
                        placeholder='Enter registered email address *'
                        mb='0px'
                        fontWeight='500'
                        size='lg'
                        onChange={(event) => {
                          setEmail(event.target.value);
                          setError(undefined);
                        }}
                      />
                    </div>
                    <>
                      <Button
                        fontSize='sm'
                        variant='brand'
                        fontWeight='500'
                        w='100%'
                        h='42px'
                        mb='40px'
                        mt="40px"
                        borderRadius="8px"
                        fontFamily="AirbnbBold"
                        onClick={forgetButton}
                      >
                        Submit
                      </Button>
                    </>
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
              // maxW={{ base: "100%", md: "max-content" }}
              w='100%'
              mx={{ base: "auto", lg: "0px" }}
              // me='auto'
              h='100%'
              alignItems='center'
              justifyContent='center'
              mb={{ base: "30px", md: "60px" }}
              px={{ base: "25px", md: "0px" }}
              mt={{ base: "40px", md: "14vh" }}
            >
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

export default ForgotPasswordN;