import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

// Chakra imports
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
   Input,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components

import DefaultAuth from "layouts/auth/Default";
// Assets
import illustration from "assets/img/auth/auth.png";
import { Post } from "api/admin.services";

import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
function ResetPassword() {
  const [error, setError] = useState(undefined);
  // Chakra color mod
  const textColor = useColorModeValue("navy.700", "white");
  const textColorSecondary = "gray.400";

  const brandStars = useColorModeValue("brand.500", "brand.400");
  
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const history=useHistory()

  let param = useParams()

  const submit = async (event) => {
    if (event) {
      event.preventDefault();
    }
    if (password !== confirmPassword) {
      toast.error("password not matched",{
        position: toast.POSITION.TOP_CENTER
    })
    } else {
      let obj = {
        password: password,
        id: param.id
      }
      try {
        await Post(`admin/resetPassword`, obj).then(response => {
        if(response){
          toast.success("password reset",{
            position: toast.POSITION.TOP_CENTER
        })}
          history.push("/sign-in");

        })} catch (err) {
        // console.log(err, `${error}`)
      }
    }
  }

return (

    <DefaultAuth illustrationBackground={illustration} image={illustration}>

      <Flex
        maxW={{ base: "100%", md: "max-content" }}
        w='100%'
        mx={{ base: "auto", lg: "0px" }}
        me='auto'
        h='100%'
        alignItems='start'
        justifyContent='center'
        mb={{ base: "30px", md: "60px" }}
        px={{ base: "25px", md: "0px" }}
        mt={{ base: "40px", md: "14vh" }}
        flexDirection='column'>
        <Box me='auto'>
          <Heading color={textColor} fontSize='36px' mb='10px'>
            Reset Password
          </Heading>
          <Text
            mb='36px'
            ms='4px'
            color={textColorSecondary}
            fontWeight='400'
            fontSize='md'>
            Set new password to login
          </Text>
        </Box>
        <Flex
          zIndex='2'
          direction='column'
          w={{ base: "100%", md: "420px" }}
          maxW='100%'
          background='transparent'
          borderRadius='15px'
          mx={{ base: "auto", lg: "unset" }}
          me='auto'
          mb={{ base: "20px", md: "auto" }}>

          <Flex
            zIndex='2'
            direction='column'
            w={{ base: "100%", md: "420px" }}
            maxW='100%'
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
            <FormControl>
              <FormLabel
                display='flex'
                ms='4px'
                fontSize='sm'
                fontWeight='500'
                color={textColor}
                mb='8px'>
                New Password<Text color={brandStars}>*</Text>
              </FormLabel>
              <Input
                isRequired={true}
                variant='auth'
                fontSize='sm'
                ms={{ base: "0px", md: "0px" }}
                type='email'
                mb='24px'
                fontWeight='500'
                size='lg'
                onChange={(event) => {
                  setPassword(event.target.value);
                  setError(undefined);
                }}
              />
              <FormLabel
                ms='4px'
                fontSize='sm'
                fontWeight='500'
                color={textColor}
                display='flex'>
                Confirm New Password<Text color={brandStars}>*</Text>
              </FormLabel>
              <Input
                isRequired={true}
                variant='auth'
                fontSize='sm'
                ms={{ base: "0px", md: "0px" }}
                type='email'
                mb='24px'
                fontWeight='500'
                size='lg'
                onChange={(event) => {
                  setConfirmPassword(event.target.value);
                  setError(undefined);
                }}
              />

              <Button
                fontSize='sm'
                variant='brand'
                fontWeight='500'
                w='100%'
                h='50'
                mb='24px'
                onClick={submit}>
                Submit
              </Button>

            </FormControl>
          </Flex>
        </Flex>
      </Flex>
    </DefaultAuth>
  );
}

export default ResetPassword;
