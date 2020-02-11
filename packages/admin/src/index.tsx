/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';
import ReactDOM from 'react-dom';
import 'typeface-roboto';

import { App } from './App';

ReactDOM.render(<App />, document.getElementById('app'));

if ((module as any).hot) {
  (module as any).hot.accept();
  (module as any).hot.dispose();
}
