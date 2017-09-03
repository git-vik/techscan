export function searchGithub(query){
	return {
		type: 'SEARCH_GITHUB', query: query
	};
}