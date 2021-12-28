
import React from "react";

import { Card, Tooltip } from "@mui/material";

import Artist, { ArtistSong } from "../Model/most-asked/Artist";
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
                <div style={{fontWeight: "bold", paddingBottom: "5px"}}>Most asked artists (hover to see songs)</div>
                {top.map((artist: Artist, index: number) => {
                    return <Tooltip key={artist.key} title={this.renderSongList(artist)}>
                        <div>{(index + 1) + ". " + artist.name + ": "}<strong>{Artist.totalSongsOf(artist)}</strong></div>
                    </Tooltip>
                })}
            </Card>
        );
    }

    renderSongList(artist: Artist) {
        return artist.songs.map((song: ArtistSong, index: number) => {
            return <div>{this.indexWithPadding(index) + ". " + song.name + this.addMultiplierIfMultiple(song)}</div>;
        });
    }

    indexWithPadding(index: number): string {
        const bullet = index + 1;

        if (bullet < 10) {
            return " " + bullet;
        }
        return bullet.toString();
    }

    addMultiplierIfMultiple(song: ArtistSong): string {
        if (song.count > 1) {
            return " (x" + song.count + ")";
        }
        return "";
    }
}