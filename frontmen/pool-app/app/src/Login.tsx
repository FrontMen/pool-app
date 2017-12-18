import { h } from 'hyperapp';

export const LoginView = ({ setView, login }) => {
  return (
    <div class="row">
      <div class="col-12">
        <h3>Login</h3>
        <form
          onchange="{}"
          onsubmit={e => {
            e.preventDefault();
            if (e.target.email.value && e.target.token.value)
              login({
                email: e.target.email.value,
                token: e.target.token.value,
              });
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
              class="btn btn-block btn-lg btn-primary"
            />
          </div>
        </form>
      </div>
    </div>
  );
};
