import { h } from 'hyperapp';

export const Game = ({ players, gameFormChange, game }) => (
  <div class="row">
    <form onchange={gameFormChange}>
      <div class="col-xs-3">
        <label>
          Afstootert{' '}
          <select name="player">
            <option disabled selected={!game.player1 || !game.player1.name}>
              Selecteer
            </option>
            {players.map(p => <option value={p.name}>{p.name}</option>)}
          </select>
        </label>
      </div>
      <div class="col-xs-3">
        <FancyRadio name="win" value="win" label="wint van" />
        <FancyRadio name="win" value="loose" label="verliest van" />
      </div>
      <div class="col-xs-3">
        <label>
          Tegenstander
          <select name="opponent">
            <option disabled selected={!game.player2 || !game.player2.name}>
              Selecteer
            </option>
            {players
              .filter(p => p.name !== game.player1)
              .map(p => <option value={p.name}>{p.name}</option>)}
          </select>
        </label>
      </div>
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
