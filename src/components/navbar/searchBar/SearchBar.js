import React, { useState, useEffect } from "react";
import {
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  useColorModeValue,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { Get } from "api/admin.services";
import { Post } from "api/admin.services";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
export function SearchBar(props) {
  // Pass the computed styles into the `__css` prop
  const { variant, background, children, placeholder, borderRadius, ...rest } =
    props;
  // Chakra Color Mode
  const searchIconColor = useColorModeValue("gray.700", "white");
  const inputBg = useColorModeValue("secondaryGray.300", "navy.900");
  const inputText = useColorModeValue("gray.700", "gray.100");
  const [searchInput, setSearchInput] = useState("")
  const [hastags, setHastags] = useState([])
  const [mounted, setMounted] = useState(true); // Flag to track mount status
  const history = useHistory();

  const getHastags = async () => {
    try {
      await Get(`admin/getTags?tagName=${searchInput}`).then((res) => {
        if (mounted) {
          setHastags(res?.data?.tags || []);
        }
      })
    } catch (error) {

    }
  }


  useEffect(() => {

    const debounce = setTimeout(() => {
      history.push(`/admin/searched-content-list/${searchInput}/Searched content`)
      // getHastags(searchInput)
    }, [500])

    return () => {
      clearTimeout(debounce)
    }
  }, [searchInput])

  useEffect(() => {
    return () => {
      // Cleanup function to update mounted flag when unmounting
      setMounted(false);
    };
  }, []);
  return (

    <InputGroup position={"relative"} w={{ base: "100%", md: "200px" }} {...rest}>
      {/* {console.log(hastags, `<---`)} */}
      <InputLeftElement
        children={
          <IconButton
            bg='inherit'
            borderRadius='inherit'
            _hover='none'
            _active={{
              bg: "inherit",
              transform: "none",
              borderColor: "transparent",
            }}
            _focus={{
              boxShadow: "none",
            }}
            icon={
              <SearchIcon color={searchIconColor} w='15px' h='15px' />
            }></IconButton>
        }
      />
      <Input
        variant='search'
        fontSize='sm'
        bg={background ? background : inputBg}
        color={inputText}
        fontWeight='500'
        _placeholder={{ color: "gray.400", fontSize: "14px" }}
        borderRadius={borderRadius ? borderRadius : "30px"}
        placeholder={placeholder ? placeholder : "Search content"}
        onChange={(e) => setSearchInput(e.target.value)}
      />

      {/* {searchInput &&
        <div className="srched_wrap">
          <ul className="srched_list">
            {hastags && hastags?.map((curr) => {
              return (
                <li >
                  <Link onClick={() => {
                    history.push(`/admin/searched-content-list/${curr?._id}/Searched content`)
                    setSearchInput("")


                  }} className="srch_link">
                    {curr?.name}
                  </Link>
                </li>

              )
            })

            }
          </ul>
          
        </div>} */}
    </InputGroup>
  );
}
