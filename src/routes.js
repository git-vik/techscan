import React from 'react';
import { Route, IndexRoute } from 'react-router';
import AppContainer from './components/common/AppContainer';
import HomePage from './components/home/HomePage';
import AboutPage from './components/about/AboutPage';

export default (
	<Route path="/" component={AppContainer}>
		<IndexRoute component={HomePage} />
		<Route path="about" component={AboutPage} />
	</Route>
);