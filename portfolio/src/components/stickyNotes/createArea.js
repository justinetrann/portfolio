import React, { useState } from 'react';
import './createArea.css';
import noteBook from './img/note.png';

function Note(props) {
   const [isMinimized, setIsMinimized] = useState(false);

   function handleClick() {
      props.onDelete(props.id);
   }

   function toggleMinimize() {
      setIsMinimized(!isMinimized);
   }

   if (isMinimized) {
      return (
         <div className="noteMinimized" onClick={toggleMinimize}>
            <img src={noteBook} alt="NoteBook Icon" style={{ width: '100px', cursor: 'pointer' }}/>
         </div>
      );
   }

   return (
      <div className="note">
         <button onClick={handleClick}><i class="fas fa-times"></i></button>
         <button onClick={toggleMinimize}><i class="fas fa-window-minimize"></i></button>
         <h1>{props.title}</h1>
         <p>{props.content}</p>
      </div>
   );
}

const CreateArea = ({ onAdd }) => {
   const [isHovered, setIsHovered] = useState(false);
   const [showForm, setShowForm] = useState(false);
   const [notes, setNotes] = useState([]);
   const [note, setNote] = useState({
      title: "",
      content: ""
   });

   const handleClick = () => {
      const username = prompt("Please Admin username:");
      const password = prompt("Please Admin password:");
      if (username === "admin" && password === "makeanote") {
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
      if (note.title || note.content) {
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
            style={{ display: showForm ? 'none' : 'flex' }}
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
