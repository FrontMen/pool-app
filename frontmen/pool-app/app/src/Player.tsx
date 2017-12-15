import { h } from 'hyperapp';
import { orderBy, find } from 'lodash';

export const Player = ({ player, setView, players }) => {
  return (
    <div>
      <span onclick={() => setView('overview')}>Terug</span>
      <h3>
        {player.name} - {player.score}
      </h3>
      <ul>
        {player.matches ? Matches({ player, players }) : 'Nog geen games'}
      </ul>
    </div>
  );
};

const Matches = ({ player, players }) => {
  return orderBy(player.matches, ['date'], ['desc']).map(match =>
    Match({ match, players })
  );
};

const Match = ({ match, players }) => {
  return (
    <li>
      {won(match)} van {getPlayer(match.opponent, players).name}: {match.diff}
    </li>
  );
};

const won = match => (+match.diff > 0 ? 'Gewonnen' : 'Verloren');
const getPlayer = (id, players) => find(players, { _id: id });
