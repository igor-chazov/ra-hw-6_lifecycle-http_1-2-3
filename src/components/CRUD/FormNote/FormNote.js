import { useState } from 'react';
import './form-note.css';
import Icon from '@mdi/react';
import { mdiSend } from '@mdi/js';
import PropTypes from 'prop-types'

function FormNote({ requestAddNote }) {
  const [form, setForm] = useState({
    content: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prevForm) => ({ prevForm, [name]: value }));
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (form.content.length === 0) return;
    requestAddNote(form.content);
    form.content = '';
  }

  return (
    <form className={'crud__form form-new-note'} onSubmit={handleSubmit}>
      <header className={'form-new-note__header'}>
        <div className={'form-new-note__title'}>New Note</div>
      </header>
      <textarea
        className={'form-new-note__input'}
        name={'content'}
        value={form.content}
        onChange={handleChange}
        rows={'5'} >
      </textarea>
      <button className={'form-new-note__btn-send'}>
        <Icon className={'material-icons'} path={mdiSend} size={1} color={'#9E9E9E'} />
        <span className={'_visually-hidden'}>send</span>
      </button>
    </form>
  )
}

FormNote.propTypes = {
  requestAddNote: PropTypes.func.isRequired,
}

export default FormNote;
