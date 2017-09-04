import React from 'react';
import $ from 'jquery';
import { Scrollbars } from 'react-custom-scrollbars';

class RepositoryListing extends React.Component{

	constructor(props) {
		super(props);
		this.state = { 
			selectedLang: '',
			repos: {
				incomplete_results: false,
				items: [],
				total_count: 0
			},
			repoName: '',
			loading: false,
			firstTime: true
		};
		this.makeReposRow = this.makeReposRow.bind(this);
		this.submitQuery = this.submitQuery.bind(this);
		this.searchQuery = this.searchQuery.bind(this);
		this.searchUser = this.searchUser.bind(this);
		this.whileTyping = this.whileTyping.bind(this);
		this.onRepoChange = this.onRepoChange.bind(this);
	}

	whileTyping(event){
		this.setState({repoName: event.target.value});
		if( event.key == 'Enter' ){
			this.submitQuery();
		}
	}
	onRepoChange(event){
		this.setState({repoName: event.target.value});
	}

	submitQuery(){
		if( this.state.repoName != '' ){
			this.searchQuery(this.state.repoName);
		}
	}

	searchUser(event){
		let username = $(event.target).data('user').toLowerCase();
		this.props.handleRepoClick(username);
	}

	searchQuery(_query){
		this.setState({repoName: _query});
		this.setState({loading: true});
		$.get('https://api.github.com/search/repositories?q=' + _query).done(function(data) {
			this.setState({repos: data});
			this.setState({firstTime: false});
			this.setState({loading: false});
			this.refs.repolist.scrollTop();
		}.bind(this));
	}

	makeReposRow(repo, index){
		return (
			<div className="search-result" key={index} onClick={this.searchUser} data-user={repo.owner.login}>
				<a href="javascript:void(0)" data-user={repo.owner.login}>
					<div className="repo-owner-image" data-user={repo.owner.login}>
						<img src={repo.owner.avatar_url} alt="" data-user={repo.owner.login}/>
					</div>
					<div className="repo-details" data-user={repo.owner.login}>
						<p className="repo-name" data-user={repo.owner.login}>{repo.full_name}</p>
						<p className="repo-description" data-user={repo.owner.login}>{repo.description}</p>
						<div className="repo-info-figures" data-user={repo.owner.login}>
							<div className="repo-language" data-user={repo.owner.login}>{repo.language}</div>
							<br />
							<div className="repo-stars" data-user={repo.owner.login}><img src="http://www.freeiconspng.com/uploads/black-star-icon-6.png" alt="" data-user={repo.owner.login} /> <span data-user={repo.owner.login}>{repo.stargazers_count}</span></div>
							<div className="repo-forks" data-user={repo.owner.login}><img src="https://cdn0.iconfinder.com/data/icons/hippicons-technology/64/code-fork-64.png" alt="" data-user={repo.owner.login} /><span data-user={repo.owner.login}>{repo.forks}</span></div>
						</div>
					</div>
				</a>
			</div>
		);
	}

	render(){
		return (
			<div className="column repository-lising">
				{
					this.state.firstTime ? 
						<div className="getStarted">
							<img src="http://www.myiconfinder.com/uploads/iconsets/256-256-26fd7cc4e8e8dda0b062f35d70708d64.png" />
						</div>
					:
					<div style={{height: '100%'}}>
						<div className="repo-heading">
							<p>Repositories</p>
						</div>
						<div className="repo-search">
							<input 
								type="text" 
								className="search-input"
								onChange={this.onRepoChange}
								onKeyPress={this.whileTyping}
								value={this.state.repoName} placeholder="Search repositories here.." />
							<img src="https://cdn1.iconfinder.com/data/icons/hawcons/32/698627-icon-111-search-128.png"  alt="" onClick={this.submitQuery} className="search-btn" />
						</div>
						<div className="repo-search-results-count">
							<p>{this.state.repos.total_count} results found.</p>
						</div>
						<Scrollbars
							style={{height:'calc(100% - 165px)'}}
							autoHideTimeout={300}
							ref="repolist"
							autoHideDuration={200}
							autoHeightMax={'100%'}
							autoHide
							autoHeight={true}>
								{this.state.repos.items.map(this.makeReposRow, this)}
						</Scrollbars>
					</div>
				}
				<div className="repo-search-pagination"></div>
				{
					this.state.loading ?
					<div id="divloader">
						<div className="loader"></div>
					</div>
					: null
				}
			</div>
		);
	}
}

export default RepositoryListing;