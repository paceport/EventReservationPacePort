import DataTable from "react-data-table-component";
import React from "react";

const customStyles = {
  tableWrapper: {
    style: {
      backgroundColor: "#F2F2F2",
      padding: "20px",
      width: "100%",
      overflowX: "auto",
    },
  },
  table: {
    style: {
      backgroundColor: "none",
    },
  },

  rows: {
    style: {
      marginTop: "2px",
      color: "black",
      minHeight: "30px",
      borderRadius: "8px",
      border: "2px",
      borderColor: "grey",
      width: "100%",
    },
  },
  headCells: {
    style: {
      color: "white",
      fontSize: "10px",
      textAlign: "center",
      letterSpacing: "0.5px",
      position: "relative",
    },
  },

  cells: {
    style: {
      width: "10px",
      alignItems: "center",
      justifyContent: "inherit",
      color: "black",
      fontSize: "12px",
      wordBreak: "break-word",
      "&:hover": {
        cursor: "pointer",
      },
    },
  },
  headRow: {
    style: {
      minHeight: "40px",
      borderColor: "green",
      borderRadius: "10px",
      backgroundColor: "black",
      width: "100%",
    },
  },
  head: {
    style: {
      borderColor: "green",
      height: "40px",
    },
  },
};

export default function Tableview({ data, columns }) {
  return (
    <DataTable
      columns={columns}
      data={data}
      customStyles={customStyles}
      highlightOnHover
      responsive
    ></DataTable>
  );
}


