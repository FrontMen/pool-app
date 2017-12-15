import { app } from 'hyperapp';
import * as _debug from 'debug';

// Types
import { Simple } from './Simple';

// API

// Views & Actions

app(
  {
    state: { blaat: 0 },
    actions: { add: payload => state => actions => ({ blaat: 1 }) },
    view: (state: any) => (actions: any) => Simple,
  },
  document.getElementById('app')
);
