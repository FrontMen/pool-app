import { h } from 'hyperapp';

export const Overview = ({ state, actions }) => (
  <div class="row" oncreate={actions.fetchGames}>
    <div class="col-12">
      <h3>Ranking</h3>
      <List
        players={state.players}
        newUser={state.newUser}
        newUserFormChange={actions.newUserFormChange}
        newUserFormSubmit={actions.newUserFormSubmit}
        setView={actions.setView}
        showNewPlayer={state.showNewPlayer}
        toggleShowNewPlayer={actions.toggleShowNewPlayer}
      />
    </div>
  </div>
);

export const List = ({
  players,
  newUser,
  newUserFormChange,
  newUserFormSubmit,
  setView,
  showNewPlayer,
  toggleShowNewPlayer,
}) => (
  <ul class="list-group">
    {showNewPlayer ? (
      NewPlayerForm(
        newUserFormChange,
        newUserFormSubmit,
        newUser,
        toggleShowNewPlayer
      )
    ) : (
      [
        players.map((p, idx) => (
          <li
            key={p._id}
            class="list-group-item d-flex justify-content-between align-items-center"
            onclick={e => {
              setView({ name: 'player', payload: p._id });
            }}
          >
            {p.name}
            <span class={getBadgeClass(idx)}>{p.score}</span>
          </li>
        )),
        <input
          type="button"
          value="Nieuwe speler"
          class="btn btn-block btn-xs"
          onclick={toggleShowNewPlayer}
        />,
      ]
    )}
  </ul>
);

const getBadgeClass = idx => {
  return `badge ${idx === 0 ? 'badge-warning' : 'badge-info'}`;
};

const NewPlayerForm = (
  newUserFormChange,
  newUserFormSubmit,
  newUser,
  toggleShowNewPlayer
) => [
  <h3>Nieuwe speler</h3>,
  <form
    onchange={newUserFormChange}
    onsubmit={e => {
      e.preventDefault();
      newUserFormSubmit(newUser);
    }}
  >
    <div className="form-group">
      <label for="name">Naam</label>
      <input id="name" placeholder="Jan" name="name" class="form-control" />
    </div>
    <div className="form-group">
      <label for="email">Email</label>
      <input
        id="email"
        placeholder="jan@doe.nl"
        name="email"
        class="form-control"
      />
    </div>
    <div class="form-group">
      <input
        type="submit"
        disabled={newUser.name.length === 0 && newUser.email.length === 0}
        value={
          newUser.name.length === 0 ? 'Nieuw' : newUser.name + ' toevoegen!'
        }
        class="btn btn-block btn-xs btn-primary"
      />
      <input
        type="button"
        value="Cancel"
        class="btn btn-block btn-xs"
        onclick={toggleShowNewPlayer}
      />
    </div>
  </form>,
];
