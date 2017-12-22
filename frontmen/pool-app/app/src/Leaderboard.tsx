import { h } from 'hyperapp';
import { Filter } from './filter';
import { NewPlayerForm } from './newPlayerForm';

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

      <Filter
        options={state.competitions}
        selected={state.filter}
        setFilter={actions.setFilter}
      />

      <List
        players={getPlayersByFilter(state.players, state.filter)}
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

export type player = {
  name: string;
  score: number;
  email: string;
  matches?: { [key: string]: any }[];
};

const getPlayersByFilter = (players: player[], filter: string) => {
  return filter === 'overall'
    ? players
    : players.filter(p => p.email.indexOf(filter) > -1);
};

export const List = ({
  players,
  newUser,
  user,
  newUserFormChange,
  newUserFormSubmit,
  setView,
  showNewPlayer,
  toggleShowNewPlayer,
}) => {
  if (players.length === 0) {
    return <p>Geen spelers gevonden in deze competitie</p>;
  }

  return (
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
            const playerClass = `list__item ${p._id === user._id &&
              'list__item--active'}`;
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
};

const getBadgeClass = idx => {
  return `badge ${idx === 0 ? 'badge-warning' : 'badge-info'}`;
};
