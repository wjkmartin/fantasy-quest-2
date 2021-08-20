import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux'


import { library } from '@fortawesome/fontawesome-svg-core'
import { faChessRook, faHryvnia, faGripLines, faGripLinesVertical, faArchway, faSquare, faAnchor, faHouseDamage, faPoop, faBeer, faTshirt, faTree, faMonument, faLandmark, faChurch, faLeaf, faHammer, faCoins, faCrown, faDoorClosed, faPlus, faUser, faStar} from '@fortawesome/free-solid-svg-icons'

import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import store from './DataHandlers/redux/store'

import Layout from './components/Layout/Layout'
import * as serviceWorker from './serviceWorker';

library.add(faChessRook,faHryvnia,faGripLines,faGripLinesVertical, faArchway, faSquare, faAnchor, faHouseDamage, faPoop, faBeer, faTshirt, faTree, faMonument, faLandmark, faChurch, faLeaf, faHammer, faCoins, faCrown, faDoorClosed, faPlus, faUser, faStar)

  ReactDOM.render(
    <Provider store={store}>
        <Layout />
    </Provider>,
document.getElementById('root')
);

serviceWorker.unregister();


