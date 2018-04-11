import { h } from 'hyperapp';
export const NewPlayerForm = (
  newUserFormChange,
  newUserFormSubmit,
  newUser,
  toggleShowNewPlayer
) => (
  <div id="newPLayerForm">
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
    </form>
  </div>
);

export const formChange = payload => {
  return {
    newUser: {
      name: payload.currentTarget[0].value,
      email: payload.currentTarget[1].value,
    },
  };
};

export const formSubmit = ({ name, email }) => state => actions => {
  fetch('/users', {
    method: 'POST',
    body: JSON.stringify({ name, email }),
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
  }).then(response => {
    if (!response.ok) {
      actions.setMessage('error registering');
    }
    response.text().then(t => actions.setMessage(t));
    actions.fetchGames();
    actions.toggleShowNewPlayer();
  });
};
