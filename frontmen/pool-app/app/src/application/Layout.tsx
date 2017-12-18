import { h } from 'hyperapp';
import { ReduxDevTools } from './ReduxDevTools';

export const LayoutMixin = (View, { setView, state }) => {
  return (
    <div>
      <ReduxDevTools state={state} />
      <nav class="navbar navbar-dark bg-dark">
        <a
          class="navbar-brand"
          href="#"
          onclick={(ev: MouseEvent) => {
            ev.preventDefault();
            setView({name: 'overview'});
          }}
        >
          FrontMen Pool Cafe
        </a>
      </nav>
      <div id="app" class="container">
        {View}
      </div>
    </div>
  );
};
