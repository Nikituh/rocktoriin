
import React from 'react';
import GridContainer from './BaseComponents/GridContainer';
import GridItem from './BaseComponents/GridItem';
import Table from "./BaseComponents/Table";

import questions from "./Model/questions.json";

export default class App extends React.Component {

	header(header: string, accessor: string) {
		return { Header: header, accessor: accessor };
	}

	componentDidMount() {
		console.log(questions.length);
	}
	render() {
		return (
			<GridContainer style={{maxWidth: "980px", margin: "auto"}}>
				<GridItem xs={12}>
					<Table
						tableHead={["#", "Artist", "Lugu", "Kuupäev"]}
						tableData={this.map(questions)}
					/>
				</GridItem>
			</GridContainer>
		);
	}

	map(questions: any[]) {
		return questions.map((question: any) => {
			return [question.key, question.artist, question.song, question.date]
		});
	}
}
