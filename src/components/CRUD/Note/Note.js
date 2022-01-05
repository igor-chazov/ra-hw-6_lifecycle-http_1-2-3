import './note.css';
import Icon from '@mdi/react';
import { mdiClose } from '@mdi/js';
import PropTypes from 'prop-types';

function Note({ note, handleNoteRemove }) {
  return (
    <div className={'note'}>
      <div className={'note__body'}>
        <p className={'note__text'}>{note.content}</p>
        <button className={'note__btn-remove'} onClick={() => handleNoteRemove(note.id)}>
          <Icon className={'material-icons'} path={mdiClose} color={'red'} />
          <span className={'_visually-hidden'}>remove</span>
        </button>
      </div>
    </div>
  )
}

Note.propTypes = {
  note: PropTypes.object.isRequired,
  handleNoteRemove: PropTypes.func.isRequired,
}

export default Note;