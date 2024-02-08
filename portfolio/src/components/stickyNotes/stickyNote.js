import React from 'react';
import './stickyNote.css';

const stickyNote = ({ id, onDelete }) => {
  return (
    <div className="sticky-note">
      <textarea className="sticky-textarea"></textarea>
      <button className="delete-note" onClick={() => onDelete(id)}>X</button>
    </div>
  );
};

export default stickyNote;