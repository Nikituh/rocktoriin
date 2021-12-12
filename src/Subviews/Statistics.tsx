
import React from "react";
import Artist from "../Model/most-asked/Artist";
import Question from "../Model/Question";

export default class Statistics extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
    }

    render() {
        if (!this.props.questions) {
            return null;
        }
        const top = Question.findPopularArtists(this.props.questions);
        
        return (
            <div>
                {top.map((artist: Artist) => {
                    return <div key={artist.key}>{artist.name + ": " + artist.songs.length}</div>
                })}
            </div>
        );
    }
}