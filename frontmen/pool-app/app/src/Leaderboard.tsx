import { h } from 'hyperapp';

export const Leaderboard = ({ state, actions }) => (
  <div class="row" oncreate={actions.fetchGames}>
    <div class="col-12">
      <div class="header">
        <h1 class="header__title">leaderboard</h1>
        <div class="profile">
          <div class="profile__text">
            <span>2</span>th
          </div>
          <div class="profile__text">
            <img
              class="profile__icon"
              src={`https://robohash.org/${state.user.name}`}
            />
          </div>

          <div class="profile__text">
            <span>{state.user.score || 1500}</span>pt
          </div>
        </div>
      </div>
      <div class="filters">
        <div class="filters__item filters__item--active">overall</div>
        <div class="filters__item">frontmen</div>
        <div class="filters__item">jpoint</div>
      </div>
      <List
        players={state.players}
        newUser={state.newUser}
        newUserFormChange={actions.newUserFormChange}
        newUserFormSubmit={actions.newUserFormSubmit}
        setView={actions.setView}
        showNewPlayer={state.showNewPlayer}
        toggleShowNewPlayer={actions.toggleShowNewPlayer}
        user={state.user}
      />
    </div>
  </div>
);

export const List = ({
  players,
  newUser,
  user,
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
        <div class="list">
        {players.map((p, idx) => {
          const playerClass = `list__item ${p._id === user._id && 'list__item--active'}`
          return (
            <div
              onclick={e => {
                setView({ name: 'player', payload: p._id });
              }}
              class={playerClass}
            >
              <span class="list__text">{idx + 1}</span>
              <img
                class="profile__icon profile__icon--small"
                src={`https://robohash.org/${p.name}`}
              />
              <span class="list__text list__text--regular">{p.name}</span>
              <span class="list__text">{p.score}</span>
            </div>
          );
        })}
        <input
          type="button"
          value="Nieuwe speler"
          class="btn btn-block btn-xs"
          onclick={toggleShowNewPlayer}
        />
      </div>
        
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
