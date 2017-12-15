import { h } from 'hyperapp';

export const Overview = ({ state, actions }) => (
  <div class="row">
    <div class="col-lg-6">
      <h3>Ranking</h3>
      <List
        players={state.players}
        newUser={state.newUser}
        newUserFormChange={actions.newUserFormChange}
        newUserFormSubmit={actions.newUserFormSubmit}
      />
    </div>
  </div>
);

export const List = ({
  players,
  newUser,
  newUserFormChange,
  newUserFormSubmit,
}) => (
  <ul class="list-group">
    {players.map((p, idx) => (
      <li class="list-group-item d-flex justify-content-between align-items-center">
        {p.name}
        <span class={getBadgeClass(idx)}>{p.score}</span>
      </li>
    ))}
    <li class="list-group-item justify-content-between">
      <form
        onchange={newUserFormChange}
        onsubmit={e => {
          e.preventDefault();
          newUserFormSubmit(newUser);
        }}
      >
        <input placeholder="name" name="name" class="form-control" />
        <input placeholder="email" name="email" class="form-control" />
        <input type="submit" value="+" />
      </form>
    </li>
  </ul>
);

const getBadgeClass = idx => {
  return `badge ${idx === 0 ? 'badge-warning' : 'badge-info'}`;
};
