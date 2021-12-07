
import React from "react";
import { withStyles} from "@mui/styles";
import Grid from "@mui/material/Grid";

const styles = {
    grid: {
        margin: "0 -15px",
        width: "calc(100% + 30px)"
    }
};

class GridContainer extends React.Component {
    render() {
        const { classes, children, className, ...rest } = this.props;
        return (
            <Grid container {...rest} className={classes.grid + " " + className}>
                {children}
            </Grid>
        );
    }
}

export default withStyles(styles)(GridContainer);
