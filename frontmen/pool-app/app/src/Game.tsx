import { h } from 'hyperapp';

export const Game = ({
  players,
  player,
  gameFormChange,
  game,
  gameFormSubmit,
  setMessage,
}) => (
  <div class="row">
    <div class="col-sm">
      <form
        onchange={gameFormChange}
        onsubmit={e => {
          e.preventDefault();
          gameFormSubmit(game);
        }}
      >
        <h3>Game</h3>
        <div class="form-group">
          <label for="playerSelect">Speler</label>
          <input type="text" name="player" value={player.name} disabled />
          {/* <select id="playerSelect" name="player" class="form-control">
            <option disabled selected={!game.player1 || !game.player1.name}>
              Selecteer
            </option>
            {players.map(p => <option value={p.name} selected={p._id === user.id ? "selected": ""}>{p.name}</option>)}
          </select> */}
        </div>
        <div class="btn-group btn-block" data-toggle="buttons">
          <FancyRadio
            name="win"
            value="win"
            label="wint van"
            radioValue={game.win ? 'win' : 'loose'}
          />
          <FancyRadio
            name="win"
            value="loose"
            label="verliest van"
            radioValue={game.win ? 'win' : 'loose'}
          />
        </div>
        <div class="form-group">
          <label for="opponentSelect">Tegenstander</label>
          <select id="opponentSelect" name="opponent" class="form-control">
            <option disabled selected={!game.player2 || !game.player2.name}>
              Selecteer
            </option>
            {players
              .filter(p => p.name !== game.player1)
              .map(p => <option value={p.name}>{p.name}</option>)}
          </select>
        </div>
        <div class="form-group">
          <input
            type="submit"
            value="play!"
            class="btn btn-block btn-primary"
          />
        </div>
      </form>
    </div>
  </div>
);

const FancyRadio = ({ name, value, label, radioValue }) => (
  <label
    class={
      radioValue === value ? 'btn btn-success active' : 'btn btn-success'
    }
  >
    <input type="radio" name={name} autocomplete="off" value={value} />
    {label}
  </label>
);
