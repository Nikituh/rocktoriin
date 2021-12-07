
import React from 'react';
import GridContainer from './BaseComponents/GridContainer';
import GridItem from './BaseComponents/GridItem';
import Table from "./BaseComponents/Table";

// import questions from "./Model/questions.json";

export default class App extends React.Component<any, any> {

	constructor(props: any) {
		super(props);
		this.state = {
			questions: []
		}
	}

	componentDidMount() {
		// console.log(questions.length);
		this.setState({
			questions: require("./Model/questions.json")
		});

	}
	render() {
		return (
			<GridContainer style={{maxWidth: "980px", margin: "auto"}}>
				<GridItem xs={12}>
					<Table
						tableHead={["#", "Esitaja", "Lugu", "Kuupäev"]}
						tableData={this.map(this.state.questions)}
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
