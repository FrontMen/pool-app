import { h } from 'hyperapp';

export const Overview = ({ state, actions }) => (
  <div>
    <h1>Ranking</h1>
    <List players={state.players} />
  </div>
);

export const List = ({ players }) => (
  <ul>
    {players.map(p => (
      <li>
        {p.name}, {p.score}
      </li>
    ))}
  </ul>
);
