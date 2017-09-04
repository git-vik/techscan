import React from 'react';
import $ from 'jquery';
import { Scrollbars } from 'react-custom-scrollbars';
import languages from '../../languages/languages';

class TechnologyListing extends React.Component{

	constructor(props) {
		super(props);
		this.state = { 
			lang: languages,
			selectedLang: ''
		};
		this.makeLanguageRow = this.makeLanguageRow.bind(this);
		this.makeRandomColor = this.makeRandomColor.bind(this);
		this.getRandomInt = this.getRandomInt.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}
	handleClick(event){
		this.setState({selectedLang: $(event.target).data('text')});
		this.props.handleLanguageSelect($(event.target).data('text').toLowerCase());
	}

	makeLanguageRow(language, index){
		return (
				<div className={ this.state.selectedLang == language.language ? 'list active' : 'list' } key={index} data-text={language.language} onClick={this.handleClick}>
					<div className="image" data-text={language.language}>
						<div className="char-back" style={{'backgroundColor': this.makeRandomColor()}}></div>
					</div>
					<div className="text" data-text={language.language}><p data-text={language.language}>{language.language}</p></div>
				</div>
			);
	}

	makeRandomColor(){
		let _r = this.getRandomInt(0, 255);
		let _g = this.getRandomInt(0, 255);
		let _b = this.getRandomInt(0, 255);
		let _opacity = this.getRandomInt(4, 8)/10;
		// return 'rgba(' + _r + ', ' + _g + ', ' + _b + ', ' + _opacity +')';
		return 'rgb(' + _r + ', ' + _g + ', ' + _b +')';
	}

	getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	render(){
		return (
				<div className="column technology-listing">
					<div className="technology-listing-heading">
						<p>Languages</p>
					</div>
					<Scrollbars
						style={{height:'calc(100% - 65px)'}}
						autoHideTimeout={300}
						autoHide
						autoHideDuration={200}
						autoHeightMax={'100%'}
						autoHeight={true}>
							{this.state.lang.map(this.makeLanguageRow, this)}
					</Scrollbars>
				</div>
			);
	}
}

export default TechnologyListing;