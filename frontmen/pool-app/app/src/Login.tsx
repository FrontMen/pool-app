import { h } from 'hyperapp';

export const LoginView = ({ setView, login, setMessage }) => {
  return (
    <div class="row">
      <div class="col-12">
        <h3>Login</h3>
        <form
          onchange="{}"
          onsubmit={e => {
            e.preventDefault();
            if (e.target.email.value && e.target.token.value) {
              login({
                email: e.target.email.value.toLowerCase(),
                token: e.target.token.value.toLowerCase(),
              });
            } else {
              setMessage('email of token niet ingevuld');
            }
          }}
        >
          <div class="form-group">
            <label for="email">Email</label>
            <input
              placeholder="me@domain.com"
              id="email"
              name="name"
              type="text"
              class="form-control"
            />
          </div>
          <div class="form-group">
            <label for="password">Token</label>
            <input
              id="token"
              name="token"
              type="text"
              placeholder="928374"
              class="form-control"
            />
          </div>
          <div class="form-group">
            <input
              type="submit"
              value="Login"
              class="btn btn-block btn-primary"
            />
          </div>
        </form>
      </div>
    </div>
  );
};
export const login = ({ email, token }) => state => actions => {
  fetch('/authenticate', {
    method: 'POST',
    body: JSON.stringify({ email, token }),
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
  })
    .then(r => r.json())
    .then(r => {
      if (r.success) {
        localStorage.setItem('pool-app-jwt', r.token);
        actions.setJwt(r.token);
        actions.setView({ name: 'overview' });
        actions.fetchGames();
      } else {
        actions.setMessage('Login incorrect');
      }
    })
    .catch(err => actions.setMessage('Login incorrect'));
};
