
import React from "react";

import Question from "../Model/Question";

import DateUtils from "../Utils/DateUtils";
import StyleUtils from "../Utils/StyleUtils";

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
            <div style={StyleUtils.header()}>
                {`Tartu Rocktoriinil küsitud küsimused vahemikus ${first} kuni ${last}`}
            </div>
        )
    }
}