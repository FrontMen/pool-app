import { h } from 'hyperapp';

export const Game = ({
  players,
  gameFormChange,
  game,
  gameFormSubmit,
  setMessage,
}) => (
  <div class="row">
    <form
      onchange={gameFormChange}
      onsubmit={e => {
        e.preventDefault();
        gameFormSubmit(game);
      }}
    >
      <div class="col-xs-3">
        <label for="playerSelect">Speler</label>
        <select id="playerSelect" name="player" class="form-control">
          <option disabled selected={!game.player1 || !game.player1.name}>
            Selecteer
          </option>
          {players.map(p => <option value={p.name}>{p.name}</option>)}
        </select>
      </div>
      <div class="col-xs-3">
        <FancyRadio name="win" value="win" label="wint van" />
        <FancyRadio name="win" value="loose" label="verliest van" />
      </div>
      <div class="col-xs-3">
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
      <input type="submit" value="play!" />
    </form>
  </div>
);

const FancyRadio = ({ name, value, label }) => (
  <label class="radio">
    <input
      type="radio"
      name={name}
      value={value}
      data-toggle="radio"
      class="custom-radio"
    />
    <span class="icons">
      <span class="icon-unchecked" />
      <span class="icon-checked" />
    </span>
    {label}
  </label>
);
