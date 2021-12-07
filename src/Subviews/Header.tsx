
import { Input } from "@mui/material";
import React from "react";

export default class Header extends React.Component<any, any> {

    render() {
        return (
            <div style={{height: "50px"}}>
                <Input style={{marginLeft: "5px"}} placeholder={"Filtreeri..."} onChange={(e) => {
                    this.props.filter(e.target.value);
                }}></Input>
            </div>
        );
    }
}