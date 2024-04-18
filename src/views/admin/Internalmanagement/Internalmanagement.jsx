

// Chakra imports
import { Box, SimpleGrid } from "@chakra-ui/react";
import DevelopmentTable from "./components/DevelopmentTable";
// import CheckTable from "./components/CheckTable";
// import ColumnsTable from "./components/ColumnsTable";
// import ComplexTable from "./components/ComplexTable";
import {
  columnsDataDevelopment,
  // columnsDataCheck,
  // columnsDataColumns,
  // columnsDataComplex,
} from "views/admin/Internalmanagement/variables/columnsData";
import tableDataDevelopment from "views/admin/Internalmanagement/variables/tableDataDevelopment.json";
// import tableDataCheck from "views/admin/Internalmanagement/variables/tableDataCheck.json";
// import tableDataColumns from "views/admin/Internalmanagement/variables/tableDataColumns.json";
// import tableDataComplex from "views/admin/Internalmanagement/variables/tableDataComplex.json";
import React from "react";

export default function Internalmanagement() {
  // Chakra Color Mode
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
        mb='20px'
        columns={{ sm: 1, md: 2 }}
        spacing={{ base: "20px", xl: "20px" }}>
        <DevelopmentTable
          columnsData={columnsDataDevelopment}
          tableData={tableDataDevelopment}
        />
        {/* <CheckTable columnsData={columnsDataCheck} tableData={tableDataCheck} /> */}
        {/* <ColumnsTable
          columnsData={columnsDataColumns}
          tableData={tableDataColumns}
        /> */}
        {/* <ComplexTable
          columnsData={columnsDataComplex}
          tableData={tableDataComplex}
        /> */}
      </SimpleGrid>
    </Box>
  );
}
