import { useState } from 'react';
import Icon from '@mdi/react';
import { mdiAutorenew } from '@mdi/js';
import PropTypes from 'prop-types';
import './crud-header.css'

function CrudHeader({ requestNotes }) {
  const [isBtnAnimated, setIsBtnAnimated] = useState(false);

  const handleClick = () => {
    if (isBtnAnimated) return;
    setIsBtnAnimated(true);
    setTimeout(() => setIsBtnAnimated(false), 500);

    requestNotes();
  }

  return (
    <header className={'crud__header'}>
      <div className={'crud__title'}>Notes</div>
      <button className={`crud__btn-udate ${isBtnAnimated ? '_animated' : ''}`} onClick={handleClick}>
        <Icon className={'material-icons'} path={mdiAutorenew} size={1} />
        <span className={'_visually-hidden'}>update</span>
      </button>
    </header>
  )
}

CrudHeader.propTypes = {
  requestNotes: PropTypes.func.isRequired,
}

export default CrudHeader;