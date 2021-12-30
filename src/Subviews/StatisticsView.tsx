
import React from "react";

import { Card, Tooltip } from "@mui/material";

import StyleUtils from "../Utils/StyleUtils";
import GridItem from "../BaseComponents/GridItem";
import GridContainer from "../BaseComponents/GridContainer";

import Question from "../Model/Question";
import Artist from "../Model/most-asked/Artist";
import Song from "../Model/most-asked/Song";
import KeyWithCounter from "../Model/most-asked/KeyWithCounter";

export default class Statistics extends React.Component<any, any> {

    render() {
        if (!this.props.questions) {
            return null;
        }
        const topArtists = Question.findPopularArtists(this.props.questions);
        const topSongs = Question.findPopularSongs(this.props.questions);

        return (
            <Card style={StyleUtils.card()}>
                <GridContainer>
                <GridItem>
                    <div style={{fontWeight: "bold", paddingBottom: "5px"}}>Küsitumad artistid</div>
                    {topArtists.map((artist: Artist, index: number) => {
                        console.log(artist.key);
                        return <Tooltip key={artist.key} title={this.renderKeyWithCounter(artist.subgroup)} followCursor={true}>
                            <div key={artist.key}>{(index + 1) + ". " + artist.name + ": "}<strong>{Artist.subgroupTotal(artist)}</strong></div>
                        </Tooltip>
                    })}
                </GridItem>
                <GridItem>
                    <div style={{fontWeight: "bold", paddingBottom: "5px"}}>Küsitumad lood</div>
                    {topSongs.map((song: Song, index: number) => {
                        return <Tooltip key={song.key} title={this.renderKeyWithCounter(song.subgroup)} followCursor={true}>
                            <div key={song.key}>{(index + 1) + ". " + song.name + ": "}<strong>{Song.subgroupTotal(song)}</strong></div>
                        </Tooltip>
                    })}
                </GridItem>
                </GridContainer>
            </Card>
        );
    }

    renderKeyWithCounter(items: KeyWithCounter[]) {
        return items.map((artist: KeyWithCounter, index: number) => {
            return <div>{this.indexWithPadding(index) + ". " + artist.name + this.addMultiplierIfMultiple(artist)}</div>;
        });
    }

    indexWithPadding(index: number): string {
        const bullet = index + 1;

        if (bullet < 10) {
            return " " + bullet;
        }
        return bullet.toString();
    }

    addMultiplierIfMultiple(song: KeyWithCounter): string {
        if (song.count > 1) {
            return " (x" + song.count + ")";
        }
        return "";
    }
}