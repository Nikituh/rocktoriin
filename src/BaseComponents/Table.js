import React from "react";
import cx from "classnames";
import PropTypes from "prop-types";

// @mui/material components
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import {withStyles} from "@mui/styles";
import Tooltip from "@mui/material/Tooltip";

import {
  warningColor,
  primaryColor,
  dangerColor,
  successColor,
  infoColor,
  roseColor,
  grayColor,
  blackColor,
  defaultFont,
  hexToRgb
} from "./Colors.js";

const styles = theme => ({
  warning: {
    color: warningColor[0]
  },
  primary: {
    color: primaryColor[0]
  },
  danger: {
    color: dangerColor[0]
  },
  success: {
    color: successColor[0]
  },
  info: {
    color: infoColor[0]
  },
  rose: {
    color: roseColor[0]
  },
  gray: {
    color: grayColor[0]
  },
  right: {
    textAlign: "right"
  },
  table: {
    marginBottom: "0",
    width: "100%",
    maxWidth: "100%",
    backgroundColor: "transparent",
    borderSpacing: "0",
    borderCollapse: "collapse",
    overflow: "auto"
  },
  tableShoppingHead: {
    fontSize: "0.9em !important",
    textTransform: "uppercase !important"
  },
  tableHeadFontSize: {
    fontSize: "0.8em !important",
    fontWeight: "600"
  },
  tableHeadCell: {
    color: "rgba(" + hexToRgb(blackColor) + ", 0.87)",
    border: "none !important"
  },
  tableCell: {
    ...defaultFont,
    lineHeight: "1.42857143",
    padding: "6px 8px!important",
    verticalAlign: "middle",
    fontSize: "1em",
    borderBottom: "none",
    borderTop: "1px solid " + grayColor[5],
    position: "relative",
    [theme.breakpoints.down('md')]: {
      minHeight: "24px",
      minWidth: "32px"
    }
  },
  tableCellTotal: {
    fontWeight: "600",
    fontSize: "1em",
    paddingTop: "14px",
    textAlign: "right"
  },
  tableCellSubtotal: {
    fontWeight: "400",
    fontSize: "1em",
    paddingTop: "10px",
    textAlign: "right"
  },
  tableCellAmount: {
    fontSize: "17px",
    fontWeight: "600",
    marginTop: "5px",
    textAlign: "right"
  },
  tableResponsive: {
    // width: "100%",
    minHeight: "0.1%",
    overflowX: "auto"
  },
  tableStripedRow: {
    backgroundColor: grayColor[12]
  },
  tableRowHover: {
    "&:hover": {
      backgroundColor: grayColor[13]
    }
  },
  warningRow: {
    backgroundColor: warningColor[6],
    "&:hover": {
      backgroundColor: warningColor[5]
    }
  },
  dangerRow: {
    backgroundColor: dangerColor[6],
    "&:hover": {
      backgroundColor: dangerColor[5]
    }
  },
  successRow: {
    backgroundColor: successColor[6],
    "&:hover": {
      backgroundColor: successColor[5]
    }
  },
  infoRow: {
    backgroundColor: infoColor[6],
    "&:hover": {
      backgroundColor: infoColor[5]
    }
  },
  tableRowBody: {
    height: "36px"
  },
  tableRowHead: {
    height: "46px"
  }
});

class CustomTable extends React.Component {

    render() {
        const { tableHead, tableData, tableHeaderColor } = this.props;
        const classes = this.props.classes;

        return (
            <div className={classes.tableResponsive}>
                <Table className={classes.table}>
                    {tableHead !== undefined ? (
                        <TableHead className={classes[tableHeaderColor]}>
                            <TableRow className={classes.tableRow + " " + classes.tableRowHead}>
                                {tableHead.map((prop, key) => { return this.mapHead(prop, key); })}
                            </TableRow>
                        </TableHead>
                    ) : null}
                    <TableBody>
                        {tableData.map((prop, key) => {
                            const hints = this.props.rowHints;
                            if (!hints) {
                                return this.mapBody(prop, key);
                            }
                            const text = hints[key];
                            if (!text) {
                                return this.mapBody(prop, key);
                            }
                            const hint = <span style={{ whiteSpace: 'pre-line' }}>{text}</span>;
                            return <Tooltip title={hint}>{this.mapBody(prop, key)}</Tooltip>
                        })}
                    </TableBody>
                </Table>
            </div>
        );
    }

