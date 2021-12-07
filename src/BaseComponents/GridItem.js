
import React from "react";
import {withStyles} from "@mui/styles";
import Grid from "@mui/material/Grid";

const styles = {
    grid: {
        padding: "0 15px !important"
    }
};

class GridItem extends React.Component {
    render() {
        const { classes, children, className, ...rest } = this.props;
        return (
            <Grid item {...rest} className={classes.grid + " " + className}>
                {children}
            </Grid>
        );
    }
}

export default withStyles(styles)(GridItem);
