import React from 'react';
import './createArea.css';

import noteBook from './img/note.png';

const createArea = ({ onClick }) => {
  return (
    <div className="icon-container" onClick={onClick}>
      <div className="notebook-icon">
        <img src={noteBook} alt="NoteBookIcon"/>
      </div>
    </div>
  );
};

export default createArea;