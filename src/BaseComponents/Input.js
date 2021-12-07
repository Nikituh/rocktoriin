import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classNames from "classnames";
// @mui/material components
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Input from "@mui/material/Input";

import {withTranslation} from "react-i18next";
import withStyles from "@mui/styles/withStyles";

import {
    primaryColor,
    dangerColor,
    successColor,
    defaultFont,
    whiteColor,
    grayColor
  } from "./Colors.js";

const styles = {
    disabled: {
      "&:before": {
        borderColor: "transparent !important"
      }
    },
    underline: {
      "&:hover:not($disabled):before,&:before": {
        borderColor: grayColor[4] + "!important",
        borderWidth: "1px !important"
      },
      "&:after": {
        borderColor: primaryColor[0]
      },
      "& + p": {
        fontWeight: "300"
      }
    },
    underlineError: {
      "&:after": {
        borderColor: dangerColor[0]
      }
    },
    underlineSuccess: {
      "&:after": {
        borderColor: successColor[0]
      }
    },
    labelRoot: {
      ...defaultFont,
      color: grayColor[19] + " !important",
      fontWeight: "400",
      fontSize: "14px",
      lineHeight: "1.42857",
      top: "10px",
      letterSpacing: "unset",
      "& + $underline": {
        marginTop: "0px"
      }
    },
    labelRootError: {
      color: dangerColor[0] + " !important"
    },
    labelRootSuccess: {
      color: successColor[0] + " !important"
    },
    formControl: {
      margin: "0 0 17px 0",
      paddingTop: "27px",
      position: "relative",
      verticalAlign: "unset",
      "& svg,& .fab,& .far,& .fal,& .fas,& .material-icons": {
        color: grayColor[14]
      }
    },
    whiteUnderline: {
      "&:hover:not($disabled):before,&:before": {
        backgroundColor: whiteColor
      },
      "&:after": {
        backgroundColor: whiteColor
      }
    },
    input: {
      color: grayColor[14],
      height: "unset",
      "&,&::placeholder": {
        fontSize: "14px",
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        fontWeight: "400",
        lineHeight: "1.42857",
        opacity: "1"
      },
      "&::placeholder": {
        color: grayColor[3]
      }
    },
    whiteInput: {
      "&,&::placeholder": {
        color: whiteColor,
        opacity: "1"
      }
    }
  };

class CustomInput extends React.Component {

    render() {
        const {
            classes,
            formControlProps,
            labelText,
            id,
            labelProps,
            inputProps,
            error,
            white,
            inputRootCustomClasses,
            success,
            helperText
        } = this.props;

        const labelClasses = classNames({
            [" " + classes.labelRootError]: error,
            [" " + classes.labelRootSuccess]: success && !error
        });
        const underlineClasses = classNames({
            [classes.underlineError]: error,
            [classes.underlineSuccess]: success && !error,
            [classes.underline]: true,
            [classes.whiteUnderline]: white
        });
        const marginTop = classNames({[inputRootCustomClasses]: inputRootCustomClasses !== undefined});
        const inputClasses = classNames({[classes.input]: true, [classes.whiteInput]: white});

        let formControlClasses;
        if (formControlProps !== undefined) {
            formControlClasses = classNames(formControlProps.className, classes.formControl);
        } else {
            formControlClasses = classes.formControl;
        }
        const helpTextClasses = classNames({
            [classes.labelRootError]: error,
            [classes.labelRootSuccess]: success && !error
        });
        let newInputProps = {maxLength: inputProps?.maxLength, minLength: inputProps?.minLength};

        return (
            <FormControl {...formControlProps} className={formControlClasses}>
                {labelText !== undefined ? (
                    <InputLabel className={classes.labelRoot + " " + labelClasses} htmlFor={id} {...labelProps}>
                        {labelText}
                    </InputLabel>
                ) : null}
                <Input
                    classes={{
                        input: inputClasses,
                        root: marginTop,
                        disabled: classes.disabled,
                        underline: underlineClasses,
                    }}
                    id={id}
                    {...inputProps}
                    inputProps={newInputProps}
                />
                {helperText !== undefined ? (
                    <FormHelperText id={id + "-text"} className={helpTextClasses}>{helperText}</FormHelperText>
                ) : null}
            </FormControl>
        );
    }
}

export default withStyles(styles)(CustomInput);

CustomInput.propTypes = {
    labelText: PropTypes.node,
    labelProps: PropTypes.object,
    id: PropTypes.string,
    inputProps: PropTypes.object,
    formControlProps: PropTypes.object,
    inputRootCustomClasses: PropTypes.string,
    error: PropTypes.bool,
    success: PropTypes.bool,
    white: PropTypes.bool,
    helperText: PropTypes.node
};
