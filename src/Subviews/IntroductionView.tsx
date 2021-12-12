import { Card } from "@mui/material";
import React from "react";
import Question from "../Model/Question";
import DateUtils from "../Utils/DateUtils";

export default class IntroductionView extends React.Component<any, any> {

    render() {
        const questions = this.props.questions;
        if (questions.length === 0) {
            return null;
        }
        questions.sort((a: Question, b: Question) => {
            return a.date!.getTime() - b.date!.getTime();
        })
        const first = DateUtils.toShortString(questions[0].date);
        const last = DateUtils.toShortString(questions[questions.length - 1].date);
        return (
            <div style={{width: "100%", padding: "30px", fontSize: "20px", textAlign: "center"}}>
                {`Tartu Rocktoriinil küsitud küsimused vahemikus ${first} kuni ${last}`}
            </div>
        )
    }
}