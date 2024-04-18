

// Chakra imports
import React, { useContext, useState } from "react";
// new imports end

export default function Loader() {
  return (
    <>
      {/* {    console.log(taskCount?.live_published_content?.count,`<taskCount?.live_published_content?.count`)
} */}
        <div className='ldr_ldr'>
           <span className="loader"></span>
        </div>
        {/* Loader end */}
    </>
  );
}
