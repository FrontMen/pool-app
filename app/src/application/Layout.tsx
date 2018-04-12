import { h, View, VNode } from 'hyperapp';
import { ReduxDevTools } from './ReduxDevTools';
import { Messages } from '../Messages';
import { AppState } from '..';

type Layout<TState> = (
  View: any,
  state: { state: TState; [key: string]: any },
) => VNode<any>;

export const LayoutMixin: Layout<AppState> = (
  View,
  { setView, state, deleteJwt },
) => {
  return (
    <div>
      <ReduxDevTools state={state} />
      <nav class="navbar navbar-dark bg-dark">
        <a
          class="navbar-brand"
          href="#"
          onclick={(ev: MouseEvent) => {
            ev.preventDefault();
            setView({ name: 'overview' });
          }}
        >
          FrontMen Pool Cafe
        </a>
        {state.token ? (
          <ul class="nav navbar-nav navbar-right">
            <li>
              <a class="nav-link" href="#" onclick={deleteJwt}>
                <span class="glyphicon glyphicon-user" /> Logout
              </a>
            </li>
          </ul>
        ) : (
          ''
        )}
      </nav>
      <div id="app" class="container">
        <Messages messages={state.messages} />
        {View}
      </div>
    </div>
  );
};
