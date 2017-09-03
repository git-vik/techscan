export default function searchGithubReducer(state = [], action){
	switch(action.type){
		case 'SEARCH_GITHUB':
			return [...state, Object.assign({}, action.course)];
		default:
			return state;
	}
}