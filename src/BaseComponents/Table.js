/*eslint-disable*/
import React from "react";
import {
  useTable,
  useFilters,
  useAsyncDebounce,
  useSortBy,
  usePagination
} from "react-table";
import classnames from "classnames";
// A great library for fuzzy filtering/sorting items
import matchSorter from "match-sorter";
// @mui/material components
import { makeStyles } from "@mui/styles";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputLabel from "@mui/material/InputLabel";
import Switch from "@mui/material/Switch";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
// core components
import Input from "./Input.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import GridItem from "../../components/Grid/GridItem.js";

import {
    primaryColor,
    primaryBoxShadow,
    whiteColor,
    blackColor,
    grayColor,
    hexToRgb
  } from "./Colors.js";

const styles = {
    select: {
      padding: "12px 0 7px",
      fontSize: ".75rem",
      fontWeight: "600",
      lineHeight: "1.42857",
      textDecoration: "none",
      textTransform: "none",
      color: grayColor[2],
      letterSpacing: "0",
      "&:focus": {
        backgroundColor: "transparent"
      },
      "&[aria-owns] + input + svg": {
        transform: "rotate(180deg)"
      },
      "& + input + svg": {
        transition: "all 300ms linear"
      }
    },
    selectFormControl: {
      margin: "7px 0 17px 0 !important",
      "& > div": {
        "&:before": {
          borderBottomWidth: "1px !important",
          borderBottomColor: grayColor[19] + "!important"
        },
        "&:after": {
          borderBottomColor: primaryColor[0] + "!important"
        }
      }
    },
    selectLabel: {
      fontSize: "12px",
      textTransform: "none",
      color: grayColor[19] + " !important",
      top: "8px"
    },
    selectMenu: {
      "& > div > ul": {
        border: "0",
        padding: "5px 0",
        margin: "0",
        boxShadow: "none",
        minWidth: "100%",
        borderRadius: "4px",
        boxSizing: "border-box",
        display: "block",
        fontSize: "14px",
        textAlign: "left",
        listStyle: "none",
        backgroundColor: whiteColor,
        backgroundClip: "padding-box"
      },
      "& $selectPaper $selectMenuItemSelectedMultiple": {
        backgroundColor: "inherit"
      },
      "& > div + div": {
        maxHeight: "266px !important"
      }
    },
    selectMenuItem: {
      fontSize: "13px",
      padding: "10px 20px",
      margin: "0 5px",
      borderRadius: "2px",
      transition: "all 150ms linear",
      display: "block",
      clear: "both",
      fontWeight: "400",
      lineHeight: "2",
      whiteSpace: "nowrap",
      color: grayColor[7],
      paddingRight: "30px",
      "&:hover": {
        backgroundColor: primaryColor[0],
        color: whiteColor,
        ...primaryBoxShadow
      }
    },
    selectMenuItemSelected: {
      backgroundColor: primaryColor[0] + "!important",
      color: whiteColor
    },
    selectMenuItemSelectedMultiple: {
      backgroundColor: "transparent !important",
      "&:hover": {
        backgroundColor: primaryColor[0] + "!important",
        color: whiteColor,
        ...primaryBoxShadow,
        "&:after": {
          color: whiteColor
        }
      },
      "&:after": {
        top: "16px",
        right: "12px",
        width: "12px",
        height: "5px",
        borderLeft: "2px solid currentColor",
        transform: "rotate(-45deg)",
        opacity: "1",
        color: grayColor[2],
        position: "absolute",
        content: "''",
        borderBottom: "2px solid currentColor",
        transition: "opacity 90ms cubic-bezier(0,0,.2,.1)"
      }
    },
    selectPaper: {
      boxSizing: "borderBox",
      borderRadius: "4px",
      padding: "0",
      minWidth: "100%",
      display: "block",
      border: "0",
      boxShadow: "0 2px 5px 0 rgba(" + hexToRgb(blackColor) + ", 0.75)",
      backgroundClip: "padding-box",
      margin: "2px 0 0",
      fontSize: "14px",
      textAlign: "left",
      listStyle: "none",
      backgroundColor: "transparent",
      maxHeight: "266px"
    }
  };

