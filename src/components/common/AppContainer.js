import React from 'react';
import TechnologyListing from './TechnologyListing';
import RepositoryListing from './RepositoryListing';
import RepositoryOwnerDetails from './RepositoryOwnerDetails';

class AppContainer extends React.Component{

	constructor(props) {
		super(props);
		this.handleLanguageSelect = this.handleLanguageSelect.bind(this);
		this.handleRepoClick = this.handleRepoClick.bind(this);
	}

	handleLanguageSelect(data){
		this.refs.repolist.searchQuery(data);
	}

	handleRepoClick(username){
		this.refs.ownerdetails.loadOwnerDetails(username);
	}

	render(){
		return (
			<div className="container">
				<TechnologyListing handleLanguageSelect={this.handleLanguageSelect} />
				<RepositoryListing ref="repolist" handleRepoClick={this.handleRepoClick} />
				<RepositoryOwnerDetails ref="ownerdetails" />
			</div>
		);
	}
}

export default AppContainer;