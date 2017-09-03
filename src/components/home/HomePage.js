import React from 'react';
import $ from 'jquery';
import {connect} from 'react-redux';
import { Link } from 'react-router';
import PropTypes from 'prop-types';

class HomePage extends React.Component{
	constructor(props, context) {
		super(props, context);
		this.state = {
			course: { title: '' }
		};
		this.onTitleChange = this.onTitleChange.bind(this);
		this.onClickSave = this.onClickSave.bind(this);
	}

	onTitleChange(event){
		const course = this.state.course;
		course.title = event.target.value;
		this.setState({course: course});
	}

	onClickSave(){
		return $.getJSON('https://api.github.com/search/users?q=vuejs')
			.then((data) => {
				console.log(data);
			});
	}

	render(){
		return (
			<div className="jumbotron">
				<h1>Techscan App</h1>
				<input 
					type="text"
					onChange={this.onTitleChange}
					value={this.state.course.title} />
				<input 
					type="submit" 
					value="Save"
					onClick={this.onClickSave} />
			</div>
		);
	}
}
export default HomePage;