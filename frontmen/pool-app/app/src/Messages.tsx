import { h } from 'hyperapp';

export const Messages = ({ messages }) => messages.map(Message);

const Message = msg => (
  <div class="alert alert-secondary" role="alert">
    {msg}
  </div>
);
