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
    {players.map((p, idx) => (
      <li class="list-group-item d-flex justify-content-between align-items-center">
        {p.name}
        <span class={getBadgeClass(idx)}>{p.score}</span>
      </li>
    ))}
    <li>
      <form>
        <input name="name" class="form-control" />
      </form>
      <button />
    </li>
  </ul>
);

const getBadgeClass = idx => {
  debugger;

  return `badge ${idx === 0 ? 'badge-warning' : 'badge-info'}`;
};