const newStyles = {
  ...styles,
  formControlMargins: {
    margin: "3px 0 !important"
  },
  gridContainer: {
    justifyContent: "center"
  }
};

const useStyles = makeStyles(newStyles);

// Define a default UI for filtering
function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter }
}) {
  const count = preFilteredRows.length;
//   return null;
  return (
    <Input
      formControlProps={{
        fullWidth: true
      }}
      inputProps={{
        value: filterValue || "",
        onChange: e => {
          setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
        },
        placeholder: `Search ${count} records...`
      }}
    />
  );
}

function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [row => row.values[id]] });
}

// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = val => !val;

// Our table component
function Table({ columns, data }) {
  const [numberOfRows, setNumberOfRows] = React.useState(10);
  const [pageSelect, handlePageSelect] = React.useState(0);
  const classes = useStyles();
  const filterTypes = React.useMemo(
    () => ({
      // Add a new fuzzyTextFilterFn filter type.
      fuzzyText: fuzzyTextFilterFn,
      // Or, override the default text filter to use
      // "startWith"
      text: (rows, id, filterValue) => {
        return rows.filter(row => {
          const rowValue = row.values[id];
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true;
        });
      }
    }),
    []
  );

  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state,
    visibleColumns,
    nextPage,
    pageOptions,
    pageCount,
    previousPage,
    canPreviousPage,
    canNextPage,
    setPageSize,
    gotoPage
  } = useTable(
    {
      columns,
      data,
      defaultColumn, // Be sure to pass the defaultColumn option
      filterTypes,
      initialState: { pageSize: 100, pageIndex: 0 }
    },
    useFilters, // useFilters!
    useSortBy,
    usePagination
  );

  // We don't want to render all of the rows for this example, so cap
  // it for this use case
  // const firstPageRows = rows.slice(0, 10);
  let pageSelectData = Array.apply(null, Array(pageOptions.length)).map(
    function() {}
  );
  let numberOfRowsData = [5, 10, 20, 25, 50, 100];
  return (
    <>
      <div className="ReactTable -striped -highlight">
        <table {...getTableProps()} className="rt-table">
          <thead className="rt-thead -header" style={{
            borderBottom: "1px solid lightgray",
            marginBottom: "10px"
          }}>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()} className="rt-tr">
                {headerGroup.headers.map((column, key) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className={classnames("rt-th rt-resizable-header", {
                      "-cursor-pointer": headerGroup.headers.length - 1 !== key,
                      "-sort-asc": column.isSorted && !column.isSortedDesc,
                      "-sort-desc": column.isSorted && column.isSortedDesc
                    })}
                  >
                    <div className="rt-resizable-header-content">
                      {column.render("Header")}
                    </div>
                    {/* Render the columns filter UI */}
                    <div>
                      {headerGroup.headers.length - 1 === key
                        ? null
                        : column.canFilter
                        ? column.render("Filter")
                        : null}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()} className="rt-tbody">
            {page.map((row, i) => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps()}
                  className={classnames(
                    "rt-tr",
                    { " -odd": i % 2 === 0 },
                    { " -even": i % 2 === 1 }
                  )}
                >
                  {row.cells.map(cell => {
                    return (
                      <td {...cell.getCellProps()} className="rt-td">
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

// Define a custom filter filter function!
function filterGreaterThan(rows, id, filterValue) {
  return rows.filter(row => {
    const rowValue = row.values[id];
    return rowValue >= filterValue;
  });
}

// This is an autoRemove method on the filter function that
// when given the new filter value and returns true, the filter
// will be automatically removed. Normally this is just an undefined
// check, but here, we want to remove the filter if it's not a number
filterGreaterThan.autoRemove = val => typeof val !== "number";

export default Table;
