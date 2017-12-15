import { h } from 'hyperapp';

export const Game = ({ players, gameFormChange }) => (
  <div>
    <form onchange={gameFormChange}>
      <label>
        Afstootert
        <select name="player">
          {players.map(p => <option value={p.name}>{p.name}</option>)}
        </select>
      </label>
      <label>
        <input type="radio" name="win" value="win" />wint van
      </label>
      <label>
        <input type="radio" name="win" value="loose" />verliest van
      </label>
      <label>
        Tegenstander
        <select name="opponent">
          {players.map(p => <option value={p.name}>{p.name}</option>)}
        </select>
      </label>
    </form>
  </div>
);
