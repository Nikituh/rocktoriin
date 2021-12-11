
import React from "react";

import { Pagination } from '@mui/material';

import GridItem from '../../BaseComponents/GridItem';
import Table from "../../BaseComponents/Table";

import Header from "./Header";
import Question from "../../Model/Question";

export default class QuestionList extends React.Component<any, any> {

    ITEMS_PER_PAGE = 20;

    constructor(props: any) {
        super(props);
        this.state = {
            questions: [],
            filter: "",
            page: 1
        }
    }

    count(filtered: any[]) {
        if (!filtered) {
            return 0;
        }
        return Math.ceil(filtered.length / this.ITEMS_PER_PAGE);
    }

    filter(questions: Question[], filter: string) {
        return questions.filter(question => {
            return question.artistContains(filter) || question.songContains(filter)
        });
    }

    render() {
        const filtered = this.filter(this.props.questions, this.state.filter);
        return (
            <GridItem xs={12}>
                <Header filter={(filter: string) => {
                    this.setState({ filter: filter, page: 1 });
                }} />
                <Table
                    head={["#", "Esitaja", "Lugu", "Kuupäev"]}
                    data={this.map(filtered)}
                />
                <Pagination
                    style={{ marginTop: "30px" }}
                    count={this.count(filtered)}
                    color="standard"
                    onChange={(e: any, page: number) => {
                        this.setState({ page: page });
                    }}
                />
            </GridItem>
        );
    }

    map(filtered: any[]) {

        const result: any[] = [];
        const start = (this.state.page - 1) * this.ITEMS_PER_PAGE;
        const count = start + this.ITEMS_PER_PAGE;

        if (filtered.length === 0) {
            return result;
        }

        for (let i = start; i < count; i++) {
            const question = filtered[i];
            if (question) {
                result.push([question.key, question.artist, question.song, question.date]);
            }
        }

        return result;
    }
}