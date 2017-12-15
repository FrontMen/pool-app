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
    {players.map(p => (
      <li class="list-group-item justify-content-between">
        {p.name}
        <span class="badge badge-warning badge-pill">{p.score}</span>
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
