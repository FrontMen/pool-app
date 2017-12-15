import { h } from 'hyperapp';

export const Game = ({ players, gameFormChange, game }) => (
  <div>
    <form onchange={gameFormChange}>
      <label>
        Afstootert{' '}
        <select name="player">
          <option disabled selected={!game.player1 || !game.player1.name}>
            Selecteer
          </option>
          {players.map(p => <option value={p.name}>{p.name}</option>)}
        </select>
      </label>
      <label>
        <input type="radio" name="win" value="win" />wint van{' '}
      </label>
      <label>
        <input type="radio" name="win" value="loose" />verliest van{' '}
      </label>
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
    </form>
  </div>
);
