import { h } from 'hyperapp';

export const setMessage = message => state => actions => {
  setTimeout(() => {
    actions.removeMessage(message);
  }, 5000);
  return { messages: [...state.messages, message] };
};

export const removeMessage = message => state => ({
  messages: state.messages.filter(m => m !== message),
});

export const Messages = ({ messages }) => messages.map(Message);

const Message = msg => (
  <div class="alert alert-secondary" role="alert">
    {msg}
  </div>
);
