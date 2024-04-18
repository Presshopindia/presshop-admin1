import { Box, useStyleConfig } from "@chakra-ui/react";
import weblogo from "assets/img/weblogo.svg";
function SignNHeader(){
//   const { variant, children, ...rest } = props;
//   const styles = useStyleConfig("Card", { variant });

  return (
    <Box>
      <div className="sign_header_wrap">
          <img src={weblogo} alt="" />
      </div>
    </Box>
  );
}

export default SignNHeader;


