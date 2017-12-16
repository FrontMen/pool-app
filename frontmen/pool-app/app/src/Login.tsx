import { h } from 'hyperapp';

export const LoginView = ({ setView }) => {
  return (
    <div>
      <h3>Login</h3>
      <form
        onchange="{}"
        onsubmit={e => {
          e.preventDefault();
          // TODO: properly login
          setView('overview');
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
          <label for="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            class="form-control"
          />
        </div>
        <div class="form-group">
          <input
            type="submit"
            value="Login"
            class="btn btn-block btn-lg btn-primary"
          />
        </div>
      </form>
    </div>
  );
};
