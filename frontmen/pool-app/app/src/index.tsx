import { app, h } from 'hyperapp';
import * as _debug from 'debug';
import { find, orderBy } from 'lodash';
import { decode } from 'jsonwebtoken';

const debug = _debug('app:index');

// Types
import { Overview } from './Overview';
import { Game } from './Game';
import { ReduxDevTools } from './application/ReduxDevTools';
import { Player } from './Player';
import { LoginView } from './Login';
import { LayoutMixin } from './application/Layout';

// Views & Actions
const appActions = app(
  {
    actions: {
      stateInit: () => ({
        players: [],
        game: { player1: '', win: '', player2: '' },
        messages: [],
        newUser: { name: '', email: '' },
        view: {
          name: 'login',
          payload: {},
        },
        showNewPlayer: false,
      }),
      fetchGames: _ => state => actions => {
        fetch('getUsers/')
          .then(response => response.json())
          .then(actions.setPlayers);
      },
      gameFormSubmit: game => state => actions => {
        fetch(
          `playGame/?player1=${game.player1}&win=${game.win}&player2=${game.player2}`
        ).then(response => {
          if (!response.ok) throw new Error('error in postGame');
          response.text().then(t => actions.setMessage(t));
          actions.fetchGames();
        });
      },
      setPlayers: players => ({
        players: orderBy(players, ['score'], ['desc']),
      }),
      gameFormChange: payload => {
        return {
          game: {
            player1: payload.currentTarget[0].value,
            win: payload.currentTarget.win['value'] === 'win',
            player2: payload.currentTarget[3].value,
          },
        };
      },
      newUserFormChange: payload => {
        return {
          newUser: {
            name: payload.currentTarget[0].value,
            email: payload.currentTarget[1].value,
          },
        };
      },
      newUserFormSubmit: newUser => state => actions => {
        fetch(
          `createUser/?name=${newUser.name}&email=${newUser.email}`
        ).then(response => {
          if (!response.ok) {
            actions.setMessage('error registering');
          }
          response.text().then(t => actions.setMessage(t));
          actions.fetchGames();
          actions.toggleShowNewPlayer();
        });
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
      login: ({ email, token }) => state => actions => {
        fetch(`loginUser/?email=${email}&token=${token}`)
          .then(r => r.json())
          .then(r => {
            if (r.success) {
              localStorage.setItem('pool-app-jwt', r.token);
              actions.setJwt(r.token);
              actions.setView({ name: 'overview' });
              actions.fetchGames();
            } else {
              actions.setMessage('Login incorrect');
            }
          })
          .catch(err => actions.setMessage('Login incorrect'));
      },
      setJwt: token => {
        return { user: decode(token), token: token };
      },
      toggleShowNewPlayer: _ => prevState => ({
        newUser: { name: '', email: '' },
        showNewPlayer: !prevState.showNewPlayer,
      }),
    },
    view: (state: any) => (actions: any) => {
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
              player: find(state.players, { _id: state.view.payload }),
              setView: actions.setView,
              players: state.players,
            }),
            defaultLayoutActions
          );
        case 'overview':
        default:
          return LayoutMixin(
            <div>
              {/* <pre>{JSON.stringify(state, null, 2)}</pre> */}
              {Overview({
                state,
                actions,
              })}
              {Game({
                players: state.players,
                gameFormChange: actions.gameFormChange,
                game: state.game,
                gameFormSubmit: actions.gameFormSubmit,
                setMessage: actions.setMessage,
              })}
            </div>,
            defaultLayoutActions
          );
      }
    },
  },
  document.getElementById('app')
);

appActions.stateInit();
const token = localStorage.getItem('pool-app-jwt');
if (token) appActions.setJwt(token);
