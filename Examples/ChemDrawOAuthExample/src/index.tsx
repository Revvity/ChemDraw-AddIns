//
// index.tsx
//
// Copyright © 2019-2023 PerkinElmer, Inc. All rights reserved.
//

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './components/App';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement
);
