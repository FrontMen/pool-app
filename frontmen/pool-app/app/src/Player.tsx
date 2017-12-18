import { h } from 'hyperapp';
import { orderBy, find } from 'lodash';

export const Player = ({ player, players }) => {
  return (
    <div class="row">
      <div class="col-12">
        <h3>
          {player.name} - {player.score}
        </h3>
        <ul class="list-group">
          {player.matches ? Matches({ player, players }) : 'Nog geen games'}
        </ul>
      </div>
    </div>
  );
};

const Matches = ({ player, players }) => {
  return orderBy(player.matches, ['date'], ['desc']).map(match =>
    Match({ match, players })
  );
};

const Match = ({ match, players }) => {
  const badgeClass = `badge badge-${won(match)
    ? 'success'
    : 'secondary'} badge-pill`;
  return (
    <li
      class="list-group-item d-flex justify-content-between align-items-center"
      key={match.matchId}
    >
      {won(match) ? 'Gewonnen' : 'Verloren'} van{' '}
      {getPlayer(match.opponent, players).name}
      <span class={badgeClass}>{match.diff}</span>
    </li>
  );
};

const won = match => +match.diff > 0;
const getPlayer = (id, players) => find(players, { _id: id });
