import React, { useState } from 'react';
import './createArea.css';
import noteBook from './img/note.png';

// Assuming Note component is in the same file for simplicity. If it's not, import it.
function Note(props) {
  function handleClick() {
    props.onDelete(props.id);
  }

  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <button onClick={handleClick}>DELETE</button>
    </div>
  );
}

const CreateArea = ({ onAdd }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [notes, setNotes] = useState([]); // State to hold notes
  const [note, setNote] = useState({
    title: "",
    content: ""
  });

  const handleClick = () => {
    const username = prompt("Please Admin username:");
    const password = prompt("Please Admin password:");
    if (username === "admin" && password === "makeanote") {
      alert("Access granted. You can now add a note.");
      setShowForm(true);
    } else {
      alert("Access denied. Incorrect username or password.");
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNote(prevNote => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  };

  const submitNote = (event) => {
    if (note.title || note.content) { // Prevent adding empty notes
      setNotes(prevNotes => [...prevNotes, { ...note, id: Date.now() }]);
      setNote({
        title: "",
        content: ""
      });
      setShowForm(false);
    }
    event.preventDefault();
  };

  const deleteNote = (id) => {
    setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
  };

  return (
    <div>
      <div 
        className="icon-container" 
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ display: showForm ? 'none' : 'flex' }} // Adjusted for better layout consistency
      >
        {isHovered && <div className="tooltip">Add a note</div>}
        <div className="notebook-icon">
          <img src={noteBook} alt="NoteBook Icon"/>
        </div>
      </div>
      {showForm && (
        <form onSubmit={submitNote}>
          <input
            name="title"
            onChange={handleChange}
            value={note.title}
            placeholder="Title"
          />
          <textarea
            name="content"
            onChange={handleChange}
            value={note.content}
            placeholder="Take a note..."
            rows="3"
          />
          <button type="submit">Add</button>
        </form>
      )}
      {notes.map(note => (
        <Note
          key={note.id}
          id={note.id}
          title={note.title}
          content={note.content}
          onDelete={deleteNote}
        />
      ))}
    </div>
  );
};

export default CreateArea;
