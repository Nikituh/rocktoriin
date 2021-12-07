
import { Pagination } from '@mui/material';
import React from 'react';

import GridContainer from './BaseComponents/GridContainer';
import GridItem from './BaseComponents/GridItem';
import Table from "./BaseComponents/Table";

import Header from "./Subviews/Header";

export default class App extends React.Component<any, any> {

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

	filter(questions: any[], filter: string) {
		return questions.filter(question => 
			question.artist.toLowerCase().includes(filter.toLowerCase()) || 
			question.song.toLowerCase().includes(filter.toLowerCase())
		);
	}

	componentDidMount() {
		this.setState({
			questions: require("./Model/questions.json")
		});
	}
	render() {
		const filtered = this.filter(this.state.questions, this.state.filter);
		return (
			<GridContainer style={{maxWidth: "980px", margin: "60px auto"}}>
				<GridItem xs={12}>
					<Header filter={(filter: string) => {
						this.setState({filter: filter, page: 1});
					}}/>
					<Table
						head={["#", "Esitaja", "Lugu", "Kuupäev"]}
						data={this.map(filtered)}
					/>
					<Pagination
						style={{marginTop: "30px"}}
						count={this.count(filtered)}
						color="standard"
						onChange={(e: any, page: number) => {
							this.setState({page: page});
						}}
					/>
				</GridItem>
			</GridContainer>
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
