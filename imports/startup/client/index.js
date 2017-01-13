/* global document */

import { render } from 'react-dom';

import '../both/accounts';
import renderRoutes from './routes';

render(renderRoutes(), document.getElementById('app'));
