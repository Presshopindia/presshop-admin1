// Chakra imports
import {
  Box,
  Checkbox,
  //  SimpleGrid
} from "@chakra-ui/react";
import { React, useContext, useEffect, useState } from "react";
import {
  Flex,
  Text,
  Select,
  useColorModeValue,
  Icon,
  Button,
  ButtonGroup,
} from "@chakra-ui/react";
import Card from "components/card/Card";
import { Container } from "@chakra-ui/react";
import {
  Input,
  InputLeftElement,
  InputRightElement,
  InputGroup,
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import "react-phone-number-input/style.css";

//New Imports//
import eye from "assets/img/icons/eye.svg";
import CmpIcon from "assets/img/icons/company.svg";
import HashTag from "assets/img/icons/Ahash.svg";
import vat from "assets/img/icons/vat.svg";
import AddPic from "assets/img/icons/AddPic.svg";
import Globe from "assets/img/icons/globe.svg";
import lock from "assets/img/icons/lock.svg";
import offCup from "assets/img/icons/cup.svg";
import location from "assets/img/icons/location.svg";
import hopper from "assets/img/icons/hopper.png";
import Emailicon from "assets/img/icons/email.svg";
import chair from "assets/img/icons/chair.svg";
import { Post } from "api/admin.services";
import PhoneInput from "react-phone-number-input";
import { Get } from "api/admin.services";
import { toast } from "react-toastify";
import Autocomplete from "react-google-autocomplete";
import useric from "assets/img/icons/user.svg";
import bankic from "assets/img/icons/bank.svg";
import sortcodeic from "assets/img/icons/sortcode.svg";
import accountic from "assets/img/icons/account.svg";
import dataContext from "../ContextFolder/Createcontext";
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import { useRef } from "react";
import flaguk from "assets/img/uk-flag.png"
import Loader from "components/Loader";
import { useAuth } from "auth-context/auth.context";


export default function EmployeeRegistration() {
  const libraries = ['places'];
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyApYpgGb1pLhudPj9EBdMxd8tArd0nGp5M', // Replace with your API key
    libraries,
  });

  const [isChecked, setIsChecked] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [designation, setDesigation] = useState([]);
  const [department, setDepartment] = useState([]);
  const [imageSelected, setImageSelected] = useState(false);
  const textColor = useColorModeValue("#000", "white");
  const [passwordShown, setPasswordShown] = useState(false);
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const { profile } = useContext(dataContext)
  //  both are for country code start
  const [value1, setValue1] = useState("");
  const [value, setValue] = useState("");
  const searchBoxRefStreet = useRef(null);
  const searchBoxRefStreet1 = useRef(null);


  //  both are for country code end
  const [showPopup, setShowPopup] = useState(false);
  const [showPopup1, setShowPopup1] = useState(false);

  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [officeName, setOfficeName] = useState([]);
  const [officeDetail, setOfficeDetail] = useState({
    office_name: "PRESSHOP London",
    phone: "",
    country_code: "+44",
    email: "hello@presshop.co.uk",
    website: "www.presshop.co.uk",
    address: {
      pincode: "SW1X 7QA",
      country: "United Kingdom",
      city: "London",
      complete_address: "1 Knightsbridge Green",
      location: {
        coordinates: [0, 0],
      },
    },
  });

  // end

  const AddOffice = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in officeDetail) {
      formData.append(key, officeDetail[key]);
    }
    formData.delete("address");
    formData.append("address", JSON.stringify(officeDetail.address));

    setLoading(true);
    try {
      const res = await Post(`admin/create/office/details`, formData);
      if (res) {
        toast.success("New office added");
        getOfficeName()
        setLoading(false);
        // history.push("/admin/default")
      }
    } catch (error) {
      toast.error("An error occurred while adding the office");
      setLoading(false);
    }
  };

  const [employeeDetail, setEmployeeDetail] = useState({
    name: "",
    designation_id: "",
    department_id: "",
    office_id: "",
    country_code: "+44",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    profile_image: "",
    subadmin_rights: {
      onboardEmployess: false,
      blockRemoveEmployess: false,
      assignNewEmployeeRights: false,
      completeAccess: false,
      controlHopper: false,
      controlPublication: false,
      controlContent: false,
      viewRightOnly: false,
      other_rights: false,
      allow_publication_chat: false,
      allow_hopper_chat: false
    },

    employee_address: {
      complete_address: "",
      coordinates: [0, 0],
      country: "",
      city: "",
      post_code: ""
    },

    bank_details: {
      account_holder_name: "",
      account_number: "",
      bank_name: "",
      sort_code: "",
    },
  });

  const { admin } = useAuth()

  const AddNewEmployees = async (e) => {
    e.preventDefault();
    const randomPassword = Math.floor(Math.random() * 90000000) + 10000000;
    const formData = new FormData();
    formData.append("name", employeeDetail.name);
    formData.append("designation_id", employeeDetail.designation_id);
    formData.append("department_id", employeeDetail.department_id);
    formData.append("office_id", employeeDetail.office_id);
    formData.append("country_code", employeeDetail.country_code);
    formData.append("phone", employeeDetail.phone);
    formData.append("email", employeeDetail.email);
    formData.append("password", randomPassword);
    formData.append("confirmPassword", randomPassword);
    formData.append("profile_image", employeeDetail.profile_image);
    // formData.append("bank_details",JSON.stringify(employeeDetail.bank_details));
    formData.append("subadmin_rights", JSON.stringify(employeeDetail.subadmin_rights));
    // formData.append("employee_address",JSON.stringify(employeeDetail.employee_address));
    formData.append("office_details", JSON.stringify({
      address: "167-169 Great Portland Street 5th Floor, London W1W 5PF",
      company_name: "Presshop Company",
      company_number: "7213241154",
      company_vat: "821321641",
      country_code: "23",
      name: "presshop",
      phone: "44121212121212"
    }
    ))

    console.log(admin?.office_details, employeeDetail)
    setLoading(true);
    try {
      const res = await Post(`admin/addEmployee`, formData);
      toast.success("New employee successfully added");
      setImagePreview(null);
      setEmployeeDetail({
        name: "",
        designation_id: "",
        department_id: "",
        office_id: "",
        country_code: "+44",
        phone: "",
        email: "",
        password: "",
        confirmPassword: "",
        profile_image: "",
        subadmin_rights: {
          onboardEmployess: false,
          blockRemoveEmployess: false,
          assignNewEmployeeRights: false,
          completeAccess: false,
          controlHopper: false,
          controlPublication: false,
          controlContent: false,
          viewRightOnly: false,
          other_rights: false
        },

        employee_address: {
          complete_address: "",
          coordinates: [0, 0],
          country: "",
          city: "",
          post_code: ""
        },

        bank_details: {
          account_holder_name: "",
          account_number: "",
          bank_name: "",
          sort_code: "",
        },
      });
      // history.push("/admin/default")
      setLoading(false);
    } catch (errors) {
      if (errors) {
        setLoading(false)
        toast.error(
          errors?.response?.data?.errors?.msg ===
            "Admin validation failed: email: EMAIL_IS_NOT_VALID"
            ? "This email is not valid"
            : errors?.response?.data?.errors?.msg === "EMAIL_ALREADY_EXISTS"
              ? "This email id already exists"
              : ""
        );
      }
    }
    // }
  };


  // get category

  const getCategory = async (type) => {
    try {
      const res = await Get(`admin/getCategory/${type}`);

      return res.data.categories;
    } catch (err) {
      console.log("<---Have a erro ->", err);
    }
  };

  const handleImage = (e) => {
    const file = e.target.files[0];

    setEmployeeDetail((previousValue) => {
      return { ...previousValue, profile_image: file };
    });
    const objectUrl = URL.createObjectURL(e.target.files[0]);
    setImagePreview(objectUrl);
    setImageSelected(true);
    if (
      employeeDetail.profile_image &&
      typeof employeeDetail.profile_image !== "string"
    ) {
      URL.revokeObjectURL(employeeDetail.profile_image);
    }
  };

  //  get office name

  const getOfficeName = async () => {
    await Get(`admin/get/office/details`).then((res) => {
      setOfficeName(res.data.office_details);
    });
  };

  useEffect(async () => {
    const designation = await getCategory("designation");
    setDesigation(designation);

    const department = await getCategory("department");
    setDepartment(department);

    getOfficeName();
  }, []);

  function handleCheckboxChange(event) {
    setIsChecked(event.target.checked);
    setOfficeDetail({
      office_name: "",
      phone: "",
      country_code: "",
      email: "",
      website: "",
      address: {
        pincode: "",
        country: "",
        city: "",
        complete_address: "",
        location: {
          coordinates: [],
        },
      },
    });
  }

  const handleStreetChange = (e) => {
    setOfficeDetail((prev) => ({
      ...prev,
      address: {
        complete_address: e.target.value
      }

    }))
  };

  const handlePopupOpen = () => {
    setShowPopup(true);
  };


  const onMapLoadStreet = (map) => {
    const searchBox = new window.google.maps.places.SearchBox(searchBoxRefStreet.current);
    searchBox.addListener("places_changed", () => {
      const places = searchBox.getPlaces();
      if (places.length === 0) {
        return;
      }
      const formattedAddress = places[0].formatted_address;
      const addressComponents = places[0].address_components;

      let city = "";
      let country = "";
      let postalCode = "";
      let latitude = places[0].geometry.location.lat();
      let longitude = places[0].geometry.location.lng();

      for (const component of addressComponents) {
        if (component.types.includes("locality")) {
          city = component.long_name;
        }
        if (component.types.includes("country")) {
          country = component.long_name;
        }
        if (component.types.includes("postal_code")) {
          postalCode = component.long_name;
        }
      }

      // Update the officeDetail state
      setOfficeDetail((prev) => ({
        ...prev,
        address: {
          pincode: postalCode,
          country: country,
          city: city,
          complete_address: formattedAddress,
          location: {
            coordinates: [latitude, longitude],
          },
        },
      }));
    });
  };

  // Phone input ref-
  const phoneInputRef = useRef(null);
  const handleCountryCodeChange = (e) => {
    phoneInputRef.current.focus();
  };


  return (
    <>
      {loading && <Loader />}
      <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
        <Card
          className="add_hopper admin_reg"
          direction="column"
          w="100%"
          px="0px"
          mb="24px"
          overflowX={{ sm: "scroll", lg: "hidden" }}
        >
          <Container className="inner_card_wrap" maxW="1000px" color="black">
            <div className="brd_wrap">
              <Flex justify="space-between" mb="25px" align="center">
                <Text
                  color={textColor}
                  fontSize="22px"
                  fontWeight="700"
                  lineHeight="100%"
                  fontFamily={"AirbnbBold"}
                >
                  Company details
                </Text>
              </Flex>
              <div className="dtl_wrap">
                <Flex
                  className="edit_inputs_wrap"
                  px="0px"
                  justify="space-between"
                  mb="25px"
                  align="center"
                >
                  <InputGroup flex={1}>
                    <InputLeftElement pointerEvents="none">
                      <img src={CmpIcon} alt="" />
                    </InputLeftElement>
                    <Input
                      className="disabled"
                      type="text"
                      disabled
                      value="Presso Media UK Limited"
                    />
                  </InputGroup>
                  <InputGroup flex={1}>
                    <InputLeftElement pointerEvents="none">
                      <img src={HashTag} alt="" />
                    </InputLeftElement>
                    <Input
                      className="disabled"
                      disabled
                      value="Company no 13522872"
                    />
                  </InputGroup>
                  <InputGroup flex={1}>
                    <InputLeftElement pointerEvents="none">
                      <img src={vat} alt="" />
                    </InputLeftElement>
                    <Input
                      className="disabled"
                      disabled
                      value="VAT no 6754 5532"
                    />
                  </InputGroup>
                </Flex>
              </div>
            </div>

            {/* office detail section start */}
            <form onSubmit={AddOffice}>
              <div className="brd_wrap pd_in">
                <Flex justify="space-between" mb="25px" align="center">
                  <Text
                    color={textColor}
                    fontSize="22px"
                    lineHeight="100%"
                    fontFamily={"AirbnbBold"}
                  >
                    Office details
                  </Text>
                </Flex>
                <div className="dtl_wrap">
                  <Flex
                    className="edit_inputs_wrap"
                    px="0px"
                    justify="space-between"
                    mb="20px"
                    align="center"
                  >
                    <InputGroup flex={1} maxW="307px">
                      <InputLeftElement pointerEvents="none">
                        <img src={offCup} alt="" />
                      </InputLeftElement>
                      <Input
                        disabled={!isChecked}
                        pattern="^(?!\s)[a-zA-Z\s&',.-]+$"
                        title="Please enter a valid office name"
                        value={officeDetail.office_name}
                        name="office_id"
                        onChange={(e) => {
                          setOfficeDetail((pre) => {
                            return { ...pre, office_name: e.target.value };
                          });
                        }}
                        required
                      />
                    </InputGroup>
                  </Flex>
                  <Flex
                    className="edit_inputs_wrap"
                    px="0px" justify="space-between"
                    mb="20px" align="center">
                    <InputGroup flex={1} className="inpu_n_cstm disable-bg" disabled>
                      <InputLeftElement pointerEvents="none">
                        <img className="location" src={location} alt="" />
                      </InputLeftElement>
                      <input
                        disabled={!isChecked}
                        placeholder="Enter residence address *"
                        name="street_address"
                        className="tsk_loc_inp form-control"
                        type="textarea"
                        value={officeDetail?.address?.complete_address}
                        onChange={handleStreetChange}
                        onFocus={handlePopupOpen}
                        onClick={handlePopupOpen}
                        ref={searchBoxRefStreet}
                        required
                      />
                      {showPopup && (
                        <div className="map-popup">
                          <GoogleMap
                            onLoad={onMapLoadStreet}
                          >
                          </GoogleMap>
                        </div>
                      )}
                    </InputGroup>
                    <InputGroup flex={0.3}>
                      <InputLeftElement pointerEvents="none">
                        <img className="location" src={location} alt="" />
                      </InputLeftElement>
                      <Input
                        pattern="^(?!\s)[\s\S]*$"
                        title="Please enter a value without white spaces at the start"
                        disabled={!isChecked}
                        value={officeDetail?.address?.pincode}
                        onChange={(e) =>
                          setOfficeDetail({
                            ...officeDetail,
                            address: {
                              ...officeDetail.address,
                              pincode: e.target.value,
                            },
                          })
                        }
                        required
                      />
                    </InputGroup>

                    <div className="select_wrapper loc_inp" flex={0.4}>
                      <img className="location-icon" src={location} alt="" />
                      <Input
                        className="icon_left_side"
                        value={officeDetail?.address?.city}
                        disabled
                      />
                    </div>

                    <div className="select_wrapper loc_inp" flex={0.4}>
                      <img className="location-icon " src={location} alt="" />
                      <Input
                        className="icon_left_side"
                        value={officeDetail?.address?.country}
                        disabled
                      />
                    </div>
                  </Flex>
                  <Flex
                    className="edit_inputs_wrap"
                    px="0px"
                    justify="space-between"
                    align="center"
                  >
                    <div className="numb_wrap">
                      <input
                        type="text"
                        className="numb_anthr_inp"
                        disabled={!isChecked}
                        pattern="^[0-9]{6,15}$"
                        title="Please enter a valid mobile number"
                        name="phone"
                        value={officeDetail?.phone}
                        onChange={(e) => {
                          setOfficeDetail((pre) => {
                            return { ...pre, phone: e.target.value };
                          });
                        }}
                        required
                      />

                      <PhoneInput
                        autoComplete="off"
                        className="f_1 cntry_code ofc_phn_wrp"
                        international
                        // defaultCountry="RU"
                        disabled={!isChecked}
                        value={value}
                        name="country_code"
                        onChange={(e) =>
                          setOfficeDetail((previousValue) => {
                            return { ...previousValue, country_code: e };
                          })
                        }
                        required
                      />
                      <div className="numb_flag">
                        <img src={flaguk} alt="" />
                      </div>
                    </div>

                    <InputGroup flex={1}>
                      <InputLeftElement pointerEvents="none">
                        <img src={Emailicon} alt="" />
                      </InputLeftElement>
                      <Input
                        disabled={!isChecked}
                        value={officeDetail?.email}
                        name="email"
                        pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                        title="Please enter a valid email address"
                        onChange={(e) => {
                          setOfficeDetail((pre) => {
                            return { ...pre, email: e.target.value };
                          });
                        }}
                        isRequired
                      />
                    </InputGroup>
                    <InputGroup flex={1}>
                      <InputLeftElement pointerEvents="none">
                        <img src={Globe} alt="" />
                      </InputLeftElement>
                      <Input
                        disabled={!isChecked}
                        value={officeDetail?.website}
                        name="website"
                        pattern="^(https?:\/\/)?(www\.)[a-zA-Z0-9]+([-.][a-zA-Z0-9]+)*\.[a-zA-Z]{2,}([\/\w\.-]*)*\/?$"
                        title="Please enter a valid website URL"
                        onChange={(e) => {
                          setOfficeDetail((pre) => {
                            return { ...pre, website: e.target.value };
                          });
                        }}
                        isRequired
                      />
                    </InputGroup>
                  </Flex>
                </div>
                <Flex
                  justify="space-between"
                  mt="25px"
                  mb="0px"
                  flexDirection="column"
                  align="start"
                >
                  <div className="check_wrap check_wrapper">
                    <Checkbox
                      colorScheme="brandScheme"
                      me="10px"
                      checked={isChecked}
                      isDisabled={profile?.subadmin_rights?.viewRightOnly && !profile?.subadmin_rights?.onboardEmployess}
                      onChange={handleCheckboxChange}
                    />
                    <span>Onboard another office</span>
                  </div>
                </Flex>
                <Flex justify="center" mt="20px" align="center">
                  <Button
                    className="admin_dtl_save"
                    type="submit"
                    disabled={!isChecked}
                  >
                    Save
                  </Button>
                </Flex>
              </div>
            </form>

            <form onSubmit={AddNewEmployees}>
              <div className="brd_wrap">
                <Flex justify="space-between" mb="25px" align="center">
                  <Text
                    color={textColor}
                    fontSize="22px"
                    fontWeight="700"
                    lineHeight="100%"
                    fontFamily={"AirbnbBold"}
                  >
                    New employee details
                  </Text>
                </Flex>
                <Flex gap="25px" mb="" align="start">
                  <div className="dtl_wrap admn_details">
                    <Flex
                      className="edit_inputs_wrap"
                      justify="space-between"
                      mb="20px"
                      align="start"
                    >
                      <InputGroup flex={1}>
                        <InputLeftElement pointerEvents="none">
                          <img src={hopper} alt="" />
                        </InputLeftElement>
                        <Input
                          placeholder="Enter full name *"
                          value={employeeDetail.name}
                          isDisabled={profile?.subadmin_rights?.viewRightOnly && !profile?.subadmin_rights?.onboardEmployess}
                          name="name"
                          pattern="^(?! )[a-zA-Z\s'-]+$"
                          title="Please enter a valid first name"
                          autoComplete="off"
                          onChange={(e) => {
                            setEmployeeDetail((pre) => {
                              return { ...pre, name: e.target.value };
                            });
                          }}
                          isRequired
                        />
                      </InputGroup>
                      <InputGroup flex={1}>
                        <InputLeftElement pointerEvents="none">
                          <img src={chair} alt="" />
                        </InputLeftElement>
                        <div className="select_wrapper w-slct">
                          {/* <img className="location-icon " src={chair} alt="" /> */}
                          <Select
                            className="icon_left_side w_100"
                            placeholder="Select designation *"
                            value={employeeDetail.designation_id}
                            isDisabled={profile?.subadmin_rights?.viewRightOnly && !profile?.subadmin_rights?.onboardEmployess}
                            onChange={(e) => {
                              setEmployeeDetail((pre) => {
                                return { ...pre, designation_id: e.target.value };
                              });
                            }}
                            isRequired
                          >
                            {designation &&
                              designation.map((curr, index) => {
                                return (
                                  <option key={index} value={curr._id}>
                                    {curr.name}
                                  </option>
                                );
                              })}
                          </Select>
                        </div>
                      </InputGroup>
                      <div className="select_wrapper w-slct">
                        <img className="location-icon " src={chair} alt="" />
                        <Select
                          className="icon_left_side"
                          placeholder="Select department *"
                          value={employeeDetail.department_id}
                          isDisabled={profile?.subadmin_rights?.viewRightOnly && !profile?.subadmin_rights?.onboardEmployess}

                          onChange={(e) => {
                            setEmployeeDetail((pre) => {
                              return { ...pre, department_id: e.target.value };
                            });
                          }}
                          isRequired
                        >
                          {department &&
                            department.map((curr, index) => {
                              return (
                                <option key={index} value={curr._id}>
                                  {curr.name}
                                </option>
                              );
                            })}
                        </Select>
                      </div>
                    </Flex>
                    <Flex
                      className="edit_inputs_wrap"
                      justify="start"
                      mb="20px"
                      align="start "
                    >
                      <InputGroup flex={1}>
                        <InputLeftElement pointerEvents="none">
                          <img src={Emailicon} alt="" />
                        </InputLeftElement>
                        <Input
                          placeholder="Official email id *"
                          pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                          title="Please enter a valid email address"
                          value={employeeDetail.email}
                          isDisabled={profile?.subadmin_rights?.viewRightOnly && !profile?.subadmin_rights?.onboardEmployess}
                          name="email"
                          onChange={(e) => {
                            setEmployeeDetail((pre) => {
                              return { ...pre, email: e.target.value };
                            });
                          }}
                          isRequired
                        />
                      </InputGroup>
                      <div className="numb_wrap f_1 emp_numb">
                        <input
                          placeholder="Mobile Number*"
                          type="number"
                          className="numb_anthr_inp"
                          name="phone"
                          pattern="^[0-9]{6,15}$"
                          title="Please enter a valid mobile number"
                          value={employeeDetail.phone}
                          disabled={profile?.subadmin_rights?.viewRightOnly && !profile?.subadmin_rights?.onboardEmployess}

                          onChange={(e) => {
                            setEmployeeDetail((pre) => {
                              return { ...pre, phone: e.target.value };
                            });
                          }}
                          maxLength={12}
                          required
                          ref={phoneInputRef}
                        />
                        <PhoneInput
                          autoComplete="off"
                          className="f_1 cntry_code"
                          international
                          id="phone"
                          required
                          // defaultCountry="RU"
                          value={value1}
                          disabled={profile?.subadmin_rights?.viewRightOnly && !profile?.subadmin_rights?.onboardEmployess}
                          name="country_code"
                          onChange={(e) => {
                            setEmployeeDetail((previousValue) => {
                              return { ...previousValue, country_code: e };
                            })
                            handleCountryCodeChange(e)
                          }
                          }
                        />
                      </div>

                      <div className="select_wrapper w-slct">
                        <img src={chair} className="location-icon" alt="" />
                        <Select
                          className="icon_left_side"
                          placeholder="Select office name  *"
                          value={employeeDetail.office_id}
                          isDisabled={profile?.subadmin_rights?.viewRightOnly && !profile?.subadmin_rights?.onboardEmployess}

                          onChange={(e) => {
                            setEmployeeDetail((pre) => {
                              return { ...pre, office_id: e.target.value };
                            });
                          }}
                          isRequired
                        >
                          {officeName &&
                            officeName.map((curr, index) => {
                              return (
                                <option key={index} value={curr._id}>
                                  {curr.office_name}
                                </option>
                              );
                            })}
                        </Select>
                      </div>
                    </Flex>
                    {/* <Flex
                      className="edit_inputs_wrap"
                      justify="start"
                      mb="25px"
                      align="center"
                    >
                      <InputGroup
                        flex={1}
                        maxW="255px"
                        className="chkra_password_grp"
                      >
                        <InputLeftElement pointerEvents="none">
                          <img src={lock} alt="" />
                        </InputLeftElement>
                        <Input
                          type={passwordShown === true ? "text" : "password"}
                          placeholder="Choose password *"
                          className="chkra_inpu_pass"
                          name="password"
                          autoComplete="new-password"
                          pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,}$"
                          title="Password must contain at least 8 characters including one uppercase letter, one lowercase letter, one digit, and one special character"
                          value={employeeDetail.password}
                          isDisabled={profile?.subadmin_rights?.viewRightOnly && !profile?.subadmin_rights?.onboardEmployess}

                          onChange={(e) => {
                            setEmployeeDetail((pre) => {
                              return { ...pre, password: e.target.value };
                            });
                          }}
                          isRequired
                        />
                        <InputRightElement
                          onClick={() => togglePasswordVisiblity()}
                        >
                          <img src={eye} alt="" />
                        </InputRightElement>
                      </InputGroup>
                      <InputGroup
                        flex={1}
                        maxW="255px"
                        className="chkra_password_grp"
                      >
                        <InputLeftElement pointerEvents="none">
                          <img src={lock} alt="" />
                        </InputLeftElement>
                        <Input
                          type={confirmPasswordShown ? "text" : "password"}
                          placeholder="Choose password *"
                          className="chkra_inpu_pass"
                          pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,}$"
                          title="Password must contain at least 8 characters including one uppercase letter, one lowercase letter, one digit, and one special character"
                          name="confirmPassword"
                          isDisabled={profile?.subadmin_rights?.viewRightOnly && !profile?.subadmin_rights?.onboardEmployess}

                          autoComplete="off"
                          value={employeeDetail.confirmPassword}
                          onChange={(e) => {
                            setEmployeeDetail((pre) => {
                              return { ...pre, confirmPassword: e.target.value };
                            });
                          }}
                          isRequired
                        />
                        {!passwordsMatch && <div>Passwords do not match</div>}
                        <InputRightElement>
                          <img
                            src={eye}
                            alt=""
                            onClick={toggleConfirmPasswordVisiblity}
                          />
                        </InputRightElement>
                      </InputGroup>
                    </Flex> */}
                  </div>
                  <div className="dtl_wrap_img">
                    <div className="Admin_img" align="center">
                      <div className="edit_img_curr">
                        {!imageSelected && (
                          <>
                            <img src={AddPic} alt=" admin avatar" />
                            <p>Add current photo</p>
                          </>
                        )}
                        <input
                          type="file"
                          id="admin_img_curr"
                          name="profile_image"
                          value={employeeDetail.profile_image[0]}
                          disabled={profile?.subadmin_rights?.viewRightOnly && !profile?.subadmin_rights?.onboardEmployess}
                          isRequired
                          onChange={handleImage}
                          accept="image/*"
                          required
                        />
                        {imagePreview && (
                          <img
                            src={imagePreview}
                            className="uploaded_img nimg"
                            alt="Preview"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </Flex>
              </div>

              {/* <div className="brd_wrap pd_in pdng_tp new_emp_prsn_dtl">
                <Flex justify="space-between" mb="25px" mt="25px" align="center">
                  <Text
                    color={textColor}
                    fontSize="22px"
                    fontWeight="700"
                    lineHeight="100%"
                    fontFamily={"AirbnbBold"}
                  >
                    New employee personal details
                  </Text>
                </Flex>
                <div className="dtl_wrap">
                  <Flex
                    className="edit_inputs_wrap"
                    px="0px"
                    justify="space-between"
                    mb="20px"
                    align="center"
                  >
                    <InputGroup flex={1} className="inpu_n_cstm ">
                      <InputLeftElement pointerEvents="none">
                        <img className="location" src={location} alt="" />
                      </InputLeftElement>
                      <input
                        placeholder="Enter residence address *"
                        name="street_address"
                        className="tsk_loc_inp form-control"
                        type="textarea"
                        value={employeeDetail?.employee_address?.complete_address}
                        onChange={handleStreetChange1}
                        onFocus={handlePopupOpen1}
                        onClick={handlePopupOpen1}
                        ref={searchBoxRefStreet1}
                        required
                      />
                      {showPopup1 && (
                        <div className="map-popup">
                          <GoogleMap
                            onLoad={onMapLoadStreet1}
                          >
                          </GoogleMap>
                        </div>
                      )}
                    </InputGroup>
                    <InputGroup flex={0.3}>
                      <InputLeftElement pointerEvents="none">
                        <img className="location" src={location} alt="" />
                      </InputLeftElement>
                      <Input
                        placeholder="Post code*"
                        className="disabled"
                        pattern="^(?!\s)[\s\S]*$"
                        title="Please enter a value without white spaces at the start"
                        value={employeeDetail.employee_address.post_code}
                        disabled={profile?.subadmin_rights?.viewRightOnly && !profile?.subadmin_rights?.onboardEmployess}

                        onChange={(e) =>
                          setEmployeeDetail((prevState) => ({
                            ...prevState,
                            employee_address: {
                              ...prevState.employee_address,
                              post_code: e.target.value,
                            },
                          }))
                        }
                        required
                      />
                    </InputGroup>

                    <div className="select_wrapper" flex={0.4}>
                      <img className="location-icon " src={location} alt="" />
                      <Input
                        placeholder="City"
                        className="icon_left_side no_dsbl"
                        value={employeeDetail.employee_address.city}
                        disabled
                      />
                    </div>

                    <div className="select_wrapper" flex={0.4}>
                      <img className="location-icon " src={location} alt="" />
                      <Input
                        placeholder="Country"
                        className="icon_left_side no_dsbl"
                        value={employeeDetail.employee_address.country}
                        disabled
                      />
                    </div>
                  </Flex>
                  <Flex
                    className="edit_inputs_wrap"
                    px="0px"
                    justify="space-between"
                    align="center"
                  >
                    <InputGroup flex={1}>
                      <InputLeftElement>
                        <img src={useric} alt="" />
                      </InputLeftElement>
                      <Input
                        placeholder="Enter bank holder name *"
                        value={employeeDetail.bank_details.account_holder_name}
                        pattern="^(?! )[a-zA-Z\s'-]+$"
                        title="Please enter a valid bank holder name"
                        disabled={profile?.subadmin_rights?.viewRightOnly && !profile?.subadmin_rights?.onboardEmployess}

                        onChange={(e) =>
                          setEmployeeDetail((prevState) => ({
                            ...prevState,
                            bank_details: {
                              ...prevState.bank_details,
                              account_holder_name: e.target.value,
                            },
                          }))
                        }
                        required
                      />
                    </InputGroup>
                    <InputGroup flex={1}>
                      <InputLeftElement>
                        <img src={bankic} alt="" />
                      </InputLeftElement>
                      <Input
                        placeholder="Enter bank name *"
                        pattern="^(?!^\s)(?!.*\s$)[a-zA-Z0-9\s]+$"
                        title="Please enter a valid bank name without white spaces at the start or end"
                        value={employeeDetail.bank_details.bank_name}
                        disabled={profile?.subadmin_rights?.viewRightOnly && !profile?.subadmin_rights?.onboardEmployess}

                        onChange={(e) =>
                          setEmployeeDetail((prevState) => ({
                            ...prevState,
                            bank_details: {
                              ...prevState.bank_details,
                              bank_name: e.target.value,
                            },
                          }))
                        }
                        required
                      />
                    </InputGroup>
                    <InputGroup flex={0.7}>
                      <InputLeftElement>
                        <img src={sortcodeic} alt="" />
                      </InputLeftElement>
                      <Input
                        placeholder="Enter sort code *"
                        pattern="^(?!^\s)(?!.*\s$)[a-zA-Z0-9\s]+$"
                        title="please enter valid sort code"
                        value={employeeDetail.bank_details.sort_code}
                        disabled={profile?.subadmin_rights?.viewRightOnly && !profile?.subadmin_rights?.onboardEmployess}

                        onChange={(e) =>
                          setEmployeeDetail((prevState) => ({
                            ...prevState,
                            bank_details: {
                              ...prevState.bank_details,
                              sort_code: e.target.value,
                            },
                          }))
                        }
                        required
                      />
                    </InputGroup>
                    <InputGroup flex={1}>
                      <InputLeftElement>
                        <img src={accountic} alt="" />
                      </InputLeftElement>
                      <Input
                        placeholder="Enter account number *"
                        pattern="^[a-zA-Z0-9]+$"
                        title="Please enter a valid account number"
                        value={employeeDetail.bank_details.account_number}
                        disabled={profile?.subadmin_rights?.viewRightOnly && !profile?.subadmin_rights?.onboardEmployess}

                        onChange={(e) =>
                          setEmployeeDetail((prevState) => ({
                            ...prevState,
                            bank_details: {
                              ...prevState.bank_details,
                              account_number: e.target.value,
                            },
                          }))
                        }
                        required
                      />
                    </InputGroup>
                  </Flex>
                </div>
              </div> */}
              {/*  New Employee Rights*/}
              {profile?.subadmin_rights?.assignNewEmployeeRights &&
                <div className="pdng_tp">
                  <Flex justify="space-between" mb="25px" mt={6} align="center">
                    <Text
                      color={textColor}
                      fontSize="22px"
                      fontWeight="700"
                      lineHeight="100%"
                      fontFamily={"AirbnbBold"}
                    >
                      New Employee rights
                    </Text>
                  </Flex>
                  <Flex
                    className="rights_check_wrap"
                    justify="space-between"
                    mb="20px"
                    align="start"
                  >
                    <div className="check_wrap check_wrapper rights_check">
                      <Checkbox
                        colorScheme="brandScheme"
                        me="10px"
                        name="subadmin_rights.onboardEmployess"
                        isChecked={employeeDetail?.subadmin_rights?.onboardEmployess}
                        onChange={(e) =>
                          setEmployeeDetail({
                            ...employeeDetail,
                            subadmin_rights: {
                              ...employeeDetail.subadmin_rights,
                              onboardEmployess: e.target.checked,
                            },
                          })
                        }
                      />
                      <span>Allowed to onboard employees</span>
                    </div>
                    <div className="check_wrap check_wrapper rights_check">
                      <Checkbox
                        colorScheme="brandScheme"
                        me="10px"
                        name="subadmin_rights.blockRemoveEmployess"
                        isChecked={employeeDetail?.subadmin_rights?.blockRemoveEmployess}
                        onChange={(e) =>
                          setEmployeeDetail({
                            ...employeeDetail,
                            subadmin_rights: {
                              ...employeeDetail.subadmin_rights,
                              blockRemoveEmployess: e.target.checked,
                            },
                          })
                        }
                      />
                      <span>Allowed to block/remove employees </span>
                    </div>
                    <div className="check_wrap check_wrapper rights_check">
                      <Checkbox
                        colorScheme="brandScheme"
                        me="10px"
                        name="subadmin_rights.assignNewEmployeeRights"
                        isChecked={
                          employeeDetail.subadmin_rights.assignNewEmployeeRights
                        }
                        onChange={(e) =>
                          setEmployeeDetail({
                            ...employeeDetail,
                            subadmin_rights: {
                              ...employeeDetail.subadmin_rights,
                              assignNewEmployeeRights: e.target.checked,
                            },
                          })
                        }
                      />
                      <span>Allowed to assign new employee rights</span>
                    </div>
                    <div className="check_wrap check_wrapper rights_check">
                      <Checkbox
                        colorScheme="brandScheme"
                        me="10px"
                        name="subadmin_rights.completeAccess"

                        isChecked={employeeDetail.subadmin_rights.completeAccess}

                        onChange={(e) =>
                          setEmployeeDetail({
                            ...employeeDetail,
                            subadmin_rights: {
                              ...employeeDetail?.subadmin_rights,
                              completeAccess: e.target.checked,
                              onboardEmployess: e.target.checked,
                              controlHopper: e.target.checked,
                              controlPublication: e.target.checked,
                              controlContent: e.target.checked,
                              assignNewEmployeeRights: e.target.checked,
                              blockRemoveEmployess: e.target.checked,
                              viewRightOnly: e.target.checked,
                              other_rights: e.target.checked
                            },
                          })
                        }
                      />
                      <span>Allowed admin rights</span>
                    </div>
                  </Flex>
                  <Flex
                    className="rights_check_wrap"
                    justify="space-between"
                    mb="20px"
                    align="start">
                    <div className="check_wrap check_wrapper rights_check">
                      <Checkbox
                        colorScheme="brandScheme"
                        me="10px"
                        name="subadmin_rights.controlHopper"
                        isChecked={employeeDetail.subadmin_rights.controlHopper}
                        onChange={(e) =>
                          setEmployeeDetail({
                            ...employeeDetail,
                            subadmin_rights: {
                              ...employeeDetail.subadmin_rights,
                              controlHopper: e.target.checked,
                            },
                          })
                        }
                      />
                      <span>Allowed to control Hoppers</span>
                    </div>
                    <div className="check_wrap check_wrapper rights_check">
                      <Checkbox
                        colorScheme="brandScheme"
                        me="10px"
                        name="subadmin_rights.controlPublication
                    "
                        isChecked={employeeDetail.subadmin_rights.controlPublication}
                        onChange={(e) =>
                          setEmployeeDetail({
                            ...employeeDetail,
                            subadmin_rights: {
                              ...employeeDetail.subadmin_rights,
                              controlPublication: e.target.checked,
                            },
                          })
                        }
                      />
                      <span>Allowed to control Publications </span>
                    </div>
                    <div className="check_wrap check_wrapper rights_check">
                      <Checkbox
                        colorScheme="brandScheme"
                        me="10px"
                        name="subadmin_rights.controlContent
                    "
                        isChecked={employeeDetail.subadmin_rights.controlContent}
                        onChange={(e) =>
                          setEmployeeDetail({
                            ...employeeDetail,
                            subadmin_rights: {
                              ...employeeDetail.subadmin_rights,
                              controlContent: e.target.checked,
                            },
                          })
                        }
                      />
                      <span>Allowed to control Content </span>
                    </div>
                    <div className="check_wrap check_wrapper rights_check">
                      <Checkbox
                        colorScheme="brandScheme"
                        me="10px"
                        name="subadmin_rights.viewRightOnly
                    "
                        isChecked={employeeDetail.subadmin_rights.viewRightOnly}
                        onChange={(e) =>
                          setEmployeeDetail({
                            ...employeeDetail,
                            subadmin_rights: {
                              ...employeeDetail.subadmin_rights,
                              viewRightOnly: e.target.checked,
                            },
                          })
                        }
                      />
                      <span>Viewing rights only</span>
                    </div>
                  </Flex>
                  <Flex
                    className="rights_check_wrap"
                    justify="space-between"
                    mb="20px"
                    align="start">
                    <div className="check_wrap check_wrapper rights_check">
                      <Checkbox
                        colorScheme="brandScheme"
                        me="10px"
                        name="subadmin_rights.other_rights"
                        isChecked={employeeDetail.subadmin_rights.other_rights}
                        onChange={(e) =>
                          setEmployeeDetail({
                            ...employeeDetail,
                            subadmin_rights: {
                              ...employeeDetail.subadmin_rights,
                              other_rights: e.target.checked,
                            },
                          })
                        }
                      />
                      <span>Allowed product master editing</span>
                    </div>
                    <div className="check_wrap check_wrapper rights_check">
                      <Checkbox
                        colorScheme="brandScheme"
                        me="10px"
                        name="subadmin_rights.allow_publication_chat"
                        isChecked={employeeDetail.subadmin_rights.allow_publication_chat}
                        onChange={(e) =>
                          setEmployeeDetail({
                            ...employeeDetail,
                            subadmin_rights: {
                              ...employeeDetail.subadmin_rights,
                              allow_publication_chat: e.target.checked,
                            },
                          })
                        }
                      />
                      <span>Allowed to chat with the Publications</span>
                    </div>
                    <div className="check_wrap check_wrapper rights_check">
                      <Checkbox
                        colorScheme="brandScheme"
                        me="10px"
                        name="subadmin_rights.allow_hopper_chat"
                        isChecked={employeeDetail.subadmin_rights.allow_hopper_chat}
                        onChange={(e) =>
                          setEmployeeDetail({
                            ...employeeDetail,
                            subadmin_rights: {
                              ...employeeDetail.subadmin_rights,
                              allow_hopper_chat: e.target.checked,
                            },
                          })
                        }
                      />
                      <span>Allowed to chat with the Hoppers</span>
                    </div>
                    <div className="check_wrap check_wrapper rights_check">
                    </div>

                    {
                      console.log("employeeDetail", employeeDetail)
                    }

                  </Flex>
                </div>}
              <Flex justify="center" mb="20px" align="center">

                {((profile?.subadmin_rights?.viewRightOnly && profile?.subadmin_rights?.onboardEmployess) || profile?.subadmin_rights?.onboardEmployess) ? (
                  <Button className="admin_dtl_save" type="onsubmit">
                    Save
                  </Button>
                ) : null}

              </Flex>
            </form>
          </Container>
        </Card>
      </Box>
    </>
  );
}
