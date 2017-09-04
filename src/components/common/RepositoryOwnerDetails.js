import React from 'react';
import $ from 'jquery';
import { Scrollbars } from 'react-custom-scrollbars';

class RepositoryOwnerDetails extends React.Component{

	constructor(props) {
		super(props);
		this.state = {
			userRepos: [],
			repoName: '',
			user: {
				avatar_url: '',
				login: ''
			},
			loading: false
		};
		this.makeReposRow = this.makeReposRow.bind(this);
		this.loadOwnerDetails = this.loadOwnerDetails.bind(this);
		this.fetchUserRepos = this.fetchUserRepos.bind(this);
	}


	loadOwnerDetails(username){
		console.log(username);
		this.setState({userName: username});
		this.setState({loading: true});
		$.get('https://api.github.com/search/users?q=' + username).done(function(data) {
			console.log(data.items[0].repos_url);
			this.setState({loading: false});
			this.setState({user: data.items[0]});
			this.fetchUserRepos(data.items[0].repos_url);
		}.bind(this));
	}

	fetchUserRepos(url){
		$.get(url).done(function(data) {
			this.setState({userRepos: data});
			console.log(data);
			this.refs.ownerrepolist.scrollTop();
		}.bind(this));
	}

	makeReposRow(repo, index){
		return (
			<div className="search-result" key={index} data-user={repo.owner.login}>
				<a href={repo.html_url} target="_blank" data-user={repo.owner.login}>
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
						ref="ownerrepolist"
						autoHide
						autoHeight={true}>
						<p className="owner-repositories-heading">Repositories</p>
						<div className="owner-repositories">
							{this.state.userRepos.map(this.makeReposRow, this)}
						</div>
					</Scrollbars>
				</div>
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

export default RepositoryOwnerDetails;