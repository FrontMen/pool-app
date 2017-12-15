import { h } from 'hyperapp';

export const Overview = ({ state, actions }) => (
  <div class="row">
    <div class="col-lg-6">
      <h1>Ranking</h1>
      <List players={state.players} />
    </div>
  </div>
);

export const List = ({ players }) => (
  <ul class="list-group">
    {players.map(p => (
      <li class="list-group-item justify-content-between">
        {p.name}
        <span class="badge badge-warning badge-pill">{p.score}</span>
      </li>
    ))}
  </ul>
);
