import { h } from 'hyperapp';

export const LayoutMixin = (View, { setView }) => {
  return (
    <div>
      <nav class="navbar navbar-dark bg-dark">
        <a
          class="navbar-brand"
          href="#"
          onclick={(ev: MouseEvent) => {
            ev.preventDefault();
            setView('overview');
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
