
import React from 'react';
import GridContainer from './BaseComponents/GridContainer';
import Question from './Model/Question';
import QuestionList from './Subviews/List/QuestionList';

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
			questions.push(Object.assign(new Question(), item));
		});

		this.setState({
			questions: questions
		});
	}
	render() {
		
		return (
			<GridContainer style={{maxWidth: "980px", margin: "60px auto"}}>
				<QuestionList questions={this.state.questions}/>
			</GridContainer>
		);
	}

}
