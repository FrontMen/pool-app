// import { h } from 'hyperapp';
import * as _debug from 'debug';

const debug = _debug('app:devtools');
let init = false;

declare const window: { [key: string]: any };

export const ReduxDevTools = ({ state }: { state: any }) => {
  if (init) {
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__.send(
          {
            type: 'stateupdate',
            payload: {}
          },
          state
        )
      : undefined;
    debug('stateupdate with %o', state);
  } else {
    debug('calling oncreate');
    const devTools = window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__.connect()
      : undefined;
    devTools && devTools.init(state);
    init = true;
  }

  // return <pre>{JSON.stringify(state, null, 2)}</pre>;
};
