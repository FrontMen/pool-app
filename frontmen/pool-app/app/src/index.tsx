import { app, h } from 'hyperapp';
import * as _debug from 'debug';
import { find, orderBy } from 'lodash';
import { decode } from 'jsonwebtoken';

const debug = _debug('app:index');

// Types
import { Leaderboard } from './Leaderboard';
import { Game, gameFormSubmit, gameFormChange } from './Game';
import { ReduxDevTools } from './application/ReduxDevTools';
import { Player } from './Player';
import { LoginView, login } from './Login';
import { LayoutMixin } from './application/Layout';
import { formSubmit, formChange } from './components/NewPlayerForm';

const initialState = {
  players: [],
  game: { player1: '', win: '', player2: '' },
  messages: [],
  newUser: { name: '', email: '' },
  view: {
    name: 'login',
    payload: {},
  },
  showNewPlayer: false,
  competitions: ['overall', 'frontmen', 'jpoint'] /* should be ENUM */,
  filter: 'overall',
};

const actions = {
  stateInit: () => initialState,
  fetchGames: _ => state => actions => {
    fetch('users/').then(response => response.json()).then(actions.setPlayers);
  },
  setPlayers: players => ({
    players: orderBy(players, ['score'], ['desc']),
  }),
  setFilter: filter => {
    return { filter };
  },
  game: {
    gameFormChange,
    gameFormSubmit,
  },
  newUser: {
    formChange,
    formSubmit,
  },
  setMessage: message => state => actions => {
    setTimeout(() => {
      actions.removeMessage(message);
    }, 5000);
    return { messages: [...state.messages, message] };
  },
  removeMessage: message => state => ({
    messages: state.messages.filter(m => m !== message),
  }),
  setView: ({ name, payload }) => {
    return { view: { name, payload } };
  },
  login: login,
  setJwt: token => {
    return { user: decode(token), token: token };
  },
  toggleShowNewPlayer: _ => prevState => ({
    newUser: { name: '', email: '' },
    showNewPlayer: !prevState.showNewPlayer,
  }),
};

const view = (state: any) => (actions: any) => {
  debug(
    'navigating to %s with payload %o',
    state.view.name,
    state.view.payload
  );
  const defaultLayoutActions = {
    setView: actions.setView,
    state,
  };

  if (!state.user || state.user.exp < new Date().getTime() / 1000) {
    debug('user not authenticated or token expired');
    return LayoutMixin(
      <LoginView
        setView={actions.setView}
        login={actions.login}
        setMessage={actions.setMessage}
      />,
      defaultLayoutActions
    );
  }

  switch (state.view.name) {
    case 'player':
      return LayoutMixin(
        Player({
          state,
          actions,
          player: find(state.players, { _id: state.view.payload }),
        }),
        defaultLayoutActions
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
  document.getElementById('app')
);

appActions.stateInit();
const token = localStorage.getItem('pool-app-jwt');
if (token) appActions.setJwt(token);
