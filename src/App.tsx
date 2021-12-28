
import React from 'react';

import GridContainer from './BaseComponents/GridContainer';

import IntroductionView from './Subviews/IntroductionView';
import QuestionList from './Subviews/List/QuestionList';
import StatisticsView from './Subviews/StatisticsView';

import Question from './Model/Question';

export default class App extends React.Component<any, any> {

	constructor(props: any) {
		super(props);
		this.state = {
			questions: [],
		}
	}

	componentDidMount() {
		const questions: Question[] = [];
		const data = require("./Model/questions.json");
		data.forEach((item: any) => {
			if (item) {
				questions.push(new Question(item));
			}
		});

		this.setState({
			questions: questions
		});
	}

	render() {
		
		return (
			<GridContainer style={{maxWidth: "980px", margin: "60px auto"}}>
				<IntroductionView questions={this.state.questions}/>
				<StatisticsView questions={this.state.questions}/>
				<div style={{height: "30px", width: "1px"}}/>
				<QuestionList questions={this.state.questions}/>
			</GridContainer>
		);
	}

}
