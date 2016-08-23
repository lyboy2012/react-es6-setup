/*if (process.env.NODE_ENV !== 'production') {
    require('../../index.html');
}*/
import React from 'react';
import { render } from 'react-dom';
import App from '../components/app/index';

render(<App txt="index" cat={10}/>,document.getElementById('app'));


