/* global document */

import { render } from 'react-dom';

import './sentry';
import '../both/accounts';
import '../both/admin';
import renderRoutes from './routes';

render(renderRoutes(), document.getElementById('app'));
