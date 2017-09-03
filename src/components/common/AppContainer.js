import React from 'react';
import Header from '../common/Header';
import $ from 'jquery';
import { Scrollbars } from 'react-custom-scrollbars';
import languages from '../../languages/languages';

class AppContainer extends React.Component{

	constructor(props) {
		super(props);
		this.state = { 
			langs: [],
			repos: {
				incomplete_results: false,
				items: [],
				total_count: 0
			},
			repoName: '',
			userName: '',
			user: {},
			userRepos: []
		};

		this.makeLanguageRow = this.makeLanguageRow.bind(this);
		this.searchRepo = this.searchRepo.bind(this);
		this.getRandomColor = this.getRandomColor.bind(this);
		this.getRandomInt = this.getRandomInt.bind(this);
		this.onRepoChange = this.onRepoChange.bind(this);
		this.searchQuery = this.searchQuery.bind(this);
		this.searchUser = this.searchUser.bind(this);
		this.submitQuery = this.submitQuery.bind(this);
		this.showUserDetails = this.showUserDetails.bind(this);
		this.fetchUserRepos = this.fetchUserRepos.bind(this);
	}

	componentDidMount(){
		// console.log(languages);
		// console.log(this.state.langs);
	}

	searchUser(event){
		var _query = $(event.target).data('user').toLowerCase();
		console.log(_query);
		this.setState({userName: _query});
		$.get('https://api.github.com/search/users?q=' + _query).done(function(data) {
			console.log(data);
			this.setState({user: data.items[0]});
			this.showUserDetails(data.items[0]);
			this.fetchUserRepos(data.items[0].repos_url);
		}.bind(this));
		// this.searchQuery(_query);
	}

	showUserDetails(user){
		// return (
		// 	);
	}

	onRepoChange(event){
		this.setState({repoName: event.target.value});
	}
	makeLanguageRow(language, index){
		return (
				<div className="list" key={language.language} data-text={language.language} onClick={this.searchRepo}>
					<div className="image" data-text={language.language}>
						<div className="char-back" style={{'backgroundColor': this.getRandomColor()}}></div>
					</div>
					<div className="text" data-text={language.language}><p data-text={language.language}>{language.language}</p></div>
				</div>
			);
	}

	getRandomColor(){
		var _r = this.getRandomInt(0, 255);
		var _g = this.getRandomInt(0, 255);
		var _b = this.getRandomInt(0, 255);
		var _opacity = this.getRandomInt(4, 8)/10;
		// return 'rgba(' + _r + ', ' + _g + ', ' + _b + ', ' + _opacity +')';
		return 'rgb(' + _r + ', ' + _g + ', ' + _b +')';
	}
	getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	searchRepo(event){
		var _query = $(event.target).data('text');
		this.searchQuery(_query);
	}

	fetchUserRepos(url){
		$.get(url).done(function(data) {
			console.log(data);
			this.setState({userRepos: data});
		}.bind(this));
	}

	submitQuery(){
		if( this.state.repoName != '' ){
			this.searchQuery(this.state.repoName);
		}
	}

	searchQuery(_query){
		this.setState({repoName: _query});
		$.get('https://api.github.com/search/repositories?q=' + _query).done(function(data) {
			console.log(data);
			this.setState({repos: data});
			console.log(this.state.repos);
		}.bind(this));
	}

	makeReposRow(repo){
		return (
			<div className="search-result" onClick={this.searchUser} data-user={repo.owner.login}>
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
			<div className="container">
				<div className="column technology-listing">
					<div className="technology-listing-heading">
						<p>Languages</p>
					</div>
					<Scrollbars
						style={{height:'calc(100% - 65px)'}}
						autoHideTimeout={300}
						autoHideDuration={200}
						autoHeightMax={'100%'}
						autoHeight={true}>
							{languages.languages.map(this.makeLanguageRow, this)}
					</Scrollbars>
				</div>
				<div className="column repository-lising">
					<div className="repo-heading">
						<p>Repositories</p>
					</div>
					<div className="repo-search">
						<input 
							type="text" 
							className="search-input"
							onChange={this.onRepoChange}
							value={this.state.repoName} placeholder="Search repositories here.." />
						<img src="https://cdn1.iconfinder.com/data/icons/hawcons/32/698627-icon-111-search-128.png"  alt="" onClick={this.submitQuery} className="search-btn" />
					</div>
					<div className="repo-search-results-count">
						<p>{this.state.repos.total_count} results found.</p>
					</div>
					<Scrollbars
						style={{height:'calc(100% - 165px)'}}
						autoHideTimeout={300}
						autoHideDuration={200}
						autoHeightMax={'100%'}
						autoHeight={true}>
							{this.state.repos.items.map(this.makeReposRow, this)}
					</Scrollbars>
					<div className="repo-search-pagination"></div>
				</div>
				<div className="column repository-details">
					<div className="owner-profile">
						<img src={this.state.user.avatar_url} alt="" />
						<p className="owner-username">{this.state.user.login}</p>
					</div>
					<div className="owner-repositories-container">
						<Scrollbars
							style={{height:'100%'}}
							autoHideTimeout={300}
							autoHideDuration={200}
							autoHeightMax={'100%'}
							autoHeight={true}>
							<p className="owner-repositories-heading">Repositories</p>
							<div className="owner-repositories">
								{this.state.userRepos.map(this.makeReposRow, this)}
							</div>
						</Scrollbars>
					</div>
				</div>
			</div>
			);
	}
}

export default AppContainer;