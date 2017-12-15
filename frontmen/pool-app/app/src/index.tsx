import { app, h } from 'hyperapp';
import * as _debug from 'debug';
import { orderBy } from 'lodash';

// Types
import { Overview } from './Overview';
import { Game } from './Game';
import { ReduxDevTools } from './application/ReduxDevTools';
import { Messages } from './Messages';

// Views & Actions
const appActions = app(
  {
    actions: {
      init: () => ({
        players: [],
        game: { player1: '', win: '', player2: '' },
        messages: [],
        newUser: { name: '', email: '' },
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
          if (!response.ok) throw new Error('error in newUser');
          response.text().then(t => actions.setMessage(t));
          actions.fetchGames();
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
    },
    view: (state: any) => (actions: any) => {
      switch (state.view) {
        default:
          return (
            <div>
              <h1>FrontMen Pool Cafe</h1>
              {ReduxDevTools({ state })}
              {Overview({ state, actions })}
              {Game({
                players: state.players,
                gameFormChange: actions.gameFormChange,
                game: state.game,
                gameFormSubmit: actions.gameFormSubmit,
                setMessage: actions.setMessage,
              })}
              {Messages({ messages: state.messages })}
            </div>
          );
      }
    },
  },
  document.getElementById('app')
);

appActions.init();
appActions.fetchGames();
