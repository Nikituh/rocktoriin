
import React from "react";
import { Input } from "@mui/material";

export default class Header extends React.Component<any, any> {

    render() {
        return (
            <div style={{height: "50px"}}>
                <span style={{fontWeight: "bold", paddingRight: "7px"}}>Kõik lood</span>
                <Input style={{marginLeft: "5px"}} placeholder={"Filtreeri..."} onChange={(e) => {
                    this.props.filter(e.target.value);
                }}></Input>
            </div>
        );
    }
}