import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import {Provider} from 'react-redux';
import AppContainer from './components/common/AppContainer';
import './styles/styles.css';
import '../assets/css/perfect-scrollbar.min.css';
import '../assets/css/smalldevices.css';
import '../assets/css/style.css';

render(
	<AppContainer />,
	document.getElementById('app')
);