import { h } from 'hyperapp';
import { orderBy, find } from 'lodash';
import { Game } from './Game';

export const Player = ({ state, actions, player }) => {
  const { players, view, user } = state;
  const { setView, setMessage, game } = actions;
  return (
    <div>
      <div class="row">
        <div class="col-12">
          <div class="text-center">
            <img
              src={`https://robohash.org/${player.name}`}
              class="rounded"
              alt={player.name}
            />
          </div>

          <h3>
            {player.name} - {player.score}
          </h3>
          <ul class="list-group">
            {player.matches ? (
              Matches({ player, players, setView })
            ) : (
              'Nog geen games'
            )}
          </ul>
        </div>
      </div>
      {state.user._id !== view.payload &&
        Game({
          players: players,
          player: find(players, { _id: state.view.payload }),
          gameFormChange: game.gameFormChange,
          game: state.game,
          gameFormSubmit: game.gameFormSubmit,
          setMessage: setMessage,
        })}
    </div>
  );
};

const Matches = ({ player, players, setView }) => {
  return orderBy(player.matches, ['date'], ['desc']).map(match =>
    Match({ match, players, setView })
  );
};

const Match = ({ match, players, setView }) => {
  const badgeClass = `badge badge-${won(match)
    ? 'success'
    : 'secondary'} badge-pill`;
  return (
    <li
      class="list-group-item d-flex justify-content-between align-items-center"
      key={match.matchId}
      onclick={() => {
        setView({ name: 'player', payload: match.opponent });
      }}
    >
      {won(match) ? 'Gewonnen' : 'Verloren'} van{' '}
      {getPlayer(match.opponent, players).name}
      <span class={badgeClass}>{match.diff}</span>
    </li>
  );
};

const won = match => +match.diff > 0;
const getPlayer = (id, players) => find(players, { _id: id });
