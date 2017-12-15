import { h } from 'hyperapp';

export const Overview = ({ state, actions }) => (
  <div>
    <h1>Ranking</h1>
    <List players={state.players} />
  </div>
);

export const List = ({ players }) => (
  <ul class="list-group">
    {players.map(p => (
      <li class="list-group-item">
        {p.name}, {p.score}
      </li>
    ))}
  </ul>
);