    mapHead(prop, key) {
        const { tableShopping, customHeadCellClasses, customHeadClassesForCells} = this.props;
        const classes = this.props.classes;

        const tableCellClasses = classes.tableHeadCell + " " + classes.tableCell + " " +
            cx({
                [customHeadCellClasses[
                    customHeadClassesForCells.indexOf(key)
                    ]]: customHeadClassesForCells.indexOf(key) !== -1,
                [classes.tableShoppingHead]: tableShopping,
                [classes.tableHeadFontSize]: !tableShopping
            });
        return <TableCell className={tableCellClasses} key={key}>{prop}</TableCell>;
    }

    mapBody(prop, key) {
        const {
            tableHead,
            hover,
            colorsColls,
            coloredColls,
            customCellClasses,
            customClassesForCells,
            striped,
        } = this.props;

        const classes = this.props.classes;
        let rowColor = "";
        let rowColored = false;
        if (prop.color !== undefined) {
            rowColor = prop.color;
            rowColored = true;
            prop = prop.data;
        }
        const tableRowClasses = cx({
            [classes.tableRowBody]: true,
            [classes.tableRowHover]: hover,
            [classes[rowColor + "Row"]]: rowColored,
            [classes.tableStripedRow]: striped && key % 2 === 0
        });

        if (prop.description || prop.total || prop.subtotal) {
            return (
                <TableRow key={key} hover={hover} className={tableRowClasses}>
                    <TableCell className={classes.tableCell} colSpan={prop.colspan}/>
                    <TableCell className={classes.tableCell + " " + (prop.subtotal ? classes.tableCellSubtotal : classes.tableCellTotal)}>
                        {prop.text ?? "Total"}
                    </TableCell>
                    <TableCell className={classes.tableCell + " " + classes.tableCellAmount}>
                        {prop.amount}
                    </TableCell>
                    {tableHead.length - (prop.colspan - 0 + 2) > 0 ? (
                        <TableCell className={classes.tableCell} colSpan={tableHead.length - (prop.colspan - 0 + 2)}/>
                    ) : null}
                </TableRow>
            );
        }

        if (prop.purchase) {
            return (
                <TableRow key={key} hover={hover} className={tableRowClasses}>
                    <TableCell className={classes.tableCell} colSpan={prop.colspan}/>
                    <TableCell className={classes.tableCell + " " + classes.right} colSpan={prop.col.colspan}>
                        {prop.col.text}
                    </TableCell>
                </TableRow>
            );
        }
        return (
            <TableRow key={key} hover={hover} className={classes.tableRow + " " + tableRowClasses} onClick={() => {
                this.props.onRowClick && this.props.onRowClick(prop[0]);
            }} >
                {prop.map((prop, key) => {
                    const tableCellClasses =
                        classes.tableCell +
                        " " +
                        cx({
                            [classes[colorsColls[coloredColls.indexOf(key)]]]:
                            coloredColls.indexOf(key) !== -1,
                            [customCellClasses[customClassesForCells.indexOf(key)]]:
                            customClassesForCells.indexOf(key) !== -1
                        });


                    return (
                        <TableCell className={tableCellClasses} key={key}>{prop}</TableCell>
                    );
                })}
            </TableRow>
        );
    }
}

export default withStyles(styles)(CustomTable);

CustomTable.defaultProps = {
    tableHeaderColor: "gray",
    hover: false,
    colorsColls: [],
    coloredColls: [],
    striped: false,
    customCellClasses: [],
    customClassesForCells: [],
    customHeadCellClasses: [],
    customHeadClassesForCells: [],
    onRowClick: undefined
};

CustomTable.propTypes = {
    tableHeaderColor: PropTypes.oneOf([
        "warning",
        "primary",
        "danger",
        "success",
        "info",
        "rose",
        "gray"
    ]),
    tableHead: PropTypes.arrayOf(PropTypes.string),
    // Of(PropTypes.arrayOf(PropTypes.node)) || Of(PropTypes.object),
    tableData: PropTypes.array,
    hover: PropTypes.bool,
    coloredColls: PropTypes.arrayOf(PropTypes.number),
    // Of(["warning","primary","danger","success","info","rose","gray"]) - colorsColls
    colorsColls: PropTypes.array,
    customCellClasses: PropTypes.arrayOf(PropTypes.string),
    customClassesForCells: PropTypes.arrayOf(PropTypes.number),
    customHeadCellClasses: PropTypes.arrayOf(PropTypes.string),
    customHeadClassesForCells: PropTypes.arrayOf(PropTypes.number),
    striped: PropTypes.bool,
    // this will cause some changes in font
    tableShopping: PropTypes.bool,
    onRowClick: PropTypes.any
};
