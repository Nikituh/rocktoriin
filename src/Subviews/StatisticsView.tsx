
import React from "react";

import { Card, Tooltip } from "@mui/material";

import Artist from "../Model/most-asked/Artist";
import Question from "../Model/Question";

import StyleUtils from "../Utils/StyleUtils";

export default class Statistics extends React.Component<any, any> {

    render() {
        if (!this.props.questions) {
            return null;
        }
        const top = Question.findPopularArtists(this.props.questions);

        return (
            <Card style={StyleUtils.card()}>
                {top.map((artist: Artist, index: number) => {
                    return <Tooltip key={artist.key} title={this.renderSongList(artist)}>
                        <div>{(index + 1) + ". " + artist.name + ": "}<strong>{artist.songs.length}</strong></div>
                    </Tooltip>
                })}
            </Card>
        );
    }

    renderSongList(artist: Artist) {
        return artist.songs.map((song: string, index: number) => {
            return <div>{(index + 1) + ". " + song}</div>;
        });
    }
}