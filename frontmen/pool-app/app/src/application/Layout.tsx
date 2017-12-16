import { h } from 'hyperapp';

export const LayoutMixin = View => {
  return (
    <div>
      <h1>FrontMen Pool Cafe</h1>
      {View}
    </div>
  );
};
