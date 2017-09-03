import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import {Provider} from 'react-redux';
import routes from './routes';
import './styles/styles.css';
import '../assets/css/perfect-scrollbar.min.css';
import '../assets/css/smalldevices.css';
import '../assets/css/style.css';
render(
	<Router history={browserHistory} routes={routes} />,
	document.getElementById('app')
);