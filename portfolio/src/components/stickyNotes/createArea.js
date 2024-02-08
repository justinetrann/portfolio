import React, { useState } from 'react';
import './createArea.css';

import noteBook from './img/note.png';

const CreateArea = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    const username = prompt("Please enter your username:");
    const password = prompt("Please enter your password:");
    if (username === "admin" && password === "makeanote") {
      // Logic to add a note or navigate to note adding area
      alert("Access granted. You can now add a note.");
    } else {
      alert("Access denied. Incorrect username or password.");
    }
  };

  return (
    <div 
      className="icon-container" 
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered && <div className="tooltip">Add a note</div>}
      <div className="notebook-icon">
        <img src={noteBook} alt="NoteBook Icon"/>
      </div>
    </div>
  );
};

export default CreateArea;
