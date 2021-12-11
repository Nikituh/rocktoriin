
import React from "react";
import Question from "../Model/Question";

export default class Statistics extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
    }

    render() {
        if (!this.props.questions) {
            return null;
        }
        const mostAsked = Question.findMostPopularArtist(this.props.questions);
        console.log(mostAsked);
        return (
            <div>
                {mostAsked.name + ": " + mostAsked.songs.length}
            </div>
        );
    }
}