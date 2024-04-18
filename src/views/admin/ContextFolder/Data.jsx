import { Get } from "api/admin.services";
import dataContext from "./Createcontext";
import { useState, useEffect } from "react";

const Data = (props) => {
  const [profile, setProfile] = useState({});
  const getprofile = async () => {

    try {
      await Get(`admin/getProfile`).then((res) => {
        // console.log(res?.data?.profileData,`<-----------response of profile`)
        if(res){
        setProfile(res?.data?.profileData)
        }
      })

    } catch (err) {
      // console.log(err)
    }

  }
  useEffect(() => {
    getprofile()
  }, [])

  return (
    <dataContext.Provider value={{ profile, setProfile }}>
      {props.children}

    </dataContext.Provider>
  )


}
export default Data