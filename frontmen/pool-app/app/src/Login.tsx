import { h, MyAction } from 'hyperapp';
import { AppActions, AppState } from '.';

export const LoginView = ({
  setView,
  setEmailValue,
  login,
  register,
  setMessage,
}) => {
  return (
    <div class="row">
      <div class="col-12">
        <h3>Login</h3>
        <form
          onsubmit={(e) => {
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
              onkeyup={setEmailValue}
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
            <div className="row">
              <div className="col-6">
                <input
                  type="submit"
                  value="Login"
                  class="btn btn-block btn-primary"
                />
              </div>
              <div className="col-6">
                <input
                  type="button"
                  value="Register"
                  class="btn btn-block btn-secondary"
                  onclick={(e) => {
                    e.preventDefault();
                    register(e);
                  }}
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export const login = ({ email, token }) => (state) => (actions) => {
  fetch('/authenticate', {
    method: 'POST',
    body: JSON.stringify({ email, token }),
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
  })
    .then((r) => r.json())
    .then((r) => {
      if (r.success) {
        localStorage.setItem('pool-app-jwt', r.token);
        actions.setJwt(r.token);
        actions.setView({ name: 'overview' });
        actions.fetchGames();
      } else {
        actions.setMessage('Login incorrect');
      }
    })
    .catch((err) => actions.setMessage('Login incorrect'));
};

export const setEmailValue: MyAction<AppState, AppActions> = (el) => ({
  login: {
    email: el.target.value.toLowerCase(),
  },
});

export const register: MyAction<AppState, AppActions> = () => (state) => (
  actions,
) => {
  fetch('/users', {
    method: 'POST',
    body: JSON.stringify({
      email: state.login.email,
      name: state.login.email.split('@')[0],
    }),
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
  })
    .then((r) => r.json())
    .then((r) => {
      if (r.length === 24) {
        actions.setMessage(
          "You've been registered. You'll receive an email shortly",
        );
      } else {
        actions.setMessage('Login incorrect');
      }
    })
    .catch((err) => actions.setMessage('Login incorrect'));
};
