import { app, h, MyAction } from 'hyperapp';
import * as _debug from 'debug';
import { find, orderBy } from 'lodash';
import * as decode from 'jwt-decode';

const debug = _debug('app:index');

// Types
import { Leaderboard } from './Leaderboard';
import { Game, gameFormSubmit, gameFormChange } from './Game';
import { ReduxDevTools } from './application/ReduxDevTools';
import { Player } from './Player';
import { LoginView, setEmailValue, login, register } from './Login';
import { LayoutMixin } from './application/Layout';
import { formSubmit, formChange } from './components/NewPlayerForm';
import { setMessage, removeMessage } from './Messages';
import { setFilter } from './components/filter';

export enum competitions {
  overall = 'overall',
  frontmen = 'frontmen',
  jpoint = 'jpoint',
}

export type AppActions = {
  stateInit: MyAction<AppState, AppActions>;
  fetchGames: MyAction<AppState, AppActions>;
  setPlayers: MyAction<AppState, AppActions>;
  setFilter: MyAction<AppState, AppActions>;
  game: {
    gameFormChange: MyAction<AppState, AppActions>;
    gameFormSubmit: MyAction<AppState, AppActions>;
  };
  newUser: {
    formChange: MyAction<AppState, AppActions>;
    formSubmit: MyAction<AppState, AppActions>;
  };
  setMessage: MyAction<AppState, AppActions>;
  removeMessage: MyAction<AppState, AppActions>;
  setView: MyAction<AppState, AppActions>;
  login: MyAction<AppState, AppActions>;
  register: MyAction<AppState, AppActions>;
  setJwt: MyAction<AppState, AppActions>;
  deleteJwt: MyAction<AppState, AppActions>;
  toggleShowNewPlayer: MyAction<AppState, AppActions>;
  setEmailValue: MyAction<AppState, AppActions>;
  onHashChange: MyAction<AppState, AppActions>;
};
export type AppState = {
  players: API.User[];
  game: { player1: string; win: boolean | string; player2: string };
  messages: string[];
  newUser: { name: string; email: string };
  view: {
    name: 'login' | 'leaderboard' | 'game';
    payload?: any;
  };
  showNewPlayer: boolean;
  competitions: competitions[];
  filter: competitions;
  user: API.User;
  login: { email: string };
};

const initialState: AppState = {
  players: [],
  game: { player1: '', win: '', player2: '' },
  messages: [],
  newUser: { name: '', email: '' },
  view: {
    name: 'login',
    payload: {},
  },
  showNewPlayer: false,
  competitions: [
    competitions.overall,
    competitions.frontmen,
    competitions.jpoint,
  ],
  filter: competitions.overall,
  user: null,
  login: {
    email: '',
  },
};

const onHashChange: MyAction<AppState, AppActions> = (e) => (state) => (
  actions,
) => {
  let viewName = window.location.hash.split('#')[1];
  return { view: { name: viewName as any, payload: state.view.payload } };
};

const actions: AppActions = {
  stateInit: () => initialState,
  fetchGames: (_) => (state) => (actions) => {
    fetch('users/')
      .then((response) => response.json())
      .then(actions.setPlayers);
  },
  setPlayers: (players) => ({
    players: orderBy(players, ['score'], ['desc']),
  }),
  setView: ({ name, payload }) => {
    location.hash = name;
    return { view: { name, payload } };
  },
  setJwt: (token) => {
    return { user: decode(token), token: token };
  },
  deleteJwt: () => {
    localStorage.removeItem('pool-app-jwt');
    return { user: null, token: null };
  },
  toggleShowNewPlayer: (_) => (prevState) => ({
    newUser: { name: '', email: '' },
    showNewPlayer: !prevState.showNewPlayer,
  }),
  setFilter,
  game: {
    gameFormChange,
    gameFormSubmit,
  },
  newUser: {
    formChange,
    formSubmit,
  },
  setMessage,
  removeMessage,
  login,
  register,
  setEmailValue,
  onHashChange,
};

const view = (state: any) => (actions: AppActions) => {
  debug(
    'navigating to %s with payload %o',
    state.view.name,
    state.view.payload,
  );
  const defaultLayoutActions = {
    setView: actions.setView,
    deleteJwt: actions.deleteJwt,
    state,
  };

  if (!state.user || state.user.exp < new Date().getTime() / 1000) {
    debug('user not authenticated or token expired');
    return LayoutMixin(
      <LoginView
        setView={actions.setView}
        setEmailValue={actions.setEmailValue}
        login={actions.login}
        register={actions.register}
        setMessage={actions.setMessage}
      />,
      defaultLayoutActions,
    );
  }

  if (state.view.name === 'player' && !state.view.payload.length) {
    window.location.hash = 'overview';
  }

  switch (state.view.name) {
    case 'player':
      return LayoutMixin(
        Player({
          state,
          actions,
          player: find(state.players, { _id: state.view.payload }),
        }),
        defaultLayoutActions,
      );
    case 'overview':
    default:
      return LayoutMixin(Leaderboard({ state, actions }), defaultLayoutActions);
  }
};

// Views & Actions
const appActions = app(
  {
    actions: actions,
    view: view,
  },
  document.getElementById('app'),
);

appActions.stateInit(null);
const token = localStorage.getItem('pool-app-jwt');
if (token) appActions.setJwt(token);

// start initial route
appActions.onHashChange({});

window.addEventListener('hashchange', appActions.onHashChange);
