import { h } from 'hyperapp';

export const Messages = ({ messages }) => {
  return <ul>{messages.map(m => <li>{m}</li>)}</ul>;
};
