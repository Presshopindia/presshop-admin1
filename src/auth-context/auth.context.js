import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Get } from "api/admin.services";

const AuthContext = React.createContext(null);

export const AuthProvider = ({ userData, children }) => {
  let [user, setUser] = React.useState(userData);
  user = typeof user === "string" ? JSON.parse(user) : user;


  const [changeProfile, setChangeProfile] = useState(false);
  const [admin, setAdmin] = useState();
  const getProfile = async () => {
    try {
      const result = await Get("admin/getProfile");
      setAdmin(result?.data?.profileData)
    }
    catch (error) {
      // console.log(error);
    }
  }
  useEffect(() => {
    getProfile()
  }, [changeProfile])


  return <AuthContext.Provider value={{ user, setUser, setChangeProfile, admin }}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  userData: PropTypes.any,
  children: PropTypes.any,
};

export const useAuth = () => React.useContext(AuthContext);
