
import React from "react";

import { Card, Tooltip } from "@mui/material";

import StyleUtils from "../Utils/StyleUtils";
import GridItem from "../BaseComponents/GridItem";
import GridContainer from "../BaseComponents/GridContainer";

import Question from "../Model/Question";
import KeyWithCounter from "../Model/most-asked/KeyWithCounter";
import MostAskedItem from "../Model/most-asked/MostAskedItem";

export default class Statistics extends React.Component<any, any> {

    render() {
        if (!this.props.questions) {
            return null;
        }
        const topArtists = Question.findPopularArtists(this.props.questions);
        const topSongs = Question.findPopularSongs(this.props.questions);
        Question.findMostPopularArtistForYear(this.props.questions);
        
        return (
            <Card style={StyleUtils.card()}>
                <GridContainer>
                    {this.renderTop("Küsitumad artistid", topArtists)}
                    {this.renderTop("Küsitumad lood", topSongs)}
                </GridContainer>
            </Card>
        );
    }

    renderTop(title: string, array: MostAskedItem[]): JSX.Element {
        return (
            <GridItem>
                <div style={{ fontWeight: "bold", paddingBottom: "5px" }}>{title}</div>
                {array.map((item: MostAskedItem, index: number) => {
                    return (
                        <Tooltip key={item.key} title={this.renderKeyWithCounter(item.subgroup)} followCursor={true}>
                            <div key={item.key}>
                                {(index + 1) + ". " + item.name + ": "}
                                <strong>{MostAskedItem.subgroupTotal(item)}</strong>
                            </div>
                        </Tooltip>
                    );
                })}
            </GridItem>
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