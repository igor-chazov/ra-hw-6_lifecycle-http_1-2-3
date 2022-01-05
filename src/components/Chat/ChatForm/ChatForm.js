import { useState } from 'react';
import './chat-form.css'
import Icon from '@mdi/react';
import { mdiNavigation } from '@mdi/js';
import PropTypes from 'prop-types';

function ChatForm({ requestAddMessage }) {
  const [form, setForm] = useState({
    content: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prevForm) => ({ prevForm, [name]: value }));
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    if (form.message.length === 0) return;

    requestAddMessage(form.message);
    form.message = '';
  }

  return (
    <form className={'chat__form form-message'} onSubmit={handleSubmit}>
      <textarea
        className={'form-message__input'}
        name={'message'}
        value={form.message}
        onChange={handleChange}
        rows={'3'}>
      </textarea>
      <button className={'form-message__btn-send'}>
        <Icon className={'material-icons'} path={mdiNavigation} size={1} color={'#00C853'} rotate={90} />
        <span className={'_visually-hidden'}>Отправить</span>
      </button>
    </form>
  )
}

ChatForm.propTypes = {
  requestAddMessage: PropTypes.func.isRequired,
};

export default ChatForm;