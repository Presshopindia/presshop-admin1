import React, { useState, useEffect } from "react";

import { useHistory } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import emailic from "assets/img/icons/email.svg";
// Chakra imports
import {
  Box,
  Button,
  Checkbox,
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
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import SignNHeader from "components/SignNHeader/SignNHeader";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";
import { useAuth } from "../../../auth-context/auth.context";
import AuthApi from "../../../api/auth";
import signimg from "assets/img/signimages/signimg1.svg";
import lockic from "assets/img/icons/lock.svg";
import { Post } from "api/admin.services";
import { v4 as uuidv4 } from 'uuid';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";




function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(undefined);
  const history = useHistory();
  const { setUser } = useAuth();
  const textColor = useColorModeValue("#000", "white");
  const textColorSecondary = "gray.400";
  const textColorBrand = useColorModeValue("#EC4E54");
  const [deviceId, setDeviceId] = useState('');
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  const login = async (event) => {
    if (event) {
      event.preventDefault();
    }
    if (email === "") {
      return setError("You must enter your email.");
    }
    if (password === "") {
      return setError("You must enter your password");
    }
    try {
      const auth = getAuth();

      let response = await AuthApi.Login({ email, password });
      if (response.status === 200) {
        const currentTime = new Date().toString();
        sessionStorage.setItem('loginTime', currentTime);
        setProfile(response);
        signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed in successfully
            const user = userCredential.user;

          })
      } else if (response.data && response.data.success === false) {
        return setError(response.data.msg);
      }
    } catch (err) {
      if (err.message) {
        toast.error(err.response.data.errors.msg[0].msg, {
          position: toast.POSITION.TOP_CENTER
        })
      }
    }
  };


  const setProfile = async (response) => {
    toast.success("Welcome to Presshop’s admin platform",);

    let user = { ...response.data.user };
    user.token = response.data.token;
    user = JSON.stringify(user);
    setUser(user);
    localStorage.setItem("user", user);
    history.push("/admin/dashboards");

  };


  useEffect(() => {
    let storedDeviceId = localStorage.getItem('deviceId');
    if (!storedDeviceId) {
      storedDeviceId = uuidv4();
      localStorage.setItem('deviceId', storedDeviceId);
    }

    setDeviceId(storedDeviceId);
  }, []);

  const AddFirebaseMessaging = async () => {
    const formdata = new FormData();
    formdata.append('device_token', localStorage.getItem('DeviceToken'));
    formdata.append('type', 'web');
    formdata.append('device_id', deviceId);
    if (localStorage.getItem("DeviceToken")) {
      try {
        await Post("admin/add/fcm", formdata)
          .then((resp) => {
            // console.log("resp", resp)
          })
      }
      catch (error) {
        // console.log(error)
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
              <Box me='auto'>
                <Heading
                  color='#000'
                  fontSize='40px'
                  mb='60px'
                  fontFamily='AirbnbBold'>
                  Welcome to our tribe
                </Heading>
                <Text
                  mb='25px'
                  color='#000'
                  fontSize='15px'
                  textAlign='justify'>
                  Please enter your full name, and your password to gain access into our Admin platform. If you have forgotten your password, please <a onClick={() => { history.push('/auth/forgot-password') }} className="link_danger">click here</a> and we will help create a new password for you. This happens to most of us, and is absolutely fine.
                </Text>
                <Text
                  mb='25px'
                  color='#000'
                  fontSize='15px'
                  textAlign='justify'>
                  If you face any trouble logging in, please contact the administrator at <a className="link_danger">ritchie@presshop.co.uk</a> who will be happy to assist. Thanks !
                </Text>
              </Box>
              <Flex
                mt='40px'
                zIndex='2'
                direction='column'
                w={{ base: "100%", md: "100%" }}
                maxW='100%'
                background='transparent'
                borderRadius='15px'
                mx={{ base: "auto", lg: "unset" }}
                me='auto'
                mb={{ base: "20px", md: "auto" }}>
                <Flex
                  zIndex='2'
                  direction='column'
                  // w={{ base: "100%", md: "420px" }}
                  maxW='100%'
                  w='100%'
                  background='transparent'
                  borderRadius='15px'
                  mx={{ base: "auto", lg: "unset" }}
                  me='auto'
                  mb={{ base: "20px", md: "auto" }}>
                  <h4
                    style={{
                      fontSize: ".9em",
                      color: "red",
                      textAlign: "center",
                      fontWeight: 400,
                      transition: ".2s all",
                    }}
                  >
                    {error}
                  </h4>
                  <FormControl
                    className="sign_inputs"
                    w='568px'>
                    <Flex
                      direction='row'
                      w='568px'
                      gap='20px'
                      mb='0px'>
                      <div className="signinp1">
                        <div
                          marginBottom='25px'
                          className="sign_inner_inputs">
                          <img src={emailic} className="input_ic" alt="Email" />
                          <Input
                            h='40px'
                            borderRadius='8px'
                            paddingLeft='40px'
                            borderColor='#858585'
                            isRequired={true}
                            variant='auth'
                            fontSize='sm'
                            ms={{ base: "0px", md: "0px" }}
                            type='email'
                            placeholder='Enter official email address *'
                            mb='0px'
                            defaultValue={email}
                            fontWeight='500'
                            size='lg'
                            onChange={(event) => {
                              setEmail(event.target.value);
                              setError(undefined);
                            }}
                          />
                        </div>
                      </div>
                      <div className="signinp1">
                        <div
                          marginBottom='0px'
                          className="sign_inner_inputs">
                          <img src={lockic} className="input_ic" alt="Email" />
                          <InputGroup size='md'>
                            <Input
                              h='40px'
                              borderRadius='8px'
                              paddingLeft='40px'
                              borderColor='#858585'
                              isRequired={true}
                              fontSize='sm'
                              placeholder='Enter your password *'
                              size='lg'
                              defaultValue={password}
                              type={show ? "text" : "password"}
                              variant='auth'
                              onChange={(event) => {
                                setPassword(event.target.value);
                                setError(undefined);
                              }}
                            />
                            <InputRightElement display='flex' alignItems='center' mt='0px'>
                              <Icon
                                color={"#000"}
                                _hover={{ cursor: "pointer" }}
                                as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
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
                      mb="15px"
                      mt="47px"
                      borderRadius="8px"
                      fontFamily="AirbnbBold"
                      onClick={async (e) => {
                        await login(e);
                        await AddFirebaseMessaging()

                      }
                      }>
                      Log In
                    </Button>
                    <NavLink className="text_center" to='/auth/forgot-password'>
                      <Text
                        className="m_auto"
                        color='#EC4E54'
                        fontSize='14px'
                        w='124px'
                        fontFamily="AirbnbMedium"
                        fontWeight='500'
                        textAlign='center'>
                        Forgot password?
                      </Text>
                    </NavLink>
                  </FormControl>
                </Flex>
              </Flex>
            </Flex>
          </GridItem>
          <GridItem className="grd_rt" w='100%' h='100%'>
            <div className="tri"></div>
            <div className="circle"></div>
            <div className="sml_sqr"></div>
            <div className="big_circle"></div>
            <Flex
              direction='column'
              className="signright"
              maxW={{ base: "100%", md: "max-content" }}
              w='100%'
              mx={{ base: "auto", lg: "0px" }}
              me='auto'
              h='100%'
              alignItems='center'
              justifyContent='center'
              mb={{ base: "30px", md: "60px" }}
              px={{ base: "25px", md: "0px" }}
              mt={{ base: "40px", md: "14vh" }}
            >
              <img src={signimg} alt="" />
              <Text
                w='490px'
                mt='17px'
                fontSize='40px'
                align='center'
              >
                It's <span className="txt_bold">action</span> time, let's dive straight in
              </Text>
            </Flex>
          </GridItem>
        </Grid>
      </div>
    </>
  );
}

export default SignIn;